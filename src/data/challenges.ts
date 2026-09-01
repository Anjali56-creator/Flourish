import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  { id: 'c-no-phone-5', name: '5-Minute No-Phone Reset', description: 'Put the phone in another room and sit with your own thoughts, breath, or a stretch for 5 minutes.', durationLabel: '5 min', xp: 15, icon: '📵', category: 'Digital fatigue' },
  { id: 'c-toes', name: 'Touch Your Toes Challenge', description: 'Warm up gently, then see how close you can comfortably get — no forcing, no bouncing.', durationLabel: '3 min', xp: 10, icon: '🦶', category: 'Flexibility' },
  { id: 'c-walk-10', name: '10-Minute Walk Challenge', description: 'Step outside (or pace indoors) for a brisk 10-minute walk, phone away or on silent.', durationLabel: '10 min', xp: 20, icon: '🚶', category: 'Movement' },
  { id: 'c-breathing-3', name: '3-Minute Breathing Reset', description: 'Run through Box Breathing or Coherent Breathing for three full minutes.', durationLabel: '3 min', xp: 10, icon: '🌬️', category: 'Stress relief' },
  { id: 'c-hydrate', name: 'Hydration Check-In', description: 'Drink a full glass of water right now and notice how you feel afterward.', durationLabel: '1 min', xp: 5, icon: '💧', category: 'Wellness' },
  { id: 'c-posture', name: 'Posture Reset', description: 'Stand up, roll the shoulders back, lengthen the spine, and hold Mountain Pose for one minute.', durationLabel: '1 min', xp: 8, icon: '🧍', category: 'Posture' },
  { id: 'c-gratitude-3', name: '3 Things Gratitude Challenge', description: 'Write or think of three specific things that went well today.', durationLabel: '3 min', xp: 10, icon: '🙏', category: 'Mindfulness' },
  { id: 'c-sun-salute', name: 'One Sun Salutation', description: 'Flow through a single round of Sun Salutation A, slowly and with full breath.', durationLabel: '3 min', xp: 12, icon: '☀️', category: 'Yoga' },
  { id: 'c-desk-break', name: 'Desk Break Mobility', description: 'Complete the Desk Reset Flow before you sit back down.', durationLabel: '5 min', xp: 15, icon: '🪑', category: 'Mobility' },
  { id: 'c-early-wind-down', name: 'Early Wind-Down', description: 'Start your bedtime routine 15 minutes earlier than usual tonight.', durationLabel: '15 min', xp: 20, icon: '🌙', category: 'Sleep' },
  { id: 'c-no-sugar-snack', name: 'Swap One Snack', description: 'Trade one processed snack today for a piece of fruit or a handful of nuts.', durationLabel: '1 min', xp: 8, icon: '🍎', category: 'Nutrition' },
  { id: 'c-stretch-before-bed', name: 'Stretch Before Bed', description: "Do Legs-Up-the-Wall or Child's Pose for 3 minutes before turning off the lights.", durationLabel: '3 min', xp: 12, icon: '🛌', category: 'Recovery' },
];
