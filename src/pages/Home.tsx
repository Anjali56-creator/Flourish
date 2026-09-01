import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { MoodSelector } from '../components/MoodSelector';
import { RecommendationCard } from '../components/RecommendationCard';
import { IssueCard } from '../components/IssueCard';
import { buildRoutine } from '../lib/recommend';
import { moodMap } from '../data/moods';
import { issues } from '../data/issues';
import { allTechniques } from '../data';
import { exercises } from '../data/exercises';
import { foods } from '../data/foods';

const FEATURED_ISSUES = issues.filter((i) => ['i-stress', 'i-neck-stiffness', 'i-poor-sleep', 'i-hip-tightness', 'i-low-energy', 'i-poor-posture'].includes(i.id));

const QUICK_STARTS = [
  { label: 'Try 5-Min Shoulder Relief', icon: '🎽', to: '/issues/i-shoulder-stiffness' },
  { label: '3-Min Breathing Reset', icon: '🌬️', to: '/technique/m-box-breathing' },
  { label: '10-Min Desk Break', icon: '🪑', to: '/issues/i-sitting-stiffness' },
  { label: 'Wind Down for Sleep', icon: '😴', to: '/issues/i-poor-sleep' },
  { label: 'Ease Neck Tension', icon: '🦢', to: '/issues/i-neck-stiffness' },
  { label: 'Quick Energy Boost', icon: '⚡', to: '/issues/i-low-energy' },
];

const STEPS = [
  { title: 'How do you feel?', desc: 'Tap a mood — stressed, tired, restless, or great.' },
  { title: 'What do you need?', desc: 'Pick a concern, body area, or goal.' },
  { title: 'Get a plan', desc: 'A short, personalized routine, ready in seconds.' },
  { title: 'Start moving', desc: 'Follow the steps with built-in timers.' },
];

export default function Home() {
  const { logMood, todayMood } = useStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(todayMood);
  const [refreshKey, setRefreshKey] = useState(0);

  const plan = selectedMood ? buildRoutine({ moodId: selectedMood, minutes: 15 }) : null;

  function handleMood(id: string) {
    setSelectedMood(id);
    logMood(id);
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="gradient-mesh relative mb-16 overflow-hidden rounded-4xl border px-6 py-14 text-center sm:px-12 sm:py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="pointer-events-none absolute -left-10 top-10 text-6xl opacity-30 animate-float" aria-hidden>🧘</div>
        <div className="pointer-events-none absolute -right-6 bottom-10 text-6xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }} aria-hidden>🌿</div>
        <div className="pointer-events-none absolute right-24 top-6 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.8s' }} aria-hidden>🌬️</div>

        <p className="relative mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          ✨ {allTechniques.length}+ yoga & meditation techniques inside
        </p>
        <h1 className="font-display relative mx-auto mb-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Move Better. Feel Better. <span className="bg-gradient-to-r from-brand-500 to-grape-500 bg-clip-text text-transparent">Live Better.</span>
        </h1>
        <p className="relative mx-auto mb-8 max-w-xl text-base text-soft sm:text-lg">
          Your personalized space for yoga, movement, meditation, recovery and everyday wellness.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link to="/dashboard" className="btn-primary focus-ring">Start Your Wellness Journey</Link>
          <Link to="/yoga" className="btn-ghost focus-ring">Explore 100+ Techniques</Link>
          <a href="#mood-check" className="btn-ghost focus-ring">Find What I Need</a>
        </div>
      </section>

      {/* Mood check */}
      <section id="mood-check" className="mb-16">
        <div className="mb-6 text-center">
          <h2 className="font-display mb-2 text-2xl font-extrabold sm:text-3xl">How are you feeling today?</h2>
          <p className="text-soft">Pick a mood and we'll put together something short and useful.</p>
        </div>
        <MoodSelector selected={selectedMood} onSelect={handleMood} className="mx-auto mb-8 max-w-3xl" />

        {selectedMood && plan && (
          <div className="mx-auto max-w-xl">
            <p className="mb-4 text-center text-sm text-soft">{moodMap[selectedMood]?.recommend}</p>
            <RecommendationCard key={refreshKey} steps={plan} onRegenerate={() => setRefreshKey((k) => k + 1)} title={`Feeling ${moodMap[selectedMood]?.label.toLowerCase()}? Try this`} />
          </div>
        )}

        {/* Jump straight in — descriptive quick starts */}
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="mb-3 text-center text-sm font-semibold text-soft">Or jump straight in</p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_STARTS.map((q) => (
              <Link key={q.to} to={q.to} className="chip focus-ring !px-3.5 !py-2 !text-[13px] hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-300">
                <span aria-hidden>{q.icon}</span> {q.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="font-display mb-6 text-center text-2xl font-extrabold sm:text-3xl">How it works</h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card p-5 text-center">
              <span className="mb-2 inline-grid h-9 w-9 place-items-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-600 dark:text-brand-300">{i + 1}</span>
              <p className="mb-1 text-sm font-bold">{s.title}</p>
              <p className="text-xs text-soft">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Stats */}
      <section className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile value={`${allTechniques.length}+`} label="Yoga & meditation techniques" />
        <StatTile value={`${exercises.length}+`} label="Exercises" />
        <StatTile value={`${foods.length}+`} label="Food ideas" />
        <StatTile value={`${issues.length}+`} label="Issues & goals supported" />
      </section>

      {/* What do you need help with */}
      <section className="mb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display mb-2 text-2xl font-extrabold sm:text-3xl">What do you need help with?</h2>
            <p className="text-soft">A few popular starting points — browse everything on the Issues & Goals page.</p>
          </div>
          <Link to="/issues" className="btn-ghost focus-ring shrink-0">See all {issues.length} topics →</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_ISSUES.map((i) => <IssueCard key={i.id} issue={i} />)}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <HighlightCard icon="🫆" title="Interactive Body Map" desc="Tap a body area for targeted mobility and yoga." to="/body-map" />
        <HighlightCard icon="📋" title="Build Your Own Routine" desc="Combine yoga, exercise and meditation your way." to="/routines" />
        <HighlightCard icon="🏆" title="Daily Challenges" desc="Small wins, real XP, a streak worth keeping." to="/challenges" />
      </section>

      <section className="rounded-4xl border p-8 text-center sm:p-12" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <h2 className="font-display mb-3 text-2xl font-extrabold">Ready for your personalized dashboard?</h2>
        <p className="mx-auto mb-6 max-w-md text-soft">See your streak, today's plan, and pick up right where you left off.</p>
        <Link to="/dashboard" className="btn-primary focus-ring">Go to My Dashboard</Link>
      </section>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="card p-5 text-center">
      <p className="font-display text-3xl font-extrabold text-brand-600 dark:text-brand-300">{value}</p>
      <p className="mt-1 text-xs text-soft">{label}</p>
    </div>
  );
}

function HighlightCard({ icon, title, desc, to }: { icon: string; title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="card-hover focus-ring p-6">
      <span className="mb-3 block text-3xl" aria-hidden>{icon}</span>
      <h3 className="mb-1 text-base font-bold">{title}</h3>
      <p className="text-sm text-soft">{desc}</p>
    </Link>
  );
}
