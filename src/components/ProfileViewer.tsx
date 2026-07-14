import React, { useRef, useEffect } from 'react'

export const ProfileViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return
      
      const xAxis = (window.innerWidth / 2 - e.clientX) / 25
      const yAxis = (window.innerHeight / 2 - e.clientY) / 25
      
      containerRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
      imageRef.current.style.transform = `translateZ(50px) translateX(${xAxis * -0.5}px)`
    }

    const handleMouseLeave = () => {
      if (!containerRef.current || !imageRef.current) return
      containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
      imageRef.current.style.transform = 'translateZ(0px)'
    }

    window.addEventListener('mousemove', handleMouseMove)
    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      id="profile-wrap"
      className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 h-[50vh] lg:h-auto group cursor-crosshair sneaker-container transition-transform duration-100 ease-out"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-lime-400/20 to-transparent blur-[80px] rounded-full opacity-60"></div>
      
      {/* The Profile Image */}
      <img 
        ref={imageRef}
        id="profile-img"
        src="/DSC_0471.jpg" 
        alt="Alex Okhitoya (Lexman)"
        loading='eager' 
        className="relative w-[90%] max-w-[400px] aspect-square object-cover border border-white/10 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      />
      
      {/* Highlight Sweep Overlay */}
      <div className="highlight-sweep z-30 opacity-30"></div>
    </div>
  )
}
