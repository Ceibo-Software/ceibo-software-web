'use client'

import { ArrowUpRight, Terminal, Heart } from 'lucide-react'
import { CEIBO_BRAND } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'
import { useI18n } from '@/components/i18n/I18nProvider'

export function Footer() {
  const { t } = useI18n()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-white/10 bg-[#07070a] px-5 py-12 text-xs text-zinc-400 md:px-8">
      <Reveal y={20} className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 text-white">
              <div className="relative size-7 overflow-hidden rounded-lg border border-white/20 bg-rose-950/40 p-0.5">
                <img
                  src={CEIBO_BRAND.logoUrl}
                  alt={t.common.logoAlt}
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="size-full rounded-md object-cover"
                />
              </div>
              <span className="font-mono text-base font-bold tracking-tight">
                Ceibo<span className="text-rose-500">.</span>software
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-400">
              {t.footer.description}
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.footer.location}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.navHeading}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {t.footer.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-rose-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Status */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              {t.footer.contactHeading}
            </h4>
            <ul className="mt-3 space-y-2 font-mono text-xs">
              <li>
                <a
                  href={`mailto:${CEIBO_BRAND.email}`}
                  className="transition hover:text-rose-400"
                >
                  {CEIBO_BRAND.email}
                </a>
              </li>
              <li className="pt-2 text-emerald-400 text-xs">
                {t.footer.availability}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Ceibo Software. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              {t.footer.madeIn} <span className="text-zinc-300">{t.footer.country}</span>
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-mono text-zinc-400 transition hover:text-rose-400"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
