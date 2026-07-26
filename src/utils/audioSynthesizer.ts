// Web Audio API V12 / V10 Supercar Engine Sound Synthesizer

class EngineAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isRevving = false;
  private soundEnabled = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Play a procedural V12 Supercar Rev Effect
  public playV12Rev() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || this.isRevving) return;

    this.isRevving = true;
    const now = this.ctx.currentTime;

    // Main V12 fundamental oscillator (Sawtooth for raw engine rumble)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    subOsc.type = 'sine';

    // Filters for aggressive supercar intake & exhaust rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(4, now);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);

    // RPM Pitch envelope (Idle 80Hz -> Rev to 450Hz V12 scream -> Shift -> Rev -> Idle)
    osc1.frequency.setValueAtTime(90, now);
    osc1.frequency.exponentialRampToValueAtTime(380, now + 0.6); // 1st Rev
    osc1.frequency.setValueAtTime(220, now + 0.65); // Quick gear shift drop
    osc1.frequency.exponentialRampToValueAtTime(520, now + 1.2); // High V12 Redline!
    osc1.frequency.exponentialRampToValueAtTime(90, now + 2.1);  // Engine overrun return

    osc2.frequency.setValueAtTime(180, now);
    osc2.frequency.exponentialRampToValueAtTime(760, now + 0.6);
    osc2.frequency.setValueAtTime(440, now + 0.65);
    osc2.frequency.exponentialRampToValueAtTime(1040, now + 1.2);
    osc2.frequency.exponentialRampToValueAtTime(180, now + 2.1);

    subOsc.frequency.setValueAtTime(45, now);
    subOsc.frequency.exponentialRampToValueAtTime(190, now + 0.6);

    // Filter frequency follows RPM pitch
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.6);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.65);
    filter.frequency.exponentialRampToValueAtTime(4800, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(600, now + 2.1);

    // Gain envelope
    masterGain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    masterGain.gain.setValueAtTime(0.25, now + 1.3);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(masterGain);
    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + 2.3);
    osc2.stop(now + 2.3);
    subOsc.stop(now + 2.3);

    // Turbo Blowoff Valve Sound Effect at peak RPM (1.25s)
    setTimeout(() => {
      this.playTurboBlowoff();
    }, 1200);

    setTimeout(() => {
      this.isRevving = false;
    }, 2300);
  }

  // Turbo blowoff valve noise pulse
  public playTurboBlowoff() {
    if (!this.soundEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.35; // 350ms noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Futuristic UI Hover Click Sound
  public playClickSound() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const audioSynthesizer = new EngineAudioSynthesizer();
