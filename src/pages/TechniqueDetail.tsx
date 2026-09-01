import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findTechnique } from '../data';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { Figure } from '../components/figures/Figure';
import { BreathingPattern } from '../components/figures/BreathingPattern';
import { BREATH_PATTERNS } from '../data/figureMap';
import { BreathingCircle } from '../components/ui/BreathingCircle';
import { Timer } from '../components/ui/Timer';
import { EmptyState } from '../components/ui/EmptyState';
import { DIFFICULTY_ICON } from '../data/icons';
import { cx } from '../lib/utils';

export default function TechniqueDetail() {
  const { id } = useParams();
  const technique = id ? findTechnique(id) : undefined;
  const { isFavorite, toggleFavorite, addToDraft, logSession } = useStore();
  const { push } = useToast();
  const [breathing, setBreathing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!technique) {
    return (
      <EmptyState
        icon="🔍"
        title="We couldn't find that technique"
        subtitle="It may have been removed or the link is out of date."
        action={<Link to="/explore" className="btn-primary focus-ring mt-2">Back to Explore</Link>}
      />
    );
  }

  const fav = isFavorite(technique.id);
  const isBreathwork = technique.type === 'breathwork' || technique.category.toLowerCase().includes('breath');
  const breathPhases = BREATH_PATTERNS[technique.id];

  return (
    <article className="mx-auto max-w-3xl animate-fade-up">
      <Figure item={technique} size="hero" className="mb-6" />

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="chip !gap-1">{DIFFICULTY_ICON[technique.difficulty]} {technique.difficulty}</span>
        <span className="chip !gap-1">⏱️ {technique.duration} min</span>
        <span className="chip !gap-1">📂 {technique.category}</span>
      </div>

      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold leading-tight">{technique.name}</h1>
        <button
          type="button"
          onClick={() => {
            toggleFavorite(technique.id);
            push(fav ? 'Removed from favorites' : 'Added to favorites', fav ? '💔' : '💚');
          }}
          className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border text-xl"
          style={{ borderColor: 'var(--border)' }}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className={cx(fav && 'animate-pop')}>{fav ? '❤️' : '🤍'}</span>
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {technique.targetAreas.map((a) => <span key={a} className="chip">🎯 {a}</span>)}
      </div>

      <Link to={`/session/${technique.id}`} className="btn-primary focus-ring mb-6 w-full !py-3.5 text-base">
        ▶ Start Guided Session
      </Link>

      {isBreathwork && (
        <section className="card mb-6 p-5 text-center">
          {breathPhases && (
            <div className="mb-4">
              <p className="mb-2 text-left text-sm font-semibold">The pattern at a glance</p>
              <BreathingPattern phases={breathPhases} />
            </div>
          )}
          <p className="mb-3 text-sm font-semibold">Follow the breathing animation</p>
          <BreathingCircle running={breathing} />
          <button type="button" onClick={() => setBreathing((b) => !b)} className="btn-primary focus-ring">
            {breathing ? 'Pause' : 'Start Session'}
          </button>
        </section>
      )}

      <section className="card mb-6 p-5">
        <h2 className="mb-3 text-lg font-bold">Session timer</h2>
        <Timer
          minutes={technique.duration}
          onComplete={() => {
            if (!completed) {
              setCompleted(true);
              logSession({ type: technique.type, refId: technique.id, name: technique.name, minutes: technique.duration, xp: technique.duration * 3 });
              push('Session complete — nice work! 🎉', '✨');
            }
          }}
        />
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">Benefits</h2>
        <ul className="space-y-2">
          {technique.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-brand-500" aria-hidden>✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-lg font-bold">How to practice</h2>
        <ol className="space-y-3">
          {technique.instructions.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-300">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {technique.breathing && (
        <section className="mb-6 card p-4">
          <h2 className="mb-1 text-sm font-bold">Breathing guidance</h2>
          <p className="text-sm text-soft">{technique.breathing}</p>
        </section>
      )}

      <section className="mb-6 rounded-2xl border border-sun-400/40 bg-sun-400/10 p-4">
        <h2 className="mb-2 text-sm font-bold">Safety & cautions</h2>
        <ul className="space-y-1.5 text-sm text-soft">
          {technique.precautions.map((p, i) => <li key={i}>⚠️ {p}</li>)}
        </ul>
        <p className="mt-2 text-xs text-soft">This content is for general wellness and movement education and is not a diagnosis or substitute for professional medical advice.</p>
      </section>

      <div className="mb-10 flex flex-wrap gap-2">
        {technique.tags.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>

      <div className="sticky bottom-20 z-10 flex gap-2 rounded-2xl border p-3 shadow-lift sm:bottom-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <button
          type="button"
          onClick={() => {
            addToDraft({ refId: technique.id, refType: technique.type, name: technique.name, minutes: technique.duration });
            push(`${technique.name} added to your routine`, '➕');
          }}
          className="btn-ghost focus-ring flex-1"
        >
          + Add to My Routine
        </button>
        <Link to="/routines" className="btn-primary focus-ring flex-1 text-center">
          Go to Routine Builder
        </Link>
      </div>
    </article>
  );
}
