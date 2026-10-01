/**
 * Motor de audio háptico minimalista basado en la Web Audio API nativa.
 * Sin dependencias externas, peso 0KB y latencia instantánea.
 */

class NatureAmbient {
  private ctx: AudioContext
  private masterGain: GainNode | null = null
  private isRunning: boolean = false
  private birdTimer: ReturnType<typeof setTimeout> | null = null
  private noiseSource: AudioBufferSourceNode | null = null
  private lfo: OscillatorNode | null = null

  constructor(ctx: AudioContext) {
    this.ctx = ctx
  }

  public start() {
    if (this.isRunning) return
    this.isRunning = true

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const now = this.ctx.currentTime

      // Ganancia maestra con fundido suave de entrada (fade-in)
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0.0001, now)
      this.masterGain.gain.exponentialRampToValueAtTime(0.075, now + 1.8)
      this.masterGain.connect(this.ctx.destination)

      // 1. Viento orgánico y susurro de hojas mediante buffer de ruido rosa estéreo (4s en bucle)
      const sampleRate = this.ctx.sampleRate
      const bufferSize = sampleRate * 4
      const noiseBuffer = this.ctx.createBuffer(2, bufferSize, sampleRate)
      const leftChannel = noiseBuffer.getChannelData(0)
      const rightChannel = noiseBuffer.getChannelData(1)

      let b0L = 0, b1L = 0, b2L = 0, b3L = 0, b4L = 0, b5L = 0, b6L = 0
      let b0R = 0, b1R = 0, b2R = 0, b3R = 0, b4R = 0, b5R = 0, b6R = 0

      for (let i = 0; i < bufferSize; i++) {
        const whiteL = Math.random() * 2 - 1
        b0L = 0.99886 * b0L + whiteL * 0.0555179
        b1L = 0.99332 * b1L + whiteL * 0.0750759
        b2L = 0.96900 * b2L + whiteL * 0.1538520
        b3L = 0.86650 * b3L + whiteL * 0.3104856
        b4L = 0.55000 * b4L + whiteL * 0.5329522
        b5L = -0.7616 * b5L - whiteL * 0.0168980
        leftChannel[i] = (b0L + b1L + b2L + b3L + b4L + b5L + b6L + whiteL * 0.5362) * 0.05
        b6L = whiteL * 0.115926

        const whiteR = Math.random() * 2 - 1
        b0R = 0.99886 * b0R + whiteR * 0.0555179
        b1R = 0.99332 * b1R + whiteR * 0.0750759
        b2R = 0.96900 * b2R + whiteR * 0.1538520
        b3R = 0.86650 * b3R + whiteR * 0.3104856
        b4R = 0.55000 * b4R + whiteR * 0.5329522
        b5R = -0.7616 * b5R - whiteR * 0.0168980
        rightChannel[i] = (b0R + b1R + b2R + b3R + b4R + b5R + b6R + whiteR * 0.5362) * 0.05
        b6R = whiteR * 0.115926
      }

      this.noiseSource = this.ctx.createBufferSource()
      this.noiseSource.buffer = noiseBuffer
      this.noiseSource.loop = true

      // Filtro paso bajo modulado por LFO (brisa cálida oscilando a 0.08Hz)
      const windFilter = this.ctx.createBiquadFilter()
      windFilter.type = 'lowpass'
      windFilter.frequency.setValueAtTime(300, now)

      this.lfo = this.ctx.createOscillator()
      this.lfo.frequency.setValueAtTime(0.08, now)
      const lfoGain = this.ctx.createGain()
      lfoGain.gain.setValueAtTime(130, now)
      this.lfo.connect(lfoGain)
      lfoGain.connect(windFilter.frequency)
      this.lfo.start()

      // Filtro paso banda para el follaje y hojas (~1100Hz)
      const leavesFilter = this.ctx.createBiquadFilter()
      leavesFilter.type = 'bandpass'
      leavesFilter.frequency.setValueAtTime(1100, now)
      leavesFilter.Q.setValueAtTime(1.5, now)

      const leavesGain = this.ctx.createGain()
      leavesGain.gain.setValueAtTime(0.3, now)

      this.noiseSource.connect(windFilter)
      windFilter.connect(this.masterGain)

      this.noiseSource.connect(leavesFilter)
      leavesFilter.connect(leavesGain)
      leavesGain.connect(this.masterGain)

      this.noiseSource.start()

      // 2. Programar canto sutil de aves del monte
      this.scheduleNextBird()
    } catch {
      // Audio context safe fail
    }
  }

  private scheduleNextBird() {
    if (!this.isRunning) return
    const delay = 4500 + Math.random() * 5500
    this.birdTimer = setTimeout(() => {
      if (!this.isRunning) return
      this.playBirdSong()
      this.scheduleNextBird()
    }, delay)
  }

  private playBirdSong() {
    if (!this.isRunning || !this.masterGain) return
    try {
      const now = this.ctx.currentTime
      const chirps = 2 + Math.floor(Math.random() * 3)
      const baseFreq = 2600 + Math.random() * 900
      const pan = (Math.random() - 0.5) * 1.2

      for (let i = 0; i < chirps; i++) {
        const chirpStart = now + i * (0.11 + Math.random() * 0.08)
        const chirpLen = 0.065 + Math.random() * 0.04

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'

        const freqShift = (Math.random() - 0.5) * 300
        osc.frequency.setValueAtTime(baseFreq + freqShift, chirpStart)
        osc.frequency.exponentialRampToValueAtTime(
          baseFreq + 500 + freqShift,
          chirpStart + chirpLen * 0.45
        )
        osc.frequency.exponentialRampToValueAtTime(
          baseFreq - 150 + freqShift,
          chirpStart + chirpLen
        )

        gain.gain.setValueAtTime(0.0001, chirpStart)
        gain.gain.linearRampToValueAtTime(0.016, chirpStart + chirpLen * 0.25)
        gain.gain.exponentialRampToValueAtTime(0.0001, chirpStart + chirpLen)

        if (typeof this.ctx.createStereoPanner === 'function') {
          const panner = this.ctx.createStereoPanner()
          panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), chirpStart)
          osc.connect(gain)
          gain.connect(panner)
          panner.connect(this.masterGain)
        } else {
          osc.connect(gain)
          gain.connect(this.masterGain)
        }

        osc.start(chirpStart)
        osc.stop(chirpStart + chirpLen + 0.02)
      }
    } catch {
      // safe fail
    }
  }

  public stop() {
    if (!this.isRunning) return
    this.isRunning = false

    if (this.birdTimer) {
      clearTimeout(this.birdTimer)
      this.birdTimer = null
    }

    if (this.masterGain) {
      try {
        const now = this.ctx.currentTime
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

        setTimeout(() => {
          try {
            if (this.noiseSource) {
              this.noiseSource.stop()
              this.noiseSource.disconnect()
              this.noiseSource = null
            }
            if (this.lfo) {
              this.lfo.stop()
              this.lfo.disconnect()
              this.lfo = null
            }
            if (this.masterGain) {
              this.masterGain.disconnect()
              this.masterGain = null
            }
          } catch {
            // cleanup safe fail
          }
        }, 1300)
      } catch {
        // safe fail
      }
    }
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = true
  private listeners: ((muted: boolean) => void)[] = []
  private natureAmbient: NatureAmbient | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ceibo_sound_muted')
      this.isMuted = saved !== null ? saved === 'true' : true
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.natureAmbient = new NatureAmbient(this.ctx)
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('ceibo_sound_muted', String(muted))
    }

    if (!muted) {
      this.initContext()
      this.natureAmbient?.start()
    } else {
      this.natureAmbient?.stop()
    }

    this.listeners.forEach((fn) => fn(muted))
  }

  public toggleMute(): boolean {
    const nextMuted = !this.isMuted
    this.setMuted(nextMuted)
    if (!nextMuted) {
      this.playSuccess()
    }
    return nextMuted
  }

  public subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.push(fn)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  /**
   * Clic táctil sutil para botones y enlaces
   */
  public playClick() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Audio context policy safe fail
    }
  }

  /**
   * Sonido de tipeo o tecla de terminal
   */
  public playKey() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800 + Math.random() * 200, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.025)

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.025)
    } catch {
      // safe fail
    }
  }

  /**
   * Sonido de interruptor / toggle
   */
  public playSwitch() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(450, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.06)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.06)
    } catch {
      // safe fail
    }
  }

  /**
   * Acorde suave de confirmación / éxito
   */
  public playSuccess() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5

      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.05)

        gain.gain.setValueAtTime(0.03, now + idx * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.2)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.05)
        osc.stop(now + idx * 0.05 + 0.2)
      })
    } catch {
      // safe fail
    }
  }
}

export const sounds = new SoundEngine()
