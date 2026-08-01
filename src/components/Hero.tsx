import React from 'react'
import { Icon } from '@iconify/react'

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 relative" id="hero">
      <div className="max-w-2xl mx-auto px-6">
        {/* Top Header: Profile Image + Social Icons */}
        <div className="flex justify-between items-start mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-lg">
            <img 
              src="/DSC_0471.jpg" 
              alt="Alex Okhitoya" 
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-lg pt-2">
            <a 
              href="https://x.com/lexmanthefirst" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="X profile"
              className="hover:text-white transition-colors"
            >
              <Icon icon="ri:twitter-x-fill" width="18" />
            </a>
            <a 
              href="https://www.linkedin.com/in/okhitoya-alex/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hover:text-white transition-colors"
            >
              <Icon icon="ri:linkedin-fill" width="18" />
            </a>
            <a 
              href="https://github.com/lexmanthefirst" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:text-white transition-colors"
            >
              <Icon icon="ri:github-fill" width="18" />
            </a>
          </div>
        </div>

        {/* Name & Role */}
        <h1 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-1">
          Alex Okhitoya
        </h1>
        <p className="text-zinc-400 text-sm font-normal mb-8">
          Software Engineer
        </p>

        {/* Bio Paragraphs */}
        <div className="space-y-4 text-zinc-300 text-xs md:text-sm font-normal leading-relaxed mb-8">
          <p>
            Software Engineer with 4+ years of experience, lead full-stack developer working on{' '}
            <a 
              href="https://github.com/lexmanthefirst" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              crosstalk AI
            </a>.
          </p>
          <p>
            I help startups, founders, and teams build better products where{' '}
            <span className="bg-blue-600/90 text-white px-1.5 py-0.5 rounded text-[14px] font-semibold mx-0.5 inline-block">
              I engineer for speed
            </span>{' '}
            through high-throughput microservices, agentic workflows, and fast reliable backend infrastructure.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href="mailto:hello@lextoya.me"
            className="inline-block px-6 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}
