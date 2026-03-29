import { useState } from 'react';
import { TerminalCard } from '../components/TerminalCard';
import {
  constants,
  reduceUserConstant,
  preloadedSquares,
  analyzeMagicSquare,
  FIBONACCI_MOD9_CYCLE,
  verifyFibMod9Properties,
  kaprekarProcess,
  KAPREKAR_CONSTANT,
  cyclicNumberMultiples,
  TESLA_PATTERN,
  microDisclaimers,
} from '@numeron/core';

type Tab = 'constants' | 'magic' | 'fibonacci' | 'sudoku' | 'sacred';

export function Explore() {
  const [activeTab, setActiveTab] = useState<Tab>('constants');
  const [userConstant, setUserConstant] = useState('');
  const [kaprekarInput, setKaprekarInput] = useState('');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'constants', label: 'CONSTANTS' },
    { key: 'magic', label: 'MAGIC SQUARES' },
    { key: 'fibonacci', label: 'FIBONACCI' },
    { key: 'sacred', label: 'PATTERNS' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}CONSTANTS & PATTERNS EXPLORER
      </h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Mathematical curiosity, not mystical proof.
      </p>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`font-terminal text-xs px-3 py-1.5 min-h-[44px] border transition-colors ${
              activeTab === t.key
                ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]'
                : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Constants tab */}
      {activeTab === 'constants' && (
        <div className="space-y-6">
          <p className="text-xs italic text-[var(--text-secondary)]">
            {microDisclaimers.constantsGeneral}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-2 font-terminal text-xs text-[var(--text-secondary)]">Constant</th>
                  <th className="text-center py-2 px-2 font-terminal text-xs text-[var(--text-secondary)]">Symbol</th>
                  <th className="text-center py-2 px-2 font-terminal text-xs text-[var(--text-secondary)]">Reduces To</th>
                  <th className="text-center py-2 px-2 font-terminal text-xs text-[var(--text-secondary)]">Master?</th>
                </tr>
              </thead>
              <tbody>
                {constants.map((c) => (
                  <tr key={c.name} className="border-b border-[var(--border)] border-opacity-30">
                    <td className="py-2 pr-2 text-[var(--text-secondary)]">{c.name}</td>
                    <td className="py-2 px-2 text-center font-terminal">{c.symbol}</td>
                    <td className={`py-2 px-2 text-center font-terminal text-lg ${c.result.masterNumber ? 'text-[var(--accent-green)]' : 'text-[var(--accent)]'}`}>
                      {c.result.value}
                    </td>
                    <td className="py-2 px-2 text-center text-xs">
                      {c.result.masterNumber ? '✦' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* User input */}
          <TerminalCard title="TRY YOUR OWN">
            <div className="flex gap-2">
              <input
                value={userConstant}
                onChange={(e) => setUserConstant(e.target.value)}
                placeholder="Enter any number..."
                className="flex-1 bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                  font-body px-3 py-2 min-h-[44px]
                  focus:border-[var(--accent)] focus:outline-none"
              />
              {userConstant && (() => {
                const r = reduceUserConstant(userConstant);
                return r ? (
                  <span className={`font-terminal text-2xl self-center px-3 ${r.masterNumber ? 'text-[var(--accent-green)]' : 'text-[var(--accent)]'}`}>
                    → {r.value}
                  </span>
                ) : null;
              })()}
            </div>
          </TerminalCard>
        </div>
      )}

      {/* Magic squares tab */}
      {activeTab === 'magic' && (
        <div className="space-y-6">
          {preloadedSquares.map((sq) => {
            const analysis = analyzeMagicSquare([...sq.grid.map((r) => [...r])], sq.tradition);
            return (
              <TerminalCard key={sq.name} title={sq.name}>
                <div className="space-y-3">
                  <div className="font-terminal grid gap-1" style={{ gridTemplateColumns: `repeat(${analysis.order}, minmax(40px, 60px))` }}>
                    {analysis.grid.flat().map((cell, i) => (
                      <div
                        key={i}
                        className="border border-[var(--border)] text-center py-2 text-[var(--accent)]"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] space-y-1">
                    <p>Magic constant: {analysis.magicConstant} → <span className="text-[var(--accent)]">{analysis.magicConstantReduction.value}</span></p>
                    {analysis.centerValue && <p>Centre: {analysis.centerValue}</p>}
                    <p>Valid: {analysis.isValid ? 'Yes' : 'No'}</p>
                    {sq.tradition && <p>Origin: {sq.tradition}</p>}
                  </div>
                </div>
              </TerminalCard>
            );
          })}
        </div>
      )}

      {/* Fibonacci tab */}
      {activeTab === 'fibonacci' && (
        <div className="space-y-6">
          <TerminalCard title="FIBONACCI MOD-9 CYCLE">
            <div className="flex flex-wrap gap-2 mb-4">
              {FIBONACCI_MOD9_CYCLE.map((v, i) => (
                <span
                  key={i}
                  className={`
                    font-terminal text-sm w-8 h-8 flex items-center justify-center border
                    ${v === 9
                      ? 'border-[var(--accent)] text-[var(--accent)] text-glow bg-[var(--accent)] bg-opacity-10'
                      : 'border-[var(--border)] text-[var(--text-secondary)]'}
                  `}
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="text-xs text-[var(--text-secondary)] space-y-1">
              {(() => {
                const props = verifyFibMod9Properties();
                return (
                  <>
                    <p>Period: {props.period}</p>
                    <p>9 appears at positions: {props.ninePositions.join(', ')}</p>
                    <p>Cycle sum: {props.cycleSum} → {props.cycleSumReduced}</p>
                  </>
                );
              })()}
            </div>
          </TerminalCard>
        </div>
      )}

      {/* Sacred patterns tab */}
      {activeTab === 'sacred' && (
        <div className="space-y-6">
          {/* Kaprekar */}
          <TerminalCard title="KAPREKAR'S CONSTANT — 6174">
            <p className="font-body text-sm text-[var(--text-secondary)] mb-4">
              Take any 4-digit number (not all same digits). Arrange digits descending and ascending, subtract. Repeat. Always reaches 6174.
            </p>
            <div className="flex gap-2 mb-4">
              <input
                value={kaprekarInput}
                onChange={(e) => setKaprekarInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="Enter a 4-digit number"
                maxLength={4}
                className="flex-1 bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                  font-body px-3 py-2 min-h-[44px]
                  focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
            {kaprekarInput.length === 4 && (() => {
              const result = kaprekarProcess(Number(kaprekarInput));
              if (!result.inputValid) return <p className="text-xs text-[var(--accent)]">{'> '}Invalid input (all digits must not be the same)</p>;
              return (
                <div className="space-y-1 font-terminal text-xs text-[var(--text-secondary)]">
                  {result.steps.map((s, i) => (
                    <div key={i}>
                      {String(s.descending).padStart(4, '0')} - {String(s.ascending).padStart(4, '0')} ={' '}
                      <span className={s.result === KAPREKAR_CONSTANT ? 'text-[var(--accent)] text-glow' : ''}>
                        {s.result}
                      </span>
                    </div>
                  ))}
                  {result.reachedConstant && (
                    <p className="text-[var(--accent)] mt-2">{'> '}Reached 6174 in {result.steps.length} step{result.steps.length !== 1 ? 's' : ''}</p>
                  )}
                </div>
              );
            })()}
          </TerminalCard>

          {/* 142857 */}
          <TerminalCard title="THE CYCLIC NUMBER — 142857">
            <div className="space-y-1 font-terminal text-sm text-[var(--text-secondary)]">
              {cyclicNumberMultiples().map((m) => (
                <div key={m.multiplier}>
                  142857 × {m.multiplier} = {m.product} → <span className="text-[var(--accent)]">{m.reduced}</span>
                </div>
              ))}
            </div>
          </TerminalCard>

          {/* Tesla 3-6-9 */}
          <TerminalCard title="TESLA'S 3, 6, 9">
            <p className="font-body text-sm text-[var(--text-secondary)] mb-3">
              {TESLA_PATTERN.description}
            </p>
            <div className="flex gap-4">
              <div>
                <span className="font-terminal text-xs text-[var(--text-secondary)]">DOUBLING:</span>
                <div className="flex gap-1 mt-1">
                  {TESLA_PATTERN.doublingCycle.map((n) => (
                    <span key={n} className="font-terminal text-lg text-[var(--text-secondary)] w-8 text-center">{n}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-terminal text-xs text-[var(--accent)]">SACRED:</span>
                <div className="flex gap-1 mt-1">
                  {TESLA_PATTERN.sacredTriad.map((n) => (
                    <span key={n} className="font-terminal text-lg text-[var(--accent)] text-glow w-8 text-center">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </TerminalCard>
        </div>
      )}
    </div>
  );
}
