'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const formatTelefone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, '($1');
    if (digits.length <= 6) return digits.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'telefone' ? formatTelefone(value) : value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ nome: '', email: '', telefone: '', mensagem: '' });
      setStatus('ok');
      setTimeout(onClose, 1600);
    } else {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence onExitComplete={() => { setStatus('idle'); setForm({ nome: '', email: '', telefone: '', mensagem: '' }); }}>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/75 backdrop-blur-sm px-6"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-180 bg-[#111] rounded-2xl p-8 relative"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-5 right-5 text-white hover:text-white/60 transition-colors text-xl leading-none cursor-pointer"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-[#FF2A35] text-xl font-normal mb-6">
              Vamos conversar
            </h2>

            {/* Info row */}
            <div className="grid grid-cols-3 gap-3 items-start mb-14">
              <div>
                <p className="text-[#FF2A35] text-[10px] uppercase tracking-widest font-semibold mb-1">
                  Telefone
                </p>
                <a
                  href="https://wa.me/551151833323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm hover:text-white/70 transition-colors"
                >
                  +55 11 5183 3323
                </a>
              </div>
              <div>
                <p className="text-[#FF2A35] text-[10px] uppercase tracking-widest font-semibold mb-1">
                  Email
                </p>
                <a
                  href="mailto:contato@dreameventos.com.br"
                  className="text-white text-sm hover:text-white/70 transition-colors"
                >
                  contato@dreameventos.com.br
                </a>
              </div>

              {/* Social icons */}
              <div className="flex gap-2 justify-end">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/dream-eventos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-[#FF2A35] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/dream_eventos_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#FF2A35] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/dreameventos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#FF2A35] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Row: Nome, Email, Telefone */}
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                  required
                  className="bg-transparent border-b border-l-3 border-[#FF2A35] text-white placeholder:text-white/40 text-sm py-2 pl-3 focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="bg-transparent border-b border-l-3 border-[#FF2A35] text-white placeholder:text-white/40 text-sm py-2 pl-3 focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  className="bg-transparent border-b border-l-3 border-[#FF2A35] text-white placeholder:text-white/40 text-sm py-2 pl-3 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Mensagem */}
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows={4}
                placeholder="Mensagem"
                required
                className="bg-transparent border-b border-l-3 border-[#FF2A35] text-white placeholder:text-white/40 text-sm py-2 pl-3 focus:outline-none focus:border-white transition-colors resize-none"
              />

              {status === 'error' && (
                <p className="text-[#FF2A35] text-xs">Erro ao enviar. Tente novamente.</p>
              )}

              {/* Submit */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'ok'}
                  className="bg-[#FF2A35] text-white text-sm font-medium px-8 py-2.5 rounded-full hover:bg-[#CC2229] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === 'sending' ? 'Enviando...' : status === 'ok' ? 'Enviado!' : 'Enviar'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
