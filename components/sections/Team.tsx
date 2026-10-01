'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Briefcase, Globe, Sparkles, MoveHorizontal } from 'lucide-react'
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
  const [mounted, setMounted] = useState(false)
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const isInteractingRef = useRef(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)
  const isDraggingRef = useRef(false)
  const currentScrollPos = useRef(0)

  // Pause auto-scroll immediately on touch / interaction
  const pauseAutoScroll = () => {
    isInteractingRef.current = true
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }

  // Resume auto-scroll after 2.5s once user interaction settles
  const resumeAutoScrollWithDelay = () => {
    if (scrollRef.current) {
      currentScrollPos.current = scrollRef.current.scrollLeft
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    resumeTimeoutRef.current = setTimeout(() => {
      if (scrollRef.current) {
        currentScrollPos.current = scrollRef.current.scrollLeft
      }
      isInteractingRef.current = false
    }, 2500)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll()
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    isDraggingRef.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    pauseAutoScroll()
    if (touchStartPos.current) {
      const diffX = Math.abs(e.touches[0].clientX - touchStartPos.current.x)
      const diffY = Math.abs(e.touches[0].clientY - touchStartPos.current.y)
      if (diffX > 6 || diffY > 6) {
        isDraggingRef.current = true
      }
    }
  }

  const handleTouchEnd = () => {
    resumeAutoScrollWithDelay()
    setTimeout(() => {
      isDraggingRef.current = false
    }, 100)
  }

  // Handle scroll events: update active dot index and track inertia
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 227 // 215px + 12px gap
    const oneSetWidth = cardWidth * TEAM_MEMBERS.length
    if (oneSetWidth > 0) {
      const normalized = (el.scrollLeft % oneSetWidth + oneSetWidth) % oneSetWidth
      const current = Math.floor((normalized + cardWidth / 2) / cardWidth) % TEAM_MEMBERS.length
      setActiveMobileIdx(current)
    }

    // If user is actively touching or scrolling, synchronize position and restart timer
    if (isInteractingRef.current) {
      currentScrollPos.current = el.scrollLeft
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = setTimeout(() => {
          if (scrollRef.current) {
            currentScrollPos.current = scrollRef.current.scrollLeft
          }
          isInteractingRef.current = false
        }, 2500)
      }
    }
  }

  const scrollToMember = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    pauseAutoScroll()
    const cardWidth = 227
    const oneSetWidth = cardWidth * TEAM_MEMBERS.length
    const target = oneSetWidth + idx * cardWidth
    currentScrollPos.current = target
    el.scrollTo({ left: target, behavior: 'smooth' })
    resumeAutoScrollWithDelay()
  }

  // Auto-scroll loop: continuous smooth movement using float accumulator
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationFrameId: number
    const SPEED = 0.5 // Visibly and smoothly moving on mobile (~30px/sec)

    const initScroll = () => {
      if (el && el.scrollWidth > 0) {
        const oneThird = el.scrollWidth / 3
        if (el.scrollLeft < oneThird * 0.5 || el.scrollLeft > oneThird * 2.5) {
          currentScrollPos.current = oneThird
          el.scrollLeft = oneThird
        } else {
          currentScrollPos.current = el.scrollLeft
        }
      }
    }

    initScroll()
    const timer = setTimeout(initScroll, 120)

    const step = () => {
      if (el && !isInteractingRef.current) {
        currentScrollPos.current += SPEED
        const oneThird = el.scrollWidth / 3
        if (oneThird > 0) {
          if (currentScrollPos.current >= oneThird * 2) {
            currentScrollPos.current -= oneThird
          } else if (currentScrollPos.current <= 0) {
            currentScrollPos.current += oneThird
          }
        }
        el.scrollLeft = currentScrollPos.current
      }
      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(timer)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

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
    <section id="equipo" className="relative z-20 mx-auto w-full max-w-7xl overflow-hidden px-5 py-20 md:px-8 md:py-28">
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

      {/* Desktop 6-Member Unified Grid (Compact, all 6 visible together, ultra-fluid 120fps hover) */}
      <Reveal className="mt-10 hidden md:grid md:grid-cols-6 gap-3 lg:gap-3.5 group/team">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={member.name}
            onClick={() => {
              sounds.playClick()
              setSelectedMember(member)
            }}
            className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/75 p-3 backdrop-blur-sm transition-[transform,border-color,box-shadow,opacity] duration-200 ease-out hover:-translate-y-1.5 hover:border-rose-500/50 hover:bg-[#0d0d14]/95 hover:shadow-[0_12px_28px_-6px_rgba(225,29,72,0.25)] group-hover/team:opacity-75 hover:!opacity-100"
          >
            {/* Top liquid shimmer highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/0 to-transparent transition-opacity duration-300 group-hover:via-rose-500/60" />

            <div>
              {/* Photo Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/60">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-xl font-bold text-rose-400">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}

                {/* Holographic foil sheen overlay */}
                <div className="pointer-events-none absolute -inset-full holo-card-shine opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[holographic-shine_2s_ease-in-out_infinite]" />

                {/* Subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Name & Role */}
              <div className="mt-3">
                <h3
                  className="truncate text-sm font-bold text-white transition-colors duration-200 group-hover:text-rose-200"
                  title={member.name}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-0.5 truncate text-[11px] font-semibold text-rose-400"
                  title={member.role}
                >
                  {member.role}
                </p>

                {/* Specialties chips (compact) */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {member.specialty
                    .split('·')
                    .slice(0, 2)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium text-zinc-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 transition-colors group-hover:text-rose-300">
                <span>Ficha</span>
                <ArrowUpRight size={11} />
              </span>

              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="grid size-6 place-items-center rounded-md border border-white/10 bg-black/40 text-zinc-400 transition hover:border-rose-500/40 hover:text-white"
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
                    className="grid size-6 place-items-center rounded-md border border-white/10 bg-black/40 text-zinc-400 transition hover:border-rose-500/40 hover:text-white"
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

      {/* Mobile Swipe Cue & Interactive Dots */}
      <div className="mt-8 flex md:hidden items-center justify-between px-1">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
          <MoveHorizontal size={13} className="text-rose-400 animate-pulse" />
          <span>Deslizá con el dedo para explorar</span>
        </div>
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToMember(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeMobileIdx === i
                  ? 'w-5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ver integrante ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Auto-moving & Touch-Draggable Carousel ("muy lento", se queda quieto al deslizar, reanuda a los 2-3s) */}
      <div className="relative mt-3 flex md:hidden w-full max-w-full overflow-hidden py-2">
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 inset-y-0 z-10 w-6 bg-gradient-to-r from-[#09090b] to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 z-10 w-6 bg-gradient-to-l from-[#09090b] to-transparent" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onPointerDown={pauseAutoScroll}
          onPointerUp={resumeAutoScrollWithDelay}
          onPointerLeave={resumeAutoScrollWithDelay}
          onPointerCancel={resumeAutoScrollWithDelay}
          className="flex w-full max-w-full gap-3 overflow-x-auto scrollbar-none px-4 py-1 cursor-grab active:cursor-grabbing select-none"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'auto' }}
        >
          {[...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, idx) => (
            <div
              key={`${member.name}-${idx}`}
              onClick={() => {
                if (isDraggingRef.current) return
                sounds.playClick()
                setSelectedMember(member)
              }}
              className="group relative flex w-[215px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/85 p-3.5 backdrop-blur-md transition-all active:scale-[0.98] active:border-rose-500/40"
            >
              {/* Top liquid shimmer */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

              <div>
                {/* Avatar Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="size-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-gradient-to-br from-rose-950 via-zinc-950 to-black font-mono text-2xl font-bold text-rose-400">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-rose-400 truncate">
                    {member.role}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                  <span>Ver proyectos</span>
                  <ArrowUpRight size={12} />
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
                      className="grid size-6 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:text-white"
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
                      className="grid size-6 place-items-center rounded-lg border border-white/10 text-zinc-400 transition hover:text-white"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
