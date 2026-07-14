import React from 'react'
import { Icon } from '@iconify/react'

export const Projects: React.FC = () => {
  const projects = [
    {
      name: 'crosstalk AI',
      category: 'VoIP & AI Backend Architecture',
      desc: 'Real-time conversational AI call agent integrating Asterisk VoIP, FastAPI, NATS, and vector databases with dedicated tracing.',
      tech: ['FastAPI', 'Asterisk', 'NATS', 'Vector DB', 'Observability Infra', 'Python'],
      link: 'https://github.com/lexmanthefirst'
    },
    {
      name: 'MIRA AI',
      category: 'Multi-Agent HealthTech Architecture',
      desc: 'Clinical provider assistant using a Team Multi-Agent Collaboration (T-MAC) framework with real-time SSE thought streams.',
      tech: ['FastAPI', 'Google Gemini', 'T-MAC Agents', 'Redis Pub/Sub', 'Celery', 'Docker'],
      link: 'https://github.com/gemini-hack/backend'
    },
    {
      name: 'AEREAS',
      category: 'Academic Essay Review Agentic System',
      desc: 'Agentic feedback and revision platform for academic writing, leveraging the Argrewrite and ASAP corpus datasets.',
      tech: ['FastAPI', 'Argrewrite', 'ASAP Corpus', 'Google Colab', 'uv', 'Alembic', 'Python'],
      link: 'https://github.com/lexmanthefirst'
    }
  ]

  return (
    <section id="projects" className="py-24 border-y border-white/5 bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 reveal-on-scroll visible">
          <h2 className="text-3xl font-medium tracking-tight">
            FEATURED <span className="text-zinc-500">PROJECTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lime-400 text-xs font-semibold uppercase tracking-wider block">
                    {project.category}
                  </span>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-500 hover:text-white transition-colors"
                      aria-label="View source repository"
                    >
                      <Icon icon="ri:github-fill" width="18" />
                    </a>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{project.name}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{project.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] text-zinc-400 border border-white/10 px-2.5 py-1 bg-white/5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
