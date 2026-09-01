import { useNavigate } from 'react-router-dom';
import type { RoutineStep } from '../types';
import { totalMinutes } from '../lib/recommend';
import { useStore } from '../lib/store';
import { useToast } from './ui/Toast';
import { TYPE_ICON } from '../data/icons';

interface RecommendationCardProps {
  steps: RoutineStep[];
  onRegenerate: () => void;
  title?: string;
}

export function RecommendationCard({ steps, onRegenerate, title }: RecommendationCardProps) {
  const { saveRoutine } = useStore();
  const { push } = useToast();
  const navigate = useNavigate();
  const minutes = totalMinutes(steps);

  function startRoutine() {
    const id = `rec-${Date.now()}`;
    saveRoutine({ id, name: title ?? `${minutes}-Minute Routine`, steps });
    navigate(`/session/${id}`);
  }

  return (
    <div className="card animate-scale-in relative overflow-hidden p-6">
      <div className="gradient-mesh pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">Recommended for you</p>
        <h3 className="mb-1 text-xl font-extrabold">{title ?? `Your ${minutes}-Minute Routine`}</h3>
        <p className="mb-4 text-sm text-soft">{steps.length} steps · {minutes} min total</p>

        <ol className="mb-5 space-y-2.5">
          {steps.map((s, i) => (
            <li key={`${s.refId}-${i}`} className="flex items-center gap-3 rounded-2xl surface-2 px-3 py-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-500/10 text-base" aria-hidden>
                {TYPE_ICON[s.refType] ?? '✨'}
              </span>
              <span className="flex-1 text-sm font-medium">{s.name}</span>
              <span className="text-xs font-semibold text-soft">{s.minutes} min</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={startRoutine} className="btn-primary focus-ring text-sm">
            ▶️ Start This Routine
          </button>
          <button type="button" onClick={onRegenerate} className="btn-ghost focus-ring text-sm">
            🔄 Show me another
          </button>
          <button
            type="button"
            onClick={() => {
              saveRoutine({ id: `custom-${Date.now()}`, name: title ?? `${minutes}-Minute Routine`, steps });
              push('Saved to your routines', '📋');
            }}
            className="btn-ghost focus-ring text-sm"
          >
            💾 Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
