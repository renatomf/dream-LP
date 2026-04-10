'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative bg-black py-28 md:py-40 px-8 md:px-16 overflow-hidden"
    >
      {/* Orange gradient orb */}
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,85,0,0.35) 0%, rgba(255,85,0,0.08) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-10"
        >
          Transformamos ideias em experiências que despertam{' '}
          <span className="text-brand">todos os sentidos.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/50 max-w-lg leading-relaxed"
        >
          Envolvemos e conectamos pessoas e marcas.
        </motion.p>
      </div>
    </section>
  );
}
