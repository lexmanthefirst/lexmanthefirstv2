import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/Hero'
import { Experience } from '../components/Experience'
import { Projects } from '../components/Projects'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="pb-32 bg-[#121212] text-zinc-100 min-h-screen">
      <Hero />
      <Experience />
      <Projects />
      <Footer />
    </div>
  )
}
