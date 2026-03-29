import type { MagicSquareAnalysis } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

/**
 * Validate and analyse a magic square.
 */
export function analyzeMagicSquare(grid: number[][], tradition?: string): MagicSquareAnalysis {
  const order = grid.length;
  const expectedConstant = (order * (order * order + 1)) / 2;

  // Check all rows
  const rowSums = grid.map((row) => row.reduce((a, b) => a + b, 0));
  // Check all columns
  const colSums: number[] = [];
  for (let c = 0; c < order; c++) {
    colSums.push(grid.reduce((sum, row) => sum + (row[c] ?? 0), 0));
  }
  // Check main diagonals
  let diag1 = 0;
  let diag2 = 0;
  for (let i = 0; i < order; i++) {
    diag1 += grid[i][i];
    diag2 += grid[i][order - 1 - i];
  }

  const allSums = [...rowSums, ...colSums, diag1, diag2];
  const isValid = allSums.every((s) => s === expectedConstant);

  const centerValue =
    order % 2 === 1 ? grid[Math.floor(order / 2)][Math.floor(order / 2)] : undefined;

  return {
    grid,
    order,
    magicConstant: expectedConstant,
    magicConstantReduction: reduceNumber(expectedConstant, 'pythagorean'),
    centerValue,
    isValid,
    tradition,
  };
}

/** Lo Shu — 3×3, China, ~2000 BCE */
export const LO_SHU: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

/** Dürer's Melancholia I — 4×4, Germany, 1514 */
export const DURER: number[][] = [
  [16, 3, 2, 13],
  [5, 10, 11, 8],
  [9, 6, 7, 12],
  [4, 15, 14, 1],
];

/** Agrippa's Order-5 — Renaissance occult, ~1530 */
export const AGRIPPA_5: number[][] = [
  [11, 24, 7, 20, 3],
  [4, 12, 25, 8, 16],
  [17, 5, 13, 21, 9],
  [10, 18, 1, 14, 22],
  [23, 6, 19, 2, 15],
];

/** Jupiter Square — Order-4 variant */
export const JUPITER: number[][] = [
  [4, 14, 15, 1],
  [9, 7, 6, 12],
  [5, 11, 10, 8],
  [16, 2, 3, 13],
];

export const preloadedSquares = [
  { name: 'Lo Shu', grid: LO_SHU, tradition: 'China, ~2000 BCE' },
  { name: "Dürer's Melancholia I", grid: DURER, tradition: 'Germany, 1514 AD' },
  { name: "Agrippa's Order-5", grid: AGRIPPA_5, tradition: 'Renaissance occult, ~1530' },
  { name: 'Jupiter Square', grid: JUPITER, tradition: 'Talismanic magic' },
] as const;
