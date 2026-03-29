/**
 * Input sanitization for NUMERON.
 *
 * Security model: all computation is client-side, no database.
 * Main risks are XSS via rendered user input and malformed share URLs.
 * React's JSX escaping handles most XSS, but we validate at the engine
 * boundary to ensure the engine only processes clean data.
 */

import type { ProfileInput } from '../types.js';

const HTML_TAG_RE = /<[^>]*>/g;

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_KEEP_WHITESPACE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_ALL = /[\x00-\x1F\x7F]/g;

/** Strip HTML tags and control characters */
export function sanitizeName(input: string): string {
  return input
    .replace(HTML_TAG_RE, '')
    .replace(CONTROL_CHARS_KEEP_WHITESPACE, '')
    .trim()
    .slice(0, 200);
}

/** Validate ISO 8601 date string, return null if invalid */
export function sanitizeDate(input: string): string | null {
  const trimmed = input.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return null;
  }
  const date = new Date(trimmed + 'T00:00:00');
  if (isNaN(date.getTime())) {
    return null;
  }
  const [year, month, day] = trimmed.split('-').map(Number);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return null;
  }
  return trimmed;
}

/** Extract numeric portion from address for house number calculation */
export function sanitizeAddress(input: string): string {
  return input.replace(HTML_TAG_RE, '').replace(CONTROL_CHARS_ALL, '').trim().slice(0, 300);
}

/** Sanitize arbitrary text for decode mode */
export function sanitizeText(input: string): string {
  return input.replace(HTML_TAG_RE, '').replace(CONTROL_CHARS_KEEP_WHITESPACE, '').slice(0, 10_000);
}

/** Validate and parse a share URL payload (base64 JSON) */
export function parseSharePayload(encoded: string): ProfileInput | null {
  try {
    const json = atob(encoded);
    const parsed = JSON.parse(json);

    if (typeof parsed !== 'object' || parsed === null) return null;
    if (typeof parsed.fullBirthName !== 'string') return null;
    if (typeof parsed.dateOfBirth !== 'string') return null;

    const result: ProfileInput = {
      fullBirthName: sanitizeName(parsed.fullBirthName),
      dateOfBirth: sanitizeDate(parsed.dateOfBirth) ?? '',
    };

    if (typeof parsed.birthCity === 'string') {
      result.birthCity = sanitizeName(parsed.birthCity);
    }
    if (typeof parsed.preferredName === 'string') {
      result.preferredName = sanitizeName(parsed.preferredName);
    }
    if (typeof parsed.address === 'string') {
      result.address = sanitizeAddress(parsed.address);
    }
    if (typeof parsed.targetDate === 'string') {
      result.targetDate = sanitizeDate(parsed.targetDate) ?? undefined;
    }

    return result.dateOfBirth ? result : null;
  } catch {
    return null;
  }
}
