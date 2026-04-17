import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  fields: [
    orderRankField({ type: 'client' }),
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Tamanho recomendado: 200px × 50px. Prefira PNG com fundo transparente.',
      options: { hotspot: false },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
