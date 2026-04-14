'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  videoId: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'A dream transformou nossa convenção anual em algo que nossos colaboradores vão lembrar para sempre. A atenção aos detalhes e a criatividade foram impressionantes.',
    author: 'Bruna Schirman',
    role: 'CEO',
    company: 'SECOM',
    videoId: 'GwG92EaFTd8',
  },
  {
    id: 2,
    quote:
      'Nosso evento de premiação superou todas as expectativas. A dream entregou uma experiência que fortaleceu nossa cultura e motivou toda a equipe.',
    author: 'Ricardo Alves',
    role: 'Diretor de Marketing',
    company: 'Ambev',
    videoId: 'GwG92EaFTd8',
  },
  {
    id: 3,
    quote:
      'Profissionalismo do início ao fim. A dream entende o que é criar momentos que realmente conectam pessoas às marcas.',
    author: 'Fernanda Costa',
    role: 'Head of Events',
    company: 'Facebook BR',
    videoId: 'GwG92EaFTd8',
  },
];

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const current = TESTIMONIALS[index];

  function postCommand(command: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command }),
      '*'
    );
  }

  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setPlaying(true);
  }
  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
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

  return (
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-120">
        {/* Left: Embed */}
        <div className="group relative min-h-60 md:min-h-0 md:h-full md:rounded-tr-3xl md:rounded-br-3xl overflow-hidden bg-zinc-900 self-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
            </motion.div>
          </AnimatePresence>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Play/Pause button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center cursor-pointer"
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

          {/* Mobile prev/next arrows — bottom right */}
          <div className="md:hidden absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-brand"
              aria-label="Anterior"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l6-6M5 12l6 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-brand"
              aria-label="Próximo"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Quote */}
        <div className="flex flex-col justify-start px-8 md:px-16 pt-0 pb-10 bg-white">
          <div className="max-w-sm">
            {/* Giant orange quote mark */}
            <div className="text-[240px] text-brand font-bold leading-none mb-0 select-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>&ldquo;</div>

            {/* Section heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-6 -mt-24">
              A confiança<br />dos nossos clientes
            </h2>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg text-zinc-500 leading-relaxed mb-8"
              >
                &ldquo;{current.quote}&rdquo;
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
                <p className="text-zinc-900 font-semibold">{current.author}</p>
                <p className="text-zinc-400 text-sm mt-0.5">
                  {current.role} · {current.company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-12">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-brand bg-transparent flex items-center justify-center text-brand hover:bg-brand/10 transition-all duration-200"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M5 12l6-6M5 12l6 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2 border-brand bg-transparent flex items-center justify-center text-brand hover:bg-brand/10 transition-all duration-200"
              aria-label="Próximo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
