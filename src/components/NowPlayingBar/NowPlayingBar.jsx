import { TrackInfo } from './TrackInfo';
import { PlaybackControls } from './PlaybackControls';
import { VolumeControl } from './VolumeControl';
import '../../styles/NowPlayingBar.css';

/**
 * NowPlayingBar — fixed bottom bar composing TrackInfo, PlaybackControls,
 * and VolumeControl into a three-section flex layout.
 *
 * Layout: [ TrackInfo (left) | PlaybackControls (center) | VolumeControl (right) ]
 *
 * Requirements: 7.1, 7.2, 7.3
 */
export function NowPlayingBar() {
  return (
    <footer
      className="now-playing-bar"
      role="contentinfo"
      aria-label="Now playing"
    >
      {/* Left: current track title + artist */}
      <div className="now-playing-bar__section now-playing-bar__section--left">
        <TrackInfo />
      </div>

      {/* Centre: previous / play-pause / next + seek bar */}
      <div className="now-playing-bar__section now-playing-bar__section--center">
        <PlaybackControls />
      </div>

      {/* Right: volume slider */}
      <div className="now-playing-bar__section now-playing-bar__section--right">
        <VolumeControl />
      </div>
    </footer>
  );
}

export default NowPlayingBar;
