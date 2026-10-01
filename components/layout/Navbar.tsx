'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X, MessageSquare, Volume2, VolumeX } from 'lucide-react'
import { CEIBO_BRAND } from '@/lib/data'
import { sounds } from '@/lib/sound'

interface NavbarProps {
  onOpenChat?: () => void
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const checkModal = () => {
      const isLocked =
        document.body.style.overflow === 'hidden' ||
        document.body.hasAttribute('data-modal-open')
      setIsModalOpen(isLocked)
    }

    checkModal()

    const observer = new MutationObserver(() => {
      checkModal()
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'data-modal-open'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setIsMuted(sounds.getMuted())
    const unsubscribe = sounds.subscribe((muted) => setIsMuted(muted))
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSoundToggle = () => {
    const nextMuted = sounds.toggleMute()
    setIsMuted(nextMuted)
  }

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full px-3 transition-all duration-300 ease-out sm:px-6 md:px-8 ${
        isScrolled ? 'pt-3 md:pt-6' : 'pt-3 md:pt-5'
      } ${
        isModalOpen
          ? 'pointer-events-none -translate-y-full opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
          isScrolled
            ? 'max-w-6xl lg:max-w-7xl rounded-full border border-white/15 bg-[#09090b]/85 px-5 py-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-1 ring-white/10 sm:px-6 md:px-8 md:py-3'
            : 'max-w-7xl rounded-full border border-transparent bg-transparent px-4 py-3 sm:px-6'
        }`}
      >
        {/* Brand logo */}
        <a
          href="#top"
          onClick={() => sounds.playClick()}
          className="group flex shrink-0 items-center gap-3 text-sm font-semibold tracking-tight text-white"
        >
          <div className="relative size-11 overflow-hidden rounded-xl border border-white/20 bg-white p-1 shadow-md transition-transform duration-300 group-hover:scale-105 sm:size-12">
            <img
              src={CEIBO_BRAND.logoUrl}
              alt="Ceibo Software Logo"
              className="size-full object-contain"
            />
          </div>
          <span className="flex items-center text-xl font-bold tracking-tight text-white sm:text-2xl">
            Ceibo<span className="text-rose-500">.</span>software
          </span>
        </a>

        {/* Desktop Links with generous separation */}
        <nav
          className={`hidden items-center justify-center text-sm font-medium text-zinc-400 md:flex md:flex-1 transition-all duration-300 ${
            isScrolled ? 'gap-8 px-8 lg:px-16' : 'gap-8 px-6 lg:px-10'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => sounds.playClick()}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Sound toggle */}
          <button
            onClick={handleSoundToggle}
            className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-white/20 hover:text-white sm:flex"
            title={isMuted ? 'Activar efectos sonoros' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-rose-400" />}
            <span>{isMuted ? 'Sonido' : 'Activo'}</span>
          </button>

          {/* Chatbot trigger */}
          <button
            onClick={() => {
              sounds.playClick()
              if (onOpenChat) onOpenChat()
            }}
            className="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 px-3.5 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-900/40 hover:text-white"
          >
            <MessageSquare size={13} />
            <span className="hidden sm:inline">Asistente IA</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contacto"
            onClick={() => sounds.playClick()}
            className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 px-5 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:brightness-110 md:inline-flex"
          >
            <span>Hablemos</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              sounds.playSwitch()
              setMenuOpen(!menuOpen)
            }}
            className="grid size-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-white/20 md:hidden"
            aria-label="Menú principal"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#0c0c12]/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 text-base font-medium text-zinc-200">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    sounds.playClick()
                    setMenuOpen(false)
                  }}
                  className="flex items-center justify-between py-1 transition hover:text-rose-400"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="text-zinc-600" />
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contacto"
                  onClick={() => {
                    sounds.playClick()
                    setMenuOpen(false)
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-3 text-center text-sm font-semibold text-white shadow-lg"
                >
                  <span>Iniciar conversación</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
