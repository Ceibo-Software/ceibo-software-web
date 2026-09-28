'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, User, Bot, Check, ArrowRight, CornerDownLeft } from 'lucide-react'
import { sounds } from '@/lib/sound'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
}

const KNOWLEDGE_BASE: { keywords: string[]; response: string }[] = [
  {
    keywords: ['servicio', 'servicios', 'hacen', 'hace', 'que hacen', 'desarrollo', 'haceis'],
    response:
      'En Ceibo Software desarrollamos soluciones digitales completas:\n\n• **Software a medida**: Plataformas web y sistemas para optimizar tu empresa.\n• **Apps móviles**: Aplicaciones modernas e intuitivas para iOS y Android.\n• **Diseño UI/UX**: Interfaces visualmente atractivas y fáciles de usar.\n• **Automatización e IA**: Chatbots y flujos inteligentes para ahorrar tiempo.\n\n¿Te gustaría profundizar en alguno de estos?',
  },
  {
    keywords: ['tiempo', 'tardan', 'demora', 'plazos', 'duracion', 'cuanto tarda'],
    response:
      'Depende del tamaño del proyecto, pero trabajamos con metodología ágil por sprints:\n\n• **Un MVP (producto mínimo viable)** suele estar listo entre **4 y 6 semanas**.\n• **Proyectos más complejos o plataformas completas** toman entre **8 y 12 semanas**.\n\nLo mejor es que hacemos entregas semanales para que veas el avance real en todo momento.',
  },
  {
    keywords: ['proceso', 'metodologia', 'como trabajan', 'pasos', 'forma de trabajo'],
    response:
      'Nuestro proceso es 100% transparente y directo:\n\n1. **Descubrimiento**: Nos reunimos para entender tu negocio, definir requerimientos y diseñar la experiencia visual.\n2. **Desarrollo iterativo**: Construimos en sprints semanales con demos reales.\n3. **Lanzamiento & Acompañamiento**: Ponemos tu producto online y te brindamos soporte continuo.\n\n¡Sin intermediarios ni burocracia!',
  },
  {
    keywords: ['precio', 'costo', 'cotizar', 'presupuesto', 'cuanto cuesta', 'tarifa', 'cotizacion'],
    response:
      'Cada proyecto es único y adaptamos la propuesta a tu presupuesto y objetivos de negocio. Generalmente armamos paquetes por etapas para que puedas lanzar rápido y validar con clientes reales sin arriesgar de más.\n\nSi me dejas tu **email o WhatsApp**, el equipo de Ceibo se comunicará contigo hoy mismo con un presupuesto estimado sin compromiso.',
  },
  {
    keywords: ['hola', 'buenas', 'que tal', 'saludos', 'buen dia', 'buenas tardes'],
    response:
      '¡Hola! Qué gusto saludarte. ¿Estás pensando en desarrollar un producto digital, modernizar un sistema existente o tienes una idea de app?',
  },
]

export function CeiboChatbot({ isOpenExternal, onCloseExternal }: { isOpenExternal?: boolean; onCloseExternal?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! 👋 Soy el asistente virtual de **Ceibo Software**.\n¿En qué podemos ayudarte hoy?',
      time: 'Ahora',
    },
  ])

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

  const quickQuestions = [
    '¿Qué servicios ofrecen?',
    '¿Cuánto tardan en desarrollar un proyecto?',
    '¿Cómo es el proceso de trabajo?',
    'Quiero cotizar una idea',
  ]

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    sounds.playKey()

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Ahora',
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate smart bot thinking and typing
    setTimeout(() => {
      const lower = query.toLowerCase()
      let answer = ''

      // Check if user provided contact info
      if (lower.includes('@') || lower.match(/\b\d{8,}\b/)) {
        answer =
          '¡Perfecto! Hemos recibido tus datos de contacto con éxito. 🚀\nUn miembro de nuestro equipo te escribirá en menos de 24 horas para coordinar una llamada corta de 15 minutos.'
        sounds.playSuccess()
      } else {
        // Search knowledge base
        const match = KNOWLEDGE_BASE.find((item) =>
          item.keywords.some((kw) => lower.includes(kw))
        )

        if (match) {
          answer = match.response
        } else {
          answer =
            '¡Excelente consulta! Podemos ayudarte con eso. ¿Te gustaría agendar una breve llamada de 15 minutos con nuestro equipo, o prefieres dejarnos tu email o número para enviarte más información detallada?'
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: answer,
        time: 'Ahora',
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
      sounds.playClick()
    }, 600)
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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 bottom-24 z-50 mx-auto max-h-[580px] w-auto overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f15]/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:right-6 sm:left-auto sm:w-[380px]"
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

              <button
                onClick={toggleChat}
                className="grid size-8 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="h-[340px] space-y-3 overflow-y-auto p-4 text-xs leading-relaxed sm:text-sm">
              {messages.map((m) => {
                const isBot = m.sender === 'bot'
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                  >
                    {isBot && (
                      <div className="mt-1 grid size-7 place-items-center rounded-full bg-rose-950/70 text-rose-300 shrink-0">
                        <Bot size={14} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                        isBot
                          ? 'border border-white/10 bg-white/[0.05] text-zinc-200'
                          : 'bg-rose-600 text-white shadow-md'
                      }`}
                    >
                      {m.text}
                    </div>
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

            {/* Quick Questions Pills */}
            <div className="border-t border-white/5 bg-black/40 px-3 py-2">
              <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                Preguntas sugeridas:
              </p>
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-300 transition hover:border-rose-500/50 hover:bg-rose-950/20 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
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
                placeholder="Escribe tu mensaje o consulta..."
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
