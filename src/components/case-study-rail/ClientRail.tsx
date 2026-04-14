import { Container } from '../ui/Container'
import { clientCaseStudies } from '../../content/client-case-studies'
import { CaseStudyCard } from './CaseStudyCard'
import { useRailScroller } from './useRailScroller'

export function ClientRail() {
  const { scrollerRef, active, nudge, handlers } = useRailScroller(
    clientCaseStudies.length,
  )

  return (
    <section
      id="work"
      aria-label="Selected client work"
      className="relative py-[var(--space-16)]"
    >
      <Container>
        <div className="mb-[var(--space-8)] flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Selected work · shipped for clients
            </p>
            <h2 className="mt-3 max-w-[18ch]">
              Systems built for the agentic era.
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous case study"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[color:var(--color-fg)] hover:border-[color:var(--color-accent)]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next case study"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[color:var(--color-fg)] hover:border-[color:var(--color-accent)]"
            >
              →
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client case studies"
        tabIndex={0}
        {...handlers}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 pl-[max(1.5rem,calc((100vw-1280px)/2+2.5rem))] md:gap-8 md:px-10 md:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        style={{ cursor: 'grab', scrollbarWidth: 'none' }}
      >
        {clientCaseStudies.map((study, i) => (
          <div key={study.slug} data-card>
            <CaseStudyCard study={study} index={i} />
          </div>
        ))}
        <div aria-hidden className="shrink-0 pr-6 md:pr-10" />
      </div>

      <div className="sr-only" aria-live="polite">
        Showing case study {active + 1} of {clientCaseStudies.length}:{' '}
        {clientCaseStudies[active]?.title}
      </div>
    </section>
  )
}
