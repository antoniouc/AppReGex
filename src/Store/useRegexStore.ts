// src/shared/store/useRegexStore.ts
import { create } from 'zustand';

interface RegexState {
  pattern: string;
  testText: string;
  setPattern: (pattern: string) => void;
  setTestText: (text: string) => void;
}

export const useRegexStore = create<RegexState>((set) => ({
  pattern: '',
  testText: '',
  setPattern: (pattern) => set({ pattern }),
  setTestText: (text) => set({ testText: text }),
}));
