import type { Interpretation } from '../types.js';

/**
 * Three-lens interpretations for core numbers 1–9 and master numbers 11, 22, 33.
 *
 * Writing principles (from spec):
 * - Specific enough to feel meaningful
 * - General enough to be plausible (honest about the Barnum effect)
 * - Balanced across all three lenses — no "everything is secretly great"
 * - Present tense, second person
 * - LIGHT: strengths as gifts, not achievements
 * - TRUTH: archetypal/mythological framing
 * - SHADOW: honest about difficulty, not catastrophising
 * - Never stronger than "in this tradition" or "numerologists associate..."
 */

export const interpretations: Record<number, Interpretation> = {
  1: {
    positive:
      'Pioneer and originator. You carry the energy of beginnings — the courage to start what others only imagine. Independent will drives you forward, and your natural leadership comes through example rather than authority. In this tradition, the 1 is the spark before the fire.',
    neutral:
      'The number of individuality and self-definition. The One is the first differentiation from the whole — the point that declares itself separate so that counting can begin. Archetypally, it is the Magician at the crossroads, the single flame in darkness. It represents pure potential directed by will.',
    shadow:
      'Isolation worn as independence. Stubbornness mistaken for strength. The shadow of 1 is the force of will that becomes ego — the leader who cannot follow, the originator who cannot collaborate. Difficulty sharing credit, difficulty asking for help, difficulty admitting that the spark needs fuel from others to become a fire.',
    keywords: ['independence', 'leadership', 'originality', 'willpower', 'initiative', 'solitude'],
    planet: 'Sun',
    tarotCard: 'The Magician',
    element: 'Fire',
    musicalNote: 'C (256Hz)',
    color: 'Red',
  },

  2: {
    positive:
      'Diplomat and partner. You carry the energy of connection — the ability to sense what others need and to build bridges between opposing forces. Intuition is your compass. In this tradition, the 2 is the mirror that reveals what the 1 cannot see alone.',
    neutral:
      'The number of duality and relationship. The Two is the first awareness of an Other — the moment consciousness divides into observer and observed. Archetypally, it is the High Priestess seated between pillars, holding knowledge that requires stillness to receive. It represents receptivity, patience, and the wisdom of waiting.',
    shadow:
      'Dependence dressed as devotion. Indecision dressed as diplomacy. The shadow of 2 is the peacekeeper who loses themselves in others — the partner who cannot stand alone, the intuitive who doubts every instinct. Over-sensitivity becomes paralysis; the desire to please becomes the inability to choose.',
    keywords: ['partnership', 'diplomacy', 'intuition', 'sensitivity', 'patience', 'balance'],
    planet: 'Moon',
    tarotCard: 'The High Priestess',
    element: 'Water',
    musicalNote: 'D (288Hz)',
    color: 'Orange',
  },

  3: {
    positive:
      'Creator and communicator. You carry the energy of expression — the impulse to take inner experience and give it form through words, art, or performance. Joy comes naturally to you, and your enthusiasm is genuinely infectious. In this tradition, the 3 is the child of 1 and 2 — the creative product of will and intuition.',
    neutral:
      'The number of synthesis and expression. The Three is the first number that creates something new — thesis, antithesis, synthesis. Archetypally, it is the Empress in her garden, where two forces combine to produce abundance. It represents creativity, communication, and the outward expression of inner life.',
    shadow:
      'Scattered energy mistaken for versatility. Superficiality mistaken for charm. The shadow of 3 is the creative force that starts everything and finishes nothing — the performer who needs an audience to feel real, the communicator who talks to avoid feeling. Beneath the bright surface, a fear of depth.',
    keywords: ['creativity', 'expression', 'joy', 'communication', 'optimism', 'scattered'],
    planet: 'Jupiter',
    tarotCard: 'The Empress',
    element: 'Fire',
    musicalNote: 'E (320Hz)',
    color: 'Yellow',
  },

  4: {
    positive:
      'Builder and organiser. You carry the energy of structure — the patience to lay foundations that others will build upon. Reliability is your gift, and your practical intelligence turns ideas into functioning systems. In this tradition, the 4 is the four walls, the four seasons, the solid ground.',
    neutral:
      'The number of structure and stability. The Four is the first square — the shape that encloses space and creates order. Archetypally, it is the Emperor on his throne, the principle of law and boundary. It represents discipline, method, and the willingness to do the unglamorous work that makes everything else possible.',
    shadow:
      'Rigidity worn as discipline. Control mistaken for care. The shadow of 4 is the builder who becomes a prison warden — the organiser so devoted to the plan that they cannot adapt when the ground shifts. Stubbornness, narrowness, and the quiet tyranny of always knowing the "right" way.',
    keywords: ['stability', 'discipline', 'practicality', 'order', 'endurance', 'limitation'],
    planet: 'Uranus',
    tarotCard: 'The Emperor',
    element: 'Earth',
    musicalNote: 'F (341Hz)',
    color: 'Green',
  },

  5: {
    positive:
      'Adventurer and catalyst. You carry the energy of change — the restless curiosity that refuses to accept "this is how things are." Freedom is not a luxury for you; it is oxygen. In this tradition, the 5 sits at the centre of the single digits, the pivot point where everything can shift.',
    neutral:
      'The number of freedom and change. The Five is the midpoint, the fulcrum, the number that disrupts the stability of 4. Archetypally, it is the Hierophant — but not the rule-keeper; the one who learned the rules well enough to know which ones to break. It represents experience, sensory engagement, and the knowledge that comes only from doing.',
    shadow:
      'Restlessness mistaken for freedom. Excess mistaken for living fully. The shadow of 5 is the adventurer who runs from commitment — not toward something, but away from the discomfort of staying. Overindulgence, recklessness, and a chronic inability to be present where you are.',
    keywords: ['freedom', 'change', 'adventure', 'curiosity', 'versatility', 'restlessness'],
    planet: 'Mercury',
    tarotCard: 'The Hierophant',
    element: 'Air',
    musicalNote: 'G (384Hz)',
    color: 'Blue',
  },

  6: {
    positive:
      'Nurturer and harmoniser. You carry the energy of responsibility — the instinct to care for others and to create beauty in your environment. Love, for you, is a verb. In this tradition, the 6 is the hexagon of the honeycomb, the shape nature uses when efficiency and beauty must coexist.',
    neutral:
      'The number of harmony and duty. The Six is the first "perfect number" in mathematics (1+2+3=6) — complete and self-contained. Archetypally, it is the Lovers, but not romantic love alone; the principle of choice, values, and what you are willing to be responsible for. It represents home, service, and the aesthetics of care.',
    shadow:
      'Martyrdom dressed as generosity. Control dressed as concern. The shadow of 6 is the caretaker who gives in order to be needed — the helper whose help comes with invisible strings, the perfectionist who cannot rest until everyone else is "fixed." Self-sacrifice that breeds resentment.',
    keywords: ['harmony', 'responsibility', 'nurturing', 'service', 'beauty', 'perfectionism'],
    planet: 'Venus',
    tarotCard: 'The Lovers',
    element: 'Earth',
    musicalNote: 'A (432Hz)',
    color: 'Indigo',
  },

  7: {
    positive:
      'Seeker and analyst. You carry the energy of inquiry — the drive to look beneath surfaces and find what is actually true. Your inner life is rich, and solitude is where you do your best thinking. In this tradition, the 7 is the number of the mind turned inward, the question that matters more than the answer.',
    neutral:
      'The number of contemplation and mystery. The Seven appears across cultures as a number of completion and depth — seven days, seven notes, seven chakras, seven visible planets of the ancient world. Archetypally, it is the Chariot, but the journey is internal. It represents wisdom, analysis, and the examined life.',
    shadow:
      'Isolation mistaken for depth. Cynicism mistaken for discernment. The shadow of 7 is the seeker who uses intellect as a wall — the analyst so committed to understanding that they forget to experience. Emotional distance, mistrust, and the examined life examined to the point of paralysis.',
    keywords: ['wisdom', 'analysis', 'introspection', 'solitude', 'spirituality', 'scepticism'],
    planet: 'Neptune',
    tarotCard: 'The Chariot',
    element: 'Water',
    musicalNote: 'B (480Hz)',
    color: 'Violet',
  },

  8: {
    positive:
      'Achiever and authority. You carry the energy of mastery — the understanding that power is a tool and abundance is a skill. You see systems where others see chaos, and you build structures that endure. In this tradition, the 8 is the infinity symbol upright, the continuous flow between giving and receiving.',
    neutral:
      'The number of power and material mastery. The Eight is the first cube (2³) — three-dimensional, solid, occupying space in the real world. Archetypally, it is Strength, but not brute force; the strength of discipline applied over time. It represents ambition, authority, and the relationship between effort and reward.',
    shadow:
      'Workaholism dressed as ambition. Domination dressed as leadership. The shadow of 8 is the achiever who measures everything — including people — by output and return. Material success becomes the only success; power becomes its own purpose. The executive who forgot why they started.',
    keywords: ['power', 'ambition', 'authority', 'material success', 'discipline', 'control'],
    planet: 'Saturn',
    tarotCard: 'Strength',
    element: 'Earth',
    musicalNote: 'C (512Hz)',
    color: 'Pink',
  },

  9: {
    positive:
      'Humanitarian and sage. You carry the energy of completion — the broad perspective that comes from having (in this tradition) passed through all the single digits before you. Compassion is not abstract for you; it is practical. In this tradition, the 9 gives without calculating the return.',
    neutral:
      'The number of completion and universal awareness. The Nine is the last single digit — the end of a cycle before the return to 1. Archetypally, it is the Hermit, standing at the summit with a lantern, looking back over the entire journey. It represents wisdom earned through experience, selflessness, and the understanding that nothing truly belongs to us.',
    shadow:
      'Detachment mistaken for transcendence. Self-neglect mistaken for selflessness. The shadow of 9 is the humanitarian who cares about everyone in general and no one in particular — the sage so focused on the big picture that they lose the people standing right in front of them. Aloofness, ungroundedness, and the martyr complex of the "evolved" person.',
    keywords: ['completion', 'compassion', 'wisdom', 'selflessness', 'idealism', 'detachment'],
    planet: 'Mars',
    tarotCard: 'The Hermit',
    element: 'Fire',
    musicalNote: 'D (576Hz)',
    color: 'Gold',
  },

  11: {
    positive:
      'Intuitive and illuminator. You carry the energy of heightened perception — a sensitivity to currents others cannot feel. In traditions that recognise master numbers, 11 is called the Master Intuitive: the channel through which insight arrives unbidden. Your gift is seeing what is not yet visible to others.',
    neutral:
      'The first master number. Eleven is 1+1 — the individual doubled, self-awareness aware of itself. It carries the energy of 2 (its reduction) but amplified and unstable, like a tuning fork struck too hard. Archetypally, it is Justice — not punishment, but the precise calibration of inner truth. It represents spiritual insight, nervous energy, and the tension between vision and grounding.',
    shadow:
      'Anxiety dressed as sensitivity. Grandiosity dressed as vision. The shadow of 11 is the intuitive who cannot turn it off — overwhelmed by input, paralysed by possibility, convinced of a special destiny that never quite materialises. Nervous tension, impracticality, and the lonely burden of seeing what you cannot explain.',
    keywords: [
      'intuition',
      'illumination',
      'sensitivity',
      'vision',
      'nervous energy',
      'inspiration',
    ],
    planet: 'Pluto',
    tarotCard: 'Justice',
    element: 'Air',
    color: 'Silver',
  },

  22: {
    positive:
      'Master builder. You carry the energy of vision made concrete — the rare ability to dream on a large scale and then actually build it. Where 4 builds a house, 22 builds institutions, systems, legacies. In traditions that recognise master numbers, 22 is the most powerful number for turning the ideal into the real.',
    neutral:
      'The second master number. Twenty-two is the master builder — 2+2 = 4, the builder, but operating at a higher octave. Archetypally, it is the Fool at the end of the journey: the one who has seen everything and chooses to begin again, this time building for others. It represents large-scale achievement, practical idealism, and the weight of potential.',
    shadow:
      'Overwhelm dressed as ambition. Paralysis dressed as perfectionism. The shadow of 22 is the visionary crushed by the scale of their own vision — the master builder who never breaks ground because the plans are never perfect enough. The pressure of potential is real; so is the temptation to collapse back into 4 and build small, safe things.',
    keywords: [
      'master builder',
      'vision',
      'large-scale achievement',
      'practical idealism',
      'legacy',
      'pressure',
    ],
    planet: 'Vulcan',
    tarotCard: 'The Fool',
    element: 'Earth',
    color: 'White',
  },

  33: {
    positive:
      'Master teacher. You carry the energy of compassion raised to its highest expression — the ability to heal, teach, and uplift through pure presence. In traditions that recognise master numbers, 33 is the rarest and most spiritually charged: the teacher who teaches by being, not by telling.',
    neutral:
      'The third and rarest master number. Thirty-three is 3+3 = 6, the nurturer, but operating at its highest octave. Archetypally, it is the World — the final card of the Major Arcana, the completion of all cycles. It represents selfless service, spiritual mastery, and the integration of all that has come before. Fewer than 1% of life path calculations produce 33.',
    shadow:
      "Saviour complex dressed as service. Self-destruction dressed as sacrifice. The shadow of 33 is the master teacher who takes on everyone else's pain — the healer who forgets they are also human, the guide who loses themselves in the needs of others. The weight of this number, in traditions that use it, is immense; the temptation is to collapse back into 6 and care only for the immediate circle.",
    keywords: [
      'master teacher',
      'compassion',
      'spiritual service',
      'healing',
      'selflessness',
      'sacrifice',
    ],
    tarotCard: 'The World',
    color: 'Platinum',
  },
};
