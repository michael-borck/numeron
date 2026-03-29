/**
 * Core types for the NUMERON numerology engine.
 */

export type NumerologySystem = 'pythagorean' | 'chaldean' | 'kabbalistic' | 'loshu' | 'abjad';

export interface NumberResult {
  /** Final reduced number */
  value: number;
  /** Was reduction stopped at 11/22/33? */
  masterNumber: boolean;
  /** Step-by-step reduction trace */
  reductionSteps: string[];
  /** Which system produced this result */
  system: NumerologySystem;
}

export interface Interpretation {
  positive: string;
  neutral: string;
  shadow: string;
  keywords: string[];
  element?: string;
  planet?: string;
  tarotCard?: string;
  musicalNote?: string;
  color?: string;
}

export interface ProfileInput {
  /** Full birth name as on birth certificate */
  fullBirthName: string;
  /** Date of birth (ISO 8601 string) */
  dateOfBirth: string;
  /** Optional birth city for display */
  birthCity?: string;
  /** Nickname or preferred name */
  preferredName?: string;
  /** Street address (number needed for house calculation) */
  address?: string;
  /** Target date for personal day/month/year (ISO 8601) */
  targetDate?: string;
}

export interface NumerologyProfile {
  input: ProfileInput;
  lifePath: NumberResult;
  expression: NumberResult;
  soulUrge: NumberResult;
  personality: NumberResult;
  maturity: NumberResult;
  personalYear: NumberResult;
  personalMonth: NumberResult;
  personalDay: NumberResult;
  birthdayNumber: NumberResult;
  houseNumber?: NumberResult;
  nickname?: NumberResult;
  hiddenPassion: NumberResult[];
  karmaDebt: number[];
  masterNumbers: number[];
}

export interface TextAnalysis {
  fullTextValue: NumberResult;
  wordValues: { word: string; value: NumberResult }[];
  frequencyMap: Record<string, number>;
  dominantNumbers: number[];
}

export interface MagicSquareAnalysis {
  grid: number[][];
  order: number;
  magicConstant: number;
  magicConstantReduction: NumberResult;
  centerValue?: number;
  isValid: boolean;
  tradition?: string;
}

export interface SudokuAnalysis {
  grid: number[][];
  isValid: boolean;
  isComplete: boolean;
  rowSums: number[];
  colSums: number[];
  boxSums: number[];
  totalSum: number;
  digitFrequency: Record<number, number>;
  pureNineScore: number;
}
