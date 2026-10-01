'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Briefcase, Globe, Sparkles } from 'lucide-react'
import { TEAM_MEMBERS, TeamMember } from '@/lib/data'
import { sounds } from '@/lib/sound'
import { Reveal } from '@/components/ui/Reveal'
import { Magnetic } from '@/components/ui/Magnetic'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-modal-open', 'true')
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [selectedMember])

  return (
    <section id="equipo" className="relative z-20 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      {/* Header with Scroll Reveal */}
      <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">
            Equipo
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-4xl">
            Quiénes estamos detrás
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-zinc-400 md:text-sm">
          Haz clic en cada perfil para conocer sus proyectos individuales y especialidades técnicas.
        </p>
      </Reveal>

      {/* Desktop Horizontal Expanding Cards Accordion (All 6 together in one view) */}
      <Reveal className="mt-12 hidden md:flex h-[510px] w-full items-stretch gap-3">
        {TEAM_MEMBERS.map((member, idx) => {
          const isActive = activeIdx === idx
          return (
            <div
              key={member.name}
              onMouseEnter={() => {
                if (activeIdx !== idx) {
                  sounds.playKey()
                  setActiveIdx(idx)
                }
              }}
              onClick={() => {
                sounds.playClick()
                setSelectedMember(member)
              }}
              className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? 'flex-[3.4] border-rose-500/50 bg-[#0d0d14]/90 shadow-[0_0_40px_rgba(225,29,72,0.22)]'
                  : 'flex-1 border-white/10 bg-[#0d0d14]/60 hover:border-white/25 hover:bg-[#0d0d14]/80'
              }`}
            >
              {/* Card Background Image or Gradient */}
              <div className="absolute inset-0 size-full overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`size-full object-cover transition-all duration-700 ${
                      isActive
                        ? 'scale-105 grayscale-0'
                        : 'scale-100 grayscale brightness-60 group-hover:brightness-85'
                    }`}
                  />
                ) : (
                  <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-3xl font-bold text-rose-400">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                {/* Holographic foil sheen overlay */}
                <div className="pointer-events-none absolute -inset-full holo-card-shine opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[holographic-shine_2s_ease-in-out_infinite]" />
                
                {/* Dark gradient for legibility */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black via-black/60 to-black/20'
                      : 'bg-gradient-to-t from-black/95 via-black/40 to-transparent'
                  }`}
                />

                {/* Top liquid shimmer line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/0 to-transparent transition-opacity duration-500 group-hover:via-rose-500/60" />
              </div>

              {/* Collapsed State Info */}
              <div
                className={`relative z-10 flex h-full flex-col justify-between p-4 transition-all duration-300 ${
                  isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <div className="flex justify-center">
                  <span className="grid size-8 place-items-center rounded-full border border-white/15 bg-black/60 font-mono text-xs font-bold text-rose-400 backdrop-blur-md">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className="mb-3 max-h-32 text-xs font-bold tracking-wide text-white/90 [writing-mode:vertical-rl] rotate-180 line-clamp-1">
                    {member.name}
                  </span>
                  <div className="w-full rounded-xl border border-white/10 bg-black/70 px-2 py-1.5 backdrop-blur-md">
                    <p className="truncate text-[11px] font-bold text-white group-hover:text-rose-300">
                      {member.name.split(' ')[0]}
                    </p>
                    <p className="truncate text-[9px] text-rose-400">
                      {member.role.split(' ')[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded State Info */}
              <div
                className={`relative z-10 flex h-full flex-col justify-between p-6 transition-all duration-500 ${
                  isActive ? 'opacity-100 delay-75' : 'pointer-events-none opacity-0'
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/60 px-3 py-1 font-mono text-[11px] font-semibold text-rose-300 backdrop-blur-md">
                    <Sparkles size={11} className="text-rose-400" />
                    <span>Ceibo Team · 0{idx + 1}</span>
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400">
                    Click para ficha completa
                  </span>
                </div>

                {/* Profile Details Card */}
                <div className="rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                      {member.name}
                    </h3>
                    <span className="text-xs font-semibold text-rose-400">
                      {member.role}
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {member.specialty.split('·').map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-200 backdrop-blur-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Footer Actions */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3.5 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/30">
                      <span>Ver proyectos individuales</span>
                      <ArrowUpRight size={14} />
                    </span>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {member.linkedin && (
                        <Magnetic strength={0.35}>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick()}
                            className="grid size-8 place-items-center rounded-xl border border-white/15 bg-black/50 text-zinc-300 transition hover:border-rose-500/50 hover:bg-rose-950/40 hover:text-white"
                            aria-label={`LinkedIn de ${member.name}`}
                          >
                            <LinkedInIcon />
                          </a>
                        </Magnetic>
                      )}
                      {member.github && (
                        <Magnetic strength={0.35}>
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick()}
                            className="grid size-8 place-items-center rounded-xl border border-white/15 bg-black/50 text-zinc-300 transition hover:border-rose-500/50 hover:bg-rose-950/40 hover:text-white"
                            aria-label={`GitHub de ${member.name}`}
                          >
                            <GitHubIcon />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Reveal>

      {/* Mobile Horizontal Snap Reel (All 6 accessible in a fluid swipe line) */}
      <Reveal className="mt-8 flex md:hidden gap-3.5 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 no-scrollbar px-1">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={member.name}
            onClick={() => {
              sounds.playClick()
              setSelectedMember(member)
            }}
            className="group relative flex w-[82vw] max-w-[310px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14]/80 p-4 backdrop-blur-md active:scale-[0.98] transition-all"
          >
            {/* Top liquid shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

            <div>
              {/* Avatar Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-3xl font-bold text-rose-400">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                {/* Number Badge */}
                <div className="absolute top-3 left-3">
                  <span className="grid size-7 place-items-center rounded-full border border-white/20 bg-black/60 font-mono text-[11px] font-bold text-rose-400 backdrop-blur-md">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3.5">
                <h3 className="text-base font-bold text-white truncate">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-rose-400 truncate">
                  {member.role}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="flex items-center gap-1 text-xs font-semibold text-rose-400">
                <span>Ver proyectos</span>
                <ArrowUpRight size={13} />
              </span>

              <div
                className="flex items-center gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="grid size-7 place-items-center rounded-lg border border-white/10 text-zinc-400"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="grid size-7 place-items-center rounded-lg border border-white/10 text-zinc-400"
                    aria-label={`GitHub de ${member.name}`}
                  >
                    <GitHubIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </Reveal>

      {/* Team Member Detail Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedMember && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedMember(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-xl"
                />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/15 bg-[#0e0e16] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-8"
            >
              {/* Close Button */}
              <Magnetic strength={0.35} className="absolute top-5 right-5">
                <button
                  onClick={() => {
                    sounds.playClick()
                    setSelectedMember(null)
                  }}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X size={18} />
                </button>
              </Magnetic>

              {/* Member Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-black">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-2xl font-bold text-rose-400">
                      {selectedMember.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>

                <div className="pr-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-rose-400">
                    {selectedMember.role}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-400">
                    {selectedMember.specialty}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
                {selectedMember.bio}
              </p>

              {/* Links Row */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-y border-white/10 py-3">
                {selectedMember.portfolio && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedMember.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-950/30 px-3.5 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-900/50 hover:text-white"
                    >
                      <span>Portafolio</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </Magnetic>
                )}
                {selectedMember.linkedin && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:text-white"
                    >
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </Magnetic>
                )}
                {selectedMember.github && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:text-white"
                    >
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                  </Magnetic>
                )}
              </div>

              {/* Individual Projects List */}
              <div className="mt-5">
                <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400">
                  <Briefcase size={14} className="text-rose-400" />
                  <span>Proyectos & Especialidad</span>
                </h4>

                <div className="mt-3 space-y-3">
                  {selectedMember.projects?.map((proj, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white tracking-tight">{proj.title}</span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                          {proj.role}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                        {proj.description}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {proj.tech.map((t, ti) => (
                          <span
                            key={ti}
                            className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-rose-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Close */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => {
                      sounds.playClick()
                      setSelectedMember(null)
                    }}
                    className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    Cerrar
                  </button>
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
