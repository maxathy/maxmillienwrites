import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/work/')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Work</h1>
    </main>
  ),
})
