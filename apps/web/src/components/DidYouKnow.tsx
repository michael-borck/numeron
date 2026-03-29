import { useState, useEffect } from 'react';
import { didYouKnowFacts } from '@numeron/core';

interface DidYouKnowProps {
  number: number;
}

export function DidYouKnow({ number }: DidYouKnowProps) {
  const facts = didYouKnowFacts[number];
  const [factIndex, setFactIndex] = useState(0);

  // Pick a random starting fact on mount or number change
  useEffect(() => {
    if (facts && facts.length > 0) {
      setFactIndex(Math.floor(Math.random() * facts.length));
    }
  }, [number, facts]);

  if (!facts || facts.length === 0) return null;

  const nextFact = () => {
    setFactIndex((i) => (i + 1) % facts.length);
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-secondary)] p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-terminal text-xs text-[var(--text-secondary)]">
          {'> '}DID YOU KNOW?
        </span>
        {facts.length > 1 && (
          <button
            onClick={nextFact}
            className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors min-h-[44px] px-2"
            aria-label="Show another fact"
          >
            [ ANOTHER ]
          </button>
        )}
      </div>
      <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
        {facts[factIndex]}
      </p>
      <p className="font-terminal text-[9px] text-[var(--text-secondary)] opacity-40">
        {factIndex + 1} / {facts.length} for the number {number}
      </p>
    </div>
  );
}
