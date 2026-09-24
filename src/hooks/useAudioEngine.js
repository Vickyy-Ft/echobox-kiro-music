import { useRef, useEffect } from 'react';
import { clampSeek, nextTrack, previousTrack } from '../utils/queueUtils';
import { writePersistedVolume } from '../utils/storageUtils';

/**
 * Maps a MediaError object to a human-readable error string.
 *
 * @param {MediaError|null} mediaError - The MediaError from HTMLAudioElement.error
 * @returns {string} A human-readable description of the error
 */
export function buildErrorMessage(mediaError) {
  if (!mediaError) return 'An unknown audio error occurred.';

  switch (mediaError.code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return 'Playback was aborted.';
    case MediaError.MEDIA_ERR_NETWORK:
      return 'A network error interrupted loading.';
    case MediaError.MEDIA_ERR_DECODE:
      return 'The audio file could not be decoded.';
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'The audio format is not supported.';
    default:
      return 'An unknown audio error occurred.';
  }
}

/**
 * useAudioEngine — manages the HTMLAudioElement and bridges audio events
 * into reducer dispatch calls.
 *
 * @param {Function} dispatch - React dispatch from useReducer
 * @returns {{ loadTrack, play, pause, seek, setVolume, skipNext, skipPrevious }}
 */
export function useAudioEngine(dispatch) {
  const audioRef = useRef(new Audio());
  const loadAbortRef = useRef(0);        // incremented on each loadTrack call
  const expectedLoadIdRef = useRef(0);   // the ID that the next canplay event should match
  const pendingActionRef = useRef(null); // for debouncing rapid play/pause (task 6.3)

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () =>
      dispatch({ type: 'TIME_UPDATE', currentTime: audio.currentTime });

    // Only dispatch TRACK_LOADED if the canplay event belongs to the most recent
    // loadTrack call. Stale events from superseded loads are silently ignored.
    const onCanPlay = () => {
      if (loadAbortRef.current !== expectedLoadIdRef.current) return;
      dispatch({ type: 'TRACK_LOADED', duration: audio.duration });
    };

    const onEnded = () =>
      dispatch({ type: 'TRACK_ENDED' });

    const onError = () =>
      dispatch({ type: 'SET_ERROR', error: buildErrorMessage(audio.error) });

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [dispatch]);

  /**
   * Loads a new track into the audio element.
   * Increments the abort counter so any in-flight canplay event from a
   * previous load is discarded.
   *
   * @param {{ src: string }} track
   */
  const loadTrack = (track) => {
    const audio = audioRef.current;
    // Increment the counter and record this load's ID as the expected one.
    loadAbortRef.current += 1;
    expectedLoadIdRef.current = loadAbortRef.current;

    audio.src = track.src;
    audio.load();
    // Set currentTrack in state and mark status as loading.
    dispatch({ type: 'LOAD_TRACK', track });
    dispatch({ type: 'SET_STATUS', status: 'loading' });
  };

  /**
   * Seeks to a given time, clamped to [0, duration].
   *
   * @param {number} time - Desired seek position in seconds
   */
  const seek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = clampSeek(time, audio.duration);
  };

  /**
   * Sets the playback volume and persists it to localStorage.
   *
   * @param {number} vol - Volume level in [0, 1]
   */
  const setVolume = (vol) => {
    const audio = audioRef.current;
    audio.volume = vol;
    dispatch({ type: 'SET_VOLUME', volume: vol });
    writePersistedVolume(vol);
  };

  /**
   * Debounced play: cancels any pending action and schedules audio.play()
   * + PLAY dispatch after 50 ms. Prevents audio glitching from rapid toggling.
   */
  const play = () => {
    clearTimeout(pendingActionRef.current);
    pendingActionRef.current = setTimeout(() => {
      audioRef.current.play().catch(() => {});
      dispatch({ type: 'PLAY' });
    }, 50);
  };

  /**
   * Debounced pause: same pattern as play — only the last action within the
   * 50 ms window is executed.
   */
  const pause = () => {
    clearTimeout(pendingActionRef.current);
    pendingActionRef.current = setTimeout(() => {
      audioRef.current.pause();
      dispatch({ type: 'PAUSE' });
    }, 50);
  };

  /**
   * Advances to the next track in the queue. If no next track exists,
   * dispatches QUEUE_EXHAUSTED.
   *
   * @param {{ queue: import('../utils/queueUtils').Queue }} state - Current player state
   */
  const skipNext = (state) => {
    const nextIndex = nextTrack(state.queue);
    if (nextIndex !== null) {
      const track = state.queue.tracks[nextIndex];
      const updatedQueue = { ...state.queue, currentIndex: nextIndex };
      // Update audio element source
      const audio = audioRef.current;
      loadAbortRef.current += 1;
      expectedLoadIdRef.current = loadAbortRef.current;
      audio.src = track.src;
      audio.load();
      // Update reducer state with new track and updated queue index
      dispatch({ type: 'LOAD_TRACK', track, queue: updatedQueue });
      dispatch({ type: 'SET_STATUS', status: 'loading' });
      play();
    } else {
      dispatch({ type: 'QUEUE_EXHAUSTED' });
    }
  };

  /**
   * Goes back to the previous track in the queue. If already at the first
   * track, dispatches QUEUE_EXHAUSTED.
   *
   * @param {{ queue: import('../utils/queueUtils').Queue }} state - Current player state
   */
  const skipPrevious = (state) => {
    const prevIndex = previousTrack(state.queue);
    if (prevIndex !== null) {
      const track = state.queue.tracks[prevIndex];
      const updatedQueue = { ...state.queue, currentIndex: prevIndex };
      // Update audio element source
      const audio = audioRef.current;
      loadAbortRef.current += 1;
      expectedLoadIdRef.current = loadAbortRef.current;
      audio.src = track.src;
      audio.load();
      // Update reducer state with new track and updated queue index
      dispatch({ type: 'LOAD_TRACK', track, queue: updatedQueue });
      dispatch({ type: 'SET_STATUS', status: 'loading' });
      play();
    } else {
      dispatch({ type: 'QUEUE_EXHAUSTED' });
    }
  };

  return { loadTrack, play, pause, seek, setVolume, skipNext, skipPrevious };
}
