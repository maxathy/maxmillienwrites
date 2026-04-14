import { Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { Nav } from '../components/nav/Nav'
import { Footer } from '../components/layout/Footer'
import { SEO } from '../components/seo/SEO'

const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRoute({
  component: () => (
    <>
      <SEO />
      <Nav />
      <div className="flex min-h-screen flex-col pt-16">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      {import.meta.env.DEV ? (
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      ) : null}
    </>
  ),
})
