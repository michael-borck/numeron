import { useState } from 'react';
import { TerminalCard } from '../components/TerminalCard';
import { pythagorean } from '@numeron/core';

type CalcType = 'expression' | 'lifePath';

export function ReverseLookup() {
  const [targetNumber, setTargetNumber] = useState(7);
  const [calcType, setCalcType] = useState<CalcType>('expression');
  const [candidateName, setCandidateName] = useState('');

  const candidateResult =
    candidateName.trim().length > 0 ? pythagorean.expression(candidateName) : null;

  const isMatch = candidateResult !== null && candidateResult.value === targetNumber;

  // Show what letter sums produce the target
  const possibleSums: number[] = [];
  for (let s = targetNumber; s <= 200; s += 9) {
    possibleSums.push(s);
  }
  // Master numbers: if target is 11, 22, 33 the sum IS the target
  if ([11, 22, 33].includes(targetNumber) && !possibleSums.includes(targetNumber)) {
    possibleSums.unshift(targetNumber);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}REVERSE LOOKUP
      </h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        What name would give me a specific number? Select a target, then try names.
      </p>

      {/* Target selection */}
      <TerminalCard title="TARGET NUMBER">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((n) => (
              <button
                key={n}
                onClick={() => setTargetNumber(n)}
                className={`font-terminal text-lg w-12 h-12 border transition-colors ${
                  targetNumber === n
                    ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]'
                    : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 font-terminal text-xs text-[var(--text-secondary)] min-h-[44px]">
              <input
                type="radio"
                checked={calcType === 'expression'}
                onChange={() => setCalcType('expression')}
                className="accent-[var(--accent)]"
              />
              Expression (name)
            </label>
            <label className="flex items-center gap-2 font-terminal text-xs text-[var(--text-secondary)] min-h-[44px]">
              <input
                type="radio"
                checked={calcType === 'lifePath'}
                onChange={() => setCalcType('lifePath')}
                className="accent-[var(--accent)]"
              />
              Life Path (date)
            </label>
          </div>
        </div>
      </TerminalCard>

      {/* Hints */}
      <TerminalCard title={`HOW TO REACH ${targetNumber}`}>
        <div className="space-y-3">
          {calcType === 'expression' ? (
            <>
              <p className="font-body text-sm text-[var(--text-secondary)]">
                In the Pythagorean system, letter values that sum to any of these totals will reduce
                to <span className="text-[var(--accent)]">{targetNumber}</span>:
              </p>
              <div className="flex flex-wrap gap-2">
                {possibleSums.slice(0, 15).map((s) => (
                  <span
                    key={s}
                    className="font-terminal text-sm px-2 py-1 border border-[var(--border)] text-[var(--text-secondary)]"
                  >
                    {s}
                  </span>
                ))}
                {possibleSums.length > 15 && (
                  <span className="font-terminal text-sm text-[var(--text-secondary)]">...</span>
                )}
              </div>
              <p className="font-body text-xs text-[var(--text-secondary)]">
                Tip: short names (3-5 letters) with high-value letters (I=9, R=9, H=8, Q=8) reach
                higher sums faster.
              </p>
            </>
          ) : (
            <p className="font-body text-sm text-[var(--text-secondary)]">
              Life Path {targetNumber} comes from dates where month + day + year digits reduce to{' '}
              <span className="text-[var(--accent)]">{targetNumber}</span>. Try different dates
              below.
            </p>
          )}
        </div>
      </TerminalCard>

      {/* Live checker */}
      <TerminalCard title="TRY A NAME">
        <div className="space-y-4">
          {calcType === 'expression' ? (
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Type a name to check..."
              maxLength={200}
              className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                font-body px-3 py-2 min-h-[44px]
                focus:border-[var(--accent)] focus:outline-none transition-colors
                placeholder:text-[var(--text-secondary)] placeholder:opacity-40"
            />
          ) : (
            <input
              type="date"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                font-body px-3 py-2 min-h-[44px]
                focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          )}

          {candidateName.trim().length > 0 && (
            <div
              className={`
                border p-4 font-terminal text-sm
                ${isMatch ? 'border-[var(--accent-green)] text-[var(--accent-green)]' : 'border-[var(--border)] text-[var(--text-secondary)]'}
              `}
            >
              {calcType === 'expression' && candidateResult && (
                <>
                  <span className="text-2xl">{candidateResult.value}</span>
                  {isMatch ? (
                    <span className="ml-3 text-xs text-glow-green">
                      {'> '}MATCH! This name produces {targetNumber}.
                    </span>
                  ) : (
                    <span className="ml-3 text-xs">
                      {'> '}Produces {candidateResult.value}, not {targetNumber}.
                    </span>
                  )}
                </>
              )}
              {calcType === 'lifePath' && candidateName && (() => {
                try {
                  const lp = pythagorean.lifePath(candidateName);
                  const match = lp.value === targetNumber;
                  return (
                    <>
                      <span className={`text-2xl ${match ? 'text-[var(--accent-green)]' : ''}`}>
                        {lp.value}
                      </span>
                      {match ? (
                        <span className="ml-3 text-xs text-glow-green">
                          {'> '}MATCH! This date produces Life Path {targetNumber}.
                        </span>
                      ) : (
                        <span className="ml-3 text-xs">
                          {'> '}Life Path {lp.value}, not {targetNumber}.
                        </span>
                      )}
                    </>
                  );
                } catch {
                  return <span className="text-xs">{'> '}Enter a valid date</span>;
                }
              })()}
            </div>
          )}
        </div>
      </TerminalCard>
    </div>
  );
}
