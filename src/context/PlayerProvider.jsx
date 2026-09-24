import { useReducer } from 'react';
import { PlayerContext } from './PlayerContext';
import { playerReducer, initialState } from './playerReducer';
import { readPersistedVolume } from '../utils/storageUtils';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { usePlaylistManager } from '../hooks/usePlaylistManager';

/**
 * Lazy initializer for useReducer — merges initialState with the persisted
 * volume so audio output level is correct before the first interaction.
 *
 * @param {typeof initialState} base
 * @returns {typeof initialState}
 */
function initState(base) {
  return {
    ...base,
    volume: readPersistedVolume(),
  };
}

/**
 * PlayerProvider — wraps the application with global player state.
 *
 * Context value shape:
 *   { state, dispatch, audioEngine, playlists, playlistActions }
 *
 * @param {{ children: React.ReactNode }} props
 */
export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState, initState);

  const audioEngine = useAudioEngine(dispatch);

  const { playlists, create, remove, addTrack, removeTrack } = usePlaylistManager();
  const playlistActions = { create, remove, addTrack, removeTrack };

  const value = {
    state,
    dispatch,
    audioEngine,
    playlists,
    playlistActions,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
