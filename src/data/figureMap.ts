import type { BreathPhase } from '../components/figures/BreathingPattern';
import { POSE_ART } from '../components/figures/poseArt';

/** technique / exercise id  ->  pose-art key */
export const POSE_MAP: Record<string, string> = {
  // yoga
  'y-mountain': 'mountain',
  'y-child': 'child',
  'y-cat-cow': 'cat',
  'y-downdog': 'downdog',
  'y-cobra': 'cobra',
  'y-sphinx': 'sphinx',
  'y-bridge': 'bridge',
  'y-warrior1': 'warrior1',
  'y-warrior2': 'warrior2',
  'y-warrior3': 'standing-balance',
  'y-triangle': 'triangle',
  'y-tree': 'tree',
  'y-chair': 'chair',
  'y-seated-fold': 'seated-forward-fold',
  'y-butterfly': 'butterfly',
  'y-pigeon': 'pigeon',
  'y-low-lunge': 'low-lunge',
  'y-crescent': 'crescent-lunge',
  'y-happy-baby': 'happy-baby',
  'y-legs-wall': 'legs-up-wall',
  'y-savasana': 'savasana',
  'y-standing-fold': 'forward-fold',
  'y-half-fold': 'forward-fold',
  'y-side-angle': 'side-angle',
  'y-wide-fold': 'forward-fold',
  'y-reverse-warrior': 'reverse-warrior',
  'y-seated-twist': 'seated-twist',
  'y-supine-twist': 'supine-twist',
  'y-thread-needle': 'thread-needle',
  'y-puppy': 'puppy',
  'y-camel': 'camel',
  'y-locust': 'locust',
  'y-bow': 'bow',
  'y-updog': 'upward-dog',
  'y-plank': 'plank',
  'y-side-plank': 'side-plank',
  'y-boat': 'boat',
  'y-half-moon': 'half-moon',
  'y-eagle': 'standing-balance',
  'y-dancer': 'dancer',
  'y-malasana': 'malasana',
  'y-lizard': 'low-lunge',
  'y-supta-baddha': 'butterfly',
  'y-upavistha': 'seated-forward-fold',
  'y-janu': 'seated-forward-fold',
  'y-fish': 'fish',
  'y-wind-relieving': 'knees-to-chest',
  'y-rabbit': 'child',
  'y-dolphin': 'dolphin',
  'y-goddess': 'goddess',
  'y-crow': 'crow-pose',
  'y-easy-pose': 'seated-meditation',
  'y-staff': 'staff-pose',
  'y-standing-split': 'standing-balance',
  'y-supported-backbend': 'fish',
  'y-neck-release': 'neck-release',
  'y-wrist-flows': 'wrist-stretch',
  'y-sun-a': 'downdog',
  'y-gentle-evening-flow': 'child',
  'y-desk-reset-flow': 'neck-release',

  // meditation (non-breath)
  'm-breath-counting': 'seated-meditation',
  'm-body-scan': 'savasana',
  'm-mindfulness': 'seated-meditation',
  'm-loving-kindness': 'seated-meditation',
  'm-guided-relaxation': 'savasana',
  'm-visualization': 'seated-meditation',
  'm-walking': 'walking',
  'm-trataka': 'seated-meditation',
  'm-breath-awareness': 'seated-meditation',
  'm-pmr': 'savasana',
  'm-gratitude': 'seated-meditation',
  'm-sleep-meditation': 'savasana',
  'm-noting': 'seated-meditation',
  'm-open-awareness': 'seated-meditation',
  'm-nada': 'seated-meditation',
  'm-mantra': 'seated-meditation',
  'm-rain': 'seated-meditation',
  'm-grounding-54321': 'mountain',
  'm-mountain-meditation': 'mountain',
  'm-self-compassion': 'seated-meditation',
  'm-compassionate-scan': 'savasana',
  'm-micro-reset': 'seated-meditation',
  'm-morning-intention': 'seated-meditation',
  'm-evening-reflection': 'seated-meditation',
  'm-urge-surfing': 'seated-meditation',
  'm-mindful-eating': 'seated-meditation',
  'm-affectionate-breathing': 'savasana',
  'm-anchor-word': 'seated-meditation',
  'm-bedtime-softening': 'savasana',
  'm-loving-kindness-difficult': 'seated-meditation',
  'm-focus-productivity': 'seated-meditation',
  'm-digital-detox-pause': 'neck-release',
  'm-worry-time': 'seated-meditation',

  // exercises
  'e-bodyweight-squat': 'squat',
  'e-glute-bridge': 'bridge',
  'e-wall-sit': 'wall-sit',
  'e-lunges': 'lunge',
  'e-calf-raise': 'calf-raise',
  'e-plank': 'plank',
  'e-dead-bug': 'dead-bug',
  'e-bird-dog': 'bird-dog',
  'e-crunch': 'dead-bug',
  'e-pushup': 'pushup',
  'e-incline-pushup': 'pushup',
  'e-superman': 'superman',
  'e-band-pull-apart': 'band-pull-apart',
  'e-doorway-stretch': 'doorway-stretch',
  'e-scapular-wall-slide': 'wall-slide',
  'e-jumping-jacks': 'jumping-jack',
  'e-high-knees': 'high-knees',
  'e-mountain-climbers': 'mountain-climber',
  'e-step-touch': 'step-touch',
  'e-side-lunge': 'side-lunge',
  'e-hip-thrust': 'bridge',
  'e-clamshell': 'clamshell',
  'e-hip-circles': 'hip-circle',
  'e-ankle-circles': 'ankle-circle',
  'e-worlds-greatest': 'worlds-greatest',
  'e-thoracic-rotation': 'thoracic-rotation',
  'e-farmer-carry': 'farmer-carry',
  'e-burpee': 'burpee',
  'e-shoulder-taps': 'shoulder-tap',
  'e-standing-march': 'standing-march',
  'e-step-up': 'step-up',
};

/** breathwork id  ->  phase diagram */
export const BREATH_PATTERNS: Record<string, BreathPhase[]> = {
  'm-box-breathing': [
    { kind: 'in', count: 4 },
    { kind: 'hold', count: 4 },
    { kind: 'out', count: 4 },
    { kind: 'hold', count: 4 },
  ],
  'm-478': [
    { kind: 'in', count: 4 },
    { kind: 'hold', count: 7 },
    { kind: 'out', count: 8 },
  ],
  'm-diaphragmatic': [
    { kind: 'in', count: 5, label: 'Belly in' },
    { kind: 'out', count: 6, label: 'Belly out' },
  ],
  'm-nadi-shodhana': [
    { kind: 'in', count: 4, label: 'In left' },
    { kind: 'out', count: 4, label: 'Out right' },
    { kind: 'in', count: 4, label: 'In right' },
    { kind: 'out', count: 4, label: 'Out left' },
  ],
  'm-coherent': [
    { kind: 'in', count: 5 },
    { kind: 'out', count: 5 },
  ],
  'm-extended-exhale': [
    { kind: 'in', count: 4 },
    { kind: 'out', count: 8 },
  ],
  'm-ujjayi': [
    { kind: 'in', count: 5, label: 'Ocean in' },
    { kind: 'out', count: 5, label: 'Ocean out' },
  ],
  'm-bhramari': [
    { kind: 'in', count: 4 },
    { kind: 'out', count: 8, label: 'Hum out' },
  ],
  'm-sitali': [
    { kind: 'in', count: 4, label: 'Cool in' },
    { kind: 'out', count: 6, label: 'Nose out' },
  ],
  'm-kapalabhati': [
    { kind: 'out', count: 1 },
    { kind: 'in', count: 1 },
    { kind: 'out', count: 1 },
    { kind: 'in', count: 1 },
    { kind: 'out', count: 1 },
    { kind: 'in', count: 1 },
  ],
  'm-three-part': [
    { kind: 'in', count: 6, label: '3-part in' },
    { kind: 'out', count: 6, label: '3-part out' },
  ],
  'm-physiological-sigh': [
    { kind: 'in', count: 3 },
    { kind: 'in', count: 1, label: 'Top-up' },
    { kind: 'out', count: 6 },
  ],
  'm-straw-breath': [
    { kind: 'in', count: 2 },
    { kind: 'out', count: 4 },
  ],
  'm-energising-rounds': [
    { kind: 'in', count: 2 },
    { kind: 'out', count: 2 },
    { kind: 'in', count: 2 },
    { kind: 'out', count: 2 },
    { kind: 'hold', count: 8, label: 'Hold empty' },
  ],
  'm-square-visual': [
    { kind: 'in', count: 4 },
    { kind: 'hold', count: 4 },
    { kind: 'out', count: 4 },
    { kind: 'hold', count: 4 },
  ],
  'm-lions-breath': [
    { kind: 'in', count: 4 },
    { kind: 'out', count: 2, label: 'Ha! out' },
  ],
  'm-voo-breath': [
    { kind: 'in', count: 4 },
    { kind: 'out', count: 8, label: 'Voo out' },
  ],
};

export type ResolvedFigure =
  | { kind: 'pose'; poseKey: string }
  | { kind: 'breath'; phases: BreathPhase[] }
  | { kind: 'generic'; targets: string[] };

interface FigureInput {
  id: string;
  type?: string;
  targetAreas?: string[];
  targetMuscles?: string[];
}

export function resolveFigure(item: FigureInput): ResolvedFigure {
  if (BREATH_PATTERNS[item.id]) return { kind: 'breath', phases: BREATH_PATTERNS[item.id] };
  const poseKey = POSE_MAP[item.id];
  if (poseKey && POSE_ART[poseKey]) return { kind: 'pose', poseKey };
  return { kind: 'generic', targets: item.targetAreas ?? item.targetMuscles ?? [] };
}
