import { useState } from 'react';
import { analyzeText, famousTexts, sanitizeText } from '@numeron/core';
import type { NumerologySystem, TextAnalysis } from '@numeron/core';
import { TerminalCard } from '../components/TerminalCard';
import { NumberDisplay } from '../components/NumberDisplay';

export function Decode() {
  const [text, setText] = useState('');
  const [system, setSystem] = useState<NumerologySystem>('pythagorean');
  const [result, setResult] = useState<TextAnalysis | null>(null);

  const handleAnalyze = () => {
    const clean = sanitizeText(text);
    if (!clean.trim()) return;
    setResult(analyzeText(clean, system));
  };

  const loadFamous = (famous: (typeof famousTexts)[number]) => {
    setText(famous.text);
    setResult(analyzeText(famous.text, system));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}DECODE MODE
      </h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Paste any text. NUMERON reduces it to numbers.
      </p>

      <TerminalCard title="INPUT">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter any text — a name, a quote, a sentence..."
            rows={4}
            maxLength={10000}
            className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
              font-body px-3 py-2 resize-y
              focus:border-[var(--accent)] focus:outline-none transition-colors
              placeholder:text-[var(--text-secondary)] placeholder:opacity-40"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAnalyze}
              className="border border-[var(--accent)] text-[var(--accent)] font-terminal
                text-xs px-4 py-2 min-h-[44px]
                hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
            >
              [ DECODE ]
            </button>

            <select
              value={system}
              onChange={(e) => setSystem(e.target.value as NumerologySystem)}
              className="bg-transparent border border-[var(--border)] text-[var(--text-secondary)]
                font-terminal text-xs px-2 py-1 min-h-[44px]
                focus:border-[var(--accent)] focus:outline-none"
            >
              <option value="pythagorean">Pythagorean</option>
              <option value="chaldean">Chaldean</option>
              <option value="kabbalistic">Kabbalistic</option>
              <option value="abjad">Abjad</option>
            </select>
          </div>
        </div>
      </TerminalCard>

      {/* Famous texts */}
      <TerminalCard title="FAMOUS TEXTS">
        <div className="flex flex-wrap gap-2">
          {famousTexts.map((ft) => (
            <button
              key={ft.label}
              onClick={() => loadFamous(ft)}
              className="font-terminal text-xs px-2 py-1 min-h-[44px] border border-[var(--border)]
                text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              {ft.label}
            </button>
          ))}
        </div>
      </TerminalCard>

      {/* Results */}
      {result && (
        <>
          <TerminalCard title="FULL TEXT REDUCTION">
            <NumberDisplay label="Full Text" result={result.fullTextValue} />
          </TerminalCard>

          {/* Word heatmap */}
          <TerminalCard title="WORD VALUES">
            <div className="flex flex-wrap gap-2">
              {result.wordValues.map((wv, i) => (
                <span
                  key={i}
                  className="font-body text-sm px-1.5 py-0.5 border border-[var(--border)]"
                  title={`${wv.word} = ${wv.value.value}`}
                >
                  <span className="text-[var(--text-secondary)]">{wv.word}</span>
                  <span className="text-[var(--accent)] ml-1 font-terminal text-xs">
                    {wv.value.value}
                  </span>
                </span>
              ))}
            </div>
          </TerminalCard>

          {/* Dominant numbers */}
          {result.dominantNumbers.length > 0 && (
            <TerminalCard title="DOMINANT NUMBERS">
              <div className="font-terminal text-3xl text-[var(--accent)] text-glow space-x-4">
                {result.dominantNumbers.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </TerminalCard>
          )}
        </>
      )}
    </div>
  );
}
