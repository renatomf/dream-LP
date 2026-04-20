import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'about',
  title: 'Sobre Nós',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'anos',
      title: 'Anos',
      type: 'number',
      description: 'Ex: 16',
    }),
    defineField({
      name: 'paises',
      title: 'Países',
      type: 'number',
      description: 'Ex: 27',
    }),
    defineField({
      name: 'cidades',
      title: 'Cidades',
      type: 'number',
      description: 'Ex: 64',
    }),
    defineField({
      name: 'voltasAoMundo',
      title: 'Voltas ao redor do mundo',
      type: 'number',
      description: 'Ex: 45',
    }),
  ],
  preview: {
    select: { title: 'anos' },
    prepare({ }: { title?: number }) {
      return { title: `Sobre Nós `}
    },
  },
})
