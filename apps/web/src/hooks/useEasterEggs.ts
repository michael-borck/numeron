import type { ProfileInput, NumerologyProfile } from '@numeron/core';
import { easterEggs } from '@numeron/core';
import type { EasterEgg } from '@numeron/core';

export interface ActiveEasterEgg extends EasterEgg {
  active: true;
}

/**
 * Detect which easter eggs should fire based on profile input and results.
 */
export function detectEasterEggs(
  input: ProfileInput,
  profile?: NumerologyProfile,
): ActiveEasterEgg[] {
  const active: ActiveEasterEgg[] = [];
  const findEgg = (id: string) => easterEggs.find((e) => e.id === id);

  // Address = "42"
  if (input.address?.trim() === '42') {
    const egg = findEgg('address-42');
    if (egg) active.push({ ...egg, active: true });
  }

  // DOB = 1999-09-09
  if (input.dateOfBirth === '1999-09-09') {
    const egg = findEgg('max-nines');
    if (egg) active.push({ ...egg, active: true });
  }

  // All same letter in name
  const letters = input.fullBirthName.toUpperCase().replace(/[^A-Z]/g, '');
  if (letters.length > 1 && new Set(letters).size === 1) {
    const egg = findEgg('null-profile');
    if (egg) active.push({ ...egg, active: true });
  }

  // Life path = 33
  if (profile?.lifePath.value === 33) {
    const egg = findEgg('master-33');
    if (egg) active.push({ ...egg, active: true });
  }

  // Name = "NUMERON"
  if (input.fullBirthName.toUpperCase().trim() === 'NUMERON') {
    const egg = findEgg('self-analysis');
    if (egg) active.push({ ...egg, active: true });
  }

  // Future date
  const today = new Date().toISOString().split('T')[0];
  if (input.dateOfBirth > today) {
    const egg = findEgg('future-date');
    if (egg) active.push({ ...egg, active: true });
  }

  return active;
}
