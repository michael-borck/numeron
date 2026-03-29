import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { TerminalCard } from '../components/TerminalCard';
import { pythagorean, interpretations, microDisclaimers } from '@numeron/core';

const NUMBER_COLORS: Record<number, string> = {
  1: 'text-red-400',
  2: 'text-orange-400',
  3: 'text-yellow-400',
  4: 'text-green-400',
  5: 'text-blue-400',
  6: 'text-indigo-400',
  7: 'text-violet-400',
  8: 'text-pink-400',
  9: 'text-amber-400',
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar() {
  const { profileInput, profiles } = useStore();
  const [monthOffset, setMonthOffset] = useState(0);

  if (!profileInput || !profiles) {
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

  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = viewDate.toLocaleString('en', { month: 'long', year: 'numeric' });

  const lifePathValue = profiles.pythagorean.lifePath.value;

  // Generate personal day numbers for each day
  const days: { day: number; personalDay: number; isPowerDay: boolean }[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const pd = pythagorean.personalDay(profileInput.dateOfBirth, dateStr);
    days.push({
      day: d,
      personalDay: pd.value,
      isPowerDay: pd.value === lifePathValue,
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-terminal text-2xl text-[var(--accent)] text-glow">
        {'> '}PERSONAL CALENDAR
      </h1>

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMonthOffset((o) => o - 1)}
          className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
            min-h-[44px] px-3 transition-colors"
        >
          [ PREV ]
        </button>
        <span className="font-terminal text-lg text-[var(--accent)]">{monthName}</span>
        <button
          onClick={() => setMonthOffset((o) => o + 1)}
          className="font-terminal text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]
            min-h-[44px] px-3 transition-colors"
        >
          [ NEXT ]
        </button>
      </div>

      {/* Calendar grid */}
      <TerminalCard>
        <div className="grid grid-cols-7 gap-1">
          {/* Day name headers */}
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="font-terminal text-xs text-[var(--text-secondary)] text-center py-1"
            >
              {d}
            </div>
          ))}

          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {days.map((d) => {
            const interp = interpretations[d.personalDay];
            const keyword = interp?.keywords[0] ?? '';
            return (
              <div
                key={d.day}
                className={`
                  border p-1.5 sm:p-2 text-center min-h-[60px] sm:min-h-[72px] flex flex-col justify-between
                  ${d.isPowerDay ? 'border-[var(--accent)] bg-[var(--accent)] bg-opacity-5' : 'border-[var(--border)]'}
                `}
                title={`Day ${d.day}: Personal Day ${d.personalDay}${d.isPowerDay ? ' (power day)' : ''}`}
              >
                <span className="font-terminal text-xs text-[var(--text-secondary)]">
                  {d.day}
                </span>
                <span
                  className={`font-terminal text-lg ${NUMBER_COLORS[d.personalDay] ?? 'text-[var(--accent)]'}`}
                >
                  {d.personalDay}
                </span>
                <span className="text-[8px] sm:text-[10px] text-[var(--text-secondary)] truncate">
                  {keyword}
                </span>
              </div>
            );
          })}
        </div>
      </TerminalCard>

      {/* Legend */}
      <TerminalCard title="LEGEND">
        <div className="space-y-2">
          <p className="text-xs text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">Highlighted border</span> = power day (personal
            day matches your Life Path {lifePathValue})
          </p>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className={`font-terminal text-sm ${NUMBER_COLORS[n]}`}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </TerminalCard>

      <p className="text-xs italic text-[var(--text-secondary)]">
        {microDisclaimers.personalTiming}
      </p>
    </div>
  );
}
