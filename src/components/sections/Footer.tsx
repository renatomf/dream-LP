import Image from "next/image";
import Link from "next/link";

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
      <div className="max-w-268 mx-auto px-4 md:px-8 pt-16 pb-10 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-10 md:gap-30">
        <div className="">
          <Image src="/images/logos/dream/logo-dream-sm.png" alt="Dream" width={160} height={64} className="h-11 md:h-11 w-auto" />
        </div>
        <h2 className="text-[2.7rem] md:text-6xl lg:text-[5rem] font-black leading-tight text-center md:text-left md:mr-auto">
          Let&apos;s<br className="md:hidden" /> Dream<br />together
        </h2>
      </div>

      {/* Middle: social | telefone+email | endereço */}
      <div className="max-w-268 mx-auto px-4 md:px-8 py-2 flex flex-col items-center md:flex-row md:items-start md:justify-between gap-12 md:gap-48 pb-12">
        {/* Social icons — alinhado com o logo */}
        <div className="flex gap-3 items-start shrink-0">
          {[
            { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/dream-eventos/" },
            { Icon: InstagramIcon, href: "https://www.instagram.com/dream_eventos_" },
            { Icon: FacebookIcon, href: "https://www.facebook.com/dreameventos" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#FF5C00] hover:scale-110 transition-transform flex items-center justify-center"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Telefone + Email + Endereço — alinhado com "Let's Dream" */}
        <div className="flex flex-col items-center md:items-start md:flex-row gap-8 md:gap-16 md:mr-auto ">
          {/* Telefone + Email */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-[#FF5C00] mb-1">Telefone</p>
              <a
                href="https://wa.me/5511947435658"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                +55 11 94743 5658
              </a>
            </div>
            <div className="text-center md:text-left">
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
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-widest text-[#FF5C00] mb-1">Endereço</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Av. Dr. Chucri Zaidan, 1550<br />
              Cj. 1601 · São paulo · Brasil
            </p>
            <a href="https://www.google.com/maps/search/?api=1&query=Av.+Dr.+Chucri+Zaidan,+1550,+São+Paulo,+SP,+Brasil" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors mt-1 inline-block">
              (ver mapa)
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 h-24 flex items-center justify-center px-4 md:px-8">
        <p className="text-xs text-white/30 text-center">
          <Link href="/politica" className="hover:text-white transition-colors cursor-pointer">Política de privacidade e cookies.</Link> Copyright 2026. Dream Eventos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
