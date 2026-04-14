import { Container } from '../ui/Container'
import { ossShowcase } from '../../content/oss-showcase'
import { OssCard } from './OssCard'
import { useRailScroller } from './useRailScroller'

export function OssRail() {
  const { scrollerRef, active, nudge, handlers } = useRailScroller(
    ossShowcase.length,
  )

  return (
    <section
      id="oss"
      aria-label="Open source showcase"
      className="relative border-t border-white/5 py-[var(--space-16)]"
    >
      <Container>
        <div className="mb-[var(--space-8)] flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Open source · auditable proof
            </p>
            <h2 className="mt-3 max-w-[22ch] font-mono text-[color:var(--color-fg)]">
              Code you can read, right now.
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous repo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[color:var(--color-fg)] hover:border-white/40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next repo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[color:var(--color-fg)] hover:border-white/40"
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
        aria-label="Open source repositories"
        tabIndex={0}
        {...handlers}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 pl-[max(1.5rem,calc((100vw-1280px)/2+2.5rem))] md:gap-8 md:px-10 md:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        style={{ cursor: 'grab', scrollbarWidth: 'none' }}
      >
        {ossShowcase.map((repo, i) => (
          <div key={repo.slug} data-card>
            <OssCard repo={repo} index={i} />
          </div>
        ))}
        <div aria-hidden className="shrink-0 pr-6 md:pr-10" />
      </div>

      <div className="sr-only" aria-live="polite">
        Showing repo {active + 1} of {ossShowcase.length}: {ossShowcase[active]?.title}
      </div>
    </section>
  )
}
