# 🎵 EchoBox Music

A modern, feature-rich web music player built with React and Vite. EchoBox Music delivers a powerful audio experience for playing local MP3 and WAV files directly in your browser, featuring keyboard shortcuts, theme customization, and advanced playlist management.

> **Built with ❤️ as part of Kiro University Challenge 2026**

![EchoBox Music](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Kiro University](https://img.shields.io/badge/Kiro-University%202026-7c6af7)

## ✨ Features

### 🎧 **Playback Controls**
- **Play/Pause** - Smooth playback with debounced controls and keyboard shortcuts (Spacebar)
- **Seek** - Jump to any position in a track with real-time progress tracking
- **Volume Control** - Adjust volume with persistence across sessions
- **Previous/Next** - Navigate through your queue with arrow keys
- **Auto-Advance** - Automatically plays the next track when one finishes
- **⌨️ Keyboard Shortcuts** - Control playback without touching your mouse!

### 📝 **Playlist Management**
- **Create Playlists** - Organize your music into custom collections
- **Add/Remove Tracks** - Build your perfect playlist with ease
- **Delete Playlists** - Clean up with confirmation prompts
- **Import/Export** - Share playlists with friends via JSON files
- **Persistent Storage** - Playlists saved to localStorage, survive page refreshes

### 🔍 **Search & Discovery**
- **Real-time Search** - Filter tracks by title or artist as you type
- **Track Catalog** - Browse your complete music collection
- **Active Track Highlighting** - Always know what's playing

### 🎨 **Modern UI/UX**
- **Dark/Light Theme Toggle** - Choose your preferred viewing experience
- **Custom Color Scheme** - Unique purple and teal accents
- **Responsive Design** - Works beautifully on desktop and mobile
- **Accessibility** - WCAG AA compliant with keyboard navigation and ARIA labels
- **Fixed Now Playing Bar** - Always visible controls at the bottom

### 💾 **Smart Persistence**
- **Volume Memory** - Your preferred volume level is remembered
- **Theme Preference** - Your chosen theme persists across sessions
- **Playlist Storage** - All playlists persist across sessions
- **Queue State** - Active queue maintained during playback

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ (recommended: 18 or 20)
- **npm** 7+ or **yarn** 1.22+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vickyy-Ft/echobox-kiro-music.git
   cd echobox-kiro-music
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

EchoBox Music includes a comprehensive test suite with unit tests, component tests, and property-based tests.

```bash
npm test
```

**Test Coverage:**
- ✅ Reducer action handlers (unit tests)
- ✅ Audio engine behavior (unit + property tests with fast-check)
- ✅ Playlist manager CRUD operations (unit + property tests)
- ✅ Component rendering (@testing-library/react)
- ✅ Utility functions (formatDuration, filterTracks, queueUtils, storageUtils)
- ✅ Property-based invariants (20 properties validated)

## 📁 Project Structure

```
echobox-kiro-music/
├── public/
│   ├── audio/                  # Audio files (MP3/WAV)
│   ├── favicon.svg            # App icon
│   └── icons.svg              # UI icons
├── src/
│   ├── components/
│   │   ├── MainContent/       # Track list, search bar
│   │   ├── NowPlayingBar/     # Playback controls, seek bar
│   │   └── Sidebar/           # Playlist management
│   ├── context/
│   │   ├── PlayerContext.js   # React Context definition
│   │   ├── PlayerProvider.jsx # Context provider with state
│   │   └── playerReducer.js   # State reducer (all actions)
│   ├── hooks/
│   │   ├── useAudioEngine.js  # HTML5 Audio lifecycle hook
│   │   └── usePlaylistManager.js # Playlist CRUD hook
│   ├── utils/
│   │   ├── filterTracks.js    # Search filtering logic
│   │   ├── formatDuration.js  # Time formatting (MM:SS)
│   │   ├── queueUtils.js      # Queue navigation helpers
│   │   └── storageUtils.js    # localStorage persistence
│   ├── styles/
│   │   ├── variables.css      # CSS custom properties (theme)
│   │   ├── global.css         # Global styles and resets
│   │   ├── NowPlayingBar.css  # Fixed bottom bar styles
│   │   ├── Sidebar.css        # Playlist sidebar styles
│   │   └── TrackList.css      # Track list styles
│   ├── data/
│   │   └── catalog.js         # Static track catalog
│   ├── test/                  # Test files (unit, property, component)
│   ├── App.jsx                # Root component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global CSS imports
├── .kiro/                     # Kiro IDE configuration
│   ├── specs/                 # Requirements and design specs
│   ├── steering/              # Development guidelines
│   ├── hooks/                 # Kiro automation hooks
│   └── agents/                # Custom Kiro agents
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🏗️ Architecture

EchoBox Music follows a **centralized state management** pattern with clear separation of concerns:

### State Management
- **React Context + useReducer** - Single source of truth for playback state
- **Reducer Pattern** - All state transitions are explicit and testable
- **Memoized Context** - Prevents unnecessary re-renders during high-frequency updates

### Audio Engine
- **Single Audio Instance** - One HTMLAudioElement for the entire app lifecycle
- **Event-Driven** - Audio events dispatch actions to the reducer
- **Debounced Controls** - 50ms debounce prevents audio glitching
- **Load Abortion** - Prevents stale audio loads during rapid track switching

### Playlist Management
- **Independent Hook** - Separate from playback state
- **Write-Then-Set** - Persists to localStorage before updating state
- **Full Denormalization** - Stores complete track objects for catalog independence

### Data Flow
```
User Interaction
    ↓
Component calls audioEngine method
    ↓
Audio element updates → Audio event fires
    ↓
Event listener dispatches action
    ↓
Reducer updates state
    ↓
Context value changes
    ↓
Components re-render
```

## 🎨 Design System

### Color Palette (Dark Theme)
```css
--color-bg-base:      #0f0f13  /* App background */
--color-bg-surface:   #1a1a24  /* Cards, bars */
--color-bg-elevated:  #24243a  /* Hover states */
--color-text-primary: #e8e8f0  /* Main text */
--color-text-secondary: #9898b0 /* Muted text */
--color-accent:       #7c6af7  /* Purple accent */
--color-error:        #ff5a5f  /* Error states */
```

### Typography
- **Font Family:** Inter, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif
- **Base Size:** 16px
- **Scale:** xs (12px), sm (14px), base (16px), lg (18px), xl (20px)

### Spacing Scale
- **xs:** 4px, **sm:** 8px, **md:** 16px, **lg:** 24px, **xl:** 32px

## 🛠️ Technology Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **HTML5 Audio API** - Native audio playback
- **localStorage** - Client-side persistence
- **Vitest** - Testing framework
- **@testing-library/react** - Component testing
- **fast-check** - Property-based testing
- **ESLint** - Code linting

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📝 Adding Audio Tracks

To add your own music to EchoBox:

1. **Add audio files** to `public/audio/`
   - Supported formats: MP3, WAV
   - Use URL-safe filenames (spaces → `%20`)

2. **Update the catalog** in `src/data/catalog.js`
   ```javascript
   export const CATALOG = [
     {
       id: 'unique-track-id',
       title: 'Track Title',
       artist: 'Artist Name',
       album: 'Album Name',
       duration: 197, // in seconds
       src: '/audio/your-file.mp3',
     },
     // ... more tracks
   ];
   ```

3. **Rebuild and test**
   ```bash
   npm run build
   npm run preview
   ```

## ⌨️ Keyboard Shortcuts

EchoBox is fully keyboard accessible. Use these shortcuts to control playback without touching your mouse:

| Shortcut | Action | Use Case |
|----------|--------|----------|
| **Spacebar** | Play / Pause | Quick toggle for playback |
| **→ Right Arrow** | Next Track | Skip to the next song in queue |
| **← Left Arrow** | Previous Track | Jump to previous song; press again within 3 seconds to restart current track |
| **Tab** | Navigate Focus | Move focus through all interactive elements (buttons, inputs, playlists) |
| **Shift + Tab** | Focus Backward | Navigate backward through interactive elements |
| **Enter** | Activate / Select | Confirm dialogs, select tracks, create playlists |
| **Escape** | Close / Dismiss | Close the Halloween intro splash screen |
| **0–1 (numeric)** | Set Volume | *Future feature* — 0 = mute, 1 = max (when implemented) |

### Focus Navigation

- **Play/Pause Button**: Press **Tab** to reach the play button, then **Spacebar** to toggle
- **Seek Bar**: **Tab** to focus, then **← →** arrows to seek backward/forward
- **Volume Slider**: **Tab** to focus, then **← →** arrows to adjust volume
- **Playlist Items**: **Tab** to navigate through playlists, **Enter** to play
- **Track Items**: **Tab** to move through tracks, **Enter** to select

### Tips for Keyboard Users

- **Visible Focus Indicators**: All interactive elements show a bright outline when focused via keyboard
- **No Mouse Required**: Full application control is possible with keyboard only
- **Screen Reader Friendly**: All controls have descriptive ARIA labels for assistive technology
- **Play Button Disabled?**: If the play button appears dimmed, no track is selected. Select a track first

## 🔐 Privacy & Data

EchoBox Music is **100% client-side** and requires **no backend**:
- ✅ No user accounts or authentication
- ✅ No external API calls
- ✅ No data collection or tracking
- ✅ All data stored locally in your browser
- ✅ Works offline after initial load

## 📤 Playlist Import / Export

EchoBox lets you save, share, and import playlists as JSON files. This is perfect for backing up your collections or sharing music recommendations with friends.

### Exporting a Playlist

1. **Open EchoBox** in your browser
2. **Expand a playlist** in the Sidebar by clicking on it
3. **Click the download icon** (↓) next to the playlist name
4. A **JSON file** is downloaded to your default Downloads folder
   - File name format: `playlist-name_playlist.json`
   - Safe to rename or organize into folders

**Example exported file:**
```json
{
  "id": "unique-playlist-id",
  "name": "My Favorites",
  "tracks": [
    {
      "id": "track-1",
      "title": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "duration": 180,
      "src": "/audio/song.mp3"
    }
  ]
}
```

### Importing a Playlist

1. **Open EchoBox** in your browser
2. **Click the "📁 Import Playlist"** button in the Sidebar
3. **Select a `.json` file** from your computer
4. The playlist is **instantly added** to your collection
5. A success message appears; any errors will be shown

**Tips for importing:**
- Only valid `.json` files are accepted
- Imported playlists keep their original name and track order
- If a playlist with the same name exists, it's imported as a separate copy
- Track audio files must still be available (same `src` paths)
- If a track's audio file is missing, the import still succeeds but playback will fail for that track

### Sharing Playlists

1. **Export your playlist** as JSON (see Export section above)
2. **Share the file** via email, chat, cloud storage, or any file-sharing method
3. Your friend can **import the playlist** into their own EchoBox instance

### Backup Your Playlists

1. **Regularly export** all your playlists
2. **Store the files** in a cloud folder (Google Drive, Dropbox, OneDrive)
3. **If you clear browser data**, re-import your playlists to restore them instantly

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass (`npm test`)
- Verify production build works (`npm run build`)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as part of the **Kiro University Challenge 2026**
- Architecture guided by the **EchoBox React Audio Power**
- Inspired by modern music streaming interfaces
- Special thanks to the React and Vite communities

## 📬 Contact

**Vignesh K**
- GitHub: [@Vickyy-Ft](https://github.com/Vickyy-Ft)
- Repository: [echobox-kiro-music](https://github.com/Vickyy-Ft/echobox-kiro-music)

## 🚧 Roadmap

Future enhancements planned:
- [ ] Shuffle mode
- [ ] Repeat modes (one, all)
- [ ] Keyboard shortcuts
- [ ] Playlist export/import
- [ ] Equalizer controls
- [ ] Theme customization
- [ ] Mobile app (PWA)

---

**⭐ Star this repo if you found it helpful!**

Built with ❤️ using React, Vite, and HTML5 Audio API
