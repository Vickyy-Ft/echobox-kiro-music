/**
 * Clamps a seek target value to the valid range [0, duration].
 *
 * Handles edge cases:
 * - NaN → returns 0
 * - Negative values → clamped to 0
 * - Values above duration (including Infinity) → clamped to duration
 *
 * @param {number} target - The desired seek position in seconds
 * @param {number} duration - The total duration of the track in seconds
 * @returns {number} A value in [0, duration]
 */
export function clampSeek(target, duration) {
  if (isNaN(target)) return 0;
  if (target < 0) return 0;
  if (target > duration) return duration;
  return target;
}

/**
 * Calculates the playback position as a percentage of the total duration.
 *
 * @param {number} currentTime - Current playback position in seconds
 * @param {number} duration - Total duration in seconds
 * @returns {number} A value in [0, 100], or 0 if duration is 0 or negative
 */
export function seekPercent(currentTime, duration) {
  if (duration <= 0) return 0;
  return (currentTime / duration) * 100;
}

/**
 * Returns the index of the next track in the queue, or null if exhausted.
 *
 * @param {{ tracks: Array, currentIndex: number, sourceId: string|null }} queue
 * @returns {number|null} Next index, or null if at end or queue is empty
 */
export function nextTrack(queue) {
  if (!queue || queue.tracks.length === 0) return null;
  const next = queue.currentIndex + 1;
  if (next >= queue.tracks.length) return null;
  return next;
}

/**
 * Returns the index of the previous track in the queue, or null if at the start.
 *
 * @param {{ tracks: Array, currentIndex: number, sourceId: string|null }} queue
 * @returns {number|null} Previous index, or null if at start or queue is empty
 */
export function previousTrack(queue) {
  if (!queue || queue.tracks.length === 0) return null;
  if (queue.currentIndex <= 0) return null;
  return queue.currentIndex - 1;
}

/**
 * Builds a queue from a playlist, starting at the first track.
 *
 * @param {{ id: string, tracks: Array }} playlist
 * @returns {{ tracks: Array, currentIndex: number, sourceId: string }}
 */
export function populateQueueFromPlaylist(playlist) {
  return {
    tracks: playlist.tracks,
    currentIndex: 0,
    sourceId: playlist.id,
  };
}
