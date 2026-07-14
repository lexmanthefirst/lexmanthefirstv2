import React, { useEffect, useState } from 'react'

export const Preloader: React.FC = () => {
  const [count, setCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    let start = 0
    const end = 100
    const duration = 1200 // 1.2s duration for smooth quick loading
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing curve (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      const currentCount = Math.round(start + easeProgress * (end - start))
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setIsFinished(true)
        }, 200)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-zinc-950 flex flex-col justify-center items-center transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isFinished ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center select-none">
        <div className="relative">
          {/* Large percentage counting display with a custom high-end lime text gradient */}
          <div className="text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-lime-400/20 to-lime-400/5 font-sans">
            {count}%
          </div>
        </div>
        
        {/* Loading Progress Bar */}
        <div className="w-48 h-[2px] bg-white/5 overflow-hidden rounded-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-400 to-lime-200 origin-left transition-all duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
        
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
          READY IN A BIT...
        </span>
      </div>
    </div>
  )
}
