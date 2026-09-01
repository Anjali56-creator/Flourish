import { useEffect, useMemo, useRef, useState } from 'react';
import type { SessionSpec } from '../../lib/dose';
import { MOTION_META, type MotionKey } from '../../data/motionMap';
import { BREATH_PATTERNS } from '../../data/figureMap';
import { MotionFigure } from '../figures/MotionFigure';
import { BreathingCircle } from '../ui/BreathingCircle';
import { BreathingPattern } from '../figures/BreathingPattern';
import { ProgressRing } from '../ui/ProgressRing';
import { DIFFICULTY_ICON } from '../../data/icons';
import { cx } from '../../lib/utils';

export interface GuidedItem {
  id: string;
  name: string;
  type: 'yoga' | 'meditation' | 'breathwork' | 'exercise';
  difficulty: string;
  targets: string[];
  instructions: string[];
  breathing?: string;
  spec: SessionSpec;
  motion: MotionKey;
  xp: number;
  minutes: number;
}

type Status = 'ready' | 'running' | 'paused' | 'done';

interface GuidedPlayerProps {
  item: GuidedItem;
  onComplete: (item: GuidedItem) => void;
  onExit: () => void;
  onAddToRoutine: (item: GuidedItem) => void;
  /** playlist context */
  index?: number;
  total?: number;
  onNext?: () => void;
}

function mmss(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function GuidedPlayer({ item, onComplete, onExit, onAddToRoutine, index, total, onNext }: GuidedPlayerProps) {
  const { spec, motion } = item;
  const meta = MOTION_META[motion];
  const isBreath = item.type === 'breathwork' && !!BREATH_PATTERNS[item.id];
  const totalReps = Math.max(1, spec.reps * spec.sets);

  const [status, setStatus] = useState<Status>('ready');
  const [elapsed, setElapsed] = useState(0);
  const [reps, setReps] = useState(0);
  const completedRef = useRef(false);

  // reset when the item changes (playlist advance)
  useEffect(() => {
    setStatus('ready');
    setElapsed(0);
    setReps(0);
    completedRef.current = false;
  }, [item.id]);

  const progress =
    spec.mode === 'time' ? Math.min(1, elapsed / spec.seconds) : Math.min(1, reps / totalReps);

  function finish() {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete(item);
    }
    setStatus('done');
  }

  // one-second clock (drives timed countdown + breathing-cue phase in both modes)
  useEffect(() => {
    if (status !== 'running') return;
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(t);
  }, [status]);

  // rep auto-tempo — one rep per animation loop so the user can just follow along
  useEffect(() => {
    if (status !== 'running' || spec.mode !== 'reps') return;
    const t = window.setInterval(() => setReps((r) => Math.min(totalReps, r + 1)), meta.loop * 1000);
    return () => window.clearInterval(t);
  }, [status, spec.mode, totalReps, meta.loop]);

  // completion watcher
  useEffect(() => {
    if (status !== 'running') return;
    if (spec.mode === 'time' && elapsed >= spec.seconds) finish();
    if (spec.mode === 'reps' && reps >= totalReps) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, elapsed, reps, spec.mode, spec.seconds, totalReps]);

  const stepIndex = Math.min(item.instructions.length - 1, Math.floor(progress * item.instructions.length));
  const currentStep = item.instructions[stepIndex] ?? item.instructions[0];

  const breathePhase = useMemo(() => {
    const half = Math.max(1.4, meta.loop / 2);
    return Math.floor(elapsed / half) % 2 === 0 ? meta.breatheIn : meta.breatheOut;
  }, [elapsed, meta]);

  const remaining = spec.mode === 'time' ? Math.max(0, spec.seconds - elapsed) : 0;
  const setNumber = reps > 0 ? Math.min(spec.sets, Math.floor((reps - 1) / spec.reps) + 1) : 1;
  const repInSet = reps > 0 && reps % spec.reps === 0 ? spec.reps : reps % spec.reps;

  return (
    <div className="mx-auto max-w-2xl">
      {/* header row */}
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="focus-ring text-sm font-semibold text-soft hover:text-current">
          ✕ Exit
        </button>
        {typeof index === 'number' && typeof total === 'number' && total > 1 && (
          <span className="chip !py-1 !text-[11px]">Step {index + 1} of {total}</span>
        )}
      </div>

      {/* animation stage */}
      <div className="card relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-200/60 to-grape-300/25 p-4 dark:from-brand-500/15 dark:to-grape-500/10 sm:aspect-[16/10]">
        {isBreath ? (
          <div className="flex w-full max-w-sm flex-col items-center">
            <BreathingCircle running={status === 'running'} />
            <BreathingPattern phases={BREATH_PATTERNS[item.id]} compact />
          </div>
        ) : (
          <MotionFigure motion={motion} paused={status !== 'running'} className="h-full" />
        )}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur"
          style={{ background: 'color-mix(in srgb, var(--surface) 78%, transparent)' }}
        >
          {meta.label}
        </span>
      </div>

      {/* title + meta */}
      <h1 className="font-display mb-2 text-2xl font-extrabold leading-tight sm:text-3xl">{item.name}</h1>
      <div className="mb-5 flex flex-wrap gap-1.5 text-xs">
        <span className="chip !gap-1 !py-1">{DIFFICULTY_ICON[item.difficulty]} {item.difficulty}</span>
        {item.targets.slice(0, 2).map((t) => <span key={t} className="chip !gap-1 !py-1">🎯 {t}</span>)}
        <span className="chip !gap-1 !py-1">🔁 {spec.doseLabel}</span>
      </div>

      {status !== 'done' ? (
        <>
          {/* timer / reps */}
          <div className="card mb-5 flex flex-col items-center gap-4 p-6 text-center">
            {spec.mode === 'time' ? (
              <ProgressRing
                progress={progress}
                size={148}
                stroke={12}
                label={mmss(status === 'ready' ? spec.seconds : remaining)}
                sublabel={status === 'running' ? 'remaining' : status === 'paused' ? 'paused' : 'ready'}
              />
            ) : (
              <>
                <ProgressRing progress={progress} size={148} stroke={12} label={`${repInSet} / ${spec.reps}`} sublabel="reps" />
                {spec.sets > 1 && <p className="text-xs font-semibold text-soft">Set {setNumber} of {spec.sets}</p>}
              </>
            )}

            {status === 'ready' && (
              <button type="button" onClick={() => setStatus('running')} className="btn-primary focus-ring w-full max-w-xs !py-3.5 text-base">
                ▶ Start
              </button>
            )}

            {(status === 'running' || status === 'paused') && (
              <div className="flex w-full max-w-sm flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus((s) => (s === 'running' ? 'paused' : 'running'))}
                  className="btn-primary focus-ring flex-1"
                >
                  {status === 'running' ? '⏸ Pause' : '▶ Resume'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setElapsed(0);
                    setReps(0);
                    setStatus('running');
                  }}
                  className="btn-ghost focus-ring"
                >
                  ↺ Restart
                </button>
                <button type="button" onClick={finish} className="btn-ghost focus-ring">
                  ✓ Finish
                </button>
              </div>
            )}

            {spec.mode === 'reps' && (status === 'running' || status === 'paused') && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReps((r) => Math.max(0, r - 1))}
                  className="focus-ring grid h-9 w-9 place-items-center rounded-full border text-lg"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="One rep back"
                >
                  −
                </button>
                <span className="text-xs text-soft">tap to adjust</span>
                <button
                  type="button"
                  onClick={() => setReps((r) => Math.min(totalReps, r + 1))}
                  className="focus-ring grid h-9 w-9 place-items-center rounded-full border text-lg"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="Count one rep"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* current cue — big, so the user doesn't read the whole list */}
          <div className="mb-5 rounded-3xl border border-brand-400/40 bg-brand-500/5 p-5 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              {status === 'ready' ? 'Get ready' : `Step ${stepIndex + 1} of ${item.instructions.length}`}
            </p>
            <p className="text-lg font-bold leading-snug">{status === 'ready' ? meta.cue : currentStep}</p>
            <p className="mt-2 text-sm font-semibold text-grape-600 dark:text-grape-400">
              {status === 'running' ? `🫁 ${breathePhase}` : meta.breatheIn}
            </p>
          </div>
        </>
      ) : (
        <div className="card animate-scale-in mb-5 p-8 text-center">
          <div className="mb-2 text-5xl animate-pop" aria-hidden>🎉</div>
          <h2 className="font-display mb-1 text-2xl font-extrabold">Nice work.</h2>
          <p className="mb-6 text-soft">
            {spec.mode === 'time'
              ? `${Math.min(elapsed, spec.seconds)} seconds completed`
              : `${reps} of ${totalReps} reps completed`}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {onNext ? (
              <button type="button" onClick={onNext} className="btn-primary focus-ring">Next →</button>
            ) : (
              <button type="button" onClick={onExit} className="btn-primary focus-ring">Done</button>
            )}
            <button
              type="button"
              onClick={() => {
                setElapsed(0);
                setReps(0);
                completedRef.current = false;
                setStatus('running');
              }}
              className="btn-ghost focus-ring"
            >
              ↺ Do Again
            </button>
            <button type="button" onClick={() => onAddToRoutine(item)} className="btn-ghost focus-ring">+ Add to Routine</button>
          </div>
        </div>
      )}

      {/* full instructions + breathing, secondary */}
      <section className="mb-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">How to do it</h2>
        <ol className="space-y-2">
          {item.instructions.map((s, i) => (
            <li
              key={i}
              className={cx(
                'flex gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors',
                i === stepIndex && status !== 'ready' && status !== 'done' ? 'surface-2 font-semibold' : 'opacity-60',
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-300">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
        <h2 className="mb-1 text-sm font-bold">Breathe</h2>
        <p className="text-sm text-soft">
          {item.breathing ?? `${meta.breatheIn}. ${meta.breatheOut}.`}
        </p>
      </section>
    </div>
  );
}
