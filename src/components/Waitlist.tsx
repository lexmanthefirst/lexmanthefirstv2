import React from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'

export const Waitlist: React.FC = () => {
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText('hello@lextoya.me')
    toast.success('Email copied to clipboard!')
  }

  return (
    <section id="contact" className="py-32 relative flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-lime-400/5 z-0"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950"></div>
      
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center reveal-on-scroll visible">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6">READY TO COLLABORATE?</h2>
        <p className="text-zinc-400 font-light mb-8">Feel free to reach out for project updates, technical insights, or collaboration proposals.</p>
        
        <div className="flex items-center justify-center gap-3 text-zinc-300 font-light bg-white/5 border border-white/10 rounded-full px-5 py-2.5 w-fit mx-auto hover:bg-white/10 transition-colors">
          <a 
            href="mailto:hello@lextoya.me" 
            className="hover:text-lime-400 transition-colors"
          >
            hello@lextoya.me
          </a>
          <div className="w-px h-4 bg-white/10"></div>
          <button 
            onClick={handleCopyEmail}
            className="text-zinc-400 hover:text-lime-400 transition-colors flex items-center justify-center p-1 rounded hover:bg-white/5 cursor-pointer"
            title="Copy email to clipboard"
          >
            <Icon icon="solar:copy-linear" width="18" />
          </button>
        </div>
      </div>
    </section>
  )
}
