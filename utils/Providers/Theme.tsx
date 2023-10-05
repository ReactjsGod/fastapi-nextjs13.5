'use client';

import React from 'react';

export interface IThemeContext {
    theme: string;
    toggleTheme: () => void;
  }

// Create a context for the theme
const ThemeContext = React.createContext<IThemeContext | undefined>(undefined);

// Create a provider component for the theme context

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme state to 'light' (this will be updated on client side)
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    // Move localStorage operations inside useEffect
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    document.documentElement.classList.add(savedTheme);
    document.documentElement.classList.remove(
      savedTheme === 'dark' ? 'light' : 'dark'
    );
  }, []);

  React.useEffect(() => {
    // Save the theme state in local storage and update document class
    localStorage.setItem('theme', theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
      theme === 'dark' ? 'light' : 'dark'
    );
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a hook to use the theme context
export const useTheme = () => React.useContext(ThemeContext);
