import { useContext, useState } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { LOAD_TRACK } from '../../context/playerReducer';
import { PlaylistItem } from './PlaylistItem';

/**
 * PlaylistList — renders all user playlists in the sidebar.
 *
 * Reads `playlists`, `state`, `dispatch`, `audioEngine`, and `playlistActions`
 * from PlayerContext. Manages a `pendingDeleteId` local state so deletion
 * requires a two-step confirmation.
 *
 * When a playlist is active (i.e. its id matches `state.queue.sourceId`), its
 * tracks are expanded inline below the playlist item. Each track row has a
 * remove button that calls `playlistActions.removeTrack` (Req 11.1, 11.2).
 *
 * Requirements: 11.1, 11.2, 12.2, 13.1, 13.2
 */
export function PlaylistList() {
  const { state, dispatch, audioEngine, playlists, playlistActions } =
    useContext(PlayerContext);

  /** ID of the playlist currently awaiting delete confirmation */
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  /** The active playlist is whichever one populated the current queue */
  const activePlaylistId = state.queue.sourceId;

  /**
   * Play a playlist — build a queue from its tracks and load the first one.
   * No-ops when the playlist has no tracks (Req 12.2).
   */
  function handlePlay(playlist) {
    if (!playlist.tracks.length) return;

    const queue = {
      tracks: playlist.tracks,
      currentIndex: 0,
      sourceId: playlist.id,
    };

    dispatch({ type: LOAD_TRACK, track: playlist.tracks[0], queue });
    audioEngine.loadTrack(playlist.tracks[0]);
    audioEngine.play();
  }

  /**
   * Play a specific track within an active playlist's expanded list.
   * Builds the queue starting from the chosen track's index (Req 12.1).
   */
  function handleTrackPlay(playlist, track, trackIndex) {
    const queue = {
      tracks: playlist.tracks,
      currentIndex: trackIndex,
      sourceId: playlist.id,
    };

    dispatch({ type: LOAD_TRACK, track, queue });
    audioEngine.loadTrack(track);
    audioEngine.play();
  }

  /**
   * Remove a track from a playlist (Req 11.1, 11.2).
   * Playback of the removed track continues if it is currently playing.
   */
  function handleRemoveTrack(playlistId, trackId) {
    playlistActions.removeTrack(playlistId, trackId);
  }

  /**
   * First click on delete sets pendingDeleteId (shows confirmation).
   * If confirmation is already showing for a different playlist, replace it.
   */
  function handleDeleteRequest(playlist) {
    setPendingDeleteId(playlist.id);
  }

  /** User confirmed — remove the playlist and reset pending state (Req 13.2) */
  function handleDeleteConfirm() {
    playlistActions.remove(pendingDeleteId);
    setPendingDeleteId(null);
  }

  /** User cancelled — reset pending state (Req 13.3) */
  function handleDeleteCancel() {
    setPendingDeleteId(null);
  }

  return (
    <section className="playlist-list">
      {playlists.length === 0 ? (
        <p className="playlist-list__empty">No playlists yet. Create one below!</p>
      ) : (
        <ul className="playlist-list__items">
          {playlists.map((playlist) => {
            const isActive = playlist.id === activePlaylistId;
            return (
              <div key={playlist.id}>
                <PlaylistItem
                  playlist={playlist}
                  onPlay={handlePlay}
                  onDelete={handleDeleteRequest}
                  isActive={isActive}
                />

                {/* Expanded track list shown when this playlist is active */}
                {isActive && (
                  <ul className="playlist-tracks" aria-label={`Tracks in ${playlist.name}`}>
                    {playlist.tracks.length === 0 ? (
                      <li className="playlist-tracks__empty">No tracks in this playlist</li>
                    ) : (
                      playlist.tracks.map((track, index) => (
                        <li key={track.id} className="playlist-track-row">
                          <button
                            className="playlist-track-row__title"
                            onClick={() => handleTrackPlay(playlist, track, index)}
                            aria-label={`Play ${track.title}`}
                          >
                            {track.title}
                          </button>
                          <button
                            className="playlist-track-row__remove"
                            onClick={() => handleRemoveTrack(playlist.id, track.id)}
                            aria-label={`Remove ${track.title} from playlist`}
                          >
                            ✕
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                )}

                {pendingDeleteId === playlist.id && (
                  <div
                    className="playlist-item__confirm"
                    role="region"
                    aria-label={`Confirm deletion of ${playlist.name}`}
                  >
                    <span className="playlist-item__confirm-text">
                      Delete &ldquo;{playlist.name}&rdquo;?
                    </span>
                    <button
                      className="playlist-item__confirm-btn playlist-item__confirm-btn--danger"
                      onClick={handleDeleteConfirm}
                      aria-label={`Confirm delete ${playlist.name}`}
                    >
                      Delete
                    </button>
                    <button
                      className="playlist-item__confirm-btn"
                      onClick={handleDeleteCancel}
                      aria-label="Cancel deletion"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
}
