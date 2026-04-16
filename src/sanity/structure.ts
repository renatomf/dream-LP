import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.documentTypeListItem('hero').title('Hero'),
      S.listItem().title('Eventos').id('eventos').child(
        S.document().schemaType('eventos').documentId('eventos')
      ),
      S.documentTypeListItem('case').title('Cases'),
      S.documentTypeListItem('client').title('Clientes'),
      S.documentTypeListItem('about').title('Sobre Nós'),
      S.documentTypeListItem('testimonial').title('Depoimentos'),
    ])
