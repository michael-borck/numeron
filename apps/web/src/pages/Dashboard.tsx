import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TerminalCard } from '../components/TerminalCard';
import { useStore } from '../store';
import { sanitizeName, sanitizeDate, sanitizeAddress } from '@numeron/core';
import { detectEdgeCases } from '../hooks/useEdgeCases';

const inputClass = `w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)]
  font-body px-3 py-2 min-h-[44px]
  focus:border-[var(--accent)] focus:outline-none transition-colors
  placeholder:text-[var(--text-secondary)] placeholder:opacity-40`;

export function Dashboard() {
  const navigate = useNavigate();
  const { generateProfiles } = useStore();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [address, setAddress] = useState('');
  const [showOptional, setShowOptional] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = sanitizeName(name);
    if (!cleanName) {
      setError('> NAME REQUIRED');
      return;
    }

    // Check symbols-only
    if (!/[a-zA-Z0-9]/.test(cleanName)) {
      setError('> No valid letters detected. Nothing to calculate.');
      return;
    }

    const cleanDate = sanitizeDate(dob);
    if (!cleanDate) {
      setError('> VALID DATE REQUIRED (YYYY-MM-DD)');
      return;
    }

    const input = {
      fullBirthName: cleanName,
      dateOfBirth: cleanDate,
      preferredName: preferredName ? sanitizeName(preferredName) : undefined,
      address: address ? sanitizeAddress(address) : undefined,
    };

    generateProfiles(input);
    navigate('/profile');
  };

  // Live edge case warnings
  const liveInput = {
    fullBirthName: name,
    dateOfBirth: dob || '2000-01-01',
    preferredName: preferredName || undefined,
    address: address || undefined,
  };
  const warnings = name.length > 2 || dob ? detectEdgeCases(liveInput) : [];

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

      {/* Profile form */}
      <TerminalCard title="BEGIN READING">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full birth name */}
          <div>
            <label
              htmlFor="name"
              className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
            >
              {'> '}FULL BIRTH NAME
              <span className="animate-cursor-blink ml-1">_</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="As on birth certificate"
              className={inputClass}
              autoComplete="name"
              maxLength={200}
            />
          </div>

          {/* Date of birth */}
          <div>
            <label
              htmlFor="dob"
              className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
            >
              {'> '}DATE OF BIRTH
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Optional fields toggle */}
          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            {'> '}{showOptional ? 'HIDE' : 'SHOW'} OPTIONAL FIELDS
          </button>

          {showOptional && (
            <>
              {/* Preferred name */}
              <div>
                <label
                  htmlFor="preferredName"
                  className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
                >
                  {'> '}PREFERRED NAME / NICKNAME
                </label>
                <input
                  id="preferredName"
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  placeholder="What people call you"
                  className={inputClass}
                  maxLength={200}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block font-terminal text-xs text-[var(--text-secondary)] mb-1"
                >
                  {'> '}STREET ADDRESS
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street number needed for house calculation"
                  className={inputClass}
                  maxLength={300}
                />
              </div>
            </>
          )}

          {/* Edge case warnings */}
          {warnings.length > 0 && (
            <div className="space-y-1">
              {warnings.map((w, i) => (
                <p key={i} className="font-terminal text-xs text-[var(--text-secondary)] italic">
                  {w.message}
                </p>
              ))}
            </div>
          )}

          {/* Error */}
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
          {
            title: 'FIVE SYSTEMS',
            desc: 'Pythagorean, Chaldean, Kabbalistic, Lo Shu, Abjad — shown together',
          },
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
