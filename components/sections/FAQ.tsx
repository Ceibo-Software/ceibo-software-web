'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { CEIBO_BRAND } from '@/lib/data'

const FAQ_ITEMS = [
  {
    question: '¿Qué tipo de proyectos desarrollan?',
    answer:
      'Plataformas web y sistemas a medida, aplicaciones móviles para iOS y Android, diseño de producto UI/UX y automatizaciones con inteligencia artificial, como chatbots de atención y ventas conectados a WhatsApp o a tu CRM.',
  },
  {
    question: '¿Pueden ayudarme si solo tengo una idea?',
    answer:
      'Sí. Te acompañamos de la idea al lanzamiento: definimos juntos qué necesitás, diseñamos la experiencia, desarrollamos el producto y lo dejamos funcionando en la nube.',
  },
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer:
      'Depende del alcance: no es lo mismo una web institucional que una app con pagos y panel de administración. Contanos tu idea y te enviamos un plan claro con presupuesto, sin compromiso.',
  },
  {
    question: '¿Cuánto tarda en estar listo?',
    answer:
      'Los plazos se definen en el plan inicial según el alcance de cada proyecto, y los cumplimos: entregamos el 100% de nuestros proyectos a tiempo.',
  },
  {
    question: '¿Con quién voy a hablar durante el proyecto?',
    answer:
      'Directamente con el equipo que diseña y desarrolla tu producto, sin intermediarios. Así las decisiones se toman rápido y siempre sabés en qué punto está el trabajo.',
  },
  {
    question: '¿Trabajan con clientes fuera de Argentina?',
    answer:
      'Sí. Estamos en Buenos Aires (UTC-3) y trabajamos de forma remota con startups y empresas de cualquier país.',
  },
  {
    question: '¿Qué pasa después del lanzamiento?',
    answer:
      'Podemos encargarnos de la infraestructura en la nube para que tu producto funcione de forma estable y seguir sumando mejoras a medida que tu negocio crece.',
  },
  {
    question: '¿Cómo empezamos?',
    answer:
      `Escribinos desde el formulario o por email a ${CEIBO_BRAND.email} contándonos tu idea, tus objetivos y la fecha que tenés en mente. Te respondemos con un plan en menos de 24 horas.`,
  },
]

function EmailLink() {
  return (
    <a
      href={`mailto:${CEIBO_BRAND.email}`}
      className="font-medium text-rose-400 underline decoration-rose-400/40 underline-offset-4 transition hover:text-rose-300 hover:decoration-rose-300"
    >
      {CEIBO_BRAND.email}
    </a>
  )
}

function withEmailLink(text: string) {
  const parts = text.split(CEIBO_BRAND.email)
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<EmailLink key={i} />, part]))
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section
      id="preguntas"
      className="relative z-20 mx-auto w-full max-w-4xl overflow-hidden px-5 py-20 md:px-8 md:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
          Preguntas frecuentes
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Lo que nos suelen preguntar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Si tu duda no está acá, escribinos a <EmailLink /> y te respondemos en menos de 24
          horas.
        </p>
      </Reveal>

      <div className="mt-12 space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx
          const buttonId = `${baseId}-q-${idx}`
          const panelId = `${baseId}-a-${idx}`

          return (
            <Reveal key={item.question} delay={idx * 0.04}>
              <div
                className={`rounded-2xl border bg-[#0c0c12]/70 backdrop-blur-xl transition-colors duration-200 ${
                  isOpen ? 'border-rose-500/40' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="text-sm font-semibold text-white md:text-base">
                      {item.question}
                    </span>
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 border-rose-500/50 bg-rose-950/40 text-rose-400'
                          : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      <Plus size={14} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-300 md:px-6">
                        {withEmailLink(item.answer)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
