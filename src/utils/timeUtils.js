import { formatInTimeZone, format } from 'date-fns';
import { TIMEZONE_CITY_MAP } from '../constants/timezones';

/**
 * Format time for a specific timezone
 * @param {Date} date - The date object
 * @param {string} timezone - IANA timezone identifier
 * @param {boolean} is24Hour - Whether to use 24-hour format
 * @returns {Object} Formatted time object with time, period, and date
 */
export const formatTime = (date, timezone, is24Hour) => {
  try {
    const timeFormat = is24Hour ? 'HH:mm:ss' : 'hh:mm:ss a';
    const time = formatInTimeZone(date, timezone, timeFormat);
    const dateFormatted = formatInTimeZone(date, timezone, 'EEE, MMM dd, yyyy');

    return {
      time,
      period: is24Hour ? '' : formatInTimeZone(date, timezone, 'a'),
      date: dateFormatted,
    };
  } catch (error) {
    console.error(`Error formatting time for timezone ${timezone}:`, error);
    return { time: '--:--:--', period: '', date: 'Invalid timezone' };
  }
};

/**
 * Get timezone information including city name, UTC offset, and DST status
 * @param {string} timezone - IANA timezone identifier
 * @returns {Object} Timezone information
 */
export const getTimezoneInfo = (timezone) => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const utcFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const tzTime = formatter.format(now);
    const utcTime = utcFormatter.format(now);

    const tzDate = new Date(tzTime.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$1-$2').replace(' ', 'T'));
    const utcDate = new Date(utcTime.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, '$3-$1-$2').replace(' ', 'T'));

    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    const offsetHours = Math.floor(Math.abs(offset));
    const offsetMinutes = Math.abs(offset % 1) * 60;
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetString = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

    // Determine if DST is active (simplified check)
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const janFormatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    const julFormatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    
    const isDST = Math.abs(
      new Date(janFormatter.format(jan)) - new Date(julFormatter.format(jul))
    ) > 0;

    const cityName = TIMEZONE_CITY_MAP[timezone] || timezone.split('/').pop();

    return {
      timezone,
      cityName,
      offset: offsetString,
      isDST,
      offsetHours,
    };
  } catch (error) {
    console.error(`Error getting timezone info for ${timezone}:`, error);
    return {
      timezone,
      cityName: timezone,
      offset: '+00:00',
      isDST: false,
      offsetHours: 0,
    };
  }
};

/**
 * Get all available timezones sorted by UTC offset
 * @returns {Array} Array of timezone objects
 */
export const getTimezoneSortedByOffset = () => {
  const timezones = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // This would require access to all timezones - simplified approach
  return [];
};
