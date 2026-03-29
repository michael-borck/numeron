interface ReductionTraceProps {
  steps: string[];
}

export function ReductionTrace({ steps }: ReductionTraceProps) {
  return (
    <div
      className="font-body text-sm text-[var(--text-secondary)] space-y-1 pl-2 border-l border-[var(--border)]"
      aria-live="polite"
      aria-label="Reduction steps"
    >
      {steps.map((step, i) => (
        <div key={i} className="font-mono">
          <span className="text-[var(--accent)] opacity-50 mr-2">{'>'}</span>
          {step}
        </div>
      ))}
    </div>
  );
}
