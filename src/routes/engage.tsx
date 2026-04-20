import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Container } from '../components/ui/Container'
import { SEO } from '../components/seo/SEO'
import { CalendlyEmbed } from '../components/engage/CalendlyEmbed'

export const Route = createFileRoute('/engage')({
  component: EngagePage,
})

const DELIVERABLES = [
  {
    title: 'Week 1: Audit',
    body: 'I read your codebase, your incident logs, and your migration docs. You get a written systems map: where the risk lives, where the velocity is being taxed, and where the agentic layer needs to sit.',
  },
  {
    title: 'Weeks 2–4: Architecture',
    body: 'Typed contracts, service boundaries, and the orchestration graph. If the AI layer is the objective, we pick the embedding model, the memory topology, and the evaluator loop before writing a line of production code.',
  },
  {
    title: 'Weeks 5+: Ship',
    body: 'I embed with your team, pair on critical paths, and leave behind a monorepo your next hire can onboard to in a day.',
  },
]

const TERMS = [
  { label: 'Engagement', value: 'C2C. 2-month minimum, renewable.' },
  { label: 'Rate', value: 'Weekly retainer. Specifics on the call.' },
  { label: 'Availability', value: 'Boston-based, remote-first. One onsite week/quarter if useful.' },
  { label: 'Stack bias', value: 'TypeScript, React/Angular, NestJS, Postgres, GCP. Flexible on everything except the rigor.' },
]

function EngagePage() {
  useEffect(() => {
    if (window.location.hash !== '#book') return
    const el = document.getElementById('book')
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <>
      <SEO
        title="Engage | Max Millien"
        description="How working with PureTome Labs works: rate, terms, week-1 deliverables. Book a 30-minute architecture call."
        path="/engage"
      />
      <main className="pt-24 pb-[var(--space-16)]">
        <Container>
          <section className="mb-[var(--space-12)] max-w-[56ch]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Engage
            </p>
            <h1 className="mt-3 text-[3rem] leading-tight md:text-[3.75rem]">
              How working with PureTome Labs works.
            </h1>
            <p className="mt-6 text-[color:var(--color-fg)]/75">
              I take on a small number of engagements at a time. The ones that
              work best are systems with real AI ambition, regulated constraints,
              or a team that needs an architect who will also write the code.
            </p>
          </section>

          <section className="mb-[var(--space-12)]">
            <h2 className="mb-[var(--space-6)] font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              What the first quarter looks like
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {DELIVERABLES.map((d) => (
                <div
                  key={d.title}
                  className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.02] p-6"
                >
                  <h3 className="mb-3 text-lg">{d.title}</h3>
                  <p className="text-sm text-[color:var(--color-fg)]/75">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-[var(--space-12)]">
            <h2 className="mb-[var(--space-6)] font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Terms
            </h2>
            <dl className="grid gap-3 md:grid-cols-[14rem_1fr] md:gap-x-6">
              {TERMS.map((t) => (
                <div key={t.label} className="contents">
                  <dt className="font-mono text-sm uppercase tracking-wider text-[color:var(--color-fg)]/60">
                    {t.label}
                  </dt>
                  <dd className="mb-4 text-[color:var(--color-fg)]/85 md:mb-0">{t.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="book" className="scroll-mt-24">
            <h2 className="mb-3 text-[2rem] leading-tight md:text-[2.5rem]">
              Book a 30-min architecture call.
            </h2>
            <p className="mb-[var(--space-6)] max-w-[52ch] text-[color:var(--color-fg)]/75">
              No deck, no pitch. Bring the problem, we'll sketch the first
              three weeks together on the call.
            </p>
            <CalendlyEmbed />
          </section>
        </Container>
      </main>
    </>
  )
}
