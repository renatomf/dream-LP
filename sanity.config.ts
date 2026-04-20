'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {ptBRLocale} from '@sanity/locale-pt-br'

import {dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {CustomNavbar} from './src/sanity/components/CustomNavbar'

export default defineConfig({
  basePath: '/admin',
  name: 'default',
  title: ' ',
  projectId,
  dataset,
  schema,
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== 'about' && item.templateId !== 'hero'),
    actions: (prev, { schemaType }) => {
      if (schemaType === 'about' || schemaType === 'hero') {
        return prev.filter((action) => action.action === 'publish')
      }
      if (schemaType === 'event') {
        return prev
          .filter((action) => action.action !== 'discardChanges')
          .map((action) => {
            if (action.action !== 'delete') return action
            // Delete com tom caution (amarelo) para eventos
            const CautionDelete = (props: Parameters<typeof action>[0]) => {
              const result = action(props)
              if (!result) return result
              return { ...result, tone: 'caution' }
            }
            CautionDelete.action = 'delete'
            return CautionDelete
          })
      }
      return prev
    },
  },
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
  plugins: [
    ptBRLocale(),
    structureTool({structure}),
  ],
})
