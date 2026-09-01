import { useEffect, useState } from 'react';

const PHASES = [
  { key: 'in', label: 'Breathe in', ms: 4000, scale: 1.35 },
  { key: 'hold1', label: 'Hold', ms: 2000, scale: 1.35 },
  { key: 'out', label: 'Breathe out', ms: 4000, scale: 0.85 },
  { key: 'hold2', label: 'Hold', ms: 1500, scale: 0.85 },
] as const;

export function BreathingCircle({ running }: { running: boolean }) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (!running) {
      setPhaseIndex(0);
      return;
    }
    const timer = window.setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].ms);
    return () => window.clearTimeout(timer);
  }, [running, phaseIndex]);

  const phase = PHASES[phaseIndex];

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <div
          className="absolute rounded-full bg-gradient-to-br from-brand-300 to-grape-400 opacity-30 blur-xl"
          style={{
            width: 200,
            height: 200,
            transform: `scale(${running ? phase.scale : 1})`,
            transition: `transform ${running ? phase.ms : 600}ms ease-in-out`,
          }}
        />
        <div
          className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-brand-400/60 bg-brand-500/10 backdrop-blur-sm"
          style={{
            transform: `scale(${running ? phase.scale : 1})`,
            transition: `transform ${running ? phase.ms : 600}ms ease-in-out`,
          }}
        >
          <span className="px-4 text-center text-sm font-semibold text-brand-700 dark:text-brand-300">
            {running ? phase.label : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
}
