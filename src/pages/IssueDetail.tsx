import { Link, useParams } from 'react-router-dom';
import { issues } from '../data/issues';
import { findTechnique } from '../data';
import { exercises } from '../data/exercises';
import { foods } from '../data/foods';
import { TechniqueCard } from '../components/TechniqueCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { FoodCard } from '../components/FoodCard';
import { EmptyState } from '../components/ui/EmptyState';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { concernIcon } from '../data/icons';

export default function IssueDetail() {
  const { id } = useParams();
  const issue = issues.find((i) => i.id === id);
  const { logSession } = useStore();
  const { push } = useToast();

  if (!issue) {
    return (
      <EmptyState
        icon="🔍"
        title="We couldn't find that topic"
        action={<Link to="/issues" className="btn-primary focus-ring mt-2">Back to Issues & Goals</Link>}
      />
    );
  }

  const relatedYoga = issue.yogaIds.map(findTechnique).filter(Boolean);
  const relatedMeditation = issue.meditationIds.map(findTechnique).filter(Boolean);
  const relatedExercises = issue.exerciseIds.map((eid) => exercises.find((e) => e.id === eid)).filter(Boolean);
  const relatedFoods = issue.foods.map((fid) => foods.find((f) => f.id === fid)).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl animate-fade-up">
      <Link to="/issues" className="focus-ring mb-4 inline-block text-sm font-semibold text-brand-600 dark:text-brand-300">← Issues &amp; Goals</Link>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-2xl" aria-hidden>
          {concernIcon(issue.tags[0] ?? issue.name) !== '•' ? concernIcon(issue.tags[0] ?? issue.name) : concernIcon(issue.group)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">{issue.group}</span>
      </div>
      <h1 className="font-display mb-3 text-3xl font-extrabold">{issue.name}</h1>
      <p className="mb-8 max-w-2xl text-soft">{issue.explanation}</p>

      <section className="mb-10 card p-6">
        <h2 className="mb-4 text-lg font-bold">Beginner routine</h2>
        <ol className="mb-5 space-y-2.5">
          {issue.beginnerRoutine.map((step, i) => (
            <li key={i} className="flex items-center gap-3 rounded-2xl surface-2 px-3 py-2.5 text-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-300">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => {
            logSession({ type: 'routine', refId: issue.id, name: `${issue.name} — beginner routine`, minutes: issue.beginnerRoutine.length * 3, xp: issue.beginnerRoutine.length * 8 });
            push('Logged! Great step toward feeling better.', '🎉');
          }}
          className="btn-primary focus-ring"
        >
          Mark routine as done
        </button>
      </section>

      {relatedYoga.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold">Recommended yoga</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedYoga.map((t) => t && <TechniqueCard key={t.id} technique={t} />)}
          </div>
        </section>
      )}

      {relatedMeditation.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold">Meditation & breathwork</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedMeditation.map((t) => t && <TechniqueCard key={t.id} technique={t} />)}
          </div>
        </section>
      )}

      {relatedExercises.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold">Recommended exercises</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedExercises.map((e) => e && <ExerciseCard key={e.id} exercise={e} />)}
          </div>
        </section>
      )}

      {issue.mobility.length > 0 && (
        <section className="mb-10 card p-6">
          <h2 className="mb-3 text-lg font-bold">Mobility focus</h2>
          <ul className="flex flex-wrap gap-2">
            {issue.mobility.map((m) => <li key={m} className="chip">{m}</li>)}
          </ul>
        </section>
      )}

      {relatedFoods.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold">Food suggestions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFoods.map((f) => f && <FoodCard key={f.id} food={f} />)}
          </div>
        </section>
      )}

      <section className="mb-6 rounded-2xl border border-sun-400/40 bg-sun-400/10 p-5">
        <h2 className="mb-2 text-sm font-bold">Safety notes</h2>
        <ul className="space-y-1.5 text-sm text-soft">
          {issue.safetyNotes.map((s, i) => <li key={i}>⚠️ {s}</li>)}
        </ul>
      </section>
    </div>
  );
}
