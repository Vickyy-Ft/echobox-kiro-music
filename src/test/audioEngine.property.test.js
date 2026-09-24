// Feature: echobox-music, Property 5: Track switch resets position and preserves playback mode

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { playerReducer, initialState, LOAD_TRACK } from '../context/playerReducer.js';

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/**
 * A valid track object with all required fields and a unique-enough id.
 */
const trackArb = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0),
  artist: fc.string({ minLength: 1, maxLength: 40 }).filter((s) => s.trim().length > 0),
  album: fc.string({ maxLength: 40 }),
  duration: fc.integer({ min: 1, max: 7200 }),
  src: fc.constantFrom('/audio/track01.mp3', '/audio/track02.wav'),
});

/**
 * A pair of tracks with distinct ids.
 */
const distinctTrackPairArb = fc
  .tuple(trackArb, trackArb)
  .filter(([a, b]) => a.id !== b.id);

// ---------------------------------------------------------------------------
// Property 5: Track switch resets position and preserves playback mode
// Validates: Requirements 3.4, 16.1, 16.2
// ---------------------------------------------------------------------------

describe('Property 5: Track switch resets position and preserves playback mode', () => {
  it('always resets currentTime to 0 after dispatching LOAD_TRACK, regardless of prior status', () => {
    // Feature: echobox-music, Property 5: Track switch resets position and preserves playback mode
    fc.assert(
      fc.property(
        distinctTrackPairArb,
        fc.boolean(), // wasPlaying
        fc.integer({ min: 1, max: 3600 }), // prior playback position
        ([trackA, trackB], wasPlaying, priorTime) => {
          // Simulate a state where trackA is loaded at some position
          const priorState = {
            ...initialState,
            currentTrack: trackA,
            status: wasPlaying ? 'playing' : 'paused',
            currentTime: priorTime,
            duration: trackA.duration,
          };

          // Switch to trackB
          const nextState = playerReducer(priorState, { type: LOAD_TRACK, track: trackB });

          // currentTime MUST reset to 0 on any track switch
          expect(nextState.currentTime).toBe(0);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('sets currentTrack to the new track after dispatching LOAD_TRACK', () => {
    // Feature: echobox-music, Property 5: Track switch resets position and preserves playback mode
    fc.assert(
      fc.property(distinctTrackPairArb, fc.boolean(), ([trackA, trackB], wasPlaying) => {
        const priorState = {
          ...initialState,
          currentTrack: trackA,
          status: wasPlaying ? 'playing' : 'paused',
          currentTime: 60,
        };

        const nextState = playerReducer(priorState, { type: LOAD_TRACK, track: trackB });

        expect(nextState.currentTrack).toBe(trackB);
        expect(nextState.currentTrack.id).toBe(trackB.id);
        // Must not still reference the old track
        expect(nextState.currentTrack.id).not.toBe(trackA.id);
      }),
      { numRuns: 200 }
    );
  });

  it('always sets status to loading immediately after LOAD_TRACK, regardless of prior playing state', () => {
    // Feature: echobox-music, Property 5: Track switch resets position and preserves playback mode
    fc.assert(
      fc.property(distinctTrackPairArb, fc.boolean(), ([trackA, trackB], wasPlaying) => {
        const priorState = {
          ...initialState,
          currentTrack: trackA,
          status: wasPlaying ? 'playing' : 'paused',
          currentTime: 30,
        };

        const nextState = playerReducer(priorState, { type: LOAD_TRACK, track: trackB });

        // The reducer always moves to 'loading' on LOAD_TRACK; the audio engine
        // subsequently calls play() (if wasPlaying) once canplay fires, transitioning
        // to 'playing'. The reducer itself does not know about wasPlaying — the engine
        // does. This property verifies the reducer contract (Req 3.4, 16.2).
        expect(nextState.status).toBe('loading');
      }),
      { numRuns: 200 }
    );
  });

  it('preserves all other state fields (volume, queue, error) across a track switch', () => {
    // Feature: echobox-music, Property 5: Track switch resets position and preserves playback mode
    fc.assert(
      fc.property(
        distinctTrackPairArb,
        fc.float({ min: 0, max: 1, noNaN: true }),
        ([trackA, trackB], volume) => {
          const priorState = {
            ...initialState,
            currentTrack: trackA,
            status: 'playing',
            currentTime: 45,
            volume,
            queue: {
              tracks: [trackA, trackB],
              currentIndex: 0,
              sourceId: 'pl-test',
            },
          };

          const nextState = playerReducer(priorState, { type: LOAD_TRACK, track: trackB });

          // Volume must not be affected by track switch
          expect(nextState.volume).toBe(volume);

          // Error must remain unchanged (null in this case)
          expect(nextState.error).toBeNull();

          // Queue is unchanged when no queue is provided to LOAD_TRACK
          expect(nextState.queue).toEqual(priorState.queue);
        }
      ),
      { numRuns: 200 }
    );
  });
});
