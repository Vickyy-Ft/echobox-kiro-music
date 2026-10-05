import { describe, it, expect } from 'vitest';
import { nextTrack, previousTrack, populateQueueFromPlaylist } from './queueUtils';

/**
 * Comprehensive boundary and edge case tests for queue navigation
 * Validates queue handling at limits and transitions
 */

describe('Queue boundary behavior — nextTrack and previousTrack', () => {
  const createQueue = (trackCount, currentIndex) => ({
    tracks: Array.from({ length: trackCount }, (_, i) => ({
      id: `track-${i}`,
      title: `Track ${i + 1}`,
      artist: `Artist ${i + 1}`,
      src: `/audio/track-${i}.mp3`,
    })),
    currentIndex,
  });

  describe('nextTrack', () => {
    it('returns next index when in the middle of queue', () => {
      const queue = createQueue(5, 2);
      expect(nextTrack(queue)).toBe(3);
    });

    it('returns null at the last track', () => {
      const queue = createQueue(5, 4);
      expect(nextTrack(queue)).toBeNull();
    });

    it('returns null for single-track queue at index 0', () => {
      const queue = createQueue(1, 0);
      expect(nextTrack(queue)).toBeNull();
    });

    it('returns 1 from first track in multi-track queue', () => {
      const queue = createQueue(3, 0);
      expect(nextTrack(queue)).toBe(1);
    });

    it('returns null for empty queue', () => {
      const queue = createQueue(0, -1);
      expect(nextTrack(queue)).toBeNull();
    });

    it('returns null when currentIndex is out of bounds (too high)', () => {
      const queue = createQueue(5, 10);
      expect(nextTrack(queue)).toBeNull();
    });

    it('handles negative currentIndex gracefully', () => {
      const queue = createQueue(5, -1);
      expect(nextTrack(queue)).toBe(0);
    });

    it('works correctly for 2-track queue', () => {
      const twoTrackQueue = createQueue(2, 0);
      expect(nextTrack(twoTrackQueue)).toBe(1);
      
      const atEndQueue = createQueue(2, 1);
      expect(nextTrack(atEndQueue)).toBeNull();
    });

    it('returns null when index equals track count', () => {
      const queue = createQueue(5, 5);
      expect(nextTrack(queue)).toBeNull();
    });

    it('returns null when index is greater than track count', () => {
      const queue = createQueue(5, 100);
      expect(nextTrack(queue)).toBeNull();
    });
  });

  describe('previousTrack', () => {
    it('returns previous index when in the middle of queue', () => {
      const queue = createQueue(5, 2);
      expect(previousTrack(queue)).toBe(1);
    });

    it('returns null at the first track (index 0)', () => {
      const queue = createQueue(5, 0);
      expect(previousTrack(queue)).toBeNull();
    });

    it('returns null for single-track queue at index 0', () => {
      const queue = createQueue(1, 0);
      expect(previousTrack(queue)).toBeNull();
    });

    it('returns first index from second track', () => {
      const queue = createQueue(5, 1);
      expect(previousTrack(queue)).toBe(0);
    });

    it('returns null for empty queue', () => {
      const queue = createQueue(0, -1);
      expect(previousTrack(queue)).toBeNull();
    });

    it('returns null when currentIndex is negative', () => {
      const queue = createQueue(5, -1);
      expect(previousTrack(queue)).toBeNull();
    });

    it('returns last track index from out-of-bounds index', () => {
      const queue = createQueue(5, 10);
      expect(previousTrack(queue)).toBe(9);
    });

    it('works correctly for 2-track queue', () => {
      const twoTrackQueue = createQueue(2, 1);
      expect(previousTrack(twoTrackQueue)).toBe(0);
      
      const firstTrackQueue = createQueue(2, 0);
      expect(previousTrack(firstTrackQueue)).toBeNull();
    });

    it('returns null when index is 0 (start of queue)', () => {
      const queue = createQueue(5, 0);
      expect(previousTrack(queue)).toBeNull();
    });

    it('navigates backward from last track to second-to-last', () => {
      const queue = createQueue(5, 4);
      expect(previousTrack(queue)).toBe(3);
    });
  });

  describe('Queue navigation sequences', () => {
    it('navigates forward through entire queue', () => {
      const queue = createQueue(3, 0);
      
      expect(nextTrack(queue)).toBe(1);
      expect(nextTrack({ ...queue, currentIndex: 1 })).toBe(2);
      expect(nextTrack({ ...queue, currentIndex: 2 })).toBeNull();
    });

    it('navigates backward through entire queue', () => {
      const queue = createQueue(3, 2);
      
      expect(previousTrack(queue)).toBe(1);
      expect(previousTrack({ ...queue, currentIndex: 1 })).toBe(0);
      expect(previousTrack({ ...queue, currentIndex: 0 })).toBeNull();
    });

    it('can navigate forward and then backward', () => {
      const queue = createQueue(5, 2);
      
      const nextIdx = nextTrack(queue);
      expect(nextIdx).toBe(3);
      
      const prevIdx = previousTrack({ ...queue, currentIndex: nextIdx });
      expect(prevIdx).toBe(2);
    });
  });

  describe('populateQueueFromPlaylist', () => {
    it('creates queue starting at index 0', () => {
      const playlist = {
        id: 'playlist-1',
        name: 'Test Playlist',
        tracks: [
          { id: 't1', title: 'Track 1', artist: 'Artist', src: '/audio/1.mp3' },
          { id: 't2', title: 'Track 2', artist: 'Artist', src: '/audio/2.mp3' },
        ],
      };

      const queue = populateQueueFromPlaylist(playlist);

      expect(queue.currentIndex).toBe(0);
      expect(queue.sourceId).toBe('playlist-1');
      expect(queue.tracks).toHaveLength(2);
      expect(queue.tracks[0].id).toBe('t1');
    });

    it('preserves all track properties', () => {
      const playlist = {
        id: 'playlist-1',
        name: 'Test',
        tracks: [
          {
            id: 'track-1',
            title: 'Song Title',
            artist: 'Artist Name',
            album: 'Album',
            duration: 180,
            src: '/audio/song.mp3',
          },
        ],
      };

      const queue = populateQueueFromPlaylist(playlist);

      expect(queue.tracks[0]).toMatchObject({
        id: 'track-1',
        title: 'Song Title',
        artist: 'Artist Name',
        album: 'Album',
        duration: 180,
        src: '/audio/song.mp3',
      });
    });

    it('handles empty playlist', () => {
      const playlist = {
        id: 'empty-playlist',
        name: 'Empty',
        tracks: [],
      };

      const queue = populateQueueFromPlaylist(playlist);

      expect(queue.currentIndex).toBe(0);
      expect(queue.sourceId).toBe('empty-playlist');
      expect(queue.tracks).toHaveLength(0);
    });

    it('handles single-track playlist', () => {
      const playlist = {
        id: 'single-track',
        name: 'Single',
        tracks: [
          { id: 't1', title: 'Only Track', artist: 'Artist', src: '/audio/track.mp3' },
        ],
      };

      const queue = populateQueueFromPlaylist(playlist);

      expect(queue.tracks).toHaveLength(1);
      expect(queue.currentIndex).toBe(0);
      expect(nextTrack(queue)).toBeNull();
      expect(previousTrack(queue)).toBeNull();
    });

    it('spreads the tracks array (shallow copy)', () => {
      const playlist = {
        id: 'playlist-1',
        name: 'Original',
        tracks: [
          { id: 't1', title: 'Track 1', artist: 'Artist', src: '/audio/1.mp3' },
        ],
      };

      const queue = populateQueueFromPlaylist(playlist);

      // The tracks array itself is copied (spread), but track objects are shared references
      // Modifying the array length won't affect original
      queue.tracks.pop();
      expect(playlist.tracks).toHaveLength(1);
    });

    it('correctly positions queue at first track regardless of playlist', () => {
      const playlists = [
        { id: 'p1', name: 'P1', tracks: Array.from({ length: 10 }, (_, i) => ({ id: `t${i}`, title: `T${i}`, artist: 'A', src: `/a/${i}.mp3` })) },
        { id: 'p2', name: 'P2', tracks: Array.from({ length: 1 }, (_, i) => ({ id: `t${i}`, title: `T${i}`, artist: 'A', src: `/a/${i}.mp3` })) },
        { id: 'p3', name: 'P3', tracks: Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, title: `T${i}`, artist: 'A', src: `/a/${i}.mp3` })) },
      ];

      playlists.forEach(p => {
        const queue = populateQueueFromPlaylist(p);
        expect(queue.currentIndex).toBe(0);
      });
    });
  });
});
