'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react'
import { CEIBO_BRAND } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

interface ContactProps {
  initialMessage?: string
}

export function Contact({ initialMessage = '' }: ContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$1.000 - $3.000 USD',
    message: initialMessage,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialMessage) {
      setForm((prev) => ({ ...prev, message: initialMessage }))
    }
  }, [initialMessage])

  const budgets = ['< $1.000 USD', '$1.000 - $3.000 USD', '$3.000 - $6.000 USD', '+$6.000 USD']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section id="contacto" className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12]/90 backdrop-blur-2xl">
        <div className="grid gap-10 p-6 md:p-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Info */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
                Canal Directo
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Hablemos de tu próximo producto digital.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Cuéntanos sobre tu idea, objetivos o fecha estimada. Te respondemos con un plan claro y sin vueltas en menos de 24 horas.
              </p>

              <div className="mt-8 space-y-4 text-xs text-zinc-300">
                <a
                  href={`mailto:${CEIBO_BRAND.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-rose-500/40 hover:text-white"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-950/40 text-rose-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">Email</span>
                    <div className="font-mono font-semibold">{CEIBO_BRAND.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${CEIBO_BRAND.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-rose-500/40 hover:text-white"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-950/40 text-rose-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">Teléfono</span>
                    <div className="font-mono font-semibold">{CEIBO_BRAND.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-950/40 text-rose-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500">Sede</span>
                    <div className="font-medium text-white">{CEIBO_BRAND.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-8 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">¡Mensaje recibido!</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-300">
                  Hemos registrado los detalles de tu consulta. Te enviaremos una propuesta y disponibilidad de llamada en breve.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', company: '', budget: '$1.000 - $3.000 USD', message: '' })
                  }}
                  className="mt-6 rounded-xl border border-white/20 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300">Tu nombre *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej: Tomás Fernández"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300">Email de contacto *</label>
                    <input
                      required
                      type="email"
                      placeholder="nombre@empresa.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300">Empresa o Startup (opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Pampa Inc."
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300">Rango de inversión estimado</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          setForm({ ...form, budget: b })
                        }}
                        className={`rounded-lg border px-2 py-2 text-center font-mono text-[11px] transition cursor-pointer ${
                          form.budget === b
                            ? 'border-rose-500 bg-rose-600 text-white'
                            : 'border-white/10 bg-black/30 text-zinc-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300">Mensaje o Alcance *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos sobre tu idea, qué tienes en mente o cómo podemos ayudarte..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 py-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] transition hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Procesando mensaje...</span>
                  ) : (
                    <>
                      <span>Enviar mensaje al equipo</span>
                      <Send size={14} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
