import { moods } from '../data/moods';
import { cx } from '../lib/utils';

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (moodId: string) => void;
  className?: string;
}

export function MoodSelector({ selected, onSelect, className }: MoodSelectorProps) {
  return (
    <div className={cx('grid grid-cols-3 gap-2.5 sm:grid-cols-5', className)} role="group" aria-label="How are you feeling today?">
      {moods.map((m) => {
        const active = selected === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={active}
            className={cx(
              'card-hover focus-ring flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 text-center transition-all',
              active && 'ring-2 ring-offset-2',
            )}
            style={active ? ({ borderColor: m.color, '--tw-ring-color': m.color, '--tw-ring-offset-color': 'var(--bg)' } as React.CSSProperties) : undefined}
          >
            <span className={cx('text-2xl', active && 'animate-pop')} aria-hidden>{m.emoji}</span>
            <span className="text-xs font-semibold">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
