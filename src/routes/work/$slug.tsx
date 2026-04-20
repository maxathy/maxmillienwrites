import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Container } from '../../components/ui/Container'
import { SEO } from '../../components/seo/SEO'
import { clientCaseStudies } from '../../content/client-case-studies'
import { clientCaseStudyContent } from '../../content/case-studies'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const study = clientCaseStudies.find((s) => s.slug === params.slug)
    if (!study) throw notFound()
    const content = clientCaseStudyContent[params.slug] ?? null
    return { study, content }
  },
  component: ClientCaseStudyPage,
  notFoundComponent: () => (
    <main className="pt-24 pb-[var(--space-16)]">
      <Container>
        <h1 className="text-[2rem]">Case study not found.</h1>
        <Link to="/work" className="mt-4 inline-block underline">
          Back to Work
        </Link>
      </Container>
    </main>
  ),
})

function ClientCaseStudyPage() {
  const { study, content } = Route.useLoaderData()

  return (
    <>
      <SEO
        title={`${study.title} — Max Millien`}
        description={study.blurb}
        path={study.detailHref}
      />
      <main className="pt-24 pb-[var(--space-16)]">
        <Container>
          <Link
            to="/work"
            className="mb-[var(--space-6)] inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-fg)]/60 hover:text-[color:var(--color-fg)]"
          >
            ← Back to Work
          </Link>
          <header className="mb-[var(--space-10)] max-w-[72ch] pb-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Case study
            </p>
            <h1 className="mt-3 text-[3rem] leading-tight md:text-[3.75rem]">
              {study.title}
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-fg)]/80">
              {study.blurb}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg)]/70"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </header>

          {content ? (
            <div className="flex flex-col gap-[var(--space-10)] border-t border-white/10 pt-[var(--space-8)]">
              <DeepDiveSection label="Long-form write-up · problem">
                {content.problem}
              </DeepDiveSection>

              <section>
                <SectionLabel>Architecture</SectionLabel>
                <div className="mt-[var(--space-4)] flex flex-col gap-[var(--space-6)]">
                  {content.architecture.diagrams.map((diagram, i) => (
                    <div key={i}>{diagram}</div>
                  ))}
                </div>
                <div className="mt-[var(--space-6)] max-w-[72ch] space-y-3 text-[color:var(--color-fg)]/80">
                  {content.architecture.walkthrough}
                </div>
              </section>

              {content.additionalSections?.map((section) => (
                <DeepDiveSection key={section.heading} label={section.heading}>
                  {section.body}
                </DeepDiveSection>
              ))}

              <DeepDiveSection label="Impact">{content.impact}</DeepDiveSection>

              <DeepDiveSection label="Engagement note">
                {content.engagementNote}
              </DeepDiveSection>

              <section className="border-t border-white/10 pt-[var(--space-6)]">
                <Link
                  to="/engage"
                  hash="book"
                  className="inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-bg)]"
                >
                  Book a 30-min architecture call →
                </Link>
              </section>
            </div>
          ) : (
            <section className="max-w-[72ch] border-t border-white/10 pt-[var(--space-8)]">
              <SectionLabel>Long-form write-up</SectionLabel>
              <p className="mt-4 text-[color:var(--color-fg)]/70">
                Full architecture narrative publishes in the next content pass.
                In the meantime:
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/engage"
                  hash="book"
                  className="inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--color-bg)]"
                >
                  Book a 30-min architecture call →
                </Link>
              </div>
            </section>
          )}
        </Container>
      </main>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
      {children}
    </h2>
  )
}

function DeepDiveSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section>
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-[var(--space-4)] max-w-[72ch] space-y-3 text-[color:var(--color-fg)]/80">
        {children}
      </div>
    </section>
  )
}
