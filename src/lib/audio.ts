/**
 * Moteur Audio Web Audio API & Retours Haptiques
 * Synthétisé en temps réel : 0 fichier MP3 lourd, 0 latence réseau,
 * 100% compatible iOS Safari & Android, contrôlé par préférence utilisateur.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticEnabled: boolean = true;

  constructor() {
    // Récupérer la préférence sauvegardée
    try {
      const saved = localStorage.getItem('erudit_sound_enabled');
      if (saved !== null) {
        this.soundEnabled = saved === 'true';
      }
      const savedHaptic = localStorage.getItem('erudit_haptic_enabled');
      if (savedHaptic !== null) {
        this.hapticEnabled = savedHaptic === 'true';
      }
    } catch {
      // LocalStorage non accessible en sandboxing
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    try {
      localStorage.setItem('erudit_sound_enabled', String(enabled));
    } catch {}
  }

  public isHapticEnabled(): boolean {
    return this.hapticEnabled;
  }

  public setHapticEnabled(enabled: boolean) {
    this.hapticEnabled = enabled;
    try {
      localStorage.setItem('erudit_haptic_enabled', String(enabled));
    } catch {}
  }

  /**
   * Retour haptique sécurisé (vérification 'vibrate' in navigator pour iOS)
   */
  public triggerHaptic(type: 'success' | 'error' | 'tap' | 'streak' = 'tap') {
    if (!this.hapticEnabled || typeof navigator === 'undefined' || !('vibrate' in navigator)) {
      return;
    }
    try {
      if (type === 'tap') {
        navigator.vibrate(10);
      } else if (type === 'success') {
        navigator.vibrate([15, 30, 20]);
      } else if (type === 'error') {
        navigator.vibrate([30, 40, 30]);
      } else if (type === 'streak') {
        navigator.vibrate([20, 30, 20, 30, 40]);
      }
    } catch {}
  }

  /**
   * Son Bonne Réponse (Accord cristallin Do-Mi ascendant, 140ms)
   */
  public playSuccess() {
    this.triggerHaptic('success');
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Note 1 (Do5 - 523.25 Hz)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Note 2 (Mi5 - 659.25 Hz)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.06);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.14, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.22);
  }

  /**
   * Son Mauvaise Réponse (Onde feutrée basse descendante 220Hz -> 180Hz)
   */
  public playError() {
    this.triggerHaptic('error');
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(170, now + 0.18);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * Son Tap / Clic discret (micro-impulsion feutrée 15ms)
   */
  public playTap() {
    this.triggerHaptic('tap');
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.02);
  }

  /**
   * Son Célébration / Niveau / Streak (Carillon d'érudition)
   */
  public playStreak() {
    this.triggerHaptic('streak');
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // Do5, Mi5, Sol5, Do6
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }
}

export const sound = new SoundEngine();
