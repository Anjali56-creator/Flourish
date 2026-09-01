import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { MoodSelector } from '../components/MoodSelector';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { buildRoutine } from '../lib/recommend';
import { getLevel } from '../data/levels';
import { moodMap } from '../data/moods';
import { formatMinutes } from '../lib/utils';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard() {
  const { profile, todayMood, logMood, xp, streak, weeklyMinutes, routines, sessions } = useStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const { current } = getLevel(xp);

  const plan = useMemo(() => buildRoutine({ moodId: todayMood, minutes: 25 }), [todayMood, refreshKey]);
  const todaysSessions = sessions.filter((s) => s.date === new Date().toISOString().slice(0, 10));
  const favoriteRoutines = routines.filter((r) => r.preset).slice(0, 3);

  return (
    <div className="animate-fade-up">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-soft">{greeting()},</p>
          <h1 className="font-display text-3xl font-extrabold">{profile.name || 'there'} {current.icon}</h1>
        </div>
        <div className="card flex items-center gap-3 px-4 py-3">
          <ProgressRing progress={Math.min(1, weeklyMinutes / 70)} size={56} stroke={6} />
          <div>
            <p className="text-sm font-bold">🔥 {streak}-day streak</p>
            <p className="text-xs text-soft">{formatMinutes(weeklyMinutes)} this week</p>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Today's vibe</h2>
        <MoodSelector selected={todayMood} onSelect={(m) => { logMood(m); setRefreshKey((k) => k + 1); }} />
        {todayMood && (
          <p className="mt-3 text-sm text-soft">{moodMap[todayMood]?.recommend}</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Today's plan</h2>
        <RecommendationCard steps={plan} onRegenerate={() => setRefreshKey((k) => k + 1)} title="Your plan for today" />
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold">{todaysSessions.length}</p>
          <p className="text-xs text-soft">Activities done today</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold">{todaysSessions.reduce((s, x) => s + x.minutes, 0)}</p>
          <p className="text-xs text-soft">Minutes completed today</p>
        </div>
        <div className="card flex flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="text-xl" aria-hidden>💧</span>
          <p className="text-xs text-soft">Hydration reminder — grab a glass of water</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Favorite routines</h2>
          <Link to="/routines" className="focus-ring text-xs font-semibold text-brand-600 dark:text-brand-300">See all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {favoriteRoutines.map((r) => (
            <Link key={r.id} to="/routines" className="card-hover focus-ring p-4">
              <p className="mb-1 text-sm font-bold">{r.name}</p>
              <p className="text-xs text-soft">{r.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
