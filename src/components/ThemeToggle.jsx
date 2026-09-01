import React from 'react';
import { Moon, Sun } from 'lucide-react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, onChange }) => {
  return (
    <button
      className="theme-toggle"
      onClick={() => onChange(!isDarkMode)}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
