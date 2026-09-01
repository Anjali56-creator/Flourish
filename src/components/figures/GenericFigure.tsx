/**
 * Fallback instructional figure: a neutral standing body with the target
 * area(s) highlighted, so even without a bespoke pose drawing the user can
 * see which part of the body a technique works.
 */

const POINTS: Record<string, [number, number]> = {
  neck: [120, 46],
  head: [120, 30],
  shoulders: [120, 58],
  'front shoulders': [120, 58],
  'rear shoulder': [120, 58],
  chest: [120, 74],
  'upper back': [120, 70],
  back: [120, 82],
  'lower back': [120, 92],
  spine: [120, 78],
  core: [120, 92],
  abdomen: [120, 92],
  abs: [120, 92],
  obliques: [104, 92],
  'side body': [102, 84],
  hips: [120, 108],
  'hip flexors': [120, 108],
  'hip rotators': [120, 108],
  groin: [120, 112],
  glutes: [120, 110],
  'inner thighs': [120, 120],
  quads: [110, 128],
  hamstrings: [128, 128],
  thighs: [120, 128],
  knees: [120, 140],
  calves: [120, 150],
  'standing leg': [120, 135],
  legs: [120, 138],
  ankles: [120, 158],
  feet: [118, 162],
  wrists: [150, 108],
  forearms: [150, 96],
  fingers: [154, 116],
  arms: [148, 88],
  triceps: [146, 80],
  grip: [152, 112],
};

const FULL_BODY = new Set(['full body', 'whole body', 'nervous system', 'heart rate', 'diaphragm', 'lungs', 'attention', 'emotional wellbeing', 'senses', 'digestion', 'eyes', 'face', 'jaw', 'throat', 'head', 'heart rate']);

export function GenericFigure({ targets }: { targets: string[] }) {
  const norm = targets.map((t) => t.toLowerCase());
  const highlightFull = norm.some((t) => FULL_BODY.has(t));
  const dots = norm
    .map((t) => POINTS[t])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <g>
      {/* body outline */}
      <g stroke="currentColor" fill="none" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={highlightFull ? 1 : 0.55}>
        <circle cx={120} cy={32} r={12} fill={highlightFull ? 'currentColor' : 'none'} />
        <path d="M120 44 V112" />
        <path d="M120 58 L96 100 M120 58 L150 100" />
        <path d="M120 112 L106 162 M120 112 L134 162" />
      </g>
      <line x1="40" y1="164" x2="200" y2="164" stroke="currentColor" strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      {/* target highlights */}
      {dots.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={13} fill="currentColor" opacity={0.18} />
          <circle cx={x} cy={y} r={6} fill="currentColor" />
        </g>
      ))}
    </g>
  );
}
