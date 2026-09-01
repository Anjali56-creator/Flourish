import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { getLevel, levelTiers } from '../data/levels';
import { Chip } from '../components/ui/Chip';
import { ProgressRing } from '../components/ui/ProgressRing';
import type { WeeklyGoal } from '../types';

const GOALS: { id: WeeklyGoal; label: string }[] = [
  { id: 'move-more', label: 'Move more' },
  { id: 'sleep-better', label: 'Sleep better' },
  { id: 'reduce-stress', label: 'Reduce stress' },
  { id: 'improve-flexibility', label: 'Improve flexibility' },
  { id: 'build-strength', label: 'Build strength' },
  { id: 'improve-posture', label: 'Improve posture' },
];

const EQUIPMENT = ['None (bodyweight only)', 'Resistance band', 'Yoga mat', 'Dumbbells', 'Bench or chair'];
const AGE_GROUPS = ['13-17', '18-24', '25-34', '35+'] as const;

export default function Profile() {
  const { profile, setProfile, xp, streak, sessions } = useStore();
  const { push } = useToast();
  const [name, setName] = useState(profile.name);
  const { current, next, progress } = getLevel(xp);

  function toggleGoal(g: WeeklyGoal) {
    const has = profile.weeklyGoals.includes(g);
    setProfile({ weeklyGoals: has ? profile.weeklyGoals.filter((x) => x !== g) : [...profile.weeklyGoals, g] });
  }

  function toggleEquipment(e: string) {
    const has = profile.equipment.includes(e);
    setProfile({ equipment: has ? profile.equipment.filter((x) => x !== e) : [...profile.equipment, e] });
  }

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <header className="mb-8 flex flex-col items-center text-center">
        <div className="mb-3 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-grape-500 text-3xl text-white shadow-glow">
          {current.icon}
        </div>
        <h1 className="font-display text-2xl font-extrabold">{profile.name || 'Welcome'}</h1>
        <p className="text-soft">{current.name} · {xp} XP</p>
        <div className="mt-4">
          <ProgressRing progress={progress} size={90} label={next ? `${next.minXp - xp}` : 'Max'} sublabel={next ? `to ${next.name}` : 'level'} />
        </div>
      </header>

      <section className="mb-6 card p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">About you</h2>
        <label htmlFor="profile-name" className="mb-1 block text-xs font-semibold text-soft">Name</label>
        <input
          id="profile-name"
          className="input mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setProfile({ name })}
        />

        <label className="mb-1 block text-xs font-semibold text-soft">Age group</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {AGE_GROUPS.map((a) => (
            <Chip key={a} active={profile.ageGroup === a} onClick={() => setProfile({ ageGroup: a })}>{a}</Chip>
          ))}
        </div>

        <label className="mb-1 block text-xs font-semibold text-soft">Experience level</label>
        <div className="flex flex-wrap gap-2">
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((l) => (
            <Chip key={l} active={profile.experience === l} onClick={() => setProfile({ experience: l })}>{l}</Chip>
          ))}
        </div>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">Weekly goals</h2>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <Chip key={g.id} active={profile.weeklyGoals.includes(g.id)} onClick={() => toggleGoal(g.id)}>{g.label}</Chip>
          ))}
        </div>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">Available equipment</h2>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT.map((e) => (
            <Chip key={e} active={profile.equipment.includes(e)} onClick={() => toggleEquipment(e)}>{e}</Chip>
          ))}
        </div>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-soft">Level path</h2>
        <ol className="space-y-2">
          {levelTiers.map((tier) => (
            <li key={tier.name} className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${tier.name === current.name ? 'bg-brand-500/10 font-bold' : 'surface-2'}`}>
              <span>{tier.icon} {tier.name}</span>
              <span className="text-soft">{tier.minXp} XP</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold">{sessions.length}</p>
          <p className="text-xs text-soft">Total sessions logged</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold">🔥 {streak}</p>
          <p className="text-xs text-soft">Day streak</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setProfile({ onboarded: true });
          push('Profile saved', '✅');
        }}
        className="btn-primary focus-ring w-full"
      >
        Save Profile
      </button>

      <div className="mt-4 flex justify-center gap-4 text-sm">
        <Link to="/settings" className="focus-ring font-semibold text-brand-600 dark:text-brand-300">Settings</Link>
        <Link to="/about" className="focus-ring font-semibold text-brand-600 dark:text-brand-300">About & Safety</Link>
      </div>
    </div>
  );
}
