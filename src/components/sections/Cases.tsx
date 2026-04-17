import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import CasesClient, { type CaseItem } from './CasesClient'

const CASES_QUERY = `*[_type == "case"] | order(orderRank asc){ _id, title, location, videoId, image }`


interface SanityCase {
  _id: string
  title: string
  location: string
  videoId: string
  image?: object
}

export default async function Cases() {
  const { data } = await sanityFetch({ query: CASES_QUERY })

  const cases: CaseItem[] = (data as SanityCase[] | null)?.map((c) => ({
    _id: c._id,
    title: c.title,
    location: c.location,
    videoId: c.videoId,
    thumbUrl: c.image
      ? urlFor(c.image).width(900).height(600).fit('crop').auto('format').url()
      : '',
  })) ?? []

  return <CasesClient cases={cases} />
}
