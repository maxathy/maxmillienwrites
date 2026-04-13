import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stack')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Stack</h1>
    </main>
  ),
})
