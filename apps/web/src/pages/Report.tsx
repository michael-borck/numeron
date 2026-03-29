import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { NumeronReport } from '@numeron/pdf';

export function Report() {
  const { profiles, profileInput } = useStore();
  const [generating, setGenerating] = useState(false);

  if (!profiles || !profileInput) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <p className="font-terminal text-sm text-[var(--text-secondary)]">
          {'> '}NO PROFILE LOADED
        </p>
        <Link
          to="/"
          className="inline-block font-terminal text-xs text-[var(--accent)] border border-[var(--accent)]
            px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors"
        >
          [ ENTER DETAILS ]
        </Link>
      </div>
    );
  }

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const blob = await pdf(
        <NumeronReport input={profileInput} profiles={profiles} generatedDate={today} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NUMERON-${profileInput.fullBirthName.replace(/\s+/g, '-')}-${today}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}PDF REPORT
      </h1>

      <TerminalCard title="REPORT PREVIEW">
        <div className="space-y-4">
          <div className="font-body text-sm text-[var(--text-secondary)] space-y-2">
            <p>
              <span className="text-[var(--accent)]">Name:</span>{' '}
              {profileInput.fullBirthName}
            </p>
            <p>
              <span className="text-[var(--accent)]">DOB:</span>{' '}
              {profileInput.dateOfBirth}
            </p>
            <p>
              <span className="text-[var(--accent)]">Life Path:</span>{' '}
              {profiles.pythagorean.lifePath.value}
              {profiles.pythagorean.lifePath.masterNumber ? ' (Master)' : ''}
            </p>
          </div>

          <div className="font-terminal text-xs text-[var(--text-secondary)] space-y-1">
            <p>Report includes:</p>
            <p>{'  '}Cover page with disclaimer</p>
            <p>{'  '}Core numbers with three-lens interpretations</p>
            <p>{'  '}Personal timing (year/month/day)</p>
            <p>{'  '}Correspondences (planet, tarot, element, note, color)</p>
            <p>{'  '}Five-system comparison table</p>
            {profiles.pythagorean.karmaDebt.length > 0 && (
              <p>{'  '}Karma debt numbers</p>
            )}
            {profiles.pythagorean.masterNumbers.length > 0 && (
              <p>{'  '}Master numbers</p>
            )}
            <p>{'  '}Full disclaimer page</p>
          </div>

          <button
            onClick={handleDownload}
            disabled={generating}
            className="w-full border border-[var(--accent)] text-[var(--accent)] font-terminal
              text-sm tracking-widest py-3 min-h-[44px]
              hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors
              disabled:opacity-50 disabled:cursor-wait"
          >
            {generating ? '[ GENERATING... ]' : '[ DOWNLOAD PDF ]'}
          </button>
        </div>
      </TerminalCard>

      <p className="text-xs italic text-[var(--text-secondary)] text-center">
        PDF is generated entirely in your browser. No data is sent to any server.
      </p>
    </div>
  );
}
