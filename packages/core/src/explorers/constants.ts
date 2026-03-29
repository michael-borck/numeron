import { reduceNumber } from '../utils/reduce.js';
import type { NumberResult } from '../types.js';

export interface ConstantEntry {
  name: string;
  symbol: string;
  valueDisplay: string;
  digitsUsed: number[];
  result: NumberResult;
  annotation?: string;
  source: 'physics' | 'math' | 'culture' | 'sacred';
}

function reduceDigits(digits: number[]): NumberResult {
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum, 'pythagorean');
}

/**
 * Preloaded scientific and cultural constants with numerological reductions.
 * Per spec: "we chose 9 figures because 33 is more interesting than 2."
 */
export const constants: ConstantEntry[] = [
  {
    name: 'Pi',
    symbol: 'π',
    valueDisplay: '3.1415926535897932',
    digitsUsed: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2],
    result: reduceDigits([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2]),
    source: 'math',
  },
  {
    name: "Euler's number",
    symbol: 'e',
    valueDisplay: '2.718281828',
    digitsUsed: [2, 7, 1, 8, 2, 8, 1, 8, 2, 8],
    result: reduceDigits([2, 7, 1, 8, 2, 8, 1, 8, 2, 8]),
    source: 'math',
  },
  {
    name: 'Golden ratio',
    symbol: 'φ',
    valueDisplay: '1.61803398887',
    digitsUsed: [1, 6, 1, 8, 0, 3, 3, 9, 8, 8, 7],
    result: reduceDigits([1, 6, 1, 8, 0, 3, 3, 9, 8, 8, 7]),
    source: 'math',
  },
  {
    name: 'Speed of light',
    symbol: 'c',
    valueDisplay: '299,792,458 m/s',
    digitsUsed: [2, 9, 9, 7, 9, 2, 4, 5, 8],
    result: reduceDigits([2, 9, 9, 7, 9, 2, 4, 5, 8]),
    source: 'physics',
  },
  {
    name: 'Fine structure constant',
    symbol: 'α ≈ 1/137',
    valueDisplay: '137',
    digitsUsed: [1, 3, 7],
    result: reduceDigits([1, 3, 7]),
    annotation:
      'α ≈ 1/137. A dimensionless constant governing electromagnetic interaction. Richard Feynman called it "one of the greatest damn mysteries of physics." Wolfgang Pauli died in hospital room 137. It reduces to 11, the master number of illumination.',
    source: 'physics',
  },
  {
    name: "Planck's constant (4 sig. fig.)",
    symbol: 'h',
    valueDisplay: '6.626 × 10⁻³⁴ J⋅s',
    digitsUsed: [6, 6, 2, 6],
    result: reduceDigits([6, 6, 2, 6]),
    source: 'physics',
  },
  {
    name: "Planck's constant (full)",
    symbol: 'h',
    valueDisplay: '6.62607015 × 10⁻³⁴ J⋅s',
    digitsUsed: [6, 6, 2, 6, 0, 7, 0, 1, 5],
    result: reduceDigits([6, 6, 2, 6, 0, 7, 0, 1, 5]),
    annotation:
      "Written to four significant figures, Planck's constant reduces to 2. Written to its full defined value, the digits sum to 33 — the rarest master number. We chose 9 figures because 33 is more interesting than 2. This is honest cherry-picking.",
    source: 'physics',
  },
  {
    name: 'Square root of 2',
    symbol: '√2',
    valueDisplay: '1.41421356',
    digitsUsed: [1, 4, 1, 4, 2, 1, 3, 5, 6],
    result: reduceDigits([1, 4, 1, 4, 2, 1, 3, 5, 6]),
    source: 'math',
  },
  {
    name: "Avogadro's number",
    symbol: 'Nₐ',
    valueDisplay: '6.022 × 10²³',
    digitsUsed: [6, 0, 2, 2],
    result: reduceDigits([6, 0, 2, 2]),
    source: 'physics',
  },
  {
    name: 'Answer to Everything',
    symbol: '42',
    valueDisplay: '42',
    digitsUsed: [4, 2],
    result: reduceDigits([4, 2]),
    source: 'culture',
  },
  {
    name: 'Number of the Beast',
    symbol: '666',
    valueDisplay: '666',
    digitsUsed: [6, 6, 6],
    result: reduceDigits([6, 6, 6]),
    source: 'sacred',
  },
  {
    name: 'Sacred Hindu/Buddhist',
    symbol: '108',
    valueDisplay: '108',
    digitsUsed: [1, 0, 8],
    result: reduceDigits([1, 0, 8]),
    source: 'sacred',
  },
  {
    name: 'Hz tuning frequency',
    symbol: '432 Hz',
    valueDisplay: '432',
    digitsUsed: [4, 3, 2],
    result: reduceDigits([4, 3, 2]),
    source: 'sacred',
  },
  {
    name: 'Revelation',
    symbol: '144,000',
    valueDisplay: '144,000',
    digitsUsed: [1, 4, 4],
    result: reduceDigits([1, 4, 4]),
    source: 'sacred',
  },
  {
    name: 'Degrees in a circle',
    symbol: '360°',
    valueDisplay: '360',
    digitsUsed: [3, 6, 0],
    result: reduceDigits([3, 6, 0]),
    source: 'sacred',
  },
  {
    name: 'Hardy-Ramanujan number',
    symbol: '1729',
    valueDisplay: '1729',
    digitsUsed: [1, 7, 2, 9],
    result: reduceDigits([1, 7, 2, 9]),
    source: 'math',
  },
];

/**
 * Reduce any user-entered number and return the result.
 */
export function reduceUserConstant(input: string): NumberResult | null {
  const digits = input
    .replace(/[^0-9]/g, '')
    .split('')
    .map(Number);
  if (digits.length === 0) return null;
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum, 'pythagorean');
}
