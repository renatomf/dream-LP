'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

export default function AboutClient({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="sobre"
      ref={ref}
      className="bg-white pt-10 pb-20 md:py-28 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Top row: title + description */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-bold text-black tracking-tight caret-transparent"
          >
            Sobre nós<span className="text-[#e85d04]">_</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed max-w-sm select-none"
          >
            Com centenas de eventos realizados no Brasil e no mundo, já percorremos:
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="flex divide-x divide-[#e85d04]/50 mb-14 max-w-2xl mx-auto select-none">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 px-3 first:pl-0 md:px-4"
            >
              <div className="text-3xl sm:text-4xl md:text-6xl font-black text-[#e85d04] leading-none mb-2 text-center select-none">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-[#1a1a1a]/70 whitespace-pre-line leading-snug text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom text + CTA */}
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-[#1a1a1a]/80 leading-relaxed w-full select-none"
          >
            Cada projeto nasce de estratégia e ganha forma com criatividade.
            <br />É assim que transformamos eventos em experiências memoráveis
          </motion.p>

          <motion.a
            href="https://wa.me/551151833323"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block bg-[#e85d04] text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-[#cf4f02] transition-colors select-none"
          >
            Vamos conversar
          </motion.a>
        </div>
      </div>
    </section>
  );
}
