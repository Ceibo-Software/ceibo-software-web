'use client'

import { useState, useEffect } from 'react'
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react'
import { CEIBO_BRAND } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

interface ContactProps {
  initialMessage?: string
}

type FieldName = 'name' | 'email' | 'message'
type FormErrors = Partial<Record<FieldName, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_MESSAGE_LENGTH = 10

function validate(form: { name: string; email: string; message: string }): FormErrors {
  const errors: FormErrors = {}
  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name) {
    errors.name = 'Escribí tu nombre así sabemos cómo llamarte.'
  } else if (name.length < 2) {
    errors.name = 'El nombre parece incompleto.'
  }

  if (!email) {
    errors.email = 'Necesitamos tu email para poder responderte.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Revisá el email, parece que falta algo. Ej: nombre@empresa.com'
  }

  if (!message) {
    errors.message = 'Contanos brevemente qué necesitás.'
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = 'Contanos un poco más así podemos prepararte una propuesta.'
  }

  return errors
}

const inputBase =
  'mt-1.5 w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition'

function inputClass(hasError: boolean) {
  return `${inputBase} ${
    hasError ? 'border-red-500/70 focus:border-red-400' : 'border-white/10 focus:border-rose-500'
  }`
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-400">
      <AlertCircle size={13} className="mt-px shrink-0" />
      <span>{message}</span>
    </p>
  )
}

export function Contact({ initialMessage = '' }: ContactProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: initialMessage,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const errors = validate(form)
  const visibleError = (field: FieldName) =>
    touched[field] || submitAttempted ? errors[field] : undefined
  const markTouched = (field: FieldName) => setTouched((prev) => ({ ...prev, [field]: true }))

  useEffect(() => {
    if (initialMessage) {
      setForm((prev) => ({ ...prev, message: initialMessage }))
    }
  }, [initialMessage])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitAttempted(true)

    const firstInvalid = (['name', 'email', 'message'] as FieldName[]).find((field) => errors[field])
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus()
      return
    }

    setIsSubmitting(true)

    const subject = `Nueva consulta de ${form.name}${form.company ? ` (${form.company})` : ''}`
    const body = [
      `Nombre: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Empresa: ${form.company}` : null,
      '',
      form.message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    window.location.href = `mailto:${CEIBO_BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12]/90 backdrop-blur-2xl">
        <div className="grid gap-10 p-6 md:p-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Info */}
          <div className="flex flex-col lg:col-span-5">
            <div className="flex h-full flex-col">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
                Canal Directo
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Hablemos de tu próximo producto digital.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Contanos sobre tu idea, objetivos o fecha estimada. Te respondemos con un plan claro y sin vueltas en menos de 24 horas.
              </p>

              <div className="mt-8 space-y-4 text-xs text-zinc-300 lg:mt-auto lg:pt-8">
                <a
                  href={`mailto:${CEIBO_BRAND.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-rose-500/40 hover:text-white"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-950/40 text-rose-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400">Email</span>
                    <div className="font-mono font-semibold">{CEIBO_BRAND.email}</div>
                  </div>
                </a>


                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-950/40 text-rose-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400">Sede</span>
                    <div className="font-medium text-white">{CEIBO_BRAND.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col lg:col-span-7">
            {submitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-8 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">¡Ya casi está!</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-300">
                  Se abrió tu correo con el mensaje listo. Envialo y te respondemos con un plan claro en menos de 24 horas.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setTouched({})
                    setSubmitAttempted(false)
                    setForm({ name: '', email: '', company: '', message: '' })
                  }}
                  className="mt-6 rounded-xl border border-white/20 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-300">
                      Tu nombre *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ej: Tomás Fernández"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onBlur={() => markTouched('name')}
                      aria-invalid={!!visibleError('name')}
                      aria-describedby={visibleError('name') ? 'contact-name-error' : undefined}
                      className={inputClass(!!visibleError('name'))}
                    />
                    <FieldError id="contact-name-error" message={visibleError('name')} />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-300">
                      Email de contacto *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="nombre@empresa.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onBlur={() => markTouched('email')}
                      aria-invalid={!!visibleError('email')}
                      aria-describedby={visibleError('email') ? 'contact-email-error' : undefined}
                      className={inputClass(!!visibleError('email'))}
                    />
                    <FieldError id="contact-email-error" message={visibleError('email')} />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="text-xs font-semibold text-zinc-300">
                    Empresa o Startup (opcional)
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Ej: Pampa Inc."
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass(false)}
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-300">
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={7}
                    placeholder="Contanos sobre tu idea, qué tenés en mente o cómo podemos ayudarte..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onBlur={() => markTouched('message')}
                    aria-invalid={!!visibleError('message')}
                    aria-describedby={visibleError('message') ? 'contact-message-error' : undefined}
                    className={`${inputClass(!!visibleError('message'))} min-h-44 flex-1 resize-y`}
                  />
                  <FieldError id="contact-message-error" message={visibleError('message')} />
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
