import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Título do Depoimento',
      type: 'string',
    }),
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
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Apenas o ID do vídeo (ex: GwG92EaFTd8). Se preenchido, o vídeo tem prioridade sobre a imagem.',
    }),
    defineField({
      name: 'image',
      title: 'Imagem (fallback)',
      type: 'image',
      description: 'Usada quando não há vídeo.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordem',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordem',
      name: 'orderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
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
