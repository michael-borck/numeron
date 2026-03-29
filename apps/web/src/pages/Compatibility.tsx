import { useState, type FormEvent } from 'react';
import { TerminalCard } from '../components/TerminalCard';
import { NumberDisplay } from '../components/NumberDisplay';
import {
  sanitizeName,
  sanitizeDate,
  pythagorean,
  reduceNumber,
  microDisclaimers,
} from '@numeron/core';
import type { NumberResult } from '@numeron/core';

interface PersonInput {
  name: string;
  dob: string;
}

export function Compatibility() {
  const [person1, setPerson1] = useState<PersonInput>({ name: '', dob: '' });
  const [person2, setPerson2] = useState<PersonInput>({ name: '', dob: '' });
  const [result, setResult] = useState<{
    lp1: NumberResult;
    lp2: NumberResult;
    expr1: NumberResult;
    expr2: NumberResult;
    combined: NumberResult;
    sharedNumbers: number[];
    tensionNumbers: number[];
  } | null>(null);
  const [error, setError] = useState('');

  const handleCompare = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const name1 = sanitizeName(person1.name);
    const name2 = sanitizeName(person2.name);
    const dob1 = sanitizeDate(person1.dob);
    const dob2 = sanitizeDate(person2.dob);

    if (!name1 || !name2) {
      setError('> BOTH NAMES REQUIRED');
      return;
    }
    if (!dob1 || !dob2) {
      setError('> BOTH DATES REQUIRED');
      return;
    }

    const lp1 = pythagorean.lifePath(dob1);
    const lp2 = pythagorean.lifePath(dob2);
    const expr1 = pythagorean.expression(name1);
    const expr2 = pythagorean.expression(name2);

    const combinedSum = lp1.value + lp2.value;
    const combined = reduceNumber(combinedSum, 'pythagorean');
    combined.reductionSteps = [
      `Life Path(${lp1.value}) + Life Path(${lp2.value}) = ${combinedSum}`,
      ...combined.reductionSteps,
    ];

    // Shared numbers: appear in both profiles
    const nums1 = new Set([lp1.value, expr1.value]);
    const nums2 = new Set([lp2.value, expr2.value]);
    const sharedNumbers = [...nums1].filter((n) => nums2.has(n));

    // Tension: numbers that traditionally clash (1&8, 4&5, 3&7)
    const tensionPairs = [
      [1, 8],
      [4, 5],
      [3, 7],
    ];
    const tensionNumbers: number[] = [];
    for (const [a, b] of tensionPairs) {
      if ((nums1.has(a) && nums2.has(b)) || (nums1.has(b) && nums2.has(a))) {
        tensionNumbers.push(a, b);
      }
    }

    setResult({
      lp1,
      lp2,
      expr1,
      expr2,
      combined,
      sharedNumbers,
      tensionNumbers: [...new Set(tensionNumbers)],
    });
  };

  const inputClass = `w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
    font-body px-3 py-2 min-h-[44px]
    focus:border-[var(--accent)] focus:outline-none transition-colors
    placeholder:text-[var(--text-secondary)] placeholder:opacity-40`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}COMPATIBILITY
      </h1>

      <form onSubmit={handleCompare} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Person 1 */}
        <TerminalCard title="PERSON 1">
          <div className="space-y-3">
            <input
              type="text"
              value={person1.name}
              onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
              placeholder="Full birth name"
              className={inputClass}
              maxLength={200}
            />
            <input
              type="date"
              value={person1.dob}
              onChange={(e) => setPerson1({ ...person1, dob: e.target.value })}
              className={inputClass}
            />
          </div>
        </TerminalCard>

        {/* Person 2 */}
        <TerminalCard title="PERSON 2">
          <div className="space-y-3">
            <input
              type="text"
              value={person2.name}
              onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
              placeholder="Full birth name"
              className={inputClass}
              maxLength={200}
            />
            <input
              type="date"
              value={person2.dob}
              onChange={(e) => setPerson2({ ...person2, dob: e.target.value })}
              className={inputClass}
            />
          </div>
        </TerminalCard>

        {error && (
          <div className="md:col-span-2 font-terminal text-xs text-[var(--accent)]" role="alert">
            {error}
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full border border-[var(--accent)] text-[var(--accent)] font-terminal
              text-sm tracking-widest py-3 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
          >
            [ COMPARE ]
          </button>
        </div>
      </form>

      {/* Results */}
      {result && (
        <>
          {/* Side-by-side life paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TerminalCard title={`${sanitizeName(person1.name).toUpperCase()} — LIFE PATH`}>
              <NumberDisplay label="Life Path" result={result.lp1} />
            </TerminalCard>
            <TerminalCard title={`${sanitizeName(person2.name).toUpperCase()} — LIFE PATH`}>
              <NumberDisplay label="Life Path" result={result.lp2} />
            </TerminalCard>
          </div>

          {/* Combined */}
          <TerminalCard title="COMBINED NUMBER">
            <NumberDisplay label="Combined" result={result.combined} />
          </TerminalCard>

          {/* Shared & Tension */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.sharedNumbers.length > 0 && (
              <TerminalCard title="SHARED NUMBERS">
                <div className="font-terminal text-2xl text-[var(--accent-green)] text-glow-green space-x-4">
                  {result.sharedNumbers.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  Numbers that appear in both profiles — shared energy.
                </p>
              </TerminalCard>
            )}
            {result.tensionNumbers.length > 0 && (
              <TerminalCard title="TENSION NUMBERS">
                <div className="font-terminal text-2xl text-[var(--accent)] space-x-4">
                  {result.tensionNumbers.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  Traditional tension pairings — not conflict, just friction.
                </p>
              </TerminalCard>
            )}
          </div>

          <p className="text-xs italic text-[var(--text-secondary)]">
            {microDisclaimers.compatibility}
          </p>
        </>
      )}
    </div>
  );
}
