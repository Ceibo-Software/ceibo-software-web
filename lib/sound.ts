/**
 * Motor de audio háptico minimalista basado en la Web Audio API nativa.
 * Sin dependencias externas, peso 0KB y latencia instantánea.
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false
  private listeners: ((muted: boolean) => void)[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ceibo_sound_muted')
      // Default to muted so we don't surprise the user, but easily un-mutable
      this.isMuted = saved !== null ? saved === 'true' : true
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
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
    this.listeners.forEach((fn) => fn(muted))
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted)
    if (!this.isMuted) {
      this.playSuccess()
    }
    return this.isMuted
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
