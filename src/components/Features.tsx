import React from 'react'
import { Icon } from '@iconify/react'

export const Features: React.FC = () => {
  const cards = [
    {
      icon: 'solar:server-square-linear',
      title: 'Event-Driven Systems',
      desc: 'Architecting high-performance messaging pipelines and pub/sub message brokers using NATS, Kafka, and RabbitMQ.'
    },
    {
      icon: 'solar:eye-linear',
      title: 'AI & LLMOps Tracing',
      desc: 'Integrating observability with Langfuse to trace LLM calls, monitor token usage, evaluate outputs, and debug execution chains.'
    },
    {
      icon: 'solar:database-linear',
      title: 'Backend Engineering',
      desc: 'Designing secure REST/GraphQL API boundaries, transactional database layouts, and microservices geared for heavy traffic load.'
    },
    {
      icon: 'solar:bolt-linear',
      title: 'Edge Performance',
      desc: 'Deploying edge-native microservices with Cloudflare Pages/Workers, leveraging local caches and serverless execution.'
    }
  ]

  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-zinc-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-lime-400 mb-6">
                <Icon icon={card.icon} width="24" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{card.title}</h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
