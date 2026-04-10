'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative flex-1 overflow-hidden bg-black">
      {/* Fallback gradient shown behind the video */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-900" />

      {/* Video background — swap src with real footage */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        {/* Place your video file at public/videos/hero.mp4 */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 pb-0 pt-32">
        {/* spacer */}
        <div />

        {/* Bottom row — text overflows section bottom, clipped by overflow-hidden */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[160px] md:text-[240px] lg:text-[320px] font-black text-white leading-none tracking-tighter lowercase translate-y-[20%]"
          >
            dream.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-right pb-[30%] md:pb-[12%]"
          >
            <p className="text-xs md:text-sm text-white/70 uppercase tracking-[0.2em] leading-relaxed">
              Comunicação<br />e Eventos
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
