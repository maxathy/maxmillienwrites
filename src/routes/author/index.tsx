import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/author/')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Max Millien — Author of Traffic Engineer</h1>
    </main>
  ),
})
