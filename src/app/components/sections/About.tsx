'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: '16', label: 'Anos' },
  { value: '18', label: 'Países' },
  { value: '64', label: 'Cidades' },
  { value: '45', label: 'Voltas ao redor\ndo mundo' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="sobre"
      ref={ref}
      className="bg-white py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-8">
      {/* Top row: title + description */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl font-bold text-black tracking-tight"
        >
          Sobre nós<span className="text-[#e85d04]">_</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed max-w-sm"
        >
          Com centenas de eventos realizados no Brasil e no mundo, já percorremos:
        </motion.p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-y-8 md:flex md:items-start md:divide-x md:divide-[#c9a090] mb-14 max-w-2xl mx-auto">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 px-4 md:px-3 md:first:pl-0 ${i % 2 === 0 ? 'border-r border-[#e85d04]/70 md:border-r-0' : ''}`}
          >
            <div className="text-5xl md:text-6xl font-black text-[#e85d04] leading-none mb-2 text-center">
              {stat.value}
            </div>
            <p className="text-xs md:text-sm text-[#1a1a1a]/70 whitespace-pre-line leading-snug text-center">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom text + CTA */}
      <div className="flex flex-col items-center text-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-[#1a1a1a]/80 leading-relaxed max-w-lg"
        >
          Cada projeto nasce de estratégia e ganha forma com criatividade.
          <br />É assim que transformamos eventos em experiências memoráveis
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#e85d04] text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-[#cf4f02] transition-colors"
        >
          Vamos conversar
        </motion.button>
      </div>
      </div>
    </section>
  );
}
