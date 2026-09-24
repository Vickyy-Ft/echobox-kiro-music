import { useState, useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { filterTracks } from '../../utils/filterTracks';
import { SearchBar } from './SearchBar';
import { TrackList } from './TrackList';
import { LOAD_TRACK } from '../../context/playerReducer';

/**
 * MainContent — owns the search query state and composes SearchBar + TrackList.
 *
 * - Filters the catalog reactively as the user types (Req 2.1, 2.4).
 * - On track select: dispatches LOAD_TRACK with the full catalog queue so that
 *   skip-next/skip-previous work correctly, then triggers playback (Req 3.1).
 * - Shows "No results found" when a search is active and matches nothing (Req 2.3).
 * - Shows "No tracks available" when the catalog is empty (Req 1.3).
 *
 * Props:
 *   catalog {object[]} — the full track catalog passed in from App
 *
 * Requirements: 1.1, 2.1, 2.4, 3.1
 */
export function MainContent({ catalog }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch, audioEngine } = useContext(PlayerContext);

  const filteredTracks = filterTracks(catalog, searchQuery);

  // Determine empty-state message
  const isSearchActive = searchQuery.trim() !== '';
  const emptyMessage = isSearchActive ? 'No results found' : 'No tracks available';

  /**
   * Handles track selection from the track list.
   * Dispatches LOAD_TRACK with the full catalog queue so skip navigation works,
   * then calls audioEngine.play() so playback starts immediately (Req 3.1).
   *
   * @param {object} track - The selected track object
   */
  const handleTrackSelect = (track) => {
    const currentIndex = catalog.findIndex((t) => t.id === track.id);

    // Dispatch LOAD_TRACK with the full catalog as the queue so that
    // skipNext / skipPrevious navigate through the whole catalog.
    dispatch({
      type: LOAD_TRACK,
      track,
      queue: {
        tracks: catalog,
        currentIndex: currentIndex !== -1 ? currentIndex : 0,
        sourceId: null,
      },
    });

    // Set the audio src and kick off the load; the audio engine will auto-play
    // once canplay fires (TRACK_LOADED sets status to 'playing').
    audioEngine.loadTrack(track);
  };

  return (
    <main className="main-content">
      <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <TrackList
        tracks={filteredTracks}
        onTrackSelect={handleTrackSelect}
        emptyMessage={emptyMessage}
      />
    </main>
  );
}

export default MainContent;
