import React from 'react'
import { Icon } from '@iconify/react'

export const Experience: React.FC = () => {
  const experiences = [
    {
      role: 'Lead Backend & AI Engineer',
      company: 'crosstalk AI',
      duration: 'May 2026',
      desc: 'Architecting high-throughput VoIP call agents and LLM routing services. Integrated Asterisk, FastAPI, and NATS event streams with Vector Databases and dedicated telemetry pipelines to ensure robust observability.',
      highlights: [
        'Designed real-time audio routing pipelines handling concurrent active channels.',
        'Established system-wide tracing and correlation IDs for request execution auditing.',
        'Optimized latency bounds using distributed broker routing schemes.'
      ]
    },
    {
      role: 'AI Systems Developer',
      company: 'MIRA AI',
      duration: 'Jan 2026',
      desc: 'Developed a Team Multi-Agent Collaboration (T-MAC) architecture automating chronic care follow-ups. Structured specialized worker agents (HIV, Follow-up, Clinic Critic) with streaming thought logs.',
      highlights: [
        'Implemented real-time SSE thought streams backed by Redis Pub/Sub events.',
        'Programmed clinical logic and Pydantic validation boundaries with Google Gemini.',
        'Added 48-hour action cooldown features to ensure message idempotency.'
      ]
    },
    {
      role: 'Core AI Platform Developer',
      company: 'AEREAS',
      duration: 'May 2026',
      desc: 'Built the academic writing evaluation agentic system. Designed grading pipelines using rule-based algorithms combined with LLM assessment modules trained on industry standard datasets.',
      highlights: [
        'Trained and evaluated revision pipelines on the Argrewrite and ASAP corpus datasets.',
        'Prototyped model evaluation workflows using Google Colab notebooks.',
        'Created sentence-level diff tracking algorithms to display edits transparently.'
      ]
    }
  ]

  return (
    <section id="experience" className="py-32 relative z-10 overflow-hidden border-t border-white/5 bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16">
          WORK <span className="text-lime-400">EXPERIENCE</span>.
        </h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-white/10">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-stretch gap-8 relative reveal-on-scroll visible ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-lime-400 rounded-full -translate-x-1.5 mt-6 z-20 shadow-[0_0_10px_#D4FF3E]"></div>

              {/* Card Container */}
              <div className="w-full md:w-[46%] ml-8 md:ml-0">
                <div className="glass-panel p-8 group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                      <span className="text-lime-400 text-sm font-medium">{exp.company}</span>
                    </div>
                    <span className="text-zinc-500 text-xs tracking-wider border border-white/5 px-3 py-1 bg-white/5 rounded-full mt-1">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    {exp.desc}
                  </p>

                  <ul className="space-y-3 text-xs text-zinc-500 font-light border-t border-white/5 pt-4">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <Icon icon="solar:double-alt-arrow-right-linear" className="text-lime-400 mt-0.5 shrink-0" width="14" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Empty spacing item for desktop grid layout */}
              <div className="hidden md:block w-[46%]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
