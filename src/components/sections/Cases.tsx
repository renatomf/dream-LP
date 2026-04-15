'use client';

import { useState, useRef, useEffect } from 'react';
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
  { id: 1,  title: 'Aurora Boreal',  subtitle: 'neve e experiências únicas.',        location: 'Finlândia',   category: 'Incentivo',  bg: 'from-blue-950 to-indigo-950',    videoId: 'c5rWB_fS5ao' },
  { id: 2,  title: 'Toscana',        subtitle: 'distância que une',       location: 'Playa del Carmen',      category: 'Convenção',  bg: 'from-amber-950 to-orange-950',   videoId: 'c5rWB_fS5ao' },
  { id: 3,  title: 'Desert Drive',   subtitle: 'adrenalina pura',         location: 'Dubai',       category: 'Premiação',  bg: 'from-yellow-950 to-amber-900',   videoId: 'c5rWB_fS5ao' },
  { id: 4,  title: 'Summit',         subtitle: 'onde ideias nascem',      location: 'Suíça',       category: 'Lançamento', bg: 'from-slate-900 to-zinc-800',     videoId: 'c5rWB_fS5ao' },
  { id: 5,  title: 'Champions',      subtitle: 'a noite do triunfo',      location: 'Lisboa',      category: 'Premiação',  bg: 'from-green-950 to-teal-950',     videoId: 'c5rWB_fS5ao' },
  { id: 6,  title: 'Grand Prix',     subtitle: 'velocidade e estilo',     location: 'Mônaco',      category: 'Incentivo',  bg: 'from-red-950 to-rose-950',       videoId: 'c5rWB_fS5ao' },
  { id: 7,  title: 'Connected',      subtitle: 'tecnologia e pessoas',    location: 'Berlim',      category: 'Convenção',  bg: 'from-violet-950 to-purple-950',  videoId: 'c5rWB_fS5ao' },
  { id: 8,  title: 'Natura',         subtitle: 'sustentabilidade em foco',location: 'Costa Rica',  category: 'Ativação',   bg: 'from-emerald-950 to-green-900',  videoId: 'c5rWB_fS5ao' },
  { id: 9,  title: 'Altitude',       subtitle: 'conquistas no topo',      location: 'Nepal',       category: 'Incentivo',  bg: 'from-sky-950 to-blue-900',       videoId: 'c5rWB_fS5ao' },
  { id: 10, title: 'Silk Road',      subtitle: 'cultura e conexão',       location: 'Japão',       category: 'Ativação',   bg: 'from-pink-950 to-fuchsia-950',   videoId: 'c5rWB_fS5ao' },
  { id: 11, title: 'Aurora Boreal',  subtitle: 'Nova experiência',        location: 'Finlândia',   category: 'Incentivo',  bg: 'from-blue-950 to-indigo-950',    videoId: 'c5rWB_fS5ao' },
  { id: 12, title: 'Toscana',        subtitle: 'distância que une',       location: 'Itália',      category: 'Convenção',  bg: 'from-amber-950 to-orange-950',   videoId: 'c5rWB_fS5ao' },
  { id: 13, title: 'Desert Drive',   subtitle: 'adrenalina pura',         location: 'Dubai',       category: 'Premiação',  bg: 'from-yellow-950 to-amber-900',   videoId: 'c5rWB_fS5ao' },
  { id: 14, title: 'Summit',         subtitle: 'onde ideias nascem',      location: 'Suíça',       category: 'Lançamento', bg: 'from-slate-900 to-zinc-800',     videoId: 'c5rWB_fS5ao' },
  { id: 15, title: 'Champions',      subtitle: 'a noite do triunfo',      location: 'Lisboa',      category: 'Premiação',  bg: 'from-green-950 to-teal-950',     videoId: 'c5rWB_fS5ao' },
  { id: 16, title: 'Grand Prix',     subtitle: 'velocidade e estilo',     location: 'Mônaco',      category: 'Incentivo',  bg: 'from-red-950 to-rose-950',       videoId: 'c5rWB_fS5ao' },
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const visibleCases = ALL_CASES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_CASES.length;

  function openModal(c: Case) {
    const idx = ALL_CASES.findIndex((x) => x.id === c.id);
    setCarouselIndex(idx);
    setModalCase(c);
    setIsPlaying(true);
  }

  function navigate(dir: 1 | -1) {
    const next = (carouselIndex + dir + ALL_CASES.length) % ALL_CASES.length;
    setCarouselIndex(next);
    setModalCase(ALL_CASES[next]);
    setIsPlaying(true);
  }

  function togglePlay() {
    const cmd = isPlaying ? 'pauseVideo' : 'playVideo';
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: cmd, args: [] }),
      '*'
    );
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <section id="cases" className="bg-white pt-4 pb-20 md:pt-0 md:pb-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-8">

          {/* Heading */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight caret-transparent">
              Cases<span className="text-brand">_</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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
                  style={{ height: 'clamp(330px, 50vw, 480px)' }}
                >
                  {/* Thumbnail */}
                  <Image
                    src={thumbUrl(c.location)}
                    alt={c.title}
                    fill
                    sizes={span === 2
                      ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw'
                      : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                    priority={i === 0}
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

      {/* Strip Modal */}
      <AnimatePresence>
        {modalCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-150 bg-black overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => setModalCase(null)}
              className="absolute top-5 right-5 z-10 text-white hover:text-[#e85d04] transition-colors text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Fechar <span className="text-2xl leading-none">×</span>
            </button>

            {/* Sliding strip */}
            <div className="relative w-full h-full">
              {/* Edge gradients — desktop only */}
              {!isMobile && <>
                <div className="absolute inset-y-0 left-0 w-40 z-30 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), transparent)' }} />
                <div className="absolute inset-y-0 right-0 w-40 z-30 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.85), transparent)' }} />
              </>}
              <motion.div
                className="flex h-full"
                animate={{
                  x: isMobile
                    ? `calc(-${carouselIndex} * 100vw)`
                    : `calc(50vw - ${carouselIndex} * (100vw / 3.2) - (100vw / 3.2) / 2)`,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: isMobile ? `calc(${ALL_CASES.length} * 100vw)` : `calc(${ALL_CASES.length} * (100vw / 3.2))` }}
              >
                {ALL_CASES.map((c, i) => {
                  const isActive = i === carouselIndex;
                  return (
                    <div
                      key={c.id}
                      onClick={() => { setCarouselIndex(i); setModalCase(c); }}
                      className="relative h-full shrink-0 cursor-pointer overflow-hidden"
                      style={{ width: isMobile ? '100vw' : 'calc(100vw / 3.2)' }}
                    >
                      {/* Thumbnail (always present as background) */}
                      <Image
                        src={thumbUrl(c.location)}
                        alt={c.title}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />

                      {/* Video iframe — cover-fills the active card */}
                      {isActive && (
                        <iframe
                          ref={iframeRef}
                          key={c.id}
                          className="absolute z-10 pointer-events-none"
                          style={{
                            top: '50%',
                            left: '50%',
                            width: 'max(100%, 177.78vh)',
                            height: 'max(100%, 56.25vw)',
                            transform: 'translate(-50%, -50%)',
                          }}
                          src={`https://www.youtube.com/embed/${c.videoId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&loop=1&playlist=${c.videoId}&enablejsapi=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}


                      {/* Dark overlay — hidden on active (video shows instead) */}
                      <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{ background: isActive ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.55)', zIndex: isActive ? 0 : 1 }}
                      />

                      {/* Location badge */}
                      <div className="absolute top-6 left-5 z-20 flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 transition-all duration-500"
                          style={{ background: isActive ? 'var(--brand)' : 'rgba(255,255,255,0.4)' }}
                        />
                        <span className="text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
                          {c.location}
                        </span>
                      </div>

                      {/* Active: play/pause + title + nav */}
                      {isActive && (
                        <>
                          {/* Play/Pause button — center */}
                          <button
                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                            className="absolute inset-0 z-20 flex items-center justify-center group"
                            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                          >
                            <div className={`w-16 h-16 rounded-full border-2 border-white/70 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                              {isPlaying ? (
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              )}
                            </div>
                          </button>

                          {/* Title bottom */}
                          <div className="absolute bottom-24 left-5 z-20">
                            <span className="text-brand text-xs uppercase tracking-widest">{c.category}</span>
                            <h3 className="text-white font-bold text-xl mt-1">{c.title}</h3>
                            <p className="text-white/60 text-sm">{c.subtitle}</p>
                          </div>

                          {/* Navigation arrows */}
                          <div
                            className="absolute bottom-8 left-1/2 z-20 flex gap-3"
                            style={{ transform: 'translateX(-50%)' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => navigate(-1)}
                              className="w-11 h-11 rounded-full border border-brand flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all"
                              aria-label="Anterior"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => navigate(1)}
                              className="w-11 h-11 rounded-full border border-brand flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all"
                              aria-label="Próximo"
                            >
                              →
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
