import React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { DockNav } from '../components/DockNav'
import { Toaster } from 'sonner'

const RootComponent: React.FC = () => {
  return (
    <div className="bg-[#121212] min-h-screen text-zinc-100 antialiased selection:bg-zinc-700 selection:text-white">
      <Toaster position="bottom-right" theme="dark" duration={2000} />
      <main>
        <Outlet />
      </main>
      <DockNav />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
