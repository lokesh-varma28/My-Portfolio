import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
        return document.documentElement.dataset.theme;
      }
      return localStorage.getItem('theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {

    const handleStorage = (e) => {
      if (e.key === 'theme' && e.newValue) {
        setTheme(e.newValue);
        document.documentElement.dataset.theme = e.newValue;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
          meta.setAttribute('content', e.newValue === 'light' ? '#f8fafc' : '#030712');
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // ignore
    }
    document.documentElement.dataset.theme = nextTheme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', nextTheme === 'light' ? '#f8fafc' : '#030712');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch to light/dark mode"
      aria-pressed={theme === 'light'}
      className="p-2 rounded-full border border-slate-800/80 glass-panel text-slate-300 hover:text-cyan-400 nav-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all flex items-center justify-center shrink-0 cursor-pointer"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600" />
      )}
    </button>
  );
}
