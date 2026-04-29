'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export interface CaseItem {
  _id: string;
  title: string;
  location: string;
  mediaType?: string;
  videoId?: string;
  thumbUrl?: string;
}

function getSpan(index: number): 1 | 2 {
  const pos = index % 16;
  return pos === 0 || pos === 9 ? 2 : 1;
}

const INITIAL_COUNT = 8;

export default function CasesClient({ cases }: { cases: CaseItem[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [modalCase, setModalCase] = useState<CaseItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!modalCase) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalCase(null); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalCase]);

  const visibleCases = cases.slice(0, visibleCount);
  const hasMore = visibleCount < cases.length;

  function openModal(c: CaseItem) {
    const idx = cases.findIndex((x) => x._id === c._id);
    setCarouselIndex(idx);
    setModalCase(c);
    setIsPlaying(true);
  }

  function navigate(dir: 1 | -1) {
    const next = (carouselIndex + dir + cases.length) % cases.length;
    setCarouselIndex(next);
    setModalCase(cases[next]);
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
        <div className="max-w-360 mx-auto px-8">

          {/* Heading */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight caret-transparent">
              Cases<span className="text-brand">_</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {visibleCases.map((c, i) => {
              const span = getSpan(i);
              return (
                <motion.button
                  key={c._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  onClick={() => openModal(c)}
                  className={`relative group overflow-hidden text-left focus:outline-none rounded-2xl cursor-pointer ${
                    span === 2 ? 'aspect-3/4 md:aspect-3/2 lg:aspect-auto lg:col-span-2' : 'aspect-3/4 lg:col-span-1'
                  }`}
                >
                  {/* Thumbnail */}
                  {c.thumbUrl && (
                    <Image
                      src={c.thumbUrl}
                      alt={c.title}
                      fill
                      sizes={span === 2
                        ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw'
                        : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="object-cover duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Gradient tint */}
                  <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Gradient bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 z-10 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Container principal */}
                  <div className="absolute inset-6 sm:inset-8 z-20 flex flex-col justify-between">

                    {/* Topo — badge */}
                    <div className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand shrink-0 mt-0.75" />
                      <span className="text-white text-[12px] uppercase tracking-[0.3em] font-semibold">
                        {c.location}
                      </span>
                    </div>

                    {/* Fundo — play fixo no topo, título fixo no fundo */}
                    <div className="relative h-31.5 sm:h-35.75 md:h-39.75">
                      {/* Play button — sempre fixo */}
                      <div className="absolute -top-2 sm:-top-3 left-0">
                        {c.mediaType !== 'image' && c.videoId && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand flex items-center justify-center">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" strokeWidth={0} />
                          </div>
                        )}
                      </div>

                      {/* Título — sempre inicia abaixo do play */}
                      <div className="absolute top-14 sm:top-16 left-0 right-0 bottom-0 overflow-hidden">
                        <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-snug whitespace-pre-line">{c.title}</h3>
                      </div>
                    </div>

                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((n) => Math.min(n + 10, cases.length))}
                className="border border-brand text-brand rounded-full px-8 py-3 text-sm tracking-widest font-semibold cursor-pointer hover:bg-brand hover:text-white transition-colors"
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
              className="absolute top-5 right-5 z-40 text-white hover:text-[#e85d04] transition-colors text-sm uppercase tracking-widest flex items-center gap-2"
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
                style={{ width: isMobile ? `calc(${cases.length} * 100vw)` : `calc(${cases.length} * (100vw / 3.2))` }}
              >
                {cases.map((c, i) => {
                  const isActive = i === carouselIndex;
                  return (
                    <div
                      key={c._id}
                      onClick={() => { setCarouselIndex(i); setIsPlaying(true); setModalCase(c); }}
                      className="relative h-full shrink-0 cursor-pointer overflow-hidden"
                      style={{ width: isMobile ? '100vw' : 'calc(100vw / 3.2)' }}
                    >
                      {/* Thumbnail (always present as background) */}
                      {c.thumbUrl && (
                        <Image
                          src={c.thumbUrl}
                          alt={c.title}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      )}

                      {/* Video iframe or full image — active card only */}
                      {isActive && c.mediaType !== 'image' && c.videoId && (
                        <iframe
                          ref={iframeRef}
                          key={c._id}
                          className="absolute z-10 pointer-events-none"
                          style={{
                            top: '50%',
                            left: '50%',
                            width: 'max(100%, 177.78vh)',
                            height: 'max(100%, 56.25vw)',
                            transform: 'translate(-50%, -50%)',
                          }}
                          src={`https://www.youtube.com/embed/${c.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${c.videoId}&enablejsapi=1`}
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
                          {/* Play/Pause button — video only */}
                          {c.mediaType !== 'image' && c.videoId && (
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
                          )}

                          {/* Title bottom */}
                          <div className="absolute bottom-24 left-5 z-20">
                            <h3 className="text-white font-bold text-xl mt-1 whitespace-pre-line">{c.title}</h3>
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
