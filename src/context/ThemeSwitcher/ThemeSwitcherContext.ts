import { createContext } from 'react';

export interface ThemeContext {
  activeTheme: string;
  setActiveTheme?: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
}

export const defaultState: ThemeContext = {
  activeTheme: 'light',
  setActiveTheme: () => {},
  toggleTheme: () => {}
};

export const ThemeSwitcherContext = createContext<ThemeContext>(defaultState);
