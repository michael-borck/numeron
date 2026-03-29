import type { NumerologyProfile, ProfileInput, NumberResult, NumerologySystem } from './types.js';
import * as pythagorean from './systems/pythagorean.js';
import * as chaldean from './systems/chaldean.js';
import * as kabbalistic from './systems/kabbalistic.js';
import * as loshu from './systems/loshu.js';
import * as abjad from './systems/abjad.js';
import { reduceNumber } from './utils/reduce.js';

type SystemModule = {
  lifePath: (dob: string) => NumberResult;
  expression: (name: string) => NumberResult;
  soulUrge?: (name: string) => NumberResult;
  personality?: (name: string) => NumberResult;
};

const systems: Record<NumerologySystem, SystemModule> = {
  pythagorean,
  chaldean,
  kabbalistic,
  loshu,
  abjad,
};

/**
 * Generate a full numerology profile for a single system.
 */
export function generateProfile(
  input: ProfileInput,
  system: NumerologySystem = 'pythagorean',
): NumerologyProfile {
  const mod = systems[system];
  const today = input.targetDate ?? new Date().toISOString().split('T')[0];

  const lp = mod.lifePath(input.dateOfBirth);
  const expr = mod.expression(input.fullBirthName);

  const su = mod.soulUrge?.(input.fullBirthName) ?? reduceNumber(0, system);
  const pers = mod.personality?.(input.fullBirthName) ?? reduceNumber(0, system);

  // Maturity = lifePath + expression, reduced
  const maturitySum = lp.value + expr.value;
  const maturity = reduceNumber(maturitySum, system);
  maturity.reductionSteps = [
    `Life Path(${lp.value}) + Expression(${expr.value}) = ${maturitySum}`,
    ...maturity.reductionSteps,
  ];

  // Personal timing — use Pythagorean method for all systems (date-based)
  const py = pythagorean.personalYear(input.dateOfBirth, today);
  const pm = pythagorean.personalMonth(input.dateOfBirth, today);
  const pd = pythagorean.personalDay(input.dateOfBirth, today);

  const birthday = pythagorean.birthdayNumber(input.dateOfBirth);

  const house = input.address ? pythagorean.houseNumber(input.address) : undefined;

  const nickname = input.preferredName ? mod.expression(input.preferredName) : undefined;

  const hidden = system === 'pythagorean' ? pythagorean.hiddenPassion(input.fullBirthName) : [];

  // Collect all main results for karma/master detection
  const mainResults = [lp, expr, su, pers, maturity, birthday];
  const karmaDebt = pythagorean.detectKarmaDebt(mainResults);
  const masterNumbers = pythagorean.detectMasterNumbers(mainResults);

  return {
    input,
    lifePath: lp,
    expression: expr,
    soulUrge: su,
    personality: pers,
    maturity,
    personalYear: py,
    personalMonth: pm,
    personalDay: pd,
    birthdayNumber: birthday,
    houseNumber: house ?? undefined,
    nickname,
    hiddenPassion: hidden,
    karmaDebt,
    masterNumbers,
  };
}

/**
 * Generate profiles across all five systems for comparison.
 */
export function generateAllSystemProfiles(
  input: ProfileInput,
): Record<NumerologySystem, NumerologyProfile> {
  return {
    pythagorean: generateProfile(input, 'pythagorean'),
    chaldean: generateProfile(input, 'chaldean'),
    kabbalistic: generateProfile(input, 'kabbalistic'),
    loshu: generateProfile(input, 'loshu'),
    abjad: generateProfile(input, 'abjad'),
  };
}
