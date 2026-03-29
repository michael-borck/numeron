import { describe, it, expect } from 'vitest';
import { sanitizeName, sanitizeDate, sanitizeText, parseSharePayload } from '../utils/sanitize.js';

describe('sanitizeName', () => {
  it('passes through clean names', () => {
    expect(sanitizeName('Michael')).toBe('Michael');
    expect(sanitizeName("O'Brien")).toBe("O'Brien");
    expect(sanitizeName('Mary-Jane')).toBe('Mary-Jane');
  });

  it('strips HTML tags', () => {
    expect(sanitizeName('<script>alert("xss")</script>John')).toBe('alert("xss")John');
    expect(sanitizeName('John<img src=x onerror=alert(1)>')).toBe('John');
  });

  it('strips control characters', () => {
    expect(sanitizeName('John\x00Doe')).toBe('JohnDoe');
    expect(sanitizeName('Jane\x07Smith')).toBe('JaneSmith');
  });

  it('trims whitespace', () => {
    expect(sanitizeName('  Michael  ')).toBe('Michael');
  });

  it('enforces length limit', () => {
    const long = 'A'.repeat(300);
    expect(sanitizeName(long).length).toBe(200);
  });
});

describe('sanitizeDate', () => {
  it('accepts valid ISO dates', () => {
    expect(sanitizeDate('1990-07-15')).toBe('1990-07-15');
    expect(sanitizeDate('2000-01-01')).toBe('2000-01-01');
  });

  it('rejects invalid formats', () => {
    expect(sanitizeDate('15/07/1990')).toBeNull();
    expect(sanitizeDate('not-a-date')).toBeNull();
    expect(sanitizeDate('')).toBeNull();
  });

  it('rejects impossible dates', () => {
    expect(sanitizeDate('2023-02-30')).toBeNull();
    expect(sanitizeDate('2023-13-01')).toBeNull();
  });

  it('trims whitespace', () => {
    expect(sanitizeDate('  1990-07-15  ')).toBe('1990-07-15');
  });
});

describe('sanitizeText', () => {
  it('strips HTML tags', () => {
    expect(sanitizeText('<b>bold</b> text')).toBe('bold text');
  });

  it('enforces length limit', () => {
    const long = 'A'.repeat(20_000);
    expect(sanitizeText(long).length).toBe(10_000);
  });

  it('preserves normal text', () => {
    expect(sanitizeText('To be or not to be')).toBe('To be or not to be');
  });
});

describe('parseSharePayload', () => {
  it('parses valid encoded profile', () => {
    const input = { fullBirthName: 'John Doe', dateOfBirth: '1990-07-15' };
    const encoded = btoa(JSON.stringify(input));
    const result = parseSharePayload(encoded);
    expect(result).not.toBeNull();
    expect(result!.fullBirthName).toBe('John Doe');
    expect(result!.dateOfBirth).toBe('1990-07-15');
  });

  it('rejects invalid base64', () => {
    expect(parseSharePayload('not-valid-base64!!!')).toBeNull();
  });

  it('rejects non-object payloads', () => {
    expect(parseSharePayload(btoa('"just a string"'))).toBeNull();
    expect(parseSharePayload(btoa('42'))).toBeNull();
  });

  it('rejects payloads missing required fields', () => {
    expect(parseSharePayload(btoa(JSON.stringify({ name: 'test' })))).toBeNull();
  });

  it('sanitizes fields from untrusted source', () => {
    const malicious = {
      fullBirthName: '<script>alert(1)</script>John',
      dateOfBirth: '1990-07-15',
      birthCity: '<img src=x>London',
    };
    const result = parseSharePayload(btoa(JSON.stringify(malicious)));
    expect(result).not.toBeNull();
    expect(result!.fullBirthName).toBe('alert(1)John');
    expect(result!.birthCity).toBe('London');
  });

  it('rejects payloads with invalid dates', () => {
    const input = { fullBirthName: 'John', dateOfBirth: 'not-a-date' };
    expect(parseSharePayload(btoa(JSON.stringify(input)))).toBeNull();
  });
});
