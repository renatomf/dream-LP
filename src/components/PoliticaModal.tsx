"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PoliticaModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const container = document.getElementById("politica-scroll");
    if (!container) return;
    container.scrollTop = 0;
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleHashChange = () => setOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [open]);


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hover:text-white transition-colors cursor-default"
      >
        Política de privacidade e cookies.
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="politica-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="fixed inset-0 z-200 bg-white overflow-hidden"
          >
            <div
              id="politica-scroll"
              className="h-full overflow-y-auto"
            >
              {/* Botão fechar */}
              <div className="max-w-3xl mx-auto px-6 pt-8 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-black/50 hover:text-black transition-colors text-sm"
                  aria-label="Fechar"
                >
                  <X size={18} strokeWidth={1.5} />
                  Fechar
                </button>
              </div>

              {/* Conteúdo */}
              <article className="max-w-3xl mx-auto px-6 py-10 text-black">
                <h1 className="text-4xl font-black mb-2">Política de Privacidade</h1>
                <p className="text-sm text-black/40 mb-10">Última atualização: abril de 2026</p>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">1. Introdução</h2>
                  <p className="text-black/70 leading-relaxed">
                    A Dream Eventos valoriza a privacidade de seus usuários e clientes. Esta Política de
                    Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações
                    pessoais que você nos fornece ao utilizar nosso site e serviços.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">2. Informações que Coletamos</h2>
                  <p className="text-black/70 leading-relaxed mb-3">
                    Podemos coletar os seguintes tipos de informações:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-black/70">
                    <li>Nome, e-mail e telefone fornecidos em formulários de contato</li>
                    <li>Dados de navegação e uso do site (cookies e tecnologias similares)</li>
                    <li>Informações necessárias para a prestação dos nossos serviços de eventos</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">3. Uso das Informações</h2>
                  <p className="text-black/70 leading-relaxed">
                    As informações coletadas são utilizadas para responder suas solicitações, melhorar
                    nossos serviços, enviar comunicações relevantes (com seu consentimento) e cumprir
                    obrigações legais. Não vendemos nem compartilhamos seus dados com terceiros para fins
                    comerciais.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">4. Cookies</h2>
                  <p className="text-black/70 leading-relaxed">
                    Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do
                    site e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies,
                    mas isso pode afetar o funcionamento de algumas funcionalidades do site.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">5. Segurança</h2>
                  <p className="text-black/70 leading-relaxed">
                    Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações
                    contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum
                    método de transmissão pela internet é 100% seguro.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">6. Seus Direitos</h2>
                  <p className="text-black/70 leading-relaxed">
                    Você tem direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais.
                    Para exercer esses direitos, entre em contato conosco pelo e-mail{" "}
                    <a
                      href="mailto:contato@dreameventos.com.br"
                      className="underline hover:text-black transition-colors"
                    >
                      contato@dreameventos.com.br
                    </a>
                    .
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3">7. Alterações nesta Política</h2>
                  <p className="text-black/70 leading-relaxed">
                    Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você
                    revise esta página regularmente para se manter informado sobre eventuais mudanças.
                  </p>
                </section>
              </article>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
