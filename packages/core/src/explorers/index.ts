export {
  analyzeMagicSquare,
  preloadedSquares,
  LO_SHU,
  DURER,
  AGRIPPA_5,
  JUPITER,
} from './magic-squares.js';

export { analyzeSudoku, parseSudokuString } from './sudoku.js';

export {
  FIBONACCI_MOD9_CYCLE,
  fibonacciWithReductions,
  verifyFibMod9Properties,
  fibClockPositions,
  PHI_FACTS,
} from './fibonacci.js';

export { constants, reduceUserConstant } from './constants.js';
export type { ConstantEntry } from './constants.js';

export {
  KAPREKAR_CONSTANT,
  KAPREKAR_REDUCTION,
  kaprekarProcess,
  POWERS_OF_2_MOD9,
  powersOf2,
  CYCLIC_NUMBER,
  cyclicNumberMultiples,
  TESLA_PATTERN,
} from './kaprekar.js';

export {
  companyProfiles,
  analyzeCompany,
  companiesBySector,
} from './companies.js';
export type { CompanyProfile } from './companies.js';

export {
  countryProfiles,
  analyzeCountry,
  countriesByContinent,
} from './countries.js';
export type { CountryProfile } from './countries.js';
