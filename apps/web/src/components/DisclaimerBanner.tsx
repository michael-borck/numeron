import { DISCLAIMER_BANNER } from '@numeron/core';
import { useStore } from '../store';

export function DisclaimerBanner() {
  const { disclaimerAcknowledged, acknowledgeDisclaimer } = useStore();

  if (disclaimerAcknowledged) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="border border-[var(--accent)] bg-[var(--bg-primary)] p-6 sm:p-8 max-w-lg w-full font-terminal text-sm space-y-3">
        <div className="text-[var(--accent)] text-glow">{DISCLAIMER_BANNER.title}</div>
        {DISCLAIMER_BANNER.lines.map((line, i) => (
          <div key={i} className="text-[var(--text-secondary)]">{line}</div>
        ))}
        <div className="pt-4 flex items-center justify-between">
          <span className="text-[var(--text-secondary)]">{DISCLAIMER_BANNER.prompt}</span>
          <button
            onClick={acknowledgeDisclaimer}
            className="border border-[var(--accent)] text-[var(--accent)] px-4 py-2 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors
              font-terminal text-xs tracking-widest"
          >
            [ {DISCLAIMER_BANNER.buttonText} ]
          </button>
        </div>
      </div>
    </div>
  );
}
