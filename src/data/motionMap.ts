import { POSE_MAP } from './figureMap';

export type MotionKey =
  | 'sway'
  | 'hinge'
  | 'squat'
  | 'lunge'
  | 'march'
  | 'high-knee'
  | 'jumping-jack'
  | 'calf-raise'
  | 'reach-up'
  | 'side-bend'
  | 'twist'
  | 'neck-stretch'
  | 'cat-cow'
  | 'quadruped'
  | 'cobra'
  | 'prone-lift'
  | 'plank'
  | 'pushup'
  | 'bridge'
  | 'downdog'
  | 'supine'
  | 'seated';

export interface MotionMeta {
  label: string;
  /** seconds for one full loop of the animation — also the rep tempo */
  loop: number;
  breatheIn: string;
  breatheOut: string;
  /** short cue shown large while moving */
  cue: string;
}

export const MOTION_META: Record<MotionKey, MotionMeta> = {
  sway: { label: 'Hold & breathe', loop: 5, breatheIn: 'Inhale, grow tall', breatheOut: 'Exhale, soften', cue: 'Hold steady' },
  hinge: { label: 'Hip hinge', loop: 4, breatheIn: 'Inhale as you rise', breatheOut: 'Exhale as you fold', cue: 'Fold from the hips' },
  squat: { label: 'Squat', loop: 3, breatheIn: 'Inhale as you lower', breatheOut: 'Exhale as you stand', cue: 'Sit back and down' },
  lunge: { label: 'Lunge', loop: 3, breatheIn: 'Inhale as you lower', breatheOut: 'Exhale as you rise', cue: 'Drop the back knee' },
  march: { label: 'March', loop: 1.6, breatheIn: 'Breathe steadily', breatheOut: 'Keep a rhythm', cue: 'Drive the knees' },
  'high-knee': { label: 'High knees', loop: 1.1, breatheIn: 'Short breaths', breatheOut: 'Stay light', cue: 'Knees to hip height' },
  'jumping-jack': { label: 'Jumping jack', loop: 1.1, breatheIn: 'Breathe with the beat', breatheOut: 'Land softly', cue: 'Arms and legs together' },
  'calf-raise': { label: 'Calf raise', loop: 2.4, breatheIn: 'Inhale down', breatheOut: 'Exhale up', cue: 'Rise onto the toes' },
  'reach-up': { label: 'Reach overhead', loop: 4, breatheIn: 'Inhale, reach up', breatheOut: 'Exhale, lower', cue: 'Lengthen tall' },
  'side-bend': { label: 'Side bend', loop: 4, breatheIn: 'Inhale to centre', breatheOut: 'Exhale into the bend', cue: 'Long through the side' },
  twist: { label: 'Rotation', loop: 3.4, breatheIn: 'Inhale to lengthen', breatheOut: 'Exhale to turn', cue: 'Rotate from the ribs' },
  'neck-stretch': { label: 'Neck release', loop: 6, breatheIn: 'Inhale to centre', breatheOut: 'Exhale into the stretch', cue: 'Ear toward shoulder' },
  'cat-cow': { label: 'Cat–Cow flow', loop: 4.5, breatheIn: 'Inhale into Cow', breatheOut: 'Exhale into Cat', cue: 'Move with the breath' },
  quadruped: { label: 'Tabletop', loop: 4, breatheIn: 'Inhale to extend', breatheOut: 'Exhale to hold', cue: 'Long and level' },
  cobra: { label: 'Chest lift', loop: 4, breatheIn: 'Inhale to lift', breatheOut: 'Exhale to lower', cue: 'Lead with the chest' },
  'prone-lift': { label: 'Back lift', loop: 3.6, breatheIn: 'Inhale to lift', breatheOut: 'Exhale to lower', cue: 'Lift long, not high' },
  plank: { label: 'Plank hold', loop: 5, breatheIn: 'Inhale steady', breatheOut: 'Exhale steady', cue: 'One straight line' },
  pushup: { label: 'Push-up', loop: 3, breatheIn: 'Inhale as you lower', breatheOut: 'Exhale as you press', cue: 'Lower with control' },
  bridge: { label: 'Bridge', loop: 3.4, breatheIn: 'Inhale to lower', breatheOut: 'Exhale to lift', cue: 'Press through the heels' },
  downdog: { label: 'Downward Dog', loop: 4.5, breatheIn: 'Inhale, lengthen', breatheOut: 'Exhale, press back', cue: 'Hips up and back' },
  supine: { label: 'Lying release', loop: 5, breatheIn: 'Inhale to expand', breatheOut: 'Exhale to release', cue: 'Let the floor hold you' },
  seated: { label: 'Seated', loop: 5, breatheIn: 'Inhale, sit tall', breatheOut: 'Exhale, settle', cue: 'Tall, easy spine' },
};

/** Explicit id → motion overrides (win over the pose-derived default). */
export const MOTION_MAP: Record<string, MotionKey> = {
  'e-mountain-climbers': 'plank',
  'e-step-touch': 'march',
  'e-hip-circles': 'sway',
  'e-farmer-carry': 'march',
  'e-burpee': 'squat',
  'e-worlds-greatest': 'lunge',
  'e-thoracic-rotation': 'twist',
  'e-band-pull-apart': 'reach-up',
  'e-doorway-stretch': 'side-bend',
  'e-scapular-wall-slide': 'reach-up',
  'e-ankle-circles': 'calf-raise',
  'e-clamshell': 'supine',
  'e-dead-bug': 'supine',
  'e-crunch': 'supine',
  'y-sun-a': 'reach-up',
  'y-desk-reset-flow': 'reach-up',
  'y-gentle-evening-flow': 'cat-cow',
  'y-camel': 'cobra',
  'y-pigeon': 'seated',
  'y-boat': 'seated',
  'y-dancer': 'sway',
  'y-eagle': 'sway',
  'y-tree': 'sway',
};

/** Every pose-art key mapped to a motion archetype, giving full coverage. */
const POSE_TO_MOTION: Record<string, MotionKey> = {
  mountain: 'sway',
  'forward-fold': 'hinge',
  chair: 'squat',
  tree: 'sway',
  'standing-balance': 'sway',
  walking: 'march',
  child: 'cat-cow',
  cat: 'cat-cow',
  cow: 'cat-cow',
  camel: 'cobra',
  puppy: 'cat-cow',
  'thread-needle': 'quadruped',
  cobra: 'cobra',
  sphinx: 'cobra',
  locust: 'prone-lift',
  bow: 'prone-lift',
  'upward-dog': 'cobra',
  savasana: 'supine',
  bridge: 'bridge',
  'legs-up-wall': 'supine',
  'happy-baby': 'supine',
  'supine-twist': 'supine',
  'knees-to-chest': 'supine',
  fish: 'supine',
  'seated-meditation': 'seated',
  'seated-forward-fold': 'seated',
  butterfly: 'seated',
  'seated-twist': 'seated',
  boat: 'seated',
  'staff-pose': 'seated',
  'neck-release': 'neck-stretch',
  'wrist-stretch': 'sway',
  'low-lunge': 'lunge',
  'crescent-lunge': 'lunge',
  pigeon: 'seated',
  malasana: 'squat',
  goddess: 'squat',
  'figure-four': 'supine',
  warrior1: 'reach-up',
  warrior2: 'sway',
  triangle: 'side-bend',
  'half-moon': 'side-bend',
  'side-angle': 'side-bend',
  downdog: 'downdog',
  dolphin: 'downdog',
  plank: 'plank',
  'side-plank': 'plank',
  pushup: 'pushup',
  'crow-pose': 'plank',
  dancer: 'sway',
  'reverse-warrior': 'side-bend',
  squat: 'squat',
  lunge: 'lunge',
  'wall-sit': 'squat',
  'calf-raise': 'calf-raise',
  'dead-bug': 'supine',
  'bird-dog': 'quadruped',
  superman: 'prone-lift',
  'mountain-climber': 'plank',
  'jumping-jack': 'jumping-jack',
  'high-knees': 'high-knee',
  'side-lunge': 'lunge',
  'step-up': 'march',
  clamshell: 'supine',
  'hip-circle': 'sway',
  'farmer-carry': 'march',
  burpee: 'squat',
  'shoulder-tap': 'plank',
  'band-pull-apart': 'reach-up',
  'doorway-stretch': 'side-bend',
  'wall-slide': 'reach-up',
  'thoracic-rotation': 'twist',
  'worlds-greatest': 'lunge',
  'ankle-circle': 'calf-raise',
  'standing-march': 'march',
  'step-touch': 'march',
};

export function resolveMotion(id: string): MotionKey {
  return MOTION_MAP[id] ?? POSE_TO_MOTION[POSE_MAP[id]] ?? 'sway';
}
