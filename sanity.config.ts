'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {ptBRLocale} from '@sanity/locale-pt-br'

import {dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/admin',
  name: 'default',
  title: ' ',
  projectId,
  dataset,
  schema,
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  plugins: [
    ptBRLocale(),
    structureTool({structure}),
  ],
})
