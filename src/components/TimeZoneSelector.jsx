import React, { useState, useMemo } from 'react';
import { ALL_TIMEZONES } from '../constants/timezones';
import { Plus, Search } from 'lucide-react';
import '../styles/TimeZoneSelector.css';

const TimeZoneSelector = ({ selectedTimezones, onAddTimezone }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTimezones = useMemo(() => {
    return ALL_TIMEZONES.filter(
      (tz) =>
        !selectedTimezones.includes(tz) &&
        (tz.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tz.split('/')[1]?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedTimezones]);

  const handleAddTimezone = (timezone) => {
    onAddTimezone(timezone);
    setSearchTerm('');
  };

  return (
    <div className="timezone-selector">
      <div className="selector-header">
        <h3>Add More Timezones</h3>
        <button
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      {isOpen && (
        <div className="selector-content">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search timezones (e.g., London, Tokyo, New York)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredTimezones.length > 0 ? (
            <div className="timezone-list">
              {filteredTimezones.slice(0, 15).map((timezone) => (
                <button
                  key={timezone}
                  className="timezone-item"
                  onClick={() => handleAddTimezone(timezone)}
                  title={timezone}
                >
                  <Plus size={16} />
                  <span>{timezone}</span>
                </button>
              ))}
              {filteredTimezones.length > 15 && (
                <p className="results-count">
                  Showing 15 of {filteredTimezones.length} results
                </p>
              )}
            </div>
          ) : (
            <p className="no-results">
              {selectedTimezones.length === ALL_TIMEZONES.length
                ? 'All timezones are already added!'
                : 'No timezones found. Try a different search.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeZoneSelector;
