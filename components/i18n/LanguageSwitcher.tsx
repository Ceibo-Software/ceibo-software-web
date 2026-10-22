'use client'

import { Languages } from 'lucide-react'
import { useI18n } from './I18nProvider'
import type { Locale } from '@/lib/i18n'

/** Botón ES/EN: lleva a la otra versión del sitio manteniendo la sección actual (#hash). */
export function LanguageSwitcher({
  className = '',
  iconClassName = '',
}: {
  className?: string
  iconClassName?: string
}) {
  const { locale, t } = useI18n()
  const target: Locale = locale === 'es' ? 'en' : 'es'

  return (
    <a
      href={`/${target}`}
      hrefLang={target}
      lang={target}
      onClick={(e) => {
        e.preventDefault()
        window.location.href = `/${target}${window.location.hash}`
      }}
      aria-label={t.nav.switchLanguage}
      title={t.nav.switchLanguage}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:text-white ${className}`}
    >
      <Languages size={13} aria-hidden="true" className={iconClassName} />
      <span>{t.nav.otherLanguageLabel}</span>
    </a>
  )
}
