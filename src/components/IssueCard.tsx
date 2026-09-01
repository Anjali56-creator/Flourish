import { Link } from 'react-router-dom';
import type { Issue } from '../types';
import { concernIcon } from '../data/icons';

export function IssueCard({ issue }: { issue: Issue }) {
  const icon = concernIcon(issue.tags[0] ?? issue.name) !== '•' ? concernIcon(issue.tags[0] ?? issue.name) : concernIcon(issue.group);

  return (
    <Link to={`/issues/${issue.id}`} className="card-hover focus-ring animate-fade-up flex flex-col gap-2 p-5">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/10 text-xl" aria-hidden>{icon}</span>
      <h3 className="mt-1 text-base font-bold leading-snug">{issue.name}</h3>
      <p className="text-sm text-soft line-clamp-2">{issue.blurb}</p>
      <span className="mt-auto pt-2 text-xs font-semibold text-brand-600 dark:text-brand-300">See the {issue.name.toLowerCase()} plan →</span>
    </Link>
  );
}
