'use client'

import { TECH_STACK } from '@/lib/data'
import { sounds } from '@/lib/sound'

export function TechMarquee() {
  return (
    <section className="relative z-20 overflow-hidden border-y border-white/5 bg-[#09090c]/50 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
          Tecnologías en Producción · Cero deuda técnica
        </p>

        {/* Interactive stack grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              onMouseEnter={() => sounds.playClick()}
              className="group flex cursor-default items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-all duration-300 hover:scale-105 hover:border-rose-500/50 hover:bg-rose-950/20"
            >
              <span className="size-1.5 rounded-full bg-rose-500 group-hover:animate-ping" />
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                {tech.name}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 group-hover:text-rose-300">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
