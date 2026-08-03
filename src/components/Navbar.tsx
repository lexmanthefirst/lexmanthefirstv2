import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Icon } from '@iconify/react'
import { audio } from '../utils/audio'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(audio.getMuteState())

  return (
    <>
      {/* Floating Capsule Nav (Center) */}
      <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/40">
          
          {/* Logo inside Capsule */}
          <Link to="/" className="logo-font text-xl md:text-2xl text-white px-2 py-1 transition-all leading-none">
            Lex<span className="text-lime-400">man</span>
          </Link>
          
          <div className="w-px h-4 bg-white/10 mx-1 md:mx-2"></div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs text-zinc-400 font-medium">
            <Link to="/" hash="hero" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">About</Link>
            <Link to="/" hash="projects" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Projects</Link>
            <Link to="/" hash="experience" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Experience</Link>
            <Link to="/" hash="contact" className="px-5 py-2.5 hover:text-white rounded-full hover:bg-white/5 transition-all">Contact</Link>
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

          {/* Mobile Actions (Volume Mute Toggle) */}
          <div className="flex md:hidden items-center gap-1.5 ml-2 mr-1">
            <button 
              onClick={() => {
                const newState = audio.toggleMute()
                setIsMuted(newState)
                if (!newState) {
                  audio.playClick()
                }
              }}
              className="text-zinc-400 hover:text-white transition-all flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 active:scale-95"
              aria-label={isMuted ? "Unmute site audio" : "Mute site audio"}
            >
              <Icon icon={isMuted ? "solar:volume-cross-linear" : "solar:volume-loud-linear"} width="15" />
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden px-3 py-1.5 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Icon icon={isOpen ? "hugeicons:cancel-01" : "hugeicons:menu-01"} width="20" />
          </button>
        </div>
      </nav>

      {/* Floating Actions (Right) - Desktop Only */}
      <div className="hidden md:flex fixed top-8 right-6 md:right-12 z-50 items-center gap-3">
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
      </div>

      {/* Mobile Links Dropdown Menu */}
      {isOpen && (
        <div className="fixed inset-x-6 top-28 z-40 md:hidden border border-white/15 bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-4 text-sm text-zinc-400 font-light shadow-2xl">
          <Link 
            to="/" 
            hash="hero"
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            About
          </Link>
          <Link 
            to="/" 
            hash="projects"
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Projects
          </Link>
          <Link 
            to="/" 
            hash="experience"
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Experience
          </Link>
          <Link 
            to="/" 
            hash="contact"
            onClick={() => setIsOpen(false)} 
            className="hover:text-white transition-colors py-2 border-b border-white/5 block"
          >
            Contact
          </Link>
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
    </>
  )
}
