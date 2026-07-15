import React from 'react'
import { Icon } from '@iconify/react'
import { ProfileViewer } from './ProfileViewer'

export const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Hero Copy (Left) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 order-2 lg:order-1">
          <div className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase">
            Backend &amp; AI Engineer
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.9] tracking-tighter reveal-on-scroll visible">
            ALEX <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">OKHITOYA</span><br />
            (LEXMAN)
          </h1>

          <p className="text-zinc-400 font-light text-base md:text-lg max-w-md leading-relaxed reveal-on-scroll visible">
            Specializing in high-throughput event-driven microservices (NATS, Kafka, RabbitMQ) and production-grade LLM observability pipelines (Langfuse). I build fast, reliable backend systems.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 w-full sm:w-auto reveal-on-scroll visible">
            <a 
              href="#projects"
              className="px-8 py-4 bg-lime-400 text-black text-sm font-semibold tracking-wide hover:bg-lime-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-center block"
            >
              VIEW PROJECTS
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 glass-panel text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2 group text-center block"
            >
              <Icon icon="solar:letter-linear" width="20" className="group-hover:text-lime-400 transition-colors" />
              CONTACT ME
            </a>
          </div>
        </div>

        {/* Hero Image & 3D Effect (Center/Right) */}
        <ProfileViewer />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
        <Icon icon="solar:arrow-down-linear" className="text-zinc-400" />
      </div>
    </header>
  )
}
