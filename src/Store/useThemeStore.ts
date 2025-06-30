// src/store/useThemeStore.ts
import { create } from 'zustand';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
