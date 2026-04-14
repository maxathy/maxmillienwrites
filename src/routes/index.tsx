import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/hero/Hero'
import { OfferSection } from '../components/offer/OfferSection'
import { ClientRail } from '../components/case-study-rail/ClientRail'
import { OssRail } from '../components/case-study-rail/OssRail'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <OfferSection />
      <ClientRail />
      <OssRail />
    </>
  )
}
