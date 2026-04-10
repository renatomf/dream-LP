'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  bg: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'A dream transformou nossa convenção anual em algo que nossos colaboradores vão lembrar para sempre. A atenção aos detalhes e a criatividade foram impressionantes.',
    author: 'Bruna Schirman',
    role: 'CEO',
    company: 'SECOM',
    bg: 'from-zinc-800 to-zinc-900',
  },
  {
    id: 2,
    quote:
      'Nosso evento de premiação superou todas as expectativas. A dream entregou uma experiência que fortaleceu nossa cultura e motivou toda a equipe.',
    author: 'Ricardo Alves',
    role: 'Diretor de Marketing',
    company: 'Ambev',
    bg: 'from-slate-800 to-slate-900',
  },
  {
    id: 3,
    quote:
      'Profissionalismo do início ao fim. A dream entende o que é criar momentos que realmente conectam pessoas às marcas.',
    author: 'Fernanda Costa',
    role: 'Head of Events',
    company: 'Facebook BR',
    bg: 'from-neutral-800 to-neutral-900',
  },
];

function VideoThumb({ bg, active }: { bg: string; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => {});
  }
  function handleMouseLeave() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
        muted
        loop
        playsInline
        preload="none"
      >
        <source src="/videos/testimonial.mp4" type="video/mp4" />
      </video>
      {/* Fallback gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg}`} />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Play hint on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full border border-white/60 flex items-center justify-center">
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
        {/* Left: Video */}
        <div className="relative min-h-[360px] md:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <VideoThumb bg={current.bg} active={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Quote */}
        <div className="flex flex-col justify-between px-8 md:px-16 py-14 md:py-20 bg-[#0d0d0d]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand mb-6">
              A confiança dos nossos clientes
            </p>

            {/* Giant quote marks */}
            <div className="text-[80px] text-brand/30 font-serif leading-none mb-4 select-none">"</div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-white/80 leading-relaxed mb-8"
              >
                {current.quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-author'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-white font-semibold">{current.author}</p>
                <p className="text-white/40 text-sm mt-0.5">
                  {current.role} · {current.company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200"
              aria-label="Próximo"
            >
              →
            </button>
            <div className="flex gap-2 ml-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-brand' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
