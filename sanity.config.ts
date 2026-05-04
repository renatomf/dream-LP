import {defineConfig, type DocumentActionComponent} from 'sanity'
import {structureTool} from 'sanity/structure'
import {ptBRLocale} from '@sanity/locale-pt-br'
import {media, mediaAssetSource} from 'sanity-plugin-media'

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
  tools: (prev, {currentUser}) => {
    const isEditor = currentUser?.roles?.some((r) => r.name === 'editor')
    const isClientAdmin = currentUser?.email === 'dreameventos01@gmail.com'
    if (isEditor || isClientAdmin) {
      return prev.filter((tool) => tool.name !== 'media')
    }
    return prev
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== 'about' && item.templateId !== 'hero' && item.templateId !== 'media.tag'),
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
            const CautionDelete: DocumentActionComponent = (props) => {
              const result = action(props)
              if (!result) return result
              return { ...result, tone: 'caution' }
            }
            CautionDelete.action = 'delete' as DocumentActionComponent['action']
            return CautionDelete
          })
      }
      return prev
    },
  },
  form: {
    image: {
      assetSources: (prev) => prev.filter((s) => s !== mediaAssetSource),
    },
    file: {
      assetSources: (prev) => prev.filter((s) => s !== mediaAssetSource),
    },
  },
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  scheduledPublishing: {enabled: false},
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
  plugins: [
    ptBRLocale(),
    structureTool({structure}),
    media(),
  ],
})
