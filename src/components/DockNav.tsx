import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export const DockNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'work'>('about')
  const [isDark, setIsDark] = useState<boolean>(true)

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  const scrollToSection = (id: string, tab: 'about' | 'work') => {
    setActiveTab(tab)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="dock-container backdrop-blur-md border rounded-full p-1.5 flex items-center gap-1 shadow-2xl transition-all duration-300">
        <button
          onClick={() => scrollToSection('hero', 'about')}
          className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeTab === 'about'
              ? 'dock-btn-active shadow-sm'
              : 'dock-btn-inactive'
          }`}
        >
          About
        </button>
        <button
          onClick={() => scrollToSection('experience', 'work')}
          className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeTab === 'work'
              ? 'dock-btn-active shadow-sm'
              : 'dock-btn-inactive'
          }`}
        >
          Work
        </button>
        <div className="w-px h-3 dock-divider mx-1"></div>
        <button
          onClick={toggleTheme}
          aria-label="Theme toggle"
          className="p-1.5 rounded-full dock-icon-btn transition-colors"
        >
          <Icon icon={isDark ? "solar:sun-linear" : "solar:moon-linear"} width="16" />
        </button>
      </div>
    </div>
  )
}
