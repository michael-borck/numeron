/**
 * "Did you know?" facts for each number.
 * Mathematical, cultural, and historical — never predictive.
 * All pre-written, no data collection.
 */

export interface DidYouKnow {
  number: number;
  facts: string[];
}

export const didYouKnowFacts: Record<number, string[]> = {
  1: [
    '1 is the only number that is neither prime nor composite — it is the multiplicative identity.',
    'In binary, every number begins with 1. In numerology, 1 is the beginning of every cycle.',
    'The Pythagoreans called 1 the "monad" — the source of all numbers, not itself a number.',
    'There is exactly one 1×1 magic square. It contains 1.',
    'The fine structure constant (1/137) and the speed of light both reduce to 1.',
  ],
  2: [
    '2 is the only even prime number — and the smallest prime.',
    'Euler\'s number e (2.718...) reduces to 11, the master number built from two 1s.',
    'The word "duality" appears in virtually every philosophical tradition on Earth.',
    'In computing, everything reduces to 2 — binary. In numerology, 2 represents the pair.',
    'The Moon (planet of 2) takes roughly 28 days to orbit Earth. 2+8 = 10 → 1. The cycle returns.',
  ],
  3: [
    '3 is the smallest odd prime, and the first Mersenne prime (2²-1).',
    'Triangles are the strongest geometric shape — 3 points define a plane.',
    'Most world religions feature a trinity or triple deity structure.',
    'Tesla reportedly said "If you only knew the magnificence of 3, 6, and 9..." — 3 is the first of his sacred triad.',
    'The Fibonacci sequence begins 1, 1, 2, 3 — three is where it starts getting interesting.',
  ],
  4: [
    '4 is the only number whose English name has the same number of letters as its value.',
    'There are 4 DNA bases (A, T, G, C), 4 cardinal directions, 4 seasons, and 4 classical elements.',
    'The Four Color Theorem proves any map can be colored with only 4 colors — this took 124 years to prove.',
    'In Chinese culture, 4 is considered unlucky because it sounds like "death" (sì/sǐ). Many buildings skip the 4th floor.',
    'A tetrahedron (4 faces) is the simplest 3D shape — the structural minimum.',
  ],
  5: [
    '5 is the number of Platonic solids — the only perfectly regular 3D shapes that exist.',
    'Humans have 5 senses, 5 fingers per hand, and 5 toes per foot. Our base-10 system exists because we have 2×5 digits.',
    'The pentagram (5-pointed star) contains the golden ratio φ in every proportion.',
    'There are exactly 5 regular polyhedra. This was proven 2,300 years ago and nothing has changed.',
    'Mercury, planet of 5, orbits the Sun in 88 days. 8+8 = 16 → 7. Not 5. Numerology is like that.',
  ],
  6: [
    '6 is the first perfect number — it equals the sum of its divisors (1+2+3). The next is 28. Then 496.',
    'Bees build hexagonal (6-sided) cells because hexagons tile a plane with the least perimeter per area. Nature chose 6.',
    'Carbon has atomic number 6. Carbon is the basis of all known life.',
    'A standard guitar has 6 strings. A standard die has 6 faces. The Star of David has 6 points.',
    'The Lo Shu magic square (the oldest known) has a magic constant of 15, which reduces to 6.',
  ],
  7: [
    '7 is the most commonly cited "favourite number" across cultures — a documented psychological phenomenon.',
    'There are 7 notes in the Western musical scale, 7 colours in a rainbow (Newton chose 7 deliberately), and 7 days in a week.',
    'The ancients knew 7 celestial bodies that moved against the fixed stars: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn.',
    'Human working memory holds roughly 7 items (Miller\'s Law, 1956). 7 may feel "special" because it sits at our cognitive limit.',
    'The number of valid 9×9 sudoku grids is 6,670,903,752,021,072,936,960. It reduces to 9, not 7. 7 is the magic constant of Dürer\'s square.',
  ],
  8: [
    '8 is 2³ — the first perfect cube after 1. It is the only single-digit perfect power of a perfect power.',
    'The I Ching uses 8 trigrams (bagua). The Lo Shu grid has 8 outer cells around the centre.',
    'Turned sideways, 8 becomes ∞ — the symbol for infinity. This is not a coincidence; the lemniscate was chosen for its 8-like form.',
    'Oxygen has atomic number 8. Without it, the numerological profile of every living thing would be very different — and very brief.',
    'In Cantonese, 8 sounds like "prosperity" (bā/fā). The Beijing Olympics opened on 08/08/08 at 8:08 PM.',
  ],
  9: [
    'Any number multiplied by 9, its digits always sum to a multiple of 9. This is unique to 9 in base 10.',
    '108, 432, 360, 666, 144000 — sacred numbers from Hindu, musical, geometric, Christian, and Revelation traditions — all reduce to 9.',
    'The Kaprekar constant 6174 reduces to 9. So does every rotation of the cyclic number 142857.',
    'The Fibonacci mod-9 cycle has period 24, and 9 appears at positions 12 and 24 — the midpoint and end.',
    'Cast out nines: accountants have used digit sums to check arithmetic since at least the 12th century. Numerology borrowed their homework.',
  ],
  11: [
    '11 is the first repunit prime (a prime made of repeating 1s). The next is 1111111111111111111 (19 ones).',
    'The fine structure constant ≈ 1/137, and 1+3+7 = 11. Feynman called 137 "one of the greatest damn mysteries of physics."',
    'Master numbers are a 20th-century Western invention — most historical numerology systems don\'t use them.',
    'In cricket, a team score of 111 is called a "Nelson" and is considered unlucky. 1+1+1 = 3, not 11.',
    '11:11 on a digital clock is the most commonly reported "meaningful" time. This is frequency illusion (the Baader-Meinhof phenomenon), not destiny.',
  ],
  22: [
    '22 divided by 7 is 3.142857... — a famous approximation of π. And 142857 is the cyclic number.',
    'The Hebrew alphabet has 22 letters. The Major Arcana of the Tarot has 22 cards (0-21).',
    'There are 22 pairs of autosomes in the human genome. The 23rd pair determines sex.',
    'Master number 22 reduces to 4 (the builder), but traditions that use master numbers consider it a "higher octave" of 4.',
    'Catch-22 (Joseph Heller, 1961) gave English a word for an impossible paradox. 2+2 = 4. Nothing paradoxical about the arithmetic.',
  ],
  33: [
    'Fewer than 1% of life path calculations produce 33. This is arithmetic, not rarity by design.',
    '33 is the largest positive integer that cannot be expressed as a sum of different triangular numbers.',
    'The 33rd prime number is 137 — the fine structure constant again.',
    'Jesus was traditionally said to have been crucified at age 33. The number appears in Freemasonry (33 degrees) and Dante\'s Divine Comedy (33 cantos per section).',
    'If you write Planck\'s constant to 9 significant figures, the digits sum to 33. We chose 9 figures because 33 is more interesting than 2. This is honest cherry-picking.',
  ],
};
