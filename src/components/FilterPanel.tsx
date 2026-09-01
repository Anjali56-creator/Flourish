import { useState } from 'react';
import { Chip } from './ui/Chip';
import { FOCUS_ICON } from '../data/icons';
import { cx } from '../lib/utils';

interface FilterPanelProps {
  groups: { label: string; options: string[] }[];
  active: string[];
  onToggle: (option: string) => void;
  onClear?: () => void;
}

export function FilterPanel({ groups, active, onToggle, onClear }: FilterPanelProps) {
  // Collapsed by default on mobile so the list isn't buried; always open on desktop via CSS.
  const [open, setOpen] = useState(false);

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="focus-ring flex items-center gap-2 text-sm font-bold lg:pointer-events-none"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span aria-hidden>⚙️</span> Filters
          {active.length > 0 && <span className="chip chip-active !px-2 !py-0.5 !text-[11px]">{active.length}</span>}
          <span className="lg:hidden" aria-hidden>{open ? '▲' : '▼'}</span>
        </button>
        {active.length > 0 && onClear && (
          <button type="button" onClick={onClear} className="focus-ring text-xs font-semibold text-brand-600 dark:text-brand-300">
            Clear all
          </button>
        )}
      </div>

      <div className={cx('mt-3 space-y-3 lg:block', open ? 'block' : 'hidden')}>
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-soft">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.options.map((opt) => (
                <Chip key={opt} active={active.includes(opt)} onClick={() => onToggle(opt)}>
                  {FOCUS_ICON[opt] && <span aria-hidden>{FOCUS_ICON[opt]}</span>} {opt}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
