/**
 * Central icon vocabulary. Emoji are used deliberately: they are instantly
 * recognizable, render consistently across platforms, and are theme-independent.
 * Every surface that shows a category should pull its glyph from here so the
 * visual language stays consistent.
 */

export const TYPE_ICON: Record<string, string> = {
  yoga: '🧘',
  meditation: '🧠',
  breathwork: '🌬️',
  exercise: '💪',
  routine: '📋',
  food: '🥗',
  issue: '🎯',
};

export const DIFFICULTY_ICON: Record<string, string> = {
  Beginner: '🟢',
  Intermediate: '🟡',
  Advanced: '🔴',
};

/** Issue groups + common wellness concerns. */
export const CONCERN_ICON: Record<string, string> = {
  'Mental & Emotional Wellness': '🧠',
  'Neck, Shoulder & Upper Body': '💆',
  'Back & Core': '🌀',
  'Legs & Joints': '🦵',
  Lifestyle: '🌱',
  // specific concerns
  stress: '😮‍💨',
  anxiety: '💗',
  sleep: '😴',
  'low mood': '🌤️',
  focus: '🎯',
  burnout: '🪫',
  overthinking: '🔁',
  neck: '🦢',
  shoulders: '🎽',
  'shoulder stiffness': '🎽',
  back: '🪑',
  'lower back': '🪑',
  posture: '🧍',
  hips: '🕺',
  knees: '🦵',
  ankles: '🦶',
  wrists: '✋',
  hamstrings: '🦵',
  energy: '⚡',
  recovery: '♻️',
  mobility: '🔄',
  flexibility: '🤸',
  screen: '📵',
  'digital fatigue': '📵',
};

/** Library filter / focus keywords. */
export const FOCUS_ICON: Record<string, string> = {
  Beginner: '🟢',
  Intermediate: '🟡',
  Advanced: '🔴',
  Flexibility: '🤸',
  Mobility: '🔄',
  Relaxation: '🌙',
  Strength: '💪',
  Balance: '⚖️',
  Posture: '🧍',
  Recovery: '♻️',
  Morning: '🌅',
  Evening: '🌆',
  'Desk break': '🪑',
  Cardio: '❤️‍🔥',
  Core: '🎯',
  Legs: '🦵',
  'Upper body': '🎽',
  'Full body': '🧍',
  'Stress relief': '😮‍💨',
  Focus: '🎯',
  Sleep: '😴',
  'Anxiety support': '💗',
  'Emotional regulation': '💗',
  Productivity: '📈',
  Mindfulness: '🧘',
  'Desk workouts': '🪑',
  'Home workouts': '🏠',
  'No-equipment': '🙌',
};

export const BODY_REGION_ICON: Record<string, string> = {
  neck: '🦢',
  shoulders: '🎽',
  back: '🪑',
  arms: '💪',
  wrists: '✋',
  core: '🎯',
  hips: '🕺',
  knees: '🦵',
  ankles: '🦶',
  legs: '🦵',
};

export const FOOD_GROUP_ICON: Record<string, string> = {
  Energy: '⚡',
  Wellness: '🌿',
  Lifestyle: '🍽️',
};

export function concernIcon(key: string): string {
  return CONCERN_ICON[key] ?? CONCERN_ICON[key.toLowerCase()] ?? '•';
}
