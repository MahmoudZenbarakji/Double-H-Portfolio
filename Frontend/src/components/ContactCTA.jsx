// src/components/ContactCTA.jsx
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="relative py-12 bg-[#f8f9fa] border-y border-gray-100 overflow-hidden">
      {/* خلفية جمالية: نص باهت يتحرك خلف المحتوى */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
        <h2 className="text-[12rem] font-black tracking-tighter text-[#143939]">DOUBLE H</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* الجانب الأيسر: النص */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "'Dosis', sans-serif" }}
            className="text-center lg:text-left flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#143939] leading-tight mb-2">
              Have a Vision? <span className="text-[#d7d7d7]">Let’s Build It.</span>
            </h2>
            <p className="text-gray-500 font-light text-base md:text-lg max-w-xl">
              Don’t hesitate to share your thoughts. Request your custom architectural design today.
            </p>
          </motion.div>

          {/* الجانب الأيمن: زر الاتصال التفاعلي */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto"
          >
            <a 
              href="mailto:double.h.bim@gmail.com"
              className="group relative flex items-center gap-4 bg-[#143939] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#143939]/30"
            >
              <div className="flex flex-col items-start relative z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-70 group-hover:text-[#d7d7d7]">Email us at</span>
                <span className="text-lg font-bold tracking-tight">double.h.bim@gmail.com</span>
              </div>
              
              <div className="bg-white/10 p-2 rounded-full relative z-10 group-hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6 rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* تأثير الانزلاق عند الـ Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a4a4a] to-[#143939] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}