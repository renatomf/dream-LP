import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import HeroText from '../HeroText'
import HeroMediaFade from '../HeroMedia'

const HERO_QUERY = `*[_type == "hero"][0]{ mediaType, videoId, image }`

const FALLBACK_VIDEO_ID = 'GUY1motJw4A'

interface SanityHero {
  mediaType?: string;
  videoId?: string;
  image?: { asset: { _ref: string } };
}

export default async function Hero() {
  const { data } = await sanityFetch({ query: HERO_QUERY })
  const hero = data as SanityHero | null
  const mediaType = hero?.mediaType ?? 'video'
  const videoId: string = hero?.videoId ?? FALLBACK_VIDEO_ID
  const imageUrl = hero?.image ? urlFor(hero.image).url() : null

  return (
    <section id="hero" className="relative h-[75vh] md:h-[83vh] overflow-hidden bg-black">
      {/* Top stroke */}
      <div className="absolute top-0 left-0 right-0 h-0.75 z-30" style={{ background: 'linear-gradient(to right, #C72026, #F27421)' }} />
      {/* Fallback gradient shown behind the media */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-900" />

      {mediaType === 'image' && imageUrl !== null ? (
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          className="object-cover opacity-60 pointer-events-none"
          priority
        />
      ) : (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
          style={{ width: 'max(100%, 177.78vh)', height: 'max(100%, 56.25vw)' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full border-0"
            title="Hero background"
          />
        </div>
      )}

      {/* Fade-in reveal */}
      <HeroMediaFade />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />

      {/* Circular logo centered over video */}
      <div className="absolute inset-0 z-20 flex items-center justify-center -translate-y-10 md:-translate-y-16">
        <svg
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 110, height: 110 }}
        >
          <defs>
            <path id="topArc" d="M 20,110 A 90,90 0 0,1 200,110" />
            <path id="bottomArc" d="M 200,110 A 90,90 0 0,1 20,110" />
            <style>{`@keyframes heroSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </defs>
          <g style={{ transformOrigin: '110px 110px', animation: 'heroSpin 12s linear infinite' }}>
            <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-space-grotesk), sans-serif" fontWeight={100}>
              <textPath href="#topArc" startOffset="50%" textAnchor="middle">YOU DREAM</textPath>
            </text>
            <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-space-grotesk), sans-serif" fontWeight={100}>
              <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">WE DELIVER</textPath>
            </text>
            <circle cx="20" cy="110" r="5" fill="#e02020" />
            <circle cx="200" cy="110" r="5" fill="#e02020" />
          </g>
          <path
            d="M110,85 L110,118 M98,106 L110,118 L122,106"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <HeroText />
    </section>
  )
}
