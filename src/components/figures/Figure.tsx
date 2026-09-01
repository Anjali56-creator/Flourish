import { cx } from '../../lib/utils';
import { resolveFigure } from '../../data/figureMap';
import { POSE_ART } from './poseArt';
import { GenericFigure } from './GenericFigure';
import { BreathingPattern } from './BreathingPattern';

const TINT: Record<string, string> = {
  yoga: 'from-brand-200/70 to-brand-300/30 dark:from-brand-500/20 dark:to-brand-400/5',
  meditation: 'from-grape-300/50 to-grape-400/20 dark:from-grape-500/20 dark:to-grape-400/5',
  breathwork: 'from-sun-200/60 to-brand-200/30 dark:from-sun-500/15 dark:to-brand-400/5',
  exercise: 'from-sun-300/55 to-sun-400/20 dark:from-sun-500/20 dark:to-sun-400/5',
};

const TYPE_BADGE: Record<string, { icon: string; label: string }> = {
  yoga: { icon: '🧘', label: 'Yoga' },
  meditation: { icon: '🧠', label: 'Meditation' },
  breathwork: { icon: '🌬️', label: 'Breathwork' },
  exercise: { icon: '💪', label: 'Exercise' },
};

interface FigureItem {
  id: string;
  type?: string;
  targetAreas?: string[];
  targetMuscles?: string[];
}

interface FigureProps {
  item: FigureItem;
  /** visual weight: card thumbnail vs large detail header */
  size?: 'card' | 'hero';
  className?: string;
  showBadge?: boolean;
}

export function Figure({ item, size = 'card', className, showBadge = true }: FigureProps) {
  const resolved = resolveFigure(item);
  const type = (item.type ?? 'yoga') as keyof typeof TINT;
  const badge = TYPE_BADGE[type] ?? TYPE_BADGE.yoga;

  return (
    <div
      className={cx(
        'relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br',
        TINT[type] ?? TINT.yoga,
        size === 'hero' ? 'aspect-[16/9]' : 'aspect-[4/3]',
        className,
      )}
    >
      {resolved.kind === 'breath' ? (
        <div className="w-full max-w-sm px-2">
          <BreathingPattern phases={resolved.phases} compact={size === 'card'} />
        </div>
      ) : (
        <svg
          viewBox="0 0 240 170"
          className={cx('h-full w-full text-slate-700 dark:text-white/90', size === 'hero' ? 'p-4' : 'p-3')}
          role="img"
          aria-label={resolved.kind === 'pose' ? `Illustration of the ${resolved.poseKey.replace(/-/g, ' ')} position` : 'Illustration of the target body area'}
          preserveAspectRatio="xMidYMid meet"
        >
          {resolved.kind === 'pose' ? POSE_ART[resolved.poseKey] : <GenericFigure targets={resolved.targets} />}
        </svg>
      )}

      {showBadge && (
        <span
          className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur"
          style={{ background: 'color-mix(in srgb, var(--surface) 78%, transparent)' }}
        >
          <span aria-hidden>{badge.icon}</span>
          {badge.label}
        </span>
      )}
    </div>
  );
}
