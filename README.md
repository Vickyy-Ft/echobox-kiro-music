# 🎵 EchoBox Music

A modern, feature-rich web music player built with React and Vite. EchoBox Music delivers a powerful and responsive audio experience for playing local MP3 and WAV files directly in your browser, featuring comprehensive keyboard shortcuts, flexible theme customization, and advanced playlist management capabilities.

> **Built with ❤️ as part of Kiro University Challenge 2026**

![EchoBox Music](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Kiro University](https://img.shields.io/badge/Kiro-University%202026-7c6af7)

## ✨ Features

EchoBox Music provides a complete music player experience with modern controls, flexible playlist management, and seamless integration across all your devices.

### 🎧 **Playback Controls**
- **Play/Pause** - Smooth, responsive playback with debounced controls and instant keyboard shortcuts (press Spacebar)
- **Seek** - Jump to any position in a track with precision and real-time progress visualization
- **Volume Control** - Adjust volume levels smoothly with persistence across browser sessions
- **Previous/Next** - Navigate through your queue seamlessly using arrow keys for quick track switching
- **Auto-Advance** - Automatically transitions to the next track when the current one finishes
- **⌨️ Keyboard Shortcuts** - Control all playback features using only your keyboard, no mouse required!

### 📝 **Playlist Management**
- **Create Playlists** - Organize your music into custom collections with personalized naming
- **Add/Remove Tracks** - Build and modify your perfect playlist with intuitive track management
- **Delete Playlists** - Remove playlists with protective confirmation prompts to prevent accidents
- **Import/Export** - Share playlists with friends and backup collections via JSON file format
- **Persistent Storage** - All playlists automatically saved to localStorage and survive page refreshes

### 🔍 **Search & Discovery**
- **Real-time Search** - Filter tracks instantly by title or artist name as you type, with instant results
- **Track Catalog** - Browse and explore your complete music collection with full track metadata
- **Active Track Highlighting** - Visual indicator always shows which track is currently playing

### 🎨 **Modern UI/UX**
- **Dark/Light Theme Toggle** - Switch between dark and light themes based on your preferences
- **Custom Color Scheme** - Distinctive purple and teal accent colors throughout the interface
- **Responsive Design** - Seamlessly adapts to desktop, tablet, and mobile screen sizes
- **Accessibility** - Fully compliant with WCAG AA standards with complete keyboard navigation and ARIA labels
- **Fixed Now Playing Bar** - Always-visible player controls at the bottom for continuous access

### 💾 **Smart Persistence**
- **Volume Memory** - Your preferred volume level is automatically saved and restored on every session
- **Theme Preference** - Your chosen theme persists permanently across browser sessions
- **Playlist Storage** - All custom playlists are automatically saved and survive page refreshes
- **Queue State** - Current playback queue is maintained and restored during active playback sessions

All features work together seamlessly to provide a cohesive, enjoyable listening experience.

## 🚀 Getting Started

Get EchoBox Music running on your machine in just a few minutes with these simple steps.

### Prerequisites

- **Node.js** 16 or higher (Node.js 18 LTS or 20 LTS strongly recommended for best compatibility)
- **npm** 7 or higher, or **yarn** 1.22 or higher
- A modern web browser with HTML5 Audio API support

### Installation

Quick setup to get EchoBox running on your machine:

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
   Navigate to `http://localhost:5173` in your web browser to view the application

### Build for Production

Create an optimized production-ready build:

```bash
npm run build
```

The optimized production build will be generated in the `dist/` folder with minified assets and performance optimizations.

### Preview Production Build

Test the production build locally before deployment:

```bash
npm run preview
```

This command starts a local server to preview your optimized production build and verify everything works correctly.

## 🧪 Testing

EchoBox Music includes a comprehensive automated test suite with unit tests, component tests, integration tests, and property-based tests powered by fast-check.

**Testing Stack:** Vitest + @testing-library/react + fast-check for comprehensive coverage

```bash
npm test
```

The test suite runs in parallel for maximum speed and provides immediate feedback during development.

**Test Coverage:**
- ✅ Reducer action handlers with comprehensive state transitions (unit tests)
- ✅ Audio engine lifecycle and media event handling (unit + property tests)
- ✅ Playlist CRUD operations with edge cases (unit + property tests)
- ✅ Component rendering and user interactions (@testing-library/react)
- ✅ Utility functions with property-based correctness validation (formatDuration, filterTracks, queueUtils, storageUtils)
- ✅ 20+ property-based invariants validated across 200+ iterations each

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

EchoBox Music works on all modern browsers that support HTML5 Audio:

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome/Edge** | 90+ | Complete feature support including keyboard shortcuts and all accessibility features |
| **Firefox** | 88+ | Full support with excellent audio quality and performance |
| **Safari** | 14+ | Complete support on macOS and iOS devices with all features |
| **Opera** | 76+ | Chromium-based browser with full feature support |
| **Mobile Browsers** | Modern | Responsive design fully optimized for touch-based mobile interaction |

**Requirements:**
- JavaScript enabled (obviously)
- localStorage available for playlist persistence
- HTML5 Audio API support
- Modern ES2020+ JavaScript features

**Known Limitations:**
- Autoplay may be blocked by browser policy (user must click play first)
- Volume control may be disabled on some mobile devices
- Seek functionality depends on audio CORS headers

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

EchoBox Music provides complete keyboard control for power users and accessibility needs. Control playback entirely without your mouse using these essential shortcuts:

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

- **Visible Focus Indicators**: Every interactive element displays a clear, bright outline when focused using keyboard navigation for easy visibility
- **No Mouse Required**: The entire application is fully operable using keyboard controls only
- **Screen Reader Friendly**: All controls include comprehensive ARIA labels for screen reader compatibility
- **Play Button Disabled?**: If the play button appears dimmed or disabled, select a track first to enable playback

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

1. **Open EchoBox** in your web browser
2. **Locate and expand a playlist** in the Sidebar by clicking on its name
3. **Click the download arrow icon** (↓) positioned next to the playlist name
4. Your browser **automatically downloads a JSON file** to your default Downloads folder
   - The filename follows the format: `playlist-name_playlist.json`
   - Safe to rename, move, or organize the file in folders as needed

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

1. **Open EchoBox** in your web browser
2. **Locate and click the "📁 Import Playlist"** button in the Sidebar
3. **Select a `.json` file** from your computer's file system
4. The playlist is **instantly added** to your collection with all tracks preserved
5. A success confirmation message will appear; any errors display helpful error messages

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

## ♿ Accessibility & Inclusive Design

EchoBox Music is designed to be fully accessible to all users, including those using assistive technologies.

### WCAG AA Compliance

The application is designed and built to meet **WCAG 2.1 Level AA** accessibility standards:
- ✅ Complete keyboard navigation support with Tab, Spacebar, and Arrow keys
- ✅ Focus indicators clearly visible on all interactive interface elements
- ✅ Semantic HTML structure with comprehensive ARIA label annotations
- ✅ Color contrast ratios exceed WCAG AA requirements (minimum 4.5:1 for text)
- ✅ All interactive controls include descriptive accessibility labels
- ✅ Error messages are communicated clearly with actionable guidance

### Screen Reader Support

- All interactive elements have descriptive `aria-label` attributes
- Form inputs use associated `<label>` elements
- Regions marked with `role` attributes for logical navigation
- Live regions (`aria-live="polite"`) announce state changes
- Lists and navigation structures use semantic HTML

### Keyboard Navigation

Complete keyboard control without mouse:
- **Tab** — Navigate through interactive elements
- **Shift+Tab** — Reverse navigation
- **Spacebar** — Play/Pause
- **Arrow Keys** — Next/Previous track, volume/seek adjustment
- **Enter** — Activate buttons and dialogs
- **Escape** — Close dialogs

### Color & Contrast

- Dark theme with high contrast text (WCAG AA compliant)
- No information conveyed by color alone
- Focus indicators use color + outline
- Status indicated with text labels, not just color changes

### Motor Accessibility

- Large touch targets on mobile (minimum 44×44 pixels)
- Keyboard-only operation fully supported
- No gestures required
- Sufficient spacing between interactive elements
- Debounced controls prevent accidental triggers

## 🆘 Troubleshooting

### Audio Won't Play

**Problem:** You press the play button but hear no audio output

**Solutions to try:**
1. Open your browser's developer console (F12 → Console tab) to check for error messages
2. Verify that audio files exist in the `public/audio/` directory on your system
3. Confirm that the `src` path in the catalog file matches the actual audio file location exactly
4. Test playback with a different audio file to determine if the issue is file-specific
5. Verify your browser's audio volume and system volume are not muted

**Common Errors:**
- `NetworkError` → Audio file not found or CORS issue
- `NotSupportedError` → Audio format not supported by browser
- `NotAllowedError` → Autoplay blocked; click play button to start

### Playlists Not Saving

**Problem:** Your playlists disappear or don't persist after you refresh the page

**Solutions to try:**
1. Verify that browser localStorage is enabled in your browser settings
   - Access Settings → Privacy & Security → "Allow local data storage"
2. Confirm you're not using a private or incognito browser window (session data is cleared on close)
3. Check your browser's storage quota hasn't been exceeded (typically 5-10MB per site)
4. Try exporting your playlists as a backup before clearing your browser cache

### Keyboard Shortcuts Not Working

**Problem:** Keyboard shortcuts don't respond

**Solutions:**
1. Ensure EchoBox window has focus (click anywhere in app)
2. Verify number lock is on for numeric keys
3. Check if browser extension intercepts keyboard (disable temporarily)
4. Try different browser to isolate OS-level issue

## 📚 Setup Instructions

### First Time Setup

1. **Prerequisites**
   - Node.js version 16 or higher (Node.js 18 or 20 LTS recommended for best performance)
   - npm version 7 or higher, or yarn version 1.22 or higher
   - Git version control system for cloning the repository

2. **Clone & Install**
   ```bash
   git clone https://github.com/Vickyy-Ft/echobox-kiro-music.git
   cd echobox-kiro-music
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   # Development server starts at http://localhost:5173
   ```

### Development Workflow

Before committing:
1. ✅ `npm test` — all tests pass
2. ✅ `npm run build` — production build succeeds
3. ✅ Manual testing in browser
4. ✅ No console errors or warnings

## 📊 Project Structure

**`src/components/`** — UI components organized by feature
**`src/context/`** — React Context + Reducer state management
**`src/hooks/`** — Custom hooks (audio engine, playlist manager)
**`src/utils/`** — Pure utility functions (formatting, filtering, etc.)
**`src/styles/`** — CSS with design system variables
**`src/test/`** — Unit, integration, and property-based tests
**`.kiro/`** — Kiro IDE configuration (specs, steering, hooks)

## 🎓 Kiro Lessons & Patterns

### State Management Architecture

- **Single Centralized Reducer** — Each mutation is an explicit action, enabling clear traceability and centralized business logic
- **Never Store Audio State in React** — Keep the audio element as a ref only; derive playback state from React Context instead
- **Dispatch Actions on Events** — Respond to audio events by dispatching reducer actions rather than reading from the DOM directly

### Custom Hooks as Clear Boundaries

- `useAudioEngine` — Encapsulates complete audio lifecycle and playback control
- `usePlaylistManager` — Handles all playlist persistence and localStorage synchronization
- Well-defined boundaries make hooks easier to test, reuse across components, and refactor confidently

### Data Persistence Patterns

- **Write-Then-Set Pattern** — Always persist changes to localStorage before updating in-memory state for safety and reliability
- **Defensive Parsing on Load** — Validate all persisted data strictly and default gracefully to avoid silent state corruption
- **Silent Failures for Robustness** — Catch storage errors without blocking; better to lose a preference than crash the app

### Key Testing Discoveries

Property-based tests uncovered edge cases that traditional unit tests overlooked:
- Volume clamping with invalid values (NaN, Infinity, negative numbers)
- Queue navigation behavior at array boundaries
- Data serialization round-trip integrity and type preservation
- Robustness with corrupted or partially invalid data

## 🎯 Kiro Integration & Artifacts

EchoBox Music was built with [**Kiro**](https://kiro.dev), an AI-powered development environment. This section documents how Kiro is used in the project.

### Kiro Powers Used

- **[echobox-react-audio-power](https://kiro.dev/powers)** — Provides guidance on building React music players with HTML5 Audio API, shared playback state, playlists, and playback controls. This power informed the audio engine architecture and player controls design.

### Project Configuration in `.kiro/`

All Kiro project files are stored in `.kiro/`:

```
.kiro/
├── specs/                 # Project requirements and design specifications
│   └── *.md              # Feature specs with acceptance criteria
├── steering/             # Development workflow guidelines
│   ├── 01-architecture.md    # State management and component patterns
│   ├── 02-testing.md         # Testing strategy with 20+ properties
│   ├── 03-styling.md         # CSS conventions and design system
│   └── 04-build-and-deploy.md # Build workflow and scripts
├── hooks/                # Automation and validation hooks
│   └── *.json           # Pre-commit, build, and code review
└── agents/              # Custom Kiro agents
    └── *.md             # Specialized execution patterns
```

### Steering Files — Development Standards

EchoBox uses Kiro steering files to enforce consistency:

1. **`01-architecture.md`** — React + Context + Reducer pattern, centralized state, hook lifecycle
2. **`02-testing.md`** — Vitest + @testing-library/react + fast-check with 20 property-based correctness tests
3. **`03-styling.md`** — CSS custom properties, responsive design, WCAG AA accessibility
4. **`04-build-and-deploy.md`** — npm scripts, development workflow, production validation

### Automation Hooks

Kiro hooks automate development tasks:

- **Pre-commit validation** — Runs tests and linting before commits
- **Build verification** — Ensures production builds succeed
- **Code review agents** — Performs behavioral and semantic analysis

### Working with Kiro

To work on EchoBox in Kiro:

1. Open in **Kiro IDE** (VS Code with Kiro extension)
2. Read `.kiro/steering/` files to understand standards
3. Review `.kiro/specs/` for detailed requirements
4. Use Kiro agents for code review, testing, and refactoring

Learn more at [kiro.dev](https://kiro.dev)

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
