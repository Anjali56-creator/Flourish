import { useMemo, useState } from 'react';
import { issues } from '../data/issues';
import { IssueCard } from '../components/IssueCard';
import { Chip } from '../components/ui/Chip';
import { CONCERN_ICON } from '../data/icons';

const GROUPS = Array.from(new Set(issues.map((i) => i.group)));

export default function Issues() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string | null>(null);

  const results = useMemo(() => {
    return issues.filter((i) => {
      const matchesQuery = !query.trim() || [i.name, i.blurb, ...i.tags].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesGroup = !group || i.group === group;
      return matchesQuery && matchesGroup;
    });
  }, [query, group]);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">What Do You Need Help With?</h1>
        <p className="text-soft">Browse by concern, body area or lifestyle habit — each opens a full support plan.</p>
      </header>

      <div className="mb-4">
        <input
          type="search"
          className="input"
          placeholder="Search — try “neck” or “sleep”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search issues and goals"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Chip active={group === null} onClick={() => setGroup(null)}>All</Chip>
        {GROUPS.map((g) => (
          <Chip key={g} active={group === g} onClick={() => setGroup(g)}>
            {CONCERN_ICON[g] && <span aria-hidden>{CONCERN_ICON[g]}</span>} {g}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((i) => <IssueCard key={i.id} issue={i} />)}
      </div>

      <p className="mt-10 text-center text-xs text-soft">
        This content offers general wellness and movement education. It does not diagnose or treat any medical condition.
      </p>
    </div>
  );
}
