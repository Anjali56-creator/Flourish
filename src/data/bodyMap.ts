import type { BodyRegion } from '../types';

export const bodyRegions: BodyRegion[] = [
  { id: 'neck', label: 'Neck', blurb: 'Ease tension from screens and stress with slow mobility work.', yogaIds: ['y-neck-release', 'y-thread-needle'], exerciseIds: ['e-scapular-wall-slide'] },
  { id: 'shoulders', label: 'Shoulders', blurb: 'Open tight shoulders with rotational and gentle strength work.', yogaIds: ['y-cow-face', 'y-eagle', 'y-thread-needle'], exerciseIds: ['e-band-pull-apart', 'e-doorway-stretch'] },
  { id: 'back', label: 'Back', blurb: 'Support the whole spine with mobility, extension and gentle strength.', yogaIds: ['y-cat-cow', 'y-cobra', 'y-child'], exerciseIds: ['e-bird-dog', 'e-superman'] },
  { id: 'arms', label: 'Arms', blurb: 'Release tension and build light strength through the arms.', yogaIds: ['y-plank', 'y-side-plank'], exerciseIds: ['e-pushup', 'e-incline-pushup'] },
  { id: 'wrists', label: 'Wrists', blurb: 'Relieve stiffness from typing and phone use.', yogaIds: ['y-wrist-flows', 'y-dolphin'], exerciseIds: [] },
  { id: 'core', label: 'Core', blurb: 'Build the deep stability that supports your whole posture.', yogaIds: ['y-boat', 'y-plank'], exerciseIds: ['e-dead-bug', 'e-bird-dog', 'e-plank'] },
  { id: 'hips', label: 'Hips', blurb: 'Open hips tightened by long sitting.', yogaIds: ['y-pigeon', 'y-butterfly', 'y-malasana', 'y-low-lunge'], exerciseIds: ['e-hip-circles', 'e-clamshell'] },
  { id: 'knees', label: 'Knees', blurb: 'Support comfortable movement with gentle strengthening around the joint.', yogaIds: ['y-chair', 'y-bridge'], exerciseIds: ['e-bodyweight-squat', 'e-wall-sit'] },
  { id: 'ankles', label: 'Ankles', blurb: 'Improve range and stability at the ankle.', yogaIds: ['y-malasana', 'y-downdog'], exerciseIds: ['e-ankle-circles', 'e-calf-raise'] },
  { id: 'legs', label: 'Legs', blurb: 'Stretch and strengthen the legs for everyday ease.', yogaIds: ['y-seated-fold', 'y-warrior2', 'y-triangle'], exerciseIds: ['e-lunges', 'e-side-lunge', 'e-hip-thrust'] },
];
