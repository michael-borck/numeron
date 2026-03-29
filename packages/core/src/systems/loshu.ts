import type { NumberResult } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

const SYSTEM = 'loshu' as const;

/**
 * The Lo Shu magic square — the foundational 3x3 grid.
 * Every row, column, and diagonal sums to 15 (→ 6).
 */
export const LO_SHU_GRID = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
] as const;

export const LO_SHU_MAGIC_CONSTANT = 15;

/**
 * Lo Shu / Vedic system uses Pythagorean-equivalent letter values.
 * The Lo Shu distinction is primarily in the grid overlay,
 * not in the letter table.
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

export function letterValue(char: string): number {
  return LETTER_VALUES[char.toUpperCase()] ?? 0;
}

/**
 * Life path calculation — same method as Pythagorean, tagged as Lo Shu system.
 * In the Lo Shu tradition, the birth date numbers are the primary input;
 * name calculations are secondary.
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

export function expression(fullBirthName: string): NumberResult {
  return reduceName(fullBirthName);
}

function reduceName(name: string): NumberResult {
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

/**
 * Map a set of numbers onto the Lo Shu grid.
 * Returns a 3x3 grid where each cell contains:
 * - the Lo Shu value
 * - which of the user's numbers map to this cell
 */
export interface LoShuOverlay {
  grid: {
    loShuValue: number;
    userNumbers: string[];
  }[][];
}

export function overlayOnLoShu(numbers: { label: string; value: number }[]): LoShuOverlay {
  const grid: LoShuOverlay['grid'] = LO_SHU_GRID.map((row) =>
    row.map((cell) => ({
      loShuValue: cell,
      userNumbers: [],
    })),
  );

  // Map each user number to its position on the Lo Shu grid
  // Numbers 1-9 map directly; reduced numbers map to their single digit
  for (const { label, value } of numbers) {
    const reduced = value > 9 ? reduceNumber(value, SYSTEM, false).value : value;
    if (reduced >= 1 && reduced <= 9) {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (LO_SHU_GRID[r][c] === reduced) {
            grid[r][c].userNumbers.push(label);
          }
        }
      }
    }
  }

  return { grid };
}
