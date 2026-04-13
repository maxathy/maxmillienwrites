import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/author/album')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Traffic Engineer — Album</h1>
    </main>
  ),
})
