// src/theme/useAppTheme.ts
import { useThemeStore } from '../Store/useThemeStore';
import { lightTheme, darkTheme } from './theme';

export const useAppTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  return theme === 'dark' ? darkTheme : lightTheme;
};
