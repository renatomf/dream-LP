const EVENTS = [
  'Incentivo',
  'Convenções',
  'Lançamentos',
  'Premiações',
  'Ativações',
  'Estandes',
];

export default function Eventos() {
  // Duplicate for seamless loop
  const items = [...EVENTS, ...EVENTS];

  return (
    <section className="bg-white border-t border-black/5 py-6.5 overflow-hidden">
      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {items.map((event, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 text-sm md:text-base font-medium tracking-[0.15em] uppercase text-black/70"
            >
              {event}
              <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
