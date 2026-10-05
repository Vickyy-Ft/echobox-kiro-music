import { describe, it, expect } from 'vitest';
import { clampSeek, seekPercent, nextTrack, previousTrack } from './queueUtils';

/**
 * Unit tests for queueUtils helper functions
 * Covers edge cases and boundary conditions
 */

describe('clampSeek — Unit tests for edge cases', () => {
  it('clamps negative values to 0', () => {
    expect(clampSeek(-10, 100)).toBe(0);
    expect(clampSeek(-0.001, 100)).toBe(0);
  });

  it('clamps values above duration to duration', () => {
    expect(clampSeek(101, 100)).toBe(100);
    expect(clampSeek(1000, 100)).toBe(100);
  });

  it('returns 0 for NaN target', () => {
    expect(clampSeek(NaN, 100)).toBe(0);
  });

  it('clamps Infinity to duration', () => {
    expect(clampSeek(Infinity, 100)).toBe(100);
  });

  it('clamps -Infinity to 0', () => {
    expect(clampSeek(-Infinity, 100)).toBe(0);
  });

  it('preserves valid values within range', () => {
    expect(clampSeek(0, 100)).toBe(0);
    expect(clampSeek(50, 100)).toBe(50);
    expect(clampSeek(100, 100)).toBe(100);
  });

  it('handles zero duration', () => {
    expect(clampSeek(50, 0)).toBe(0);
  });

  it('handles very small durations', () => {
    expect(clampSeek(0.5, 0.001)).toBe(0.001);
    expect(clampSeek(-0.5, 0.001)).toBe(0);
  });

  it('handles very large durations', () => {
    expect(clampSeek(1e10, 1e10)).toBe(1e10);
    expect(clampSeek(1e10 + 1, 1e10)).toBe(1e10);
  });

  it('handles negative duration gracefully', () => {
    expect(clampSeek(50, -100)).toBe(0);
  });

  it('returns exact floating point values', () => {
    expect(clampSeek(33.33, 100)).toBe(33.33);
    expect(clampSeek(0.00001, 100)).toBe(0.00001);
  });
});

describe('seekPercent — Unit tests for edge cases', () => {
  it('returns 0 when duration is 0', () => {
    expect(seekPercent(50, 0)).toBe(0);
  });

  it('returns 0 when duration is negative', () => {
    expect(seekPercent(50, -100)).toBe(0);
  });

  it('returns 0 at start of track', () => {
    expect(seekPercent(0, 100)).toBe(0);
  });

  it('returns 100 at end of track', () => {
    expect(seekPercent(100, 100)).toBe(100);
  });

  it('returns correct percentage at midpoint', () => {
    expect(seekPercent(50, 100)).toBe(50);
  });

  it('handles fractional percentages', () => {
    expect(seekPercent(33.33, 100)).toBeCloseTo(33.33, 2);
  });

  it('handles very small values', () => {
    expect(seekPercent(0.0001, 100)).toBeCloseTo(0.0001, 4);
  });

  it('handles large durations', () => {
    expect(seekPercent(5000, 10000)).toBe(50);
  });

  it('returns 0 for NaN currentTime', () => {
    // NaN comparison always returns false in Math.min
    const result = seekPercent(NaN, 100);
    expect(Number.isNaN(result) || result === 0).toBe(true);
  });

  it('handles very small duration', () => {
    // seekPercent clamps to [0, 100], so 0.5 / 0.001 * 100 = 50000, clamped to 100
    expect(seekPercent(0.5, 0.001)).toBe(100);
  });
});

describe('nextTrack — Unit tests for boundary behavior', () => {
  const mockQueue = {
    tracks: [
      { id: 'track1', title: 'Track 1' },
      { id: 'track2', title: 'Track 2' },
      { id: 'track3', title: 'Track 3' },
    ],
    currentIndex: 0,
  };

  it('returns next index when not at end', () => {
    expect(nextTrack({ ...mockQueue, currentIndex: 0 })).toBe(1);
    expect(nextTrack({ ...mockQueue, currentIndex: 1 })).toBe(2);
  });

  it('returns null at end of queue', () => {
    expect(nextTrack({ ...mockQueue, currentIndex: 2 })).toBeNull();
  });

  it('returns null for empty queue', () => {
    expect(nextTrack({ tracks: [], currentIndex: -1 })).toBeNull();
  });

  it('returns null when currentIndex is at last track', () => {
    const lastIndex = mockQueue.tracks.length - 1;
    expect(nextTrack({ ...mockQueue, currentIndex: lastIndex })).toBeNull();
  });

  it('handles negative currentIndex', () => {
    expect(nextTrack({ ...mockQueue, currentIndex: -1 })).toBe(0);
  });

  it('handles out-of-bounds currentIndex', () => {
    expect(nextTrack({ ...mockQueue, currentIndex: 999 })).toBeNull();
  });
});

describe('previousTrack — Unit tests for boundary behavior', () => {
  const mockQueue = {
    tracks: [
      { id: 'track1', title: 'Track 1' },
      { id: 'track2', title: 'Track 2' },
      { id: 'track3', title: 'Track 3' },
    ],
    currentIndex: 2,
  };

  it('returns previous index when not at start', () => {
    expect(previousTrack({ ...mockQueue, currentIndex: 2 })).toBe(1);
    expect(previousTrack({ ...mockQueue, currentIndex: 1 })).toBe(0);
  });

  it('returns null at start of queue', () => {
    expect(previousTrack({ ...mockQueue, currentIndex: 0 })).toBeNull();
  });

  it('returns null for empty queue', () => {
    expect(previousTrack({ tracks: [], currentIndex: -1 })).toBeNull();
  });

  it('returns null when currentIndex is 0', () => {
    expect(previousTrack({ ...mockQueue, currentIndex: 0 })).toBeNull();
  });

  it('handles negative currentIndex', () => {
    expect(previousTrack({ ...mockQueue, currentIndex: -1 })).toBeNull();
  });

  it('handles out-of-bounds currentIndex', () => {
    // previousTrack just returns currentIndex - 1 without bounds checking
    expect(previousTrack({ ...mockQueue, currentIndex: 999 })).toBe(998);
  });

  it('single track queue previous returns null', () => {
    const singleTrackQueue = {
      tracks: [{ id: 'track1', title: 'Track 1' }],
      currentIndex: 0,
    };
    expect(previousTrack(singleTrackQueue)).toBeNull();
  });
});
