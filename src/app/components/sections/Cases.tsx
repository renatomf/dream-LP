'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Case {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  bg: string;
  videoId: string;
}

const ALL_CASES: Case[] = [
  { id: 1, title: 'Aurora Boreal', subtitle: 'Nova experiência', location: 'Finlândia', category: 'Incentivo', bg: 'from-blue-950 to-indigo-950', videoId: 'dQw4w9WgXcQ' },
  { id: 2, title: 'Toscana', subtitle: 'distância que une', location: 'Itália', category: 'Convenção', bg: 'from-amber-950 to-orange-950', videoId: 'dQw4w9WgXcQ' },
  { id: 3, title: 'Desert Drive', subtitle: 'adrenalina pura', location: 'Dubai', category: 'Premiação', bg: 'from-yellow-950 to-amber-900', videoId: 'dQw4w9WgXcQ' },
  { id: 4, title: 'Summit', subtitle: 'onde ideias nascem', location: 'Suíça', category: 'Lançamento', bg: 'from-slate-900 to-zinc-800', videoId: 'dQw4w9WgXcQ' },
  { id: 5, title: 'Champions', subtitle: 'a noite do triunfo', location: 'Lisboa', category: 'Premiação', bg: 'from-green-950 to-teal-950', videoId: 'dQw4w9WgXcQ' },
  { id: 6, title: 'Grand Prix', subtitle: 'velocidade e estilo', location: 'Mônaco', category: 'Incentivo', bg: 'from-red-950 to-rose-950', videoId: 'dQw4w9WgXcQ' },
  { id: 7, title: 'Connected', subtitle: 'tecnologia e pessoas', location: 'Berlim', category: 'Convenção', bg: 'from-violet-950 to-purple-950', videoId: 'dQw4w9WgXcQ' },
  { id: 8, title: 'Natura', subtitle: 'sustentabilidade em foco', location: 'Costa Rica', category: 'Ativação', bg: 'from-emerald-950 to-green-900', videoId: 'dQw4w9WgXcQ' },
  { id: 9, title: 'Altitude', subtitle: 'conquistas no topo', location: 'Nepal', category: 'Incentivo', bg: 'from-sky-950 to-blue-900', videoId: 'dQw4w9WgXcQ' },
];

const INITIAL_COUNT = 6;

export default function Cases() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [modalCase, setModalCase] = useState<Case | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const visibleCases = ALL_CASES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_CASES.length;

  function openModal(c: Case) {
    const idx = ALL_CASES.findIndex((x) => x.id === c.id);
    setCarouselIndex(idx);
    setModalCase(c);
  }

  function navigate(dir: 1 | -1) {
    const next = (carouselIndex + dir + ALL_CASES.length) % ALL_CASES.length;
    setCarouselIndex(next);
    setModalCase(ALL_CASES[next]);
  }

  return (
    <>
      <section id="cases" className="bg-black py-20 md:py-28 px-8 md:px-16">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Cases
            <span className="text-brand">_</span>
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First item: featured (spans 2 rows on large) */}
          {visibleCases.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              onClick={() => openModal(c)}
              className={`relative group overflow-hidden text-left focus:outline-none ${
                i === 0 ? 'lg:row-span-2' : ''
              }`}
              style={{ minHeight: i === 0 ? '480px' : '220px' }}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} transition-transform duration-700 group-hover:scale-105`} />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-brand text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                  {c.category}
                </span>
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white/60 uppercase tracking-widest mb-1">{c.location}</p>
                <h3 className="text-white font-bold text-lg leading-tight">{c.title},</h3>
                <p className="text-white/70 text-sm">{c.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((n) => Math.min(n + 3, ALL_CASES.length))}
              className="border border-white/30 text-white px-10 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-semibold"
            >
              Carregar mais
            </button>
          </div>
        )}
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {modalCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 px-4"
            onClick={() => setModalCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setModalCase(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-2"
              >
                Fechar <span className="text-xl leading-none">×</span>
              </button>

              {/* Video */}
              <div className="relative aspect-video bg-black">
                <iframe
                  key={modalCase.id}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${modalCase.videoId}?autoplay=1&mute=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Info + Navigation */}
              <div className="flex items-center justify-between mt-4 px-1">
                <div>
                  <span className="text-brand text-xs uppercase tracking-widest">{modalCase.category}</span>
                  <h3 className="text-white font-bold mt-1">{modalCase.title} — {modalCase.location}</h3>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => navigate(1)}
                    className="w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    aria-label="Próximo"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {ALL_CASES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCarouselIndex(i); setModalCase(ALL_CASES[i]); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === carouselIndex ? 'bg-brand w-4' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
