import { aboutSections } from '@numeron/core';
import { TerminalCard } from '../components/TerminalCard';

export function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}ABOUT NUMERON
      </h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        A Retroverse Studios project. Smart, playful, slightly tongue-in-cheek. Never credulous. Never dismissive.
      </p>

      {aboutSections.map((section) => (
        <TerminalCard key={section.heading} title={section.heading.replace('> ', '')}>
          <div className="font-body text-sm text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
            {section.body}
          </div>
        </TerminalCard>
      ))}

      <TerminalCard>
        <div className="font-terminal text-xs text-[var(--text-secondary)] space-y-2">
          <p>NUMERON v0.1.0 // Retroverse Studios</p>
          <p>Built with TypeScript, React, and intellectual honesty.</p>
        </div>
      </TerminalCard>
    </div>
  );
}
