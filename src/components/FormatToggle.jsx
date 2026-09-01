import React from 'react';
import '../styles/FormatToggle.css';

const FormatToggle = ({ is24Hour, onChange }) => {
  return (
    <button
      className="format-toggle"
      onClick={() => onChange(!is24Hour)}
      title={is24Hour ? 'Switch to 12-hour format' : 'Switch to 24-hour format'}
      aria-label="Toggle time format"
    >
      <span className={`format-option ${is24Hour ? 'active' : ''}`}>24h</span>
      <span className="format-divider">|</span>
      <span className={`format-option ${!is24Hour ? 'active' : ''}`}>12h</span>
    </button>
  );
};

export default FormatToggle;
