import { EqualIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { CaseForm } from '../components/CaseForm'

export default defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  icon: EqualIcon,
  components: { input: CaseForm },
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
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Imagem obrigatória exibida no card. Se o tipo de mídia for "Imagem", ela também será exibida no modal. Se for "Vídeo", serve apenas como capa antes do vídeo carregar.',
      options: { hotspot: true },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Apenas o ID do vídeo (ex: c5rWB_fS5ao)',
      hidden: ({ document }) => document?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaType === 'video' && !value) {
            return 'Obrigatório quando o tipo de mídia é Vídeo'
          }
          return true
        }),
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'thumbnail' },
  },
})
