# NUMERON — Product Specification
**Version 1.2 | Retroverse Studios**
*"The Ancient Science of Numbers, Decoded."*

---

## 1. Overview

NUMERON is a numerology exploration tool built for curiosity, entertainment, and a little self-reflection. It is honest about what numerology is (a rich cultural and symbolic tradition, not a predictive science), offers three-lens interpretations (positive / neutral / shadow), and wraps everything in a distinctive retro-terminal aesthetic that fits the Retroverse Studios brand.

It ships as:
- A **web app** (hosted, accessible from the landing page)
- An **Electron desktop app** (downloadable from the same landing page)
- A **PDF report** generator (downloadable from either)

### Intellectual Honesty — Core Design Principle

> *NUMERON is built on a simple premise: numerology is culturally rich, mathematically interesting, and almost certainly not predictive. The app treats this honestly at every level — showing where systems disagree, explaining the Barnum effect by name, labelling coincidences as coincidences, and never dressing up digit arithmetic as cosmic truth. This is what makes it different from credulous apps, and it's more fun.*

This principle is not a footnote — it drives product decisions throughout:
- Why we show all five numerology systems simultaneously rather than hiding their contradictions
- Why interpretations have a SHADOW lens, not just positive affirmations
- Why the Constants Explorer labels its own cherry-picking ("we chose 9 digits because 33 is more interesting than 2")
- Why the About page explains the Barnum effect to the user
- Why every PDF report carries a plain-language disclaimer
- Why the app never says "your destiny is..." and always says "in this tradition..."

Tone throughout: **smart, playful, slightly tongue-in-cheek.** Never credulous. Never dismissive either — the cultural history is genuinely fascinating and deserves respect.

---

## 2. Name & Branding

| Item | Value |
|---|---|
| App name | **NUMERON** |
| Tagline | *"The Ancient Science of Numbers, Decoded."* |
| Studio | Retroverse Studios |
| Aesthetic | Retro terminal / phosphor CRT — amber/green on near-black, scanlines, monospace type, subtle CRT glow |
| Tone | Smart, playful, slightly tongue-in-cheek — never earnest pseudo-mysticism |

### Why NUMERON fits Retroverse Studios
- Sounds like both a retro sci-fi computer and a game/tool title
- Consistent with a studio portfolio of fun, slightly nostalgic digital experiences
- The retro-terminal aesthetic is visually distinct in a market full of purple-gradient "spiritual" apps
- Pairs well with NarrativeForge in the portfolio — one is about stories, one is about numbers; both are about meaning-making

---

## 3. Tech Stack

### Shared Core
| Layer | Technology |
|---|---|
| Language | TypeScript (strict mode) |
| UI framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS + CSS custom properties |
| State management | Zustand |
| PDF generation | `@react-pdf/renderer` |
| Numerology engine | Pure TS module (no dependencies) |
| Testing | Vitest + Testing Library |
| Sudoku generation | `sudoku` npm package (don't reinvent this) |

### Web App
| Layer | Technology |
|---|---|
| Hosting | Static site (Cloudflare Pages or Vercel) |
| Router | React Router v6 |
| PWA | Vite PWA plugin (`vite-plugin-pwa`) — manifest + service worker |
| Analytics | Plausible (privacy-respecting, no cookies) — or none; decide explicitly |
| OG images | `@vercel/og` or static pre-generated cards for social sharing |

### Electron App
| Layer | Technology |
|---|---|
| Electron version | Latest stable |
| Electron builder | `electron-builder` |
| IPC | Context bridge (no `nodeIntegration`) |
| Auto-update | `electron-updater` |
| Local persistence | `electron-store` (saves profile between launches) |
| Targets | Windows (NSIS), macOS (DMG), Linux (AppImage) |

### Monorepo Structure
```
numeron/
├── packages/
│   ├── core/              # Numerology engine (pure TS, no UI deps)
│   ├── ui/                # React component library + pages
│   └── pdf/               # PDF report templates (@react-pdf/renderer)
├── apps/
│   ├── web/               # Vite web app
│   └── desktop/           # Electron wrapper
├── landing/               # Landing page (separate static site)
└── docs/                  # Design system, architecture notes
```

Use **pnpm workspaces** to manage the monorepo.

---

## 4. Numerology Engine (`packages/core`)

The engine is the heart of NUMERON. It must be fully tested, deterministic, and transparent (every reduction step is exposed, not just the final number).

### 4.1 Systems Supported

| System | Origin | Description |
|---|---|---|
| **Pythagorean** | Greek, ~500 BCE | Standard Western — A=1, B=2... I=9, J=1... |
| **Chaldean** | Babylonian, ~2000 BCE | Ancient Babylonian — different letter values, 1–8 only |
| **Kabbalistic (Gematria)** | Hebrew mysticism | Hebrew letter values mapped to Latin equivalents |
| **Lo Shu / Vedic** | Chinese/Indian, ~2000 BCE | Grid-based; birth date digits placed on the 3×3 Lo Shu square |
| **Abjad (Arabic)** | Islamic tradition | Arabic letter values; shares roots with Hebrew Gematria |

The UI shows all five systems in a comparison view. This is a key differentiator — most apps pick one and hide the inconsistency.

### 4.1a Ancient Cultural Contexts

Each system carries a cultural sidebar in the UI — not just the calculation, but the civilisation behind it:

**Babylonian / Chaldean**
The oldest documented numerological tradition. Babylonian astronomers assigned planetary rulers to the numbers 1–7 (the known planets), a mapping that persists in Western astrology and the days of the week. The Chaldean letter table weights letters by vibrational sound, not sequential position, making it the most "musical" system.

**Hebrew Gematria**
Central to Kabbalistic scholarship for over a thousand years. Not fringe — it appears in Talmudic commentary, medieval philosophy, and Zoharic mysticism. The number 18 (chai, "life") is still used in Jewish gift-giving. The word for "love" (ahava) and "one" (echad) both equal 13; their sum is 26, the value of the divine name YHWH. These are documented textual facts, not inventions.

**Chinese Lo Shu**
A 3×3 magic square said to have appeared on the back of a tortoise emerging from the Lo River, circa 2000 BCE. Every row, column, and diagonal sums to 15 (→ 6). The square maps directly onto the feng shui bagua (eight trigrams plus centre), forming the basis of Classical feng shui home analysis. NUMERON overlays a user's core numbers onto the Lo Shu grid as a visual feature.

**Hindu / Vedic**
The number 108 appears across Hindu, Buddhist, and Jain traditions: 108 beads on a mala, 108 Upanishads, 108 names of Lakshmi, 108 dance forms of Shiva. 1+0+8 = 9. The Vedic system (similar to Pythagorean) uses a person's birth date and name; the "lucky number" calculation is culturally embedded across South and Southeast Asia. The number 7 (saptarishi, seven sages) and 12 (rashis, zodiac signs) carry special weight.

**Mayan**
The Tzolkin calendar uses 13 × 20 = 260 days as its sacred cycle. The numbers 13 (karma debt in Western numerology) and 20 have deep cosmological significance. The Long Count calendar's base unit is 20 (vigesimal system), not 10 — a reminder that our decimal digit-sum reduction is culturally contingent, not universal. NUMERON notes this explicitly in its "Is Numerology Real?" section.

**Norse (Runes)**
The Elder Futhark has 24 runes in 3 aettir (groups of 8). Each rune carries a number 1–24. Less a numerological system than a divinatory one, but the number-rune mappings are well documented and visually compelling. A "rune number" feature maps a user's life path number to its corresponding Elder Futhark rune.

**Egyptian**
The Ennead (nine principal gods) and the structure of the Pyramid Texts suggest deliberate numerical symbolism. More significantly, the Great Pyramid encodes π (perimeter/height × 2 = 2π) and φ (apothem/half-base = φ) to within measurement tolerance. Whether this was intentional remains debated, but it is a real geometric property of the structure. NUMERON presents this as a fascinating open question, not a claim.

### 4.2 Core Calculations

```typescript
interface NumerologyProfile {
  input: ProfileInput;
  lifePath: NumberResult;          // From date of birth
  expression: NumberResult;        // Full birth name
  soulUrge: NumberResult;          // Vowels in full name
  personality: NumberResult;       // Consonants in full name
  maturity: NumberResult;          // lifePath + expression
  personalYear: NumberResult;      // Current year calculation
  personalMonth: NumberResult;     // Personal year + current month
  personalDay: NumberResult;       // Personal month + current day
  houseNumber: NumberResult;       // Address → single digit
  nickname: NumberResult;          // Preferred/nickname name
  birthdayNumber: NumberResult;    // Day of birth only (1–31, reduced)
  hiddenPassion: NumberResult[];   // Most frequent letters in name
  karmaDebt: KarmaDebt[];         // Presence of 13, 14, 16, 19
  masterNumbers: MasterNumber[];   // 11, 22, 33 — not reduced
}

interface NumberResult {
  value: number;                   // Final reduced number
  masterNumber: boolean;           // Was reduction stopped at 11/22/33?
  reductionSteps: string[];        // e.g. ["MICHAEL → 4+9+3+8+1+5+3 = 33", "33 → master"]
  system: NumerologySystem;
  interpretation: Interpretation;
}

interface Interpretation {
  positive: string;
  neutral: string;
  shadow: string;
  keywords: string[];
  element?: string;               // Earth, Air, Fire, Water
  planet?: string;                // Astrological correspondence
  tarotCard?: string;             // Major Arcana correspondence
  musicalNote?: string;           // Frequency correspondence (e.g. "A 432Hz")
  color?: string;                 // Traditional color association
}
```

### 4.3 Reduction Algorithm

```typescript
// Must be transparent — every step recorded
function reduceWithSteps(n: number, stopAtMaster = true): NumberResult {
  const steps: string[] = [String(n)];
  while (n > 9 && !(stopAtMaster && isMasterNumber(n))) {
    const digits = String(n).split('').map(Number);
    const next = digits.reduce((a, b) => a + b, 0);
    steps.push(`${digits.join('+')} = ${next}`);
    n = next;
  }
  return { value: n, reductionSteps: steps, masterNumber: isMasterNumber(n) };
}
```

### 4.4 Correspondences Table

Each number 1–9 (plus 11, 22, 33) maps to:

| # | Planet | Tarot | Element | Note (432Hz) | Color |
|---|---|---|---|---|---|
| 1 | Sun | The Magician | Fire | C (256Hz) | Red |
| 2 | Moon | High Priestess | Water | D (288Hz) | Orange |
| 3 | Jupiter | Empress | Fire | E (320Hz) | Yellow |
| 4 | Uranus | Emperor | Earth | F (341Hz) | Green |
| 5 | Mercury | Hierophant | Air | G (384Hz) | Blue |
| 6 | Venus | Lovers | Earth | A (432Hz) | Indigo |
| 7 | Neptune | Chariot | Water | B (480Hz) | Violet |
| 8 | Saturn | Strength | Earth | C (512Hz) | Pink |
| 9 | Mars | Hermit | Fire | D (576Hz) | Gold |
| 11 | Pluto | Justice | Air | — | Silver |
| 22 | Vulcan | Fool | Earth | — | White |
| 33 | — | World | — | — | Platinum |

*Note: correspondences vary between traditions — these are clearly labelled as one mapping, not The Truth.*

### 4.5 Text Analysis Mode ("Decode Mode")

```typescript
function analyzeText(text: string, system: NumerologySystem): TextAnalysis {
  return {
    fullTextValue: reduceString(text, system),
    wordValues: text.split(/\s+/).map(word => ({
      word,
      value: reduceString(word, system),
      steps: reduceStringWithSteps(word, system)
    })),
    frequencyMap: buildLetterFrequencyMap(text),
    dominantNumbers: findDominantNumbers(text, system),
    numerologicalFingerprint: buildFingerprint(text, system)
  };
}
```

---

## 5. Features & Pages

### 5.1 Web App Pages

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Animated intro, quick-start form |
| `/profile` | Full Profile | All calculations, tabbed layout |
| `/compare` | Compatibility | Two profiles side-by-side |
| `/decode` | Text Decoder | Paste any text, get numerological analysis |
| `/reverse` | Reverse Lookup | "What name would give me a Life Path 7?" |
| `/calendar` | Personal Calendar | Personal day/month numbers for current month |
| `/systems` | System Comparison | All five systems side-by-side |
| `/explore` | Constants & Patterns | Scientific constants, magic squares, Fibonacci, Sudoku |
| `/share/:encoded` | Shared Profile | Decoded from URL hash, read-only view |
| `/report` | PDF Report | Preview + download |
| `/about` | About | Honest explainer — what numerology is and isn't |

### 5.2 Profile Input Form

```typescript
interface ProfileInput {
  // Fixed (fate)
  fullBirthName: string;          // As on birth certificate
  dateOfBirth: Date;
  birthCity?: string;             // Optional, for display only
  
  // Semi-fixed (chosen but stable)
  preferredName?: string;         // Nickname / chosen name
  address?: string;               // Street number only needed
  
  // Dynamic
  targetDate?: Date;              // For personal day/month/year of any date
}
```

### 5.3 Three-Lens Interpretation System

Every number result shows three tabs or toggle states:

- **LIGHT** — positive expression, strengths, gifts
- **TRUTH** — neutral/archetypal description, the raw symbolic meaning
- **SHADOW** — challenging expression, blind spots, potential pitfalls

*Label these clearly as interpretive lenses, not predictions.*

### 5.4 Decode Mode

Users paste any text (a book title, a sentence, a famous speech, their email address) and NUMERON:
- Reduces the full text to a single number
- Maps each word to a number
- Shows a heatmap of number distribution across the text
- Identifies "dominant" numbers
- Suggests famous texts with the same primary number

Preloaded famous texts for comparison:
- Opening line of *Moby Dick*
- "To be or not to be"
- The Gettysburg Address (first sentence)
- "In the beginning God created the heavens and the earth" (Hebrew gematria tradition)
- A Beatles song title of each number 1–9

### 5.5 Compatibility View

Enter two profiles. Show:
- Life Path compatibility (traditional table)
- Expression number interaction
- Combined number (sum of both life paths, reduced)
- Shared numbers
- Tension numbers
- Three-lens interpretation of the pairing

### 5.6 Reverse Lookup

User selects a target number for any calculation (e.g. "I want a business name with Expression Number 8"). NUMERON:
- Shows what letter value totals produce that result
- Suggests structural patterns (e.g. "a 5-letter name with these vowels")
- Lets user type a candidate name and checks it live

### 5.7 Personal Calendar

Monthly view showing:
- Personal Day number for each day
- Colour-coded by number (using the correspondences table)
- Brief keyword for each day
- Highlighted "power days" (when personal day matches life path)

### 5.8 PDF Report

A downloadable, printable report. Design should feel like a **vintage broadsheet or art deco document** — not a corporate template.

Sections:
1. Cover page — name, date, generated date, NUMERON / Retroverse Studios branding
2. Core Numbers Summary (Life Path, Expression, Soul Urge, Personality)
3. Current Timing (Personal Year, Month, Day)
4. House Number (if provided)
5. Comparison across Pythagorean / Chaldean / Kabbalistic systems
6. Karma Debt & Master Numbers (if applicable)
7. Correspondences (planet, tarot, element, colour, note)
8. Three-lens interpretations for each major number
9. Decode result (if user ran a text decode)
10. Disclaimer — clearly states this is entertainment/cultural exploration

### 5.9 Constants & Patterns Explorer (`/explore`)

The most intellectually distinctive section of NUMERON. Five tabs, each a self-contained interactive tool. Framed throughout as "mathematical curiosity, not mystical proof" — the tongue-in-cheek tone is what makes it work.

---

#### Tab 1: Scientific Constants

Apply digit-sum reduction to the significant digits of famous physical and mathematical constants. The results are pre-computed, annotated, and displayed with expandable "why this is interesting" sidebars.

```typescript
interface ConstantEntry {
  name: string;
  symbol: string;
  valueDisplay: string;          // Human-readable form
  digitsUsed: number[];          // Which digits were summed
  reductionSteps: string[];
  result: number;
  isMasterNumber: boolean;
  annotation: string;            // The "interesting" sidebar text
  source: 'physics' | 'math' | 'culture' | 'sacred';
}
```

**Preloaded constants table:**

| Constant | Digits Used | Reduces To | Note |
|---|---|---|---|
| π (15 sig. digits) | 3,1,4,1,5,9,2,6,5,3,5,8,9,7,9 | 73 → 10 → **1** | The beginning |
| e (Euler, 10 digits) | 2,7,1,8,2,8,1,8,2,8 | 47 → **11** | Master number |
| φ (golden ratio) | 1,6,1,8,0,3,3,9,8,8,7 | 54 → **9** | Completion |
| c (speed of light) | 2,9,9,7,9,2,4,5,8 | 55 → 10 → **1** | The beginning |
| **Fine structure α (137)** | 1,3,7 | **11** | **Master number — see sidebar** |
| Planck short (6.626) | 6,6,2,6 | 20 → **2** | Duality |
| **Planck full (6.62607015)** | 6,6,2,6,0,7,0,1,5 | **33** | **Rarest master number** |
| √2 (first 9 digits) | 1,4,1,4,2,1,3,5,6 | 27 → **9** | Completion |
| Avogadro (6.022×10²³) | 6,0,2,2 | 10 → **1** | Beginning |
| 42 (Hitchhiker's Guide) | 4,2 | **6** | Harmony |
| 666 (Number of the Beast) | 6,6,6 | 18 → **9** | Completion |
| 108 (sacred Hindu/Buddhist) | 1,0,8 | **9** | Completion |
| 432 (Hz tuning frequency) | 4,3,2 | **9** | Completion |
| 144,000 (Revelation) | 1,4,4 | **9** | Completion |
| 360 (degrees in circle) | 3,6,0 | **9** | Completion |
| 1729 (Hardy-Ramanujan) | 1,7,2,9 | 19 → 10 → **1** | Beginning |

**Sidebar: The Fine Structure Constant (137)**

> α ≈ 1/137. A dimensionless constant governing the strength of electromagnetic interaction. Appears throughout quantum mechanics without explanation. Richard Feynman called it "one of the greatest damn mysteries of physics." Wolfgang Pauli was so obsessed with it that colleagues joked about the "Pauli effect" — Pauli died in hospital room 137. It reduces to 11, the master number of illumination and intuition. Draw your own conclusions.

**Sidebar: Planck's Constant and the Master Teacher**

> Planck's constant written to four significant figures (6.626) reduces to 2. Written to its full defined value (6.62607015 × 10⁻³⁴ J⋅s), the significant digits sum to 33 — the rarest master number, associated in numerological tradition with the "Master Teacher." This is either a profound coincidence or a demonstration that if you pick enough digits of enough constants, you'll eventually land on a master number. Probably the latter. Still fun.

**Sidebar: The Nines Cluster**

> Notice how many culturally "sacred" numbers reduce to 9: 108, 432, 360, 144000, 666. This isn't mystical — any multiple of 9 always reduces to 9 (it's a property of base-10 arithmetic called "casting out nines," used by accountants for centuries). The interesting question is whether ancient cultures chose these numbers *because* they felt "complete" (and 9-ness contributed to that feeling), or whether it's post-hoc pattern-matching. Probably both.

**User input:** Enter any number or constant and NUMERON reduces it, showing all steps. A "famous numbers" autocomplete suggests well-known constants as the user types.

---

#### Tab 2: Magic Squares

Interactive analysis of historical magic squares, plus a user-input analyser.

**What is a magic square?** An n×n grid containing each integer from 1 to n² exactly once, where every row, column, and main diagonal sums to the same "magic constant" M = n(n²+1)/2.

```typescript
interface MagicSquareAnalysis {
  grid: number[][];
  order: number;                  // n
  magicConstant: number;          // M
  magicConstantReduction: NumberResult;
  centerValue?: number;           // For odd-order squares
  isValid: boolean;               // Validates all rows/cols/diags equal M
  tradition?: string;             // Cultural origin if known
  reductionOfAllCells: number[];  // Each cell reduced
  dominantNumber: number;         // Most frequent reduction result
}
```

**Preloaded squares:**

**Lo Shu (3×3, China, ~2000 BCE)**
```
4  9  2
3  5  7
8  1  6
```
- Magic constant: 15 → **6**
- Centre: **5**
- The direct ancestor of feng shui bagua mapping
- Feature: overlay user's Life Path / Expression numbers onto the grid, highlight which cells "belong" to them

**Dürer's Melancholia I (4×4, Germany, 1514 AD)**
```
16   3   2  13
 5  10  11   8
 9   6   7  12
 4  15  14   1
```
- Magic constant: 34 → **7**
- Bottom centre cells: **15 | 14** = year 1514
- Contains multiple sub-patterns: four corners sum to 34, centre 2×2 sums to 34
- One of the most analysed images in Western art history

**Agrippa's Order-5 (Renaissance occult, ~1530)**
```
11  24   7  20   3
 4  12  25   8  16
17   5  13  21   9
10  18   1  14  22
23   6  19   2  15
```
- Magic constant: 65 → **11** (master number)
- Associated by Renaissance magi with the planet Mars

**Jupiter Square (Order-4 variant)**
```
 4  14  15   1
 9   7   6  12
 5  11  10   8
16   2   3  13
```
- Magic constant: 34 → **7**
- Used in talismanic magic; Jupiter associated with number 4

**General properties shown for any square:**
- Order n, magic constant M, reduction of M
- Mathematical note: for n=9, M = 9(82)/2 = 369 → 9. Every order-9 magic square is numerologically "pure."
- Validation: is it actually a valid magic square?
- Broken diagonals, pandiagonal properties (for advanced squares)

**User analyser:** Paste or enter any n×n grid (up to 9×9). NUMERON validates it and runs the full analysis. Error handling for invalid or incomplete grids.

---

#### Tab 3: Fibonacci & Golden Ratio

Two interactive visualisations of the deep relationship between Fibonacci numbers and φ, filtered through numerological reduction.

**Fibonacci Mod-9 Clock**

The Fibonacci sequence reduced modulo 9 produces a perfect cycle of exactly 24 values before repeating:

```
1, 1, 2, 3, 5, 8, 4, 3, 7, 1, 8, 9,
8, 8, 7, 6, 4, 1, 5, 6, 2, 8, 1, 9
```

Properties:
- Period exactly 24 (provable)
- 9 appears at positions 12 and 24 — the midpoint and endpoint of every cycle
- The sequence is palindromic around the 9 at position 12
- Sum of the full cycle: 1+1+2+...+9 = **108** → 9

Visualise as an animated clock face: 24 positions around a circle, amber dots lighting up in sequence. When the sequence hits 9 (positions 12 and 24), the whole clock pulses. This is a genuinely beautiful animation.

**Golden Ratio Spiral with Numerological Annotation**

Interactive φ spiral showing the first 20 Fibonacci numbers, each cell labelled with its digit-sum reduction. Zoom and pan. Highlight all cells that reduce to any target number — creates unexpected visual patterns in the spiral geometry.

**Key φ facts displayed:**
- φ = (1 + √5) / 2 ≈ 1.6180339887... → significant digits reduce to **9**
- φ² = φ + 1 (unique algebraic property)
- 1/φ = φ - 1 (unique reciprocal property)
- Fibonacci(n) / Fibonacci(n-1) → φ as n → ∞
- The angle 360° / φ² ≈ 137.5° — the **golden angle**, used by plants to pack seeds/petals. And 137 is the fine structure constant to the nearest integer. Coincidence? Yes. Fun? Also yes.

---

#### Tab 4: Sudoku Analyser

NUMERON frames a completed sudoku as numerologically the most perfect structure humans have invented. This is mathematically defensible and delightfully absurd.

**The Pure-9 Properties of Sudoku:**

| Property | Value | Reduces To |
|---|---|---|
| Total cells | 81 | **9** |
| Each digit appears | 9 times | **9** |
| Each row/column/box sum | 45 | **9** |
| Total of all 81 cells | 405 | **9** |
| Minimum givens for unique solution | 17 → 8 | **8** (interestingly, NOT 9) |
| Number of valid completed sudokus | 6,670,903,752,021,072,936,960 → reduces | **9** |

The last row is a real number (the count of valid 9×9 sudoku grids) and it does reduce to 9. Worth verifying in the engine and displaying with great fanfare.

**Features:**
- **Validator + Analyser:** Paste a completed sudoku (81 digits or 9 rows of 9). NUMERON validates it, confirms all pure-9 properties, and generates a "numerological certificate"
- **Digit frequency map:** Which numbers appear where — visualised as a heatmap
- **Row/column sums:** All shown reducing to 9, animated sequentially (satisfying)
- **"Numerologically significant givens":** For a puzzle with givens, sum the given digits and show their reduction — a different number each puzzle
- **Generate mode:** Generate a random valid sudoku with a target "given sum" reduction (e.g. "generate a puzzle where the givens sum to your Life Path number")

```typescript
interface SudokuAnalysis {
  grid: number[][];           // 9×9, 0 = empty
  isValid: boolean;
  isComplete: boolean;
  rowSums: number[];          // All should be 45
  colSums: number[];
  boxSums: number[];          // 3×3 boxes
  totalSum: number;           // 405
  digitFrequency: Record<number, number>;  // Each digit appears 9 times
  pureNineScore: number;      // How many pure-9 properties confirmed (0–6)
  givenDigits?: number[];     // For incomplete puzzles
  givenSum?: NumberResult;    // Reduction of given digits
}
```

---

#### Tab 5: Sacred Geometry & Number Patterns

A reference/explorer for cross-cultural number patterns that don't fit other tabs.

**Sections:**

**Powers of 2 and Binary**
```
2¹=2, 2²=4, 2³=8, 2⁴=7, 2⁵=5, 2⁶=1, 2⁷=2...
```
Powers of 2 modulo 9 cycle with period 6: `2, 4, 8, 7, 5, 1`. Doubles always cycle through these six numbers. Visualise as a hexagram — the Star of David pattern. This appears in many sacred geometry traditions.

**Multiples of 9**
Any integer × 9 reduces to 9. Any integer × 9, its digits always sum to a multiple of 9. Demo: input any number, multiply by 9, watch the reduction always land on 9. This is the mathematical heart of why 9 has a special status.

**142857 — The Cyclic Number**
1/7 = 0.142857142857... The digits 142857 cycle. Multiply by 1–6:
- 142857 × 1 = 142857 → **9**
- 142857 × 2 = 285714 → same digits, rotated → **9**
- 142857 × 6 = 857142 → same digits, rotated → **9**
- 142857 × 7 = 999999 → **9**

All rotations of 142857 reduce to 9. This is a genuine mathematical property of the number, related to 7 being a factor of the repunit 999999.

**Kaprekar's Constant (6174)**
Take any 4-digit number (not all same digits). Arrange digits descending and ascending, subtract. Repeat. Always reaches **6174** within 7 steps.
6+1+7+4 = **18 → 9**. Interactive: enter any 4-digit number and watch the Kaprekar process animate to 6174.

**3, 6, 9 — Tesla's Pattern**
Nikola Tesla reportedly said "If you only knew the magnificence of 3, 6, and 9..." (whether he actually said this is disputed; the internet has embellished it). Regardless: the doubling sequence `1,2,4,8,7,5` (powers of 2 mod 9) never includes 3, 6, or 9. Those three numbers form a separate closed system under doubling: 3→6→3, 6→3→6, 9→9. Display as two interlocked cycles — visually the Tesla coil logo pattern. Fun whether or not Tesla said the quote.

---

### 5.10 Updated PDF Report

The Constants & Patterns Explorer results are optionally includable in the PDF report:
- A "Curiosities" appendix page listing the user's life path number's appearance in the constants table
- The user's Lo Shu grid overlay
- Their rune correspondence
- Their Fibonacci clock position (which position in the 24-cycle corresponds to their life path number)

---

### 5.11 Sharing

No backend required. All sharing is URL-encoded.

**Share Profile**
Profile inputs are base64-encoded into the URL hash:
```typescript
// Encoding
const encoded = btoa(JSON.stringify(profileInput));
const shareUrl = `${window.location.origin}/share#${encoded}`;

// Decoding at /share/:encoded
const profileInput = JSON.parse(atob(hash));
```
The `/share/` route renders a read-only profile view with a "Run my own reading" CTA. No personal data touches a server.

**Copy Result**
Every `<NumberDisplay>` component has a copy-to-clipboard icon. Copies a plain-text summary:
```
NUMERON // Life Path 7 (Pythagorean)
The Seeker. Inner knowing, depth, solitude.
LIGHT: Wisdom and insight. Drawn to the edges of knowledge.
SHADOW: Isolation and mistrust. The examined life, over-examined.
numeron.retroversestudios.com
```

**Social OG Cards**
Pre-generated static OG images for each number 1–9 and master numbers. When a share URL is visited, the meta tags reference the appropriate OG card for that life path number. Rendered in the PHOSPHOR aesthetic — large glowing number on dark background, "NUMERON" wordmark. These are static SVG-to-PNG assets, not server-rendered.

**Electron — No Share URL**
In the desktop app, the share button copies the URL to clipboard with a note: `> SHARE URL COPIED // open in browser to view`. No in-app browser needed.

---

### 5.12 Easter Eggs

Fits the Retroverse Studios identity. All implemented as silent checks in the engine or input handlers — no documentation in the UI, discovered organically.

| Trigger | Response |
|---|---|
| Address = "42" | Life path interpretation replaced with: `> THE ANSWER TO LIFE, THE UNIVERSE, AND EVERYTHING // but we still need the question` |
| DOB = 09/09/1999 | Every number reduces to 9. App displays: `> WARNING: MAXIMUM NINES DETECTED // the universe is watching` with a slow pulse on all numbers |
| Name = all same letter (e.g. "AAAA") | `> NULL PROFILE DETECTED // you are the void. the void is you. // numerologically speaking, this is fine` |
| Life path = 33 | Rare enough to warrant a special glow animation and a note: `> MASTER TEACHER // fewer than 1% of profiles reach 33. this may mean nothing. it probably means nothing.` |
| Konami code on landing page | Switches to **CHAOS MODE**: all interpretations replaced with deliberately absurd alternatives ("You have the energy of a mid-size filing cabinet. This is a compliment."). Toggle stays until page reload. |
| Name input = "NUMERON" | `> ANALYSING SELF... // please hold` followed by a self-referential reading of the app's own name |
| Enter a date in the future | `> TEMPORAL ANOMALY DETECTED // we can calculate your numbers, but we recommend existing first` |

All easter eggs respect `prefers-reduced-motion` — animations are skipped, text still shows.

---

### 5.13 About Page — Full Content Spec

The About page is the intellectual core of NUMERON's honest framing. It is the page that earns trust from sceptical users and differentiates the app from credulous competitors. Written in the same terminal-voice tone as the rest of the app.

**Sections:**

**`> WHAT IS NUMEROLOGY?`**
A brief, accurate cultural history: Babylonian/Chaldean origins (~2000 BCE), Pythagoras (~500 BCE), Kabbalistic tradition, spread through Renaissance Europe, modern Western tradition solidified in the 20th century. Treat it as what it is: a very old human practice of finding meaning in numbers, with genuine cultural depth.

**`> IS IT REAL?`**
The honest answer, delivered without condescension:
- No controlled studies have demonstrated predictive validity for numerology
- Different systems (Pythagorean vs Chaldean vs Kabbalistic) produce contradictory results for the same input, with no agreed method to resolve the contradiction
- The choice of base 10 is arbitrary — if humans had 8 fingers, we'd have different "destinies"
- The interpretations are deliberately general enough to feel personally meaningful (see: the Barnum effect)

**`> THE BARNUM EFFECT`**
Named after P.T. Barnum; formally studied by psychologist Bertram Forer in 1949. Forer gave students a "personalised" personality assessment — in reality, everyone received the same text. Average accuracy rating: 4.26 out of 5. The texts that feel most accurate tend to be positive, vague, and framed as unique to you. NUMERON's interpretations are written this way deliberately — not to deceive, but because that's what numerological interpretation is. Knowing this makes it more interesting, not less.

**`> SO WHY BOTHER?`**
- The mathematics of digit reduction is genuinely interesting (modular arithmetic, cyclic sequences, the special properties of 9)
- The cultural history spans five thousand years and multiple civilisations — that's worth exploring
- Pattern-finding is a deep human instinct; NUMERON gives it a structured playground
- It's fun, and fun doesn't require scientific backing

**`> THE CONSTANTS & PATTERNS SECTION`**
A specific note for the Explorer section: the scientific constants table cherry-picks digit counts to produce interesting results. We say so explicitly. The fine structure constant (137) really is mysterious to physicists — the numerological framing is ours. Planck's constant really does reduce to 33 at 9 significant figures — we chose 9 figures because 33 is more interesting than 2. The maths is real. The meaning is ours.

**`> NOT LIFE ADVICE`**
Clear, plain, final: *Nothing in NUMERON constitutes life advice, financial advice, medical advice, career advice, relationship advice, or guidance of any kind. Do not make significant decisions based on digit sums. If you are facing a difficult decision, talk to a person you trust — or a qualified professional. Numbers are fun. They are not oracles.*

---

## 6. UI / Visual Design

### 6.1 Aesthetic Direction

**Retro Terminal + Occult Document hybrid.**

Think: a 1970s mainframe that has been used by a Victorian occultist. Two modes available:

| Mode | Description |
|---|---|
| **PHOSPHOR** | Dark background, amber/green CRT glow, scanlines, monospace text, terminal feel |
| **ARCANE** | Cream/ivory background, art deco geometry, sepia tones, ornamental borders — like an old printed almanac |

Users can toggle between them. Default is PHOSPHOR for the Retroverse Studios vibe.

### 6.2 Typography

| Use | Font |
|---|---|
| Headings / Numbers | `VT323` or `Share Tech Mono` (Google Fonts) — pixel/terminal monospace |
| Body | `Courier Prime` — readable monospace with warmth |
| Decorative | `Cinzel` or `Almendra` — for the arcane mode, looks like engraving |

### 6.3 Colour Palette (PHOSPHOR mode)

```css
--bg-primary: #0a0a08;
--bg-secondary: #111109;
--phosphor-amber: #ffb000;
--phosphor-green: #39ff14;
--phosphor-dim: #7a5500;
--glow-amber: 0 0 8px #ffb000, 0 0 20px #ff880040;
--glow-green: 0 0 8px #39ff14, 0 0 20px #39ff1440;
--text-primary: #ffb000;
--text-secondary: #7a5500;
--border: #2a2308;
--scanline: repeating-linear-gradient(
  0deg, transparent, transparent 2px,
  rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px
);
```

### 6.4 Colour Palette (ARCANE mode)

```css
--bg-primary: #f5f0e8;
--bg-secondary: #ede8dd;
--ink-dark: #1a1208;
--ink-mid: #3d2b0a;
--gold: #8b6914;
--sepia: #a0845c;
--border: #8b6914;
```

### 6.5 Motion & Effects

- **CRT flicker** on page load (subtle, CSS only, respects `prefers-reduced-motion`)
- **Number reveal** — numbers count up rapidly then lock, like an old ticker
- **Scanline overlay** — fixed position, low opacity, CSS `repeating-linear-gradient`
- **Glow pulse** on master numbers (11, 22, 33) — slow CSS animation
- **Typing cursor blink** on input labels
- **Page transitions** — brief scan/wipe effect between routes

### 6.6 UI Components (key)

- `<TerminalCard>` — bordered box with corner decorations, phosphor glow on hover
- `<NumberDisplay>` — large number with glow, reduction steps expandable below
- `<ThreeLensToggle>` — LIGHT / TRUTH / SHADOW tab strip
- `<ReductionTrace>` — animated step-by-step reduction display
- `<SystemCompare>` — three-column table, Pythagorean / Chaldean / Kabbalistic
- `<CalendarGrid>` — monthly grid, colour-coded by personal day number
- `<TextHeatmap>` — word-by-word number colour mapping for Decode mode

---

## 7. Landing Page (`landing/`)

Separate static site, deployed to the same domain root.

### Sections
1. **Hero** — app name, tagline, animated number reveal, CTA buttons: "Open in Browser" + "Download for Desktop"
2. **Features** — 6-card grid: Life Path, Three Lenses, Decode Mode, PDF Report, Compatibility, System Comparison
3. **Demo** — embedded or screenshot walkthrough
4. **Download** — platform-specific download buttons (Win / Mac / Linux), version number
5. **About** — honest framing: "This is cultural and mathematical exploration, not prediction. Here's what numerology actually is."
6. **Portfolio link** — "Part of the Retroverse Studios collection"
7. **Footer** — links to GitHub (if open source), Retroverse Studios, version

### Landing Page Aesthetic
Same PHOSPHOR palette, but with more dramatic hero — large glowing "NUMERON" in VT323, animated digit rain background (CSS only, like Matrix but amber), CTA buttons with terminal-style borders and hover glow.

---

## 8. Electron App Specifics

### Window Configuration
```typescript
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  minWidth: 900,
  minHeight: 600,
  titleBarStyle: 'hiddenInset',    // macOS
  backgroundColor: '#0a0a08',
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    preload: path.join(__dirname, 'preload.js')
  }
});
```

### Custom Title Bar
Match the terminal aesthetic — dark bar with NUMERON in amber monospace, standard window controls.

### IPC Channels
```typescript
// Main process exposes:
'numeron:exportPdf'     // triggers native save dialog, writes PDF to disk
'numeron:openExternal'  // opens links in system browser
'numeron:getVersion'    // returns app version string
'numeron:platform'      // returns win32/darwin/linux
```

### PDF Export
In web app: browser download via blob URL.
In Electron: IPC call to main process → `dialog.showSaveDialog()` → write PDF buffer to disk.

### Auto-update
Using `electron-updater` with a GitHub Releases channel. Show update notification in-app (non-blocking, terminal-style: `> UPDATE AVAILABLE v1.2.0 [INSTALL] [LATER]`).

---

## 9. PDF Report Design

Built with `@react-pdf/renderer`. Target: A4 portrait.

### Typography in PDF
- Headings: Courier (embedded)
- Body: Courier
- Decorative borders: SVG paths, art deco corner ornaments

### Structure
```
Cover .............. Name, date, NUMERON branding, generation date
─────────────────────────────────────────────────
Core Numbers ....... Life Path, Expression, Soul Urge, Personality
                     Each with three-lens interpretation block
─────────────────────────────────────────────────
Timing ............. Personal Year / Month / Day (calculated for today)
─────────────────────────────────────────────────
Correspondences .... Tarot / Planet / Element / Colour / Note table
─────────────────────────────────────────────────
System Comparison .. Three-column table across all systems
─────────────────────────────────────────────────
Karma & Masters .... Only if applicable
─────────────────────────────────────────────────
Decode Result ...... Only if user ran a decode session
─────────────────────────────────────────────────
Disclaimer ......... "For entertainment and cultural exploration only."
```

---

## 10. Data & Privacy

- **No backend.** All calculation is client-side.
- **No user accounts.** No data stored server-side.
- **Local persistence** (Electron only): Zustand state persisted to `electron-store` — profile inputs saved locally so users don't re-enter on relaunch.
- **Web**: No localStorage beyond session — profile clears on tab close. (Keeps it simple and privacy-friendly.)
- **PDF**: Generated client-side, never uploaded.

---

## 11. Content — Interpretations

The interpretations database lives in `packages/core/src/interpretations/`. Each number gets a full content object:

```typescript
const interpretations: Record<number, Interpretation> = {
  1: {
    positive: "Pioneer and originator. Independent will, courage to begin. Natural leadership through example.",
    neutral: "The number of beginnings and individuality. The self differentiated from the whole. The archetypal One.",
    shadow: "Isolation, stubbornness, dominance. The force of will become ego. Difficulty sharing credit or power.",
    keywords: ["independence", "leadership", "originality", "willpower", "solitude"],
    planet: "Sun",
    tarotCard: "The Magician",
    element: "Fire",
    musicalNote: "C (256Hz)",
    color: "Red"
  },
  // ... 2 through 9, 11, 22, 33
};
```

Write interpretations that are:
- Specific enough to feel meaningful
- General enough to be plausible for many people (this is honest about how the Barnum effect works)
- Balanced across all three lenses — avoid the usual "everything is secretly great" trap

---

## 11. Disclaimer System

Disclaimers exist at four levels. Each is calibrated to its context — the persistent banner is brief and in-character, the About page is thorough, the PDF footer is legal-style plain language, the micro-disclaimers are specific and sometimes funny.

### 11.1 Persistent First-Visit Banner

Shown once on first load (web) or first launch (Electron). Stored in `localStorage` / `electron-store` as `disclaimerAcknowledged: true`. Rendered as a terminal prompt in the PHOSPHOR style:

```
┌─────────────────────────────────────────────────────┐
│  > NUMERON v1.2 // INITIALISING                     │
│  > ENTERTAINMENT PURPOSES ONLY                      │
│  > No scientific basis. Not life advice.            │
│  > Digit sums are fun. They are not destiny.        │
│                                                     │
│  > Do you understand?  [ ACKNOWLEDGED ]             │
└─────────────────────────────────────────────────────┘
```

Dismissing with `[ACKNOWLEDGED]` closes the banner. A small `?` icon in the footer re-opens it at any time, linking to the About page.

### 11.2 PDF Report Disclaimer (Every Page Footer)

Small, 8pt, appears on every page of the generated report:

> *This report is generated by NUMERON (Retroverse Studios) for entertainment and cultural exploration only. Numerology has no scientific basis and no demonstrated predictive validity. Nothing in this report constitutes life advice, financial advice, medical advice, career guidance, relationship guidance, or professional advice of any kind. Do not make significant decisions based on the contents of this report. If you are facing a difficult decision, consult a qualified professional or a trusted person in your life. Generated: [date]. numeron.retroversestudios.com*

### 11.3 PDF Report Cover Page Notice

Larger, more prominent, in the ARCANE style that the PDF uses:

> **For Entertainment & Cultural Exploration Only**
> *NUMERON explores numerology as a rich cross-cultural tradition with a fascinating mathematical structure. It is not a predictive system, and this report is not advice of any kind. The digit sum of your name does not determine your future. You do.*

### 11.4 Per-Feature Micro-Disclaimers

Small italic lines rendered beneath specific features. These are part of the UI component spec — each listed component knows which disclaimer tag to render.

| Feature | Micro-disclaimer |
|---|---|
| Life Path number | *Calculation method varies between traditions. See System Comparison for how results differ.* |
| All systems comparison | *These systems produce different results for the same input. There is no agreed method to determine which (if any) is correct.* |
| Personal Year / timing | *Personal timing numbers are entertainment, not scheduling advice.* |
| Compatibility view | *Numerological compatibility has no scientific basis. Please do not break up with anyone over this.* |
| Fine structure constant sidebar | *137 is genuinely mysterious in physics. The numerological framing is entirely ours.* |
| Planck full / 33 sidebar | *We chose 9 significant figures because 33 is more interesting than 2. This is honest cherry-picking.* |
| Sudoku pure-9 certificate | *The maths here is completely real. The cosmic significance is entirely made up.* |
| Any master number (11, 22, 33) | *Master numbers are a Western numerology convention, not present in all traditions.* |
| Karma debt numbers | *"Karma debt" is a metaphor used in some numerology traditions. It is not a statement about your moral character or past lives.* |

---

## 12. Accessibility (a11y)

Not optional — required for a public-facing app.

### Motion
All CRT flicker, glow pulses, Fibonacci clock animation, and page transitions must check `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .crt-flicker, .glow-pulse, .number-count-up,
  .page-transition, .fibonacci-clock-animate {
    animation: none;
    transition: none;
  }
}
```
A manual "Reduce motion" toggle in Settings overrides the system preference for users who can't set it at OS level.

### Colour Independence
The calendar grid, number heatmap in Decode Mode, and Lo Shu overlay all use colour to convey information. Each must have a non-colour fallback:
- Calendar days: number label always visible, colour is supplementary
- Heatmap: pattern fill or number overlay in high-contrast mode
- Lo Shu grid: cell numbers always shown, colour is supplementary
- Correspondences table: colour swatches labelled with colour name in alt text

A **High Contrast Mode** toggle swaps the PHOSPHOR palette for a true-black/white version with no gradients or glow effects.

### Typography & Readability
VT323 and pixel fonts look great but are harder to read at small sizes and for users with dyslexia. A **Readability Toggle** in Settings swaps the body font to `Atkinson Hyperlegible` (Google Fonts) while keeping the terminal chrome aesthetic. This does not affect headings or number displays — just body text and interpretations.

### Keyboard Navigation
All interactive elements reachable and operable by keyboard. Tab order is logical. The three-lens toggle (LIGHT / TRUTH / SHADOW) is operable with arrow keys. The magic square input grid is navigable with arrow keys.

### ARIA
- All `<NumberDisplay>` components: `aria-label="Life Path Number: 7"` etc.
- Reduction trace: `aria-live="polite"` so screen readers announce step-by-step reduction as it animates
- The CRT scanline overlay: `aria-hidden="true"` — purely decorative
- Easter egg messages: `role="alert"` so screen reader users get the joke too

### Screen Reader Testing
Target: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android). Test the profile form, number display, and PDF download flow as minimum viable screen reader paths.

---

## 13. Mobile & Responsive Design

The Electron app is desktop-only. The web app must be usable on mobile — it will get significant mobile traffic from the landing page.

### Breakpoints
```typescript
// Tailwind config additions
screens: {
  'xs': '360px',   // Small phones
  'sm': '640px',   // Large phones / small tablets
  'md': '768px',   // Tablets
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
}
```

### Per-Feature Responsive Behaviour

| Feature | Mobile behaviour |
|---|---|
| Profile form | Single column, full width, large touch targets |
| Core Numbers | Card stack (vertical scroll), not tabs |
| System Comparison | Horizontal scroll table, sticky first column |
| Calendar Grid | Horizontal scroll, 7-column grid minimum |
| Magic Square | Pinch-zoom enabled, minimum cell size 44px |
| Fibonacci Clock | Fixed size 300px circle, centred |
| Sudoku Grid | Pinch-zoom, horizontal scroll fallback |
| Text Decode Heatmap | Word-wrap preserved, colour labels on tap |
| PDF Preview | "Download directly" on mobile — no inline preview |
| Navigation | Hamburger menu below `md` breakpoint |

### Touch Targets
All interactive elements minimum 44×44px per WCAG 2.1 guidelines. The three-lens toggle uses pill buttons, not small tabs, on mobile.

### CRT Effects on Mobile
Scanlines and heavy glow effects are disabled on mobile by default (performance and battery). The PHOSPHOR colour scheme is retained; the decorative effects are not. A toggle in Settings re-enables them for users who want them.

---

## 14. Analytics & Privacy

This is a decision that must be made explicitly and documented.

### Recommended: Plausible Analytics

Plausible is a privacy-respecting analytics provider: no cookies, no personal data collected, no cross-site tracking, GDPR compliant by default. Tracks only: page views, referrer, country, device type, browser.

```html
<!-- In web app <head> -->
<script defer data-domain="numeron.retroversestudios.com"
  src="https://plausible.io/js/script.js"></script>
```

No consent banner required (no cookies, no personal data). No conflict with the privacy stance in the data section.

Custom events worth tracking (all anonymous aggregate counts):
- `profile-generated` — someone completed a full profile
- `pdf-downloaded` — PDF report generated
- `explorer-tab-[name]` — which Explorer tabs get used
- `share-url-copied` — share feature used
- `easter-egg-[name]` — easter eggs discovered (delightful aggregate data)

### Alternative: No Analytics

Completely consistent with the no-backend, no-data-collection positioning. Cleaner. Just means no insight into which features are used. Valid choice for a portfolio piece — document the decision either way.

### Electron App
No analytics in the desktop app. Too invasive for a local application without explicit opt-in. Auto-update check pings GitHub Releases (standard `electron-updater` behaviour, no personal data).

---

## 15. Error States & Edge Cases

The engine must define behaviour for all of these before UI work begins.

### Name Input
| Input | Behaviour |
|---|---|
| Numbers in name (e.g. "2Pac", "Jay-Z") | Digits treated as their face value in Pythagorean/Chaldean; noted with a micro-warning: *"Digits in names are treated as their numeric value, which varies by tradition."* |
| Non-Latin characters (Arabic, Chinese, Cyrillic) | Pythagorean and Chaldean: display a warning: *"Non-Latin characters detected. These systems use Latin letter tables; unsupported characters are skipped."* Kabbalistic and Abjad: handle natively where applicable (Abjad handles Arabic). Show which characters were skipped. |
| Empty name | Disable calculate button, inline validation: `> NAME REQUIRED` |
| Name longer than 100 characters | Accept but display: `> UNUSUALLY LONG NAME DETECTED // calculating anyway` |
| All same letter (e.g. "AAAA") | Valid — triggers easter egg (see 5.12) |
| Symbols only (e.g. "---") | Warning: *"No valid letters detected. Nothing to calculate."* |

### Date of Birth
| Input | Behaviour |
|---|---|
| Future date | Accept with easter egg message (see 5.12), calculate normally |
| Date before 1900 | Accept, no warning — historical profile use is valid |
| Feb 29 in non-leap year | Standard date picker handles this; if raw input, show: `> INVALID DATE` |
| Empty | Disable calculate button |

### Address
| Input | Behaviour |
|---|---|
| No street number (e.g. "The Gables") | Show: *"No street number detected. House number calculation requires a numeric address."* — skip house number, show all other results |
| Unit/apartment (e.g. "4/12 Smith St") | Offer two calculations: unit number alone (4), street number alone (12), combined (16 → 7). Note that traditions differ on which to use. |
| Zero (address 0) | Edge case — calculate as 0, note: *"0 is not a standard numerological number. Some traditions skip reduction at 0; others treat it as 9."* |

### Master Number Handling
Define this explicitly — it affects multiple calculations:
- Master numbers (11, 22, 33) are NOT reduced further when they appear as a **final result**
- Master numbers ARE summed through when they appear as **intermediate steps** in a larger calculation (e.g. summing letters of a name)
- Exception: some traditions also preserve 44, 55, 66, 77, 88, 99 — NUMERON supports only 11/22/33 (document this decision)

### System Differences
When Pythagorean and Chaldean produce different final numbers, display a prominent note:
```
> SYSTEMS DISAGREE
> Pythagorean: 7   Chaldean: 5
> This is normal. The systems use different letter tables.
> See System Comparison for details.
```

---

## 16. Internationalisation (i18n)

Low priority for v1, but decisions made now affect refactoring cost later.

### Non-Latin Name Input
- **Pythagorean / Chaldean**: Latin-only letter tables. Non-Latin input is skipped with a warning. Document this limitation clearly.
- **Abjad**: Designed for Arabic script. The engine should handle Arabic Unicode input natively for this system.
- **Kabbalistic Gematria**: Designed for Hebrew script. Support Hebrew Unicode input for this system.
- **Lo Shu / Vedic**: Name input less central; date of birth drives most calculations. Latin transliterations of non-Latin names are acceptable.

### UI Language
English only for v1. The app structure (React i18n with `react-i18next`) should be set up from the start to allow translation later without refactoring — even if only English strings exist initially. Use translation keys throughout, not hardcoded strings.

### Date Formats
Use the browser/system locale for date display (`Intl.DateTimeFormat`). Internal storage always ISO 8601. The personal year/month/day calculations use the Gregorian calendar — note this limitation for users from traditions using other calendars (Hebrew, Islamic, Chinese lunisolar).

---

## 17. License & Open Source

**Decision required before starting.** Affects GitHub repo visibility, auto-update infrastructure, and landing page.

### Option A: MIT Open Source (Recommended)
Consistent with Michael's other tools (books, TalkBuddy, etc.). Benefits:
- GitHub repo linked from landing page and Retroverse Studios portfolio
- Community can contribute interpretations content, bug fixes, additional cultural systems
- Transparent about the codebase — fits the intellectual honesty brand
- `electron-updater` auto-update via GitHub Releases (free)

### Option B: Closed Source Portfolio Piece
Simpler in the short term. No community contribution. Auto-update needs a separate release server or a private GitHub repo (still works with `electron-updater`). Less consistent with the open, honest framing of the project.

### Recommendation
MIT licence, public GitHub repo at `github.com/retroverse-studios/numeron` (or `michael-borck/numeron`). Interpretations content (the cultural text) also MIT — encourages reuse and adaptation. The repo is itself a portfolio artefact.

---

## 18. Content Completeness Checklist

The spec fully defines data structures and UI, but the **content writing** is a separate, non-trivial task. Estimate 3,000–5,000 words of careful writing, ideally done before Phase 2 (UI) begins so components have real content to render during development.

### Required Content (blocking)

- [ ] Three-lens interpretations for numbers 1–9 (27 interpretation texts)
- [ ] Three-lens interpretations for master numbers 11, 22, 33 (9 interpretation texts)
- [ ] Keywords list for each number (5–8 keywords × 12 numbers)
- [ ] Micro-disclaimer text for all features listed in section 11.4
- [ ] About page full text (section 5.13)
- [ ] Persistent banner text (section 11.1)
- [ ] PDF cover page notice (section 11.3)
- [ ] Compatibility interpretations (for each pairing — 45 unique pairs if all 9 numbers × structured template)

### Required Content (non-blocking, needed before Phase 4)

- [ ] Scientific constants annotation sidebars (section 5.9, Tab 1) — 137, Planck, nines cluster, base-10 note
- [ ] Magic square cultural descriptions — Lo Shu, Dürer, Agrippa, Jupiter
- [ ] Ancient culture context sidebars (section 4.1a) — Babylonian, Hebrew, Chinese, Hindu, Mayan, Norse, Egyptian
- [ ] Famous texts for Decode Mode — 20 curated examples with source notes
- [ ] Famous people life path examples — verify calculations before publishing (these are frequently wrong in other apps)
- [ ] Easter egg messages (section 5.12) — tone-polish pass

### Content Principles
- All interpretations written in present tense, second person ("You are..." / "This number brings...")
- LIGHT lens: strengths as gifts, not achievements — what you're capable of, not what you've done
- TRUTH lens: archetypal and mythological framing — the number as a symbol, not a judgment
- SHADOW lens: honest about difficulty, not catastrophising — "the challenge of this number" not "your fatal flaw"
- Cultural sidebars: factual, sourced where possible, honest about what is documented vs speculative
- No claims stronger than "in this tradition" or "numerologists associate..."

---

## 19. Retroverse Studios Portfolio Integration

### Portfolio Page for NUMERON
When Retroverse Studios builds/updates its portfolio site, NUMERON gets:
- Screenshot carousel (PHOSPHOR and ARCANE modes)
- Tech stack badge strip
- "Download" and "Open" CTAs linking to the deployed app
- Brief design rationale blurb: "We wanted a numerology tool that was honest, beautiful, and weird — the retro terminal aesthetic reflects the idea that numerology is a very old operating system for making meaning."

### NarrativeForge + NUMERON pairing
Both fit a "tools for meaning-making" theme in the portfolio:
- NarrativeForge: *narrative* meaning (story, character, choice)
- NUMERON: *symbolic* meaning (numbers, patterns, archetypes)

Consider a shared portfolio theme: **"Instruments of Meaning"** — Retroverse Studios builds tools that help people make sense of things, wrapped in aesthetics that honour the history of those practices.

---

## 20. Development Phases

### Phase 0 — Content First (1–2 days, before any code)
- Write all three-lens interpretations for numbers 1–9, 11, 22, 33
- Write all cultural sidebar texts for Explorer section
- Write About page content
- Write all micro-disclaimer texts
- Write easter egg messages
- This is a writing task, not a coding task — do it first so components have real content

### Phase 1 — Core Engine (1–2 days)
- `packages/core`: full numerology engine, all five systems
- All calculations with reduction traces
- Edge case handling per section 15 (names with digits, non-Latin, future dates, etc.)
- Master number handling rules documented and implemented
- Magic square validator and analyser
- Sudoku validator and pure-9 properties checker
- Fibonacci mod-9 cycle generator and properties
- Constants table with reduction results
- Kaprekar's constant algorithm
- 100% unit test coverage on all calculations

### Phase 2 — UI Components (2–3 days)
- Design system in `packages/ui`
- All key components including `<NumberDisplay>`, `<ThreeLensToggle>`, `<ReductionTrace>`, `<SystemCompare>`
- PHOSPHOR + ARCANE themes wired up
- Accessibility: `prefers-reduced-motion`, ARIA labels, keyboard nav
- Readability toggle and High Contrast mode
- `react-i18next` scaffolded with English strings

### Phase 3 — Web App Core Pages (2–3 days)
- All profile/calculation routes built and functional
- Profile form with full input validation and edge case messages
- Three-lens toggle live
- System comparison view (five systems)
- Persistent disclaimer banner (first-visit, `[ACKNOWLEDGED]`)
- All per-feature micro-disclaimers in place

### Phase 4 — Constants & Patterns Explorer (2–3 days)
- Tab 1: Scientific constants table + user input + sidebars
- Tab 2: Magic squares — preloaded squares + user analyser + Lo Shu overlay
- Tab 3: Fibonacci clock animation (SVG) + golden ratio spiral
- Tab 4: Sudoku analyser + validator + pure-9 certificate
- Tab 5: Sacred geometry patterns (powers of 2, 142857, Kaprekar, Tesla pattern)

### Phase 5 — Sharing & Easter Eggs (1 day)
- Base64 URL profile encoding/decoding (`/share/:encoded` route)
- Copy-to-clipboard for individual number results
- Static OG card assets for social sharing
- All easter eggs implemented and tested

### Phase 6 — PDF Report (1–2 days)
- Report template built in `@react-pdf/renderer`
- Every-page disclaimer footer
- Cover page notice
- Curiosities appendix page
- Web blob download working

### Phase 7 — Electron Wrapper (1 day)
- Desktop app window + IPC + custom title bar
- `electron-store` local persistence
- Native PDF save dialog
- Auto-update wired to GitHub Releases
- CRT effects disabled on low-power mode

### Phase 8 — PWA & Analytics (0.5 days)
- `vite-plugin-pwa` manifest + service worker
- Plausible analytics snippet (or document the "no analytics" decision)
- Mobile responsive pass — test all pages at 360px, 640px, 768px

### Phase 9 — Landing Page + Polish (1–2 days)
- Landing page with download links and platform detection
- Digit rain background animation (CSS, amber)
- CRT effects, page transitions
- Cross-platform Electron testing (Win/Mac/Linux)
- Screen reader testing (NVDA, VoiceOver)
- Retroverse Studios branding and portfolio link

### Phase 10 — Decode Mode + Extras (2 days)
- Text decode feature + word heatmap
- Personal calendar view
- Reverse lookup (stretch goal)
- Compatibility view (stretch goal)

---

## 21. Open Questions / Design Decisions for Claude Code

1. **Monorepo manager**: pnpm workspaces (recommended) vs Turborepo — decide before starting
2. **Electron + Vite**: use `electron-vite` template to simplify setup
3. **Content first**: complete Phase 0 writing before touching any UI code
4. **License**: MIT open source vs closed portfolio piece — decide before creating GitHub repo (recommendation: MIT, see section 17)
5. **Analytics**: Plausible vs no analytics — decide before Phase 9 (recommendation: Plausible, see section 14)
6. **Music playback**: implement audio tones for number correspondences via Web Audio API? Also: Fibonacci sequence as a melody? Low effort, high delight.
7. **Reverse lookup algorithm**: brute-force over a word list vs combinatoric generator — brute force is simpler and good enough for v1
8. **Famous text dataset**: keep to ~20 curated examples for Decode Mode — quality over quantity
9. **Sudoku generation**: import `sudoku` npm package — don't implement from scratch
10. **Fibonacci clock animation**: SVG recommended over Canvas for crispness at all sizes and accessibility
11. **Kaprekar interactivity**: animated step-by-step (cap at 10 steps) — more satisfying than instant result
12. **Lo Shu overlay with duplicate numbers**: when multiple user numbers map to the same cell, show a count badge and expand on hover/tap
13. **Master number threshold**: support only 11/22/33 (not 44/55/66...) — document this decision visibly in the UI
14. **ARCANE mode PDF vs PHOSPHOR PDF**: PDF always uses ARCANE (more printable) regardless of UI theme setting — confirm this is the right default
15. **Compatibility interpretations**: full 45-pair matrix vs template-driven ("when X meets Y, the result is [combined number]...") — template-driven is far less content to write and more maintainable

---

## 22. Recommended Start in Claude Code

```bash
# Scaffold
pnpm create electron-vite numeron --template react-ts
cd numeron
# Then restructure into monorepo per spec
```

**Do Phase 0 before writing any code.** Open a scratchpad and write the interpretations for numbers 1–9, 11, 22, 33 — all three lenses each. It sounds like the boring part. It isn't. The interpretations are what the app *is*; everything else is scaffolding around them. Starting with real content also means every component has something real to render from day one, which makes development faster and the result better.

After that: `packages/core` first. Get the engine fully tested before touching any UI. The numerology calculations are the ground truth everything else depends on, and bugs there are very hard to find once UI is on top of them.

Suggested first day checklist:
- [ ] Decide: MIT licence, public GitHub repo
- [ ] Decide: Plausible analytics or none
- [ ] Scaffold monorepo with `electron-vite`
- [ ] Start writing interpretations (Phase 0)
- [ ] `packages/core/src/systems/pythagorean.ts` — first calculation, first test

---

*NUMERON — Retroverse Studios*
*Specification v1.2*
