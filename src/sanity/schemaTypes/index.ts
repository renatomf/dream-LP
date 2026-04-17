import { type SchemaTypeDefinition } from 'sanity'
import testimonial from './testimonial'
import case_ from './case'
import client from './client'
import hero from './hero'
import about from './about'
import event from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, event, case_, client, about, testimonial],
}
