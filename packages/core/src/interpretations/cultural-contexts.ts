/**
 * Ancient cultural context sidebars for each numerology system.
 * These appear in the UI alongside calculation results.
 */

export interface CulturalContext {
  system: string;
  title: string;
  period: string;
  body: string;
}

export const culturalContexts: CulturalContext[] = [
  {
    system: 'chaldean',
    title: 'Babylonian / Chaldean',
    period: '~2000 BCE',
    body: `The oldest documented numerological tradition. Babylonian astronomers assigned planetary rulers to the numbers 1–7 (the known planets), a mapping that persists in Western astrology and the days of the week. The Chaldean letter table weights letters by vibrational sound, not sequential position, making it the most "musical" system.

The Chaldean system uses only the numbers 1–8 in its letter assignments — the number 9 is considered sacred and is never assigned to a letter. This is a fundamental difference from the Pythagorean system and one reason the two systems frequently disagree.`,
  },
  {
    system: 'kabbalistic',
    title: 'Hebrew Gematria',
    period: '~1000+ years',
    body: `Central to Kabbalistic scholarship for over a thousand years. Not fringe — it appears in Talmudic commentary, medieval philosophy, and Zoharic mysticism.

The number 18 (chai, "life") is still used in Jewish gift-giving. The word for "love" (ahava) and "one" (echad) both equal 13; their sum is 26, the value of the divine name YHWH. These are documented textual facts, not inventions.

Gematria operates on the principle that words sharing the same numerical value share a hidden connection. Whether that connection is real or a product of the human talent for pattern-finding is left to the reader.`,
  },
  {
    system: 'loshu',
    title: 'Chinese Lo Shu',
    period: '~2000 BCE',
    body: `A 3×3 magic square said to have appeared on the back of a tortoise emerging from the Lo River, circa 2000 BCE. Every row, column, and diagonal sums to 15 (which reduces to 6).

The square maps directly onto the feng shui bagua (eight trigrams plus centre), forming the basis of Classical feng shui home analysis. NUMERON overlays your core numbers onto the Lo Shu grid as a visual feature.

The Lo Shu is also the smallest non-trivial magic square — there is essentially only one 3×3 magic square (all others are rotations or reflections). This mathematical uniqueness may be part of why it was considered sacred.`,
  },
  {
    system: 'vedic',
    title: 'Hindu / Vedic',
    period: '~1500 BCE onwards',
    body: `The number 108 appears across Hindu, Buddhist, and Jain traditions: 108 beads on a mala, 108 Upanishads, 108 names of Lakshmi, 108 dance forms of Shiva. 1+0+8 = 9.

The Vedic system (similar to Pythagorean) uses a person's birth date and name; the "lucky number" calculation is culturally embedded across South and Southeast Asia. The number 7 (saptarishi, seven sages) and 12 (rashis, zodiac signs) carry special weight.

Interestingly, the Sun–Earth distance is approximately 108 times the Sun's diameter, and the Sun's diameter is approximately 108 times the Earth's diameter. Whether the ancients knew this, or whether 108 was sacred for other reasons, remains an open question.`,
  },
  {
    system: 'mayan',
    title: 'Mayan',
    period: '~250–900 CE (Classic period)',
    body: `The Tzolkin calendar uses 13 × 20 = 260 days as its sacred cycle. The numbers 13 (karma debt in Western numerology) and 20 have deep cosmological significance. The Long Count calendar's base unit is 20 (vigesimal system), not 10.

This is a reminder that our decimal digit-sum reduction is culturally contingent, not universal. If numerology had developed from a base-20 system, every number would reduce differently. The fact that we reduce in base 10 is an accident of anatomy (ten fingers), not a cosmic truth.`,
  },
  {
    system: 'norse',
    title: 'Norse (Runes)',
    period: '~150–800 CE',
    body: `The Elder Futhark has 24 runes in 3 aettir (groups of 8). Each rune carries a number 1–24. Less a numerological system than a divinatory one, but the number-rune mappings are well documented and visually compelling.

NUMERON maps your life path number to its corresponding Elder Futhark rune — a cross-cultural curiosity, not a claim about Viking destiny readings applying to modern birthdays.`,
  },
  {
    system: 'egyptian',
    title: 'Egyptian',
    period: '~2500 BCE',
    body: `The Ennead (nine principal gods) and the structure of the Pyramid Texts suggest deliberate numerical symbolism. More significantly, the Great Pyramid encodes π (perimeter/height × 2 = 2π) and φ (apothem/half-base = φ) to within measurement tolerance.

Whether this was intentional remains debated, but it is a real geometric property of the structure. NUMERON presents this as a fascinating open question, not a claim.`,
  },
  {
    system: 'abjad',
    title: 'Abjad (Arabic)',
    period: 'Islamic Golden Age onwards',
    body: `The Abjad numeral system assigns numerical values to the Arabic alphabet, sharing roots with Hebrew Gematria (both derive from the older Phoenician system). It has been used in Islamic scholarship, poetry, and chronograms — texts where the letter values encode a date.

The system is still in active use: the phrase "Bismillah al-Rahman al-Rahim" has a specific numerical value that appears throughout Islamic numerological tradition.`,
  },
];
