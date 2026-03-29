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

export * as pythagorean from './systems/pythagorean.js';
export * as chaldean from './systems/chaldean.js';

export { reduceNumber, isMasterNumber, digitSum } from './utils/reduce.js';
export {
  sanitizeName,
  sanitizeDate,
  sanitizeAddress,
  sanitizeText,
  parseSharePayload,
} from './utils/sanitize.js';

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
