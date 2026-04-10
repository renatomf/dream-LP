'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: '16', label: 'Anos' },
  { value: '18', label: 'Países' },
  { value: '64', label: 'Cidades' },
  { value: '45', label: 'Anos em valor' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sobre" ref={ref} className="bg-[#0d0d0d] py-24 md:py-32 px-8 md:px-16">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Sobre nós
          <span className="text-brand">_</span>
        </h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-8"
          >
            Com décadas de experiência no Brasil e no mundo, a dream é referência em
            eventos corporativos de alto impacto.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-white/40 leading-relaxed mb-10"
          >
            Temos vasto escopo de catálogo e gestão feita com criatividade.
            É assim que fazemos nossos clientes alcançarem objetivos inesquecíveis.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors font-semibold"
          >
            Conheça nossa história
          </motion.button>
        </div>

        {/* Right: stats */}
        <div className="grid grid-cols-2 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 pt-6"
            >
              <div className="text-5xl md:text-6xl font-black text-white leading-none mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
