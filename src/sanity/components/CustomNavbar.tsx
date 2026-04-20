'use client'

import { useEffect } from 'react'
import { useCurrentUser } from 'sanity'
import type { NavbarProps } from 'sanity'

export function CustomNavbar(props: NavbarProps) {
  const user = useCurrentUser()
  const isAdmin = user?.roles.some(r => r.name === 'administrator')

  useEffect(() => {
    const preventFileDrop = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes('Files')) e.preventDefault()
    }
    window.addEventListener('dragover', preventFileDrop)
    window.addEventListener('drop', preventFileDrop)
    return () => {
      window.removeEventListener('dragover', preventFileDrop)
      window.removeEventListener('drop', preventFileDrop)
    }
  }, [])

  useEffect(() => {
    if (isAdmin === undefined) return

    const styleId = 'hide-workspace-menu'
    const existing = document.getElementById(styleId)

    if (!isAdmin) {
      if (!existing) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = '#workspace-menu, a[href="/admin"], a[href^="/admin?perspective="], [data-testid="studio-search"], [data-testid="tasks-toolbar"], button:has([data-sanity-icon="bolt"]), #global-presence-menu, [data-testid="button-resources-menu"], [data-testid="global-perspective-menu-button"], [data-ui="ReleasesNav"], [data-testid="document-perspective-list"], [data-testid="copy-document-actions-button"], button[aria-label="Comentários"], [data-testid="pane-context-menu-button"], [data-testid="focus-pane-button-focus"], a[href^="/admin/structure/"]:has([data-sanity-icon="close"]), [data-testid="action-Duplicar"], [data-testid="field-actions-trigger"], button[aria-label="Adicionar comentário"], [data-testid="action-Descartaralterações"] { display: none !important; }'
        document.head.appendChild(style)
      }
    } else {
      existing?.remove()
    }
  }, [isAdmin])

  return props.renderDefault(props)
}
