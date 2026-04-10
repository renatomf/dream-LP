'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm px-6"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-[#111] border border-white/10 p-10 relative"
          >
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors text-2xl leading-none"
            >
              ×
            </button>

            <p className="text-xs uppercase tracking-[0.2em] text-brand mb-2">Contato</p>
            <h2 className="text-2xl font-bold text-white mb-8">
              Vamos criar algo<br />incrível juntos?
            </h2>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Conte-nos sobre seu projeto..."
                  className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-brand text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-brand-dark transition-colors font-semibold"
              >
                Enviar mensagem
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
