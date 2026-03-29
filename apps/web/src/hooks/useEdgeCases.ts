import type { ProfileInput } from '@numeron/core';

export interface EdgeCaseWarning {
  field: string;
  message: string;
}

/**
 * Detect edge cases in profile input per spec section 15.
 */
export function detectEdgeCases(input: ProfileInput): EdgeCaseWarning[] {
  const warnings: EdgeCaseWarning[] = [];

  // --- Name checks ---
  const name = input.fullBirthName;

  // Digits in name
  if (/\d/.test(name)) {
    warnings.push({
      field: 'name',
      message:
        'Digits in names are treated as their numeric value, which varies by tradition.',
    });
  }

  // Non-Latin characters
  // eslint-disable-next-line no-control-regex
  if (/[^\x00-\x7F]/.test(name)) {
    const hasArabic = /[\u0600-\u06FF]/.test(name);
    if (hasArabic) {
      warnings.push({
        field: 'name',
        message:
          'Arabic characters detected. The Abjad system handles these natively; other systems will skip unsupported characters.',
      });
    } else {
      warnings.push({
        field: 'name',
        message:
          'Non-Latin characters detected. Pythagorean and Chaldean systems use Latin letter tables; unsupported characters are skipped.',
      });
    }
  }

  // Name longer than 100 characters
  if (name.length > 100) {
    warnings.push({
      field: 'name',
      message: '> UNUSUALLY LONG NAME DETECTED // calculating anyway',
    });
  }

  // Symbols only (no letters or digits)
  if (name.trim().length > 0 && !/[a-zA-Z0-9]/.test(name)) {
    warnings.push({
      field: 'name',
      message: 'No valid letters detected. Nothing to calculate.',
    });
  }

  // --- Date checks ---
  const today = new Date().toISOString().split('T')[0];
  if (input.dateOfBirth > today) {
    warnings.push({
      field: 'date',
      message: '> TEMPORAL ANOMALY DETECTED // we can calculate your numbers, but we recommend existing first',
    });
  }

  // --- Address checks ---
  if (input.address) {
    const addr = input.address.trim();

    // No street number
    if (!/\d/.test(addr) && addr.length > 0) {
      warnings.push({
        field: 'address',
        message:
          'No street number detected. House number calculation requires a numeric address.',
      });
    }

    // Unit/apartment format (e.g. "4/12")
    if (/^\d+\/\d+/.test(addr)) {
      warnings.push({
        field: 'address',
        message:
          'Unit/apartment format detected. NUMERON uses the first number found. Traditions differ on whether to use unit number, street number, or combined.',
      });
    }

    // Address is 0
    if (/^0+$/.test(addr.replace(/\D/g, '')) && /\d/.test(addr)) {
      warnings.push({
        field: 'address',
        message:
          '0 is not a standard numerological number. Some traditions skip reduction at 0; others treat it as 9.',
      });
    }
  }

  return warnings;
}
