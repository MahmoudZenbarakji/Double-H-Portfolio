import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { id: 1, name: "Double H Residence", location: "Bozeman, MT", image: "/src/assets/images/im1.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im1.jpg", "/src/assets/images/im2.jpg", "/src/assets/images/im3.jpg"] },
  { id: 2, name: "Green Axis Complex", location: "Churchill, MT", image: "/src/assets/images/im2.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im2.jpg", "/src/assets/images/im1.jpg", "/src/assets/images/im3.jpg"] },
  { id: 3, name: "Sustainable Pavilion", location: "Helena, MT", image: "/src/assets/images/im3.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im3.jpg", "/src/assets/images/im2.jpg", "/src/assets/images/im1.jpg"] },
  { id: 4, name: "Urban Loft", location: "Damascus, SY", image: "/src/assets/images/im1.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im1.jpg", "/src/assets/images/im2.jpg"] },
  { id: 5, name: "Eco Tower", location: "Dubai, UAE", image: "/src/assets/images/im2.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im2.jpg", "/src/assets/images/im1.jpg"] },
  { id: 6, name: "Skyline Villa", location: "Beirut, LB", image: "/src/assets/images/im3.jpg", facebookUrl: "#", gallery: ["/src/assets/images/im3.jpg", "/src/assets/images/im2.jpg"] },
];

const ProjectsSection = () => {
  const [current, setCurrent] = useState(0);
  const [itemsInView, setItemsInView] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const modernFontStyle = { fontFamily: "'Montserrat', sans-serif" };

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
    document.body.style.overflow = (selectedProject || showAll) ? "hidden" : "unset";
  }, [selectedProject, showAll]);

  const maxIndex = Math.max(0, projects.length - itemsInView);
  const nextSlide = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section
      id="projects"
      style={modernFontStyle}
      className="relative w-full h-screen bg-[#f8fafc] flex flex-col items-center justify-between py-4 md:py-6 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -80, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#065f46 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Header - Added shrink-0 */}
      <div className="relative z-10 w-full text-center pt-4 md:pt-8 shrink-0">
        <motion.h2 initial={{ opacity: 0, y: 40, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, amount: 0.6 }} className="relative w-fit mx-auto text-center text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-green-800 via-gray-700 to-green-600 bg-clip-text text-transparent tracking-wide capitalize">
          Featured Works
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-green-800/60 font-semibold mt-2 uppercase tracking-[0.5em] text-[10px] md:text-xs">
          Architectural Portfolio
        </motion.p>
      </div>

      {/* Slider Container - Modified height handling for mobile */}
      <div className="relative z-10 w-full max-w-[1300px] flex items-center justify-center flex-1 px-4 md:px-12 my-2 overflow-hidden h-full">
        <button onClick={prevSlide} className="hidden md:flex absolute left-4 z-40 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full items-center justify-center hover:bg-green-700 hover:text-white transition-all duration-300">
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
        </button>

        <div className="w-full h-full flex items-center overflow-hidden">
          <motion.div animate={{ x: `-${current * (100 / itemsInView)}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="flex w-full h-fit md:h-full">
            {projects.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3">
                <ProjectCard project={p} onOpen={() => setSelectedProject(p)} font={modernFontStyle} />
              </div>
            ))}
          </motion.div>
        </div>

        <button onClick={nextSlide} className="hidden md:flex absolute right-4 z-40 w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full items-center justify-center hover:bg-green-700 hover:text-white transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Footer - Added shrink-0 and adjusted padding for mobile visibility */}
      <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 pb-4 md:pb-6 shrink-0 mt-auto">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? "w-8 bg-green-700" : "w-3 bg-green-200"}`} />
          ))}
        </div>

        <button 
          onClick={() => setShowAll(true)}
          className="group flex items-center gap-3 text-green-800 font-bold uppercase text-[10px] tracking-widest hover:text-green-600 transition-colors"
        >
          View All Projects
          <div className="w-7 h-7 rounded-full border border-green-800 flex items-center justify-center group-hover:bg-green-800 group-hover:text-white transition-all">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Modals remain exactly the same as they worked well */}
      <AnimatePresence>
        {showAll && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-white overflow-y-auto p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black text-green-900">All Projects</h2>
                <button onClick={() => setShowAll(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-green-700 hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={() => { setSelectedProject(p); setShowAll(false); }} font={modernFontStyle} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modernFontStyle} className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
            <motion.div initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 left-6 z-[420] flex items-center gap-2 bg-white shadow-xl text-green-900 px-6 py-3 rounded-full hover:bg-green-700 hover:text-white transition-all font-bold uppercase text-[10px]">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M15 19l-7-7 7-7" /></svg>
                Back to Projects
              </button>
              <div className="w-full md:w-2/3 h-1/2 md:h-full overflow-y-auto p-6 bg-slate-50 custom-scrollbar">
                <div className="flex flex-col gap-6">
                  {selectedProject.gallery.map((img, i) => (<img key={i} src={img} className="w-full rounded-[1.5rem] shadow-md" alt="gallery" />))}
                </div>
              </div>
              <div className="w-full md:w-1/3 p-10 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-green-700 font-bold text-[11px] uppercase tracking-widest">Architectural Detail</span>
                  <h3 className="text-4xl font-black text-gray-900 mt-2 leading-tight">{selectedProject.name}</h3>
                  <p className="text-green-600/60 mt-3 text-xs font-bold uppercase tracking-widest">{selectedProject.location}</p>
                  <div className="h-1.5 w-12 bg-green-700 my-8 rounded-full" />
                  <p className="text-gray-600 leading-relaxed font-medium">This project represents our commitment to blending modern aesthetics with functional sustainability.</p>
                </div>
                <a href={selectedProject.facebookUrl} target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-green-700 text-white font-black text-xs uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-200">View on Facebook</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #059669; border-radius: 10px; }
      `}</style>
    </section>
  );
};

const ProjectCard = ({ project, onOpen, font }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.01 }}
    onClick={onOpen}
    style={font}
    className="group relative h-full min-h-[350px] max-h-[550px] aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 mx-auto"
  >
    <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent opacity-80 z-20 group-hover:opacity-100 transition-opacity" />
    <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
      <h3 className="text-xl md:text-2xl font-black text-white capitalize mb-1 leading-tight drop-shadow-lg">{project.name}</h3>
      <div className="flex items-center gap-1.5 mb-4 md:mb-6">
        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">{project.location}</p>
      </div>
      <div className="flex items-center"><button className="w-full px-4 py-3 md:py-4 bg-white text-green-900 text-[12px] font-black uppercase rounded-full shadow-lg transition-all hover:bg-green-700 hover:text-white">Details</button></div>
    </div>
  </motion.div>
);

export default ProjectsSection;