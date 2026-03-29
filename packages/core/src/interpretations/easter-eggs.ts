/**
 * Easter egg messages for NUMERON.
 * All discovered organically — no documentation in the UI.
 * All respect prefers-reduced-motion (animations skipped, text still shows).
 */

export interface EasterEgg {
  id: string;
  trigger: string;
  message: string;
  submessage?: string;
  animation?: 'pulse' | 'glow' | 'chaos';
}

export const easterEggs: EasterEgg[] = [
  {
    id: 'address-42',
    trigger: 'address === "42"',
    message: '> THE ANSWER TO LIFE, THE UNIVERSE, AND EVERYTHING',
    submessage: '// but we still need the question',
  },
  {
    id: 'max-nines',
    trigger: 'dob === "1999-09-09"',
    message: '> WARNING: MAXIMUM NINES DETECTED',
    submessage: '// the universe is watching',
    animation: 'pulse',
  },
  {
    id: 'null-profile',
    trigger: 'all same letter in name',
    message: '> NULL PROFILE DETECTED',
    submessage: '// you are the void. the void is you. // numerologically speaking, this is fine',
  },
  {
    id: 'master-33',
    trigger: 'lifePath === 33',
    message: '> MASTER TEACHER',
    submessage:
      '// fewer than 1% of profiles reach 33. this may mean nothing. it probably means nothing.',
    animation: 'glow',
  },
  {
    id: 'konami',
    trigger: 'konami code on landing page',
    message: '> CHAOS MODE ACTIVATED',
    submessage: '// all interpretations are now extremely accurate',
    animation: 'chaos',
  },
  {
    id: 'self-analysis',
    trigger: 'name input === "NUMERON"',
    message: '> ANALYSING SELF...',
    submessage: '// please hold',
  },
  {
    id: 'future-date',
    trigger: 'date of birth is in the future',
    message: '> TEMPORAL ANOMALY DETECTED',
    submessage: '// we can calculate your numbers, but we recommend existing first',
  },
];

/**
 * Chaos mode replacement interpretations (Konami code).
 * Deliberately absurd. Toggle stays until page reload.
 */
export const chaosInterpretations: Record<number, string> = {
  1: 'You have the energy of a mid-size filing cabinet. This is a compliment.',
  2: 'Two socks. That is all we see. The socks are important. Do not ask why.',
  3: 'You are cosmically entitled to one (1) free sandwich. Terms and conditions apply across all dimensions.',
  4: 'Your aura is a very specific shade of beige. This is rarer than you think.',
  5: 'The number 5 has asked us not to comment on your profile. We are respecting its wishes.',
  6: 'You emit a frequency that is deeply reassuring to houseplants. This is your superpower.',
  7: 'Seven ravens are thinking about you right now. Their conclusions are mixed.',
  8: 'Financially, the number 8 suggests you should check behind the sofa cushions.',
  9: 'You have completed the numerological tutorial. The main game has not been developed yet.',
  11: 'Double 1. Twice the filing cabinet energy. The office is in awe.',
  22: 'You have the potential to build something magnificent. A really good fort, perhaps.',
  33: 'The universe has assigned you a personal case manager. They are on hold. They have been on hold for some time.',
};
