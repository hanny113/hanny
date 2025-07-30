
let audioContext: AudioContext | null = null;

// Initialize the AudioContext on a user gesture (like a click)
export const init = () => {
  if (audioContext && audioContext.state !== 'closed') return;
  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch (e) {
    console.error("Web Audio API is not supported in this browser.");
    audioContext = null;
  }
};

const playNote = (
  frequency: number, 
  startTime: number, 
  duration: number, 
  type: OscillatorType = 'square',
  volume: number = 0.3
) => {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  gainNode.connect(audioContext.destination);
  oscillator.connect(gainNode);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  // Volume envelope
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

// A simple, short click for selection
export const playSelectSound = () => {
  if (!audioContext) return;
  playNote(660, audioContext.currentTime, 0.08, 'triangle', 0.2);
};

// A positive, upward sound for confirmation/start
export const playConfirmSound = () => {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  playNote(440, now, 0.1, 'sine', 0.3); // A4
  playNote(587.33, now + 0.1, 0.15, 'sine', 0.3); // D5
};

// A longer, more pleasant sound for success
export const playSuccessSound = () => {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  playNote(523.25, now, 0.1, 'sine', 0.3); // C5
  playNote(659.25, now + 0.1, 0.1, 'sine', 0.3); // E5
  playNote(783.99, now + 0.2, 0.2, 'sine', 0.4); // G5
};

// A dissonant, downward sound for errors
export const playErrorSound = () => {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  playNote(220, now, 0.2, 'sawtooth', 0.25);
  playNote(207.65, now + 0.05, 0.2, 'sawtooth', 0.25); // A3 -> G#3
};

// A buzzing, building sound for generation
export const playGenerateSound = () => {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  playNote(110, now, 0.3, 'sawtooth', 0.15);
  playNote(115, now + 0.05, 0.3, 'sawtooth', 0.15);
};
