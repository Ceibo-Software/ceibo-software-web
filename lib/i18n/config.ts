export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Elige el idioma a partir del header Accept-Language del navegador. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { lang } of preferred) {
    if (isLocale(lang)) return lang
  }
  return defaultLocale
}
