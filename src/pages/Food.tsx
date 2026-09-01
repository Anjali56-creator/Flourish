import { useMemo, useState } from 'react';
import { foods } from '../data/foods';
import { FoodCard } from '../components/FoodCard';
import { Chip } from '../components/ui/Chip';
import { EmptyState } from '../components/ui/EmptyState';

const GROUPS = ['Energy', 'Wellness', 'Lifestyle'] as const;

export default function Food() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<(typeof GROUPS)[number] | null>(null);

  const results = useMemo(() => {
    return foods.filter((f) => {
      const matchesQuery = !query.trim() || [f.name, f.category, ...f.tags].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesGroup = !group || f.group === group;
      return matchesQuery && matchesGroup;
    });
  }, [query, group]);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Food & Nutrition</h1>
        <p className="text-soft">Simple, realistic food ideas for energy, wellness and everyday life — not medical advice.</p>
      </header>

      <div className="mb-4">
        <input
          type="search"
          className="input"
          placeholder="Search foods — try “protein” or “budget”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search foods"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Chip active={group === null} onClick={() => setGroup(null)}>All</Chip>
        {GROUPS.map((g) => (
          <Chip key={g} active={group === g} onClick={() => setGroup(g)}>{g}</Chip>
        ))}
      </div>

      {results.length === 0 ? (
        <EmptyState icon="🥗" title="No foods match yet" subtitle="Try a different search or category." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((f) => <FoodCard key={f.id} food={f} />)}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-soft">
        Nutrition values are approximate and for general wellness guidance only — not a substitute for professional dietary advice.
      </p>
    </div>
  );
}
