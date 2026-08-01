import React from 'react'
import { SpotifyWidget } from './SpotifyWidget'

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="text-xs text-zinc-500 font-medium tracking-wide">
          © 2026 Alex Okhitoya
        </p>

        <div className="mt-0">
          <SpotifyWidget />
        </div>
      </div>
    </footer>
  )
}
