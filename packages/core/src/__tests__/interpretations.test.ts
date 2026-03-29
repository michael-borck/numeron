import { describe, it, expect } from 'vitest';
import { interpretations } from '../interpretations/numbers.js';
import {
  microDisclaimers,
  DISCLAIMER_BANNER,
  PDF_FOOTER_DISCLAIMER,
  PDF_COVER_NOTICE,
} from '../interpretations/disclaimers.js';
import { aboutSections } from '../interpretations/about.js';
import { easterEggs, chaosInterpretations } from '../interpretations/easter-eggs.js';
import { culturalContexts } from '../interpretations/cultural-contexts.js';

describe('interpretations completeness', () => {
  const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

  it('has interpretations for all required numbers', () => {
    for (const num of requiredNumbers) {
      expect(interpretations[num]).toBeDefined();
    }
  });

  it('each interpretation has all three lenses', () => {
    for (const num of requiredNumbers) {
      const interp = interpretations[num];
      expect(interp.positive.length).toBeGreaterThan(50);
      expect(interp.neutral.length).toBeGreaterThan(50);
      expect(interp.shadow.length).toBeGreaterThan(50);
    }
  });

  it('each interpretation has 5-8 keywords', () => {
    for (const num of requiredNumbers) {
      expect(interpretations[num].keywords.length).toBeGreaterThanOrEqual(5);
      expect(interpretations[num].keywords.length).toBeLessThanOrEqual(8);
    }
  });

  it('numbers 1-9 have planet, tarot, element, note, and color', () => {
    for (let i = 1; i <= 9; i++) {
      const interp = interpretations[i];
      expect(interp.planet).toBeTruthy();
      expect(interp.tarotCard).toBeTruthy();
      expect(interp.element).toBeTruthy();
      expect(interp.musicalNote).toBeTruthy();
      expect(interp.color).toBeTruthy();
    }
  });

  it('master numbers have tarot and color', () => {
    for (const num of [11, 22, 33]) {
      expect(interpretations[num].tarotCard).toBeTruthy();
      expect(interpretations[num].color).toBeTruthy();
    }
  });

  it('no interpretation uses definitive predictive language', () => {
    for (const num of requiredNumbers) {
      const interp = interpretations[num];
      const allText = `${interp.positive} ${interp.neutral} ${interp.shadow}`;
      expect(allText).not.toMatch(/your destiny is/i);
      expect(allText).not.toMatch(/you will definitely/i);
      expect(allText).not.toMatch(/this means you must/i);
    }
  });
});

describe('disclaimers completeness', () => {
  it('banner has all required fields', () => {
    expect(DISCLAIMER_BANNER.title).toBeTruthy();
    expect(DISCLAIMER_BANNER.lines.length).toBeGreaterThan(0);
    expect(DISCLAIMER_BANNER.buttonText).toBe('ACKNOWLEDGED');
  });

  it('PDF footer disclaimer exists and mentions key points', () => {
    expect(PDF_FOOTER_DISCLAIMER).toContain('entertainment');
    expect(PDF_FOOTER_DISCLAIMER).toContain('no scientific basis');
    expect(PDF_FOOTER_DISCLAIMER).toContain('life advice');
  });

  it('PDF cover notice exists', () => {
    expect(PDF_COVER_NOTICE.heading).toBeTruthy();
    expect(PDF_COVER_NOTICE.body).toBeTruthy();
  });

  it('has all required micro-disclaimers', () => {
    const requiredKeys = [
      'lifePath',
      'systemComparison',
      'personalTiming',
      'compatibility',
      'fineStructure',
      'planckFull',
      'sudokuCertificate',
      'masterNumber',
      'karmaDebt',
    ];
    for (const key of requiredKeys) {
      expect(microDisclaimers[key]).toBeTruthy();
    }
  });
});

describe('about page completeness', () => {
  it('has all required sections', () => {
    const requiredHeadings = [
      'WHAT IS NUMEROLOGY',
      'IS IT REAL',
      'BARNUM EFFECT',
      'WHY BOTHER',
      'CONSTANTS',
      'NOT LIFE ADVICE',
    ];
    for (const heading of requiredHeadings) {
      const found = aboutSections.some((s) => s.heading.includes(heading));
      expect(found, `Missing section: ${heading}`).toBe(true);
    }
  });

  it('each section has substantial content', () => {
    for (const section of aboutSections) {
      expect(section.body.length).toBeGreaterThan(100);
    }
  });
});

describe('easter eggs', () => {
  it('has all required easter eggs', () => {
    const requiredIds = [
      'address-42',
      'max-nines',
      'null-profile',
      'master-33',
      'konami',
      'self-analysis',
      'future-date',
    ];
    for (const id of requiredIds) {
      const found = easterEggs.some((e) => e.id === id);
      expect(found, `Missing easter egg: ${id}`).toBe(true);
    }
  });

  it('chaos mode has interpretations for all numbers', () => {
    for (const num of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]) {
      expect(chaosInterpretations[num]).toBeTruthy();
    }
  });
});

describe('cultural contexts', () => {
  it('has contexts for major systems', () => {
    const requiredSystems = ['chaldean', 'kabbalistic', 'loshu', 'vedic', 'abjad'];
    for (const system of requiredSystems) {
      const found = culturalContexts.some((c) => c.system === system);
      expect(found, `Missing cultural context: ${system}`).toBe(true);
    }
  });

  it('each context has substantial content', () => {
    for (const ctx of culturalContexts) {
      expect(ctx.body.length).toBeGreaterThan(100);
    }
  });
});
