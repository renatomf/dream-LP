'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

// Each counter starts only after the previous one finishes
function CountUp({ value, startDelay, duration = 900 }: { value: string; startDelay: number; duration?: number }) {
  const { num, suffix } = parseStatValue(value);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, num, duration]);

  return <>{count}{suffix}</>;
}

export default function AboutClient({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const COUNTER_DURATION = 900;

  return (
    <section
      id="sobre"
      ref={ref}
      className="bg-white pt-4 pb-8 md:pt-14 md:pb-28 scroll-mt-20"
    >
      <div className="max-w-360 mx-auto px-8">
        {/* Top row: title + description */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 mb-14 pt-2">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold text-black tracking-tight caret-transparent"
          >
            Sobre nós<span className="text-[#FF6200]">_</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md md:ml-24"
          >
            Com centenas de eventos realizados no Brasil e no mundo, já percorremos:
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:flex gap-y-10 gap-x-6 md:gap-0 mb-14 max-w-2xl mx-auto select-none md:divide-x md:divide-[#FF6200]/50">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:flex-1 md:px-4 md:first:pl-0"
            >
              <div className="text-6xl sm:text-5xl md:text-7xl font-black text-[#FF6200] leading-none mb-2 text-center select-none">
                {isInView ? (
                  <CountUp
                    value={stat.value}
                    startDelay={i * 600}
                    duration={COUNTER_DURATION}
                  />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-xs md:text-base text-[#1a1a1a]/70 whitespace-pre-line leading-snug text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom text + CTA */}
        <div className="flex flex-col items-center text-center gap-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-xl text-[#1a1a1a]/80 leading-relaxed w-full"
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
            className="inline-block bg-[#FF6200] text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-[#cf4f02] transition-colors select-none"
          >
            Vamos conversar
          </motion.a>
        </div>
      </div>
    </section>
  );
}
