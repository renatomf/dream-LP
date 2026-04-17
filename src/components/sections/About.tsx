import { sanityFetch } from '@/sanity/lib/live'
import AboutClient from './AboutClient'

const ABOUT_QUERY = `*[_type == "about"][0]{ anos, paises, cidades, voltasAoMundo }`

const FALLBACK = { anos: 16, paises: 27, cidades: 64, voltasAoMundo: 45 }

export default async function About() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY })

  const anos = data?.anos ?? FALLBACK.anos
  const paises = data?.paises ?? FALLBACK.paises
  const cidades = data?.cidades ?? FALLBACK.cidades
  const voltasAoMundo = data?.voltasAoMundo ?? FALLBACK.voltasAoMundo

  const stats = [
    { value: String(anos), label: 'Anos' },
    { value: String(paises), label: 'Países' },
    { value: String(cidades), label: 'Cidades' },
    { value: String(voltasAoMundo), label: 'Voltas ao redor\ndo mundo' },
  ]

  return <AboutClient stats={stats} />
}
