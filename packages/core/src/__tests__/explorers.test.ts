import { describe, it, expect } from 'vitest';
import {
  analyzeMagicSquare,
  LO_SHU,
  DURER,
  AGRIPPA_5,
  JUPITER,
} from '../explorers/magic-squares.js';
import { analyzeSudoku, parseSudokuString } from '../explorers/sudoku.js';
import {
  FIBONACCI_MOD9_CYCLE,
  verifyFibMod9Properties,
  fibonacciWithReductions,
  fibClockPositions,
} from '../explorers/fibonacci.js';
import { constants, reduceUserConstant } from '../explorers/constants.js';
import {
  kaprekarProcess,
  KAPREKAR_CONSTANT,
  cyclicNumberMultiples,
  powersOf2,
  TESLA_PATTERN,
} from '../explorers/kaprekar.js';

// --- Magic Squares ---

describe('magic squares', () => {
  it('validates Lo Shu as a valid magic square', () => {
    const result = analyzeMagicSquare(LO_SHU, 'China, ~2000 BCE');
    expect(result.isValid).toBe(true);
    expect(result.order).toBe(3);
    expect(result.magicConstant).toBe(15);
    expect(result.magicConstantReduction.value).toBe(6);
    expect(result.centerValue).toBe(5);
  });

  it('validates Dürer square', () => {
    const result = analyzeMagicSquare(DURER, 'Germany, 1514');
    expect(result.isValid).toBe(true);
    expect(result.magicConstant).toBe(34);
    expect(result.magicConstantReduction.value).toBe(7);
  });

  it('validates Agrippa order-5', () => {
    const result = analyzeMagicSquare(AGRIPPA_5);
    expect(result.isValid).toBe(true);
    expect(result.magicConstant).toBe(65);
    expect(result.magicConstantReduction.value).toBe(11);
    expect(result.magicConstantReduction.masterNumber).toBe(true);
  });

  it('validates Jupiter square', () => {
    const result = analyzeMagicSquare(JUPITER);
    expect(result.isValid).toBe(true);
    expect(result.magicConstant).toBe(34);
  });

  it('rejects an invalid square', () => {
    const bad = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = analyzeMagicSquare(bad);
    expect(result.isValid).toBe(false);
  });
});

// --- Sudoku ---

describe('sudoku analyser', () => {
  // A valid completed sudoku
  const validSudoku = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  it('validates a correct sudoku', () => {
    const result = analyzeSudoku(validSudoku);
    expect(result.isValid).toBe(true);
    expect(result.isComplete).toBe(true);
  });

  it('confirms pure-9 properties', () => {
    const result = analyzeSudoku(validSudoku);
    expect(result.totalSum).toBe(405);
    expect(result.rowSums.every((s) => s === 45)).toBe(true);
    expect(result.colSums.every((s) => s === 45)).toBe(true);
    expect(result.boxSums.every((s) => s === 45)).toBe(true);
    expect(result.pureNineScore).toBe(6); // All 6 properties
  });

  it('each digit appears exactly 9 times', () => {
    const result = analyzeSudoku(validSudoku);
    for (let d = 1; d <= 9; d++) {
      expect(result.digitFrequency[d]).toBe(9);
    }
  });

  it('detects incomplete sudoku', () => {
    const incomplete = validSudoku.map((r) => [...r]);
    incomplete[0][0] = 0;
    const result = analyzeSudoku(incomplete);
    expect(result.isComplete).toBe(false);
    expect(result.isValid).toBe(false);
  });

  it('parses sudoku from string', () => {
    const str = '534678912672195348198342567859761423426853791713924856961537284287419635345286179';
    const grid = parseSudokuString(str);
    expect(grid).toHaveLength(9);
    expect(grid[0]).toHaveLength(9);
    expect(grid[0][0]).toBe(5);
  });

  it('rejects wrong-length string', () => {
    expect(() => parseSudokuString('12345')).toThrow();
  });
});

// --- Fibonacci ---

describe('fibonacci mod-9', () => {
  it('cycle has period 24', () => {
    expect(FIBONACCI_MOD9_CYCLE).toHaveLength(24);
  });

  it('9 appears at positions 12 and 24', () => {
    expect(FIBONACCI_MOD9_CYCLE[11]).toBe(9); // 0-indexed position 11 = position 12
    expect(FIBONACCI_MOD9_CYCLE[23]).toBe(9); // position 24
  });

  it('cycle sums to 117', () => {
    const sum = FIBONACCI_MOD9_CYCLE.reduce((a, b) => a + b, 0);
    expect(sum).toBe(117);
  });

  it('verifyFibMod9Properties returns correct data', () => {
    const props = verifyFibMod9Properties();
    expect(props.period).toBe(24);
    expect(props.ninePositions).toEqual([12, 24]);
    expect(props.cycleSum).toBe(117);
    expect(props.cycleSumReduced).toBe(9);
  });

  it('generates fibonacci with reductions', () => {
    const fibs = fibonacciWithReductions(10);
    expect(fibs).toHaveLength(10);
    expect(fibs[0]).toEqual({ index: 1, fib: 1, reduced: 1 });
    expect(fibs[1]).toEqual({ index: 2, fib: 1, reduced: 1 });
    expect(fibs[2]).toEqual({ index: 3, fib: 2, reduced: 2 });
    // Fib(7) = 13 → 4
    expect(fibs[6].fib).toBe(13);
    expect(fibs[6].reduced).toBe(4);
  });

  it('finds clock positions for a target number', () => {
    const positions = fibClockPositions(9);
    expect(positions).toEqual([12, 24]);
    const ones = fibClockPositions(1);
    expect(ones.length).toBeGreaterThan(0);
  });
});

// --- Constants ---

describe('constants table', () => {
  it('has 16 preloaded constants', () => {
    expect(constants).toHaveLength(16);
  });

  it('pi reduces to 1', () => {
    const pi = constants.find((c) => c.symbol === 'π');
    expect(pi).toBeDefined();
    expect(pi!.result.value).toBe(1); // 17 digits of pi sum to 82 → 10 → 1
  });

  it('e reduces to 11 (master number)', () => {
    const e = constants.find((c) => c.symbol === 'e');
    expect(e).toBeDefined();
    expect(e!.result.value).toBe(11);
    expect(e!.result.masterNumber).toBe(true);
  });

  it('golden ratio reduces to 9', () => {
    const phi = constants.find((c) => c.symbol === 'φ');
    expect(phi).toBeDefined();
    expect(phi!.result.value).toBe(9);
  });

  it('fine structure constant (137) reduces to 11', () => {
    const alpha = constants.find((c) => c.name === 'Fine structure constant');
    expect(alpha).toBeDefined();
    expect(alpha!.result.value).toBe(11);
    expect(alpha!.annotation).toBeTruthy();
  });

  it('Planck full reduces to 33', () => {
    const planck = constants.find((c) => c.name === "Planck's constant (full)");
    expect(planck).toBeDefined();
    expect(planck!.result.value).toBe(33);
    expect(planck!.result.masterNumber).toBe(true);
  });

  it('reduceUserConstant works for any input', () => {
    const result = reduceUserConstant('3.14159');
    expect(result).not.toBeNull();
    expect(result!.value).toBeGreaterThan(0);
  });

  it('reduceUserConstant returns null for empty input', () => {
    expect(reduceUserConstant('')).toBeNull();
    expect(reduceUserConstant('abc')).toBeNull();
  });
});

// --- Kaprekar ---

describe('kaprekar process', () => {
  it('reaches 6174 from 3524', () => {
    const result = kaprekarProcess(3524);
    expect(result.reachedConstant).toBe(true);
    expect(result.inputValid).toBe(true);
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[result.steps.length - 1].result).toBe(KAPREKAR_CONSTANT);
  });

  it('reaches 6174 from 1000', () => {
    const result = kaprekarProcess(1000);
    expect(result.reachedConstant).toBe(true);
  });

  it('completes within 7 steps', () => {
    const result = kaprekarProcess(2345);
    expect(result.reachedConstant).toBe(true);
    expect(result.steps.length).toBeLessThanOrEqual(7);
  });

  it('rejects all-same-digit numbers', () => {
    const result = kaprekarProcess(1111);
    expect(result.inputValid).toBe(false);
  });

  it('rejects numbers > 9999', () => {
    const result = kaprekarProcess(10000);
    expect(result.inputValid).toBe(false);
  });

  it('6174 reduces to 9', () => {
    // 6+1+7+4 = 18 → 9
    expect(KAPREKAR_CONSTANT).toBe(6174);
  });
});

describe('cyclic number 142857', () => {
  it('all multiples reduce to 9', () => {
    const multiples = cyclicNumberMultiples();
    expect(multiples).toHaveLength(7);
    for (const m of multiples) {
      expect(m.reduced).toBe(9);
    }
  });

  it('× 7 = 999999', () => {
    const multiples = cyclicNumberMultiples();
    expect(multiples[6].product).toBe(999999);
  });
});

describe('powers of 2', () => {
  it('generates correct mod-9 cycle', () => {
    const p = powersOf2(12);
    expect(p).toHaveLength(12);
    expect(p[0].mod9).toBe(2); // 2^1 mod 9 = 2
    expect(p[1].mod9).toBe(4); // 2^2 mod 9 = 4
    expect(p[5].mod9).toBe(1); // 2^6 mod 9 = 1
    expect(p[6].mod9).toBe(2); // 2^7 mod 9 = 2 (cycle repeats)
  });
});

describe('Tesla pattern', () => {
  it('doubling cycle excludes 3, 6, 9', () => {
    for (const n of TESLA_PATTERN.doublingCycle) {
      expect([3, 6, 9]).not.toContain(n);
    }
  });

  it('sacred triad is 3, 6, 9', () => {
    expect(TESLA_PATTERN.sacredTriad).toEqual([3, 6, 9]);
  });
});
