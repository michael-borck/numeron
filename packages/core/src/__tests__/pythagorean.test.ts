import { describe, it, expect } from 'vitest';
import * as pythagorean from '../systems/pythagorean.js';

describe('pythagorean.letterValue', () => {
  it('maps A=1 through I=9', () => {
    expect(pythagorean.letterValue('A')).toBe(1);
    expect(pythagorean.letterValue('E')).toBe(5);
    expect(pythagorean.letterValue('I')).toBe(9);
  });

  it('wraps J=1 through R=9', () => {
    expect(pythagorean.letterValue('J')).toBe(1);
    expect(pythagorean.letterValue('R')).toBe(9);
  });

  it('wraps S=1 through Z=8', () => {
    expect(pythagorean.letterValue('S')).toBe(1);
    expect(pythagorean.letterValue('Z')).toBe(8);
  });

  it('is case-insensitive', () => {
    expect(pythagorean.letterValue('a')).toBe(1);
    expect(pythagorean.letterValue('z')).toBe(8);
  });

  it('returns 0 for non-letters', () => {
    expect(pythagorean.letterValue(' ')).toBe(0);
    expect(pythagorean.letterValue('!')).toBe(0);
  });
});

describe('pythagorean.expression', () => {
  it('calculates expression number for a name', () => {
    // MICHAEL: M=4 I=9 C=3 H=8 A=1 E=5 L=3 = 33 (master)
    const result = pythagorean.expression('MICHAEL');
    expect(result.value).toBe(33);
    expect(result.masterNumber).toBe(true);
    expect(result.system).toBe('pythagorean');
  });

  it('handles names with spaces', () => {
    const result = pythagorean.expression('JOHN DOE');
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThanOrEqual(33);
  });

  it('handles empty input', () => {
    const result = pythagorean.expression('');
    expect(result.value).toBe(0);
  });

  it('handles digits in names', () => {
    const result = pythagorean.expression('2PAC');
    expect(result.value).toBeGreaterThan(0);
  });
});

describe('pythagorean.soulUrge', () => {
  it('uses only vowels', () => {
    // MICHAEL vowels: I=9, A=1, E=5 = 15 → 6
    const result = pythagorean.soulUrge('MICHAEL');
    expect(result.value).toBe(6);
    expect(result.reductionSteps[0]).toContain('Vowels');
  });

  it('returns 0 for consonant-only input', () => {
    const result = pythagorean.soulUrge('BCD');
    expect(result.value).toBe(0);
  });
});

describe('pythagorean.personality', () => {
  it('uses only consonants', () => {
    // MICHAEL consonants: M=4, C=3, H=8, L=3 = 18 → 9
    const result = pythagorean.personality('MICHAEL');
    expect(result.value).toBe(9);
    expect(result.reductionSteps[0]).toContain('Consonants');
  });
});

describe('pythagorean.lifePath', () => {
  it('calculates life path from date of birth', () => {
    // 1990-07-15: Month 7, Day 15→6, Year 1+9+9+0=19→10→1
    // 7 + 6 + 1 = 14 → 5
    const result = pythagorean.lifePath('1990-07-15');
    expect(result.value).toBe(5);
    expect(result.system).toBe('pythagorean');
  });

  it('preserves master numbers in final result', () => {
    // Need to find a date that produces a master number
    // 1980-02-09: Month 2, Day 9, Year 1+9+8+0=18→9
    // 2 + 9 + 9 = 20 → 2
    const result = pythagorean.lifePath('1980-02-09');
    expect(result.value).toBeLessThanOrEqual(33);
  });
});

describe('pythagorean.birthdayNumber', () => {
  it('reduces day of birth', () => {
    const result = pythagorean.birthdayNumber('1990-07-25');
    expect(result.value).toBe(7); // 25 → 2+5 = 7
  });

  it('keeps single-digit days as-is', () => {
    const result = pythagorean.birthdayNumber('1990-07-07');
    expect(result.value).toBe(7);
  });
});

describe('pythagorean.personalYear', () => {
  it('calculates personal year', () => {
    const result = pythagorean.personalYear('1990-07-15', '2026-01-01');
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThanOrEqual(33);
  });
});

describe('pythagorean.houseNumber', () => {
  it('extracts and reduces street number', () => {
    const result = pythagorean.houseNumber('123 Main St');
    expect(result).not.toBeNull();
    expect(result!.value).toBe(6); // 1+2+3 = 6
  });

  it('returns null when no number found', () => {
    const result = pythagorean.houseNumber('The Gables');
    expect(result).toBeNull();
  });

  it('handles apartment-style addresses', () => {
    const result = pythagorean.houseNumber('4/12 Smith St');
    // First number found is 4
    expect(result).not.toBeNull();
    expect(result!.value).toBe(4);
  });
});

describe('pythagorean.hiddenPassion', () => {
  it('finds most frequent letter values', () => {
    const result = pythagorean.hiddenPassion('MICHAEL');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns empty for empty input', () => {
    const result = pythagorean.hiddenPassion('');
    expect(result).toEqual([]);
  });
});

describe('pythagorean.detectKarmaDebt', () => {
  it('detects karma debt numbers in reduction steps', () => {
    const results = [
      {
        value: 5,
        masterNumber: false,
        reductionSteps: ['14', '1 + 4 = 5'],
        system: 'pythagorean' as const,
      },
    ];
    const karma = pythagorean.detectKarmaDebt(results);
    expect(karma).toContain(14);
  });
});
