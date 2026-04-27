'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface TestimonialItem {
  _id: string;
  quote: string;
  author: string;
  company: string;
  mediaType?: string;
  videoId?: string;
  imageUrl?: string;
}

export default function TestimonialClient({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const current = testimonials[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
      setPlaying(true);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  function postCommand(command: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command }),
      '*'
    );
  }

  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setPlaying(true);
  }

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
    setPlaying(true);
  }

  function togglePlay() {
    if (playing) {
      postCommand('pauseVideo');
    } else {
      postCommand('playVideo');
    }
    setPlaying(!playing);
  }

  if (!current) return null;

  const hasVideo = current.mediaType === 'video' && Boolean(current.videoId);

  return (
    <section className="bg-white overflow-hidden pt-8">
      <div className="grid grid-cols-1 md:grid-cols-[46%_62%] min-h-120">
        
        {/* LEFT */}
        <div className="group relative min-h-60 md:min-h-0 md:h-full md:rounded-tr-3xl md:rounded-br-3xl overflow-hidden bg-zinc-900 self-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {hasVideo ? (
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.05]"
                  style={{ aspectRatio: '16/9', minHeight: '100%', minWidth: '100%' }}
                >
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1&mute=1&loop=1&playlist=${current.videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                    title={`Depoimento de ${current.author}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="border-0 w-full h-full"
                  />
                </div>
              ) : current.mediaType === 'image' && current.imageUrl ? (
                <Image
                  src={current.imageUrl}
                  alt={`Depoimento de ${current.author}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-800" />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                type="button"
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center"
              >
                {playing ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col px-8 md:px-16 pb-10 bg-white">
          <div className="max-w-sm pt-6">

            {/* 🔥 QUOTE + SETAS (mobile only) */}
            <div className="flex items-start justify-between md:block">
              
              <div
                className="text-[160px] md:text-[240px] text-brand font-bold leading-none select-none"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                &ldquo;
              </div>

              {/* MOBILE */}
              <div className="flex gap-2 mt-6 shrink-0 md:hidden">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border-2 border-brand text-brand flex items-center justify-center"
                  aria-label="Anterior"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l6-6M5 12l6 6" />
                  </svg>
                </button>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border-2 border-brand text-brand flex items-center justify-center"
                  aria-label="Próximo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M14 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

            </div>

            {/* TITLE */}
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 leading-tight mb-6 -mt-16 md:-mt-24">
              A confiança dos nossos clientes
            </h2>

            {/* QUOTE */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-lg text-zinc-500 leading-relaxed mb-8"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* AUTHOR */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current._id + '-author'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-zinc-900 font-semibold text-sm md:text-base">
                  {current.author}
                </p>
                <p className="text-zinc-400 text-xs md:text-sm mt-0.5">
                  {current.company}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 💻 DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-3 mt-12">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-brand text-brand flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l6-6M5 12l6 6" />
                </svg>
              </button>

              <button
                onClick={next}
                className="w-11 h-11 rounded-full border-2 border-brand text-brand flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M14 6l6 6-6 6" />
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}