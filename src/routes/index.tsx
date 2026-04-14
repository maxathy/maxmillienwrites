import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/hero/Hero'
import { OfferSection } from '../components/offer/OfferSection'
import { CaseStudyRail } from '../components/case-study-rail/CaseStudyRail'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <OfferSection />
      <CaseStudyRail />
    </>
  )
}
