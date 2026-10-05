import { TrackItem } from './TrackItem';
import '../../styles/TrackList.css';

/**
 * TrackList — renders the filtered list of tracks.
 *
 * Shows a `TrackItem` for every track in the provided list. When the list is
 * empty, displays either the caller-supplied `emptyMessage` or the default
 * "No tracks available" text.
 *
 * Props:
 *   tracks        {object[]}  — filtered array of track objects
 *   onTrackSelect {function}  — callback forwarded to each TrackItem
 *   emptyMessage  {string=}   — optional override for the empty-state message;
 *                               pass "No results found" when a search is active
 *
 * Requirements: 1.1, 1.3, 2.3
 */
export function TrackList({ tracks, onTrackSelect, emptyMessage }) {
  return (
    <div className="track-list-container">
      {tracks.length === 0 ? (
        <div className="track-list__empty">
          <p>{emptyMessage || 'No tracks available'}</p>
          {!emptyMessage && (
            <p style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--space-2)', opacity: 0.7 }}>
              Check the catalog or create a playlist to get started
            </p>
          )}
        </div>
      ) : (
        <ul className="track-list">
          {tracks.map((track) => (
            <TrackItem key={track.id} track={track} onTrackSelect={onTrackSelect} />
          ))}
        </ul>
      )}
    </div>
  );
}
