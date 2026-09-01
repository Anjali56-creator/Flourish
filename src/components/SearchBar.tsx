import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalSearch, type SearchResult } from '../lib/search';
import { cx } from '../lib/utils';

const KIND_ICON: Record<SearchResult['kind'], string> = {
  yoga: '🧘',
  meditation: '🌬️',
  breathwork: '🌬️',
  exercise: '💪',
  food: '🥗',
  issue: '🎯',
  routine: '📋',
};

export function SearchBar({ autoFocus = false, onNavigate }: { autoFocus?: boolean; onNavigate?: () => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const results = query.trim() ? globalSearch(query) : [];

  function go(r: SearchResult) {
    navigate(r.href);
    setQuery('');
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-soft" aria-hidden>
          🔍
        </span>
        <input
          ref={inputRef}
          type="search"
          className="input pl-11"
          placeholder="What are you looking for? Try “shoulder” or “10 minute workout”"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
          aria-label="Search yoga, meditation, exercises, food and routines"
        />
      </div>
      {open && query.trim() && (
        <div
          className="absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-2xl border shadow-lift animate-scale-in"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          role="listbox"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-soft">No matches yet — try a different word.</p>
          ) : (
            results.map((r) => (
              <button
                key={`${r.kind}-${r.id}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(r)}
                className={cx(
                  'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-brand-50 dark:hover:bg-white/5',
                )}
              >
                <span aria-hidden>{KIND_ICON[r.kind]}</span>
                <span className="flex-1">
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-xs text-soft">{r.subtitle}</span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
