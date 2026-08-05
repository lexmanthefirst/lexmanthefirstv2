import React, { useRef } from 'react'
import { Icon } from '@iconify/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // GSAP ScrollTrigger timeline locked 1-to-1 to scroll position (no fading, no lag)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=120',
        scrub: true,
      },
    })

    // 1. Morph Hero Avatar container (80px -> 40px, rounded-2xl -> rounded-full circle)
    tl.to('#hero-avatar', {
      width: 40,
      height: 40,
      borderRadius: '9999px',
      ease: 'none',
    }, 0)

    // 2. Morph Sticky Social Icons (padding, border-radius, background blur)
    tl.to('#hero-social', {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 14,
      paddingRight: 14,
      borderRadius: '9999px',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      ease: 'none',
    }, 0)
  }, { scope: containerRef })

  return (
    <section className="pt-24 pb-16 relative" id="hero" ref={containerRef}>
      <div className="max-w-2xl mx-auto px-6">
        {/* Sticky Header Row: Profile Image + Social Icons */}
        <div className="sticky top-5 z-40 flex justify-between items-center mb-8 pointer-events-none py-1">
          {/* GSAP ScrollTrigger Hero Avatar */}
          <div
            id="hero-avatar"
            className="pointer-events-auto overflow-hidden shadow-lg w-20 h-20 rounded-2xl transform-gpu"
          >
            <img 
              id="hero-avatar-img"
              src="/DSC_0471.jpg" 
              alt="Alex Okhitoya" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* GSAP ScrollTrigger Sticky Social Media Icons */}
          <div
            id="hero-social"
            className="hero-social-capsule pointer-events-auto flex items-center gap-4 text-zinc-400 text-lg transition-colors duration-200"
          >
            <a 
              href="https://x.com/lexmanthefirst" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="X profile"
              className="hover:opacity-100 transition-opacity"
            >
              <Icon icon="ri:twitter-x-fill" width="18" />
            </a>
            <a 
              href="https://www.linkedin.com/in/okhitoya-alex/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hover:opacity-100 transition-opacity"
            >
              <Icon icon="ri:linkedin-fill" width="18" />
            </a>
            <a 
              href="https://github.com/lexmanthefirst" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:opacity-100 transition-opacity"
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
            I build fast and resilient systems that helps startups move faster.{' '} Lead full-stack developer working on{' '}
            <a 
              href="https://crosscall.lexman.software" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              Orase AI
            </a>.
          </p>
          <p>
            As a Full-Stack Engineer with 4+ years of experience, I design and build scalable applications where {' '}
            <span className="bg-blue-600 dark:bg-blue-600/90 text-white px-1.5 py-0.5 rounded text-[14px] font-semibold mx-0.5 inline-block">
              I engineer for speed
            </span>{' '}
            through high-performance backend systems, AI-powered products, agentic workflows, and cloud infrastructure.
          </p>
          <p>
            If speed, reliability, and execution matter, I am the guy you need on your team.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href="mailto:hello@lextoya.me"
            className="inline-block px-2.5 py-2 bg-white text-black rounded-lg text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md active:scale-95"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}
