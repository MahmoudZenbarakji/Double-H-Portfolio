import React, { useState, useEffect } from "react";
import { API_PROJECTS, BACKEND_BASE_URL } from "../../environement/environment";
import getImageUrl from "../dashboard/utils/imageUrl";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [itemsInView, setItemsInView] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make fetch request without credentials to avoid auth issues
        const response = await fetch(API_PROJECTS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Don't send credentials for public routes
          credentials: 'omit',
        });
        
        // Log response for debugging
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Projects API Error:', {
            status: response.status,
            statusText: response.statusText,
            url: API_PROJECTS,
            error: errorText
          });
          
          if (response.status === 401) {
            throw new Error('Unauthorized: Check API configuration');
          } else if (response.status === 404) {
            throw new Error('API endpoint not found');
          } else {
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
          }
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Map API response to component format
          const mappedProjects = result.data.map((project) => ({
            id: project._id,
            name: project.name,
            location: project.description || "Location not specified",
            image: project.images && project.images.length > 0 
              ? getImageUrl(project.images[0])
              : "/src/assets/images/im1.jpg",
            facebookUrl: project.link || "#",
            gallery: project.images && project.images.length > 0
              ? project.images.map(img => getImageUrl(img))
              : ["/src/assets/images/im1.jpg"],
            description: project.description,
            date: project.date,
          }));
          
          setProjects(mappedProjects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsInView(1);
      else if (window.innerWidth < 1024) setItemsInView(2);
      else setItemsInView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
  }, [selectedProject]);

  const maxIndex = Math.max(0, projects.length - itemsInView);
  const nextSlide = () =>
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Loading state
  if (loading) {
    return (
      <section
        id="projects"
        className="relative w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 m-0 border-none"
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="projects"
        className="relative w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 m-0 border-none"
      >
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <p className="mt-2 text-gray-600">Please try again later.</p>
        </div>
      </section>
    );
  }

  // No projects state
  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="relative w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 m-0 border-none"
      >
        <div className="text-center">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-between py-12 m-0 border-none"
    >
      {/* الخلفية */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#065f46 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* الرأس - تم تعديل الـ pt-20 لرفعه بوضوح عن السيكشن السابق */}
      <div className="relative z-10 w-full text-center pt-20 pb-10 shrink-0">
        <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
          Featured <span className="text-green-600">Works</span>
        </h2>
        <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest text-[9px] md:text-xs">
          Architectural Portfolio
        </p>
      </div>

      {/* السلايدر */}
      <div className="relative z-10 w-full max-w-[1300px] flex items-center justify-center flex-grow overflow-hidden px-4 md:px-12">
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 z-40 w-12 h-12 bg-white/80 backdrop-blur shadow-lg rounded-full items-center justify-center hover:bg-green-600 hover:text-white transition-all"
        >
          <svg
            className="w-5 h-5 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="w-full h-full flex items-center overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-fit"
            style={{
              transform: `translateX(-${current * (100 / itemsInView)}%)`,
            }}
          >
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3"
              >
                <ProjectCard project={p} onOpen={() => setSelectedProject(p)} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 z-40 w-12 h-12 bg-white/80 backdrop-blur shadow-lg rounded-full items-center justify-center hover:bg-green-600 hover:text-white transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* المؤشرات - تم تعديل الـ pb-12 والـ mt-10 لإنزالها قليلاً */}
      <div className="relative z-10 flex gap-2 mt-10 pb-12 shrink-0">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === idx ? "w-10 bg-green-600" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* مودال التفاصيل */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-lg p-0 md:p-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white w-full h-full md:max-w-6xl md:h-[85vh] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 z-[220] flex items-center gap-2 bg-black/50 hover:bg-green-600 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Back
              </span>
            </button>

            <div className="w-full md:w-2/3 h-[50vh] md:h-full overflow-y-auto p-4 md:p-6 bg-[#f0f4f8] custom-scrollbar">
              <div className="flex flex-col gap-4">
                {selectedProject.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="w-full rounded-2xl overflow-hidden shadow-md"
                  >
                    <img
                      src={img}
                      alt="detail"
                      className="w-full h-auto object-cover min-h-[300px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/3 flex-1 p-8 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <span className="text-green-600 font-black text-[10px] uppercase tracking-widest">
                  Selected Works
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mt-2 leading-tight">
                  {selectedProject.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mt-3 font-bold text-xs uppercase">
                  <LocationIcon /> {selectedProject.location}
                </div>
                <div className="h-1 w-12 bg-green-600 my-6 rounded-full" />
                <p className="text-gray-500 leading-relaxed text-sm">
                  {selectedProject.description || "We focus on creating spaces that are both functional and inspiring. Each project is a unique journey of design and innovation."}
                </p>
              </div>
              <div className="mt-8">
                <a
                  href={selectedProject.facebookUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-600 text-white font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl active:scale-95"
                >
                  <FacebookIcon /> Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #065f46; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #065f46 transparent; }
      `}</style>
    </section>
  );
};

const ProjectCard = ({ project, onOpen }) => (
  <div 
    onClick={onOpen} 
    // تم تغيير aspect-square (مربع) للموبايل و aspect-[4/5] للشاشات الكبيرة
    // المربع يعطي شعوراً بأنه أصغر وأكثر ترتيباً على الموبايل
    className="group relative aspect-square md:aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 active:scale-95"
  >
    <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
      <h3 className="text-lg md:text-2xl font-black text-white uppercase leading-tight mb-0.5">{project.name}</h3>
      <p className="text-green-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-4">{project.location}</p>
      
      <div className="mt-1">
        <button className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-green-600 text-white text-[8px] md:text-[10px] font-black uppercase rounded-full tracking-widest hover:bg-white hover:text-green-700 transition-all duration-300 shadow-lg">
          View
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

export default ProjectsSection;
