import React from "react";
import styled from "styled-components"; 
import {
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  GlobeAltIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const services = [
  { icon: <BuildingOfficeIcon className="w-8 h-8 text-[#143939]" />, title: "Architectural Design", color: "142, 249, 252" },
  { icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-[#143939]" />, title: "Project Supervision", color: "142, 252, 204" },
  { icon: <GlobeAltIcon className="w-8 h-8 text-[#143939]" />, title: "Sustainable Development", color: "142, 252, 157" },
  { icon: <CubeIcon className="w-8 h-8 text-[#143939]" />, title: "3D Modeling", color: "215, 252, 142" },
  { icon: <ChartBarIcon className="w-8 h-8 text-[#143939]" />, title: "Consulting", color: "252, 208, 142" },
  { icon: <Cog6ToothIcon className="w-8 h-8 text-[#143939]" />, title: "Technical Solutions", color: "252, 142, 142" },
];

const ServicesCards = () => {
  return (
    <StyledSection>
      <div className="bg-decorations">
        <motion.div 
          animate={{ x: [0, 50, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="blob blob-1"
        ></motion.div>
        
        <motion.div 
          animate={{ x: [0, -60, 20, 0], y: [0, -40, -20, 0], scale: [1, 0.8, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="blob blob-2"
        ></motion.div>

        <div className="light-spot"></div>
        <div className="grid-overlay"></div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative z-20 w-fit mx-auto text-center text-3xl md:text-5xl font-extrabold 
               bg-gradient-to-r from-green-700 via-gray-600 to-green-500 
               bg-clip-text text-transparent tracking-wide"
      >
        Our Services
      </motion.h2>

      <div className="layout">
        <div className="wrapper">
          <div className="inner" style={{ "--quantity": services.length }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="card"
                style={{ "--index": i, "--color-card": s.color }}
              >
                <div className="img">
                  <div className="content">
                    {s.icon}
                    <h3 className="card-h3">{s.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="info-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="info-title"
          >
            Why Choose Our Services
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="info-paragraph"
          >
            We provide architectural solutions with precision, creativity, and
            sustainability.
          </motion.p>
          
          <ul className="info-list">
            {["Expert Architectural Design", "Sustainable & Modern Solutions", "Professional Supervision", "Innovative 3D Visualization"].map((text, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                ✔ {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background-color: #d4dcd6; 
  background: linear-gradient(135deg, #d4dcd6 0%, #bbc7be 100%);
  padding: 6rem 1rem; /* زيادة البادينج الكلي للقسم */
  position: relative;
  overflow: hidden;

  .bg-decorations {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    .grid-overlay {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(20, 57, 57, 0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(20, 57, 57, 0.04) 1px, transparent 1px);
      background-size: 45px 45px;
      animation: gridMove 60s linear infinite;
    }
    .blob { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(100px); opacity: 0.25; }
    .blob-1 { background: #8fa79b; top: -15%; left: -10%; }
    .blob-2 { background: #adbdb1; bottom: -15%; right: -10%; }
    .light-spot {
      position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
      animation: pulseLight 10s ease-in-out infinite alternate;
    }
  }

  @keyframes gridMove { from { background-position: 0 0; } to { background-position: 100px 100px; } }
  @keyframes pulseLight { from { opacity: 0.3; transform: translate(-50%, -50%) scale(1); } to { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); } }

  .layout {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    max-width: 1200px;
    margin: 100px auto 0 auto;
    position: relative;
    z-index: 10;
    
    @media (max-width: 968px) {
      flex-direction: column;
      margin-top: 180px; /* مسافة كبيرة بين العنوان والكروت */
      gap: 15rem; /* مسافة كبيرة بين الكروت الدوارة والكارد اليميني */
    }
  }

  .wrapper {
    flex: 1;
    height: 400px;
    position: relative;
    display: flex;
    justify-content: center;
    perspective: 1200px;
    @media (max-width: 968px) {
      height: 200px; /* تقليل المساحة المحجوزة للكروت لمنع التداخل */
    }
  }

  .inner {
    --w: 120px; --h: 180px; --translateZ: 250px; --rotateX: -10deg;
    position: absolute; width: var(--w); height: var(--h);
    transform-style: preserve-3d; animation: rotating 25s linear infinite;
    left: 50%; top: 50%; margin-left: calc(var(--w) / -2); margin-top: calc(var(--h) / -2);
    @media (max-width: 640px) { --w: 100px; --h: 150px; --translateZ: 170px; }
  }

  @keyframes rotating { from { transform: rotateX(var(--rotateX)) rotateY(0); } to { transform: rotateX(var(--rotateX)) rotateY(1turn); } }

  .card {
    position: absolute; border: 2px solid rgba(var(--color-card), 0.7); border-radius: 12px; inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
    background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); overflow: hidden;
  }

  .img {
    width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle, rgba(var(--color-card), 0.5) 0%, rgba(var(--color-card), 0.9) 100%);
  }

  .content { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10px; }
  .card-h3 { margin-top: 12px; font-size: 0.85rem; font-weight: 700; color: #143939; }

  .info-card {
    flex: 0.8;
    background: rgba(20, 57, 57, 0.95);
    border-radius: 2rem;
    padding: 3rem;
    color: #fff;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    @media (max-width: 968px) {
      width: 95%;
      margin: 0 auto;
      /* تم النزول تلقائياً بسبب فجوة الـ gap في الـ layout */
    }
  }

  .info-title { font-size: 1.8rem; font-weight: 800; color: #8efccc; margin-bottom: 1rem; }
  .info-list li { margin-top: 10px; display: flex; align-items: center; gap: 10px; opacity: 0.9; }
  .inner:hover { animation-play-state: paused; }
`;

export default ServicesCards;