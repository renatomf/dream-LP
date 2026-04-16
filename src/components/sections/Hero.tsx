import { sanityFetch } from '@/sanity/lib/live'

const HERO_QUERY = `*[_type == "hero"][0]{ videoId }`

const FALLBACK_VIDEO_ID = '4qz6x8y3tNw'

export default async function Hero() {
  const { data: hero } = await sanityFetch({ query: HERO_QUERY })
  const videoId: string = hero?.videoId ?? FALLBACK_VIDEO_ID

  return (
    <section id="hero" className="relative h-[83vh] overflow-hidden bg-black">
      {/* Fallback gradient shown behind the video */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-900" />

      {/* YouTube background */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />

      {/* Circular logo centered over video */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <svg
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 100, height: 100 }}
        >
          <defs>
            <path id="topArc" d="M 20,110 A 90,90 0 0,1 200,110" />
            <path id="bottomArc" d="M 200,110 A 90,90 0 0,1 20,110" />
          </defs>
          <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-space-grotesk), sans-serif" fontWeight={100}>
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">YOU DREAM</textPath>
          </text>
          <text fill="white" fontSize={20} letterSpacing={10} fontFamily="var(--font-space-grotesk), sans-serif" fontWeight={100}>
            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">WE DELIVER</textPath>
          </text>
          <circle cx="20" cy="110" r="5" fill="#e02020" />
          <circle cx="200" cy="110" r="5" fill="#e02020" />
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
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-16 pb-0 pt-32">
        <div />

        <div className="flex flex-col md:flex-row md:items-end md:justify-start gap-6 md:gap-4 select-none">
          <h1 className="text-[20vw] sm:text-[16vw] md:text-[20vw] lg:text-[23vw] [font-family:var(--font-metropolis-bold)] text-white leading-none tracking-tighter lowercase translate-y-[10%] md:translate-y-[28%] text-center md:text-left">
            dream
          </h1>

          <div className="text-center md:text-left pb-[10%] md:pb-[3%] md:ml-[4vw]">
            <p className="text-[6vw] sm:text-[4vw] md:text-[2vw] lg:text-[1.4vw] text-white tracking-wide leading-relaxed font-light">
              Comunicação
              <br />e Eventos
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
