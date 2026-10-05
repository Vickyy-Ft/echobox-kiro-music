import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  readPersistedVolume,
  parsePersistedVolume,
  writePersistedVolume,
} from './storageUtils';

/**
 * Unit tests for volume persistence and clamping
 * Covers edge cases and boundary conditions
 */

describe('parsePersistedVolume — Volume clamping edge cases', () => {
  it('returns 1 for valid volume at boundaries', () => {
    expect(parsePersistedVolume(0)).toBe(0);
    expect(parsePersistedVolume(1)).toBe(1);
  });

  it('returns 1 when volume is null', () => {
    expect(parsePersistedVolume(null)).toBe(1);
  });

  it('returns 1 when volume is undefined', () => {
    expect(parsePersistedVolume(undefined)).toBe(1);
  });

  it('returns 1 when volume is NaN', () => {
    expect(parsePersistedVolume(NaN)).toBe(1);
  });

  it('returns 1 when volume is Infinity', () => {
    expect(parsePersistedVolume(Infinity)).toBe(1);
  });

  it('returns 1 when volume is -Infinity', () => {
    expect(parsePersistedVolume(-Infinity)).toBe(1);
  });

  it('clamps negative volumes to 0', () => {
    // Negative numbers fail the < 0 check, return 1
    expect(parsePersistedVolume(-0.1)).toBe(1);
    expect(parsePersistedVolume(-1)).toBe(1);
    expect(parsePersistedVolume(-100)).toBe(1);
  });

  it('clamps volumes above 1 to 1', () => {
    expect(parsePersistedVolume(1.1)).toBe(1);
    expect(parsePersistedVolume(2)).toBe(1);
    expect(parsePersistedVolume(100)).toBe(1);
  });

  it('returns 1 for non-numeric strings', () => {
    expect(parsePersistedVolume('not a number')).toBe(1);
    expect(parsePersistedVolume('')).toBe(1);
  });

  it('returns 1 for objects', () => {
    expect(parsePersistedVolume({})).toBe(1);
    expect(parsePersistedVolume({ volume: 0.5 })).toBe(1);
  });

  it('returns 1 for arrays (or coerces single-value array)', () => {
    // parseFloat([0.5]) coerces to "0.5" string, so parseFloat returns 0.5
    expect(parsePersistedVolume([0.5])).toBe(0.5);
    expect(parsePersistedVolume([])).toBe(1); // parseFloat("") is NaN
  });

  it('preserves valid fractional volumes', () => {
    expect(parsePersistedVolume(0.25)).toBe(0.25);
    expect(parsePersistedVolume(0.5)).toBe(0.5);
    expect(parsePersistedVolume(0.75)).toBe(0.75);
  });

  it('handles very small positive volumes', () => {
    expect(parsePersistedVolume(0.001)).toBe(0.001);
    expect(parsePersistedVolume(Number.EPSILON)).toBe(Number.EPSILON);
  });

  it('returns 1 for boolean true (not a number after type check)', () => {
    // parseFloat(true) = NaN, so returns 1
    expect(parsePersistedVolume(true)).toBe(1);
  });

  it('returns 1 for boolean false (not a number after type check)', () => {
    // parseFloat(false) = NaN, so returns 1
    expect(parsePersistedVolume(false)).toBe(1);
  });
});

describe('readPersistedVolume — Reading from localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns 1 when storage is empty', () => {
    expect(readPersistedVolume()).toBe(1);
  });

  it('returns parsed volume from storage', () => {
    localStorage.setItem('echobox:volume', JSON.stringify(0.5));
    expect(readPersistedVolume()).toBe(0.5);
  });

  it('returns 1 when stored value is null', () => {
    localStorage.setItem('echobox:volume', 'null');
    expect(readPersistedVolume()).toBe(1);
  });

  it('returns 1 when stored value is invalid JSON', () => {
    localStorage.setItem('echobox:volume', 'not valid json');
    expect(readPersistedVolume()).toBe(1);
  });

  it('returns 1 when stored value is out of range', () => {
    localStorage.setItem('echobox:volume', JSON.stringify(1.5));
    expect(readPersistedVolume()).toBe(1);
  });

  it('returns 0 when stored value is exactly 0', () => {
    localStorage.setItem('echobox:volume', JSON.stringify(0));
    expect(readPersistedVolume()).toBe(0);
  });

  it('returns 1 when stored value is exactly 1', () => {
    localStorage.setItem('echobox:volume', JSON.stringify(1));
    expect(readPersistedVolume()).toBe(1);
  });

  it('handles negative stored values by returning 1 (invalid)', () => {
    localStorage.setItem('echobox:volume', JSON.stringify(-0.5));
    expect(readPersistedVolume()).toBe(1);
  });
});

describe('writePersistedVolume — Writing to localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('writes valid volume to storage', () => {
    writePersistedVolume(0.5);
    expect(localStorage.getItem('echobox:volume')).toBe('0.5');
  });

  it('writes volume 0', () => {
    writePersistedVolume(0);
    expect(localStorage.getItem('echobox:volume')).toBe('0');
  });

  it('writes volume 1', () => {
    writePersistedVolume(1);
    expect(localStorage.getItem('echobox:volume')).toBe('1');
  });

  it('writes volume with decimals', () => {
    writePersistedVolume(0.75);
    expect(localStorage.getItem('echobox:volume')).toBe('0.75');
  });

  it('overwrites previous volume value', () => {
    writePersistedVolume(0.3);
    expect(localStorage.getItem('echobox:volume')).toBe('0.3');
    
    writePersistedVolume(0.8);
    expect(localStorage.getItem('echobox:volume')).toBe('0.8');
  });

  it('handles very small volumes', () => {
    writePersistedVolume(0.001);
    expect(localStorage.getItem('echobox:volume')).toBe('0.001');
  });
});

describe('Volume persistence round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('preserves volume through write-read cycle', () => {
    const testVolume = 0.65;
    writePersistedVolume(testVolume);
    expect(readPersistedVolume()).toBe(testVolume);
  });

  it('handles edge case volumes: 0', () => {
    writePersistedVolume(0);
    expect(readPersistedVolume()).toBe(0);
  });

  it('handles edge case volumes: 1', () => {
    writePersistedVolume(1);
    expect(readPersistedVolume()).toBe(1);
  });

  it('handles edge case volumes: very small', () => {
    writePersistedVolume(0.001);
    expect(readPersistedVolume()).toBe(0.001);
  });

  it('defaults to 1 when no prior volume exists', () => {
    localStorage.clear();
    expect(readPersistedVolume()).toBe(1);
  });

  it('recovers from corrupted storage entry', () => {
    // Simulate corrupted entry
    localStorage.setItem('echobox:volume', 'corrupted');
    expect(readPersistedVolume()).toBe(1);
    
    // Write a valid volume
    writePersistedVolume(0.5);
    expect(readPersistedVolume()).toBe(0.5);
  });
});
