import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/utils';

interface TimerProps {
  minutes: number;
  onComplete?: () => void;
  className?: string;
}

export function Timer({ minutes, onComplete, className }: TimerProps) {
  const totalSeconds = Math.max(1, Math.round(minutes * 60));
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setRemaining(totalSeconds);
    setDone(false);
    setRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(intervalRef.current!);
          setRunning(false);
          setDone(true);
          onComplete?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running, onComplete]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const progress = 1 - remaining / totalSeconds;

  return (
    <div className={cx('flex items-center gap-4', className)}>
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke={done ? '#18b083' : '#8b5cf6'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 15.5}
            strokeDashoffset={2 * Math.PI * 15.5 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.3s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums">
          {mm}:{ss}
        </div>
      </div>
      <div className="flex gap-2">
        {!done ? (
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="btn-primary focus-ring !px-4 !py-2 text-xs"
          >
            {running ? 'Pause' : remaining === totalSeconds ? 'Start' : 'Resume'}
          </button>
        ) : (
          <span className="chip chip-active">Complete ✓</span>
        )}
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setRemaining(totalSeconds);
            setDone(false);
          }}
          className="btn-ghost focus-ring !px-4 !py-2 text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
