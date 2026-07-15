import React from 'react'
import { Icon } from '@iconify/react'

export const TechSpecs: React.FC = () => {
  return (
    <section id="techspecs" className="py-32 relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        {/* Left: Tech Accordion */}
        <div className="space-y-8 reveal-on-scroll visible">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-center md:text-left">
            I ENGINEER<br />FOR <span className="text-lime-400">SPEED</span>.
          </h2>
          
          <div className="border-t border-white/10">
            <details className="group py-6 cursor-pointer">
              <summary className="flex justify-between items-center text-lg font-medium list-none">
                <span>Message Brokering &amp; Streams</span>
                <Icon icon="solar:add-circle-linear" className="text-zinc-500 group-open:rotate-45 transition-transform" />
              </summary>
              <p className="text-zinc-400 font-light mt-4 text-sm leading-relaxed">
                Setting up durable, low-latency queues and event-driven patterns with NATS, Apache Kafka, and RabbitMQ. Optimizing for high throughput and consistent reliability.
              </p>
            </details>
            <div className="border-b border-white/10"></div>
            
            <details className="group py-6 cursor-pointer">
              <summary className="flex justify-between items-center text-lg font-medium list-none">
                <span>AI Engineering &amp; LLMOps</span>
                <Icon icon="solar:add-circle-linear" className="text-zinc-500 group-open:rotate-45 transition-transform" />
              </summary>
              <p className="text-zinc-400 font-light mt-4 text-sm leading-relaxed">
                Orchestrating LLM reasoning pipelines, designing multi-agent systems, structuring Pydantic schema validation boundaries, and tracing execution chains with Langfuse.
              </p>
            </details>
            <div className="border-b border-white/10"></div>
            
            <details className="group py-6 cursor-pointer" open>
              <summary className="flex justify-between items-center text-lg font-medium list-none">
                <span>Serverless &amp; Edge Scaling</span>
                <Icon icon="solar:add-circle-linear" className="text-zinc-500 group-open:rotate-45 transition-transform" />
              </summary>
              <p className="text-zinc-400 font-light mt-4 text-sm leading-relaxed">
                Running distributed workloads globally using Cloudflare Workers, Edge storage, Page builds, and local caching patterns to ensure sub-100ms request times.
              </p>
            </details>
            <div className="border-b border-white/10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
