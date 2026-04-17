import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { CalendarIcon, EqualIcon, InfoOutlineIcon, CommentIcon, UsersIcon } from '@sanity/icons'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.documentTypeListItem('hero').title('Hero'),
      S.listItem().title('Eventos').id('eventos').icon(CalendarIcon).child(
        S.editor().id('eventos').schemaType('eventos').documentId('eventos')
      ),
      orderableDocumentListDeskItem({ type: 'case', title: 'Cases', icon: EqualIcon, S, context }),
      orderableDocumentListDeskItem({ type: 'client', title: 'Clientes', icon: UsersIcon, S, context }),
      S.documentTypeListItem('about').title('Sobre Nós').icon(InfoOutlineIcon),
      orderableDocumentListDeskItem({ type: 'testimonial', title: 'Depoimentos', icon: CommentIcon, S, context }),
    ])
