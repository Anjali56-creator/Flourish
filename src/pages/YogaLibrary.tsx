import { useMemo, useState } from 'react';
import { yoga } from '../data/yoga';
import { TechniqueCard } from '../components/TechniqueCard';
import { FilterPanel } from '../components/FilterPanel';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { useBriefLoading } from '../lib/useBriefLoading';

const FILTER_GROUPS = [
  { label: 'Level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { label: 'Focus', options: ['Flexibility', 'Mobility', 'Relaxation', 'Strength', 'Balance', 'Posture', 'Recovery'] },
  { label: 'Time of day', options: ['Morning', 'Evening', 'Desk break'] },
];

export default function YogaLibrary() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string[]>([]);
  const loading = useBriefLoading();

  function toggle(opt: string) {
    setActive((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  }

  const results = useMemo(() => {
    return yoga.filter((y) => {
      const matchesQuery = !query.trim() || [y.name, y.category, ...y.tags, ...y.targetAreas].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesFilters = active.every((f) => f === y.difficulty || y.tags.includes(f) || y.category === f);
      return matchesQuery && (active.length === 0 || matchesFilters);
    });
  }, [query, active]);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Yoga Library</h1>
        <p className="text-soft">{yoga.length}+ real, widely-taught poses and sequences — searchable and filterable.</p>
      </header>

      <div className="mb-6">
        <input
          type="search"
          className="input"
          placeholder="Search poses — try “hip” or “backbend”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search yoga poses"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FilterPanel groups={FILTER_GROUPS} active={active} onToggle={toggle} onClear={() => setActive([])} />
        </div>
        <div>
          <p className="mb-3 text-sm text-soft">{loading ? 'Loading poses…' : `${results.length} ${results.length === 1 ? 'pose' : 'poses'}`}</p>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : results.length === 0 ? (
            <EmptyState
              icon="🧘"
              title={query ? `No poses match “${query}”` : 'No poses match those filters'}
              subtitle="Try a different word, or clear a filter to see more."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((y) => <TechniqueCard key={y.id} technique={y} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
