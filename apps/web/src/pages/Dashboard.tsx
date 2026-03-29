import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TerminalCard } from '../components/TerminalCard';
import { useStore } from '../store';
import { sanitizeName, sanitizeDate } from '@numeron/core';

export function Dashboard() {
  const navigate = useNavigate();
  const { generateProfiles } = useStore();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeName(name);
    if (!cleanName) {
      setError('> NAME REQUIRED');
      return;
    }

    const cleanDate = sanitizeDate(dob);
    if (!cleanDate) {
      setError('> VALID DATE REQUIRED (YYYY-MM-DD)');
      return;
    }

    generateProfiles({ fullBirthName: cleanName, dateOfBirth: cleanDate });
    navigate('/profile');
  };

  return (
    <div className="crt-flicker max-w-2xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8 sm:py-12">
        <h1 className="font-terminal text-4xl sm:text-6xl text-[var(--accent)] text-glow tracking-wider">
          NUMERON
        </h1>
        <p className="font-body text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The Ancient Science of Numbers, Decoded.
        </p>
        <p className="font-body text-xs text-[var(--text-secondary)] opacity-60">
          Five traditions. Three lenses. Zero predictions.
        </p>
      </div>

      {/* Quick-start form */}
      <TerminalCard title="BEGIN READING">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-terminal text-xs text-[var(--text-secondary)] mb-1">
              {'> '}FULL BIRTH NAME
              <span className="animate-cursor-blink ml-1">_</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="As on birth certificate"
              className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                font-body px-3 py-2 min-h-[44px]
                focus:border-[var(--accent)] focus:outline-none transition-colors
                placeholder:text-[var(--text-secondary)] placeholder:opacity-40"
              autoComplete="name"
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="dob" className="block font-terminal text-xs text-[var(--text-secondary)] mb-1">
              {'> '}DATE OF BIRTH
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
                font-body px-3 py-2 min-h-[44px]
                focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="font-terminal text-xs text-[var(--accent)]" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full border border-[var(--accent)] text-[var(--accent)] font-terminal
              text-sm tracking-widest py-3 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
          >
            [ CALCULATE ]
          </button>
        </form>
      </TerminalCard>

      {/* Feature hints */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'FIVE SYSTEMS', desc: 'Pythagorean, Chaldean, Kabbalistic, Lo Shu, Abjad — shown together' },
          { title: 'THREE LENSES', desc: 'Light, Truth, Shadow — not just the positive spin' },
          { title: 'HONEST FRAMING', desc: 'We explain the Barnum effect. By name.' },
        ].map((f) => (
          <TerminalCard key={f.title} title={f.title} glowOnHover={false}>
            <p className="font-body text-xs text-[var(--text-secondary)]">{f.desc}</p>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
