import { create } from 'zustand';
import type { ProfileInput, NumerologyProfile, NumerologySystem } from '@numeron/core';
import { generateAllSystemProfiles } from '@numeron/core';

type Theme = 'phosphor' | 'arcane' | 'high-contrast';

interface NumeronState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Accessibility
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  readableFont: boolean;
  setReadableFont: (v: boolean) => void;

  // Disclaimer
  disclaimerAcknowledged: boolean;
  acknowledgeDisclaimer: () => void;

  // Chaos mode (Konami code)
  chaosMode: boolean;
  activateChaosMode: () => void;

  // Profile
  profileInput: ProfileInput | null;
  profiles: Record<NumerologySystem, NumerologyProfile> | null;
  activeSystem: NumerologySystem;
  setActiveSystem: (s: NumerologySystem) => void;
  generateProfiles: (input: ProfileInput) => void;
  clearProfile: () => void;
}

export const useStore = create<NumeronState>((set) => ({
  theme: 'phosphor',
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  reduceMotion: false,
  setReduceMotion: (v) => {
    if (v) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    set({ reduceMotion: v });
  },

  readableFont: false,
  setReadableFont: (v) => {
    if (v) {
      document.documentElement.classList.add('font-readable');
    } else {
      document.documentElement.classList.remove('font-readable');
    }
    set({ readableFont: v });
  },

  chaosMode: false,
  activateChaosMode: () => set({ chaosMode: true }),

  disclaimerAcknowledged: localStorage.getItem('numeron-disclaimer') === 'true',
  acknowledgeDisclaimer: () => {
    localStorage.setItem('numeron-disclaimer', 'true');
    set({ disclaimerAcknowledged: true });
  },

  profileInput: null,
  profiles: null,
  activeSystem: 'pythagorean',
  setActiveSystem: (s) => set({ activeSystem: s }),

  generateProfiles: (input) => {
    const profiles = generateAllSystemProfiles(input);
    set({ profileInput: input, profiles });
  },

  clearProfile: () => set({ profileInput: null, profiles: null }),
}));
