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
    <section className="bg-white py-11 overflow-hidden">
      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {items.map((event, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 md:gap-18 px-6 text-xl md:text-3xl font-medium tracking-[0.15em] text-[#E3E3E3]"
            >
              {event}
              <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
