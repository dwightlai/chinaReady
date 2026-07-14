interface ProgressProps {
  current: number;
  total: number;
}

export function Progress({ current, total }: ProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
        <span>Question {current} of {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
      <progress
        aria-label={`Question ${current} of ${total}`}
        className="h-1.5 w-full overflow-hidden rounded-full accent-[var(--primary)]"
        max={total}
        value={current}
      />
    </div>
  );
}
