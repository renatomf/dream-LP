import { sanityFetch } from '@/sanity/lib/live'
import MarqueeTrack from '@/components/MarqueeTrack'

const EVENTS_QUERY = `*[_type == "eventos" && _id == "eventos"][0]{ items }`

const FALLBACK_EVENTS = [
  'Incentivo',
  'Convenções',
  'Lançamentos',
  'Premiações',
  'Ativações',
  'Estandes',
]

export default async function Eventos() {
  const { data } = await sanityFetch({ query: EVENTS_QUERY })
  const events: string[] = data?.items?.length ? data.items : FALLBACK_EVENTS

  // Duplicate for seamless loop
  const items = [...events, ...events]

  return (
    <section id="eventos" className="bg-white py-8 md:py-11 overflow-hidden">
      <div className="relative flex">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <MarqueeTrack className="flex whitespace-nowrap mt-3 md:mt-4">
          {items.map((event, i) => (
            <span
              key={i}
              className="inline-flex items-center px-8 md:px-14 text-3xl md:text-4xl font-medium tracking-normal text-[#cbcaca]"
            >
              {event}
            </span>
          ))}
        </MarqueeTrack>
      </div>
    </section>
  )
}
