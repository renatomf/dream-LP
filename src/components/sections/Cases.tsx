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

  const cases: CaseItem[] = (data as SanityCase[] | null)?.map((c, i) => {
    const isWide = i % 16 === 0 || i % 16 === 9
    return {
      _id: c._id,
      title: c.title,
      location: c.location,
      mediaType: c.mediaType,
      videoId: c.videoId,
      thumbUrl: c.thumbnail
        ? urlFor(c.thumbnail)
            .width(isWide ? 1800 : 900)
            .height(isWide ? 1200 : 1200)
            .fit('crop').crop('focalpoint')
            .auto('format').url()
        : '',
    }
  }) ?? []

  return <CasesClient cases={cases} />
}
