import { lazy, Suspense } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '../components/ui/Container'
import { SEO } from '../components/seo/SEO'
import { StackGraphFallback } from '../components/stack/StackGraphFallback'

const StackGraph = lazy(() => import('../components/stack/StackGraph'))

export const Route = createFileRoute('/stack')({
  component: StackPage,
})

function StackPage() {
  return (
    <>
      <SEO
        title="Stack — Max Millien"
        description="The production stack behind PureTome and Quiet Horizons — hybrid RAG, NestJS, Angular, GCP, and the HIPAA-grade security layer that ties them together. Every primitive with an operator-level note."
        path="/stack"
      />
      <main className="pt-24 pb-[var(--space-16)]">
        <Container>
          <header className="mb-[var(--space-10)] max-w-[72ch]">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--color-fg)]/60">
              Stack · the primitives I ship with
            </p>
            <h1 className="mt-3 font-mono text-[2.25rem] leading-tight md:text-[3rem]">
              What I actually build with
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-fg)]/80">
              Five layers, chosen for production behavior rather than résumé bingo. Hover any
              primitive for the operator-level note — how I use it, what it&rsquo;s for, and why it
              earned a slot.
            </p>
          </header>

          <Suspense fallback={<StackGraphFallback />}>
            <StackGraph />
          </Suspense>

          <section className="mt-[var(--space-12)] max-w-[72ch] border-t border-white/10 pt-[var(--space-8)]">
            <p className="text-[color:var(--color-fg)]/70">
              Looking for a deeper walkthrough on a specific primitive, or want to know how these
              layers cohere in a single HIPAA-scoped system?
            </p>
            <Link
              to="/contact"
              className="mt-[var(--space-4)] inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-bg)]"
            >
              Start a conversation →
            </Link>
          </section>
        </Container>
      </main>
    </>
  )
}
