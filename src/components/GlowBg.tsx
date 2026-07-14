import React from 'react'

export const GlowBg: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-lime-400/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" 
        style={{ animationDelay: '2s' }}
      ></div>
    </div>
  )
}
