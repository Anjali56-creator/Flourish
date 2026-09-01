import { allTechniques } from '../data';
import { exercises } from '../data/exercises';
import { foods } from '../data/foods';
import { issues } from '../data/issues';
import { presetRoutines } from '../data/routines';

export interface SearchResult {
  id: string;
  kind: 'yoga' | 'meditation' | 'breathwork' | 'exercise' | 'food' | 'issue' | 'routine';
  title: string;
  subtitle: string;
  href: string;
}

export function globalSearch(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  for (const t of allTechniques) {
    const haystack = [t.name, t.category, ...t.tags, ...t.targetAreas].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        id: t.id,
        kind: t.type === 'yoga' ? 'yoga' : t.type,
        title: t.name,
        subtitle: `${t.type === 'yoga' ? 'Yoga' : t.type === 'exercise' ? 'Exercise' : 'Meditation'} · ${t.duration} min · ${t.difficulty}`,
        href: `/technique/${t.id}`,
      });
    }
  }

  for (const e of exercises) {
    const haystack = [e.name, e.category, ...e.tags, ...e.targetMuscles].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      results.push({ id: e.id, kind: 'exercise', title: e.name, subtitle: `Exercise · ${e.dose}`, href: `/exercise/${e.id}` });
    }
  }

  for (const f of foods) {
    const haystack = [f.name, f.category, ...f.tags].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      results.push({ id: f.id, kind: 'food', title: f.name, subtitle: `Food · ${f.calories} kcal`, href: `/food` });
    }
  }

  for (const i of issues) {
    const haystack = [i.name, i.group, i.blurb, ...i.tags].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      results.push({ id: i.id, kind: 'issue', title: i.name, subtitle: `Issue & Goal · ${i.group}`, href: `/issues/${i.id}` });
    }
  }

  for (const r of presetRoutines) {
    const haystack = [r.name, r.description ?? '', ...(r.tags ?? [])].join(' ').toLowerCase();
    if (haystack.includes(q)) {
      results.push({ id: r.id, kind: 'routine', title: r.name, subtitle: `Routine · ${r.steps.length} steps`, href: `/routines` });
    }
  }

  return results.slice(0, 30);
}
