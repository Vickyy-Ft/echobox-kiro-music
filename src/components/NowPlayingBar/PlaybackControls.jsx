import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { SeekBar } from './SeekBar';
import '../../styles/NowPlayingBar.css';

/**
 * PlaybackControls — previous, play/pause, and next buttons plus the SeekBar.
 *
 * - Disables all buttons when no track is loaded (state.currentTrack === null)
 * - Disables play/pause and shows a loading indicator while state.status === 'loading' (Req 3.5)
 * - Dispatches via audioEngine: play, pause, skipNext, skipPrevious (Req 3.2, 3.3, 6.1, 6.2)
 *
 * Requirements: 3.2, 3.3, 3.5, 6.1, 6.2
 */
export function PlaybackControls() {
  const { state, audioEngine } = useContext(PlayerContext);

  const noTrack = state.currentTrack === null;
  const isLoading = state.status === 'loading';
  const isPlaying = state.status === 'playing';

  // Buttons are disabled when no track is loaded or while loading (play/pause only)
  const allDisabled = noTrack;
  const playPauseDisabled = noTrack || isLoading;

  return (
    <div className="playback-controls">
      {/* Loading indicator — visible only while a track is loading (Req 3.5) */}
      {isLoading && (
        <span className="playback-controls__loading" aria-label="Loading track" role="status">
          <span className="playback-controls__spinner" aria-hidden="true" />
        </span>
      )}

      <div className="playback-controls__buttons">
        {/* Previous track (Req 6.2) */}
        <button
          className="playback-controls__btn playback-controls__btn--prev"
          onClick={() => audioEngine.skipPrevious(state)}
          disabled={allDisabled}
          aria-label="Previous track"
        >
          ⏮
        </button>

        {/* Play / Pause (Req 3.2, 3.3, 3.5) */}
        {isPlaying ? (
          <button
            className="playback-controls__btn playback-controls__btn--pause"
            onClick={() => audioEngine.pause()}
            disabled={playPauseDisabled}
            aria-label="Pause"
          >
            ⏸
          </button>
        ) : (
          <button
            className="playback-controls__btn playback-controls__btn--play"
            onClick={() => audioEngine.play()}
            disabled={playPauseDisabled}
            aria-label="Play"
          >
            ▶
          </button>
        )}

        {/* Next track (Req 6.1) */}
        <button
          className="playback-controls__btn playback-controls__btn--next"
          onClick={() => audioEngine.skipNext(state)}
          disabled={allDisabled}
          aria-label="Next track"
        >
          ⏭
        </button>
      </div>

      <SeekBar />
    </div>
  );
}

export default PlaybackControls;
