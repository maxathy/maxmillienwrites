import { Outlet, createRootRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV ? (
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      ) : null}
    </>
  ),
})
