import React, { useState, useEffect } from 'react';
import TimeZoneClock from './components/TimeZoneClock';
import TimeZoneSelector from './components/TimeZoneSelector';
import ThemeToggle from './components/ThemeToggle';
import FormatToggle from './components/FormatToggle';
import { DEFAULT_TIMEZONES } from './constants/timezones';
import './styles/App.css';

const App = () => {
  const [timezones, setTimezones] = useState(() => {
    const saved = localStorage.getItem('selectedTimezones');
    return saved ? JSON.parse(saved) : DEFAULT_TIMEZONES;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [is24Hour, setIs24Hour] = useState(() => {
    const saved = localStorage.getItem('is24Hour');
    return saved ? JSON.parse(saved) : true;
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem('selectedTimezones', JSON.stringify(timezones));
  }, [timezones]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('is24Hour', JSON.stringify(is24Hour));
  }, [is24Hour]);

  const handleAddTimezone = (timezone) => {
    if (!timezones.includes(timezone)) {
      setTimezones([...timezones, timezone]);
    }
  };

  const handleRemoveTimezone = (timezone) => {
    setTimezones(timezones.filter((tz) => tz !== timezone));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌍 TimezoneClock</h1>
          <p>Real-time global time display</p>
        </div>
        <div className="header-controls">
          <FormatToggle is24Hour={is24Hour} onChange={setIs24Hour} />
          <ThemeToggle isDarkMode={isDarkMode} onChange={setIsDarkMode} />
        </div>
      </header>

      <main className="app-main">
        <section className="clocks-section">
          <div className="clocks-grid">
            {timezones.length > 0 ? (
              timezones.map((timezone) => (
                <TimeZoneClock
                  key={timezone}
                  timezone={timezone}
                  is24Hour={is24Hour}
                  onRemove={() => handleRemoveTimezone(timezone)}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No timezones selected. Add one to get started!</p>
              </div>
            )}
          </div>
        </section>

        <section className="selector-section">
          <TimeZoneSelector
            selectedTimezones={timezones}
            onAddTimezone={handleAddTimezone}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React • Displays real-time time across multiple timezones</p>
      </footer>
    </div>
  );
};

export default App;
