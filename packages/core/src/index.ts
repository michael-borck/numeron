export type {
  NumerologySystem,
  NumberResult,
  Interpretation,
  ProfileInput,
  NumerologyProfile,
  TextAnalysis,
  MagicSquareAnalysis,
  SudokuAnalysis,
} from './types.js';

// Systems
export * as pythagorean from './systems/pythagorean.js';
export * as chaldean from './systems/chaldean.js';
export * as kabbalistic from './systems/kabbalistic.js';
export * as loshu from './systems/loshu.js';
export * as abjad from './systems/abjad.js';

// Core utilities
export { reduceNumber, isMasterNumber, digitSum } from './utils/reduce.js';
export {
  sanitizeName,
  sanitizeDate,
  sanitizeAddress,
  sanitizeText,
  parseSharePayload,
} from './utils/sanitize.js';

// Profile generation
export { generateProfile, generateAllSystemProfiles } from './profile.js';

// Text analysis (Decode mode)
export { analyzeText, famousTexts } from './text-analysis.js';

// Explorers
export {
  analyzeMagicSquare,
  preloadedSquares,
  LO_SHU,
  DURER,
  AGRIPPA_5,
  JUPITER,
  analyzeSudoku,
  parseSudokuString,
  FIBONACCI_MOD9_CYCLE,
  fibonacciWithReductions,
  verifyFibMod9Properties,
  fibClockPositions,
  PHI_FACTS,
  constants,
  reduceUserConstant,
  KAPREKAR_CONSTANT,
  KAPREKAR_REDUCTION,
  kaprekarProcess,
  POWERS_OF_2_MOD9,
  powersOf2,
  CYCLIC_NUMBER,
  cyclicNumberMultiples,
  TESLA_PATTERN,
} from './explorers/index.js';
export type { ConstantEntry } from './explorers/index.js';

// Content
export {
  interpretations,
  microDisclaimers,
  DISCLAIMER_BANNER,
  PDF_FOOTER_DISCLAIMER,
  PDF_COVER_NOTICE,
  aboutSections,
  easterEggs,
  chaosInterpretations,
  culturalContexts,
} from './interpretations/index.js';
export type { AboutSection, EasterEgg, CulturalContext } from './interpretations/index.js';
