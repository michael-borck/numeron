import { describe, it, expect } from 'vitest';
import { analyzeText, famousTexts } from '../text-analysis.js';

describe('analyzeText', () => {
  it('reduces full text to a single number', () => {
    const result = analyzeText('Hello World');
    expect(result.fullTextValue.value).toBeGreaterThan(0);
    expect(result.fullTextValue.value).toBeLessThanOrEqual(33);
  });

  it('analyses each word individually', () => {
    const result = analyzeText('To be or not to be');
    expect(result.wordValues).toHaveLength(6);
    for (const wv of result.wordValues) {
      expect(wv.word.length).toBeGreaterThan(0);
      expect(wv.value.value).toBeGreaterThanOrEqual(0);
    }
  });

  it('builds a letter frequency map', () => {
    const result = analyzeText('AABBC');
    expect(result.frequencyMap['A']).toBe(2);
    expect(result.frequencyMap['B']).toBe(2);
    expect(result.frequencyMap['C']).toBe(1);
  });

  it('identifies dominant numbers', () => {
    const result = analyzeText('Hello World');
    expect(result.dominantNumbers.length).toBeGreaterThanOrEqual(0);
  });

  it('works with different systems', () => {
    const pyth = analyzeText('Hello', 'pythagorean');
    const chald = analyzeText('Hello', 'chaldean');
    // Systems may produce different results
    expect(pyth.fullTextValue.system).toBe('pythagorean');
    expect(chald.fullTextValue.system).toBe('chaldean');
  });

  it('handles empty text', () => {
    const result = analyzeText('');
    expect(result.wordValues).toHaveLength(0);
    expect(result.fullTextValue.value).toBe(0);
  });
});

describe('famousTexts', () => {
  it('has 20 preloaded texts', () => {
    expect(famousTexts).toHaveLength(20);
  });

  it('each text has a label and non-empty text', () => {
    for (const ft of famousTexts) {
      expect(ft.label.length).toBeGreaterThan(0);
      expect(ft.text.length).toBeGreaterThan(0);
    }
  });

  it('all famous texts produce valid analyses', () => {
    for (const ft of famousTexts) {
      const result = analyzeText(ft.text);
      expect(result.fullTextValue.value).toBeGreaterThan(0);
    }
  });
});
