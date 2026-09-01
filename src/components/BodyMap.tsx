import { cx } from '../lib/utils';
import { BODY_REGION_ICON } from '../data/icons';

interface Hotspot {
  id: string;
  label: string;
  cx: number;
  cy: number;
  r: number;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'neck', label: 'Neck', cx: 100, cy: 62, r: 11 },
  { id: 'shoulders', label: 'Shoulders', cx: 100, cy: 84, r: 15 },
  { id: 'arms', label: 'Arms', cx: 62, cy: 130, r: 13 },
  { id: 'wrists', label: 'Wrists', cx: 50, cy: 190, r: 9 },
  { id: 'back', label: 'Back', cx: 100, cy: 115, r: 16 },
  { id: 'core', label: 'Core', cx: 100, cy: 150, r: 15 },
  { id: 'hips', label: 'Hips', cx: 100, cy: 185, r: 14 },
  { id: 'legs', label: 'Legs', cx: 100, cy: 240, r: 17 },
  { id: 'knees', label: 'Knees', cx: 100, cy: 300, r: 11 },
  { id: 'ankles', label: 'Ankles', cx: 100, cy: 355, r: 9 },
];

interface BodyMapProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function BodyMap({ selected, onSelect }: BodyMapProps) {
  return (
    <div className="card flex flex-col items-center gap-4 p-6">
      <svg viewBox="0 0 200 400" className="h-[400px] w-auto" role="img" aria-label="Interactive body map — select an area for targeted content">
        <ellipse cx="100" cy="35" rx="20" ry="24" fill="var(--surface-2)" stroke="var(--border)" />
        <path
          d="M70 60 Q100 55 130 60 L140 200 Q120 220 100 220 Q80 220 60 200 Z"
          fill="var(--surface-2)"
          stroke="var(--border)"
        />
        <path d="M65 90 L35 175" stroke="var(--border)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M135 90 L165 175" stroke="var(--border)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M80 215 L75 380" stroke="var(--border)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M120 215 L125 380" stroke="var(--border)" strokeWidth="20" strokeLinecap="round" fill="none" />

        {HOTSPOTS.map((h) => {
          const active = selected === h.id;
          return (
            <g key={h.id}>
              <circle
                cx={h.cx}
                cy={h.cy}
                r={h.r}
                className={cx('cursor-pointer transition-all duration-300', active ? 'fill-brand-500' : 'fill-brand-400/30 hover:fill-brand-400/60')}
                stroke={active ? '#0c8f6b' : 'transparent'}
                strokeWidth="2"
                onClick={() => onSelect(h.id)}
                role="button"
                tabIndex={0}
                aria-label={h.label}
                aria-pressed={active}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(h.id);
                }}
              />
              {active && (
                <circle cx={h.cx} cy={h.cy} r={h.r + 5} fill="none" stroke="#18b083" strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r" values={`${h.r + 3};${h.r + 9};${h.r + 3}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-1.5">
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => onSelect(h.id)}
            className={cx('chip focus-ring min-h-[38px]', selected === h.id && 'chip-active')}
          >
            {BODY_REGION_ICON[h.id] && <span aria-hidden>{BODY_REGION_ICON[h.id]}</span>} {h.label}
          </button>
        ))}
      </div>
    </div>
  );
}
