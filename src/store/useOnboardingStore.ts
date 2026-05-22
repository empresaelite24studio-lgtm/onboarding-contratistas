import { create } from 'zustand';

export type Phase =
  | 'welcome' | 'story' | 'identity' | 'values'
  | 'expectations' | 'support' | 'voice' | 'legacy' | 'closing';

const PHASES: Phase[] = [
  'welcome','story','identity','values','expectations','support','voice','legacy','closing'
];

interface Store {
  name: string;
  phase: Phase;
  index: number;
  voiceText: string;
  pillars: string[];
  setName: (n: string) => void;
  setVoiceText: (t: string) => void;
  setPillars: (p: string[]) => void;
  next: () => void;
  prev: () => void;
}

export const useStore = create<Store>((set) => ({
  name: '',
  phase: 'welcome',
  index: 0,
  voiceText: '',
  pillars: [],
  setName: (name) => set({ name }),
  setVoiceText: (voiceText) => set({ voiceText }),
  setPillars: (pillars) => set({ pillars }),
  next: () => set((s) => {
    const i = Math.min(s.index + 1, PHASES.length - 1);
    return { index: i, phase: PHASES[i] };
  }),
  prev: () => set((s) => {
    const i = Math.max(s.index - 1, 0);
    return { index: i, phase: PHASES[i] };
  }),
}));
