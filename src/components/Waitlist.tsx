import React, { useState } from 'react'

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    // Simulate API registration
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  return (
    <section id="contact" className="py-32 relative flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-lime-400/5 z-0"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950"></div>
      
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center reveal-on-scroll visible">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6">READY TO COLLABORATE?</h2>
        <p className="text-zinc-400 font-light mb-10">Subscribe to receive project updates, technical insights, and collaboration proposals.</p>
        
        {status === 'success' ? (
          <div className="text-lime-400 border border-lime-400/20 px-6 py-4 bg-lime-400/5 backdrop-blur-md max-w-md mx-auto">
            Thank you! You have successfully subscribed to my updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto w-full">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@address.com" 
              required
              disabled={status === 'loading'}
              className="bg-zinc-900/80 border border-white/10 text-white px-5 py-3 outline-none focus:border-lime-400 transition-colors w-full rounded-sm placeholder:text-zinc-600 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-lime-400 text-black font-semibold px-6 py-3 whitespace-nowrap hover:bg-lime-300 transition-colors rounded-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'SENDING...' : 'KEEP IN TOUCH'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
