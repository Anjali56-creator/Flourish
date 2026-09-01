import { useState } from 'react';
import { bodyRegions } from '../data/bodyMap';
import { findTechnique } from '../data';
import { exercises } from '../data/exercises';
import { BodyMap } from '../components/BodyMap';
import { TechniqueCard } from '../components/TechniqueCard';
import { ExerciseCard } from '../components/ExerciseCard';
import { EmptyState } from '../components/ui/EmptyState';

export default function BodyMapPage() {
  const [selected, setSelected] = useState<string | null>('shoulders');
  const region = bodyRegions.find((r) => r.id === selected);
  const relatedYoga = region ? region.yogaIds.map(findTechnique).filter(Boolean) : [];
  const relatedExercises = region ? region.exerciseIds.map((id) => exercises.find((e) => e.id === id)).filter(Boolean) : [];

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Interactive Body Map</h1>
        <p className="text-soft">Tap an area to see targeted mobility, yoga and exercise support.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <BodyMap selected={selected} onSelect={setSelected} />

        <div>
          {!region ? (
            <EmptyState icon="🫆" title="Select a body area to get started" />
          ) : (
            <>
              <div className="mb-6 card p-5">
                <h2 className="mb-1 text-xl font-bold">{region.label}</h2>
                <p className="text-sm text-soft">{region.blurb}</p>
              </div>

              {relatedYoga.length > 0 && (
                <section className="mb-8">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">Yoga for the {region.label.toLowerCase()}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {relatedYoga.map((t) => t && <TechniqueCard key={t.id} technique={t} />)}
                  </div>
                </section>
              )}

              {relatedExercises.length > 0 && (
                <section>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-soft">Exercises for the {region.label.toLowerCase()}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {relatedExercises.map((e) => e && <ExerciseCard key={e.id} exercise={e} />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
