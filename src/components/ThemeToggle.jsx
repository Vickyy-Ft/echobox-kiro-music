import { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css';

/**
 * ThemeToggle — toggle button for switching between dark and light themes.
 * 
 * Persists theme preference to localStorage.
 * Applies data-theme attribute to document root.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Read from localStorage or default to dark
    const stored = localStorage.getItem('echobox:theme');
    return stored || 'dark';
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    // Persist to localStorage
    localStorage.setItem('echobox:theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      type="button"
    >
      <span className="theme-toggle__icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      <span className="theme-toggle__label">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
