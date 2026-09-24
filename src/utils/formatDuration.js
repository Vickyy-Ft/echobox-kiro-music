/**
 * Formats a duration in seconds into a "M+:SS" string with zero-padded seconds.
 *
 * @param {number} s - Non-negative integer number of seconds
 * @returns {string} Formatted duration, e.g. "0:00", "3:45", "61:01"
 *
 * @example
 * formatDuration(0)    // "0:00"
 * formatDuration(65)   // "1:05"
 * formatDuration(3661) // "61:01"
 */
export function formatDuration(s) {
  const totalSeconds = Math.floor(s);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
