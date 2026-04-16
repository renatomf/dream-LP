import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import TestimonialClient, { type TestimonialItem } from './TestimonialClient'

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(sortOrder asc){
  _id, sectionTitle, author, company, quote, videoId, image
}`

interface SanityTestimonial {
  _id: string
  sectionTitle?: string
  author: string
  company: string
  quote: string
  videoId?: string
  image?: object
}

export default async function Testimonial() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY })

  const raw = (data as SanityTestimonial[] | null) ?? []

  const sectionTitle = raw[0]?.sectionTitle

  const testimonials: TestimonialItem[] = raw.map((t) => ({
    _id: t._id,
    author: t.author,
    company: t.company,
    quote: t.quote,
    videoId: t.videoId,
    imageUrl: t.image
      ? urlFor(t.image).width(900).height(600).fit('crop').auto('format').url()
      : undefined,
  }))

  return <TestimonialClient testimonials={testimonials} sectionTitle={sectionTitle} />
}
