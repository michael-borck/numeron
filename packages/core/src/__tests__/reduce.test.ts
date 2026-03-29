import { describe, it, expect } from 'vitest';
import { reduceNumber, isMasterNumber, digitSum } from '../utils/reduce.js';

describe('isMasterNumber', () => {
  it('identifies 11, 22, 33 as master numbers', () => {
    expect(isMasterNumber(11)).toBe(true);
    expect(isMasterNumber(22)).toBe(true);
    expect(isMasterNumber(33)).toBe(true);
  });

  it('rejects non-master numbers', () => {
    expect(isMasterNumber(1)).toBe(false);
    expect(isMasterNumber(9)).toBe(false);
    expect(isMasterNumber(44)).toBe(false);
    expect(isMasterNumber(10)).toBe(false);
  });
});

describe('reduceNumber', () => {
  it('returns single digits unchanged', () => {
    const result = reduceNumber(7, 'pythagorean');
    expect(result.value).toBe(7);
    expect(result.masterNumber).toBe(false);
    expect(result.reductionSteps).toEqual(['7']);
  });

  it('reduces multi-digit numbers', () => {
    const result = reduceNumber(29, 'pythagorean');
    expect(result.value).toBe(11);
    expect(result.masterNumber).toBe(true);
    expect(result.reductionSteps).toContain('2 + 9 = 11');
  });

  it('stops at master number 11', () => {
    const result = reduceNumber(29, 'pythagorean');
    expect(result.value).toBe(11);
    expect(result.masterNumber).toBe(true);
  });

  it('stops at master number 22', () => {
    const result = reduceNumber(22, 'pythagorean');
    expect(result.value).toBe(22);
    expect(result.masterNumber).toBe(true);
  });

  it('stops at master number 33', () => {
    const result = reduceNumber(33, 'pythagorean');
    expect(result.value).toBe(33);
    expect(result.masterNumber).toBe(true);
  });

  it('does not stop at master numbers when stopAtMaster is false', () => {
    const result = reduceNumber(29, 'pythagorean', false);
    expect(result.value).toBe(2);
    expect(result.masterNumber).toBe(false);
  });

  it('reduces large numbers step by step', () => {
    const result = reduceNumber(987, 'pythagorean');
    expect(result.value).toBe(6);
    expect(result.reductionSteps).toEqual(['987', '9 + 8 + 7 = 24', '2 + 4 = 6']);
  });

  it('handles zero', () => {
    const result = reduceNumber(0, 'pythagorean');
    expect(result.value).toBe(0);
  });
});

describe('digitSum', () => {
  it('sums digits of a number', () => {
    expect(digitSum(123)).toBe(6);
    expect(digitSum(999)).toBe(27);
    expect(digitSum(7)).toBe(7);
  });
});
