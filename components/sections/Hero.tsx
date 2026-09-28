'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MessageSquare, ChevronDown } from 'lucide-react'
import { sounds } from '@/lib/sound'

const ROTATING_WORDS = [
  'productos que lideran.',
  'apps que enamoran.',
  'software que escala.',
  'soluciones sin vueltas.',
]

interface HeroProps {
  onOpenChat?: () => void
}

export function Hero({ onOpenChat }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const handleScroll = (id: string) => {
    sounds.playClick()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="top"
      className="relative z-20 mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-7xl flex-col items-center justify-between px-5 pt-10 pb-6 md:px-8 md:pt-14 md:pb-8"
    >
      {/* Decorative ambient background mesh */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-rose-900/25 via-rose-950/15 to-transparent blur-[140px]" />

      {/* Main Hero Content - vertically centered with my-auto */}
      <div className="my-auto mx-auto max-w-4xl text-center py-4">
        {/* Dynamic Animated Kinetic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Construimos{' '}
          <span className="block mt-2 min-h-[1.25em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="inline-block bg-gradient-to-r from-rose-400 via-rose-500 to-rose-200 bg-clip-text text-transparent"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl"
        >
          Acompañamos a startups y empresas a diseñar y desarrollar aplicaciones web y móviles modernas, rápidas y hechas a medida.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScroll('contacto')}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(225,29,72,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(225,29,72,0.7)] hover:brightness-110 active:scale-95"
          >
            <span>Iniciar mi proyecto</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <button
            onClick={() => {
              sounds.playClick()
              if (onOpenChat) onOpenChat()
            }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.08] hover:text-white active:scale-95"
          >
            <MessageSquare size={16} className="text-rose-400 transition-transform duration-300 group-hover:scale-110" />
            <span>Chatear con el Asistente</span>
          </button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-center text-xs text-zinc-400 sm:text-sm"
        >
          <div>
            <strong className="block text-2xl sm:text-3xl font-bold text-white">+40</strong>
            <span>Proyectos lanzados</span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          <div>
            <strong className="block text-2xl sm:text-3xl font-bold text-rose-400">100%</strong>
            <span>Entregas a tiempo</span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          <div>
            <strong className="block text-2xl sm:text-3xl font-bold text-white">Directo</strong>
            <span>Con el equipo</span>
          </div>
        </motion.div>
      </div>

      {/* Down indicator anchored at bottom */}
      <div className="w-full pt-4 pb-2 flex justify-center">
        <button
          onClick={() => handleScroll('servicios')}
          aria-label="Ver servicios"
          className="group flex flex-col items-center gap-2 text-xs text-zinc-500 transition hover:text-rose-400"
        >
          <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-500 group-hover:text-rose-400">Descubrí lo que hacemos</span>
          <div className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-zinc-400 backdrop-blur-sm transition group-hover:border-rose-500/40 group-hover:text-white">
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  )
}
