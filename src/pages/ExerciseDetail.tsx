import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { exercises } from '../data/exercises';
import { benefitFor } from '../data/exerciseBenefits';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { Figure } from '../components/figures/Figure';
import { Timer } from '../components/ui/Timer';
import { EmptyState } from '../components/ui/EmptyState';
import { DIFFICULTY_ICON } from '../data/icons';
import { cx } from '../lib/utils';

export default function ExerciseDetail() {
  const { id } = useParams();
  const exercise = exercises.find((e) => e.id === id);
  const { isFavorite, toggleFavorite, addToDraft, logSession } = useStore();
  const { push } = useToast();
  const [completed, setCompleted] = useState(false);

  if (!exercise) {
    return (
      <EmptyState
        icon="🔍"
        title="We couldn't find that exercise"
        subtitle="It may have been removed or the link is out of date."
        action={<Link to="/exercises" className="btn-primary focus-ring mt-2">Back to Exercise Hub</Link>}
      />
    );
  }

  const fav = isFavorite(exercise.id);

  return (
    <article className="mx-auto max-w-3xl animate-fade-up">
      <Link to="/exercises" className="focus-ring mb-4 inline-block text-sm font-semibold text-brand-600 dark:text-brand-300">← Exercise Hub</Link>

      <Figure item={{ ...exercise, type: 'exercise' }} size="hero" className="mb-6" />

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="chip !gap-1">{DIFFICULTY_ICON[exercise.difficulty]} {exercise.difficulty}</span>
        <span className="chip !gap-1">🔁 {exercise.dose}</span>
        <span className="chip !gap-1">🧰 {exercise.equipment}</span>
        <span className="chip !gap-1">📂 {exercise.category}</span>
      </div>

      <div className="mb-3 flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold leading-tight">{exercise.name}</h1>
        <button
          type="button"
          onClick={() => {
            toggleFavorite(exercise.id);
            push(fav ? 'Removed from favorites' : 'Saved to favorites', fav ? '🤍' : '❤️');
          }}
          className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border text-xl"
          style={{ borderColor: 'var(--border)' }}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <span className={cx(fav && 'animate-pop')}>{fav ? '❤️' : '🤍'}</span>
        </button>
      </div>

      <p className="mb-5 text-soft">{benefitFor(exercise.id)}</p>

      <Link to={`/session/${exercise.id}`} className="btn-primary focus-ring mb-6 w-full !py-3.5 text-base">
        ▶ Start Guided Session
      </Link>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {exercise.targetMuscles.map((m) => <span key={m} className="chip">🎯 {m}</span>)}
      </div>

      <section className="card mb-6 p-5">
        <h2 className="mb-3 text-lg font-bold">Quick timer</h2>
        <p className="mb-3 text-sm text-soft">Prefer a plain timer? Suggested: <span className="font-semibold text-current">{exercise.dose}</span></p>
        <Timer
          minutes={exercise.duration}
          onComplete={() => {
            if (!completed) {
              setCompleted(true);
              logSession({ type: 'exercise', refId: exercise.id, name: exercise.name, minutes: exercise.duration, xp: exercise.duration * 3 });
              push('Nice work — logged! 🎉', '✨');
            }
          }}
        />
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">How to do it — step by step</h2>
        <ol className="space-y-3">
          {exercise.instructions.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-300">{i + 1}</span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-6 card p-4">
        <h2 className="mb-1 text-sm font-bold">Breathing guidance</h2>
        <p className="text-sm text-soft">Exhale on the effort (the push, pull or lift) and inhale on the return. Keep breathing steadily — never hold your breath.</p>
      </section>

      <section className="mb-6 rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
        <h2 className="mb-2 text-sm font-bold">Common mistakes to avoid</h2>
        <ul className="space-y-1.5 text-sm text-soft">
          {exercise.commonMistakes.map((m, i) => <li key={i}>✗ {m}</li>)}
        </ul>
      </section>

      <section className="mb-8 rounded-2xl border border-sun-400/40 bg-sun-400/10 p-4">
        <h2 className="mb-2 text-sm font-bold">Safety & cautions</h2>
        <ul className="space-y-1.5 text-sm text-soft">
          {exercise.safety.map((s, i) => <li key={i}>⚠️ {s}</li>)}
        </ul>
        <p className="mt-2 text-xs text-soft">This content is for general wellness and movement education and is not a diagnosis or substitute for professional medical advice.</p>
      </section>

      <div className="sticky bottom-20 z-10 flex gap-2 rounded-2xl border p-3 shadow-lift sm:bottom-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <button
          type="button"
          onClick={() => {
            addToDraft({ refId: exercise.id, refType: 'exercise', name: exercise.name, minutes: exercise.duration });
            push(`${exercise.name} added to your workout`, '➕');
          }}
          className="btn-ghost focus-ring flex-1"
        >
          + Add to My Routine
        </button>
        <Link to="/routines" className="btn-primary focus-ring flex-1 text-center">Open Routine Builder</Link>
      </div>
    </article>
  );
}
