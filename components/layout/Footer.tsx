'use client'

import { ArrowUpRight, Terminal, Heart } from 'lucide-react'
import { CEIBO_BRAND } from '@/lib/data'
import { sounds } from '@/lib/sound'
import { Reveal } from '@/components/ui/Reveal'

export function Footer() {
  const scrollToTop = () => {
    sounds.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#07070a] px-5 py-12 text-xs text-zinc-400 md:px-8">
      <Reveal y={20} className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 text-white">
              <div className="relative size-7 overflow-hidden rounded-lg border border-white/20 bg-rose-950/40 p-0.5">
                <img
                  src={CEIBO_BRAND.logoUrl}
                  alt="Ceibo Software Logo"
                  className="size-full rounded-md object-cover"
                />
              </div>
              <span className="font-mono text-base font-bold tracking-tight">
                Ceibo<span className="text-rose-500">.</span>software
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-400">
              Empresa de desarrollo de software y productos digitales. Diseñado y construido desde Argentina para el mundo.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>34°36&apos;12&quot;S 58°22&apos;54&quot;W · Buenos Aires, ARG</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Navegación
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="#servicios"
                  onClick={() => sounds.playClick()}
                  className="transition hover:text-rose-400"
                >
                  Servicios de Ingeniería
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  onClick={() => sounds.playClick()}
                  className="transition hover:text-rose-400"
                >
                  Proyectos Destacados
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={() => sounds.playClick()}
                  className="transition hover:text-rose-400"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#equipo"
                  onClick={() => sounds.playClick()}
                  className="transition hover:text-rose-400"
                >
                  Equipo Senior
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Status */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Contacto Directo
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
              <li>
                <a
                  href={`tel:${CEIBO_BRAND.phone.replace(/\s+/g, '')}`}
                  className="transition hover:text-rose-400"
                >
                  {CEIBO_BRAND.phone}
                </a>
              </li>
              <li className="pt-2 text-emerald-400 text-[11px]">
                ● Disponibilidad inmediata
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-[11px] text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Ceibo Software. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Forjado con precisión en <span className="text-zinc-300">Argentina</span>
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 font-mono text-zinc-400 transition hover:text-rose-400"
            >
              <span>Volver arriba</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
