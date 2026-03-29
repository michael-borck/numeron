import type { NumberResult, NumerologySystem, TextAnalysis } from './types.js';
import * as pythagorean from './systems/pythagorean.js';
import * as chaldean from './systems/chaldean.js';
import * as kabbalistic from './systems/kabbalistic.js';
import * as abjad from './systems/abjad.js';

type ReduceNameFn = (name: string) => NumberResult;

const systemReducers: Record<NumerologySystem, ReduceNameFn> = {
  pythagorean: pythagorean.reduceName,
  chaldean: chaldean.reduceName,
  kabbalistic: kabbalistic.reduceName,
  loshu: pythagorean.reduceName, // Lo Shu uses same letter values
  abjad: abjad.reduceName,
};

/**
 * Analyse arbitrary text through a numerological lens.
 * Reduces the full text, each word, and builds frequency maps.
 */
export function analyzeText(text: string, system: NumerologySystem = 'pythagorean'): TextAnalysis {
  const reducer = systemReducers[system];
  const words = text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  const fullTextValue = reducer(text);

  const wordValues = words.map((word) => ({
    word,
    value: reducer(word),
  }));

  // Build letter frequency map
  const frequencyMap: Record<string, number> = {};
  for (const char of text.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
  }

  // Find dominant numbers (most common reduced word values)
  const numberFreq: Record<number, number> = {};
  for (const wv of wordValues) {
    if (wv.value.value > 0) {
      numberFreq[wv.value.value] = (numberFreq[wv.value.value] || 0) + 1;
    }
  }
  const maxFreq = Math.max(0, ...Object.values(numberFreq));
  const dominantNumbers =
    maxFreq > 0
      ? Object.entries(numberFreq)
          .filter(([_, count]) => count === maxFreq)
          .map(([num]) => Number(num))
          .sort((a, b) => a - b)
      : [];

  return {
    fullTextValue,
    wordValues,
    frequencyMap,
    dominantNumbers,
  };
}

/**
 * Preloaded famous texts for comparison in Decode mode.
 */
export const famousTexts = [
  { label: 'Opening of Moby Dick', text: 'Call me Ishmael' },
  { label: 'Hamlet (Shakespeare)', text: 'To be or not to be that is the question' },
  {
    label: 'Gettysburg Address (opening)',
    text: 'Four score and seven years ago our fathers brought forth on this continent a new nation',
  },
  {
    label: 'Genesis 1:1',
    text: 'In the beginning God created the heavens and the earth',
  },
  { label: 'Beatles — "Let It Be"', text: 'Let It Be' },
  { label: 'Beatles — "Come Together"', text: 'Come Together' },
  { label: 'Beatles — "Yesterday"', text: 'Yesterday' },
  { label: 'Beatles — "Revolution"', text: 'Revolution' },
  { label: 'Beatles — "Help"', text: 'Help' },
  { label: 'Beatles — "Blackbird"', text: 'Blackbird' },
  { label: 'Beatles — "Here Comes the Sun"', text: 'Here Comes the Sun' },
  { label: 'Beatles — "Norwegian Wood"', text: 'Norwegian Wood' },
  { label: 'Beatles — "Across the Universe"', text: 'Across the Universe' },
  {
    label: 'Martin Luther King Jr.',
    text: 'I have a dream that one day this nation will rise up',
  },
  { label: 'Einstein', text: 'Imagination is more important than knowledge' },
  { label: 'Descartes', text: 'I think therefore I am' },
  {
    label: 'Neil Armstrong',
    text: 'That is one small step for man one giant leap for mankind',
  },
  {
    label: 'Douglas Adams',
    text: 'The answer to the ultimate question of life the universe and everything',
  },
  { label: 'Tolkien', text: 'Not all those who wander are lost' },
  { label: 'Wilde', text: 'Be yourself everyone else is already taken' },
] as const;
