import type { ActiveEasterEgg } from '../hooks/useEasterEggs';

interface EasterEggDisplayProps {
  eggs: ActiveEasterEgg[];
}

export function EasterEggDisplay({ eggs }: EasterEggDisplayProps) {
  if (eggs.length === 0) return null;

  return (
    <div className="space-y-2" role="alert">
      {eggs.map((egg) => (
        <div
          key={egg.id}
          className={`
            border border-[var(--accent)] p-4 font-terminal text-sm
            ${egg.animation === 'pulse' ? 'master-glow' : ''}
            ${egg.animation === 'glow' ? 'text-glow' : ''}
          `}
        >
          <div className="text-[var(--accent)]">{egg.message}</div>
          {egg.submessage && (
            <div className="text-[var(--text-secondary)] text-xs mt-1">{egg.submessage}</div>
          )}
        </div>
      ))}
    </div>
  );
}
