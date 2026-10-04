import { useReducer, useEffect, useMemo } from 'react';
import { PlayerContext } from './PlayerContext';
import { playerReducer, initialState } from './playerReducer';
import { readPersistedVolume } from '../utils/storageUtils';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { usePlaylistManager } from '../hooks/usePlaylistManager';

function initState(base) {
  return { ...base, volume: readPersistedVolume() };
}

/**
 * PlayerProvider — wraps the app with global player state.
 *
 * C4 fix: context value memoized so TIME_UPDATE dispatches (~4/s during
 * playback) do not re-render the entire component tree.
 *
 * C3 fix: calls audioEngine.syncState(state) on every state change so
 * skipNext / skipPrevious always read the latest queue.
 */
export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState, initState);

  const audioEngine = useAudioEngine(dispatch);

  const { playlists, create, remove, addTrack, removeTrack, exportPlaylist, importPlaylist } = usePlaylistManager();

  const playlistActions = useMemo(
    () => ({ create, remove, addTrack, removeTrack, exportPlaylist, importPlaylist }),
    [create, remove, addTrack, removeTrack, exportPlaylist, importPlaylist]
  );

  // C3 fix: keep audioEngine's internal stateRef current
  useEffect(() => {
    audioEngine.syncState(state);
  }, [state, audioEngine]);

  // Keyboard shortcuts: Spacebar = play/pause, ArrowLeft = previous, ArrowRight = next
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Prevent page scroll
          if (state.currentTrack) {
            if (state.status === 'playing') {
              audioEngine.pause();
            } else if (state.status === 'paused' || state.status === 'idle') {
              audioEngine.play();
            }
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          audioEngine.skipPrevious();
          break;

        case 'ArrowRight':
          e.preventDefault();
          audioEngine.skipNext();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.currentTrack, state.status, audioEngine]);

  // C4 fix: only rebuild context object when state or playlists actually change
  const value = useMemo(
    () => ({ state, dispatch, audioEngine, playlists, playlistActions }),
    [state, playlists, playlistActions]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
