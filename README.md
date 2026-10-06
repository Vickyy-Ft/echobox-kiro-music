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

**Running tests locally:** Execute `npm test -- --run` for single run or `npm test` for watch mode during development

## 📁 Project Structure

The EchoBox project follows a clear, modular organization for maintainability and scalability:

```
echobox-kiro-music/
├── public/                    # Static assets served by Vite
│   ├── audio/                 # MP3 and WAV audio files
│   ├── favicon.svg            # Application icon for browser tab
│   └── icons.svg              # SVG icon sprite sheet
├── src/                       # Application source code
│   ├── components/            # React components organized by feature
│   │   ├── MainContent/       # Track catalog and search functionality
│   │   ├── NowPlayingBar/     # Player controls and progress display
│   │   └── Sidebar/           # Playlist management interface
│   ├── context/               # Global state management
│   │   ├── PlayerContext.js   # React Context API definition
│   │   ├── PlayerProvider.jsx # Context provider component wrapper
│   │   └── playerReducer.js   # Redux-style reducer for all player actions
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAudioEngine.js  # HTML5 Audio lifecycle and playback control
│   │   └── usePlaylistManager.js # Playlist CRUD and localStorage persistence
│   ├── utils/                 # Pure utility functions
│   │   ├── filterTracks.js    # Real-time search and track filtering
│   │   ├── formatDuration.js  # Time formatting (minutes:seconds)
│   │   ├── queueUtils.js      # Queue navigation and seek helpers
│   │   └── storageUtils.js    # localStorage persistence helpers
│   ├── styles/                # CSS stylesheets
│   │   ├── variables.css      # Design system tokens (colors, spacing)
│   │   ├── global.css         # Global resets and app layout
│   │   ├── NowPlayingBar.css  # Player control styles
│   │   ├── Sidebar.css        # Playlist sidebar styles
│   │   └── TrackList.css      # Track list component styles
│   ├── data/                  # Static data
│   │   └── catalog.js         # Audio track catalog (static metadata)
│   ├── test/                  # Test files
│   │   ├── *.test.js/.jsx     # Unit and integration tests
│   │   ├── *.property.test.js # Property-based tests
│   │   └── setup.js           # Test environment configuration
│   ├── App.jsx                # Root component entry point
│   ├── main.jsx               # React 19 entry point
│   └── index.css              # Global CSS imports
├── .kiro/                     # Kiro IDE configuration
│   ├── specs/                 # Feature specifications and requirements
│   ├── steering/              # Development guidelines and patterns
│   ├── hooks/                 # Automation and CI/CD hooks
│   └── agents/                # Custom Kiro execution agents
├── index.html                 # HTML document root
├── vite.config.js             # Vite build tool configuration
├── package.json               # Dependencies, scripts, and metadata
└── README.md                  # This comprehensive guide
```

### Directory Purposes

- **public/** - Static assets that don't require bundling
- **src/components/** - React UI components organized by feature area
- **src/context/** - Centralized state management and reducer logic
- **src/hooks/** - Custom hooks for audio, playlists, and persistence
- **src/utils/** - Reusable pure functions and helpers
- **src/styles/** - CSS with design system variables
- **src/test/** - All test files (unit, integration, property-based)

## 🏗️ Architecture

EchoBox Music implements a **scalable, event-driven architecture** with clear separation of concerns and unidirectional data flow.

### State Management
- **React Context + useReducer** - Single source of truth for all playback state and player configuration
- **Reducer Pattern** - All state transitions are explicit, testable, and traceable
- **Memoized Context** - Optimized to prevent unnecessary re-renders during high-frequency audio updates

### Audio Engine
- **Single Audio Instance** - One centralized HTMLAudioElement for the entire application lifecycle
- **Event-Driven Architecture** - Audio events dispatch actions to reducer for state synchronization
- **Debounced Controls** - 50ms debounce window prevents audio glitching during rapid play/pause
- **Load Abortion** - Prevents stale audio loads from interrupting rapid track switching

### Playlist Management
- **Independent Hook** - Playlist state management completely separate from playback engine
- **Write-Then-Set** - Changes always persist to localStorage before updating in-memory state
- **Full Denormalization** - Playlists store complete track objects for resilience to catalog changes

### Data Flow

The unidirectional data flow ensures predictable state changes and easier debugging:

```
User Interaction (click, type, keyboard)
    ↓
Component calls audio engine or playlist manager method
    ↓
Method updates audio element or localStorage
    ↓
Audio event fires or storage completes
    ↓
Event listener dispatches reducer action with payload
    ↓
Reducer computes new state based on current state + action
    ↓
Context value updates and notifies all subscribers
    ↓
Connected components re-render with latest state
```

## 🎨 Design System

EchoBox uses a carefully crafted **dark theme design system** built entirely with CSS custom properties for maximum flexibility and consistency.

### Color Palette (Dark Theme)
```css
--color-bg-base:      #0f0f13  /* Main app background, darkest */
--color-bg-surface:   #1a1a24  /* Card and surface backgrounds */
--color-bg-elevated:  #24243a  /* Hover and active states */
--color-text-primary: #e8e8f0  /* Main text, high contrast */
--color-text-secondary: #9898b0 /* Muted text, reduced contrast */
--color-accent:       #7c6af7  /* Interactive elements and highlights */
--color-error:        #ff5a5f  /* Error states and warnings */
```

### Typography
- **Font Family:** Inter, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif (system font stack)
- **Base Size:** 16px (standard for web accessibility)
- **Scale:** xs (12px), sm (14px), base (16px), lg (18px), xl (20px) for consistent text hierarchy

### Spacing Scale
- **xs:** 4px (minimal spacing for tight layouts)
- **sm:** 8px (small components and gaps)
- **md:** 16px (standard section spacing)
- **lg:** 24px (major component spacing)
- **xl:** 32px (large layout spacing)

## 🛠️ Technology Stack

EchoBox Music is built with proven, modern technologies that provide excellent developer experience and performance:

- **React 19** - Latest React version with concurrent rendering and automatic batching
- **Vite 8** - Lightning-fast build tool with hot module replacement and optimized production builds
- **HTML5 Audio API** - Native browser audio capabilities for MP3 and WAV playback
- **localStorage** - Browser-native client-side persistence for playlists and preferences
- **Vitest** - Fast, Jest-compatible unit testing framework with native ESM support
- **@testing-library/react** - Accessible component testing focused on user behavior
- **fast-check** - Property-based testing for finding edge cases and verifying invariants
- **ESLint** - Static code analysis and style consistency enforcement

## 🎯 Browser Support

EchoBox Music is designed to work seamlessly on all modern browsers with HTML5 Audio API support.

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| **Chrome** | 90+ | ✅ Complete | Full feature support including keyboard shortcuts and all accessibility features |
| **Edge** | 90+ | ✅ Complete | Chromium-based with identical feature parity to Chrome |
| **Firefox** | 88+ | ✅ Complete | Excellent audio quality and consistent performance across platforms |
| **Safari** | 14+ | ✅ Complete | Full support on macOS and iOS with all interactive features |
| **Opera** | 76+ | ✅ Complete | Chromium-based browser with complete feature support |
| **Mobile Browsers** | Modern | ✅ Complete | Responsive design fully optimized for touch interaction |

**Technical Requirements:**
- JavaScript must be enabled (required for React and all features)
- localStorage available for playlist and preference persistence
- HTML5 Audio API support (universal on modern browsers)
- Modern ES2020+ JavaScript features (widely supported)

**Known Limitations:**
- Autoplay may be blocked by browser policy (user must click play first)
- Volume control may be disabled on some mobile devices for OS-level control
- Seek functionality requires proper CORS headers on audio files

## 📝 Adding Audio Tracks

Customize EchoBox with your own music collection. Follow these steps to add and manage your audio files:

### Step 1: Prepare Audio Files

1. Gather your audio files in MP3 or WAV format
2. Place them in the `public/audio/` directory
3. Use URL-safe filenames (replace spaces with hyphens or underscores)
   - ✅ Good: `my-favorite-song.mp3`
   - ❌ Avoid: `my favorite song.mp3`

### Step 2: Update the Track Catalog

Open `src/data/catalog.js` and add an entry for each track:

```javascript
export const CATALOG = [
  {
    id: 'unique-track-id',           // Unique identifier for the track
    title: 'Track Title',             // Display name of the song
    artist: 'Artist Name',            // Creator of the track
    album: 'Album Name',              // Album or collection name
    duration: 197,                    // Duration in seconds (calculate: minutes * 60 + seconds)
    src: '/audio/your-file.mp3',     // Path to audio file relative to public/
  },
  // Add more tracks here...
];
```

### Track Properties Explained

- **id**: Unique identifier (use kebab-case, e.g., `track-001`)
- **title**: Song name (displayed in player)
- **artist**: Creator name (displayed in player)
- **album**: Album or collection (for organization)
- **duration**: Length in seconds (use `Math.round()` for accuracy)
- **src**: Relative path from `public/` (always start with `/audio/`)

### Step 3: Test and Deploy

1. Restart the development server
   ```bash
   npm run dev
   ```

2. Verify tracks appear in the catalog and play correctly

3. Build production version
   ```bash
   npm run build
   ```

4. Deploy to production hosting

### Pro Tips

- **Duration calculation**: Use browser DevTools to check actual audio duration
- **Audio quality**: 128-320 kbps MP3 offers good balance of quality and file size
- **Batch additions**: You can add multiple tracks at once before rebuilding
- **Updates**: Changes to catalog.js require server restart in development

## ⌨️ Keyboard Shortcuts

Master EchoBox Music entirely from your keyboard with these comprehensive shortcuts. Perfect for power users, accessibility, and workflows where mouse use isn't practical.

| Shortcut | Action | Use Case |
|----------|--------|----------|
| **Spacebar** | Play / Pause | Quick toggle for playback control |
| **→ Right Arrow** | Next Track | Skip to the next song in queue |
| **← Left Arrow** | Previous Track | Jump to previous song (press twice within 3 seconds to restart) |
| **Tab** | Navigate Forward | Move focus through all interactive elements systematically |
| **Shift + Tab** | Navigate Backward | Move focus backward through interactive elements |
| **Enter** | Activate / Select | Confirm dialogs, select tracks, and create playlists |
| **Escape** | Close / Dismiss | Close modal dialogs and the Halloween intro screen |
| **↑ / ↓ Arrows** | Volume / Seek | Adjust volume on slider or seek within track |

### Focus Navigation

Navigate through all interactive controls using Tab and Shift+Tab:

- **Play/Pause Button** — Tab to reach it, then Spacebar to toggle playback state
- **Seek Bar** — Tab to focus, then Arrow keys to seek backward or forward
- **Volume Slider** — Tab to focus, then Arrow keys to adjust volume up or down
- **Playlist Items** — Tab through all playlists, Enter to start playback
- **Track Items** — Tab through all tracks, Enter to select and play
- **All Controls** — Full keyboard navigation without requiring mouse

### Tips for Keyboard Users

- **Visible Focus Indicators** — Every interactive element displays a clear, bright outline when focused using keyboard navigation
- **No Mouse Required** — The entire application is fully operable using only keyboard shortcuts
- **Screen Reader Compatible** — All controls include comprehensive ARIA labels for screen reader users
- **Consistent Navigation** — Tab order follows logical document flow for predictable navigation
- **Play Button Disabled?** — If the play button appears dimmed, select a track from the list first to enable playback

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
