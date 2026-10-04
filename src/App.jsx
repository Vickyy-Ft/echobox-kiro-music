import { useState } from 'react';
import { PlayerProvider } from './context/PlayerProvider';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MainContent } from './components/MainContent/MainContent';
import { NowPlayingBar } from './components/NowPlayingBar/NowPlayingBar';
import { HalloweenIntro } from './components/HalloweenIntro';
import { CATALOG } from './data/catalog';
import './styles/global.css';

/**
 * App — root component that assembles the full EchoBox Music layout.
 *
 * Structure:
 *   HalloweenIntro (splash screen on first load)
 *   PlayerProvider (global player state + audio engine)
 *     app-layout (flex row)
 *       Sidebar      — fixed-width left panel with playlists
 *       MainContent  — search + track list, receives full catalog
 *     NowPlayingBar  — fixed bottom bar (position: fixed in CSS)
 *
 * Requirements: 1.1, 7.1, 9.1
 */
function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <HalloweenIntro onComplete={() => setShowIntro(false)} />}
      
      <PlayerProvider>
        <div className="app-layout">
          <Sidebar />
          <MainContent catalog={CATALOG} />
        </div>
        <NowPlayingBar />
      </PlayerProvider>
    </>
  );
}

export default App;
