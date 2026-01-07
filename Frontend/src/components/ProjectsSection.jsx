import React, { useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    name: "DOUBLE H Residence",
    location: "Bozeman, MT",
    image: "/src/assets/images/im1.jpg",
    facebookUrl: "#",
  },
  {
    id: 2,
    name: "Green Axis Complex",
    location: "Churchill, MT",
    image: "/src/assets/images/im2.jpg",
    facebookUrl: "#",
  },
  {
    id: 3,
    name: "Sustainable Pavilion",
    location: "Helena, MT",
    image: "/src/assets/images/im3.jpg",
    facebookUrl: "#",
  },
  {
    id: 4,
    name: "Urban Loft",
    location: "Damascus, SY",
    image: "/src/assets/images/im1.jpg",
    facebookUrl: "#",
  },
  {
    id: 5,
    name: "Eco Tower",
    location: "Dubai, UAE",
    image: "/src/assets/images/im2.jpg",
    facebookUrl: "#",
  },
  {
    id: 6,
    name: "Skyline Villa",
    location: "Beirut, LB",
    image: "/src/assets/images/im3.jpg",
    facebookUrl: "#",
  },
  {
    id: 7,
    name: "Glass House",
    location: "London, UK",
    image: "/src/assets/images/im1.jpg",
    facebookUrl: "#",
  },
  {
    id: 8,
    name: "Mountain Retreat",
    location: "Zurich, CH",
    image: "/src/assets/images/im2.jpg",
    facebookUrl: "#",
  },
  {
    id: 9,
    name: "Sea View Tower",
    location: "Athens, GR",
    image: "/src/assets/images/im3.jpg",
    facebookUrl: "#",
  },
];

const ProjectsSection = () => {
  const [current, setCurrent] = useState(0);
  const [itemsInView, setItemsInView] = useState(3);

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

  const maxIndex = projects.length - itemsInView;
  const nextSlide = () =>
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section
      style={{ height: "calc(100vh - 20px)" }}
      className="relative w-full overflow-hidden flex items-center justify-center bg-white"
    >
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
        }
        .geo-shape-new {
          position: absolute;
          z-index: 0;
          filter: blur(40px);
          opacity: 0.15;
          mix-blend-mode: multiply;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="geo-shape-new w-[500px] h-[500px] bg-green-200 top-[-100px] left-[-100px] rounded-full animate-[float-slow_15s_infinite_ease-in-out]" />
        <div className="geo-shape-new w-[400px] h-[400px] bg-gray-200 bottom-[-50px] right-[-50px] animate-[float-slow_12s_infinite_reverse]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#f8f8f8 2px, transparent 2px), linear-gradient(90deg, #f8f8f8 2px, transparent 2px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] px-6 flex flex-col items-center justify-between py-4 h-full max-h-[800px]">
        <h2 className="pt-8 text-center font-black text-3xl md:text-5xl tracking-tighter text-gray-800 uppercase shrink-0">
          Our <span className="text-green-600">Projects</span>
        </h2>

        <div className="relative w-full flex items-center gap-4 flex-1 justify-center overflow-hidden">
          <button
            onClick={prevSlide}
            className="group z-40 focus:outline-none shrink-0 hidden md:block"
          >
            <div className="w-12 h-12 bg-green-600 shadow-lg rounded-full flex items-center justify-center border border-green-500 hover:bg-green-700 text-white transition-all active:scale-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-current rotate-180"
                viewBox="0 0 24 24"
              >
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
              </svg>
            </div>
          </button>

          <div className="overflow-hidden flex-1 max-w-[1000px]">
            <div
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                transform: `translateX(-${current * (100 / itemsInView)}%)`,
              }}
            >
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3 box-border"
                >
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="group z-40 focus:outline-none shrink-0 hidden md:block"
          >
            <div className="w-12 h-12 bg-green-600 shadow-lg rounded-full flex items-center justify-center border border-green-500 hover:bg-green-700 text-white transition-all active:scale-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
              </svg>
            </div>
          </button>
        </div>

        {/* تعديل الرفع: تم استخدام -mt-6 لرفع الشخطات للأعلى أكثر */}
        <div className="flex gap-3 shrink-0 pt-0 -mt-6 z-20">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                current === idx
                  ? "w-10 bg-green-600"
                  : "w-3 bg-gray-200 hover:bg-green-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full aspect-[3/4.2] rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 shadow-lg transition-all duration-500 hover:-translate-y-2 group mx-auto max-w-[320px] sm:max-w-none">
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
      <button
        className="absolute left-4 bottom-6 z-20 px-6 py-3 font-bold text-[11px] uppercase tracking-widest rounded-full text-white bg-green-600 shadow-lg hover:bg-green-700 transition-all transform group-hover:scale-105"
        onClick={() => setOpen(true)}
      >
        {" "}
        View Project{" "}
      </button>

      <div
        className={`absolute inset-0 bg-white/98 transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-lg border-t-8 border-green-600 ${
          open ? "translate-y-0" : "translate-y-full"
        } lg:group-hover:translate-y-0`}
      >
        <div className="space-y-3 sm:space-y-4">
          <div className="w-10 sm:w-12 h-1.5 bg-green-600 rounded-full" />
          <h3 className="font-black text-2xl sm:text-3xl text-gray-800 tracking-tight leading-tight uppercase">
            {project.name}
          </h3>
          <p className="flex items-center gap-2 text-green-600 font-bold text-sm tracking-widest uppercase">
            {" "}
            <LocationIcon /> {project.location}{" "}
          </p>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal pt-2 sm:pt-4 border-t border-gray-100 line-clamp-3">
            {" "}
            Blending structure with nature. An innovative architectural
            response.{" "}
          </p>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <a
            href={project.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 sm:py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 hover:bg-green-600 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
          >
            {" "}
            <FacebookIcon /> Facebook Page{" "}
          </a>
          <button
            className="w-full text-xs text-gray-400 font-bold uppercase tracking-tighter lg:hidden py-1"
            onClick={() => setOpen(false)}
          >
            {" "}
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

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
