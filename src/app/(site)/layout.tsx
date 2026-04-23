import { SanityLive } from '../../sanity/lib/live'
import ScrollWatcher from '../../components/ScrollWatcher'
import ContactButtons from '../../components/ContactButtons'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SanityLive />
      <ScrollWatcher />
      <ContactButtons />
      {children}
    </>
  )
}
