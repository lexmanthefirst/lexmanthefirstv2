import React from 'react'

export const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2026 – Present',
      role: 'Lead Full-Stack Developer at crosstalk AI',
      desc: 'Architecting high-throughput VoIP call agents and LLM routing services. Integrated Asterisk, Telnyx, Twilio, and NATS event streams with a Vector Database and dedicated telemetry pipelines to ensure robust observability.'
    },
    {
      period: '2025 – 2026',
      role: 'Backend Developer at Emerj LLC',
      desc: 'Engineered scalable backend microservices, robust API integrations, and database architectures powering core client solutions.'
    },
    {
      period: 'Volunteer',
      role: 'Frontend Developer at Verboheit Mathematics League',
      desc: 'Volunteered to build interactive web interfaces, competition platforms, and responsive portal experiences for mathematics league participants.'
    }
  ]

  return (
    <section id="experience" className="py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-sm font-semibold text-white mb-10">
          Work Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
              {/* Period / Timeline info */}
              <div className="md:col-span-3 text-xs text-zinc-500 font-medium tracking-wide">
                {exp.period}
              </div>

              {/* Role & Description */}
              <div className="md:col-span-9 space-y-2">
                <h3 className="text-sm font-semibold text-white">
                  {exp.role}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-normal">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
