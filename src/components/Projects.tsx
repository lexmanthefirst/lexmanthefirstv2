import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export const Projects: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const projects = [
    {
      name: 'crosstalk AI',
      desc: 'Real-time conversational AI call agent integrating Asterisk VoIP, FastAPI, NATS, and vector databases.',
      link: 'https://github.com/lexmanthefirst',
      videoUrl: '/crosstalk_demo.mp4',
      image: '/crosstalk_thumb.png',
      hasVideoDemo: true
    },
    {
      name: 'MIRA AI',
      desc: 'Clinical provider assistant using multi-agent systems with real-time SSE thought streams.',
      link: 'https://github.com/gemini-hack/backend',
      image: '/mira_thumb.png',
      hasVideoDemo: false
    }
  ]

  return (
    <section id="projects" className="py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-sm font-semibold text-white mb-8">
          Projects
        </h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-5 items-start group">
              {/* Thumbnail Container: Image */}
              <div 
                onClick={(e) => {
                  if (project.hasVideoDemo) {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsVideoModalOpen(true)
                  }
                }}
                className={`w-full sm:w-36 h-24 rounded-xl shrink-0 bg-zinc-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-md ${
                  project.hasVideoDemo ? 'cursor-pointer' : ''
                } transition-colors relative group/thumb`}
              >
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
                {project.hasVideoDemo && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-lg">
                      <Icon icon="solar:play-bold" width="16" className="text-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Details (Text and Link): Opens external link */}
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="space-y-1.5 pt-1 flex-1 group/link"
              >
                <h3 className="text-sm font-semibold text-white group-hover/link:underline underline-offset-4 decoration-zinc-500 flex items-center gap-2">
                  <span>{project.name}</span>
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-normal">
                  {project.desc}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Borderless Pure Video GIF-Style Modal Overlay */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src="/crosstalk_demo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto rounded-2xl object-cover block shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
