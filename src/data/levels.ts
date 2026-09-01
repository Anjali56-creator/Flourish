import type { LevelTier } from '../types';

export const levelTiers: LevelTier[] = [
  { name: 'Starter', minXp: 0, icon: '🌱' },
  { name: 'Consistent', minXp: 150, icon: '🔥' },
  { name: 'Flow Seeker', minXp: 400, icon: '🌊' },
  { name: 'Mindful Mover', minXp: 900, icon: '🧘' },
  { name: 'Wellness Beast', minXp: 1800, icon: '⚡' },
];

export function getLevel(xp: number): { current: LevelTier; next: LevelTier | null; progress: number } {
  let current = levelTiers[0];
  let next: LevelTier | null = levelTiers[1] ?? null;
  for (let i = 0; i < levelTiers.length; i++) {
    if (xp >= levelTiers[i].minXp) {
      current = levelTiers[i];
      next = levelTiers[i + 1] ?? null;
    }
  }
  const progress = next ? Math.min(1, (xp - current.minXp) / (next.minXp - current.minXp)) : 1;
  return { current, next, progress };
}
