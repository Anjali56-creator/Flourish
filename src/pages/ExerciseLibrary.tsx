import { useMemo, useState } from 'react';
import { exercises } from '../data/exercises';
import { presetRoutines } from '../data/routines';
import { ExerciseCard } from '../components/ExerciseCard';
import { FilterPanel } from '../components/FilterPanel';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import { useBriefLoading } from '../lib/useBriefLoading';
import { Link } from 'react-router-dom';

const FILTER_GROUPS = [
  { label: 'Level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { label: 'Focus', options: ['Full body', 'Strength', 'Mobility', 'Flexibility', 'Cardio', 'Core', 'Legs', 'Upper body', 'Posture'] },
  { label: 'Setting', options: ['Desk workouts', 'Home workouts', 'No-equipment', 'Recovery'] },
];

export default function ExerciseLibrary() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string[]>([]);
  const loading = useBriefLoading();

  function toggle(opt: string) {
    setActive((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  }

  const results = useMemo(() => {
    return exercises.filter((e) => {
      const matchesQuery = !query.trim() || [e.name, e.category, ...e.tags, ...e.targetMuscles].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesFilters = active.every((f) => f === e.difficulty || e.tags.includes(f) || e.category === f);
      return matchesQuery && (active.length === 0 || matchesFilters);
    });
  }, [query, active]);

  const quickRoutines = presetRoutines.slice(0, 8);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Exercise Hub</h1>
        <p className="text-soft">Modern, no-fluff strength, mobility and cardio moves you can do almost anywhere.</p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">Quick routines</h2>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {quickRoutines.map((r) => (
            <Link
              key={r.id}
              to="/routines"
              className="card-hover focus-ring w-56 shrink-0 p-4"
            >
              <p className="mb-1 text-sm font-bold">{r.name}</p>
              <p className="text-xs text-soft">{r.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mb-6">
        <input
          type="search"
          className="input"
          placeholder="Search exercises — try “core” or “no equipment”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search exercises"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FilterPanel groups={FILTER_GROUPS} active={active} onToggle={toggle} onClear={() => setActive([])} />
        </div>
        <div>
          <p className="mb-3 text-sm text-soft">{loading ? 'Loading exercises…' : `${results.length} ${results.length === 1 ? 'exercise' : 'exercises'}`}</p>
          {loading ? (
            <SkeletonGrid count={6} />
          ) : results.length === 0 ? (
            <EmptyState
              icon="💪"
              title={query ? `No exercises match “${query}”` : 'No exercises match those filters'}
              subtitle="Try a different word, or clear a filter to see more."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((e) => <ExerciseCard key={e.id} exercise={e} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
