"use client";

import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section className="relative bg-white pt-10 pb-10 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-8 flex items-center gap-20 md:gap-32">
        
        {/* Text */}
        <div className="flex-1">
          <motion.h2
            initial={{ opacity: 0, y: 170 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-10 font-light"
          >
            Transformamos ideias em experiências que despertam todos os
            sentidos.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-base md:text-lg text-black max-w-lg leading-relaxed font-light"
          >
            Envolvemos e conectamos pessoas e marcas.
          </motion.p>
        </div>

        {/* Orange gradient orb */}
        <div
          className="shrink-0 w-62 h-62 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(30deg, rgba(235, 30, 40, 1) 0%, rgba(242,116,33,0.8) 100%)",
            filter: "blur(24px)",
          }}
        />
      </div>
    </section>
  );
}
