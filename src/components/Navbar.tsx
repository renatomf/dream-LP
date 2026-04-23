"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  onNavigate?: (href: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps = {}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = !isHome || !heroVisible;

  useEffect(() => {
    if (!isHome) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const scrollToTop = () => {
    setIsDrawerOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (onNavigate) {
      onNavigate("/");
    } else {
      window.location.href = "/";
    }
  };

  const navLinks = [
    { href: "#cases", label: "Cases" },
    { href: "#clientes", label: "Clientes" },
    { href: "#sobre", label: "Sobre nós" },
    { href: "#conversar", label: "Vamos conversar" },
  ].map((link) => ({
    ...link,
    href: isHome ? link.href : `/${link.href}`,
  }));

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 md:px-16 h-14 transition-all duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md" : ""
        }`}
      >
        <button
          onClick={scrollToTop}
          className="text-white text-4xl [font-family:var(--font-metropolis-semibold)] tracking-wide lowercase flex items-end cursor-pointer select-none"
        >
          <span className="opacity-30">dream</span>
          <span className="ml-0.5 w-2 h-2 rounded-full inline-block mb-[0.26em]" style={{ background: 'linear-gradient(95deg, #C72026, #F27421)' }}></span>
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={24} strokeWidth={1.5} className="cursor-pointer" />
        </button>
      </nav>

      {/* Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-110 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed top-0 right-0 h-full w-full md:w-72 z-120 bg-[#0a0a0a] md:border-l md:border-white/3 flex flex-col px-8 py-8"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-[#FF2A35] text-sm uppercase tracking-widest font-light">
                Menu
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              <button
                onClick={scrollToTop}
                className="text-white/50 hover:text-white text-2xl font-light tracking-wide transition-colors text-left cursor-pointer"
              >
                Inicio
              </button>
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={onNavigate ? undefined : href}
                  onClick={(e) => {
                    setIsDrawerOpen(false);
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(href);
                    }
                  }}
                  className="text-white/50 hover:text-white text-2xl font-light tracking-wide transition-colors cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-8">
              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/dream-eventos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF2A35] hover:scale-110 transition-transform"
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="white"
                  className="ml-1 -mt-0.4"
                  >
                    <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1 8h4v14H1zM8 8h3.6v1.9h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V22h-4v-6.7c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V22H8z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/dream_eventos_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF2A35] hover:scale-110 transition-transform"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    className="mt-0.5 ml-0.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1.2" fill="white" stroke="none" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/dreameventos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF2A35] hover:scale-110 transition-transform"
                >
                  <svg width="30" height="30" viewBox="0 0 26 26"
                  className="-mt-0.5" fill="white">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
