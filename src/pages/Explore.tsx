import { Link } from 'react-router-dom';
import { yoga } from '../data/yoga';
import { meditation } from '../data/meditation';
import { exercises } from '../data/exercises';
import { foods } from '../data/foods';
import { issues } from '../data/issues';

const CATEGORIES = [
  { to: '/yoga', icon: '🧘', title: 'Yoga Library', desc: `${yoga.length} poses & sequences`, color: 'from-brand-300 to-brand-500' },
  { to: '/meditation', icon: '🌬️', title: 'Meditation & Breathwork', desc: `${meditation.length} guided techniques`, color: 'from-grape-300 to-grape-500' },
  { to: '/exercises', icon: '💪', title: 'Exercise Hub', desc: `${exercises.length} exercises & quick routines`, color: 'from-sun-300 to-sun-500' },
  { to: '/food', icon: '🥗', title: 'Food & Nutrition', desc: `${foods.length} food ideas`, color: 'from-brand-300 to-grape-400' },
  { to: '/issues', icon: '🎯', title: 'Issues & Goals', desc: `${issues.length} concerns supported`, color: 'from-grape-300 to-sun-400' },
  { to: '/body-map', icon: '🫆', title: 'Body Map', desc: 'Click an area to explore', color: 'from-sun-300 to-brand-400' },
  { to: '/routines', icon: '📋', title: 'Routine Builder', desc: 'Build your own flow', color: 'from-brand-400 to-grape-500' },
  { to: '/challenges', icon: '🏆', title: 'Daily Challenges', desc: 'Quick wins for XP', color: 'from-sun-400 to-grape-400' },
];

export default function Explore() {
  return (
    <div className="animate-fade-up">
      <header className="mb-8">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Explore Everything</h1>
        <p className="text-soft">Every corner of Flourish, in one place.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link key={c.to} to={c.to} className="card-hover focus-ring group relative overflow-hidden p-5">
            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-2xl text-white shadow-soft`}>
              {c.icon}
            </div>
            <h2 className="mb-1 text-base font-bold">{c.title}</h2>
            <p className="text-xs text-soft">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
