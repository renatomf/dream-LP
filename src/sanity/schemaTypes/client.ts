import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { InfoBanner } from '../components/InfoBanner'

const MIN_CLIENTS = 8

export default defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  icon: UsersIcon,
  fields: [
    orderRankField({ type: 'client' }),
    defineField({
      name: 'info',
      title: ' ',
      type: 'string',
      readOnly: true,
      hidden: false,
      components: {
        input: () =>
          InfoBanner({
            message: `O carrossel de clientes precisa de no mínimo ${MIN_CLIENTS} logos para funcionar sem pular a animação. Se houver menos, os logos serão repetidos automaticamente até que seja adicionado o mínimo ${MIN_CLIENTS} logos.`,
          }),
        field: (props) => props.renderDefault(props),
      },
    }),
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
