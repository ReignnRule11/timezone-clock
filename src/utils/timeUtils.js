import { TIMEZONE_CITY_MAP } from '../constants/timezones';

const getOffsetMinutes = (date, timezone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date).reduce((values, part) => {
    if (part.type !== 'literal') values[part.type] = Number(part.value);
    return values;
  }, {});

  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return Math.round((asUtc - date.getTime()) / 60000);
};

/**
 * Format a date for a specific IANA timezone using the browser's Intl API.
 * @param {Date} date
 * @param {string} timezone
 * @param {boolean} is24Hour
 * @returns {{time: string, period: string, date: string}}
 */
export const formatTime = (date, timezone, is24Hour) => {
  try {
    const timeParts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: is24Hour ? 'h23' : 'h12',
    }).formatToParts(date);

    const getPart = (type) => timeParts.find((part) => part.type === type)?.value || '';
    const time = `${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;
    const period = is24Hour ? '' : getPart('dayPeriod');
    const dateFormatted = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);

    return { time, period, date: dateFormatted };
  } catch (error) {
    console.error(`Error formatting time for timezone ${timezone}:`, error);
    return { time: '--:--:--', period: '', date: 'Invalid timezone' };
  }
};

/**
 * Get timezone information including city name, UTC offset, and DST status.
 * @param {string} timezone
 * @returns {{timezone: string, cityName: string, offset: string, isDST: boolean, offsetHours: number}}
 */
export const getTimezoneInfo = (timezone) => {
  try {
    const now = new Date();
    const offset = getOffsetMinutes(now, timezone);
    const absoluteOffset = Math.abs(offset);
    const offsetHours = Math.floor(absoluteOffset / 60);
    const offsetMinutes = absoluteOffset % 60;
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

    const year = now.getUTCFullYear();
    const januaryOffset = getOffsetMinutes(new Date(Date.UTC(year, 0, 1, 12)), timezone);
    const julyOffset = getOffsetMinutes(new Date(Date.UTC(year, 6, 1, 12)), timezone);
    const standardOffset = Math.min(januaryOffset, julyOffset);
    const isDST = offset > standardOffset;

    const cityName = TIMEZONE_CITY_MAP[timezone] || timezone.split('/').pop().replace(/_/g, ' ');

    return {
      timezone,
      cityName,
      offset: offsetString,
      isDST,
      offsetHours: absoluteOffset / 60,
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
 * Get all available timezones sorted by UTC offset.
 * @returns {Array}
 */
export const getTimezoneSortedByOffset = () => [];
