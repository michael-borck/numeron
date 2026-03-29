import { reduceNumber } from '../utils/reduce.js';
import type { NumberResult } from '../types.js';

/**
 * Kaprekar's constant: 6174
 * Take any 4-digit number (not all same digits). Arrange digits
 * descending and ascending, subtract. Repeat. Always reaches 6174
 * within 7 steps. 6+1+7+4 = 18 → 9.
 */
export const KAPREKAR_CONSTANT = 6174;
export const KAPREKAR_REDUCTION: NumberResult = reduceNumber(6174, 'pythagorean');

export interface KaprekarStep {
  descending: number;
  ascending: number;
  result: number;
}

/**
 * Run the Kaprekar routine on a 4-digit number.
 * Returns the steps taken to reach 6174 (capped at 10 iterations).
 */
export function kaprekarProcess(input: number): {
  steps: KaprekarStep[];
  reachedConstant: boolean;
  inputValid: boolean;
} {
  // Validate: must be 4 digits, not all the same
  const padded = String(input).padStart(4, '0');
  if (padded.length > 4 || input < 0 || input > 9999) {
    return { steps: [], reachedConstant: false, inputValid: false };
  }
  const allSame = new Set(padded).size === 1;
  if (allSame) {
    return { steps: [], reachedConstant: false, inputValid: false };
  }

  const steps: KaprekarStep[] = [];
  let current = input;
  const maxIterations = 10;

  for (let i = 0; i < maxIterations; i++) {
    if (current === KAPREKAR_CONSTANT && i > 0) break;

    const digits = String(current).padStart(4, '0').split('').map(Number);
    const desc = Number(digits.sort((a, b) => b - a).join(''));
    const asc = Number([...digits].sort((a, b) => a - b).join(''));
    const result = desc - asc;

    steps.push({ descending: desc, ascending: asc, result });
    current = result;

    if (result === KAPREKAR_CONSTANT) break;
  }

  return {
    steps,
    reachedConstant: current === KAPREKAR_CONSTANT,
    inputValid: true,
  };
}

/**
 * Sacred geometry patterns for Tab 5.
 */

/** Powers of 2 mod 9 cycle: 2, 4, 8, 7, 5, 1 (period 6) */
export const POWERS_OF_2_MOD9 = [2, 4, 8, 7, 5, 1] as const;

/**
 * Generate powers of 2 with their mod-9 reductions.
 */
export function powersOf2(count: number): { power: number; value: number; mod9: number }[] {
  const results: { power: number; value: number; mod9: number }[] = [];
  for (let i = 1; i <= count; i++) {
    const value = Math.pow(2, i);
    const mod9 = POWERS_OF_2_MOD9[(i - 1) % 6];
    results.push({ power: i, value, mod9 });
  }
  return results;
}

/** The cyclic number 142857 = 1/7 as repeating decimal */
export const CYCLIC_NUMBER = 142857;

/**
 * Show 142857 × 1 through 7 — all produce rotations, all reduce to 9.
 */
export function cyclicNumberMultiples(): {
  multiplier: number;
  product: number;
  reduced: number;
}[] {
  return Array.from({ length: 7 }, (_, i) => {
    const m = i + 1;
    const product = CYCLIC_NUMBER * m;
    const reduced = reduceNumber(product, 'pythagorean').value;
    return { multiplier: m, product, reduced };
  });
}

/**
 * Tesla's 3-6-9 pattern.
 * Doubling sequence 1,2,4,8,7,5 (powers of 2 mod 9) never includes 3, 6, or 9.
 * 3→6→3→6 and 9→9 form separate closed systems under doubling mod 9.
 */
export const TESLA_PATTERN = {
  doublingCycle: [1, 2, 4, 8, 7, 5] as const,
  sacredTriad: [3, 6, 9] as const,
  description:
    'The doubling sequence (powers of 2 mod 9) cycles through 1, 2, 4, 8, 7, 5 — never touching 3, 6, or 9. Those three form their own closed system: 3 doubles to 6, 6 doubles to 3, and 9 always doubles to 9.',
} as const;
