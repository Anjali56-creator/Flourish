import { yoga } from './yoga';
import { meditation } from './meditation';
import type { Technique } from '../types';

export { yoga } from './yoga';
export { meditation } from './meditation';
export { exercises } from './exercises';
export { foods } from './foods';
export { issues } from './issues';
export { moods, moodMap } from './moods';
export { challenges } from './challenges';
export { levelTiers, getLevel } from './levels';
export { bodyRegions } from './bodyMap';
export { presetRoutines } from './routines';

/** All yoga + meditation/breathwork techniques combined — 100+ entries. */
export const allTechniques: Technique[] = [...yoga, ...meditation];

export function findTechnique(id: string): Technique | undefined {
  return allTechniques.find((t) => t.id === id);
}
