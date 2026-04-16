import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventos',
  title: 'Eventos',
  type: 'document',
  initialValue: {
    items: ['Incentivo', 'Convenções', 'Lançamentos', 'Premiações', 'Ativações', 'Estandes'],
  },
  fields: [
    defineField({
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'items' },
    prepare({ title }) {
      return { title: Array.isArray(title) ? title.join(' · ') : 'Eventos' }
    },
  },
})
