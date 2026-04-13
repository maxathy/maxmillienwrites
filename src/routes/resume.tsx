import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Résumé</h1>
    </main>
  ),
})
