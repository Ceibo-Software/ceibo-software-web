'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, TrendingUp, X, Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/Magnetic'

interface MinimalProject {
  id: string
  title: string
  category: string
  summary: string
  metric: string
  accentColor: string
  glowColor: string
  tags: string[]
  details: {
    description: string
    specs: string[]
    stack: string[]
  }
}

const PROJECTS: MinimalProject[] = [
  {
    id: 'pampa-finance',
    title: 'Pampa Finance',
    category: 'Fintech & Pagos',
    summary: 'Plataforma corporativa de cobros y tesorería multi-moneda de alta concurrencia.',
    metric: '+$4.2M USD/mes',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    tags: ['Next.js 16', 'Go', 'Stripe API'],
    details: {
      description: 'Motor transaccional con conciliación bancaria automatizada en tiempo real y arquitectura de microservicios de alta concurrencia.',
      specs: [
        'Conciliación bancaria en <50ms',
        'Cifrado AES-256 de extremo a extremo',
        '99.98% de disponibilidad certificada',
      ],
      stack: ['Next.js 16', 'Go', 'PostgreSQL', 'Redis', 'Stripe API'],
    },
  },
  {
    id: 'marea-health',
    title: 'Marea Health',
    category: 'Salud Digital',
    summary: 'App móvil médica con agendamiento sincrónico y videoconsultas cifradas.',
    metric: '15,000+ pacientes',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    tags: ['React Native', 'WebRTC', 'FastAPI'],
    details: {
      description: 'Ecosistema móvil diseñado para eliminar esperas y optimizar la gestión de consultas presenciales y remotas.',
      specs: [
        'Videollamadas peer-to-peer con WebRTC',
        'Recordatorios sincronizados vía WhatsApp',
        'Historias clínicas con cifrado médico HIPAA',
      ],
      stack: ['React Native', 'WebRTC', 'FastAPI', 'AWS', 'WhatsApp API'],
    },
  },
  {
    id: 'nexo-ops',
    title: 'Nexo Ops',
    category: 'Cloud & SaaS',
    summary: 'Centro de control y telemetría de microservicios e infraestructura en vivo.',
    metric: '99.99% Uptime',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    tags: ['Kubernetes', 'Prometheus', 'TypeScript'],
    details: {
      description: 'Panel operativo en tiempo real para sincronización de equipos de ingeniería y monitoreo continuo de infraestructura.',
      specs: [
        'Streaming de eventos vía WebSockets',
        'Autoescalado dinámico multi-región',
        'Reducción del 60% en tiempos de gestión',
      ],
      stack: ['TypeScript', 'Kubernetes', 'Prometheus', 'GraphQL', 'Tailwind'],
    },
  },
]

export function Projects() {
  const [activeProject, setActiveProject] = useState<MinimalProject | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null)
    }
    if (activeProject) {
      window.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-modal-open', 'true')
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [activeProject])

  return (
    <section id="proyectos" className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden px-5 py-20 md:px-8 md:py-28">
      {/* Header */}
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
          Casos Destacados · Frutos de Ceibo
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Proyectos que dan frutos
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
          Soluciones de software y arquitectura digital nacidas de nuestra raíz. Pasa el cursor o toca cada flor para explorar la ficha técnica completa.
        </p>
      </Reveal>

      {/* DESKTOP: Canopy Branch Rail (Rama orgánica interactiva de la que cuelgan los proyectos) */}
      <div className="relative mt-12 hidden md:block w-full">
        <svg
          viewBox="0 0 1200 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 overflow-visible"
        >
          <defs>
            <linearGradient id="branchWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#181518" />
              <stop offset="50%" stopColor="#2b242c" />
              <stop offset="100%" stopColor="#181518" />
            </linearGradient>
            <linearGradient id="sapGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(244,63,94,0.15)" />
              <stop offset="50%" stopColor="rgba(244,63,94,0.85)" />
              <stop offset="100%" stopColor="rgba(244,63,94,0.15)" />
            </linearGradient>
            <filter id="blossomGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Rama horizontal arqueada */}
          <path
            d="M 20 40 Q 300 20 600 38 T 1180 32"
            stroke="url(#branchWood)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Veta luminosa de savia */}
          <path
            d="M 20 40 Q 300 20 600 38 T 1180 32"
            stroke="url(#sapGlow)"
            strokeWidth="2.5"
            strokeDasharray="8 14"
            className="animate-pulse"
          />

          {/* Brotes botánicos de hojas en los extremos */}
          <g transform="translate(45, 30) rotate(-25)">
            <path d="M 0 0 C 8 -12 20 -10 24 0 C 18 10 6 12 0 0 Z" fill="#15803d" opacity="0.65" />
          </g>
          <g transform="translate(1140, 26) rotate(35)">
            <path d="M 0 0 C 8 -12 20 -10 24 0 C 18 10 6 12 0 0 Z" fill="#15803d" opacity="0.65" />
          </g>

          {/* 3 Nodos y tallos descendentes hacia cada tarjeta (200, 600, 1000) */}
          {[
            { x: 200, y: 32, idx: 0 },
            { x: 600, y: 38, idx: 1 },
            { x: 1000, y: 33, idx: 2 },
          ].map(({ x, y, idx }) => {
            const isHovered = hoveredIdx === idx
            return (
              <g key={idx}>
                {/* Nudo de corteza */}
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#0d0d14"
                  stroke={isHovered ? '#f43f5e' : 'rgba(255,255,255,0.25)'}
                  strokeWidth="2"
                  filter={isHovered ? 'url(#blossomGlow)' : undefined}
                  className="transition-colors duration-300"
                />
                {/* Hojita viva en el nudo */}
                <path
                  d={`M ${x + 4} ${y - 2} C ${x + 12} ${y - 10} ${x + 18} ${y - 6} ${x + 14} ${y + 2} Z`}
                  fill="#e11d48"
                  opacity={isHovered ? 0.95 : 0.4}
                  className="transition-opacity duration-300"
                />

                {/* Tallo flexible que sostiene la tarjeta */}
                <path
                  d={`M ${x} ${y} Q ${x + (idx === 0 ? -6 : idx === 2 ? 6 : 0)} 62 ${x} 90`}
                  stroke={isHovered ? '#f43f5e' : 'rgba(244,63,94,0.35)'}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  fill="none"
                  filter={isHovered ? 'url(#blossomGlow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Pulso de savia viva deslizándose por el tallo */}
                <circle
                  cx={x}
                  cy={y + 35}
                  r={isHovered ? '3.5' : '2'}
                  fill="#f43f5e"
                  filter="url(#blossomGlow)"
                  className="animate-pulse"
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* 3 HANGING BLOSSOM CARDS (Grilla compacta de 3 columnas en PC, adaptable en celular) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mt-6 md:-mt-2">
        {PROJECTS.map((project, idx) => {
          const isHovered = hoveredIdx === idx
          return (
            <Reveal key={project.id} delay={idx * 0.1}>
              <div
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tallo móvil visible solo en celular */}
                <div className="flex md:hidden flex-col items-center mb-1">
                  <div className="h-6 w-0.5 bg-gradient-to-b from-rose-500/20 via-rose-500/60 to-rose-500" />
                  <div className="size-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                </div>

                {/* Conector floral superior */}
                <div className="relative -mb-1.5 z-30 flex items-center justify-center">
                  <div
                    className={`size-2.5 rounded-full border transition-all duration-300 ${
                      isHovered
                        ? 'border-rose-400 bg-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.9)] scale-125'
                        : 'border-rose-500/40 bg-[#14141c] shadow-[0_0_6px_rgba(244,63,94,0.3)]'
                    }`}
                  />
                </div>

                {/* Tarjeta suspendida con micro-física pendular en hover */}
                <motion.div
                  whileHover={{
                    rotate: [0, -1.6, 1.4, -0.6, 0],
                    y: 4,
                    transition: { duration: 0.7, ease: 'easeInOut' },
                  }}
                  onClick={() => {
                    setActiveProject(project)
                  }}
                  className={`group relative w-full cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-b from-[#101018] via-[#0c0c13] to-[#09090e] p-6 pt-7 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? 'border-rose-500/60 shadow-[0_16px_40px_-10px_rgba(244,63,94,0.35)] -translate-y-1'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                  style={{ transformOrigin: 'top center' }}
                >
                  {/* Resplandor ambiental de néctar interior */}
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 size-44 rounded-full blur-2xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-30' : 'opacity-10'
                    }`}
                    style={{ background: project.accentColor }}
                  />

                  {/* Top content */}
                  <div>
                    {/* Header de tarjeta: Categoría y estado */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-rose-500/25 bg-rose-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-rose-300">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Producción
                      </span>
                    </div>

                    {/* Título de proyecto */}
                    <h3 className="mt-4 text-2xl font-black tracking-tight text-white transition-colors duration-200 group-hover:text-rose-100">
                      {project.title}
                    </h3>

                    {/* Métrica clave destacada */}
                    <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
                      <TrendingUp size={13} className="text-rose-400" />
                      <span className="font-mono text-xs font-bold text-white">
                        {project.metric}
                      </span>
                    </div>

                    {/* Resumen conciso */}
                    <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-300 line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Stack tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-zinc-400 transition-colors group-hover:text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-rose-300">
                      <span>Ver ficha técnica</span>
                      <ArrowUpRight size={13} />
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      Ceibo #{idx + 1}
                    </span>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* MINIMAL PROJECT MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeProject && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setActiveProject(null)
                  }}
                  className="fixed inset-0 bg-black/85 backdrop-blur-xl"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                  className="relative z-10 w-full max-w-lg rounded-3xl border border-white/15 bg-[#0e0e16] p-6 shadow-2xl sm:p-8"
                >
                  <Magnetic strength={0.35} className="absolute right-5 top-5">
                    <button
                      onClick={() => {
                        setActiveProject(null)
                      }}
                      className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:border-white/20 hover:text-white cursor-pointer"
                      aria-label="Cerrar"
                    >
                      <X size={16} />
                    </button>
                  </Magnetic>

                  <span className="text-xs font-semibold text-rose-400">
                    {activeProject.category}
                  </span>
                  <h3 className="mt-1 text-2xl font-black text-white">
                    {activeProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    {activeProject.details.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-5 space-y-2">
                    {activeProject.details.specs.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check size={14} className="text-rose-500 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {activeProject.details.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
                    <Magnetic strength={0.25}>
                      <a
                        href="#contacto"
                        onClick={() => {
                          setActiveProject(null)
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-rose-500"
                      >
                        <span>Consultar por un proyecto similar</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
