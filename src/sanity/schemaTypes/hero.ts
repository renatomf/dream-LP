import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Apenas o ID do vídeo (ex: dQw4w9WgXcQ)',
    }),
  ],
  preview: {
    select: { title: 'videoId' },
  },
})
