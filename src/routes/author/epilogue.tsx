import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/author/epilogue')({
  component: () => (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">The Living Epilogue</h1>
    </main>
  ),
})
