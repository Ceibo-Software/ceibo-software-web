'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react'

interface ActionChip {
  label: string
  actionType: 'navigate' | 'message' | 'whatsapp'
  payload?: string
}

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
  actionChips?: ActionChip[]
}

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'bot',
  text: '¡Hola! 👋 Soy el asistente de **Ceibo Software**.\n¿En qué podemos ayudarte?',
  time: 'Ahora',
  actionChips: [
    { label: '🚀 Ver servicios', actionType: 'navigate', payload: 'servicios' },
    { label: '📁 Ver proyectos', actionType: 'navigate', payload: 'proyectos' },
    { label: '👥 Conocer al equipo', actionType: 'navigate', payload: 'equipo' },
    { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
  ],
}

export function CeiboChatbot({
  isOpenExternal,
  onCloseExternal,
}: {
  isOpenExternal?: boolean
  onCloseExternal?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE])

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal)
    }
  }, [isOpenExternal])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setUnreadCount(0)
    }
  }, [messages, isOpen, isTyping])

  const handleActionChipClick = (chip: ActionChip) => {
    if (chip.actionType === 'navigate' && chip.payload) {
      const el = document.getElementById(chip.payload)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Te llevé a la sección de **${chip.label.replace(/^[^\s]+\s/, '')}**. ¿Tenés alguna otra consulta?`,
          time: 'Ahora',
          actionChips: [
            { label: '📝 Contactar al equipo', actionType: 'navigate', payload: 'contacto' },
            { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
          ],
        },
      ])
    } else if (chip.actionType === 'whatsapp') {
      window.open(
        'https://wa.me/5491155555555?text=Hola%20Ceibo%20Software,%20me%20gustar%C3%ADa%20hacerles%20una%20consulta.',
        '_blank'
      )
    } else if (chip.actionType === 'message' && chip.payload) {
      handleSendMessage(chip.payload)
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Ahora',
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = query.toLowerCase()
      let answer = ''
      let chips: ActionChip[] = []

      // 1. Email or phone contact
      if (lower.includes('@') || lower.match(/\b\d{8,}\b/)) {
        answer = '¡Datos recibidos! 🚀 Nos pondremos en contacto con vos hoy mismo.'
        chips = [
          { label: '💬 Escribir por WhatsApp', actionType: 'whatsapp' },
          { label: '📁 Ver proyectos', actionType: 'navigate', payload: 'proyectos' },
        ]
      }
      // 2. Services
      else if (
        lower.includes('servicio') ||
        lower.includes('hacen') ||
        lower.includes('desarrollo') ||
        lower.includes('web') ||
        lower.includes('app')
      ) {
        answer = 'Desarrollamos plataformas web a medida, aplicaciones móviles (iOS/Android) y arquitectura cloud de alto rendimiento.'
        chips = [
          { label: '📁 Ver proyectos reales', actionType: 'navigate', payload: 'proyectos' },
          { label: '📝 Cotizar idea', actionType: 'navigate', payload: 'contacto' },
        ]
      }
      // 3. Team
      else if (
        lower.includes('equipo') ||
        lower.includes('quienes') ||
        lower.includes('staff') ||
        lower.includes('tomas') ||
        lower.includes('matias')
      ) {
        answer = 'Somos un equipo técnico directo compuesto por especialistas senior en DevOps, arquitectura backend, UI/UX y frontend. Sin intermediarios.'
        chips = [
          { label: '👥 Ver equipo en la web', actionType: 'navigate', payload: 'equipo' },
          { label: '💬 Hablar con el equipo', actionType: 'navigate', payload: 'contacto' },
        ]
      }
      // 4. Budget / Timeline
      else if (
        lower.includes('precio') ||
        lower.includes('costo') ||
        lower.includes('cuanto') ||
        lower.includes('tiempo') ||
        lower.includes('presupuesto')
      ) {
        answer = 'Adaptamos cada propuesta a los objetivos y escala del proyecto. Los primeros sprints suelen lanzarse en 4 a 6 semanas.'
        chips = [
          { label: '📝 Iniciar consulta', actionType: 'navigate', payload: 'contacto' },
          { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
        ]
      }
      // 5. Default
      else {
        answer = '¡Contanos más sobre tu idea o elegí una de estas opciones para ayudarte rápido:'
        chips = [
          { label: '🚀 Ver servicios', actionType: 'navigate', payload: 'servicios' },
          { label: '📁 Ver proyectos', actionType: 'navigate', payload: 'proyectos' },
          { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
        ]
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: answer,
        time: 'Ahora',
        actionChips: chips,
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 550)
  }

  const resetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE])
  }

  const toggleChat = () => {
    const next = !isOpen
    setIsOpen(next)
    if (onCloseExternal && !next) {
      onCloseExternal()
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="group relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white shadow-[0_4px_25px_rgba(225,29,72,0.5)] transition duration-300 hover:shadow-[0_6px_35px_rgba(225,29,72,0.7)]"
          aria-label="Abrir asistente de Ceibo"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

          {/* Unread badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-rose-600 shadow-md">
              {unreadCount}
            </span>
          )}

          {/* Help tooltip on hover */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#121218] px-3.5 py-1.5 text-xs font-medium text-zinc-200 shadow-xl backdrop-blur-md md:group-hover:block">
              ¿Dudas? Chatea con nosotros 💬
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-4 bottom-24 z-50 mx-auto max-h-[580px] w-auto overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f15]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:right-6 sm:left-auto sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-rose-950/60 to-black/60 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex size-9 items-center justify-center rounded-full bg-rose-600 font-bold text-white shadow-md">
                  <Sparkles size={16} />
                  <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-[#0f0f15] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Ceibo Assistant</h3>
                  <p className="text-[11px] text-emerald-400">En línea · Responde al instante</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reiniciar chat"
                  className="grid size-8 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={toggleChat}
                  className="grid size-8 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Cerrar chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="h-[380px] space-y-3.5 overflow-y-auto p-4 text-xs leading-relaxed sm:text-sm">
              {messages.map((m) => {
                const isBot = m.sender === 'bot'
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end flex-row-reverse'}`}>
                      {isBot && (
                        <div className="mt-1 grid size-7 place-items-center rounded-full bg-rose-950/70 text-rose-300 shrink-0">
                          <Bot size={14} />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                          isBot
                            ? 'border border-white/10 bg-white/[0.05] text-zinc-200'
                            : 'bg-rose-600 text-white shadow-md font-medium'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>

                    {/* Interactive Action Chips directly under bot message */}
                    {m.actionChips && m.actionChips.length > 0 && (
                      <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                        {m.actionChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionChipClick(chip)}
                            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition hover:border-rose-500/50 hover:bg-rose-950/30 hover:text-white active:scale-95"
                          >
                            <span>{chip.label}</span>
                            <ArrowUpRight size={11} className="opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="grid size-7 place-items-center rounded-full bg-rose-950/70 text-rose-300">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-rose-400" style={{ animationDelay: '0ms' }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-rose-400" style={{ animationDelay: '150ms' }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-rose-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-black/60 p-3"
            >
              <input
                type="text"
                placeholder="Escribe tu consulta o idea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent px-2 text-xs text-white placeholder:text-zinc-500 outline-none focus:ring-0 sm:text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid size-9 place-items-center rounded-xl bg-rose-600 text-white transition hover:bg-rose-500 disabled:opacity-40"
                aria-label="Enviar mensaje"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
