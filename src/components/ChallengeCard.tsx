import type { Challenge } from '../types';
import { useStore } from '../lib/store';
import { useToast } from './ui/Toast';
import { cx } from '../lib/utils';

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { challengesDone, completeChallenge } = useStore();
  const { push } = useToast();
  const done = challengesDone.includes(challenge.id);

  return (
    <div className={cx('card-hover animate-fade-up flex flex-col p-5', done && 'opacity-70')}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-3xl" aria-hidden>{challenge.icon}</span>
        <span className="chip !py-1 !text-[11px]">+{challenge.xp} XP</span>
      </div>
      <h3 className="mb-1 text-base font-bold leading-snug">{challenge.name}</h3>
      <p className="mb-3 text-sm text-soft">{challenge.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-soft">{challenge.durationLabel}</span>
        <button
          type="button"
          disabled={done}
          onClick={() => {
            completeChallenge(challenge.id, challenge.xp);
            push(`Nice! +${challenge.xp} XP earned`, '🎉');
          }}
          className={cx('btn-primary focus-ring !px-4 !py-2 text-xs', done && '!bg-brand-200 dark:!bg-brand-900')}
        >
          {done ? 'Completed ✓' : 'Mark Complete'}
        </button>
      </div>
    </div>
  );
}
