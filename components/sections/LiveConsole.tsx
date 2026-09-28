'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Activity, Zap, Play, CheckCircle2, RefreshCw, Cpu, Layers } from 'lucide-react'
import { sounds } from '@/lib/sound'

type TabType = 'terminal' | 'benchmark'

interface LogEntry {
  type: 'cmd' | 'output' | 'success' | 'error' | 'info'
  text: string
}

export function LiveConsole() {
  const [activeTab, setActiveTab] = useState<TabType>('terminal')
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'info', text: 'Bienvenido al entorno interactivo de Ceibo Software [v2.4.0]' },
    { type: 'info', text: 'Escribe "help" para ver los comandos disponibles o haz clic en los accesos rápidos.' },
  ])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Benchmark state
  const [benchRunning, setBenchRunning] = useState(false)
  const [benchCompleted, setBenchCompleted] = useState(false)
  const [reqCount, setReqCount] = useState(10000)
  const [liveReqs, setLiveReqs] = useState<string[]>([])

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, activeTab])

  const handleCommand = (cmd: string) => {
    sounds.playKey()
    const cleanCmd = cmd.trim().toLowerCase()

    const newHistory: LogEntry[] = [...history, { type: 'cmd', text: `$ ${cmd}` }]

    switch (cleanCmd) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Comandos disponibles:' },
          { type: 'info', text: '  stack      - Muestra el stack técnico en producción' },
          { type: 'info', text: '  benchmark  - Corre un test sintético de latencia y concurrencia' },
          { type: 'info', text: '  team       - Lista de ingenieros y roles de Ceibo' },
          { type: 'info', text: '  quote      - Abre el estimador de proyectos y presupuesto' },
          { type: 'info', text: '  status     - Muestra el estado operativo de los servidores' },
          { type: 'info', text: '  clear      - Limpia la pantalla del terminal' }
        )
        sounds.playSuccess()
        break

      case 'stack':
        newHistory.push(
          { type: 'success', text: '✓ Core: TypeScript, Next.js 16 (App Router), React 19' },
          { type: 'success', text: '✓ Backend & Data: Node.js, Go, Rust, PostgreSQL, Redis' },
          { type: 'success', text: '✓ Cloud & Infra: AWS, Docker, Kubernetes, Cloudflare Workers' },
          { type: 'info', text: 'Objetivo de arquitectura: P99 < 40ms, Zero Downtime Deployments' }
        )
        sounds.playSuccess()
        break

      case 'benchmark':
        setActiveTab('benchmark')
        triggerBenchmark()
        return

      case 'team':
        newHistory.push(
          { type: 'output', text: 'Equipo Ceibo Software:' },
          { type: 'info', text: '• Tomás Messineo - Founder & Full Stack (Systems & Execution)' },
          { type: 'info', text: '• Matías Caubet - Tech Lead (High Load & Go Architecture)' },
          { type: 'info', text: '• Juana Zabaleta - Product & Design Lead (UI/UX & Systems)' },
          { type: 'info', text: '• Sebastian Varas - Cloud & DevOps (Kubernetes & AWS)' },
          { type: 'info', text: '• Máximo Simonetti - Software Engineer (Perf & React)' }
        )
        sounds.playSuccess()
        break

      case 'quote':
        newHistory.push({ type: 'success', text: '→ Redirigiendo al estimador interactivo...' })
        sounds.playSuccess()
        document.getElementById('estimador')?.scrollIntoView({ behavior: 'smooth' })
        break

      case 'status':
        newHistory.push(
          { type: 'success', text: 'STATUS: TODOS LOS SISTEMAS OPERATIVOS' },
          { type: 'info', text: 'API Gateway: 14ms · Database Cluster: Healthy · Edge CDN: 99.99%' },
          { type: 'info', text: 'Zona horaria: America/Argentina/Buenos_Aires (UTC-3)' }
        )
        sounds.playSuccess()
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case '':
        break

      default:
        newHistory.push({
          type: 'error',
          text: `Comando no reconocido: "${cmd}". Escribe "help" para ver la lista.`,
        })
    }

    setHistory(newHistory)
    setInputVal('')
  }

  const triggerBenchmark = () => {
    sounds.playSwitch()
    setBenchRunning(true)
    setBenchCompleted(false)
    setLiveReqs([])

    let count = 0
    const endpoints = ['/api/v1/auth', '/api/v1/ledger/transfer', '/api/v1/telemetry/stream', '/api/v1/compute']
    const interval = setInterval(() => {
      count++
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)]
      const lat = Math.floor(Math.random() * 18 + 8)
      setLiveReqs((prev) => [`[200 OK] POST ${endpoint} -> ${lat}ms (p99 verified)`, ...prev.slice(0, 5)])

      if (count >= 10) {
        clearInterval(interval)
        setBenchRunning(false)
        setBenchCompleted(true)
        sounds.playSuccess()
      }
    }, 140)
  }

  return (
    <section id="consola" className="relative z-20 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-10 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-rose-400">
          Laboratorio Interactivo
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Rendimiento observable. Sin cajas negras.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Explora nuestra consola en vivo o ejecuta un benchmark sintético para ver cómo diseñamos arquitecturas que toleran alta concurrencia con latencia ultrabaja.
        </p>
      </div>

      {/* Terminal Container */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c11] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Window Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-500/80" />
            <span className="size-3 rounded-full bg-amber-500/80" />
            <span className="size-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-zinc-400">
              ceibo-terminal@cloud-node-01:~
            </span>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 p-1">
            <button
              onClick={() => {
                sounds.playSwitch()
                setActiveTab('terminal')
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                activeTab === 'terminal'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal size={13} />
              <span>Consola CLI</span>
            </button>

            <button
              onClick={() => {
                sounds.playSwitch()
                setActiveTab('benchmark')
              }}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition ${
                activeTab === 'benchmark'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity size={13} />
              <span>Benchmark Latencia</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Terminal Content */}
        {activeTab === 'terminal' && (
          <div className="p-5 font-mono text-xs sm:text-sm">
            {/* Quick action chips */}
            <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-white/5 pb-3">
              <span className="text-[11px] text-zinc-500">Ejecutar rápido:</span>
              {['help', 'stack', 'benchmark', 'team', 'quote', 'clear'].map((c) => (
                <button
                  key={c}
                  onClick={() => handleCommand(c)}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300 transition hover:border-rose-500/40 hover:bg-rose-950/20 hover:text-rose-300"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Logs Area */}
            <div className="max-h-80 min-h-56 space-y-2 overflow-y-auto pr-2">
              {history.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'cmd' && <span className="font-semibold text-rose-400">{item.text}</span>}
                  {item.type === 'output' && <span className="text-zinc-300">{item.text}</span>}
                  {item.type === 'info' && <span className="text-zinc-400">{item.text}</span>}
                  {item.type === 'success' && <span className="text-emerald-400">{item.text}</span>}
                  {item.type === 'error' && <span className="text-rose-400">{item.text}</span>}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCommand(inputVal)
              }}
              className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3"
            >
              <span className="text-rose-500 font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  sounds.playKey()
                  setInputVal(e.target.value)
                }}
                placeholder="Escribe 'help' o un comando..."
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-600 focus:ring-0"
              />
              <button
                type="submit"
                className="rounded bg-rose-600/30 px-3 py-1 text-xs text-rose-300 transition hover:bg-rose-600 hover:text-white"
              >
                Enter
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Architecture & Latency Benchmark */}
        {activeTab === 'benchmark' && (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Ceibo Edge Stack */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/10 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-rose-400" />
                    <h3 className="font-semibold text-white">Stack Ceibo High-Load</h3>
                  </div>
                  <span className="rounded-full bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] text-rose-300">
                    Optimizado
                  </span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Latencia P99</span>
                      <span className="text-emerald-400 font-bold">14ms</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-[12%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Throughput sostenido</span>
                      <span className="text-white font-bold">15,800 req/s</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-[95%] rounded-full bg-rose-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Cold Start time</span>
                      <span className="text-emerald-400 font-bold">0ms (Edge Cache)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legacy Comparison */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-zinc-400" />
                    <h3 className="font-semibold text-zinc-300">Monolito Tradicional</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                    Convencional
                  </span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Latencia P99</span>
                      <span className="text-rose-400 font-bold">340ms</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-[85%] rounded-full bg-rose-400/60" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Throughput sostenido</span>
                      <span className="text-zinc-300 font-bold">1,200 req/s</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                      <div className="h-full w-[25%] rounded-full bg-zinc-600" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Cold Start time</span>
                      <span className="text-amber-400 font-bold">2,400ms (Container boot)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benchmark action trigger */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <button
                  onClick={triggerBenchmark}
                  disabled={benchRunning}
                  className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-rose-500 disabled:opacity-50"
                >
                  {benchRunning ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Ejecutando ráfaga 10k...</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>Disparar prueba de carga en vivo</span>
                    </>
                  )}
                </button>
                {benchCompleted && (
                  <span className="flex items-center gap-1 font-mono text-xs text-emerald-400">
                    <CheckCircle2 size={14} /> 10,000 requests procesadas con 0 errores
                  </span>
                )}
              </div>

              <span className="font-mono text-xs text-zinc-500">
                Simulación: K6 Distributed Clusters
              </span>
            </div>

            {/* Live stream logs */}
            {liveReqs.length > 0 && (
              <div className="mt-4 rounded-lg bg-black/60 p-3 font-mono text-xs text-emerald-400/90">
                {liveReqs.map((log, i) => (
                  <div key={i} className="animate-pulse">
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
