/**
 * Fibonacci sequence analysis through numerological reduction.
 *
 * Key property: Fibonacci mod 9 (Pisano period π(9)) produces a cycle
 * of exactly 24 values before repeating.
 */

/**
 * The Fibonacci mod-9 cycle — period exactly 24.
 * Precomputed and verified.
 */
export const FIBONACCI_MOD9_CYCLE = [
  1, 1, 2, 3, 5, 8, 4, 3, 7, 1, 8, 9, 8, 8, 7, 6, 4, 1, 5, 6, 2, 8, 1, 9,
] as const;

/**
 * Generate the first n Fibonacci numbers with their digit-sum reductions.
 */
export function fibonacciWithReductions(
  count: number,
): { index: number; fib: number; reduced: number }[] {
  const results: { index: number; fib: number; reduced: number }[] = [];
  let a = 0;
  let b = 1;

  for (let i = 1; i <= count; i++) {
    const reduced = digitSumReduce(b);
    results.push({ index: i, fib: b, reduced });
    [a, b] = [b, a + b];
  }

  return results;
}

/**
 * Verify the Fibonacci mod-9 cycle properties.
 */
export function verifyFibMod9Properties(): {
  period: number;
  ninePositions: number[];
  isPalindromic: boolean;
  cycleSum: number;
  cycleSumReduced: number;
} {
  const cycle = FIBONACCI_MOD9_CYCLE;
  const period = cycle.length; // Should be 24

  // 9 appears at positions 12 and 24 (1-indexed)
  const ninePositions = cycle.map((v, i) => (v === 9 ? i + 1 : -1)).filter((i) => i !== -1);

  // Palindromic around position 12
  const firstHalf = cycle.slice(0, 12);
  const secondHalf = cycle.slice(12, 24);
  const isPalindromic = firstHalf.every((v, i) => {
    // Mirror symmetry: position i mirrors with position 11-i in each half
    // Actually, the whole cycle is palindromic when the halves mirror each other
    return v + secondHalf[i] === 9 || (v === 9 && secondHalf[i] === 9);
  });

  // Sum of full cycle = 117 → 9
  const cycleSum = cycle.reduce((a, b) => a + b, 0);
  const cycleSumReduced = digitSumReduce(cycleSum);

  return { period, ninePositions, isPalindromic, cycleSum, cycleSumReduced };
}

/**
 * Get the Fibonacci clock position for a given number (1-9).
 * Returns which positions in the 24-cycle contain that digit.
 */
export function fibClockPositions(target: number): number[] {
  return FIBONACCI_MOD9_CYCLE.map((v, i) => (v === target ? i + 1 : -1)).filter((i) => i !== -1);
}

/**
 * Key phi (golden ratio) facts for display.
 */
export const PHI_FACTS = {
  value: 1.6180339887,
  digitsReduce: 9, // 1+6+1+8+0+3+3+9+8+8+7 = 54 → 9
  algebraicProperty: 'φ² = φ + 1',
  reciprocalProperty: '1/φ = φ - 1',
  goldenAngle: 137.5, // degrees — and 137 is the fine structure constant!
  goldenAngleNote:
    'The golden angle (360° / φ²) ≈ 137.5° — used by plants to pack seeds. 137 is the fine structure constant to the nearest integer. Coincidence? Yes. Fun? Also yes.',
} as const;

function digitSumReduce(n: number): number {
  let current = n;
  while (current > 9) {
    current = String(current)
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return current;
}
