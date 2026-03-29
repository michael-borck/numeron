import type { SessionStats } from '@numeron/core';
import { TerminalCard } from './TerminalCard';

interface SessionStatsProps {
  stats: SessionStats;
}

export function SessionStatsDisplay({ stats }: SessionStatsProps) {
  return (
    <TerminalCard title="YOUR PROFILE — AT A GLANCE">
      <div className="space-y-4">
        {/* Summary lines */}
        <div className="space-y-2">
          {stats.summaryLines.map((line, i) => (
            <p key={i} className="font-body text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--accent)] mr-2">{'>'}</span>
              {line}
            </p>
          ))}
        </div>

        {/* Visual stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox
            label="UNIQUE NUMBERS"
            value={String(stats.uniqueNumbersAcrossSystems)}
            sub="across 5 systems"
          />
          <StatBox
            label="SYSTEM AGREEMENT"
            value={`${stats.systemAgreementCount}/${stats.systemAgreementTotal}`}
            sub="main calculations"
          />
          <StatBox
            label="LIFE PATH"
            value={stats.lifePathRarity.toUpperCase()}
            sub={stats.hasLifePathMaster ? 'master number' : 'single digit'}
            highlight={stats.lifePathRarity !== 'common'}
          />
          <StatBox
            label="MISSING NUMBERS"
            value={stats.missingNumbers.length > 0 ? stats.missingNumbers.join(', ') : 'NONE'}
            sub={stats.missingNumbers.length > 0 ? 'not in core profile' : 'all represented'}
          />
        </div>

        {/* Dominant numbers */}
        {stats.dominantProfileNumbers.length > 0 && (
          <div className="border-t border-[var(--border)] pt-3">
            <span className="font-terminal text-xs text-[var(--text-secondary)]">
              DOMINANT ENERGY:{' '}
            </span>
            {stats.dominantProfileNumbers.map((n) => (
              <span
                key={n}
                className="font-terminal text-xl text-[var(--accent)] text-glow mx-1"
              >
                {n}
              </span>
            ))}
          </div>
        )}
      </div>
    </TerminalCard>
  );
}

function StatBox({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="border border-[var(--border)] p-3 text-center">
      <div className="font-terminal text-[10px] text-[var(--text-secondary)] mb-1">{label}</div>
      <div
        className={`font-terminal text-xl ${highlight ? 'text-[var(--accent-green)] text-glow-green' : 'text-[var(--accent)]'}`}
      >
        {value}
      </div>
      <div className="font-terminal text-[9px] text-[var(--text-secondary)] opacity-60 mt-1">
        {sub}
      </div>
    </div>
  );
}
