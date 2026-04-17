import { defineField, defineType } from 'sanity'
import { VideoIcon } from '@sanity/icons'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  icon: VideoIcon,
  fields: [
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
      description: 'Apenas o ID do vídeo (ex: dQw4w9WgXcQ)',
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
  preview: {
    select: { title: 'videoId', media: 'image' },
    prepare({ title, media }) {
      return { title: title ?? 'Hero', media }
    },
  },
})
