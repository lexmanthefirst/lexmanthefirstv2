// High-performance tactile audio synthesis using Web Audio API

class AudioHelper {
  private isMuted: boolean = true
  private ctx: AudioContext | null = null

  constructor() {
    const stored = localStorage.getItem('site_audio_muted')
    if (stored !== null) {
      this.isMuted = stored === 'true'
    } else {
      this.isMuted = true // Default muted
      localStorage.setItem('site_audio_muted', 'true')
    }
  }

  public getMuteState(): boolean {
    return this.isMuted
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    localStorage.setItem('site_audio_muted', String(this.isMuted))
    return this.isMuted
  }

  private initAudio(): AudioContext | null {
    if (this.ctx) return this.ctx
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      this.ctx = new AudioCtx()
      return this.ctx
    } catch (e) {
      return null
    }
  }

  public playClick(): void {
    if (this.isMuted) return
    const ctx = this.initAudio()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'triangle'
    // Quick pitch slide from 2200Hz down to 700Hz to synthesize a tactile mouse click tick
    osc.frequency.setValueAtTime(2200, now)
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.015)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015)

    osc.start(now)
    osc.stop(now + 0.015)
  }
}

export const audio = new AudioHelper()
