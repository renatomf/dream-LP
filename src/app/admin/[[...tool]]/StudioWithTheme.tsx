/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import {type ComponentProps, useEffect, useState} from 'react'
import {NextStudio} from 'next-sanity/studio'
import baseConfig from '../../../../sanity.config'

const THEMER_PARAMS = new URLSearchParams({
  preset:      'stereofidelic',
  default:     '000000;lightest:ffffff;darkest:000000',
  primary:     'ff6200;lightest:ff6200',
  transparent: 'dedede;lightest:ededed;darkest:050505',
  positive:    '43d675;400;lightest:43d675',
  caution:     'fbd024;300;lightest:fbd024',
  critical:    'f03e2f;lightest:f02f35',
  darkest:     'ffffff',
}).toString().replaceAll('%3A', ':').replaceAll('%3B', ';')

const THEMER_URL = `https://themer.sanity.build/api/hues?${THEMER_PARAMS}`

type StudioConfig = ComponentProps<typeof NextStudio>['config']

export function StudioWithTheme() {
  const [config, setConfig] = useState<StudioConfig>(baseConfig)

  useEffect(() => {
    // @ts-ignore -- dynamic URL import has no type declarations
    import(/* webpackIgnore: true */ THEMER_URL).then(({theme}) => {
      setConfig({...baseConfig, theme} as StudioConfig)
    })
  }, [])

  return (
    <>
      <style>{`
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
        [data-testid="action-unpublish"]:hover,
        [data-testid="action-despublicar"]:hover,
        [data-testid="pane-context-menu-delete"]:hover,
        [role="menuitem"]:has([data-sanity-icon="trash"]):hover {
          --card-bg-color: #d42e20 !important;
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

        /* Progress ring inside buttons — orange stroke on hover */
        [data-ui="Button"]:hover circle[stroke="#b087f7"] {
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


      `}</style>
      <NextStudio config={config} scheme="light" />
    </>
  )
}
