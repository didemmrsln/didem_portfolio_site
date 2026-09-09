/**
 * Multi-Mode Atelier Audio Engine
 * Supports:
 * 1. 'ambient-drone': Generative Ambient & Warm Harmonic Soundscape (Eno / Yoshimura style) with warm drifting drones, overtone swells, analog tape flutter, and binaural depth.
 * 2. 'felt-piano': Neo-Classical Felt Piano (Nocturne in Dm) with felt-dampened hammer attack and room reverberation.
 */

export type SoundscapeMode = 'ambient-drone' | 'felt-piano';

interface TrackInfo {
  id: SoundscapeMode;
  title: string;
  genre: string;
  description: string;
}

export const TRACK_INFO_MAP: Record<SoundscapeMode, TrackInfo> = {
  'ambient-drone': {
    id: 'ambient-drone',
    title: 'Harmonic Horizon I (Warm Ambient)',
    genre: 'Generative Ambient & Analog Drone',
    description: 'Drifting sub-bass fundamentals, warm fifth/ninth overtone swells, and soft tape warmth for deep contemplative focus.',
  },
  'felt-piano': {
    id: 'felt-piano',
    title: 'Nocturne in D Minor (Felt Piano)',
    genre: 'Neo-Classical Felt Piano & Strings',
    description: 'Intimate felt piano arpeggios, gentle acoustic decay, and room reverberation.',
  },
};

class AtelierAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private volume = 0.65;
  private currentMode: SoundscapeMode = 'ambient-drone'; // Default to Generative Ambient
  private schedulerTimer: number | null = null;
  private ambientIntervalTimer: number | null = null;
  private currentStep = 0;
  private nextNoteTime = 0;
  private activeAmbientNodes: Array<{ stop: () => void }> = [];
  private onStateChangeListeners: Array<(isPlaying: boolean, volume: number, mode: SoundscapeMode) => void> = [];

  // ==========================================
  // 1. GENERATIVE AMBIENT DRONE ARCHITECTURE
  // ==========================================
  // Evolving modal chords (D Dorian / F Lydian / A Aeolian) with warm root, fifth, ninth, and eleventh overtones
  private ambientPitches = [
    // Low sub drone (Hz)
    [73.42, 110.0, 146.83, 220.0],       // D2, A2, D3, A3 (Grounding)
    [87.31, 130.81, 174.61, 261.63],     // F2, C3, F3, C4 (Warm Lydian)
    [98.0, 146.83, 196.0, 293.66],       // G2, D3, G3, D4 (Modal Suspended)
    [110.0, 164.81, 220.0, 329.63],      // A2, E3, A3, E4 (Reflective)
    [116.54, 174.61, 233.08, 349.23],    // Bb2, F3, Bb3, F4 (Floating)
  ];

  // High shimmer bells & harmonics
  private shimmerPitches = [
    440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5
  ];

  // ==========================================
  // 2. FELT PIANO ARCHITECTURE
  // ==========================================
  private pianoNotesMap: { [key: string]: number } = {
    D2: 73.42, F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, C3: 130.81,
    D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
    D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
    D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
  };

  private pianoScore = [
    {
      bass: 'D2',
      chord: ['A3', 'C4', 'E4', 'F4'],
      melody: [
        { note: 'A4', offset: 0.0, vel: 0.75, duration: 2.8 },
        { note: 'F4', offset: 1.0, vel: 0.60, duration: 2.0 },
        { note: 'E4', offset: 2.0, vel: 0.65, duration: 2.2 },
        { note: 'D4', offset: 3.0, vel: 0.70, duration: 3.5 },
      ],
      length: 4.0,
    },
    {
      bass: 'Bb2',
      chord: ['F3', 'A3', 'D4', 'F4'],
      melody: [
        { note: 'D5', offset: 0.0, vel: 0.78, duration: 2.5 },
        { note: 'C5', offset: 1.25, vel: 0.62, duration: 1.8 },
        { note: 'A4', offset: 2.25, vel: 0.68, duration: 2.2 },
        { note: 'F4', offset: 3.25, vel: 0.58, duration: 2.6 },
      ],
      length: 4.0,
    },
    {
      bass: 'F2',
      chord: ['C3', 'G3', 'A3', 'E4'],
      melody: [
        { note: 'G4', offset: 0.0, vel: 0.70, duration: 2.4 },
        { note: 'A4', offset: 1.0, vel: 0.75, duration: 2.0 },
        { note: 'C5', offset: 2.0, vel: 0.82, duration: 2.8 },
        { note: 'E5', offset: 3.0, vel: 0.72, duration: 3.2 },
      ],
      length: 4.0,
    },
    {
      bass: 'C3',
      chord: ['G3', 'C4', 'E4', 'G4'],
      melody: [
        { note: 'D5', offset: 0.0, vel: 0.74, duration: 2.2 },
        { note: 'C5', offset: 1.5, vel: 0.68, duration: 2.0 },
        { note: 'G4', offset: 2.75, vel: 0.60, duration: 3.0 },
      ],
      length: 4.0,
    },
    {
      bass: 'G2',
      chord: ['D3', 'Bb3', 'F4', 'A4'],
      melody: [
        { note: 'Bb4', offset: 0.0, vel: 0.72, duration: 2.6 },
        { note: 'A4', offset: 1.0, vel: 0.65, duration: 2.0 },
        { note: 'F4', offset: 2.0, vel: 0.68, duration: 2.4 },
        { note: 'D4', offset: 3.0, vel: 0.75, duration: 3.0 },
      ],
      length: 4.0,
    },
  ];

  private initAudio() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      // Reverb & Spatial Space
      const delayNode1 = this.ctx.createDelay();
      delayNode1.delayTime.setValueAtTime(0.48, this.ctx.currentTime);

      const delayNode2 = this.ctx.createDelay();
      delayNode2.delayTime.setValueAtTime(0.72, this.ctx.currentTime);

      const feedbackGain1 = this.ctx.createGain();
      feedbackGain1.gain.setValueAtTime(0.45, this.ctx.currentTime);

      const feedbackGain2 = this.ctx.createGain();
      feedbackGain2.gain.setValueAtTime(0.38, this.ctx.currentTime);

      const warmthFilter = this.ctx.createBiquadFilter();
      warmthFilter.type = 'lowpass';
      warmthFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
      warmthFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      delayNode1.connect(feedbackGain1);
      feedbackGain1.connect(delayNode1);
      feedbackGain1.connect(warmthFilter);

      delayNode2.connect(feedbackGain2);
      feedbackGain2.connect(delayNode2);
      feedbackGain2.connect(warmthFilter);

      warmthFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // -------------------------------------------------------------
  // GENERATIVE AMBIENT SOUNDSCAPE ENGINE
  // -------------------------------------------------------------
  private startAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;
    this.stopActiveAmbientNodes();

    let chordIndex = 0;

    const triggerNextSwell = () => {
      if (!this.isPlaying || this.currentMode !== 'ambient-drone' || !this.ctx || !this.masterGain) return;

      const chord = this.ambientPitches[chordIndex % this.ambientPitches.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      const attackTime = 4.5 + Math.random() * 2.0;
      const sustainTime = 6.0 + Math.random() * 3.0;
      const releaseTime = 5.5 + Math.random() * 2.0;
      const totalDuration = attackTime + sustainTime + releaseTime;

      // Swell nodes container
      const nodeHolders: Array<{ osc: OscillatorNode; gain: GainNode }> = [];

      // 1. Play warm harmonic drones for the chord
      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Waveform: Sine for sub, triangle with slight detuning for richness
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now);

        // Lowpass filter swell
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);
        filter.frequency.linearRampToValueAtTime(850 + idx * 200, now + attackTime);
        filter.frequency.linearRampToValueAtTime(250, now + totalDuration);

        // Gentle volume swell curve
        const baseGain = (idx === 0 ? 0.22 : 0.12) * this.volume;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(baseGain, now + attackTime);
        gain.gain.setValueAtTime(baseGain, now + attackTime + sustainTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + totalDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + totalDuration + 0.2);

        nodeHolders.push({ osc, gain });
      });

      // 2. High Shimmer Glass harmonic bell (sporadic, subtle)
      if (Math.random() > 0.3) {
        const shimmerFreq = this.shimmerPitches[Math.floor(Math.random() * this.shimmerPitches.length)];
        const shimOsc = this.ctx.createOscillator();
        const shimGain = this.ctx.createGain();
        const shimFilter = this.ctx.createBiquadFilter();

        shimOsc.type = 'sine';
        shimOsc.frequency.setValueAtTime(shimmerFreq, now + 1.5);

        shimFilter.type = 'bandpass';
        shimFilter.frequency.setValueAtTime(shimmerFreq, now + 1.5);
        shimFilter.Q.setValueAtTime(3.0, now + 1.5);

        const shimVol = 0.045 * this.volume;
        shimGain.gain.setValueAtTime(0.0001, now + 1.5);
        shimGain.gain.linearRampToValueAtTime(shimVol, now + 3.0);
        shimGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

        shimOsc.connect(shimFilter);
        shimFilter.connect(shimGain);
        shimGain.connect(this.masterGain);

        shimOsc.start(now + 1.5);
        shimOsc.stop(now + 7.8);
      }

      this.activeAmbientNodes.push({
        stop: () => {
          nodeHolders.forEach(({ osc, gain }) => {
            try {
              gain.gain.linearRampToValueAtTime(0.0001, (this.ctx?.currentTime || 0) + 0.5);
              osc.stop((this.ctx?.currentTime || 0) + 0.6);
            } catch (e) {
              // ignore if already stopped
            }
          });
        },
      });

      // Schedule overlapping next swell
      const nextInterval = (attackTime + sustainTime) * 1000 * 0.75;
      this.ambientIntervalTimer = window.setTimeout(triggerNextSwell, nextInterval);
    };

    triggerNextSwell();
  }

  private stopActiveAmbientNodes() {
    if (this.ambientIntervalTimer) {
      clearTimeout(this.ambientIntervalTimer);
      this.ambientIntervalTimer = null;
    }
    this.activeAmbientNodes.forEach((node) => node.stop());
    this.activeAmbientNodes = [];
  }

  // -------------------------------------------------------------
  // FELT PIANO ENGINE
  // -------------------------------------------------------------
  private playFeltNote(freq: number, startTime: number, velocity = 0.7, duration = 2.5) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    osc2.detune.setValueAtTime((Math.random() - 0.5) * 4, startTime);

    const noteFilter = this.ctx.createBiquadFilter();
    noteFilter.type = 'lowpass';
    const cutoff = Math.min(2000, freq * 3.2 + 350);
    noteFilter.frequency.setValueAtTime(cutoff, startTime);
    noteFilter.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 1.1), startTime + duration);

    const noteGain = this.ctx.createGain();
    const peakGain = 0.18 * velocity * this.volume;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.028);
    noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.45, startTime + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteFilter);
    osc2.connect(noteFilter);
    noteFilter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  private scheduleNextPianoSegment() {
    if (!this.isPlaying || this.currentMode !== 'felt-piano' || !this.ctx) return;

    const beatDuration = 1.35;
    const lookahead = 0.5;

    while (this.nextNoteTime < this.ctx.currentTime + lookahead) {
      const pattern = this.pianoScore[this.currentStep % this.pianoScore.length];
      const segmentStart = this.nextNoteTime;

      if (pattern.bass && this.pianoNotesMap[pattern.bass]) {
        this.playFeltNote(
          this.pianoNotesMap[pattern.bass],
          segmentStart,
          0.85,
          pattern.length * beatDuration * 1.1
        );
      }

      pattern.chord.forEach((noteName, idx) => {
        if (this.pianoNotesMap[noteName]) {
          const chordOffset = 0.08 * idx;
          this.playFeltNote(
            this.pianoNotesMap[noteName],
            segmentStart + chordOffset,
            0.55 - idx * 0.04,
            pattern.length * beatDuration * 0.8
          );
        }
      });

      pattern.melody.forEach((melItem) => {
        if (this.pianoNotesMap[melItem.note]) {
          const noteTime = segmentStart + melItem.offset * beatDuration;
          this.playFeltNote(
            this.pianoNotesMap[melItem.note],
            noteTime,
            melItem.vel,
            melItem.duration * beatDuration
          );
        }
      });

      this.nextNoteTime += pattern.length * beatDuration;
      this.currentStep = (this.currentStep + 1) % this.pianoScore.length;
    }

    this.schedulerTimer = window.setTimeout(() => {
      this.scheduleNextPianoSegment();
    }, 250);
  }

  // -------------------------------------------------------------
  // PLAYBACK CONTROLS & STATE MANAGEMENT
  // -------------------------------------------------------------
  public setMode(newMode: SoundscapeMode) {
    if (this.currentMode === newMode) return;
    this.currentMode = newMode;

    if (this.isPlaying) {
      // Cleanly transition to new mode
      this.stopActiveAmbientNodes();
      if (this.schedulerTimer) {
        clearTimeout(this.schedulerTimer);
        this.schedulerTimer = null;
      }

      if (newMode === 'ambient-drone') {
        this.startAmbientDrone();
      } else {
        if (this.ctx) {
          this.nextNoteTime = this.ctx.currentTime + 0.1;
        }
        this.scheduleNextPianoSegment();
      }
    }
    this.notifyListeners();
  }

  public getMode(): SoundscapeMode {
    return this.currentMode;
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initAudio();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;

    // Smooth fade in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.4);

    if (this.currentMode === 'ambient-drone') {
      this.startAmbientDrone();
    } else {
      this.nextNoteTime = this.ctx.currentTime + 0.1;
      this.scheduleNextPianoSegment();
    }

    this.notifyListeners();
  }

  public pause() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.notifyListeners();
      return;
    }

    // Smooth fade out
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

    setTimeout(() => {
      this.stopActiveAmbientNodes();
      if (this.schedulerTimer) {
        clearTimeout(this.schedulerTimer);
        this.schedulerTimer = null;
      }
    }, 950);

    this.isPlaying = false;
    this.notifyListeners();
  }

  public setVolume(newVol: number) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
    this.notifyListeners();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public subscribe(listener: (isPlaying: boolean, volume: number, mode: SoundscapeMode) => void) {
    this.onStateChangeListeners.push(listener);
    listener(this.isPlaying, this.volume, this.currentMode);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.onStateChangeListeners.forEach((l) => l(this.isPlaying, this.volume, this.currentMode));
  }
}

export const atelierAudio = new AtelierAudioEngine();
