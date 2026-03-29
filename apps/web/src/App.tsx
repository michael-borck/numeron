import { useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useStore } from './store';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Decode } from './pages/Decode';
import { Systems } from './pages/Systems';
import { Explore } from './pages/Explore';
import { About } from './pages/About';
import { Calendar } from './pages/Calendar';
import { Compatibility } from './pages/Compatibility';
import { Share } from './pages/Share';
import { ReverseLookup } from './pages/ReverseLookup';

// Lazy-load PDF page — @react-pdf/renderer is ~600KB
const Report = lazy(() => import('./pages/Report').then((m) => ({ default: m.Report })));

function LoadingFallback() {
  return (
    <div className="text-center py-16 font-terminal text-sm text-[var(--text-secondary)]">
      {'> '}LOADING...
    </div>
  );
}

export function App() {
  const { activateChaosMode, chaosMode } = useStore();
  const handleKonami = useCallback(() => activateChaosMode(), [activateChaosMode]);
  useKonamiCode(handleKonami);

  return (
    <div className="scanlines min-h-screen flex flex-col">
      <DisclaimerBanner />
      {chaosMode && (
        <div className="bg-[var(--accent)] text-[var(--bg-primary)] font-terminal text-xs text-center py-2 tracking-widest">
          {'> '}CHAOS MODE ACTIVATED // all interpretations are now extremely accurate
        </div>
      )}
      <Nav />
      <main className="flex-1 px-4 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/decode" element={<Decode />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/compare" element={<Compatibility />} />
          <Route path="/reverse" element={<ReverseLookup />} />
          <Route path="/report" element={<Suspense fallback={<LoadingFallback />}><Report /></Suspense>} />
          <Route path="/share/:encoded" element={<Share />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="border-t border-[var(--border)] py-4 px-4 text-center">
        <span className="font-terminal text-xs text-[var(--text-secondary)]">
          NUMERON v0.1.0 // Retroverse Studios // Entertainment only
        </span>
      </footer>
    </div>
  );
}
