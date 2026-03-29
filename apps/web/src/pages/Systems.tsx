import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { SystemCompare } from '../components/SystemCompare';
import { culturalContexts } from '@numeron/core';

export function Systems() {
  const { profiles } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}SYSTEM COMPARISON
      </h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Five traditions, five different letter tables, five different answers. This is the point.
      </p>

      {profiles ? (
        <TerminalCard title="YOUR NUMBERS ACROSS SYSTEMS">
          <SystemCompare profiles={profiles} />
        </TerminalCard>
      ) : (
        <TerminalCard>
          <p className="font-terminal text-sm text-[var(--text-secondary)]">
            {'> '}Enter your details on the{' '}
            <Link to="/" className="text-[var(--accent)] hover:underline">
              home page
            </Link>{' '}
            to see your numbers across all five systems.
          </p>
        </TerminalCard>
      )}

      {/* Cultural contexts */}
      <h2 className="font-terminal text-lg text-[var(--accent)]">{'> '}TRADITIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {culturalContexts.map((ctx) => (
          <TerminalCard key={ctx.system} title={`${ctx.title} (${ctx.period})`}>
            <div className="font-body text-sm text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
              {ctx.body}
            </div>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
