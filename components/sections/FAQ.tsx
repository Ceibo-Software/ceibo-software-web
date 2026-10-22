'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { CEIBO_BRAND } from '@/lib/data'
import { useI18n } from '@/components/i18n/I18nProvider'

const EMAIL_TOKEN = '{email}'

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

// Reemplaza {email} en el texto por el email de contacto con su link
function withEmailLink(text: string) {
  const parts = text.split(EMAIL_TOKEN)
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<EmailLink key={i} />, part]))
}

export function FAQ() {
  const { locale, t } = useI18n()
  const FAQ_ITEMS = t.faq.items

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replaceAll(EMAIL_TOKEN, CEIBO_BRAND.email),
      },
    })),
  }

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
          {t.faq.eyebrow}
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
          {t.faq.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {t.faq.subtitleBefore} <EmailLink /> {t.faq.subtitleAfter}
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
