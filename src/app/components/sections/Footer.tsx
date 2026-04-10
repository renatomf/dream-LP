const LINKS = {
  Serviços: ['Incentivo', 'Convenções', 'Lançamentos', 'Premiações', 'Ativações', 'Estandes'],
  Empresa: ['Sobre nós', 'Cases', 'Clientes', 'Blog', 'Carreiras'],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      {/* CTA band */}
      <div className="px-8 md:px-16 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            {/* Orange dots decoration */}
            <div className="flex gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-brand" />
              <span className="w-3 h-3 rounded-full bg-brand/60" />
              <span className="w-3 h-3 rounded-full bg-brand/30" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand mb-3">dream.</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Let&apos;s Dream<br />together
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:contato@dream.com.br"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              contato@dream.com.br
            </a>
            <a
              href="tel:+5511999999999"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              +55 11 9999-9999
            </a>
            <div className="flex gap-4 mt-2">
              {['Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs uppercase tracking-widest text-white/40 hover:text-brand transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="border-t border-white/5 px-8 md:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xl font-bold text-white tracking-[0.15em] lowercase mb-4">dream.</p>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs">
              Transformamos ideias em experiências que despertam todos os sentidos.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">{title}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Contato</p>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              <li>São Paulo — Brasil</li>
              <li className="mt-2">
                <a href="mailto:contato@dream.com.br" className="hover:text-white transition-colors">
                  contato@dream.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-8 md:px-16 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} dream. Todos os direitos reservados.
        </p>
        <p className="text-xs text-white/20">
          Comunicação &amp; Eventos
        </p>
      </div>
    </footer>
  );
}
