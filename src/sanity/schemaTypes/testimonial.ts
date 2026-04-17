import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    orderRankField({ type: 'testimonial' }),
    defineField({
      name: 'quote',
      title: 'Depoimento',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Tipo de mídia',
      type: 'string',
      options: {
        list: [
          { title: 'Vídeo (YouTube)', value: 'video' },
          { title: 'Imagem', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Apenas o ID do vídeo (ex: GwG92EaFTd8)',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== 'image',
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'author', subtitle: 'company' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Depoimento sem nome',
        subtitle,
      }
    },
  },
})
