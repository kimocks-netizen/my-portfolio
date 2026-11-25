import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CursorGlow } from '@/components/effects/CursorGlow'
import { ScrollProgress } from '@/components/effects/ScrollProgress'

export const Route = createRootRoute({
  component: () => (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ),
})
