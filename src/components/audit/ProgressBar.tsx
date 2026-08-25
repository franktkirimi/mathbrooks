interface ProgressBarProps {
  answeredCount: number;
  totalCount: number;
}

const ProgressBar = ({ answeredCount, totalCount }: ProgressBarProps) => {
  const percent = totalCount > 0 ? Math.min(100, Math.round((answeredCount / totalCount) * 100)) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          Question {Math.min(answeredCount + 1, totalCount)} of {totalCount}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
