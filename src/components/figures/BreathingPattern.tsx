import { cx } from '../../lib/utils';

export interface BreathPhase {
  kind: 'in' | 'hold' | 'out';
  count: number;
  label?: string;
}

const KIND_STYLE: Record<BreathPhase['kind'], { bg: string; text: string; word: string }> = {
  in: { bg: 'bg-brand-400', text: 'text-brand-700 dark:text-brand-300', word: 'Inhale' },
  hold: { bg: 'bg-grape-400', text: 'text-grape-600 dark:text-grape-400', word: 'Hold' },
  out: { bg: 'bg-sun-400', text: 'text-sun-600 dark:text-sun-500', word: 'Exhale' },
};

/**
 * A compact, legible diagram of a breathing pattern — proportional bars for
 * each phase with its count, so a beginner can see the rhythm at a glance.
 */
export function BreathingPattern({ phases, compact = false }: { phases: BreathPhase[]; compact?: boolean }) {
  const total = phases.reduce((s, p) => s + p.count, 0) || 1;

  return (
    <div className={cx('w-full', compact ? 'px-3 py-2' : 'p-4')}>
      <div className="flex h-9 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }}>
        {phases.map((p, i) => (
          <div
            key={i}
            className={cx('flex items-center justify-center text-[11px] font-bold text-white/95', KIND_STYLE[p.kind].bg)}
            style={{ width: `${(p.count / total) * 100}%` }}
            title={`${KIND_STYLE[p.kind].word} ${p.count}`}
          >
            {p.count}
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {phases.map((p, i) => (
            <span key={i} className={cx('text-xs font-semibold', KIND_STYLE[p.kind].text)}>
              {p.label ?? KIND_STYLE[p.kind].word} · {p.count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
