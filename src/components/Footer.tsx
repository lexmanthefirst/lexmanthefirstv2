import React from 'react'
import { Icon } from '@iconify/react'
import { SpotifyWidget } from './SpotifyWidget'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="logo-font text-3xl md:text-4xl text-white mb-6 block leading-none">
              Lex<span className="text-lime-400">man</span>
            </a>
            <p className="text-zinc-500 text-sm font-light max-w-xs leading-relaxed">
              Alex Okhitoya (Lexman). Backend &amp; AI Engineer building scalable distributed systems, AI orchestrations, and LLMOps pipelines.
            </p>
            <SpotifyWidget />
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-500 font-light">
              <li><a href="#hero" className="hover:text-lime-400 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-lime-400 transition-colors">Projects</a></li>
              <li><a href="#experience" className="hover:text-lime-400 transition-colors">Experience</a></li>
              <li><a href="#contact" className="hover:text-lime-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Connect</h4>
            <ul className="space-y-2 text-sm text-zinc-500 font-light">
              <li><a href="https://github.com/lexmanthefirst" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/okhitoya-alex/" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">LinkedIn</a></li>
              <li><a href="mailto:hello@lextoya.me" className="hover:text-lime-400 transition-colors">Email</a></li>
              <li><a href="https://x.com/lexmanthefirst" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">X</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-zinc-600 font-light">
          <p>© 2026 Alex Okhitoya (Lexman). All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="flex gap-3 text-zinc-400 flex-row items-center text-lg">
              <a href="https://www.linkedin.com/in/okhitoya-alex/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon icon="ri:linkedin-fill" className="hover:text-lime-400 cursor-pointer transition-colors" />
              </a>
              <a href="https://x.com/lexmanthefirst" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                <Icon icon="ri:twitter-x-fill" className="hover:text-lime-400 cursor-pointer transition-colors" />
              </a>
              <a href="mailto:hello@lextoya.me" aria-label="Email">
                <Icon icon="solar:letter-linear" className="hover:text-lime-400 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
