import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

const TILES = [
  {
    eyebrow: 'The Problem',
    body: 'Most AI features never make it out of the demo. They hallucinate, drift, and don\'t survive contact with production.',
  },
  {
    eyebrow: 'The Work',
    body: 'I architect the backbone: hybrid RAG with Neo4j + pgvector, stateful agent graphs in LangGraph, and the observability to prove the system is actually thinking.',
  },
  {
    eyebrow: 'The Outcome',
    body: 'Features that your team can extend, your CFO can measure, and your compliance officer can sign off on.',
  },
]

export function OfferSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current
        if (!track) return
        const distance = track.scrollWidth - window.innerWidth
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${distance}`,
            pin: true,
            pinType: 'transform',
            pinReparent: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    }, wrapper)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      aria-label="What I do"
      className="relative bg-[color:var(--color-bg)] py-[var(--space-16)] md:h-screen md:py-0"
    >
      <div className="md:h-full md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-[var(--space-8)] md:h-full md:flex-row md:gap-0"
        >
          {TILES.map((tile, i) => (
            <article
              key={tile.eyebrow}
              className="flex shrink-0 flex-col justify-center border-t border-white/5 px-6 md:h-full md:w-screen md:border-l md:border-t-0 md:px-[10vw]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
                {String(i + 1).padStart(2, '0')} · {tile.eyebrow}
              </p>
              <p className="mt-[var(--space-4)] max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.15] tracking-tight text-[color:var(--color-fg)]">
                {tile.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
