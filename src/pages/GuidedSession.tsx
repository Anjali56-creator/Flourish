import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { exercises } from '../data/exercises';
import { findTechnique } from '../data';
import type { Exercise, Technique } from '../types';
import { parseSpec } from '../lib/dose';
import { resolveMotion } from '../data/motionMap';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { GuidedPlayer, type GuidedItem } from '../components/guided/GuidedPlayer';
import { EmptyState } from '../components/ui/EmptyState';

function exerciseToItem(e: Exercise): GuidedItem {
  return {
    id: e.id,
    name: e.name,
    type: 'exercise',
    difficulty: e.difficulty,
    targets: e.targetMuscles,
    instructions: e.instructions,
    breathing: "Exhale on the effort (push, pull or lift), inhale on the return. Don't hold your breath.",
    spec: parseSpec(e),
    motion: resolveMotion(e.id),
    xp: (e.duration || 3) * 3,
    minutes: e.duration || 3,
  };
}

function techniqueToItem(t: Technique): GuidedItem {
  return {
    id: t.id,
    name: t.name,
    type: t.type,
    difficulty: t.difficulty,
    targets: t.targetAreas,
    instructions: t.instructions,
    breathing: t.breathing,
    spec: parseSpec(t),
    motion: resolveMotion(t.id),
    xp: t.duration * 3,
    minutes: t.duration,
  };
}

function resolveItem(id: string): GuidedItem | null {
  const e = exercises.find((x) => x.id === id);
  if (e) return exerciseToItem(e);
  const t = findTechnique(id);
  if (t) return techniqueToItem(t);
  return null;
}

export default function GuidedSession() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { routines, logSession, addToDraft } = useStore();
  const { push } = useToast();
  const [stepIdx, setStepIdx] = useState(0);

  const routine = routines.find((r) => r.id === id);

  const playlist: GuidedItem[] = routine
    ? routine.steps.map((s) => resolveItem(s.refId)).filter((x): x is GuidedItem => Boolean(x))
    : ([resolveItem(id)].filter(Boolean) as GuidedItem[]);

  if (playlist.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="We couldn't start that session"
        subtitle="The activity may have been removed or the link is out of date."
        action={<Link to="/explore" className="btn-primary focus-ring mt-2">Back to Explore</Link>}
      />
    );
  }

  const current = playlist[Math.min(stepIdx, playlist.length - 1)];
  const isLast = stepIdx >= playlist.length - 1;

  function handleComplete(itm: GuidedItem) {
    logSession({ type: itm.type, refId: itm.id, name: itm.name, minutes: itm.minutes, xp: itm.xp });
  }

  function handleExit() {
    if (routine) {
      push('Session ended', '👋');
      navigate('/routines');
    } else {
      navigate(-1);
    }
  }

  function handleNext() {
    if (isLast) {
      push(`${routine ? routine.name : 'Session'} complete — great work!`, '🎉');
      navigate('/progress');
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  return (
    <div className="animate-fade-up py-2">
      {routine && (
        <p className="mb-4 text-center text-sm font-semibold text-soft">
          {routine.name}
        </p>
      )}
      <GuidedPlayer
        key={current.id + stepIdx}
        item={current}
        index={routine ? stepIdx : undefined}
        total={routine ? playlist.length : undefined}
        onComplete={handleComplete}
        onExit={handleExit}
        onNext={routine ? handleNext : undefined}
        onAddToRoutine={(itm) => {
          addToDraft({ refId: itm.id, refType: itm.type, name: itm.name, minutes: itm.minutes });
          push(`${itm.name} added to your routine`, '➕');
        }}
      />
    </div>
  );
}
