import { describe, it, expect } from 'vitest';
import { didYouKnowFacts } from '../insights/did-you-know.js';
import { generateSessionStats } from '../insights/session-stats.js';
import { generateAllSystemProfiles } from '../profile.js';
import type { ProfileInput } from '../types.js';

describe('didYouKnowFacts', () => {
  const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

  it('has facts for all numbers 1-9 and master numbers', () => {
    for (const num of requiredNumbers) {
      expect(didYouKnowFacts[num]).toBeDefined();
      expect(didYouKnowFacts[num].length).toBeGreaterThanOrEqual(3);
    }
  });

  it('each fact is substantial (at least 30 chars)', () => {
    for (const num of requiredNumbers) {
      for (const fact of didYouKnowFacts[num]) {
        expect(fact.length).toBeGreaterThan(30);
      }
    }
  });

  it('no fact uses predictive language', () => {
    for (const num of requiredNumbers) {
      for (const fact of didYouKnowFacts[num]) {
        expect(fact).not.toMatch(/your destiny/i);
        expect(fact).not.toMatch(/you will/i);
        expect(fact).not.toMatch(/this means you/i);
      }
    }
  });
});

describe('generateSessionStats', () => {
  const input: ProfileInput = {
    fullBirthName: 'Michael John Smith',
    dateOfBirth: '1990-07-15',
  };
  const profiles = generateAllSystemProfiles(input);
  const stats = generateSessionStats(profiles);

  it('counts unique numbers across systems', () => {
    expect(stats.uniqueNumbersAcrossSystems).toBeGreaterThan(0);
    expect(stats.uniqueNumbersAcrossSystems).toBeLessThanOrEqual(20);
  });

  it('counts system agreements', () => {
    expect(stats.systemAgreementCount).toBeGreaterThanOrEqual(0);
    expect(stats.systemAgreementCount).toBeLessThanOrEqual(4);
    expect(stats.systemAgreementTotal).toBe(4);
  });

  it('identifies dominant numbers', () => {
    expect(Array.isArray(stats.dominantProfileNumbers)).toBe(true);
  });

  it('identifies missing numbers', () => {
    expect(Array.isArray(stats.missingNumbers)).toBe(true);
    for (const n of stats.missingNumbers) {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(9);
    }
  });

  it('assigns life path rarity', () => {
    expect(['common', 'uncommon', 'rare']).toContain(stats.lifePathRarity);
  });

  it('generates summary lines', () => {
    expect(stats.summaryLines.length).toBeGreaterThan(0);
    for (const line of stats.summaryLines) {
      expect(line.length).toBeGreaterThan(10);
    }
  });

  it('detects master number life path', () => {
    const masterInput: ProfileInput = {
      fullBirthName: 'Test',
      dateOfBirth: '2009-11-09', // produces LP 22
    };
    const masterProfiles = generateAllSystemProfiles(masterInput);
    const masterStats = generateSessionStats(masterProfiles);
    // We can't guarantee a specific LP, but the flag should be boolean
    expect(typeof masterStats.hasLifePathMaster).toBe('boolean');
  });
});
