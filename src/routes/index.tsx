import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { TechSpecs } from '../components/TechSpecs'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { Waitlist } from '../components/Waitlist'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <TechSpecs />
      <Projects />
      <Experience />
      <Waitlist />
    </>
  )
}
