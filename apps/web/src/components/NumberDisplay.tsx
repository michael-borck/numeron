import { useState } from 'react';
import type { NumberResult } from '@numeron/core';
import { interpretations } from '@numeron/core';
import { ReductionTrace } from './ReductionTrace';
import { ThreeLensToggle } from './ThreeLensToggle';

interface NumberDisplayProps {
  label: string;
  result: NumberResult;
  showInterpretation?: boolean;
  disclaimer?: string;
}

export function NumberDisplay({ label, result, showInterpretation = true, disclaimer }: NumberDisplayProps) {
  const [showSteps, setShowSteps] = useState(false);
  const interp = interpretations[result.value];

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-terminal text-xs tracking-wider text-[var(--text-secondary)] uppercase">
          {label}
        </span>
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          aria-expanded={showSteps}
          aria-label={`${showSteps ? 'Hide' : 'Show'} reduction steps for ${label}`}
        >
          {showSteps ? '[HIDE STEPS]' : '[SHOW STEPS]'}
        </button>
      </div>

      <div
        className={`
          font-terminal text-5xl sm:text-6xl text-glow number-reveal
          ${result.masterNumber ? 'master-glow text-[var(--accent-green)]' : 'text-[var(--accent)]'}
        `}
        aria-label={`${label}: ${result.value}${result.masterNumber ? ' (master number)' : ''}`}
      >
        {result.value}
        {result.masterNumber && (
          <span className="text-sm ml-2 text-[var(--accent-green)] align-top">MASTER</span>
        )}
      </div>

      {showSteps && <ReductionTrace steps={result.reductionSteps} />}

      {showInterpretation && interp && <ThreeLensToggle interpretation={interp} />}

      {disclaimer && (
        <p className="text-xs italic text-[var(--text-secondary)] mt-2">{disclaimer}</p>
      )}
    </div>
  );
}
