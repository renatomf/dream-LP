"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsDrawerOpen(false);
  };

  const navLinks = [
    { href: "#cases", label: "Cases" },
    { href: "#clientes", label: "Clientes" },
    { href: "#sobre", label: "Sobre nós" },
    { href: "#conversar", label: "Vamos conversar" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-500`}
      >
        <Link
          href="/"
          className="text-white text-xl font-bold tracking-[0.15em] lowercase flex items-end"
        >
          dream
          <span className="ml-1 w-1 h-1 bg-[#FF5500] rounded-full inline-block mb-[0.27em]"></span>
        </Link>

        {/* <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/60">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div> */}

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={22} strokeWidth={1.5} />
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
            className="fixed top-0 right-0 h-full w-72 z-120 bg-[#0a0a0a] border-l border-white/3 flex flex-col px-8 py-8"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-red-700 text-sm uppercase tracking-widest font-light">
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
                  href={href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-white/50 hover:text-white text-2xl font-light tracking-wide transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-8">
              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-red-700 hover:scale-110 transition-transform"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1 8h4v14H1zM8 8h3.6v1.9h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V22h-4v-6.7c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V22H8z" />
                  </svg>
                </Link>

                {/* Instagram */}
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-red-700 hover:scale-110 transition-transform"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1.2" fill="white" stroke="none" />
                  </svg>
                </Link>

                {/* Facebook */}
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-red-700 hover:scale-110 transition-transform"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
