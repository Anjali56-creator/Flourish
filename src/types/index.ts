export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type TechniqueType = 'yoga' | 'meditation' | 'breathwork' | 'exercise';

/** Core reusable content object — every library item conforms to this shape. */
export interface Technique {
  id: string;
  name: string;
  type: TechniqueType;
  category: string;
  difficulty: Level;
  /** minutes */
  duration: number;
  targetAreas: string[];
  benefits: string[];
  instructions: string[];
  breathing?: string;
  precautions: string[];
  tags: string[];
  /** moods this technique helps with, keyed by MoodId */
  moods?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: Level;
  targetMuscles: string[];
  equipment: string;
  /** e.g. "3 x 12" or "45 sec" */
  dose: string;
  duration: number;
  instructions: string[];
  commonMistakes: string[];
  safety: string[];
  tags: string[];
}

export interface Food {
  id: string;
  name: string;
  category: string;
  group: 'Energy' | 'Wellness' | 'Lifestyle';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  keyNutrients: string[];
  serving: string;
  prep: string;
  bestTime: string;
  tags: string[];
}

export interface Issue {
  id: string;
  name: string;
  group: string;
  blurb: string;
  explanation: string;
  yogaIds: string[];
  exerciseIds: string[];
  meditationIds: string[];
  mobility: string[];
  foods: string[];
  beginnerRoutine: string[];
  safetyNotes: string[];
  tags: string[];
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
  recommend: string;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  durationLabel: string;
  xp: number;
  icon: string;
  category: string;
}

export interface RoutineStep {
  refId: string;
  refType: TechniqueType;
  name: string;
  minutes: number;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  steps: RoutineStep[];
  preset?: boolean;
  tags?: string[];
}

export interface BodyRegion {
  id: string;
  label: string;
  /** SVG path or ellipse coords handled in component */
  blurb: string;
  yogaIds: string[];
  exerciseIds: string[];
}

export interface LevelTier {
  name: string;
  minXp: number;
  icon: string;
}

export interface SessionLog {
  id: string;
  date: string; // ISO date (yyyy-mm-dd)
  type: TechniqueType | 'routine';
  refId: string;
  name: string;
  minutes: number;
  xp: number;
}

export interface MoodLog {
  date: string;
  moodId: string;
}

export type WeeklyGoal =
  | 'move-more'
  | 'sleep-better'
  | 'reduce-stress'
  | 'improve-flexibility'
  | 'build-strength'
  | 'improve-posture';

export interface UserProfile {
  name: string;
  ageGroup: '13-17' | '18-24' | '25-34' | '35+';
  experience: Level;
  onboarded: boolean;
  weeklyGoals: WeeklyGoal[];
  equipment: string[];
}
