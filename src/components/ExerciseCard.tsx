import { Link } from 'react-router-dom';
import type { Exercise } from '../types';
import { useStore } from '../lib/store';
import { useToast } from './ui/Toast';
import { Figure } from './figures/Figure';
import { benefitFor } from '../data/exerciseBenefits';
import { DIFFICULTY_ICON } from '../data/icons';
import { cx } from '../lib/utils';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { addToDraft, isFavorite, toggleFavorite } = useStore();
  const { push } = useToast();
  const fav = isFavorite(exercise.id);

  return (
    <div className="card-hover animate-fade-up group relative flex flex-col overflow-hidden p-3.5">
      <Link to={`/session/${exercise.id}`} className="focus-ring block rounded-2xl" aria-label={`Start a guided session for ${exercise.name}`}>
        <Figure item={{ ...exercise, type: 'exercise' }} className="mb-3" />
      </Link>

      <button
        type="button"
        onClick={() => {
          toggleFavorite(exercise.id);
          push(fav ? 'Removed from favorites' : 'Saved to favorites', fav ? '🤍' : '❤️');
        }}
        aria-pressed={fav}
        aria-label={fav ? `Remove ${exercise.name} from favorites` : `Save ${exercise.name} to favorites`}
        className="focus-ring absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-base backdrop-blur transition-transform hover:scale-110"
        style={{ background: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}
      >
        <span className={cx(fav && 'animate-pop')}>{fav ? '❤️' : '🤍'}</span>
      </button>

      <Link to={`/session/${exercise.id}`} className="focus-ring rounded-lg">
        <h3 className="mb-1.5 text-[15px] font-bold leading-snug">{exercise.name}</h3>
      </Link>

      <div className="mb-2 flex flex-wrap gap-1.5 text-[11px]">
        <span className="chip !gap-1 !px-2 !py-1">{DIFFICULTY_ICON[exercise.difficulty]} {exercise.difficulty}</span>
        <span className="chip !gap-1 !px-2 !py-1">🔁 {exercise.dose}</span>
        {exercise.targetMuscles[0] && <span className="chip !gap-1 !px-2 !py-1">🎯 {exercise.targetMuscles[0]}</span>}
      </div>

      <p className="mb-3 text-[13px] text-soft line-clamp-2">{benefitFor(exercise.id)}</p>

      <div className="mt-auto space-y-2">
        <Link to={`/session/${exercise.id}`} className="btn-primary focus-ring w-full !py-2 text-xs">
          ▶ Start Exercise
        </Link>
        <div className="flex gap-2">
          <Link to={`/exercise/${exercise.id}`} className="btn-ghost focus-ring flex-1 !py-2 text-xs">
            Details
          </Link>
          <button
            type="button"
            onClick={() => {
              addToDraft({ refId: exercise.id, refType: 'exercise', name: exercise.name, minutes: exercise.duration });
              push(`${exercise.name} added to your workout`, '➕');
            }}
            aria-label={`Add ${exercise.name} to your workout`}
            className="btn-ghost focus-ring !px-3 !py-2 text-xs"
          >
            + Workout
          </button>
        </div>
      </div>
    </div>
  );
}
