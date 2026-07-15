import React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NoiseBg } from '../components/NoiseBg'
import { GlowBg } from '../components/GlowBg'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Preloader } from '../components/Preloader'
import { audio } from '../utils/audio'

import { Toaster } from 'sonner'

const RootComponent: React.FC = () => {
  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button')) {
      audio.playClick()
    }
  }

  return (
    <div onClick={handleGlobalClick}>
      <Toaster position="bottom-right" theme="dark" duration={2000} />
      <Preloader />
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
