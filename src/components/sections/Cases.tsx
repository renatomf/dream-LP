import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import CasesClient, { type CaseItem } from './CasesClient'

const CASES_QUERY = `*[_type == "case"] | order(orderRank asc){ _id, title, location, mediaType, videoId, thumbnail }`


interface SanityCase {
  _id: string
  title: string
  location: string
  mediaType?: string
  videoId?: string
  thumbnail?: object
}

export default async function Cases() {
  const { data } = await sanityFetch({ query: CASES_QUERY })

  const cases: CaseItem[] = (data as SanityCase[] | null)?.map((c) => ({
    _id: c._id,
    title: c.title,
    location: c.location,
    mediaType: c.mediaType,
    videoId: c.videoId,
    thumbUrl: c.thumbnail
      ? urlFor(c.thumbnail).width(1200).height(800).fit('crop').auto('format').url()
      : '',
  })) ?? []

  return <CasesClient cases={cases} />
}
