import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
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
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'image' },
  },
})
