import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import MarqueeTrack from '@/components/MarqueeTrack'

const CLIENTS_QUERY = `*[_type == "client"] | order(orderRank asc){ _id, name, logo }`

const FALLBACK_CLIENTS = [
  { _id: 'fb',   name: 'Facebook',  src: '/images/facebook.png',  width: 200, height: 50 },
  { _id: 'pan',  name: 'Banco PAN', src: '/images/pan.png',       width: 200, height: 50 },
  { _id: 'chev', name: 'Chevrolet', src: '/images/chevrolet.png', width: 200, height: 50 },
  { _id: 'ig',   name: 'Instagram', src: '/images/instagram.png', width: 200, height: 50 },
  { _id: 'saf',  name: 'Safra',     src: '/images/safra.png',     width: 200, height: 50 },
]

interface ClientItem {
  _id: string
  name: string
  src: string
  width: number
  height: number
}

export default async function Clients() {
  const { data } = await sanityFetch({ query: CLIENTS_QUERY })

  const clients: ClientItem[] =
    data?.length
      ? data.map((c: { _id: string; name: string; logo: object }) => ({
          _id: c._id,
          name: c.name,
          src: urlFor(c.logo).width(400).fit('max').auto('format').url(),
          width: 200,
          height: 50,
        }))
      : FALLBACK_CLIENTS

  const MIN_SLOTS = 8
  const repeat = Math.ceil((MIN_SLOTS * 2) / clients.length)
  const items = Array.from({ length: repeat }, () => clients).flat()

  return (
    <section id="clientes" className="bg-white pt-0 pb-0 border-t border-white/5 scroll-mt-20">
      <div className="max-w-360 mx-auto px-8 -mb-4">
        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight caret-transparent">
          Clientes<span className="text-brand">_</span>
        </h2>
      </div>

      <div className="relative overflow-x-hidden py-20 md:py-20">
        {/* Fade edges */}
        <div className="absolute left-0 top-5 bottom-0 w-12 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-5 bottom-0 w-12 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <MarqueeTrack className="flex items-center">
          {items.map((client, i) => (
            <div
              key={`${client._id}-${i}`}
              className="inline-flex items-center justify-center px-6 md:px-12 opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                style={{
                  width: `${client.width}px`,
                  height: `${client.height}px`,
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </MarqueeTrack>
      </div>
    </section>
  )
}
