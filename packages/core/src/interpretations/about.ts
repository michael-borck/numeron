/**
 * About page content for NUMERON.
 * Written in the terminal-voice tone. This is the intellectual core
 * of the app's honest framing.
 */

export interface AboutSection {
  heading: string;
  body: string;
}

export const aboutSections: AboutSection[] = [
  {
    heading: '> WHAT IS NUMEROLOGY?',
    body: `Numerology is the practice of assigning meaning to numbers derived from names, dates, and other inputs. It is very old — the Babylonians were doing it around 2000 BCE, Pythagoras formalised a version around 500 BCE, and Kabbalistic scholars have used gematria (Hebrew letter-number equivalences) for over a thousand years. The practice spread through Renaissance Europe, was revived in the early 20th century, and today exists in dozens of cultural variants worldwide.

It is, in other words, a genuinely ancient and cross-cultural human tradition. That does not make it true in any scientific sense. It makes it interesting.

NUMERON shows five different numerological systems simultaneously — Pythagorean, Chaldean, Kabbalistic, Lo Shu/Vedic, and Abjad — because they frequently produce different results for the same input. Most numerology apps hide this. We think the disagreement is the most interesting part.`,
  },
  {
    heading: '> IS IT REAL?',
    body: `The honest answer, delivered without condescension:

No controlled studies have demonstrated predictive validity for numerology. It has been tested; it has not passed.

Different systems produce contradictory results for the same name and date of birth. There is no agreed method to determine which system is correct — because none of them have been shown to predict anything.

The entire framework depends on base-10 arithmetic. If humans had eight fingers instead of ten, every "destiny number" on Earth would be different. The digits themselves are culturally contingent.

The interpretations are deliberately written to feel personally meaningful. This is not an accident — it is a well-studied psychological phenomenon called the Barnum effect (see below).

None of this makes numerology worthless. It makes it a cultural artefact, a mathematical curiosity, and a structured way to think about personality and meaning. Those are real things. Predictive power is not one of them.`,
  },
  {
    heading: '> THE BARNUM EFFECT',
    body: `In 1949, psychologist Bertram Forer gave his students a "personalised" personality assessment. Every student received the exact same text. The average accuracy rating: 4.26 out of 5.

The effect is named after P.T. Barnum (of circus fame), and it works because the most convincing personality descriptions share three properties: they are positive, they are vague, and they are framed as unique to you.

NUMERON's interpretations are written this way — not to deceive you, but because that is what numerological interpretation is. Every app that does this is producing Barnum statements. We are the one telling you so.

Knowing this does not ruin the experience. If anything, it makes it more interesting. You can watch yourself feeling personally seen by a digit sum, in real time, while knowing exactly why. That is a remarkable thing to notice about your own mind.`,
  },
  {
    heading: '> SO WHY BOTHER?',
    body: `Because the mathematics of digit reduction is genuinely interesting. Modular arithmetic, cyclic sequences, the special properties of 9 in base 10 — these are real mathematical phenomena, and they are beautiful.

Because the cultural history spans five thousand years and at least seven civilisations. The Babylonians, the Pythagoreans, the Kabbalists, the Chinese, the Hindu and Buddhist traditions, the Islamic Abjad system, the Norse rune-casters — all of them independently decided that numbers mean something beyond counting. That convergence is worth exploring, even if (especially if) the conclusion is that humans are pattern-finding machines.

Because pattern-finding is a deep human instinct, and NUMERON gives it a structured playground.

Because it is fun, and fun does not require scientific backing.`,
  },
  {
    heading: '> THE CONSTANTS & PATTERNS SECTION',
    body: `A specific note about the Explorer section: the scientific constants table cherry-picks digit counts to produce interesting results. We say so explicitly.

The fine structure constant (1/137) really is mysterious to physicists — Richard Feynman called it "one of the greatest damn mysteries of physics." The numerological framing is ours.

Planck's constant really does reduce to 33 when you use 9 significant figures. We chose 9 figures because 33 is more interesting than 2. The maths is real. The meaning is ours.

If you pick enough digits of enough constants, you will eventually land on any number you want. This is not evidence of cosmic order. It is evidence of how large the space of possible cherry-picks is. We think being honest about this is more fun than pretending it is profound.`,
  },
  {
    heading: '> NOT LIFE ADVICE',
    body: `Nothing in NUMERON constitutes life advice, financial advice, medical advice, career advice, relationship advice, or guidance of any kind.

Do not make significant decisions based on digit sums.

If you are facing a difficult decision, talk to a person you trust — or a qualified professional.

Numbers are fun. They are not oracles.`,
  },
];
