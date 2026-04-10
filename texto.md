Crie uma landing page moderna utilizando Next.js (App Router) e Tailwind CSS, baseada em uma imagem de referência (considere que a imagem será fornecida).

🎯 Requisitos Gerais
A landing page deve ser totalmente responsiva (mobile-first)
Utilizar boas práticas de HTML semântico
Estrutura otimizada para SEO (meta tags, headings, etc.)
Arquitetura organizada e escalável
Componentização clara
🧱 Estrutura do Projeto

Cada seção da página deve ser um componente separado, localizado em:

src/app/components/sections/

Exemplo de estrutura:

sections/
  Hero.tsx
  Eventos.tsx
  Statement.tsx
  Cases.tsx
  Clients.tsx
  Video.tsx
  About.tsx
  Testimonial.tsx
  WorldTime.tsx
  Footer.tsx
🧭 Navbar
Deve ficar no topo
Fundo transparente
Contém um botão que abre um modal

📐 Seções da Landing Page: 


1. Hero
  refencia de imagem: hero.jpg

 - Deve ocupar 100% da altura da viewport
 - Fundo com vídeo (pode ser placeholder ou embed)
  Layout:
    - Texto "DREAM" à esquerda
    - Texto "Comunicação e Eventos" à direita
Responsivo para mobile


2. Eventos
  refencia de imagem: eventos-loop.jpg

 - Também ocupa inicialmente 100% da altura da tela (junto com Hero)
 - Deve conter um carrossel horizontal infinito (loop) com animação contínua
    Palavras:
    Incentivo | Convenções | Lançamentos | Premiações | Ativações | Estandes

3. Statement
  refencia de imagem: statement-texto.jpg

 - Conteúdo centralizado
 - Um círculo laranja degrade como elemento visual
 - Textos em coluna:
    Transformamos ideias em experiências que despertam todos os sentidos.
    Envolvemos e conectamos pessoas e marcas.

4. Cases
  refencia de imagem: cases-grid.jpg

 - Grid de imagens (layout baseado na referência)
Funcionalidades:
 - Clique abre modal com vídeos
 - Vídeos (carousel)
  - Item ativo fica centralizado
  - Navegação com setas (prev/next)
  - Ao clicar em um case → abre o vídeo correspondente
  - Botão "Carregar mais":
  - Carrega novos blocos dinamicamente

5. Clients
refencia de imagem: clientes-logos.jpg

 - Lista de logos
 - Animação em scroll horizontal infinito
 - Aplicar fade/degradê nas laterais

6. Video
refencia de imagem: video.jpg

 - Um vídeo embedado
 - Deve tocar automaticamente conforme o scroll (auto play on view)

7. About
refencia de imagem: about.jpg

 - Conteúdo centralizado
 Exibir:
  - Números (estatísticas)
  - Texto institucional


8. Testimonial
refencia de imagem: testimonial.jpg

Estrutura:
 - Vídeo à esquerda
 - Texto à direita
Funcionalidades:
  - Cada item é um vídeo
  - Vídeos devem tocar conforme aparecem no scroll
  - video estatico no thumb qdo passa o mouse toca preview
  - Navegação com setas (carousel)

9. World Time
refencia de imagem: world time.jpg

  - Mesmo conceito do Eventos:
  - Scroll horizontal infinito

10. Footer
refencia de imagem: footer.jpg

Layout organizado conforme referência
Estrutura clara (links, contato, etc.)
⚙️ Extras Técnicos
Usar:
next/image para imagens
next/link para navegação
Animações:
Preferencialmente com Framer Motion
Scroll interactions:
Intersection Observer ou libs modernas
Código limpo, reutilizável e escalável
🚀 Objetivo

Gerar uma landing page:

Visualmente impactante
Altamente performática
Componentizada
Fácil de manter e escalar
impacto visual