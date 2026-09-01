import { cx } from '../../lib/utils';

const GRADIENTS: Record<string, string> = {
  yoga: 'from-brand-300/70 via-brand-400/40 to-grape-400/40',
  meditation: 'from-grape-400/60 via-grape-300/30 to-sun-400/30',
  breathwork: 'from-sun-300/60 via-brand-300/30 to-grape-300/30',
  exercise: 'from-sun-400/60 via-sun-300/30 to-brand-300/30',
};

interface VisualPlaceholderProps {
  type?: keyof typeof GRADIENTS;
  icon?: string;
  className?: string;
  animated?: boolean;
}

export function VisualPlaceholder({ type = 'yoga', icon = '🧘', className, animated = true }: VisualPlaceholderProps) {
  return (
    <div
      className={cx(
        'relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br',
        GRADIENTS[type] ?? GRADIENTS.yoga,
        className,
      )}
      aria-hidden
    >
      <span className={cx('text-4xl', animated && 'animate-float')}>{icon}</span>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
    </div>
  );
}
