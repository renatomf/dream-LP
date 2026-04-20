import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventos',
  title: 'Evento',
  type: 'document',
  icon: CalendarIcon,
  initialValue: {
    items: ['Incentivo', 'Convenções', 'Lançamentos', 'Premiações', 'Ativações', 'Estandes'],
  },
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Eventos' }
    },
  },
})
