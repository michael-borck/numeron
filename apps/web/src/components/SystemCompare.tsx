import type { NumerologyProfile, NumerologySystem } from '@numeron/core';
import { microDisclaimers } from '@numeron/core';

interface SystemCompareProps {
  profiles: Record<NumerologySystem, NumerologyProfile>;
}

const systemNames: Record<NumerologySystem, string> = {
  pythagorean: 'Pythagorean',
  chaldean: 'Chaldean',
  kabbalistic: 'Kabbalistic',
  loshu: 'Lo Shu',
  abjad: 'Abjad',
};

const fields: { key: keyof NumerologyProfile; label: string }[] = [
  { key: 'lifePath', label: 'Life Path' },
  { key: 'expression', label: 'Expression' },
  { key: 'soulUrge', label: 'Soul Urge' },
  { key: 'personality', label: 'Personality' },
];

export function SystemCompare({ profiles }: SystemCompareProps) {
  const systems: NumerologySystem[] = ['pythagorean', 'chaldean', 'kabbalistic', 'loshu', 'abjad'];

  // Check if systems disagree on any field
  const hasDisagreement = fields.some((f) => {
    const values = systems.map((s) => {
      const val = profiles[s][f.key];
      return typeof val === 'object' && val !== null && 'value' in val ? val.value : null;
    });
    const unique = new Set(values.filter((v) => v !== null && v !== 0));
    return unique.size > 1;
  });

  return (
    <div className="space-y-3">
      {hasDisagreement && (
        <div className="font-terminal text-xs text-[var(--accent)] border border-[var(--accent)] p-3">
          {'> '}SYSTEMS DISAGREE — This is normal. Different systems use different letter tables.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 font-terminal text-xs text-[var(--text-secondary)] sticky left-0 bg-[var(--bg-secondary)]">
                &nbsp;
              </th>
              {systems.map((s) => (
                <th
                  key={s}
                  className="text-center py-2 px-3 font-terminal text-xs text-[var(--text-secondary)]"
                >
                  {systemNames[s]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => {
              const values = systems.map((s) => {
                const val = profiles[s][f.key];
                return typeof val === 'object' && val !== null && 'value' in val ? val : null;
              });

              return (
                <tr key={f.key} className="border-b border-[var(--border)] border-opacity-30">
                  <td className="py-2 pr-4 font-terminal text-xs text-[var(--text-secondary)] sticky left-0 bg-[var(--bg-secondary)]">
                    {f.label}
                  </td>
                  {values.map((v, i) => (
                    <td key={systems[i]} className="text-center py-2 px-3">
                      {v && v.value > 0 ? (
                        <span
                          className={`font-terminal text-lg ${v.masterNumber ? 'text-[var(--accent-green)] master-glow' : 'text-[var(--accent)]'}`}
                        >
                          {v.value}
                        </span>
                      ) : (
                        <span className="text-[var(--text-secondary)] opacity-30">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs italic text-[var(--text-secondary)]">
        {microDisclaimers.systemComparison}
      </p>
    </div>
  );
}
