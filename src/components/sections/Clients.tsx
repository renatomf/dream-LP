import Image from "next/image";

const CLIENTS = [
  { name: 'Facebook',  src: '/images/facebook.png',  width: 200, height: 50 },
  { name: 'Banco PAN', src: '/images/pan.png',        width: 200, height: 50 },
  { name: 'Chevrolet', src: '/images/chevrolet.png',  width: 200, height: 50 },
  { name: 'Instagram', src: '/images/instagram.png',  width: 200, height: 50 },
  { name: 'Safra',     src: '/images/safra.png',      width: 200, height: 50 },
];

export default function Clients() {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section id="clientes" className="bg-white pt-0 pb-0 border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-8 -mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight caret-transparent">
          Clientes<span className="text-brand">_</span>
        </h2>
      </div>

      <div className="relative overflow-hidden py-10 md:py-20">
        {/* Fade edges */}
        <div className="absolute left-0 top-5 bottom-0 w-12 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-5 bottom-0 w-12 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center marquee-fast"
        >
          {items.map((client, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center px-6 md:px-12 opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                style={{
                  width: `clamp(${client.width * 0.45}px, ${client.width * 0.08}vw + ${client.width * 0.3}px, ${client.width}px)`,
                  height: `clamp(${client.height * 0.45}px, ${client.height * 0.08}vw + ${client.height * 0.3}px, ${client.height}px)`,
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
