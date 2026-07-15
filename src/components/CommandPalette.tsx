import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle: string
  icon: string
  action: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: CommandItem[] = [
    {
      id: 'nav-about',
      title: 'Go to About',
      subtitle: 'Jump to the top introduction section',
      icon: 'solar:user-linear',
      action: () => {
        window.location.hash = '#hero'
        onClose()
      }
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      subtitle: 'View detailed featured case studies',
      icon: 'solar:case-linear',
      action: () => {
        window.location.hash = '#projects'
        onClose()
      }
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      subtitle: 'See professional work history timeline',
      icon: 'solar:square-academic-cap-linear',
      action: () => {
        window.location.hash = '#experience'
        onClose()
      }
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      subtitle: 'Get in touch / subscribe to updates',
      icon: 'solar:letter-linear',
      action: () => {
        window.location.hash = '#contact'
        onClose()
      }
    },
    {
      id: 'email',
      title: 'Send Email',
      subtitle: 'Open mail client to email Lexman',
      icon: 'solar:unread-linear',
      action: () => {
        window.location.href = 'mailto:hello@lextoya.me'
        onClose()
      }
    }
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-lg glass-panel bg-zinc-950/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 rounded-xl overflow-hidden flex flex-col">
        {/* Search Input Box */}
        <div className="flex items-center px-4 border-b border-white/5 h-14">
          <Icon icon="solar:magnifer-linear" className="text-zinc-500 mr-3" width="20" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-600"
          />
          <span className="text-[10px] text-zinc-500 border border-white/10 px-2 py-0.5 rounded bg-white/5 font-mono select-none">ESC</span>
        </div>

        {/* Command Items List */}
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors ${
                  idx === selectedIndex 
                    ? 'bg-lime-400 text-black' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon 
                  icon={cmd.icon} 
                  className={`mr-3 shrink-0 ${idx === selectedIndex ? 'text-black' : 'text-lime-400'}`} 
                  width="20" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium tracking-wide truncate">{cmd.title}</p>
                  <p className={`text-xs truncate ${idx === selectedIndex ? 'text-black/75' : 'text-zinc-500'}`}>
                    {cmd.subtitle}
                  </p>
                </div>
                {idx === selectedIndex && (
                  <span className="text-[10px] font-mono border border-black/25 px-1.5 py-0.5 rounded bg-black/5 text-black font-semibold">↵ Enter</span>
                )}
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-zinc-500 text-sm font-light">
              No results found for "{search}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex justify-between items-center px-4 py-3 border-t border-white/5 bg-zinc-900/25 text-[10px] text-zinc-600 select-none">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Icon icon="solar:arrow-up-down-linear" width="12" /> Navigate
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="solar:keyboard-linear" width="12" /> Select
            </span>
          </div>
          <span>Alex Okhitoya Portfolio</span>
        </div>
      </div>
    </div>
  )
}
