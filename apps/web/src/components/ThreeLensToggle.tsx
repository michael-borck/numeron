import { useState } from 'react';
import type { Interpretation } from '@numeron/core';

type Lens = 'light' | 'truth' | 'shadow';

interface ThreeLensToggleProps {
  interpretation: Interpretation;
}

export function ThreeLensToggle({ interpretation }: ThreeLensToggleProps) {
  const [activeLens, setActiveLens] = useState<Lens>('light');

  const lenses: Lens[] = ['light', 'truth', 'shadow'];

  const getText = (lens: Lens): string => {
    switch (lens) {
      case 'light':
        return interpretation.positive;
      case 'truth':
        return interpretation.neutral;
      case 'shadow':
        return interpretation.shadow;
    }
  };

  return (
    <div className="space-y-3">
      {/* Lens tabs */}
      <div className="flex gap-1" role="tablist" aria-label="Interpretation lens">
        {lenses.map((lens) => (
          <button
            key={lens}
            role="tab"
            aria-selected={activeLens === lens}
            aria-controls={`lens-panel-${lens}`}
            onClick={() => setActiveLens(lens)}
            onKeyDown={(e) => {
              const idx = lenses.indexOf(activeLens);
              if (e.key === 'ArrowRight') setActiveLens(lenses[(idx + 1) % 3]);
              if (e.key === 'ArrowLeft') setActiveLens(lenses[(idx + 2) % 3]);
            }}
            className={`
              px-3 py-1.5 font-terminal text-xs tracking-widest transition-colors
              min-w-[80px] min-h-[44px] flex items-center justify-center
              border
              ${
                activeLens === lens
                  ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]'
                  : 'text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)]'
              }
            `}
          >
            {lens.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        id={`lens-panel-${activeLens}`}
        role="tabpanel"
        className="font-body text-sm leading-relaxed text-[var(--text-primary)] opacity-90"
      >
        {getText(activeLens)}
      </div>

      {/* Keywords */}
      {interpretation.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {interpretation.keywords.map((kw) => (
            <span
              key={kw}
              className="font-terminal text-xs px-2 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* Correspondences */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
        {interpretation.planet && (
          <span>
            <span className="opacity-50">Planet:</span> {interpretation.planet}
          </span>
        )}
        {interpretation.tarotCard && (
          <span>
            <span className="opacity-50">Tarot:</span> {interpretation.tarotCard}
          </span>
        )}
        {interpretation.element && (
          <span>
            <span className="opacity-50">Element:</span> {interpretation.element}
          </span>
        )}
        {interpretation.musicalNote && (
          <span>
            <span className="opacity-50">Note:</span> {interpretation.musicalNote}
          </span>
        )}
        {interpretation.color && (
          <span>
            <span className="opacity-50">Color:</span> {interpretation.color}
          </span>
        )}
      </div>
    </div>
  );
}
