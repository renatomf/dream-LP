"use client";

import { useRef, useEffect } from "react";

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
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />

      {/* Circular logo centered over video */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <svg
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 100, height: 100 }}
        >
          <defs>
            <path id="topArc" d="M 20,110 A 90,90 0 0,1 200,110" />
            <path id="bottomArc" d="M 200,110 A 90,90 0 0,1 20,110" />
          </defs>
          <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-geist-sans), sans-serif" fontWeight={100}>
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">YOU DREAM</textPath>
          </text>
          <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-geist-sans), sans-serif" fontWeight={100}>
            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">WE DELIVER</textPath>
          </text>
          <circle cx="20" cy="110" r="5" fill="#e02020" />
          <circle cx="200" cy="110" r="5" fill="#e02020" />
          {/* Down arrow in the center */}
          <path
            d="M110,85 L110,118 M98,106 L110,118 L122,106"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 pb-0 pt-32">
        {/* spacer */}
        <div />

        {/* Bottom row — text overflows section bottom, clipped by overflow-hidden */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-start gap-6 md:gap-4 select-none">
          <h1 className="text-[20vw] sm:text-[16vw] md:text-[20vw] lg:text-[23vw] font-black text-white leading-none tracking-tighter lowercase translate-y-[10%] md:translate-y-[20%] text-center md:text-left">
            dream
          </h1>

          <div className="text-center md:text-left pb-[10%] md:pb-[5%] md:ml-[4vw]">
            <p className="text-[6vw] sm:text-[4vw] md:text-[2vw] lg:text-[1.3vw] text-white/70 tracking-[0.2em] leading-relaxed">
              Comunicação
              <br />e Eventos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
