import type { RoutineStep } from '../types';
import { allTechniques } from '../data';
import { exercises } from '../data/exercises';

export interface RecommendInput {
  moodId: string | null;
  minutes: number;
  bodyArea?: string | null;
}

/**
 * Frontend recommendation engine: builds a short routine from the mood +
 * available time (and optionally a body area), pulling real entries from the
 * technique and exercise datasets rather than generating anything synthetic.
 */
export function buildRoutine({ moodId, minutes, bodyArea }: RecommendInput): RoutineStep[] {
  const pool = allTechniques.filter((t) => (moodId ? t.moods?.includes(moodId) : true));
  const exercisePool = exercises.filter((e) =>
    bodyArea ? e.targetMuscles.some((m) => m.toLowerCase().includes(bodyArea.toLowerCase())) : true,
  );

  const candidates = [...pool.map((t) => ({ id: t.id, type: t.type, name: t.name, duration: t.duration }))];
  if (bodyArea) {
    candidates.push(...exercisePool.slice(0, 4).map((e) => ({ id: e.id, type: 'exercise' as const, name: e.name, duration: e.duration })));
  }

  // Shuffle deterministically-ish by a simple pseudo-random seed so "regenerate" feels fresh.
  const seed = Date.now();
  const shuffled = [...candidates].sort((a, b) => hash(a.id + seed) - hash(b.id + seed));

  const steps: RoutineStep[] = [];
  let total = 0;
  for (const c of shuffled) {
    const stepMinutes = Math.min(c.duration || 2, Math.max(2, minutes - total));
    if (total >= minutes) break;
    if (steps.some((s) => s.refId === c.id)) continue;
    steps.push({ refId: c.id, refType: c.type, name: c.name, minutes: stepMinutes });
    total += stepMinutes;
    if (total >= minutes) break;
  }

  // Fallback: if the mood filter produced nothing, use gentle generalist picks.
  if (steps.length === 0) {
    const fallback = allTechniques.slice(0, 3);
    let t = 0;
    for (const f of fallback) {
      if (t >= minutes) break;
      const m = Math.min(f.duration, minutes - t);
      steps.push({ refId: f.id, refType: f.type, name: f.name, minutes: m });
      t += m;
    }
  }

  return steps;
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function totalMinutes(steps: RoutineStep[]): number {
  return steps.reduce((sum, s) => sum + s.minutes, 0);
}
