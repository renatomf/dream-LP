const CLIENTS = [
  { name: 'Cyan', width: 80 },
  { name: 'Facebook', width: 110 },
  { name: 'Banco PAN', width: 100 },
  { name: 'Chevrolet', width: 110 },
  { name: 'Ambev', width: 80 },
  { name: 'Itaú', width: 70 },
  { name: 'Natura', width: 85 },
  { name: 'Embraer', width: 100 },
];

export default function Clients() {
  // Duplicate for seamless loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clientes" className="bg-black py-16 md:py-20 border-t border-white/5">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-12 px-8 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Clientes
          <span className="text-brand">_</span>
        </h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Infinite scroll */}
      <div className="relative overflow-hidden py-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: 'marquee 25s linear infinite' }}
        >
          {items.map((client, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center px-12 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {/* Text logo placeholder — replace with <Image> when real logos are available */}
              <span
                className="text-white font-bold tracking-wider text-sm uppercase"
                style={{ minWidth: client.width }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
