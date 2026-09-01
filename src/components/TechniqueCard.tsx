import { Link } from 'react-router-dom';
import type { Technique } from '../types';
import { useStore } from '../lib/store';
import { useToast } from './ui/Toast';
import { Figure } from './figures/Figure';
import { DIFFICULTY_ICON } from '../data/icons';
import { cx } from '../lib/utils';

export function TechniqueCard({ technique }: { technique: Technique }) {
  const { isFavorite, toggleFavorite, addToDraft } = useStore();
  const { push } = useToast();
  const fav = isFavorite(technique.id);
  const isBreath = technique.type === 'breathwork';

  return (
    <div className="card-hover animate-fade-up group relative flex flex-col overflow-hidden p-3.5">
      <Link to={`/session/${technique.id}`} className="focus-ring block rounded-2xl" aria-label={`Start a guided session for ${technique.name}`}>
        <Figure item={technique} className="mb-3" />
      </Link>

      <button
        type="button"
        onClick={() => {
          toggleFavorite(technique.id);
          push(fav ? 'Removed from favorites' : 'Saved to favorites', fav ? '🤍' : '❤️');
        }}
        aria-pressed={fav}
        aria-label={fav ? `Remove ${technique.name} from favorites` : `Save ${technique.name} to favorites`}
        className="focus-ring absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-base backdrop-blur transition-transform hover:scale-110"
        style={{ background: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}
      >
        <span className={cx(fav && 'animate-pop')}>{fav ? '❤️' : '🤍'}</span>
      </button>

      <Link to={`/session/${technique.id}`} className="focus-ring rounded-lg">
        <h3 className="mb-1.5 text-[15px] font-bold leading-snug">{technique.name}</h3>
      </Link>

      <div className="mb-2 flex flex-wrap gap-1.5 text-[11px]">
        <span className="chip !gap-1 !px-2 !py-1">{DIFFICULTY_ICON[technique.difficulty]} {technique.difficulty}</span>
        <span className="chip !gap-1 !px-2 !py-1">⏱️ {isBreath ? `${technique.duration} min` : `${technique.duration} min`}</span>
        {technique.targetAreas[0] && <span className="chip !gap-1 !px-2 !py-1">🎯 {technique.targetAreas[0]}</span>}
      </div>

      <p className="mb-3 text-[13px] text-soft line-clamp-2">{technique.benefits[0]}</p>

      <div className="mt-auto space-y-2">
        <Link to={`/session/${technique.id}`} className="btn-primary focus-ring w-full !py-2 text-xs">
          ▶ Start {isBreath ? 'Breathing' : technique.type === 'yoga' ? 'Pose' : 'Session'}
        </Link>
        <div className="flex gap-2">
          <Link to={`/technique/${technique.id}`} className="btn-ghost focus-ring flex-1 !py-2 text-xs">
            Details
          </Link>
          <button
            type="button"
            onClick={() => {
              addToDraft({ refId: technique.id, refType: technique.type, name: technique.name, minutes: technique.duration });
              push(`${technique.name} added to your routine`, '➕');
            }}
            aria-label={`Add ${technique.name} to your routine`}
            className="btn-ghost focus-ring !px-3 !py-2 text-xs"
          >
            + Routine
          </button>
        </div>
      </div>
    </div>
  );
}
