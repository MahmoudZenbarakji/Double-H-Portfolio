// src/components/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_ENDPOINTS from "../dashboard/config/api";
import getImageUrl from "../dashboard/utils/imageUrl";
import im1 from "../assets/images/im1.jpg";
import im2 from "../assets/images/im2.jpg";
import im3 from "../assets/images/im3.jpg";
import im4 from "../assets/images/im4.jpg";

const fallbackImages = [im1, im2, im3, im4];

const variants = {
  enter: { opacity: 0, x: -200 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [images, setImages] = useState(fallbackImages);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    // Fetch hero images from API
    const fetchHeroImages = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.hero.getAll);
        if (response.data.success && response.data.data.length > 0) {
          const heroImages = response.data.data.map((hero) => getImageUrl(hero.images));
          setImages(heroImages);
        }
      } catch (error) {
        console.error("Failed to fetch hero images, using fallback:", error);
        // Keep fallback images if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const text =
      window.innerWidth < 768
        ? "Double H\nBim Services"
        : "Double H Bim Services";

    let i = 0;
    setTypingDone(false); // ✅ إعادة ضبط عند كل صورة جديدة

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setDisplayed("");

    const typeNext = () => {
      if (i >= text.length) {
        setTypingDone(true); // ✅ خلصت الكتابة
        timerRef.current = null;
        return;
      }
      const ch = text[i];
      if (typeof ch === "string") {
        setDisplayed((prev) => prev + ch);
      }
      i += 1;
      timerRef.current = setTimeout(typeNext, 120);
    };

    timerRef.current = setTimeout(typeNext, 150);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [current]);

  return (
    <section
      id="hero"
      className="relative min-h-screen font-safe text-white overflow-hidden"
    >
      {/* خلفية الصور */}
      <div className="absolute inset-0">
        {!loading && images.length > 0 && (
          <AnimatePresence mode="sync">
            <motion.img
              key={current}
              src={images[current]}
              alt="Architecture background"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                // Fallback to next image if current fails to load
                console.error("Image failed to load:", images[current]);
              }}
            />
          </AnimatePresence>
        )}
        {loading && (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}
      </div>

      {/* Overlay هندسي */}
      <div
        className="absolute inset-y-0 left-0 w-3/4 bg-black/60"
        style={{
          clipPath: "polygon(0 0, 70% 0, 85% 50%, 70% 100%, 0 100%)",
        }}
      ></div>

      {/* المحتوى */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-0 sm:px-10 md:px-12 pt-40 sm:pt-52 md:pt-64 pb-16 gap-12">
        <div className="md:w-1/2 w-full flex flex-col items-start space-y-8 sm:space-y-10 text-left">
          {/* العنوان: تباعد أقل قليلاً tracking-[0.05em] مع خط Dosis */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ fontFamily: "'Dosis', sans-serif" }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight whitespace-pre-line md:whitespace-nowrap w-full sm:max-w-[75vw] pl-2 sm:pl-0 tracking-[0.05em]"
          >
            <span 
              className="bg-gradient-to-br from-[#143939] via-[#ffffff] to-[#d7d7d7] bg-clip-text text-transparent"
              style={{ 
                filter: "drop-shadow(0px 4px 8px rgba(20, 57, 57, 0.4))",
                WebkitBackgroundClip: "text" 
              }}
            >
              {displayed}
            </span>
            
            <span className="text-[#d7d7d7] animate-pulse ml-1">|</span>
          </motion.h1>

          {/* الفقرة تظهر بعد انتهاء الكتابة */}
          {typingDone && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 whitespace-pre-line w-full max-w-[260px] sm:max-w-[75vw] pl-2 sm:pl-0 leading-relaxed"
            >
              {window.innerWidth < 768
                ? "Bold visions,\nUnconventional layouts,\nArchitectural storytelling\nshaping the future."
                : "Bold visions and unconventional layouts,\nArchitectural storytelling shaping the future."}
            </motion.p>
          )}

          {/* الزر يظهر بعد الفقرة */}
          {typingDone && (
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-lg sm:text-xl md:text-2xl font-bold text-[#143939] rounded-xl shadow-md focus:outline-none group bg-white overflow-hidden w-auto max-w-xs text-left pl-2 sm:pl-0"
            >
              <span className="relative z-10 flex items-center flex-wrap">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 fill-[#143939] animate-pulse"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                  />
                </svg>
                Project
              </span>

              <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-transparent via-[#143939] to-transparent animate-borderLoop"></span>
              <span className="absolute inset-[2px] bg-white rounded-xl"></span>
              
            </motion.a>
          )}
        </div>

        {/* سهم فاخر */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_0_22px_#143939]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            initial={{ y: 0, scale: 0.9, stroke: "#ffffff" }}
            animate={{
              y: [0, 45, 0],
              scale: [0.9, 1.2, 0.9],
              stroke: ["#ffffff", "#143939", "#ffffff"],
            }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>

        <div className="md:w-1/2"></div>
      </div>
    </section>
  );
}