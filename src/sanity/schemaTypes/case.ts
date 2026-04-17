import { EqualIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  icon: EqualIcon,
  fields: [
    orderRankField({ type: 'case' }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Apenas o ID do vídeo (ex: c5rWB_fS5ao)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de capa',
      type: 'image',
      description: 'Usada como thumbnail antes do vídeo carregar',
      options: { hotspot: true },
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'image' },
  },
})
