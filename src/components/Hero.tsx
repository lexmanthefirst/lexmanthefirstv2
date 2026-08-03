import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'

export const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        // Calculate scroll progress continuously between 0px and 120px
        const currentScroll = window.scrollY
        const maxScroll = 120
        const progress = Math.min(1, Math.max(0, currentScroll / maxScroll))
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial position check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  // Pixel-continuous interpolated calculations
  // Size: 80px (w-20) down to 40px (w-10)
  const currentSize = 80 - scrollProgress * 40
  // Radius: 16px (rounded-2xl) smoothly interpolating up to 50% (circle)
  const currentRadius = 16 + scrollProgress * (currentSize / 2 - 16)
  // Grayscale: 100% -> 0% (gradually reveals original color as it grounds to top)
  const currentGrayscale = 100 - scrollProgress * 100

  return (
    <section className="pt-24 pb-16 relative" id="hero">
      <div className="max-w-2xl mx-auto px-6">
        {/* Sticky Header Row: Profile Image + Social Icons */}
        <div className="sticky top-5 z-40 flex justify-between items-center mb-8 pointer-events-none py-1">
          {/* Continuous Pixel-Interpolated Hero Avatar */}
          <div
            className="pointer-events-auto overflow-hidden bg-zinc-800 shadow-lg transform-gpu will-change-[width,height,border-radius]"
            style={{
              width: `${currentSize}px`,
              height: `${currentSize}px`,
              borderRadius: `${currentRadius}px`,
              boxShadow: scrollProgress > 0.2 ? `0 10px 30px -5px rgba(0, 0, 0, ${scrollProgress * 0.6})` : undefined,
            }}
          >
            <img 
              src="/DSC_0471.jpg" 
              alt="Alex Okhitoya" 
              className="w-full h-full object-cover contrast-125 hover:grayscale-0 transition-[filter] duration-300"
              style={{
                filter: `grayscale(${currentGrayscale}%) contrast(125%)`,
                borderRadius: `${currentRadius}px`,
              }}
            />
          </div>

          {/* Sticky Social Media Icons (Continuous Interpolated Glass) */}
          {(() => {
            const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light')
            const bg = isLight
              ? `rgba(244, 244, 245, ${scrollProgress * 0.85})`
              : `rgba(9, 9, 11, ${scrollProgress * 0.7})`
            const color = isLight
              ? (scrollProgress > 0.5 ? '#09090b' : '#52525b')
              : (scrollProgress > 0.5 ? '#f4f4f5' : '#a1a1aa')

            return (
              <div
                className="pointer-events-auto flex items-center gap-4 text-lg transition-colors duration-200"
                style={{
                  padding: `${scrollProgress * 6 + 2}px ${scrollProgress * 10 + 0}px`,
                  borderRadius: '9999px',
                  backgroundColor: bg,
                  backdropFilter: scrollProgress > 0.05 ? `blur(${scrollProgress * 12}px)` : 'none',
                  WebkitBackdropFilter: scrollProgress > 0.05 ? `blur(${scrollProgress * 12}px)` : 'none',
                  color: color,
                }}
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
            )
          })()}
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
            <span className="bg-blue-600 dark:bg-blue-600/90 text-white px-1.5 py-0.5 rounded text-[14px] font-semibold mx-0.5 inline-block">
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
