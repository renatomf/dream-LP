'use client';

import { useEffect, useState } from 'react';

const CITIES = [
  { name: 'São Paulo', tz: 'America/Sao_Paulo' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'Londres', tz: 'Europe/London' },
  { name: 'Paris', tz: 'Europe/Paris' },
  { name: 'Dubai', tz: 'Asia/Dubai' },
  { name: 'Tóquio', tz: 'Asia/Tokyo' },
  { name: 'Sydney', tz: 'Australia/Sydney' },
  { name: 'Los Angeles', tz: 'America/Los_Angeles' },
];

function formatTime(tz: string) {
  return new Date().toLocaleTimeString('pt-BR', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default function WorldTime() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    function update() {
      const updated: Record<string, string> = {};
      CITIES.forEach((c) => {
        updated[c.tz] = formatTime(c.tz);
      });
      setTimes(updated);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [...CITIES, ...CITIES];

  return (
    <section className="bg-[#0d0d0d] border-t border-white/5 py-6 overflow-hidden">
      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {items.map((city, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-8 text-sm md:text-base"
            >
              <span className="text-white/30 uppercase tracking-[0.15em] font-medium text-xs">
                {city.name}
              </span>
              <span className="text-white font-bold tabular-nums tracking-wider text-sm">
                {times[city.tz] ?? '--:--'}
              </span>
              <span className="w-px h-4 bg-white/10 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
