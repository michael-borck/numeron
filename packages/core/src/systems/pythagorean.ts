import type { NumberResult } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

const SYSTEM = 'pythagorean' as const;

/**
 * Pythagorean letter-to-number mapping: A=1, B=2, ... I=9, J=1, ... Z=8
 */
const LETTER_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/**
 * Get the Pythagorean value of a single letter.
 * Returns 0 for non-letter characters.
 */
export function letterValue(char: string): number {
  return LETTER_VALUES[char.toUpperCase()] ?? 0;
}

/**
 * Reduce a name string to a number using the Pythagorean system.
 * Includes step-by-step trace showing letter → value mapping.
 */
export function reduceName(name: string): NumberResult {
  const upper = name.toUpperCase();
  const letters: { char: string; value: number }[] = [];

  for (const char of upper) {
    if (/[A-Z]/.test(char)) {
      letters.push({ char, value: LETTER_VALUES[char] });
    } else if (/\d/.test(char)) {
      // Digits in names treated as face value per spec section 15
      letters.push({ char, value: Number(char) });
    }
    // Non-letter, non-digit characters are skipped
  }

  if (letters.length === 0) {
    return {
      value: 0,
      masterNumber: false,
      reductionSteps: ['(no valid characters)'],
      system: SYSTEM,
    };
  }

  const sum = letters.reduce((acc, l) => acc + l.value, 0);
  const mapping = letters.map((l) => `${l.char}=${l.value}`).join(', ');
  const sumStr = letters.map((l) => String(l.value)).join(' + ') + ` = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [mapping, sumStr, ...result.reductionSteps.slice(1)];

  return result;
}

/**
 * Calculate Expression number (full birth name).
 */
export function expression(fullBirthName: string): NumberResult {
  return reduceName(fullBirthName);
}

/**
 * Calculate Soul Urge number (vowels only in full name).
 */
export function soulUrge(fullBirthName: string): NumberResult {
  const upper = fullBirthName.toUpperCase();
  const letters: { char: string; value: number }[] = [];

  for (const char of upper) {
    if (VOWELS.has(char)) {
      letters.push({ char, value: LETTER_VALUES[char] });
    }
  }

  if (letters.length === 0) {
    return { value: 0, masterNumber: false, reductionSteps: ['(no vowels found)'], system: SYSTEM };
  }

  const sum = letters.reduce((acc, l) => acc + l.value, 0);
  const mapping = `Vowels: ${letters.map((l) => `${l.char}=${l.value}`).join(', ')}`;
  const sumStr = letters.map((l) => String(l.value)).join(' + ') + ` = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [mapping, sumStr, ...result.reductionSteps.slice(1)];

  return result;
}

/**
 * Calculate Personality number (consonants only in full name).
 */
export function personality(fullBirthName: string): NumberResult {
  const upper = fullBirthName.toUpperCase();
  const letters: { char: string; value: number }[] = [];

  for (const char of upper) {
    if (/[A-Z]/.test(char) && !VOWELS.has(char)) {
      letters.push({ char, value: LETTER_VALUES[char] });
    }
  }

  if (letters.length === 0) {
    return {
      value: 0,
      masterNumber: false,
      reductionSteps: ['(no consonants found)'],
      system: SYSTEM,
    };
  }

  const sum = letters.reduce((acc, l) => acc + l.value, 0);
  const mapping = `Consonants: ${letters.map((l) => `${l.char}=${l.value}`).join(', ')}`;
  const sumStr = letters.map((l) => String(l.value)).join(' + ') + ` = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [mapping, sumStr, ...result.reductionSteps.slice(1)];

  return result;
}

/**
 * Calculate Life Path number from date of birth.
 * Reduces each component (month, day, year) separately, then sums.
 */
export function lifePath(dateOfBirth: string): NumberResult {
  const [yearStr, monthStr, dayStr] = dateOfBirth.split('-');
  const month = Number(monthStr);
  const day = Number(dayStr);
  const yearDigits = [...yearStr].map(Number).reduce((a, b) => a + b, 0);

  const monthReduced = reduceNumber(month, SYSTEM, false);
  const dayReduced = reduceNumber(day, SYSTEM, false);
  const yearReduced = reduceNumber(yearDigits, SYSTEM, false);

  const sum = monthReduced.value + dayReduced.value + yearReduced.value;

  const stepDetail = `Month(${month}) + Day(${day}) + Year(${yearStr}) → ${monthReduced.value} + ${dayReduced.value} + ${yearReduced.value} = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [stepDetail, ...result.reductionSteps];

  return result;
}

/**
 * Calculate Birthday number (day of birth only, reduced).
 */
export function birthdayNumber(dateOfBirth: string): NumberResult {
  const day = Number(dateOfBirth.split('-')[2]);
  return reduceNumber(day, SYSTEM);
}

/**
 * Calculate Personal Year number.
 */
export function personalYear(dateOfBirth: string, targetDate: string): NumberResult {
  const [birthMonth, birthDay] = dateOfBirth.split('-').slice(1).map(Number);
  const targetYear = Number(targetDate.split('-')[0]);

  const sum =
    birthMonth + birthDay + [...String(targetYear)].map(Number).reduce((a, b) => a + b, 0);
  const step = `Birth month(${birthMonth}) + Birth day(${birthDay}) + Year digits(${targetYear}) = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [step, ...result.reductionSteps];

  return result;
}

/**
 * Calculate Personal Month number.
 */
export function personalMonth(dateOfBirth: string, targetDate: string): NumberResult {
  const py = personalYear(dateOfBirth, targetDate);
  const month = Number(targetDate.split('-')[1]);
  const sum = py.value + month;

  const step = `Personal Year(${py.value}) + Month(${month}) = ${sum}`;
  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [step, ...result.reductionSteps];

  return result;
}

/**
 * Calculate Personal Day number.
 */
export function personalDay(dateOfBirth: string, targetDate: string): NumberResult {
  const pm = personalMonth(dateOfBirth, targetDate);
  const day = Number(targetDate.split('-')[2]);
  const sum = pm.value + day;

  const step = `Personal Month(${pm.value}) + Day(${day}) = ${sum}`;
  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [step, ...result.reductionSteps];

  return result;
}

/**
 * Calculate House Number from a street address.
 * Extracts the first numeric sequence from the address.
 */
export function houseNumber(address: string): NumberResult | null {
  const match = address.match(/\d+/);
  if (!match) return null;

  const num = Number(match[0]);
  return reduceNumber(num, SYSTEM);
}

/**
 * Find hidden passion numbers — the most frequently occurring letter values.
 */
export function hiddenPassion(fullBirthName: string): NumberResult[] {
  const freq: Record<number, number> = {};
  const upper = fullBirthName.toUpperCase();

  for (const char of upper) {
    const val = LETTER_VALUES[char];
    if (val) {
      freq[val] = (freq[val] || 0) + 1;
    }
  }

  if (Object.keys(freq).length === 0) return [];

  const maxFreq = Math.max(...Object.values(freq));
  return Object.entries(freq)
    .filter(([_, count]) => count === maxFreq)
    .map(([val]) => reduceNumber(Number(val), SYSTEM));
}

/**
 * Detect karma debt numbers (13, 14, 16, 19) in intermediate calculations.
 */
export function detectKarmaDebt(results: NumberResult[]): number[] {
  const karmaNumbers = new Set([13, 14, 16, 19]);
  const found = new Set<number>();

  for (const result of results) {
    for (const step of result.reductionSteps) {
      for (const kn of karmaNumbers) {
        if (step.includes(`= ${kn}`) || step === String(kn)) {
          found.add(kn);
        }
      }
    }
  }

  return [...found].sort();
}

/**
 * Detect master numbers in results.
 */
export function detectMasterNumbers(results: NumberResult[]): number[] {
  const found = new Set<number>();
  for (const result of results) {
    if (result.masterNumber) {
      found.add(result.value);
    }
  }
  return [...found].sort();
}
