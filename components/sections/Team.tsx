'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Briefcase, Globe, Sparkles } from 'lucide-react'
import { TEAM_MEMBERS, TeamMember } from '@/lib/data'
import { sounds } from '@/lib/sound'
import { Reveal } from '@/components/ui/Reveal'

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

      {/* Team Cards with Staggered Scroll Reveal */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {TEAM_MEMBERS.map((member, idx) => (
          <Reveal key={member.name} delay={idx * 0.07} className="h-full">
            <div
              onClick={() => {
                sounds.playClick()
                setSelectedMember(member)
              }}
              className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/70 p-4 backdrop-blur-md transition-all duration-300 hover:border-rose-500/50 hover:bg-rose-950/20 hover:shadow-[0_0_35px_rgba(225,29,72,0.2)]"
            >
              <div>
                {/* Avatar */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="size-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-3xl font-bold text-rose-400">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-white transition group-hover:text-rose-300">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-rose-400">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Action Cue */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 transition group-hover:text-rose-300">
                  <span>Ver proyectos</span>
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="rounded-lg border border-white/10 p-1.5 text-zinc-400 transition hover:border-rose-500/50 hover:text-white"
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
                      className="rounded-lg border border-white/10 p-1.5 text-zinc-400 transition hover:border-rose-500/50 hover:text-white"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

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
              <button
                onClick={() => {
                  sounds.playClick()
                  setSelectedMember(null)
                }}
                className="absolute top-5 right-5 grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

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
                )}
                {selectedMember.linkedin && (
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
                )}
                {selectedMember.github && (
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
                <button
                  onClick={() => {
                    sounds.playClick()
                    setSelectedMember(null)
                  }}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                  Cerrar
                </button>
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
