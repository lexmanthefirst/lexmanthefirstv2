import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { CommandPalette } from './CommandPalette'
import { audio } from '../utils/audio'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(audio.getMuteState())

  // Listen for Ctrl+K / Cmd+K shortcuts to open palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsPaletteOpen(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Floating Capsule Nav (Center) */}
      <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/40">
          
          {/* Logo inside Capsule */}
          <a href="#" className="logo-font text-xl md:text-2xl text-white px-2 py-1 transition-all leading-none">
            Lex<span className="text-lime-400">man</span>
          </a>
          
          <div className="w-px h-4 bg-white/10 mx-1 md:mx-2"></div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs text-zinc-400 font-medium">
            <a href="#hero" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">About</a>
            <a href="#projects" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Projects</a>
            <a href="#experience" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Experience</a>
            <a href="#contact" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Contact</a>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <a 
              href="/Alex-Okhitoya-AI-Engineer.pdf"
              download="Alex-Okhitoya-AI-Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-black bg-lime-400 rounded-full hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)] font-semibold"
            >
              Resume
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden px-3 py-1.5 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Icon icon={isOpen ? "lucide:x" : "lucide:menu"} width="20" />
          </button>
        </div>
      </nav>

      {/* Floating Actions (Right) */}
      <div className="fixed top-8 right-6 md:right-12 z-50 flex items-center gap-3">
        {/* Mute Toggle */}
        <button 
          onClick={() => {
            const newState = audio.toggleMute()
            setIsMuted(newState)
            if (!newState) {
              audio.playClick()
            }
          }}
          className="text-zinc-400 hover:text-white transition-all flex items-center justify-center w-10 h-10 border border-white/10 rounded-full bg-zinc-950/40 backdrop-blur-xl shadow-lg hover:border-white/20 active:scale-95"
          aria-label={isMuted ? "Unmute site audio" : "Mute site audio"}
        >
          <Icon icon={isMuted ? "solar:volume-cross-linear" : "solar:volume-loud-linear"} width="16" />
        </button>

        {/* Command Palette Trigger */}
        <button 
          onClick={() => setIsPaletteOpen(true)}
          className="text-zinc-400 hover:text-white transition-all flex items-center justify-center w-10 h-10 border border-white/10 rounded-full bg-zinc-950/40 backdrop-blur-xl shadow-lg hover:border-white/20 active:scale-95"
          aria-label="Open Command Palette"
        >
          <Icon icon="solar:magnifer-linear" width="16" />
        </button>
      </div>

      {/* Mobile Links Dropdown Menu */}
      {isOpen && (
        <div className="fixed inset-x-6 top-28 z-40 md:hidden border border-white/15 bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-4 text-sm text-zinc-400 font-light shadow-2xl">
          <a 
            href="#hero" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            About
          </a>
          <a 
            href="#projects" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Projects
          </a>
          <a 
            href="#experience" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Experience
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Contact
          </a>
          <a 
            href="/Alex-Okhitoya-AI-Engineer.pdf"
            download="Alex-Okhitoya-AI-Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)} 
            className="text-lime-400 hover:text-lime-350 transition-colors py-2 block font-semibold"
          >
            Resume
          </a>
        </div>
      )}

      {/* Unified Command Palette Modal */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
