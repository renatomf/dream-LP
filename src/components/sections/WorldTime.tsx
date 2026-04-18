'use client';

import { useRef, useEffect } from 'react';

const TIMEZONES = [
  { gmt: 'GMT-12', city: 'Ilhas Baker', tz: 'Etc/GMT+12' },
  { gmt: 'GMT-11', city: 'Pago Pago', tz: 'Pacific/Pago_Pago' },
  { gmt: 'GMT-10', city: 'Honolulu', tz: 'Pacific/Honolulu' },
  { gmt: 'GMT-9', city: 'Anchorage', tz: 'America/Anchorage' },
  { gmt: 'GMT-8', city: 'Los Angeles', tz: 'America/Los_Angeles' },
  { gmt: 'GMT-7', city: 'Las Vegas', tz: 'America/Denver' },
  { gmt: 'GMT-6', city: 'Cidade do México', tz: 'America/Mexico_City' },
  { gmt: 'GMT-5', city: 'Nova York', tz: 'America/New_York' },
  { gmt: 'GMT-4', city: 'Santiago', tz: 'America/Santiago' },
  { gmt: 'GMT-3', city: 'São Paulo', tz: 'America/Sao_Paulo' },
  { gmt: 'GMT-2', city: 'Fernando de Noronha', tz: 'America/Noronha' },
  { gmt: 'GMT-1', city: 'Cabo Verde', tz: 'Atlantic/Cape_Verde' },
  { gmt: 'GMT+0', city: 'Londres', tz: 'Europe/London' },
  { gmt: 'GMT+1', city: 'Paris', tz: 'Europe/Paris' },
  { gmt: 'GMT+2', city: 'Cairo', tz: 'Africa/Cairo' },
  { gmt: 'GMT+3', city: 'Moscou', tz: 'Europe/Moscow' },
  { gmt: 'GMT+4', city: 'Dubai', tz: 'Asia/Dubai' },
  { gmt: 'GMT+5', city: 'Karachi', tz: 'Asia/Karachi' },
  { gmt: 'GMT+6', city: 'Dhaka', tz: 'Asia/Dhaka' },
  { gmt: 'GMT+7', city: 'Bangkok', tz: 'Asia/Bangkok' },
  { gmt: 'GMT+8', city: 'Singapura', tz: 'Asia/Singapore' },
  { gmt: 'GMT+9', city: 'Tóquio', tz: 'Asia/Tokyo' },
  { gmt: 'GMT+10', city: 'Sydney', tz: 'Australia/Sydney' },
  { gmt: 'GMT+11', city: 'Noumea', tz: 'Pacific/Noumea' },
  { gmt: 'GMT+12', city: 'Auckland', tz: 'Pacific/Auckland' },
];

const SPEED = 80; // px/s

export default function WorldTime() {
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

      xRef.current -= SPEED * dt;

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
  }, []);

  const items = [...TIMEZONES, ...TIMEZONES];

  return (
    <section className="bg-white border-t border-white/5 pt-18 pb-18 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
          {items.map((tz, i) => (
            <TimeNode key={i} gmt={tz.gmt} city={tz.city} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeNode({ gmt, city }: { gmt: string; city: string }) {
  return (
    <div className="inline-flex flex-col shrink-0 pl-6">
      <div className="flex items-center">
        <span className="text-gray-400 text-xs font-medium tracking-wide whitespace-nowrap">
          {gmt}
        </span>
        <div className="w-24 h-px bg-[#e8414a]/60 shrink-0 mx-2" />
        <div className="w-2 h-2 rounded-full bg-[#e8414a] shrink-0" />
      </div>
      <span className="text-gray-400 text-xs tracking-wide whitespace-nowrap mt-1">
        {city}
      </span>
    </div>
  );
}
