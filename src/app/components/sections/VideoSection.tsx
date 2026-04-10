'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" style={{ height: '70vh' }}>
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        muted
        loop
        playsInline
        preload="metadata"
      >
        {/* Place your footage at public/videos/reel.mp4 */}
        <source src="/videos/reel.mp4" type="video/mp4" />
      </video>

      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-stone-900" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Play state indicator */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-7 h-7 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Top and bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
