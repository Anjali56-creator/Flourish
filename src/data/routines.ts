import type { Routine } from '../types';

export const presetRoutines: Routine[] = [
  {
    id: 'r-5min-reset',
    name: '5-Minute Reset',
    description: 'A short reset you can do anywhere, anytime.',
    preset: true,
    tags: ['Quick', 'Desk break'],
    steps: [
      { refId: 'm-box-breathing', refType: 'breathwork', name: 'Box Breathing', minutes: 2 },
      { refId: 'y-cat-cow', refType: 'yoga', name: 'Cat-Cow', minutes: 2 },
      { refId: 'y-mountain', refType: 'yoga', name: 'Mountain Pose', minutes: 1 },
    ],
  },
  {
    id: 'r-10min-desk-break',
    name: '10-Minute Desk Break',
    description: 'Undo the effects of sitting in ten focused minutes.',
    preset: true,
    tags: ['Desk break'],
    steps: [
      { refId: 'y-desk-reset-flow', refType: 'yoga', name: 'Desk Reset Flow', minutes: 5 },
      { refId: 'e-scapular-wall-slide', refType: 'exercise', name: 'Scapular Wall Slide', minutes: 3 },
      { refId: 'm-micro-reset', refType: 'meditation', name: 'Micro-Meditation', minutes: 2 },
    ],
  },
  {
    id: 'r-15min-full-body',
    name: '15-Minute Full Body',
    description: 'A balanced full-body session with strength and mobility.',
    preset: true,
    tags: ['Full body', 'Home workout'],
    steps: [
      { refId: 'y-sun-a', refType: 'yoga', name: 'Sun Salutation A', minutes: 4 },
      { refId: 'e-bodyweight-squat', refType: 'exercise', name: 'Bodyweight Squat', minutes: 4 },
      { refId: 'e-plank', refType: 'exercise', name: 'Forearm Plank', minutes: 3 },
      { refId: 'y-legs-wall', refType: 'yoga', name: 'Legs-Up-the-Wall', minutes: 4 },
    ],
  },
  {
    id: 'r-morning-mobility',
    name: 'Morning Mobility',
    description: 'Wake the body up gently before the day begins.',
    preset: true,
    tags: ['Morning'],
    steps: [
      { refId: 'm-morning-intention', refType: 'meditation', name: 'Morning Intention Setting', minutes: 3 },
      { refId: 'y-cat-cow', refType: 'yoga', name: 'Cat-Cow', minutes: 3 },
      { refId: 'y-sun-a', refType: 'yoga', name: 'Sun Salutation A', minutes: 6 },
    ],
  },
  {
    id: 'r-evening-wind-down',
    name: 'Evening Wind Down',
    description: 'Ease into rest with gentle movement and breath.',
    preset: true,
    tags: ['Evening', 'Sleep'],
    steps: [
      { refId: 'y-gentle-evening-flow', refType: 'yoga', name: 'Gentle Evening Flow', minutes: 10 },
      { refId: 'm-bedtime-softening', refType: 'meditation', name: 'Bedtime Body Softening', minutes: 8 },
    ],
  },
  {
    id: 'r-beginner-strength',
    name: 'Beginner Strength',
    description: 'A gentle introduction to bodyweight strength training.',
    preset: true,
    tags: ['Strength', 'Beginner'],
    steps: [
      { refId: 'e-bodyweight-squat', refType: 'exercise', name: 'Bodyweight Squat', minutes: 4 },
      { refId: 'e-glute-bridge', refType: 'exercise', name: 'Glute Bridge', minutes: 4 },
      { refId: 'e-incline-pushup', refType: 'exercise', name: 'Incline Push-Up', minutes: 4 },
      { refId: 'e-plank', refType: 'exercise', name: 'Forearm Plank', minutes: 3 },
    ],
  },
  {
    id: 'r-post-study-stretch',
    name: 'Post-Study Stretch',
    description: 'Release the tension of sitting and studying.',
    preset: true,
    tags: ['Desk break', 'Recovery'],
    steps: [
      { refId: 'y-neck-release', refType: 'yoga', name: 'Seated Neck Release', minutes: 2 },
      { refId: 'y-seated-twist', refType: 'yoga', name: 'Seated Spinal Twist', minutes: 3 },
      { refId: 'y-standing-fold', refType: 'yoga', name: 'Standing Forward Fold', minutes: 3 },
    ],
  },
  {
    id: 'r-post-work-recovery',
    name: 'Post-Work Recovery',
    description: 'Transition out of work mode and into rest.',
    preset: true,
    tags: ['Recovery', 'Evening'],
    steps: [
      { refId: 'y-puppy', refType: 'yoga', name: 'Puppy Pose', minutes: 3 },
      { refId: 'y-supine-twist', refType: 'yoga', name: 'Reclined Spinal Twist', minutes: 4 },
      { refId: 'm-evening-reflection', refType: 'meditation', name: 'Evening Reflection', minutes: 6 },
    ],
  },
];
