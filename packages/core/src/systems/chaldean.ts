import type { NumberResult } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

const SYSTEM = 'chaldean' as const;

/**
 * Chaldean letter-to-number mapping.
 * Uses values 1-8 only (no 9 in letter assignments).
 * Based on vibrational sound, not sequential position.
 */
const LETTER_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
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
    return { value: 0, masterNumber: false, reductionSteps: ['(no vowels found)'], system: SYSTEM };
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
 * Chaldean Life Path: same date calculation as Pythagorean.
 * The Chaldean system primarily differs in name calculations.
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
