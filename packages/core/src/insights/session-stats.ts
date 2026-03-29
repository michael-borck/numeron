import type { NumerologyProfile, NumerologySystem, NumberResult } from '../types.js';

export interface SessionStats {
  /** Total unique numbers across all systems for main calculations */
  uniqueNumbersAcrossSystems: number;
  /** How many of 4 main calculations all 5 systems agree on */
  systemAgreementCount: number;
  /** Total system agreements possible */
  systemAgreementTotal: number;
  /** The number(s) that appear most frequently in this profile */
  dominantProfileNumbers: number[];
  /** Numbers that don't appear at all in the profile (1-9) */
  missingNumbers: number[];
  /** Whether the life path is a master number */
  hasLifePathMaster: boolean;
  /** Rarity tier for the life path */
  lifePathRarity: 'common' | 'uncommon' | 'rare';
  /** Human-readable summary lines */
  summaryLines: string[];
}

/**
 * Generate session-level insights from a multi-system profile.
 * Pure client-side calculation — no data collection.
 */
export function generateSessionStats(
  profiles: Record<NumerologySystem, NumerologyProfile>,
): SessionStats {
  const systems: NumerologySystem[] = ['pythagorean', 'chaldean', 'kabbalistic', 'loshu', 'abjad'];
  const mainFields: (keyof NumerologyProfile)[] = [
    'lifePath',
    'expression',
    'soulUrge',
    'personality',
  ];

  // Unique numbers across all systems
  const allNumbers = new Set<number>();
  for (const sys of systems) {
    for (const field of mainFields) {
      const val = profiles[sys][field];
      if (isNumberResult(val) && val.value > 0) {
        allNumbers.add(val.value);
      }
    }
  }

  // System agreement: for each main field, do all 5 systems produce the same value?
  let agreements = 0;
  for (const field of mainFields) {
    const values = systems
      .map((s) => {
        const val = profiles[s][field];
        return isNumberResult(val) ? val.value : null;
      })
      .filter((v) => v !== null && v !== 0);
    if (values.length > 0 && new Set(values).size === 1) {
      agreements++;
    }
  }

  // Dominant numbers in Pythagorean profile
  const pyth = profiles.pythagorean;
  const profileNumbers = [
    pyth.lifePath.value,
    pyth.expression.value,
    pyth.soulUrge.value,
    pyth.personality.value,
    pyth.maturity.value,
    pyth.birthdayNumber.value,
  ].filter((n) => n > 0);

  const freq: Record<number, number> = {};
  for (const n of profileNumbers) {
    freq[n] = (freq[n] || 0) + 1;
  }
  const maxFreq = Math.max(0, ...Object.values(freq));
  const dominantProfileNumbers =
    maxFreq > 1
      ? Object.entries(freq)
          .filter(([_, count]) => count === maxFreq)
          .map(([num]) => Number(num))
          .sort((a, b) => a - b)
      : [];

  // Missing numbers (1-9 not present in main profile)
  const present = new Set(profileNumbers.filter((n) => n <= 9));
  const missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !present.has(n));

  // Life path rarity
  const lpValue = pyth.lifePath.value;
  const hasLifePathMaster = pyth.lifePath.masterNumber;
  let lifePathRarity: 'common' | 'uncommon' | 'rare' = 'common';
  if (lpValue === 33) lifePathRarity = 'rare';
  else if (lpValue === 22 || lpValue === 11) lifePathRarity = 'uncommon';

  // Build summary lines
  const summaryLines: string[] = [];

  summaryLines.push(
    `Your profile generates ${allNumbers.size} unique numbers across five systems.`,
  );

  if (agreements === 4) {
    summaryLines.push('All five systems agree on every main calculation. This is unusual.');
  } else if (agreements === 0) {
    summaryLines.push(
      'The five systems disagree on every main calculation. This is the norm — different letter tables, different results.',
    );
  } else {
    summaryLines.push(
      `Systems agree on ${agreements} of 4 main calculations. The disagreements are the interesting part.`,
    );
  }

  if (dominantProfileNumbers.length > 0) {
    summaryLines.push(
      `The number ${dominantProfileNumbers.join(' and ')} appears ${maxFreq} times in your Pythagorean profile — your dominant energy.`,
    );
  }

  if (missingNumbers.length > 0 && missingNumbers.length <= 4) {
    summaryLines.push(
      `Numbers ${missingNumbers.join(', ')} don't appear in your core profile. In some traditions, these are growth areas.`,
    );
  }

  if (hasLifePathMaster) {
    if (lpValue === 33) {
      summaryLines.push(
        'Life Path 33 appears in fewer than 1% of calculations. This is arithmetic, not destiny.',
      );
    } else {
      summaryLines.push(
        `Life Path ${lpValue} is a master number — a Western numerology convention, not present in all traditions.`,
      );
    }
  }

  return {
    uniqueNumbersAcrossSystems: allNumbers.size,
    systemAgreementCount: agreements,
    systemAgreementTotal: mainFields.length,
    dominantProfileNumbers,
    missingNumbers,
    hasLifePathMaster,
    lifePathRarity,
    summaryLines,
  };
}

function isNumberResult(val: unknown): val is NumberResult {
  return typeof val === 'object' && val !== null && 'value' in val && 'system' in val;
}
