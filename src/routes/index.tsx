import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Certifications } from '@/components/sections/Certifications'
import { Education } from '@/components/sections/Education'
import { Snippets } from '@/components/sections/Snippets'
import { Contact } from '@/components/sections/Contact'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <Snippets />
      <Contact />
    </>
  )
}
