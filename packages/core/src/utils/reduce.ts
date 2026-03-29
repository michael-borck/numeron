import type { NumberResult, NumerologySystem } from '../types.js';

const MASTER_NUMBERS = new Set([11, 22, 33]);

export function isMasterNumber(n: number): boolean {
  return MASTER_NUMBERS.has(n);
}

/**
 * Reduce a number to a single digit (or master number 11/22/33).
 * Records every step for transparent display.
 */
export function reduceNumber(
  n: number,
  system: NumerologySystem,
  stopAtMaster = true,
): NumberResult {
  const steps: string[] = [String(n)];
  let current = n;

  while (current > 9 && !(stopAtMaster && isMasterNumber(current))) {
    const digits = String(current).split('').map(Number);
    const next = digits.reduce((a, b) => a + b, 0);
    steps.push(`${digits.join(' + ')} = ${next}`);
    current = next;
  }

  return {
    value: current,
    masterNumber: isMasterNumber(current),
    reductionSteps: steps,
    system,
  };
}

/**
 * Sum digits of a number without reducing to single digit.
 * Used for intermediate steps in larger calculations.
 */
export function digitSum(n: number): number {
  return String(n)
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
}
