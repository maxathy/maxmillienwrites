import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/engage')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Engage</h1>
    </main>
  ),
})
