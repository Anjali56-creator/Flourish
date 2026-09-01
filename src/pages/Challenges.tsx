import { challenges } from '../data/challenges';
import { ChallengeCard } from '../components/ChallengeCard';
import { useStore } from '../lib/store';
import { getLevel } from '../data/levels';
import { ProgressRing } from '../components/ui/ProgressRing';

export default function Challenges() {
  const { xp, challengesDone, streak } = useStore();
  const { current, next, progress } = getLevel(xp);

  return (
    <div className="animate-fade-up">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="font-display mb-2 text-3xl font-extrabold">Daily Challenges</h1>
          <p className="text-soft">Small, achievable wins that build XP and your streak.</p>
        </div>
        <div className="card flex items-center gap-4 p-4">
          <ProgressRing progress={progress} size={80} stroke={8} label={current.icon} sublabel={current.name} />
          <div>
            <p className="text-sm font-bold">{xp} XP</p>
            <p className="text-xs text-soft">{next ? `${next.minXp - xp} XP to ${next.name}` : 'Max level!'}</p>
            <p className="mt-1 text-xs text-soft">🔥 {streak} day streak</p>
          </div>
        </div>
      </header>

      <p className="mb-4 text-sm text-soft">{challengesDone.length} / {challenges.length} completed</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
      </div>
    </div>
  );
}
