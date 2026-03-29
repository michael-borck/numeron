import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { parseSharePayload } from '@numeron/core';
import { useStore } from '../store';

export function Share() {
  const { encoded } = useParams<{ encoded: string }>();
  const navigate = useNavigate();
  const { generateProfiles, profileInput } = useStore();

  useEffect(() => {
    if (!encoded) return;

    const input = parseSharePayload(encoded);
    if (input) {
      generateProfiles(input);
      navigate('/profile', { replace: true });
    }
  }, [encoded, generateProfiles, navigate]);

  // If we're still here, the payload was invalid
  if (!encoded || !profileInput) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <p className="font-terminal text-sm text-[var(--accent)]">
          {'> '}INVALID SHARE LINK
        </p>
        <p className="font-body text-xs text-[var(--text-secondary)]">
          The encoded profile data could not be parsed. It may be corrupted or incomplete.
        </p>
        <Link
          to="/"
          className="inline-block font-terminal text-xs text-[var(--accent)] border border-[var(--accent)]
            px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
        >
          [ START FRESH ]
        </Link>
      </div>
    );
  }

  return null;
}
