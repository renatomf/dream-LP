'use client';

import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <a href="/" className="text-white text-xl font-bold tracking-[0.15em] lowercase">
          dream.
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/60">
          <a href="#cases" className="hover:text-white transition-colors">Cases</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#clientes" className="hover:text-white transition-colors">Clientes</a>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-white/40 text-white px-5 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          Contato
        </button>
      </nav>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
