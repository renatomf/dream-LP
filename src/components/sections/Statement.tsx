"use client";

import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section className="relative bg-white pt-4 pb-14 md:pt-14 md:pb-28 overflow-hidden md:overflow-visible">
      <div className="relative z-10 max-w-360 mx-auto px-8 flex items-center gap-6 md:gap-32">

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
            className="text-2xl md:text-5xl lg:text-6xl text-black leading-tight mb-3 md:mb-8 tracking-tight"
            style={{ fontWeight: 300 }}
          >
            Transformamos ideias <br className="hidden md:block"/> em experiências que despertam <br className="hidden md:block"/> todos os
            sentidos.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-sm md:text-xl text-black max-w-lg leading-relaxed  md:ml-2"
            style={{ fontWeight: 300 }}
          >
            Envolvemos e conectamos pessoas e marcas.
          </motion.p>
        </div>

        {/* Orange gradient orb */}
        <div
          className="shrink-0 w-50 h-50 md:w-80 md:h-80 rounded-full pointer-events-none translate-x-16 translate-y-4 md:translate-x-0 md:translate-y-0"
          style={{
            background:
              "linear-gradient(30deg, rgba(235, 30, 40, 1) 0%, rgba(242,116,33,0.8) 100%)",
            filter: "blur(32px)",
          }}
        />
      </div>
    </section>
  );
}
