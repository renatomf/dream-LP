'use client'

import {NextStudio} from 'next-sanity/studio'
import baseConfig from '../../../../sanity.config'

export function StudioWithTheme() {

  return (
    <>
      <style>{`
        /* Tela branca enquanto o Studio carrega */
        html, body { background-color: #ffffff !important; }

        /* Focus ring transparente */
        [data-ui="Card"] { --card-focus-ring-color: transparent !important; }

        /* TextInput igual ao TextArea — mesma borda e fundo */
        [data-ui="TextInput"] {
          border-radius: 3px !important;
          border: 1px solid #e5e5e5 !important;
          background-color: #ffffff !important;
        }
        [data-ui="TextInput"] span[data-border] {
          display: none !important;
        }
        [data-ui="TextInput"]:focus-within {
          border-color: #ff6200 !important;
        }
        [data-ui="TextInput"] input {
          caret-color: #000000 !important;
          color: #000000 !important;
        }

        /* Caret visível apenas dentro de inputs de texto */
        * { caret-color: transparent !important; }
        input, textarea, [contenteditable="true"], [contenteditable=""] { caret-color: auto !important; }

        /* Todos os botões — bg transparente por padrão para evitar flicker */
        [data-ui="Button"]:not([data-testid="action-publish"]):not([data-testid="action-publicar"]):not([data-testid="action-unpublish"]):not([data-testid="action-despublicar"]):not([data-testid="confirm-button"]):not([data-testid="action-delete"]):not([data-testid="action-Delete"]):not([data-testid="document-header-Published-chip"]):not([data-testid="document-header-Publicado-chip"]):not([data-testid="document-header-Draft-chip"]):not([data-testid="document-header-Rascunho-chip"]):not(:has([data-sanity-icon="trash"])):not([data-pressed]):not([data-testid="add-multiple--primitive-button"]),
        [data-ui="MenuButton"]:not([data-testid="global-perspective-menu-button"]):not([data-pressed]),
        [data-ui="StatusButton"]:not([data-pressed]),
        [data-ui="MenuItem"]:not([data-pressed]),
        [aria-label="Add comment"],
        a[data-ui="Button"] {
          --card-bg-color: transparent !important;
          --card-border-color: transparent !important;
          --card-fg-color: #000000 !important;
          --card-icon-color: #000000 !important;
          transition: none !important;
        }

        /* All button hover — texto e ícone laranja, sem bg nem stroke */
        [data-ui="Button"]:hover:not([data-disabled="true"]):not([data-testid="action-publish"]):not([data-testid="action-publicar"]):not([data-testid="action-unpublish"]):not([data-testid="action-despublicar"]):not([data-testid="confirm-button"]):not([data-testid="action-delete"]):not([data-testid="action-Delete"]):not([data-testid="document-header-Published-chip"]):not([data-testid="document-header-Publicado-chip"]):not([data-testid="document-header-Draft-chip"]):not([data-testid="document-header-Rascunho-chip"]):not(:has([data-sanity-icon="trash"])):not([data-testid="add-multiple--primitive-button"]),
        [data-ui="MenuButton"]:hover:not([data-disabled="true"]):not([data-testid="global-perspective-menu-button"]),
        [data-ui="StatusButton"]:hover:not([data-disabled="true"]),
        [data-ui="MenuItem"]:hover:not([data-disabled]),
        a[data-ui="Button"]:hover {
          --card-bg-color: transparent !important;
          --card-border-color: transparent !important;
          --card-fg-color: #ff6200 !important;
          --card-icon-color: #ff6200 !important;
          outline: none !important;
        }

        /* Campo de pesquisa de lista — desnecessário */
        [data-ui="TextInput"]:has(input[aria-label="Pesquisar lista"]) { display: none !important; }

        /* Navbar */
        [data-testid="studio-navbar"] {
          --card-bg-color: #ffffff !important;
          --card-border-color: #e5e5e5 !important;
        }
        [data-testid="studio-navbar"] [data-ui="Button"]:not([data-ui="ReleasesNav"] *),
        [data-testid="studio-navbar"] [data-ui="MenuButton"]:not([data-ui="ReleasesNav"] *) {
          --card-bg-color: transparent !important;
          --card-border-color: transparent !important;
          --card-fg-color: #000000 !important;
          --card-icon-color: #000000 !important;
          --card-muted-fg-color: #666666 !important;
          outline: none !important;
        }

        /* Pressed/active state */
        [data-pressed]:not([data-disabled]) {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #000000 !important;
          --card-avatar-green-bg-color: #3ab564 !important;
          --card-avatar-green-fg-color: #3ab564 !important;
          --card-accent-fg-color: #ff6200 !important;
          --card-avatar-red-bg-color: #ff6200 !important;
        }

        /* Drag-over no campo de upload — bg laranja, fonte e ícone brancos */
        [data-testid="image-input"] [data-hovered="true"],
        [data-testid="image-input"] [data-drop-zone],
        [data-ui="FileTarget"][data-hovered],
        [data-dragging-over="true"],
        [data-drop-zone][data-active="true"] {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #ffffff !important;
          color: #ffffff !important;
        }
        [data-testid="image-input"] [data-hovered="true"] svg,
        [data-testid="image-input"] [data-drop-zone] svg,
        [data-ui="FileTarget"][data-hovered] svg,
        [data-dragging-over="true"] svg,
        [data-drop-zone][data-active="true"] svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }

        /* Overlay de drag — texto, ícone e três pontos brancos */
        [data-testid="upload-target-drop-message"],
        [data-testid="upload-target-drop-message"] * {
          color: #ffffff !important;
        }
        [data-testid="upload-target-drop-message"] svg {
          stroke: #ffffff !important;
        }
        /* Três pontos (field actions) visíveis sobre o overlay */
        [data-ui="Layer"] ~ * [data-testid="field-actions-trigger"],
        [data-ui="Layer"] [data-testid="field-actions-trigger"],
        body:has([data-testid="upload-target-drop-message"]) [data-testid="field-actions-trigger"] {
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          color: #ffffff !important;
        }

        /* Filename code block (ex: pan.png) — texto branco, bg transparente */
        [data-ui="Code"],
        [data-ui="Code"][class],
        pre[data-ui="Code"],
        [data-ui="Text"] pre[data-ui="Code"] {
          background: #ff6200 !important;
          background-color: #ff6200 !important;
          --card-bg-color: #ff6200 !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
        }
        [data-ui="Code"] code,
        pre[data-ui="Code"] code {
          background: #ff6200 !important;
          background-color: #ff6200 !important;
          color: #ffffff !important;
        }

        /* Upload button — borda laranja */
        [data-testid="image-input"] [data-ui="Button"],
        [data-testid="file-input"] [data-ui="Button"],
        [data-testid="upload-button"],
        [data-testid="file-input-upload-button"],
        [data-testid="image-input-upload-button"] {
          --card-border-color: #ff6200 !important;
          border-color: #ff6200 !important;
          --card-fg-color: #ff6200 !important;
          --card-icon-color: #ff6200 !important;
        }
        [data-testid="image-input"] [data-ui="Button"]:hover,
        [data-testid="file-input"] [data-ui="Button"]:hover,
        [data-testid="upload-button"]:hover,
        [data-testid="file-input-upload-button"]:hover,
        [data-testid="image-input-upload-button"]:hover {
          --card-border-color: #e05500 !important;
          border-color: #e05500 !important;
          --card-fg-color: #e05500 !important;
          --card-icon-color: #e05500 !important;
        }

        /* Menu dos itens de array (3 pontos: remover, copiar, duplicar) */
        [data-testid="array-item-menu-button"],
        [data-ui="MenuButton"] {
          cursor: pointer !important;
        }

        /* Drag handle cursor */
        [data-rfd-drag-handle-draggable-id],
        [data-rfd-drag-handle-draggable-id] *,
        [data-sanity-icon="drag-handle"],
        [data-sanity-icon="drag-handle"] * {
          cursor: grab !important;
        }

        /* Drag item colors */
        [data-rfd-draggable-context-id] [data-tone="primary"] {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #000000 !important;
        }

        /* Add item button — bg laranja, ícone e texto brancos */
        [data-testid="add-multiple--primitive-button"] {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          cursor: pointer !important;
        }
        [data-testid="add-multiple--primitive-button"]:hover {
          --card-bg-color: #e05500 !important;
          --card-border-color: #e05500 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          outline: none !important;
        }

        /* Delete/critical buttons */
        [data-testid="confirm-button"],
        [data-testid="action-delete"],
        [data-testid="action-Delete"],
        [data-testid="action-Excluir"],
        [data-testid="pane-context-menu-delete"],
        [role="menuitem"]:has([data-sanity-icon="trash"]) {
          --card-bg-color: #f03e2f !important;
          --card-border-color: #f03e2f !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          cursor: pointer !important;
        }
        [data-testid="action-unpublish"],
        [data-testid="action-despublicar"] {
          --card-bg-color: #f03e2f !important;
          --card-border-color: #f03e2f !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          cursor: pointer !important;
          padding: 7px 14px !important;
          font-size: 0.9rem !important;
        }
        [data-testid="confirm-button"]:hover,
        [data-testid="action-delete"]:hover,
        [data-testid="action-Delete"]:hover,
        [data-testid="action-Excluir"]:hover,
        [data-testid="pane-context-menu-delete"]:hover,
        [role="menuitem"]:has([data-sanity-icon="trash"]):hover {
          --card-bg-color: #d42e20 !important;
          --card-border-color: #d42e20 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #ffffff !important;
          outline: none !important;
        }
        [data-testid="action-unpublish"]:hover,
        [data-testid="action-despublicar"]:hover {
          --card-bg-color: #d42e20 !important;
          --card-border-color: #d42e20 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          outline: none !important;
        }

        /* Publish button */
        [data-testid="action-publish"],
        [data-testid="action-publicar"] {
          --card-bg-color: #43d675 !important;
          --card-border-color: #43d675 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          cursor: pointer !important;
          padding: 7px 14px !important;
          font-size: 0.9rem !important;
        }
        [data-testid="action-publish"]:hover,
        [data-testid="action-publicar"]:hover {
          --card-bg-color: #35b85e !important;
          outline: none !important;
        }


        /* ReleasesNav — draft (default tone) → yellow */
        [data-ui="ReleasesNav"][data-tone="default"] {
          --card-bg-color: #fbd024 !important;
          --card-border-color: #fbd024 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          border-radius: 9999px !important;
        }
        /* ReleasesNav — published (positive tone) → green */
        [data-ui="ReleasesNav"][data-tone="positive"] {
          --card-bg-color: #43d675 !important;
          --card-border-color: #43d675 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          border-radius: 9999px !important;
        }
        /* ReleasesNav chevron button — transparent inside colored container */
        [data-testid="global-perspective-menu-button"] {
          --card-bg-color: transparent !important;
          --card-border-color: transparent !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
        }

        /* Draft chip */
        [data-testid="document-header-Draft-chip"],
        [data-testid="document-header-Rascunho-chip"] {
          --card-bg-color: #fbd024 !important;
          --card-border-color: #fbd024 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-caution-icon-color: #ffffff !important;
        }

        /* Preview status chip — Rascunho/caution */
        [data-testid="default-preview__status"] [data-tone="caution"] {
          background-color: #fbd024 !important;
          --card-bg-color: #fbd024 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-caution-icon-color: #ffffff !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 2px 6px !important;
        }
        [data-testid="default-preview__status"] [data-tone="caution"] svg,
        [data-testid="default-preview__status"] [data-tone="caution"] circle {
          color: #ffffff !important;
          fill: #ffffff !important;
          stroke: #ffffff !important;
        }

        /* Preview status chip — Publicado */
        [data-testid="default-preview__status"] [data-tone="positive"] {
          background-color: #43d675 !important;
          --card-bg-color: #43d675 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-positive-icon-color: #ffffff !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 2px 6px !important;
        }

        /* Published chip */
        [data-testid="document-header-Published-chip"],
        [data-testid="document-header-Publicado-chip"] {
          --card-bg-color: #43d675 !important;
          --card-border-color: #43d675 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-positive-icon-color: #ffffff !important;
        }
        [data-testid="document-header-Published-chip"]:hover,
        [data-testid="document-header-Publicado-chip"]:hover {
          --card-bg-color: #35b85e !important;
          --card-border-color: #35b85e !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-positive-icon-color: #ffffff !important;
          outline: none !important;
        }
        [data-testid="document-header-Draft-chip"]:hover,
        [data-testid="document-header-Rascunho-chip"]:hover {
          --card-bg-color: #f2c800 !important;
          --card-border-color: #f2c800 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-badge-caution-icon-color: #ffffff !important;
          outline: none !important;
        }

        /* Event delete button — caution bg, texto branco no hover */
        [data-testid="action-Excluir"][data-tone="caution"],
        [data-testid="action-delete"][data-tone="caution"] {
          --card-bg-color: #fbd024 !important;
          --card-border-color: #fbd024 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
        }
        [data-testid="action-Excluir"][data-tone="caution"]:hover,
        [data-testid="action-delete"][data-tone="caution"]:hover {
          --card-bg-color: #e6bc00 !important;
          --card-border-color: #e6bc00 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          outline: none !important;
        }

        /* Notificações de produto Sanity (novidades, updates) — bottom-left */
        [data-testid="announcements-popover"],
        [data-testid="studio-announcements"],
        [data-testid="announcements"],
        [data-testid="whats-new"],
        [aria-label="What's new"],
        [aria-label="O que há de novo"],
        [data-ui="AnnouncementsPopover"],
        [data-ui="NewsletterWidget"],
        [class*="announcements"],
        [class*="Announcements"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* Spinner — laranja */
        [data-ui="Spinner"] {
          color: #ff6200 !important;
        }
        [data-sanity-icon="spinner"] path {
          stroke: #ff6200 !important;
        }

        /* Texto "Carregando documento" abaixo do spinner nos painéis de lista */
        [data-ui="Flex"]:has(> [data-ui="Spinner"]):not(:has([data-ui="Text"])):not(:has(p)) {
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }
        [data-ui="Flex"]:has(> [data-ui="Spinner"]):not(:has([data-ui="Text"])):not(:has(p))::after {
          content: "Carregando documento...";
          margin-top: 12px;
          font-size: 13px;
          color: var(--card-muted-fg-color);
          letter-spacing: 0.05em;
        }

        /* Texto "Carregando documento" no painel do editor (hero, etc.) */
        [data-testid="document-panel"] [data-ui="Flex"]:has([data-ui="Spinner"]),
        [data-testid="document-pane-content"]:has([data-ui="Spinner"]) [data-ui="Flex"]:has(> [data-ui="Spinner"]) {
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }
        [data-testid="document-panel"] [data-ui="Flex"]:has(> [data-ui="Spinner"])::after,
        [data-testid="pane"] [data-ui="Flex"]:has(> [data-ui="Spinner"]):not(:has([data-ui="Flex"]))::after {
          content: "Carregando documento...";
          margin-top: 12px;
          font-size: 13px;
          color: var(--card-muted-fg-color);
          letter-spacing: 0.05em;
        }

        /* Progress ring inside buttons — orange stroke on hover */
        [data-ui="Button"]:hover circle[stroke="#ff6200"] {
          stroke: #ff6200 !important;
        }

        /* Published status dot */
        [data-status="published"] {
          background-color: #43d675 !important;
        }

        /* List item hover */
        [data-hovered]:not([data-disabled]):not([data-pressed]),
        [data-as='a']:hover:not([data-disabled]):not([data-pressed]) {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #000000 !important;
        }

        /* Active/selected sidebar item */
        [aria-selected="true"],
        [data-selected="true"],
        [data-selected=""],
        [data-selected] {
          --card-bg-color: #ff6200 !important;
          --card-border-color: #ff6200 !important;
          --card-fg-color: #ffffff !important;
          --card-icon-color: #ffffff !important;
          --card-muted-fg-color: #000000 !important;
        }

      `}</style>
      <NextStudio config={baseConfig} scheme="light" />
    </>
  )
}
