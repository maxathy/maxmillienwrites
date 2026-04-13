import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Max Millien — Principal AI Architect</h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        Scaffold placeholder. Homepage sections land in Phase 3.
      </p>
    </main>
  )
}
