interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  tone?: 'accent' | 'success';
}

export function ProgressBar({ value, max, label, tone = 'accent' }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      className={`progress progress--${tone}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={label}
    >
      <span style={{ width: `${percent}%` }} />
    </div>
  );
}
