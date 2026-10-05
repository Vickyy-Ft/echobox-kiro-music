import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { SeekBar } from './SeekBar';
import '../../styles/NowPlayingBar.css';

/**
 * PlaybackControls — prev / play-pause / next + SeekBar.
 *
 * C3 fix: skipNext() and skipPrevious() take no arguments — the audio engine
 * reads the latest state from its internal stateRef, avoiding stale closures
 * on rapid clicks.
 *
 * Requirements: 3.2, 3.3, 3.5, 6.1, 6.2
 */
export function PlaybackControls() {
  const { state, audioEngine } = useContext(PlayerContext);

  const noTrack           = state.currentTrack === null;
  const isLoading         = state.status === 'loading';
  const isPlaying         = state.status === 'playing';
  const playPauseDisabled = noTrack || isLoading;

  return (
    <div className="playback-controls">
      {isLoading && (
        <span className="playback-controls__loading" aria-label="Loading track" role="status">
          <span className="playback-controls__spinner" aria-hidden="true" />
        </span>
      )}

      <div className="playback-controls__buttons">
        <button
          className="playback-controls__btn playback-controls__btn--prev"
          onClick={() => audioEngine.skipPrevious()}
          disabled={noTrack}
          aria-label="Previous track (shortcut: Left arrow)"
          title="Previous track (Left arrow)"
        >
          ⏮
        </button>

        {isPlaying ? (
          <button
            className="playback-controls__btn playback-controls__btn--pause"
            onClick={() => audioEngine.pause()}
            disabled={playPauseDisabled}
            aria-label="Pause playback (shortcut: Spacebar)"
            title="Pause (Spacebar)"
          >
            ⏸
          </button>
        ) : (
          <button
            className="playback-controls__btn playback-controls__btn--play"
            onClick={() => audioEngine.play()}
            disabled={playPauseDisabled}
            aria-label="Play (shortcut: Spacebar)"
            title="Play (Spacebar)"
          >
            ▶
          </button>
        )}

        <button
          className="playback-controls__btn playback-controls__btn--next"
          onClick={() => audioEngine.skipNext()}
          disabled={noTrack}
          aria-label="Next track (shortcut: Right arrow)"
          title="Next track (Right arrow)"
        >
          ⏭
        </button>
      </div>

      <SeekBar />
    </div>
  );
}

export default PlaybackControls;
