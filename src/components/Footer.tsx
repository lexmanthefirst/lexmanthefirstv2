import React from 'react'
import { SpotifyWidget } from './SpotifyWidget'

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-2xl mx-auto px-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
        <p className="text-xs text-zinc-500 font-medium tracking-wide text-center sm:text-left">
          © 2026 Alex Okhitoya
        </p>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <SpotifyWidget />
        </div>
      </div>
    </footer>
  )
}
