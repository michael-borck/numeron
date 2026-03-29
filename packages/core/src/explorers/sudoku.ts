import type { SudokuAnalysis } from '../types.js';

/**
 * Validate and analyse a sudoku grid for its numerological "pure-9" properties.
 *
 * Pure-9 properties:
 * - Total cells: 81 → 9
 * - Each digit appears 9 times → 9
 * - Each row/column/box sum: 45 → 9
 * - Total of all 81 cells: 405 → 9
 * - Number of valid completed sudokus reduces to 9
 */
export function analyzeSudoku(grid: number[][]): SudokuAnalysis {
  const rowSums: number[] = [];
  const colSums: number[] = Array(9).fill(0);
  const boxSums: number[] = Array(9).fill(0);
  const digitFrequency: Record<number, number> = {};
  let totalSum = 0;
  let isComplete = true;

  for (let r = 0; r < 9; r++) {
    let rowSum = 0;
    for (let c = 0; c < 9; c++) {
      const val = grid[r]?.[c] ?? 0;
      if (val === 0) {
        isComplete = false;
      } else {
        rowSum += val;
        colSums[c] += val;
        const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        boxSums[boxIdx] += val;
        digitFrequency[val] = (digitFrequency[val] || 0) + 1;
        totalSum += val;
      }
    }
    rowSums.push(rowSum);
  }

  // Validate: each row, column, box contains 1-9 exactly once
  const isValid = isComplete && validateSudoku(grid);

  // Score: how many pure-9 properties hold
  let pureNineScore = 0;
  if (totalSum === 405) pureNineScore++; // Total = 405 → 9
  if (rowSums.every((s) => s === 45)) pureNineScore++; // All rows = 45
  if (colSums.every((s) => s === 45)) pureNineScore++; // All cols = 45
  if (boxSums.every((s) => s === 45)) pureNineScore++; // All boxes = 45
  if (Object.values(digitFrequency).every((f) => f === 9)) pureNineScore++; // Each digit 9 times
  if (isComplete) pureNineScore++; // 81 cells filled → 81 reduces to 9

  return {
    grid,
    isValid,
    isComplete,
    rowSums,
    colSums,
    boxSums,
    totalSum,
    digitFrequency,
    pureNineScore,
  };
}

function validateSudoku(grid: number[][]): boolean {
  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set<number>();
    for (let c = 0; c < 9; c++) {
      const val = grid[r][c];
      if (val < 1 || val > 9 || seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const seen = new Set<number>();
    for (let r = 0; r < 9; r++) {
      const val = grid[r][c];
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }

  // Check 3x3 boxes
  for (let boxR = 0; boxR < 3; boxR++) {
    for (let boxC = 0; boxC < 3; boxC++) {
      const seen = new Set<number>();
      for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
        for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
          const val = grid[r][c];
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
  }

  return true;
}

/**
 * Parse a sudoku from an 81-character string of digits.
 * 0 or . = empty cell.
 */
export function parseSudokuString(input: string): number[][] {
  const digits = input.replace(/[^0-9.]/g, '').replace(/\./g, '0');
  if (digits.length !== 81) {
    throw new Error(`Expected 81 digits, got ${digits.length}`);
  }
  const grid: number[][] = [];
  for (let r = 0; r < 9; r++) {
    grid.push(
      digits
        .slice(r * 9, (r + 1) * 9)
        .split('')
        .map(Number),
    );
  }
  return grid;
}
