import React, { useState, useEffect } from 'react';
import { formatTime, getTimezoneInfo } from '../utils/timeUtils';
import { X } from 'lucide-react';
import '../styles/TimeZoneClock.css';

const TimeZoneClock = ({ timezone, is24Hour, onRemove }) => {
  const [time, setTime] = useState(new Date());
  const [tzInfo, setTzInfo] = useState(null);

  useEffect(() => {
    const tzData = getTimezoneInfo(timezone);
    setTzInfo(tzData);
  }, [timezone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!tzInfo) return null;

  const formattedTime = formatTime(time, timezone, is24Hour);

  return (
    <div className="timezone-clock">
      <div className="clock-header">
        <div>
          <h2 className="timezone-name">{tzInfo.cityName}</h2>
          <p className="timezone-info">{timezone}</p>
        </div>
        <button
          className="remove-btn"
          onClick={onRemove}
          title="Remove this timezone"
          aria-label={`Remove ${timezone}`}
        >
          <X size={18} />
        </button>
      </div>

      <div className="clock-display">
        <div className="digital-time">{formattedTime.time}</div>
        <div className="period-indicator">{formattedTime.period}</div>
      </div>

      <div className="clock-footer">
        <div className="utc-offset">
          <span>UTC {tzInfo.offset}</span>
        </div>
        <div className="date-display">
          <span>{formattedTime.date}</span>
        </div>
      </div>

      <div className="clock-status">
        <span className={`status-indicator ${tzInfo.isDST ? 'active' : ''}`}></span>
        <span className="status-text">{tzInfo.isDST ? 'DST Active' : 'Standard Time'}</span>
      </div>
    </div>
  );
};

export default TimeZoneClock;
