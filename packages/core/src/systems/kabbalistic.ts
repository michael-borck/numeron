import type { NumberResult } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

const SYSTEM = 'kabbalistic' as const;

/**
 * Kabbalistic (Hebrew Gematria) letter-to-number mapping.
 * Hebrew letter values mapped to Latin equivalents.
 * Based on the standard Hebrew Gematria ordinal values.
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
  J: 10,
  K: 20,
  L: 30,
  M: 40,
  N: 50,
  O: 60,
  P: 70,
  Q: 80,
  R: 90,
  S: 100,
  T: 200,
  U: 300,
  V: 400,
  W: 500,
  X: 600,
  Y: 700,
  Z: 800,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export function letterValue(char: string): number {
  return LETTER_VALUES[char.toUpperCase()] ?? 0;
}

export function reduceName(name: string): NumberResult {
  const upper = name.toUpperCase();
  const letters: { char: string; value: number }[] = [];

  for (const char of upper) {
    if (/[A-Z]/.test(char)) {
      letters.push({ char, value: LETTER_VALUES[char] });
    } else if (/\d/.test(char)) {
      letters.push({ char, value: Number(char) });
    }
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

export function expression(fullBirthName: string): NumberResult {
  return reduceName(fullBirthName);
}

export function soulUrge(fullBirthName: string): NumberResult {
  const upper = fullBirthName.toUpperCase();
  const letters: { char: string; value: number }[] = [];

  for (const char of upper) {
    if (VOWELS.has(char)) {
      letters.push({ char, value: LETTER_VALUES[char] });
    }
  }

  if (letters.length === 0) {
    return {
      value: 0,
      masterNumber: false,
      reductionSteps: ['(no vowels found)'],
      system: SYSTEM,
    };
  }

  const sum = letters.reduce((acc, l) => acc + l.value, 0);
  const mapping = `Vowels: ${letters.map((l) => `${l.char}=${l.value}`).join(', ')}`;
  const sumStr = letters.map((l) => String(l.value)).join(' + ') + ` = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [mapping, sumStr, ...result.reductionSteps.slice(1)];

  return result;
}

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
 * Kabbalistic life path uses the same date calculation as Pythagorean.
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
