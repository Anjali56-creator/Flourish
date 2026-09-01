import type { Exercise, Technique } from '../types';

export interface SessionSpec {
  mode: 'time' | 'reps';
  /** total seconds for a timed session */
  seconds: number;
  /** target reps for a rep session */
  reps: number;
  /** number of sets, when parseable (rep mode) */
  sets: number;
  /** human label, e.g. "3 × 12 reps" or "30 sec" */
  doseLabel: string;
}

/**
 * Turn a technique's `duration` (minutes) or an exercise's free-text `dose`
 * ("3 x 12–15", "45 sec", "10 min", "10 circles each way") into a concrete
 * spec the Guided Player can drive a timer or rep counter from.
 */
export function parseSpec(item: Technique | Exercise): SessionSpec {
  const isExercise = 'dose' in item;
  const minutes = item.duration ?? 3;

  if (!isExercise) {
    // Yoga / meditation / breathwork — always a held or flowing duration.
    return { mode: 'time', seconds: Math.max(20, Math.round(minutes * 60)), reps: 0, sets: 1, doseLabel: `${minutes} min` };
  }

  const dose = (item as Exercise).dose.toLowerCase();

  // "45 sec" / "30–45 sec" / "1 min"
  const secMatch = dose.match(/(\d+)\s*(?:–|-|to)?\s*(\d+)?\s*sec/);
  if (secMatch) {
    const a = Number(secMatch[1]);
    const b = secMatch[2] ? Number(secMatch[2]) : a;
    const seconds = Math.round((a + b) / 2);
    return { mode: 'time', seconds, reps: 0, sets: 1, doseLabel: `${seconds} sec hold` };
  }
  const minMatch = dose.match(/(\d+)\s*min/);
  if (minMatch) {
    const seconds = Number(minMatch[1]) * 60;
    return { mode: 'time', seconds, reps: 0, sets: 1, doseLabel: `${minMatch[1]} min` };
  }

  // "3 x 12" / "3 x 12–15" / "3 x 10 per side" / "10 per leg"
  const setRep = dose.match(/(\d+)\s*[x×]\s*(\d+)\s*(?:–|-|to)?\s*(\d+)?/);
  if (setRep) {
    const sets = Number(setRep[1]);
    const lo = Number(setRep[2]);
    const hi = setRep[3] ? Number(setRep[3]) : lo;
    const perSet = Math.round((lo + hi) / 2);
    return { mode: 'reps', seconds: 0, reps: perSet, sets, doseLabel: `${sets} × ${perSet} reps` };
  }
  const repsOnly = dose.match(/(\d+)\s*(?:–|-|to)?\s*(\d+)?\s*(?:reps|per (?:leg|side)|circles|taps)/);
  if (repsOnly) {
    const lo = Number(repsOnly[1]);
    const hi = repsOnly[2] ? Number(repsOnly[2]) : lo;
    const reps = Math.round((lo + hi) / 2);
    return { mode: 'reps', seconds: 0, reps, sets: 1, doseLabel: `${reps} reps` };
  }

  // fallback: treat as a timed block
  const seconds = Math.max(20, Math.round(minutes * 60));
  return { mode: 'time', seconds, reps: 0, sets: 1, doseLabel: `${minutes} min` };
}
