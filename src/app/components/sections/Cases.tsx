'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTRY_SEEDS: Record<string, string> = {
  'Finlândia':  'finland-aurora',
  'Itália':     'tuscany-italy',
  'Dubai':      'dubai-desert',
  'Suíça':      'swiss-alps',
  'Lisboa':     'lisbon-portugal',
  'Mônaco':     'monaco-racing',
  'Berlim':     'berlin-city',
  'Costa Rica': 'costarica-nature',
  'Nepal':      'nepal-himalaya',
  'Japão':      'japan-tokyo',
};

function thumbUrl(location: string): string {
  const seed = COUNTRY_SEEDS[location] ?? location;
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/900/600`;
}

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
  { id: 1,  title: 'Aurora Boreal',  subtitle: 'neve e experiências únicas.',        location: 'Finlândia',   category: 'Incentivo',  bg: 'from-blue-950 to-indigo-950',    videoId: 'dQw4w9WgXcQ' },
  { id: 2,  title: 'Toscana',        subtitle: 'distância que une',       location: 'Playa del Carmen',      category: 'Convenção',  bg: 'from-amber-950 to-orange-950',   videoId: 'dQw4w9WgXcQ' },
  { id: 3,  title: 'Desert Drive',   subtitle: 'adrenalina pura',         location: 'Dubai',       category: 'Premiação',  bg: 'from-yellow-950 to-amber-900',   videoId: 'dQw4w9WgXcQ' },
  { id: 4,  title: 'Summit',         subtitle: 'onde ideias nascem',      location: 'Suíça',       category: 'Lançamento', bg: 'from-slate-900 to-zinc-800',     videoId: 'dQw4w9WgXcQ' },
  { id: 5,  title: 'Champions',      subtitle: 'a noite do triunfo',      location: 'Lisboa',      category: 'Premiação',  bg: 'from-green-950 to-teal-950',     videoId: 'dQw4w9WgXcQ' },
  { id: 6,  title: 'Grand Prix',     subtitle: 'velocidade e estilo',     location: 'Mônaco',      category: 'Incentivo',  bg: 'from-red-950 to-rose-950',       videoId: 'dQw4w9WgXcQ' },
  { id: 7,  title: 'Connected',      subtitle: 'tecnologia e pessoas',    location: 'Berlim',      category: 'Convenção',  bg: 'from-violet-950 to-purple-950',  videoId: 'dQw4w9WgXcQ' },
  { id: 8,  title: 'Natura',         subtitle: 'sustentabilidade em foco',location: 'Costa Rica',  category: 'Ativação',   bg: 'from-emerald-950 to-green-900',  videoId: 'dQw4w9WgXcQ' },
  { id: 9,  title: 'Altitude',       subtitle: 'conquistas no topo',      location: 'Nepal',       category: 'Incentivo',  bg: 'from-sky-950 to-blue-900',       videoId: 'dQw4w9WgXcQ' },
  { id: 10, title: 'Silk Road',      subtitle: 'cultura e conexão',       location: 'Japão',       category: 'Ativação',   bg: 'from-pink-950 to-fuchsia-950',   videoId: 'dQw4w9WgXcQ' },
  { id: 11, title: 'Aurora Boreal',  subtitle: 'Nova experiência',        location: 'Finlândia',   category: 'Incentivo',  bg: 'from-blue-950 to-indigo-950',    videoId: 'dQw4w9WgXcQ' },
  { id: 12, title: 'Toscana',        subtitle: 'distância que une',       location: 'Itália',      category: 'Convenção',  bg: 'from-amber-950 to-orange-950',   videoId: 'dQw4w9WgXcQ' },
  { id: 13, title: 'Desert Drive',   subtitle: 'adrenalina pura',         location: 'Dubai',       category: 'Premiação',  bg: 'from-yellow-950 to-amber-900',   videoId: 'dQw4w9WgXcQ' },
  { id: 14, title: 'Summit',         subtitle: 'onde ideias nascem',      location: 'Suíça',       category: 'Lançamento', bg: 'from-slate-900 to-zinc-800',     videoId: 'dQw4w9WgXcQ' },
  { id: 15, title: 'Champions',      subtitle: 'a noite do triunfo',      location: 'Lisboa',      category: 'Premiação',  bg: 'from-green-950 to-teal-950',     videoId: 'dQw4w9WgXcQ' },
  { id: 16, title: 'Grand Prix',     subtitle: 'velocidade e estilo',     location: 'Mônaco',      category: 'Incentivo',  bg: 'from-red-950 to-rose-950',       videoId: 'dQw4w9WgXcQ' },
];

// Ciclo de 16 itens (grid de 3 colunas):
// Padrão A: pos 0 → grande esq | pos 1 → pequeno
//           pos 2,3,4 → 3 pequenos
//           pos 5,6,7 → 3 pequenos
// Padrão B: pos 8 → pequeno | pos 9 → grande dir
//           pos 10,11,12 → 3 pequenos
//           pos 13,14,15 → 3 pequenos
function getSpan(index: number): 1 | 2 {
  const pos = index % 16;
  return pos === 0 || pos === 9 ? 2 : 1;
}

const INITIAL_COUNT = 8;

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
      <section id="cases" className="bg-white pt-4 pb-20 md:pt-6 md:pb-28">
        <div className="max-w-6xl mx-auto px-8">

          {/* Heading */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Cases<span className="text-brand">_</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCases.map((c, i) => {
              const span = getSpan(i);
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  onClick={() => openModal(c)}
                  className={`relative group overflow-hidden text-left focus:outline-none rounded-2xl ${
                    span === 2 ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                  style={{ height: '480px' }}
                >
                  {/* Thumbnail */}
                  <Image
                    src={thumbUrl(c.location)}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient tint */}
                  <div className={`absolute inset-0 bg-linear-to-br ${c.bg} opacity-60`} />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Country badge — top left */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand shrink-0 mt-2" />
                    <span className="text-white text-[12px] uppercase tracking-widest font-semibold mt-2">
                      {c.location}
                    </span>
                  </div>

                  {/* Text overlay + play icon */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-linear-to-t from-black/80 to-transparent">
                    <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.12v15.76a1.5 1.5 0 0 0 2.3 1.28l13.5-7.88a1.5 1.5 0 0 0 0-2.56L6.3 2.84z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">{c.title},</h3>
                    <p className="text-white/70 text-sm">{c.subtitle}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((n) => Math.min(n + 10, ALL_CASES.length))}
                className="border rounded-full px-8 py-3 text-sm tracking-widest transition-all duration-300 font-semibold"
                style={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
              >
                Carregar mais
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {modalCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-150 flex items-center justify-center bg-black/95 px-4"
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
