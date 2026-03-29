import type { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function TerminalCard({ title, children, className = '', glowOnHover = true }: TerminalCardProps) {
  return (
    <div
      className={`
        relative border border-[var(--border)] bg-[var(--bg-secondary)]
        p-4 sm:p-6
        ${glowOnHover ? 'transition-shadow hover:border-glow' : ''}
        ${className}
      `}
    >
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

      {title && (
        <h3 className="font-terminal text-sm tracking-wider text-[var(--text-secondary)] mb-3 uppercase">
          {'> '}{title}
        </h3>
      )}
      {children}
    </div>
  );
}
