// src/components/PartnersSlider.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_PARTNERS, API_BASE_URL } from "../../environement/environment";
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import logo4 from "../assets/images/logo4.png";
import logo5 from "../assets/images/logo5.png";

// Fallback logos
const fallbackLogos = [logo1, logo2, logo3, logo4, logo5];

export default function PartnersSlider() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch partners from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_PARTNERS);
        
        if (!response.ok) {
          throw new Error('Failed to fetch partners');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Map API response to component format
          const mappedPartners = result.data.map((partner) => ({
            id: partner._id,
            name: partner.name,
            image: partner.image 
              ? `${API_BASE_URL}${partner.image}` 
              : fallbackLogos[0],
          }));
          
          setPartners(mappedPartners.length > 0 ? mappedPartners : fallbackLogos.map((logo, i) => ({ id: i, name: `Partner ${i + 1}`, image: logo })));
        } else {
          // Use fallback logos if no partners found
          setPartners(fallbackLogos.map((logo, i) => ({ id: i, name: `Partner ${i + 1}`, image: logo })));
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError(err.message);
        // Use fallback logos on error
        setPartners(fallbackLogos.map((logo, i) => ({ id: i, name: `Partner ${i + 1}`, image: logo })));
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const logos = partners.length > 0 ? partners.map(p => p.image) : fallbackLogos;

  const nextLogo = () => {
    setIndex((prev) => (prev + 1) % logos.length);
  };

  const prevLogo = () => {
    setIndex((prev) => (prev - 1 + logos.length) % logos.length);
  };

  return (
    <section className="relative py-8 md:py-14 bg-gradient-to-b from-[#d4d4d4] via-[#e5e5e5] to-[#f5f5f5] overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative w-fit mx-auto text-center text-2xl md:text-4xl font-extrabold 
             bg-gradient-to-r from-green-700 via-gray-600 to-green-500 
             bg-clip-text text-transparent tracking-wide"
      >
        Success Partners
      </motion.h2>

      <div className="relative w-full flex items-center justify-center">
        {/* زر يسار */}
        <button
          onClick={nextLogo}
          className="absolute left-4 md:left-10 cursor-pointer z-10"
        >
          <div className="w-[50px] h-[50px] bg-green-50 rounded-full relative shadow-md flex items-center justify-center">
            <div className="absolute w-[44px] h-[44px] bg-black rounded-full left-1/2 -translate-x-1/2 top-[3px] blur-[1px]"></div>
            <label className="group cursor-pointer absolute w-[44px] h-[44px] bg-gradient-to-b from-green-700 to-green-500 rounded-full left-1/2 -translate-x-1/2 top-[3px] shadow-md active:shadow-inner flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-green-100"
                viewBox="0 0 24 24"
              >
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              </svg>
            </label>
          </div>
        </button>

        {/* المحتوى */}
        <div className="overflow-hidden w-[80%] md:w-[70%] px-[60px]">
          {isMobile ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={partners[index]?.id || index}
                src={logos[index]}
                alt={partners[index]?.name || `Partner ${index + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-29 md:h-24 w-auto object-contain drop-shadow-lg mx-auto"
              />
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
              className="flex gap-16"
            >
              {logos.map((logo, i) => (
                <img
                  key={partners[i]?.id || i}
                  src={logo}
                  alt={partners[i]?.name || `Partner ${i + 1}`}
                  className={`h-28 md:h-28 w-auto object-contain drop-shadow-lg ${
                    i === index ? "scale-110" : "opacity-70"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* زر يمين */}
        <button
          onClick={prevLogo}
          className="absolute right-4 md:right-10 cursor-pointer z-10"
        >
          <div className="w-[50px] h-[50px] bg-green-50 rounded-full relative shadow-md flex items-center justify-center">
            <div className="absolute w-[44px] h-[44px] bg-black rounded-full left-1/2 -translate-x-1/2 top-[3px] blur-[1px]"></div>
            <label className="group cursor-pointer absolute w-[44px] h-[44px] bg-gradient-to-b from-green-700 to-green-500 rounded-full left-1/2 -translate-x-1/2 top-[3px] shadow-md active:shadow-inner flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-green-100"
                viewBox="0 0 24 24"
              >
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
              </svg>
            </label>
          </div>
        </button>
      </div>
    </section>
  );
}
