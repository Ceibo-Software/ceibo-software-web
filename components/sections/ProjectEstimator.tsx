'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Check, ArrowRight, Sparkles, Clock, Users, ShieldAlert } from 'lucide-react'
import { ESTIMATOR_OPTIONS } from '@/lib/data'
import { sounds } from '@/lib/sound'

interface ProjectEstimatorProps {
  onScopeSelected?: (summary: string) => void
}

export function ProjectEstimator({ onScopeSelected }: ProjectEstimatorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web-app')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth-rbac', 'payments'])
  const [selectedSpeed, setSelectedSpeed] = useState<string>('normal')

  const toggleFeature = (id: string) => {
    sounds.playSwitch()
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  // Calculate estimated weeks
  const platformOption = ESTIMATOR_OPTIONS.platforms.find((p) => p.id === selectedPlatform)
  const baseWeeks = platformOption ? platformOption.weeks : 4

  const featureWeeks = selectedFeatures.reduce((acc, fId) => {
    const f = ESTIMATOR_OPTIONS.features.find((item) => item.id === fId)
    return acc + (f ? f.weeks : 0)
  }, 0)

  const speedOption = ESTIMATOR_OPTIONS.timeline.find((s) => s.id === selectedSpeed)
  const speedModifier = speedOption ? speedOption.weeks : 0

  const totalWeeks = Math.max(3, Math.round(baseWeeks + featureWeeks + speedModifier))

  // Estimate team
  const teamComposition =
    totalWeeks <= 5
      ? '1 Tech Lead · 1 Senior Full-Stack · 1 Product Designer'
      : '1 Tech Lead · 2 Senior Engineers · 1 Cloud/DevOps · 1 Product Designer'

  const handleApplyToContact = () => {
    sounds.playSuccess()

    const platformName = platformOption?.title || 'Personalizado'
    const featureNames = selectedFeatures
      .map((id) => ESTIMATOR_OPTIONS.features.find((f) => f.id === id)?.title)
      .filter(Boolean)
      .join(', ')

    const summary = `Hola Ceibo! Calculé una estimación para:
• Plataforma: ${platformName}
• Módulos requeridos: ${featureNames || 'Ninguno adicional'}
• Modalidad: ${speedOption?.title || 'Estándar'}
• Plazo estimado: ~${totalWeeks} semanas.

Me gustaría conversar sobre este alcance.`

    if (onScopeSelected) {
      onScopeSelected(summary)
    }

    const contactEl = document.getElementById('contacto')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="estimador" className="relative z-20 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
          <Calculator size={13} />
          Cotizador Interactivo de Alcance
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Diseña tu proyecto. Mira los tiempos en vivo.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Selecciona la arquitectura base y los componentes críticos que necesitas. Nuestro modelo de ingeniería calcula de forma transparente los sprints y la composición del equipo.
        </p>
      </div>

      <div className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-[#0c0c12]/90 p-6 backdrop-blur-2xl lg:grid-cols-12 lg:p-10">
        {/* Left column: Selectors */}
        <div className="space-y-8 lg:col-span-7">
          {/* Step 1: Platform */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-rose-300">
              Paso 1: Tipo de Plataforma Base
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ESTIMATOR_OPTIONS.platforms.map((p) => {
                const isSelected = selectedPlatform === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      sounds.playClick()
                      setSelectedPlatform(p.id)
                    }}
                    className={`relative rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/20 shadow-[0_0_20px_rgba(225,29,72,0.15)]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-rose-600/40 px-2 py-0.5 font-mono text-[9px] font-semibold text-rose-200">
                        {p.badge}
                      </span>
                    )}
                    <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                    <p className="mt-1 text-xs text-zinc-400">{p.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Critical Modules */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-rose-300">
              Paso 2: Módulos & Capacidades Críticas
            </span>
            <div className="mt-3 space-y-2">
              {ESTIMATOR_OPTIONS.features.map((f) => {
                const isChecked = selectedFeatures.includes(f.id)
                return (
                  <div
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition ${
                      isChecked
                        ? 'border-rose-500/60 bg-rose-950/20'
                        : 'border-white/10 bg-white/[0.01] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid size-5 place-items-center rounded border transition ${
                          isChecked
                            ? 'border-rose-500 bg-rose-600 text-white'
                            : 'border-white/20 bg-black/40 text-transparent'
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-white">{f.title}</h4>
                          {f.badge && (
                            <span className="rounded bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] text-rose-300">
                              {f.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400">{f.description}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">+{f.weeks} sem</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step 3: Speed / Priority */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-rose-300">
              Paso 3: Velocidad & Prioridad de Lanzamiento
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {ESTIMATOR_OPTIONS.timeline.map((s) => {
                const isSelected = selectedSpeed === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      sounds.playClick()
                      setSelectedSpeed(s.id)
                    }}
                    className={`rounded-xl border p-3.5 text-left transition ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/20'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-white">{s.title}</h4>
                      {s.badge && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-300">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400">{s.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Live Estimate Summary */}
        <div className="flex flex-col justify-between rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-black to-[#09090c] p-6 lg:col-span-5 lg:p-8">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs font-semibold text-rose-400">
                PROYECCIÓN ESTIMADA
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                Garantía Ceibo
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs text-zinc-400">Tiempo de desarrollo a producción:</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                  ~{totalWeeks}
                </span>
                <span className="text-lg font-semibold text-zinc-400">semanas</span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Equivalente a {Math.ceil(totalWeeks / 2)} sprints con entregas verificables cada 14 días.
              </p>
            </div>

            <div className="mt-8 space-y-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Users size={16} className="mt-0.5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Equipo dedicado:</span>
                  <p className="mt-0.5 text-zinc-400">{teamComposition}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Metodología:</span>
                  <p className="mt-0.5 text-zinc-400">
                    CI/CD diario, canal privado de Slack/Discord directo con los ingenieros y feedback continuo sin burocracia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <button
              onClick={handleApplyToContact}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 py-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] transition hover:brightness-110"
            >
              <span>Discutir este alcance con el equipo</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <p className="mt-2 text-center text-[10px] text-zinc-400">
              Sin compromisos · Recibes respuesta técnica de un fundador en &lt;24hs
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
