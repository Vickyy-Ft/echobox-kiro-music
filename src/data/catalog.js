/**
 * Static track catalog for EchoBox Music.
 * Audio files are served from the /public/audio/ directory.
 *
 * @type {import('../types').Track[]}
 */
export const CATALOG = [
  {
    id: 'track-01',
    title: 'Example Track 1',
    artist: 'Artist A',
    album: 'Album One',
    duration: 213, // seconds
    src: '/audio/track01.mp3',
  },
  {
    id: 'track-02',
    title: 'Example Track 2',
    artist: 'Artist B',
    album: 'Album Two',
    duration: 187, // seconds
    src: '/audio/track02.wav',
  },
];
