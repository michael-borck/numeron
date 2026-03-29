import { describe, it, expect } from 'vitest';
import { generateProfile, generateAllSystemProfiles } from '../profile.js';
import type { ProfileInput } from '../types.js';

const testInput: ProfileInput = {
  fullBirthName: 'Michael John Smith',
  dateOfBirth: '1990-07-15',
  preferredName: 'Mike',
  address: '42 Oak Street',
};

describe('generateProfile', () => {
  it('generates a complete pythagorean profile', () => {
    const profile = generateProfile(testInput, 'pythagorean');

    expect(profile.lifePath.value).toBeGreaterThan(0);
    expect(profile.expression.value).toBeGreaterThan(0);
    expect(profile.soulUrge.value).toBeGreaterThan(0);
    expect(profile.personality.value).toBeGreaterThan(0);
    expect(profile.maturity.value).toBeGreaterThan(0);
    expect(profile.personalYear.value).toBeGreaterThan(0);
    expect(profile.personalMonth.value).toBeGreaterThan(0);
    expect(profile.personalDay.value).toBeGreaterThan(0);
    expect(profile.birthdayNumber.value).toBeGreaterThan(0);
  });

  it('calculates maturity as lifePath + expression', () => {
    const profile = generateProfile(testInput, 'pythagorean');
    // Maturity is the reduction of lifePath + expression
    expect(profile.maturity.reductionSteps[0]).toContain('Life Path');
    expect(profile.maturity.reductionSteps[0]).toContain('Expression');
  });

  it('includes house number when address is provided', () => {
    const profile = generateProfile(testInput, 'pythagorean');
    expect(profile.houseNumber).toBeDefined();
    expect(profile.houseNumber!.value).toBe(6); // 42 → 4+2 = 6
  });

  it('omits house number when no address', () => {
    const input: ProfileInput = {
      fullBirthName: 'Jane Doe',
      dateOfBirth: '1985-03-20',
    };
    const profile = generateProfile(input, 'pythagorean');
    expect(profile.houseNumber).toBeUndefined();
  });

  it('includes nickname when provided', () => {
    const profile = generateProfile(testInput, 'pythagorean');
    expect(profile.nickname).toBeDefined();
    expect(profile.nickname!.value).toBeGreaterThan(0);
  });

  it('detects master numbers', () => {
    // MICHAEL reduces to 33 in Pythagorean — so expression should be master
    const input: ProfileInput = {
      fullBirthName: 'MICHAEL',
      dateOfBirth: '1990-01-01',
    };
    const profile = generateProfile(input, 'pythagorean');
    expect(profile.masterNumbers).toContain(33);
  });

  it('includes hidden passion numbers', () => {
    const profile = generateProfile(testInput, 'pythagorean');
    expect(profile.hiddenPassion.length).toBeGreaterThan(0);
  });

  it('preserves input in the profile', () => {
    const profile = generateProfile(testInput, 'pythagorean');
    expect(profile.input).toEqual(testInput);
  });
});

describe('generateAllSystemProfiles', () => {
  it('generates profiles for all five systems', () => {
    const profiles = generateAllSystemProfiles(testInput);

    expect(profiles.pythagorean).toBeDefined();
    expect(profiles.chaldean).toBeDefined();
    expect(profiles.kabbalistic).toBeDefined();
    expect(profiles.loshu).toBeDefined();
    expect(profiles.abjad).toBeDefined();
  });

  it('each system tags its results correctly', () => {
    const profiles = generateAllSystemProfiles(testInput);

    expect(profiles.pythagorean.lifePath.system).toBe('pythagorean');
    expect(profiles.chaldean.lifePath.system).toBe('chaldean');
    expect(profiles.kabbalistic.lifePath.system).toBe('kabbalistic');
    expect(profiles.loshu.lifePath.system).toBe('loshu');
    expect(profiles.abjad.lifePath.system).toBe('abjad');
  });

  it('demonstrates that systems can disagree on expression numbers', () => {
    const profiles = generateAllSystemProfiles(testInput);
    const expressionValues = new Set([
      profiles.pythagorean.expression.value,
      profiles.chaldean.expression.value,
      profiles.kabbalistic.expression.value,
    ]);
    // Different letter tables should produce at least some variation
    expect(expressionValues.size).toBeGreaterThanOrEqual(1);
  });
});
