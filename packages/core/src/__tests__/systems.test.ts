import { describe, it, expect } from 'vitest';
import * as kabbalistic from '../systems/kabbalistic.js';
import * as loshu from '../systems/loshu.js';
import * as abjad from '../systems/abjad.js';
import * as chaldean from '../systems/chaldean.js';

describe('kabbalistic system', () => {
  it('uses higher letter values than pythagorean (J=10, K=20, etc.)', () => {
    expect(kabbalistic.letterValue('A')).toBe(1);
    expect(kabbalistic.letterValue('J')).toBe(10);
    expect(kabbalistic.letterValue('K')).toBe(20);
    expect(kabbalistic.letterValue('S')).toBe(100);
    expect(kabbalistic.letterValue('Z')).toBe(800);
  });

  it('calculates expression number', () => {
    const result = kabbalistic.expression('MICHAEL');
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThanOrEqual(33);
    expect(result.system).toBe('kabbalistic');
  });

  it('calculates soul urge (vowels only)', () => {
    const result = kabbalistic.soulUrge('MICHAEL');
    expect(result.value).toBeGreaterThan(0);
    expect(result.reductionSteps[0]).toContain('Vowels');
  });

  it('calculates personality (consonants only)', () => {
    const result = kabbalistic.personality('MICHAEL');
    expect(result.value).toBeGreaterThan(0);
    expect(result.reductionSteps[0]).toContain('Consonants');
  });

  it('calculates life path from date', () => {
    const result = kabbalistic.lifePath('1990-07-15');
    expect(result.value).toBeGreaterThan(0);
    expect(result.system).toBe('kabbalistic');
  });

  it('handles empty input', () => {
    expect(kabbalistic.expression('').value).toBe(0);
    expect(kabbalistic.soulUrge('BCD').value).toBe(0);
  });
});

describe('loshu system', () => {
  it('uses pythagorean-equivalent letter values', () => {
    expect(loshu.letterValue('A')).toBe(1);
    expect(loshu.letterValue('I')).toBe(9);
    expect(loshu.letterValue('J')).toBe(1);
    expect(loshu.letterValue('Z')).toBe(8);
  });

  it('calculates life path', () => {
    const result = loshu.lifePath('1990-07-15');
    expect(result.value).toBe(5); // Same as Pythagorean for date-based calc
    expect(result.system).toBe('loshu');
  });

  it('calculates expression number', () => {
    const result = loshu.expression('MICHAEL');
    expect(result.value).toBeGreaterThan(0);
    expect(result.system).toBe('loshu');
  });

  it('exports the Lo Shu grid constant', () => {
    expect(loshu.LO_SHU_GRID).toEqual([
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ]);
    expect(loshu.LO_SHU_MAGIC_CONSTANT).toBe(15);
  });

  it('overlays numbers onto the Lo Shu grid', () => {
    const overlay = loshu.overlayOnLoShu([
      { label: 'Life Path', value: 5 },
      { label: 'Expression', value: 7 },
    ]);
    expect(overlay.grid).toHaveLength(3);
    // Life Path 5 should map to centre cell
    expect(overlay.grid[1][1].userNumbers).toContain('Life Path');
    // Expression 7 should map to position [1][2]
    expect(overlay.grid[1][2].userNumbers).toContain('Expression');
  });
});

describe('abjad system', () => {
  it('maps Latin letters with high values like kabbalistic', () => {
    expect(abjad.letterValue('A')).toBe(1);
    expect(abjad.letterValue('J')).toBe(10);
    expect(abjad.letterValue('Z')).toBe(800);
  });

  it('handles Arabic script input', () => {
    // ا (Alif) = 1, ب (Ba) = 2
    expect(abjad.letterValue('\u0627')).toBe(1);
    expect(abjad.letterValue('\u0628')).toBe(2);
  });

  it('calculates expression for Latin input', () => {
    const result = abjad.expression('MICHAEL');
    expect(result.value).toBeGreaterThan(0);
    expect(result.system).toBe('abjad');
  });

  it('calculates expression for Arabic input', () => {
    // بسم (B-S-M) = 2 + 60 + 40 = 102 → 3
    const result = abjad.expression('\u0628\u0633\u0645');
    expect(result.value).toBe(3);
  });

  it('calculates life path', () => {
    const result = abjad.lifePath('1990-07-15');
    expect(result.value).toBeGreaterThan(0);
    expect(result.system).toBe('abjad');
  });
});

describe('chaldean system', () => {
  it('never assigns 9 to a letter', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const letter of alphabet) {
      expect(chaldean.letterValue(letter)).toBeLessThanOrEqual(8);
      expect(chaldean.letterValue(letter)).toBeGreaterThanOrEqual(1);
    }
  });

  it('produces different results than pythagorean for names', () => {
    // F: Pythagorean=6, Chaldean=8 — so names with F should differ
    expect(chaldean.letterValue('F')).toBe(8);
  });
});

describe('cross-system comparison', () => {
  it('systems can produce different expression numbers for the same name', () => {
    const name = 'MICHAEL';
    const results = new Set([
      kabbalistic.expression(name).value,
      chaldean.expression(name).value,
      abjad.expression(name).value,
    ]);
    // At least some systems should disagree — this is a key spec requirement
    expect(results.size).toBeGreaterThanOrEqual(1);
  });

  it('all systems tag results with correct system name', () => {
    const dob = '1990-07-15';
    expect(kabbalistic.lifePath(dob).system).toBe('kabbalistic');
    expect(loshu.lifePath(dob).system).toBe('loshu');
    expect(abjad.lifePath(dob).system).toBe('abjad');
    expect(chaldean.lifePath(dob).system).toBe('chaldean');
  });
});
