import React, { useState, useEffect } from "react";

const projects = [
  { id: 1, name: "DOUBLE H Residence", location: "Bozeman, MT", image: "/src/assets/images/im1.jpg", facebookUrl: "#" },
  { id: 2, name: "Green Axis Complex", location: "Churchill, MT", image: "/src/assets/images/im2.jpg", facebookUrl: "#" },
  { id: 3, name: "Sustainable Pavilion", location: "Helena, MT", image: "/src/assets/images/im3.jpg", facebookUrl: "#" },
  { id: 4, name: "Urban Loft", location: "Damascus, SY", image: "/src/assets/images/im1.jpg", facebookUrl: "#" },
  { id: 5, name: "Eco Tower", location: "Dubai, UAE", image: "/src/assets/images/im2.jpg", facebookUrl: "#" },
  { id: 6, name: "Skyline Villa", location: "Beirut, LB", image: "/src/assets/images/im3.jpg", facebookUrl: "#" },
  { id: 7, name: "Glass House", location: "London, UK", image: "/src/assets/images/im1.jpg", facebookUrl: "#" },
  { id: 8, name: "Mountain Retreat", location: "Zurich, CH", image: "/src/assets/images/im2.jpg", facebookUrl: "#" },
  { id: 9, name: "Sea View Tower", location: "Athens, GR", image: "/src/assets/images/im3.jpg", facebookUrl: "#" },
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
  const nextSlide = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#f8fafc]">
      
      {/* --- محرك الأنميشن المتطور للخلفية --- */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
        @keyframes wave-move {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .particle {
          position: absolute;
          background: linear-gradient(135deg, rgba(22, 163, 74, 0.2), rgba(209, 213, 219, 0.4));
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          filter: blur(1px);
          z-index: 1;
          pointer-events: none;
        }
        .bg-grid {
          background-image: 
            radial-gradient(rgba(22, 163, 74, 0.1) 1.5px, transparent 1.5px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse at center, black, transparent 80%);
        }
      `}</style>

      {/* طبقات الخلفية المتحركة */}
      <div className="absolute inset-0 z-0">
        {/* شبكة النقاط الهندسية */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        
        {/* توليد جزيئات هندسية عشوائية */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              bottom: "-10%",
              animation: `float-particle ${Math.random() * 10 + 15}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        {/* هالات ضوئية ملونة خافتة */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[120px] animate-[wave-move_15s_infinite_ease-in-out]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] animate-[wave-move_20s_infinite_ease-in-out_reverse]" />
      </div>

      <div className="relative z-10 w-full max-w-[1250px] px-6 flex flex-col items-center justify-between py-10 h-full">
        {/* العنوان */}
        <div className="text-center shrink-0">
          <span className="text-green-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Portfolio Showcase</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-800 uppercase leading-none">
            OUR <span className="text-green-600">PROJECTS</span>
          </h2>
        </div>

        {/* الكاروسيل المحسن */}
        <div className="relative w-full flex items-center gap-4 flex-1 justify-center">
          <button 
            onClick={prevSlide} 
            className="group z-40 hidden md:flex w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center hover:bg-green-600 transition-all duration-300 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 fill-slate-800 group-hover:fill-white rotate-180 transition-colors" viewBox="0 0 24 24"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </button>

          <div className="overflow-hidden flex-1 max-w-[1080px] py-10">
            <div
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${current * (100 / itemsInView)}%)` }}
            >
              {projects.map((p) => (
                <div key={p.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide} 
            className="group z-40 hidden md:flex w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xl items-center justify-center hover:bg-green-600 transition-all duration-300 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 fill-slate-800 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </button>
        </div>

        {/* التحكم السفلي */}
        <div className="flex flex-col items-center gap-6 shrink-0">
            <div className="flex gap-3">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                    current === idx ? "w-16 bg-green-600" : "w-4 bg-slate-200 hover:bg-green-200"
                }`}
                />
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full aspect-[3/4.2] rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-4 group">
      <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 z-20">
        <span className="inline-block px-3 py-1 bg-green-600 text-[10px] font-bold text-white uppercase tracking-widest rounded-full mb-3">Residential</span>
        <h3 className="text-2xl font-black text-white leading-tight mb-4 uppercase">{project.name}</h3>
        <button
          onClick={() => setOpen(true)}
          className="group/btn flex items-center gap-3 text-white font-bold text-xs uppercase tracking-[0.2em]"
        >
          View Details <span className="w-8 h-[1px] bg-green-500 group-hover/btn:w-12 transition-all"></span>
        </button>
      </div>

      {/* تفاصيل المشروع (Slide up) */}
      <div className={`absolute inset-0 bg-white p-10 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-30 ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
             <div className="w-12 h-1.5 bg-green-600 rounded-full" />
             <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
             </button>
          </div>
          <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">{project.name}</h3>
          <div className="flex items-center gap-2 text-green-600 font-bold text-xs tracking-widest uppercase">
            <LocationIcon /> {project.location}
          </div>
          <p className="text-slate-500 leading-relaxed pt-4 border-t border-slate-100">
            A masterpiece of contemporary architecture, focusing on sustainable materials and organic flow.
          </p>
        </div>
        <div className="space-y-3">
          <a href={project.facebookUrl} className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg">
            <FacebookIcon /> Project Page
          </a>
        </div>
      </div>
    </div>
  );
};

// Icons (نفس الأيقونات السابقة)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
);
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
);

export default ProjectsSection;