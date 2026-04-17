import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import TestimonialClient, { type TestimonialItem } from './TestimonialClient'

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(orderRank asc){
  _id, author, company, quote, mediaType, videoId, image
}`

interface SanityTestimonial {
  _id: string
  author: string
  company: string
  quote: string
  mediaType?: string
  videoId?: string
  image?: object
}

export default async function Testimonial() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY })

  const raw = (data as SanityTestimonial[] | null) ?? []

  const testimonials: TestimonialItem[] = raw.map((t) => ({
    _id: t._id,
    author: t.author,
    company: t.company,
    quote: t.quote,
    mediaType: t.mediaType ?? 'video',
    videoId: t.videoId,
    imageUrl: t.image
      ? urlFor(t.image).width(900).height(600).fit('crop').auto('format').url()
      : undefined,
  }))

  return <TestimonialClient testimonials={testimonials} />
}
