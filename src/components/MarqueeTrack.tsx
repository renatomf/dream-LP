'use client';

import { useRef, useEffect } from 'react';

export default function MarqueeTrack({
  speed = 80,
  className = '',
  children,
}: {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const lastRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function tick(ts: number) {
      if (!track) return;
      const dt = lastRef.current === null ? 0 : (ts - lastRef.current) / 1000;
      lastRef.current = ts;

      xRef.current -= speed * dt;

      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(xRef.current) >= halfWidth) {
        xRef.current += halfWidth;
      }

      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div ref={trackRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
