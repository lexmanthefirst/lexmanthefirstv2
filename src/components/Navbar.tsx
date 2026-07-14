import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { CommandPalette } from './CommandPalette'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

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
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-white/5 backdrop-blur-md bg-zinc-950/60 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-medium tracking-tighter text-white uppercase group">
            Lex<span className="text-lime-400">man</span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-light">
            <a href="#hero" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a 
              href="/Alex-Okhitoya-AI-Engineer.pdf"
              download="Alex-Okhitoya-AI-Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-350 transition-colors font-semibold"
            >
              Resume
            </a>
          </div>

          {/* CTA / Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded bg-white/5 text-xs font-light"
              aria-label="Open Command Palette"
            >
              <Icon icon="solar:magnifer-linear" width="16" />
              <span className="hidden sm:inline text-[10px] text-zinc-500 font-mono">Ctrl+K</span>
            </button>
            
            {/* Hamburger Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-zinc-400 hover:text-white transition-colors flex items-center"
              aria-label="Toggle menu"
            >
              <Icon icon={isOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} width="24" />
            </button>
          </div>
        </div>

        {/* Mobile Links Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-4 text-sm text-zinc-400 font-light">
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
              className="text-lime-400 hover:text-lime-300 transition-colors py-2 block font-semibold"
            >
              Resume
            </a>
          </div>
        )}
      </nav>

      {/* Unified Command Palette Modal */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  )
}
