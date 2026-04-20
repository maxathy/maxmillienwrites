import { createFileRoute } from '@tanstack/react-router'
import { ClientRail } from '../../components/case-study-rail/ClientRail'
import { OssRail } from '../../components/case-study-rail/OssRail'
import { Container } from '../../components/ui/Container'
import { SEO } from '../../components/seo/SEO'

export const Route = createFileRoute('/work/')({
  component: WorkIndex,
})

function WorkIndex() {
  return (
    <>
      <SEO
        title="Work | Max Millien"
        description="Shipped client systems and open-source showcase repos. HIPAA-grade telehealth, agent-native monorepos, realtime voice infra."
        path="/work"
      />
      <main className="pt-24">
        <Container>
          <header className="mb-[var(--space-12)] max-w-[56ch]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Selected work
            </p>
            <h1 className="mt-3 text-[3rem] leading-tight md:text-[3.75rem]">
              Shipped systems and auditable proof.
            </h1>
          </header>
        </Container>
        <ClientRail />
        <OssRail />
      </main>
    </>
  )
}
