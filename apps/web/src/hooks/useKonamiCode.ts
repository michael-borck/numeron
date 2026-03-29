import { useEffect, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Detect the Konami code (↑↑↓↓←→←→BA) and invoke a callback.
 */
export function useKonamiCode(onActivate: () => void) {
  const positionRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[positionRef.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        positionRef.current++;
        if (positionRef.current === KONAMI_SEQUENCE.length) {
          positionRef.current = 0;
          onActivate();
        }
      } else {
        positionRef.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
}
