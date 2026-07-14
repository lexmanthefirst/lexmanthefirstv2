import React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NoiseBg } from '../components/NoiseBg'
import { GlowBg } from '../components/GlowBg'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { audio } from '../utils/audio'

const RootComponent: React.FC = () => {
  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button')) {
      audio.playClick()
    }
  }

  return (
    <div onClick={handleGlobalClick}>
      <NoiseBg />
      <GlowBg />
      <Navbar />
      <main className="selection:bg-lime-400 selection:text-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
