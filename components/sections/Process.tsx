'use client'

import { motion } from 'framer-motion'
import { Compass, Code2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react'
import { sounds } from '@/lib/sound'

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'Descubrimiento & Diseño de Experiencia',
    tag: 'Fase de Concepto',
    description:
      'Nos sentamos contigo para entender el corazón de tu negocio y a tus clientes. Definimos la estrategia, creamos el mapa de navegación y diseñamos interfaces visualmente impactantes en Figma.',
    deliverable: 'Prototipo interactivo y alcance cerrado sin sorpresas',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Desarrollo Ágil con Avances Semanales',
    tag: 'Fase de Construcción',
    description:
      'Construimos tu plataforma o app con las tecnologías más modernas y confiables. Cada viernes tienes acceso a una demo funcional para probar los avances con tus propios ojos y dar feedback.',
    deliverable: 'Entregas visibles cada 7 días y comunicación directa por Slack/WhatsApp',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Lanzamiento a Producción & Soporte',
    tag: 'Fase de Escala',
    description:
      'Desplegamos tu sistema en la nube con altos estándares de seguridad y velocidad. No te dejamos solo: te acompañamos en las métricas de uso y en las futuras mejoras que tu negocio pida.',
    deliverable: 'Puesta en marcha garantizada y acompañamiento técnico continuo',
  },
]

export function Process() {
  return (
    <section id="proceso" className="relative z-20 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
          Cómo Trabajamos
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
          De la idea a la realidad en 3 pasos simples.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Sin procesos burocráticos ni tecnicismos confusos. Un camino transparente y probado para lanzar tu producto con éxito.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, idx) => {
          const Icon = step.icon
          return (
            <div
              key={step.number}
              onMouseEnter={() => sounds.playClick()}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d0d14]/70 p-8 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:bg-rose-950/10 hover:shadow-[0_0_30px_rgba(225,29,72,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl border border-rose-500/30 bg-rose-950/30 text-rose-400 transition group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-2xl font-bold text-zinc-700 transition group-hover:text-rose-500/50">
                    {step.number}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                    {step.tag}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-rose-200">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/5 pt-4">
                <div className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 size={15} className="mt-0.5 text-emerald-400 shrink-0" />
                  <span className="font-medium text-zinc-300">{step.deliverable}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
