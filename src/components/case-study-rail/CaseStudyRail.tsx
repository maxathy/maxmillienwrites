import { useEffect, useRef, useState } from 'react'
import { Container } from '../ui/Container'
import { clientCaseStudies as caseStudies } from '../../content/client-case-studies'
import { CaseStudyCard } from './CaseStudyCard'

export function CaseStudyRail() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const drag = useRef<{ x: number; scrollLeft: number } | null>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(cx - center)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nudge(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      nudge(-1)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el) return
    if (e.pointerType === 'touch') return
    drag.current = { x: e.clientX, scrollLeft: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
    el.style.cursor = 'grabbing'
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el || !drag.current) return
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.x)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    drag.current = null
    if (el) {
      el.style.cursor = ''
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* no-op */
      }
    }
  }

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative py-[var(--space-16)]"
    >
      <Container>
        <div className="mb-[var(--space-8)] flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Selected work
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
        aria-label="Case studies"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-6 pl-[max(1.5rem,calc((100vw-1280px)/2+2.5rem))] md:gap-8 md:px-10 md:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
        style={{ cursor: 'grab', scrollbarWidth: 'none' }}
      >
        {caseStudies.map((study, i) => (
          <div key={study.slug} data-card>
            <CaseStudyCard study={study} index={i} />
          </div>
        ))}
        <div aria-hidden className="shrink-0 pr-6 md:pr-10" />
      </div>

      <div className="sr-only" aria-live="polite">
        Showing case study {active + 1} of {caseStudies.length}:{' '}
        {caseStudies[active]?.title}
      </div>
    </section>
  )
}
