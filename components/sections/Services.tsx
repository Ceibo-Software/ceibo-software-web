'use client'

import { Code2, Smartphone, Sparkles, Bot } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'
import { Reveal } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/Magnetic'

const SERVICES_DATA = [
  {
    icon: Code2,
    title: 'Software a Medida',
    description: 'Plataformas web y sistemas diseñados para automatizar los procesos de tu negocio y escalar tus operaciones.',
  },
  {
    icon: Smartphone,
    title: 'Apps Móviles',
    description: 'Aplicaciones nativas e intuitivas para iOS y Android que tus clientes disfrutarán usar todos los días.',
  },
  {
    icon: Sparkles,
    title: 'Diseño de Producto UI/UX',
    description: 'Interfaces modernas y estéticas pensadas para convertir visitas en clientes y mejorar la retención.',
  },
  {
    icon: Bot,
    title: 'Automatización & IA',
    description: 'Chatbots inteligentes y conexiones automáticas entre tus sistemas para ahorrar horas de trabajo.',
  },
]

export function Services() {
  return (
    <section id="servicios" className="relative z-20 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
      {/* Scroll Reveal Header */}
      <Reveal className="text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
          Servicios
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Lo que hacemos
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Creamos productos digitales modernos y funcionales, de la idea al lanzamiento.
        </p>
      </Reveal>

      {/* Staggered Scroll Reveal Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES_DATA.map((service, idx) => {
          const Icon = service.icon
          return (
            <Reveal key={idx} delay={idx * 0.08}>
              <TiltCard
                className="group relative h-full p-6 flex flex-col justify-between transition-all duration-300 hover:border-rose-500/40"
                intensity={8}
                spotlightColor="rgba(244, 63, 94, 0.18)"
              >
                <div>
                  <Magnetic strength={0.4}>
                    <div className="grid size-12 place-items-center rounded-2xl border border-rose-500/20 bg-rose-950/25 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-all duration-300 group-hover:border-rose-500/50 group-hover:bg-rose-950/40 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                      <Icon size={22} />
                    </div>
                  </Magnetic>

                  <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-200 group-hover:text-rose-100">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
