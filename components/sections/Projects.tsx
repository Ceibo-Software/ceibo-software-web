'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, TrendingUp, X, Check } from 'lucide-react'
import { sounds } from '@/lib/sound'
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
    summary: 'Plataforma corporativa de cobros y tesorería multi-moneda.',
    metric: '+$4.2M USD/mes',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    tags: ['Next.js', 'Go', 'Stripe API'],
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
    summary: 'App móvil médica con agendamiento y videoconsultas cifradas.',
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
    summary: 'Centro de control y telemetría de microservicios en vivo.',
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

function ProjectSpotlightCard({
  children,
  onClick,
  accentColor,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  accentColor: string
  className?: string
}) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14]/90 shadow-2xl transition-all duration-300 hover:border-white/25 ${className}`}
    >
      {/* Dynamic cursor-following spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, ${accentColor}28, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<MinimalProject | null>(null)
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

  const pampa = PROJECTS[0]
  const marea = PROJECTS[1]
  const nexo = PROJECTS[2]

  return (
    <section id="proyectos" className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32">
      {/* Minimal Header */}
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Proyectos
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Casos destacados desarrollados para clientes reales.
        </p>
      </Reveal>

      {/* Bento Minimalist Showcase */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* HERO PROJECT: Pampa Finance (12 cols) */}
        <Reveal delay={0.08} className="md:col-span-12">
          <ProjectSpotlightCard
            onClick={() => {
              sounds.playClick()
              setActiveProject(pampa)
            }}
            accentColor="#f43f5e"
            className="p-7 sm:p-10 hover:border-rose-500/40"
          >
            {/* Ambient subtle glow */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35"
              style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }}
            />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Text column - Minimal & concise */}
              <div className="space-y-4 lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 text-xs font-semibold text-rose-300">
                    {pampa.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">{pampa.metric}</span>
                </div>

                <h3 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
                  {pampa.title}
                </h3>

                <p className="text-sm text-zinc-400 sm:text-base">
                  {pampa.summary}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {pampa.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 transition-transform duration-200 group-hover:translate-x-1">
                    <span>Ver proyecto</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>

              {/* Visual column - Sleek dark glass interface */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#13131d] to-[#0a0a0f] p-6 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-zinc-400">
                    <span className="font-mono text-[11px] text-zinc-300">Pampa Gateway</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-center">
                    {/* Glass card */}
                    <div className="relative aspect-[1.58/1] overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-4 shadow-xl">
                      <div className="pointer-events-none absolute -right-6 -bottom-6 size-24 rounded-full bg-rose-500/20 blur-xl" />
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black tracking-widest text-white">PAMPA</span>
                          <span className="font-mono text-[9px] text-zinc-400">CORP</span>
                        </div>
                        <div className="h-5 w-7 rounded bg-amber-400/80 border border-amber-300/40" />
                        <div className="font-mono text-[11px] text-zinc-400">•••• 8492</div>
                      </div>
                    </div>

                    {/* Chart preview */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Volumen mensual</span>
                        <span className="flex items-center gap-1 font-bold text-emerald-400">
                          <TrendingUp size={12} /> +28%
                        </span>
                      </div>
                      <svg viewBox="0 0 100 32" className="h-10 w-full text-rose-500" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0,26 Q 20,20 40,22 T 70,12 T 100,6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 0,26 Q 20,20 40,22 T 70,12 T 100,6 L 100,32 L 0,32 Z"
                          fill="url(#pGrad)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ProjectSpotlightCard>
        </Reveal>

        {/* COMPANION 1: Marea Health (6 cols) */}
        <Reveal delay={0.14} className="md:col-span-6">
          <ProjectSpotlightCard
            onClick={() => {
              sounds.playClick()
              setActiveProject(marea)
            }}
            accentColor="#06b6d4"
            className="flex h-full flex-col justify-between p-7 sm:p-8 hover:border-cyan-500/40"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl opacity-15 transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300">
                    {marea.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">{marea.metric}</span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  {marea.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {marea.summary}
                </p>
              </div>

              {/* Visual Minimal Mockup */}
              <div className="my-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#101720] to-[#0a0e14] p-5 shadow-inner">
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Consulta Médica</span>
                    <span className="text-[10px] text-amber-300 font-bold">★ 4.9</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-xs text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                      Videollamada lista
                    </span>
                    <div className="flex items-end gap-1 h-3">
                      <span className="w-1 h-2 rounded bg-cyan-400 animate-pulse" />
                      <span className="w-1 h-3 rounded bg-cyan-400" />
                      <span className="w-1 h-1 rounded bg-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-2">
                  {marea.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 transition-transform duration-200 group-hover:translate-x-1">
                  <span>Ver proyecto</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </ProjectSpotlightCard>
        </Reveal>

        {/* COMPANION 2: Nexo Ops (6 cols) */}
        <Reveal delay={0.18} className="md:col-span-6">
          <ProjectSpotlightCard
            onClick={() => {
              sounds.playClick()
              setActiveProject(nexo)
            }}
            accentColor="#f59e0b"
            className="flex h-full flex-col justify-between p-7 sm:p-8 hover:border-amber-500/40"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl opacity-15 transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-300">
                    {nexo.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">{nexo.metric}</span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                  {nexo.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {nexo.summary}
                </p>
              </div>

              {/* Visual Minimal Mockup */}
              <div className="my-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#18150f] to-[#0c0a06] p-5 shadow-inner">
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      us-east-1
                    </span>
                    <span className="text-emerald-400">18ms</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      sa-east-1
                    </span>
                    <span className="text-emerald-400">24ms</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full w-[93%] rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-2">
                  {nexo.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[11px] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 transition-transform duration-200 group-hover:translate-x-1">
                  <span>Ver proyecto</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </ProjectSpotlightCard>
        </Reveal>
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
                    sounds.playClick()
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
                        sounds.playClick()
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
                          sounds.playClick()
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
