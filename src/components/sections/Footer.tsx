const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="conversar" className="bg-black text-white scroll-mt-20">
      {/* Top: logo + headline */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="text-[12vw] md:text-[3.5vw] [font-family:var(--font-metropolis-bold)] tracking-tighter lowercase leading-none">
          dream<span className="text-[#FF5C00] text-6xl ml-0.5 ">.</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight md:mr-auto md:ml-22">
          Let&apos;s Dream<br />together
        </h2>
      </div>

      {/* Middle: social | telefone+email | endereço */}
      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Social icons */}
        <div className="flex gap-3 items-start">
          {[LinkedinIcon, InstagramIcon, FacebookIcon].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full bg-[#FF5C00] flex items-center justify-center hover:bg-[#FF5C00]/80 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Telefone + Email */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#FF5C00] mb-1">Telefone</p>
            <p className="text-sm text-white/80">+55 11 5183 3323</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#FF5C00] mb-1">Email</p>
            <a
              href="mailto:contato@dreameventos.com.br"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              contato@dreameventos.com.br
            </a>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <p className="text-xs uppercase tracking-widest text-[#FF5C00] mb-1">Endereço</p>
          <p className="text-sm text-white/80 leading-relaxed">
            Av. Dr. Chucri Zaidan, 1550<br />
            Cj. 1601 · São paulo · Brasil
          </p>
          <a href="#" className="text-sm text-white/50 hover:text-white transition-colors mt-1 inline-block">
            (ver mapa)
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8 py-5 text-center">
        <p className="text-xs text-white/30">
          Política de privacidade e cookies. Copyright 2026. Dream Eventos. Todos os direitos reservados.
        </p>
        </div>
      </div>
    </footer>
  );
}
