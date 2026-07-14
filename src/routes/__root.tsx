import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NoiseBg } from '../components/NoiseBg'
import { GlowBg } from '../components/GlowBg'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <NoiseBg />
      <GlowBg />
      <Navbar />
      <main className="selection:bg-lime-400 selection:text-black">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
})
