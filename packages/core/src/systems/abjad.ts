import type { NumberResult } from '../types.js';
import { reduceNumber } from '../utils/reduce.js';

const SYSTEM = 'abjad' as const;

/**
 * Abjad (Arabic) numeral system.
 * Latin letter mappings based on the standard Abjad order,
 * approximated for Latin script input.
 * Shares roots with Hebrew Gematria via the Phoenician system.
 */
const LETTER_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 20,
  L: 30,
  M: 40,
  N: 50,
  O: 60,
  P: 70,
  Q: 80,
  R: 90,
  S: 100,
  T: 200,
  U: 300,
  V: 400,
  W: 500,
  X: 600,
  Y: 700,
  Z: 800,
};

/**
 * Arabic letter values for native Arabic script input.
 * Standard Abjad order: Alif=1, Ba=2, Jim=3, Dal=4...
 */
const ARABIC_VALUES: Record<string, number> = {
  '\u0627': 1, // ا Alif
  '\u0628': 2, // ب Ba
  '\u062C': 3, // ج Jim
  '\u062F': 4, // د Dal
  '\u0647': 5, // ه Ha
  '\u0648': 6, // و Waw
  '\u0632': 7, // ز Zayn
  '\u062D': 8, // ح Haa
  '\u0637': 9, // ط Taa
  '\u064A': 10, // ي Ya
  '\u0643': 20, // ك Kaf
  '\u0644': 30, // ل Lam
  '\u0645': 40, // �� Mim
  '\u0646': 50, // ن Nun
  '\u0633': 60, // س Sin
  '\u0639': 70, // ع Ayn
  '\u0641': 80, // ف Fa
  '\u0635': 90, // ص Sad
  '\u0642': 100, // ق Qaf
  '\u0631': 200, // ر Ra
  '\u0634': 300, // ش Shin
  '\u062A': 400, // ت Ta
  '\u062B': 500, // ث Tha
  '\u062E': 600, // خ Kha
  '\u0630': 700, // ذ Dhal
  '\u0636': 800, // ض Dad
  '\u0638': 900, // ظ Zaa
  '\u063A': 1000, // غ Ghayn
};

export function letterValue(char: string): number {
  return ARABIC_VALUES[char] ?? LETTER_VALUES[char.toUpperCase()] ?? 0;
}

export function reduceName(name: string): NumberResult {
  const letters: { char: string; value: number }[] = [];

  for (const char of name) {
    const val = letterValue(char);
    if (val > 0) {
      letters.push({ char, value: val });
    } else if (/\d/.test(char)) {
      letters.push({ char, value: Number(char) });
    }
  }

  if (letters.length === 0) {
    return {
      value: 0,
      masterNumber: false,
      reductionSteps: ['(no valid characters)'],
      system: SYSTEM,
    };
  }

  const sum = letters.reduce((acc, l) => acc + l.value, 0);
  const mapping = letters.map((l) => `${l.char}=${l.value}`).join(', ');
  const sumStr = letters.map((l) => String(l.value)).join(' + ') + ` = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [mapping, sumStr, ...result.reductionSteps.slice(1)];

  return result;
}

export function expression(fullBirthName: string): NumberResult {
  return reduceName(fullBirthName);
}

export function lifePath(dateOfBirth: string): NumberResult {
  const [yearStr, monthStr, dayStr] = dateOfBirth.split('-');
  const month = Number(monthStr);
  const day = Number(dayStr);
  const yearDigits = [...yearStr].map(Number).reduce((a, b) => a + b, 0);

  const monthReduced = reduceNumber(month, SYSTEM, false);
  const dayReduced = reduceNumber(day, SYSTEM, false);
  const yearReduced = reduceNumber(yearDigits, SYSTEM, false);

  const sum = monthReduced.value + dayReduced.value + yearReduced.value;
  const stepDetail = `Month(${month}) + Day(${day}) + Year(${yearStr}) → ${monthReduced.value} + ${dayReduced.value} + ${yearReduced.value} = ${sum}`;

  const result = reduceNumber(sum, SYSTEM);
  result.reductionSteps = [stepDetail, ...result.reductionSteps];

  return result;
}
