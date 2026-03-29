import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { NumberDisplay } from '../components/NumberDisplay';
import { SystemCompare } from '../components/SystemCompare';
import { microDisclaimers } from '@numeron/core';

export function Profile() {
  const { profiles, activeSystem, setActiveSystem, profileInput } = useStore();

  if (!profiles || !profileInput) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <p className="font-terminal text-sm text-[var(--text-secondary)]">
          {'> '}NO PROFILE LOADED
        </p>
        <Link
          to="/"
          className="inline-block font-terminal text-xs text-[var(--accent)] border border-[var(--accent)]
            px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
        >
          [ ENTER DETAILS ]
        </Link>
      </div>
    );
  }

  const profile = profiles[activeSystem];
  const systems = ['pythagorean', 'chaldean', 'kabbalistic', 'loshu', 'abjad'] as const;
  const systemLabels = {
    pythagorean: 'Pythagorean',
    chaldean: 'Chaldean',
    kabbalistic: 'Kabbalistic',
    loshu: 'Lo Shu',
    abjad: 'Abjad',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
          {'> '}PROFILE: {profileInput.fullBirthName.toUpperCase()}
        </h1>
        <p className="font-terminal text-xs text-[var(--text-secondary)]">
          DOB: {profileInput.dateOfBirth}
        </p>
      </div>

      {/* System selector */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Numerology system">
        {systems.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={activeSystem === s}
            onClick={() => setActiveSystem(s)}
            className={`font-terminal text-xs px-3 py-1.5 min-h-[44px] border transition-colors ${
              activeSystem === s
                ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]'
                : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]'
            }`}
          >
            {systemLabels[s]}
          </button>
        ))}
      </div>

      {/* Core numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TerminalCard title="LIFE PATH">
          <NumberDisplay
            label="Life Path"
            result={profile.lifePath}
            disclaimer={microDisclaimers.lifePath}
          />
        </TerminalCard>

        <TerminalCard title="EXPRESSION">
          <NumberDisplay label="Expression" result={profile.expression} />
        </TerminalCard>

        <TerminalCard title="SOUL URGE">
          <NumberDisplay label="Soul Urge" result={profile.soulUrge} />
        </TerminalCard>

        <TerminalCard title="PERSONALITY">
          <NumberDisplay label="Personality" result={profile.personality} />
        </TerminalCard>
      </div>

      {/* Secondary numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TerminalCard title="MATURITY">
          <NumberDisplay label="Maturity" result={profile.maturity} showInterpretation={false} />
        </TerminalCard>

        <TerminalCard title="BIRTHDAY">
          <NumberDisplay label="Birthday" result={profile.birthdayNumber} showInterpretation={false} />
        </TerminalCard>

        <TerminalCard title="PERSONAL YEAR">
          <NumberDisplay
            label="Personal Year"
            result={profile.personalYear}
            showInterpretation={false}
            disclaimer={microDisclaimers.personalTiming}
          />
        </TerminalCard>
      </div>

      {/* House number */}
      {profile.houseNumber && (
        <TerminalCard title="HOUSE NUMBER">
          <NumberDisplay label="House" result={profile.houseNumber} showInterpretation={false} />
        </TerminalCard>
      )}

      {/* Karma & Master */}
      {(profile.karmaDebt.length > 0 || profile.masterNumbers.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.masterNumbers.length > 0 && (
            <TerminalCard title="MASTER NUMBERS">
              <div className="font-terminal text-2xl text-[var(--accent-green)] text-glow-green space-x-4">
                {profile.masterNumbers.map((n) => (
                  <span key={n} className="master-glow">{n}</span>
                ))}
              </div>
              <p className="text-xs italic text-[var(--text-secondary)] mt-2">
                {microDisclaimers.masterNumber}
              </p>
            </TerminalCard>
          )}
          {profile.karmaDebt.length > 0 && (
            <TerminalCard title="KARMA DEBT">
              <div className="font-terminal text-2xl text-[var(--accent)] space-x-4">
                {profile.karmaDebt.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <p className="text-xs italic text-[var(--text-secondary)] mt-2">
                {microDisclaimers.karmaDebt}
              </p>
            </TerminalCard>
          )}
        </div>
      )}

      {/* System comparison */}
      <TerminalCard title="SYSTEM COMPARISON">
        <SystemCompare profiles={profiles} />
      </TerminalCard>
    </div>
  );
}
