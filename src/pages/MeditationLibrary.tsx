import { useMemo, useState } from 'react';
import { meditation } from '../data/meditation';
import { TechniqueCard } from '../components/TechniqueCard';
import { FilterPanel } from '../components/FilterPanel';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { useBriefLoading } from '../lib/useBriefLoading';

const FILTER_GROUPS = [
  { label: 'Level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { label: 'Category', options: ['Stress relief', 'Relaxation', 'Focus', 'Sleep', 'Morning', 'Anxiety support', 'Emotional regulation', 'Productivity', 'Mindfulness'] },
];

export default function MeditationLibrary() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string[]>([]);
  const loading = useBriefLoading();

  function toggle(opt: string) {
    setActive((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  }

  const results = useMemo(() => {
    return meditation.filter((m) => {
      const matchesQuery = !query.trim() || [m.name, m.category, ...m.tags].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesFilters = active.every((f) => f === m.difficulty || m.category === f);
      return matchesQuery && (active.length === 0 || matchesFilters);
    });
  }, [query, active]);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Meditation & Breathwork Library</h1>
        <p className="text-soft">{meditation.length}+ guided techniques for focus, sleep, anxiety support and calm.</p>
      </header>

      <div className="mb-6">
        <input
          type="search"
          className="input"
          placeholder="Search — try “sleep” or “before studying”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search meditation and breathwork techniques"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FilterPanel groups={FILTER_GROUPS} active={active} onToggle={toggle} onClear={() => setActive([])} />
        </div>
        <div>
          <p className="mb-3 text-sm text-soft">{loading ? 'Loading techniques…' : `${results.length} ${results.length === 1 ? 'technique' : 'techniques'}`}</p>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : results.length === 0 ? (
            <EmptyState
              icon="🌬️"
              title={query ? `No techniques match “${query}”` : 'No techniques match those filters'}
              subtitle="Try a different word, or clear a filter to see more."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((m) => <TechniqueCard key={m.id} technique={m} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
