'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  RefreshCw,
  Phone,
  CheckCircle2,
  Code2,
  Users,
  Layers,
  Zap,
} from 'lucide-react'
import { sounds } from '@/lib/sound'
import { CEIBO_BRAND } from '@/lib/data'

interface ActionChip {
  label: string
  actionType: 'navigate' | 'estimate' | 'message' | 'whatsapp'
  payload?: string
}

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
  actionChips?: ActionChip[]
  widget?: 'estimator' | 'teamPreview'
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

  // Interactive Estimator Widget State inside chat
  const [estimatorStep, setEstimatorStep] = useState<{
    platform: string
    weeks: string
  } | null>(null)

  const initialBotMessage: ChatMessage = {
    id: 'welcome-msg',
    sender: 'bot',
    text: '¡Hola! 👋 Soy el asistente interactivo de **Ceibo Software**.\n\nPuedo cotizar tu idea, mostrarte proyectos reales o ponerte en contacto con el equipo en un clic.',
    time: 'Ahora',
    actionChips: [
      { label: '⚡ Estimar mi proyecto', actionType: 'estimate' },
      { label: '🚀 Ver servicios', actionType: 'navigate', payload: 'servicios' },
      { label: '👥 Conocer al equipo', actionType: 'navigate', payload: 'equipo' },
      { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
    ],
  }

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage])

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

  const navigateToSection = (sectionId: string) => {
    sounds.playClick()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleActionChipClick = (chip: ActionChip) => {
    sounds.playClick()

    if (chip.actionType === 'navigate' && chip.payload) {
      navigateToSection(chip.payload)
      // Append a confirmation bot message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Te he desplazado a la sección de **${chip.label.replace(/^[^\s]+\s/, '')}**. ¿Querés saber algo específico sobre esto?`,
          time: 'Ahora',
          actionChips: [
            { label: '⚡ Estimar un proyecto', actionType: 'estimate' },
            { label: '💬 Contactar al equipo', actionType: 'navigate', payload: 'contacto' },
          ],
        },
      ])
    } else if (chip.actionType === 'estimate') {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: 'Quiero estimar los tiempos de mi proyecto',
          time: 'Ahora',
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: '¡Excelente! Seleccioná qué tipo de producto necesitás desarrollar:',
          time: 'Ahora',
          widget: 'estimator',
        },
      ])
    } else if (chip.actionType === 'whatsapp') {
      window.open(
        'https://wa.me/5491155555555?text=Hola%20Ceibo%20Software,%20estoy%20viendo%20su%20web%20y%20me%20gustar%C3%ADa%20hacerles%20una%20consulta.',
        '_blank'
      )
    } else if (chip.actionType === 'message' && chip.payload) {
      handleSendMessage(chip.payload)
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    sounds.playKey()

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
      let botResponse = ''
      let chips: ActionChip[] = []

      // 1. Contact capture
      if (lower.includes('@') || lower.match(/\b\d{8,}\b/)) {
        botResponse =
          '¡Datos recibidos con éxito! 🚀\nUn ingeniero de nuestro equipo te contactará hoy mismo para coordinar una llamada corta de 15 minutos.'
        sounds.playSuccess()
        chips = [
          { label: '💬 WhatsApp inmediato', actionType: 'whatsapp' },
          { label: '🚀 Explorar proyectos', actionType: 'navigate', payload: 'proyectos' },
        ]
      }
      // 2. Services inquiry
      else if (
        lower.includes('servicio') ||
        lower.includes('hacen') ||
        lower.includes('desarrollo') ||
        lower.includes('web') ||
        lower.includes('app')
      ) {
        botResponse =
          'En **Ceibo Software** desarrollamos productos digitales de punta a punta:\n\n• **Software a Medida & SaaS**: Plataformas web escalables.\n• **Apps Móviles**: iOS y Android fluidas en React Native.\n• **Diseño UI/UX**: Interfaces modernas enfocadas en conversión.\n• **Cloud & Automatización**: Arquitecturas cloud, CI/CD e IA práctica.'
        chips = [
          { label: '⚡ Estimar proyecto', actionType: 'estimate' },
          { label: '🚀 Ver portfolio', actionType: 'navigate', payload: 'proyectos' },
          { label: '📝 Cotizar ahora', actionType: 'navigate', payload: 'contacto' },
        ]
      }
      // 3. Team inquiry
      else if (
        lower.includes('equipo') ||
        lower.includes('quienes son') ||
        lower.includes('staff') ||
        lower.includes('tomas') ||
        lower.includes('matias')
      ) {
        botResponse =
          'Nuestro equipo nuclear está compuesto por especialistas senior directos:\n\n• **Tomás Messineo** · DevOps & Cloud Infrastructure\n• **Matías Caubet** · Tech Lead & Arquitectura Go\n• **Juana Zabaleta** · Product & Design Lead UI/UX\n• **Sebastian Varas** · Cloud & Kubernetes\n• **Máximo Simonetti** · Frontend & React Specialist\n\nTrabajás directo con nosotros, sin intermediarios.'
        chips = [
          { label: '👥 Ver fichas completas', actionType: 'navigate', payload: 'equipo' },
          { label: '💬 Hablar con el equipo', actionType: 'navigate', payload: 'contacto' },
        ]
      }
      // 4. Estimation / Pricing
      else if (
        lower.includes('precio') ||
        lower.includes('costo') ||
        lower.includes('cotizar') ||
        lower.includes('cuanto') ||
        lower.includes('presupuesto')
      ) {
        botResponse =
          'Trabajamos con presupuestos adaptados al alcance de cada sprint. Podés estimar tu tiempo ahora mismo con nuestra calculadora interactiva:'
        chips = [
          { label: '⚡ Abrir calculadora', actionType: 'estimate' },
          { label: '💬 Hablar por WhatsApp', actionType: 'whatsapp' },
        ]
      }
      // 5. Default smart fallback
      else {
        botResponse =
          '¡Excelente pregunta! Diseñamos y desarrollamos soluciones digitales a medida de punta a punta. ¿Qué camino te gustaría explorar?'
        chips = [
          { label: '⚡ Estimar mi proyecto', actionType: 'estimate' },
          { label: '🚀 Ver proyectos reales', actionType: 'navigate', payload: 'proyectos' },
          { label: '💬 Chatear por WhatsApp', actionType: 'whatsapp' },
        ]
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: 'Ahora',
        actionChips: chips,
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
      sounds.playClick()
    }, 600)
  }

  const handleSelectEstimatorOption = (platform: string, weeks: string) => {
    sounds.playSuccess()
    setEstimatorStep({ platform, weeks })

    const confirmationMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'bot',
      text: `🎯 Para un desarrollo de **${platform}**, estimamos un tiempo de entrega de **${weeks}** con metodología ágil por sprints semanales.\n\n¿Te gustaría coordinar una reunión de 15 minutos para ver los detalles?`,
      time: 'Ahora',
      actionChips: [
        { label: '📝 Iniciar conversación', actionType: 'navigate', payload: 'contacto' },
        { label: '💬 WhatsApp directo', actionType: 'whatsapp' },
      ],
    }

    setMessages((prev) => [...prev, confirmationMsg])
  }

  const resetChat = () => {
    sounds.playSwitch()
    setMessages([initialBotMessage])
    setEstimatorStep(null)
  }

  const toggleChat = () => {
    sounds.playSwitch()
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
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={toggleChat}
          className="group relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white shadow-[0_6px_30px_rgba(225,29,72,0.5)] transition duration-300 hover:shadow-[0_8px_40px_rgba(225,29,72,0.7)]"
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
              Asistente Interactivo Ceibo 💬
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-4 bottom-24 z-50 mx-auto max-h-[620px] w-auto overflow-hidden rounded-3xl border border-white/15 bg-[#0e0e16]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:right-6 sm:left-auto sm:w-[410px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-rose-950/70 via-[#120b12] to-black px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 font-bold text-white shadow-md">
                  <Sparkles size={18} />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#0e0e16] bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">Ceibo AI Assistant</h3>
                    <span className="rounded bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-rose-300">
                      v2.0
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400">Interactivo · En línea</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Reset button */}
                <button
                  onClick={resetChat}
                  title="Reiniciar chat"
                  className="grid size-8 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  <RefreshCw size={15} />
                </button>

                {/* Close button */}
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
            <div className="h-[360px] space-y-3.5 overflow-y-auto p-4 text-xs leading-relaxed sm:text-sm">
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
                        className={`max-w-[88%] rounded-2xl px-4 py-3 whitespace-pre-line shadow-sm ${
                          isBot
                            ? 'border border-white/10 bg-white/[0.05] text-zinc-200'
                            : 'bg-rose-600 text-white font-medium'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>

                    {/* Interactive Estimator Widget */}
                    {m.widget === 'estimator' && (
                      <div className="mt-2.5 ml-9 w-[85%] rounded-2xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs space-y-2">
                        <span className="font-semibold text-rose-300 block text-[11px] uppercase tracking-wider">
                          Elegí la plataforma:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          <button
                            onClick={() => handleSelectEstimatorOption('Plataforma Web SaaS', '4 a 6 semanas')}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-left font-medium text-white transition hover:border-rose-500 hover:bg-rose-900/30"
                          >
                            <span>💻 Plataforma Web / SaaS</span>
                            <span className="text-[10px] text-zinc-400">~4-6 sem</span>
                          </button>
                          <button
                            onClick={() => handleSelectEstimatorOption('App Móvil iOS & Android', '6 a 8 semanas')}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-left font-medium text-white transition hover:border-rose-500 hover:bg-rose-900/30"
                          >
                            <span>📱 App Móvil (iOS & Android)</span>
                            <span className="text-[10px] text-zinc-400">~6-8 sem</span>
                          </button>
                          <button
                            onClick={() => handleSelectEstimatorOption('Sistema Cloud con IA', '3 a 5 semanas')}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-left font-medium text-white transition hover:border-rose-500 hover:bg-rose-900/30"
                          >
                            <span>🤖 Automatización o IA</span>
                            <span className="text-[10px] text-zinc-400">~3-5 sem</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Interactive Action Chips */}
                    {m.actionChips && m.actionChips.length > 0 && (
                      <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
                        {m.actionChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionChipClick(chip)}
                            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-rose-300 transition hover:scale-105 hover:border-rose-500/60 hover:bg-rose-950/40 hover:text-white"
                          >
                            <span>{chip.label}</span>
                            <ArrowUpRight size={11} className="opacity-70" />
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

            {/* Quick Actions Shortcuts */}
            <div className="border-t border-white/5 bg-black/40 px-3 py-2">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 px-1">
                <span className="font-mono uppercase tracking-wider">Atajos rápidos:</span>
                <span className="text-zinc-500">1-clic</span>
              </div>
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => handleActionChipClick({ label: '⚡ Estimar proyecto', actionType: 'estimate' })}
                  className="shrink-0 flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-950/30 px-2.5 py-1 text-[11px] font-semibold text-rose-300 transition hover:bg-rose-900/40 hover:text-white"
                >
                  <Calculator size={11} />
                  <span>Estimar idea</span>
                </button>
                <button
                  onClick={() => handleActionChipClick({ label: '🚀 Ver servicios', actionType: 'navigate', payload: 'servicios' })}
                  className="shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  <Layers size={11} />
                  <span>Servicios</span>
                </button>
                <button
                  onClick={() => handleActionChipClick({ label: '👥 Equipo', actionType: 'navigate', payload: 'equipo' })}
                  className="shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                  <Users size={11} />
                  <span>Equipo</span>
                </button>
                <button
                  onClick={() => handleActionChipClick({ label: '💬 WhatsApp', actionType: 'whatsapp' })}
                  className="shrink-0 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-900/40 hover:text-white"
                >
                  <Phone size={11} />
                  <span>WhatsApp</span>
                </button>
              </div>
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
