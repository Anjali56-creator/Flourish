import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { moodMap } from '../data/moods';
import { findTechnique } from '../data';
import { ProgressRing } from '../components/ui/ProgressRing';
import { EmptyState } from '../components/ui/EmptyState';
import { daysAgoISO, formatMinutes } from '../lib/utils';

const GOAL_LABEL: Record<string, string> = {
  'move-more': 'Move more',
  'sleep-better': 'Sleep better',
  'reduce-stress': 'Reduce stress',
  'improve-flexibility': 'Improve flexibility',
  'build-strength': 'Build strength',
  'improve-posture': 'Improve posture',
};

export default function Progress() {
  const { sessions, moodLogs, favorites, streak, weeklyMinutes, minutesByType, profile } = useStore();

  const last7 = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = daysAgoISO(6 - i);
      const minutes = sessions.filter((s) => s.date === date).reduce((sum, s) => sum + s.minutes, 0);
      const mood = moodLogs.find((m) => m.date === date)?.moodId;
      return { date, minutes, mood };
    });
  }, [sessions, moodLogs]);

  const maxMinutes = Math.max(1, ...last7.map((d) => d.minutes));
  const favoriteTechniques = favorites.map(findTechnique).filter(Boolean).slice(0, 6);

  const sessionCounts = {
    yoga: sessions.filter((s) => s.type === 'yoga').length,
    meditation: sessions.filter((s) => s.type === 'meditation' || s.type === 'breathwork').length,
    exercise: sessions.filter((s) => s.type === 'exercise').length,
    routine: sessions.filter((s) => s.type === 'routine').length,
  };

  const weeklyGoal = 70; // gentle default weekly-minutes target
  const goalProgress = Math.min(1, weeklyMinutes / weeklyGoal);

  return (
    <div className="animate-fade-up">
      <header className="mb-8">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Your Progress</h1>
        <p className="text-soft">A gentle look at how you've been showing up — not a medical tracker.</p>
      </header>

      {sessions.length === 0 && (
        <div className="mb-8">
          <EmptyState
            icon="🌱"
            title="Your progress starts with one session"
            subtitle="Finish any technique, exercise or routine and it shows up here — minutes, streak, mood and all."
            action={<Link to="/dashboard" className="btn-primary focus-ring mt-2">Get today's plan</Link>}
          />
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon="⏱️" label="This week" value={formatMinutes(weeklyMinutes)} />
        <StatCard icon="🔥" label="Streak" value={`${streak} days`} />
        <StatCard icon="🧘" label="Yoga sessions" value={String(sessionCounts.yoga)} />
        <StatCard icon="🌬️" label="Meditation sessions" value={String(sessionCounts.meditation)} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
        <section className="card p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">Weekly active minutes</h2>
          <div className="flex h-40 items-end justify-between gap-2">
            {last7.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end justify-center">
                  <div
                    className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-300 transition-all duration-500"
                    style={{ height: `${Math.max(4, (d.minutes / maxMinutes) * 100)}%` }}
                    aria-label={`${d.minutes} minutes`}
                  />
                </div>
                <span className="text-sm" aria-hidden>{d.mood ? moodMap[d.mood]?.emoji : '·'}</span>
                <span className="text-[10px] text-soft">{new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flex flex-col items-center justify-center gap-3 p-6 text-center">
          <ProgressRing progress={goalProgress} size={120} label={`${Math.round(goalProgress * 100)}%`} sublabel="weekly goal" />
          <p className="text-xs text-soft">{formatMinutes(weeklyMinutes)} of a {formatMinutes(weeklyGoal)} gentle weekly target</p>
        </section>
      </div>

      {profile.weeklyGoals.length > 0 && (
        <section className="mb-8 card p-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">Your weekly goals</h2>
          <div className="flex flex-wrap gap-2">
            {profile.weeklyGoals.map((g) => <span key={g} className="chip chip-active">{GOAL_LABEL[g] ?? g}</span>)}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">Favorite activities</h2>
        {favoriteTechniques.length === 0 ? (
          <EmptyState icon="⭐" title="No favorites yet" subtitle="Heart any technique to see it here." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {favoriteTechniques.map((t) => t && <span key={t.id} className="chip">{t.name}</span>)}
          </div>
        )}
      </section>

      <section className="card p-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">Session breakdown</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(['yoga', 'meditation', 'breathwork', 'exercise'] as const).map((k) => (
            <div key={k} className="text-center">
              <p className="text-2xl font-extrabold">{formatMinutes(minutesByType[k] ?? 0)}</p>
              <p className="text-xs capitalize text-soft">{k}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card p-4 text-center">
      <span className="mb-1 block text-2xl" aria-hidden>{icon}</span>
      <p className="text-lg font-extrabold">{value}</p>
      <p className="text-xs text-soft">{label}</p>
    </div>
  );
}
