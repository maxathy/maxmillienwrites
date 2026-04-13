import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Contact</h1>
    </main>
  ),
})
