import { useTheme as useThemeContext } from '../themes/ThemeProvider';

export function useTheme() {
  const { theme } = useThemeContext();
  return theme;
}
