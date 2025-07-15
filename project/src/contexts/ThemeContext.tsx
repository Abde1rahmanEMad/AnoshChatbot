import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || 'anosh';
    const defaultTheme = import.meta.env.VITE_DEFAULT_THEME || 'light';
    const saved = localStorage.getItem(`${storagePrefix}-theme`);
    return (saved as Theme) || (defaultTheme as Theme);
  });

  useEffect(() => {
    const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || 'anosh';
    localStorage.setItem(`${storagePrefix}-theme`, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};