import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';
import { globalSearch } from '../lib/search';
import { totalMinutes } from '../lib/recommend';
import { EmptyState } from '../components/ui/EmptyState';
import { cx, formatMinutes } from '../lib/utils';

const TYPE_ICON: Record<string, string> = { yoga: '🧘', meditation: '🌬️', breathwork: '🌬️', exercise: '💪' };

export default function RoutineBuilderPage() {
  const { draftSteps, addToDraft, removeFromDraft, reorderDraft, updateDraftStep, clearDraft, routines, saveRoutine, deleteRoutine } = useStore();
  const navigate = useNavigate();
  const { push } = useToast();
  const [name, setName] = useState('My Custom Routine');
  const [query, setQuery] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const minutes = totalMinutes(draftSteps);
  const searchResults = query.trim() ? globalSearch(query).filter((r) => r.kind !== 'food' && r.kind !== 'issue' && r.kind !== 'routine') : [];

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= draftSteps.length) return;
    reorderDraft(index, target);
  }

  function handleSave() {
    if (draftSteps.length === 0) {
      push('Add at least one activity first', '⚠️');
      return;
    }
    saveRoutine({ id: `custom-${Date.now()}`, name, steps: draftSteps });
    push('Routine saved!', '📋');
    clearDraft();
  }

  const customRoutines = routines.filter((r) => !r.preset && !r.id.startsWith('rec-'));
  const presets = routines.filter((r) => r.preset);

  return (
    <div className="animate-fade-up">
      <header className="mb-6">
        <h1 className="font-display mb-2 text-3xl font-extrabold">Routine Builder</h1>
        <p className="text-soft">Combine yoga, exercise and meditation into your own routine. Drag to reorder.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="card mb-6 p-5">
            <label htmlFor="routine-name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-soft">Routine name</label>
            <input
              id="routine-name"
              className="input mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {draftSteps.length === 0 ? (
              <EmptyState icon="📋" title="Your routine is empty" subtitle="Search below or visit any library to add activities." />
            ) : (
              <ul className="space-y-2" aria-label="Routine steps, drag to reorder">
                {draftSteps.map((s, i) => (
                  <li
                    key={`${s.refId}-${i}`}
                    draggable
                    onDragStart={() => setDragIndex(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragIndex !== null && dragIndex !== i) reorderDraft(dragIndex, i);
                      setDragIndex(null);
                    }}
                    className={cx(
                      'flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all',
                      dragIndex === i ? 'opacity-50' : 'opacity-100',
                    )}
                    style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
                  >
                    <span className="cursor-grab text-soft" aria-hidden>⠿</span>
                    <span className="text-lg" aria-hidden>{TYPE_ICON[s.refType] ?? '✨'}</span>
                    <span className="flex-1 text-sm font-medium">{s.name}</span>
                    <input
                      type="number"
                      min={1}
                      value={s.minutes}
                      onChange={(e) => updateDraftStep(i, Math.max(1, Number(e.target.value) || 1))}
                      className="input !w-16 !py-1.5 text-center text-xs"
                      aria-label={`Minutes for ${s.name}`}
                    />
                    <div className="flex flex-col">
                      <button type="button" onClick={() => move(i, -1)} className="focus-ring text-xs text-soft hover:text-current" aria-label="Move up">▲</button>
                      <button type="button" onClick={() => move(i, 1)} className="focus-ring text-xs text-soft hover:text-current" aria-label="Move down">▼</button>
                    </div>
                    <button type="button" onClick={() => removeFromDraft(i)} className="focus-ring text-lg text-soft hover:text-rose-500" aria-label={`Remove ${s.name}`}>
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-5">
            <label htmlFor="routine-search" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-soft">Add activities</label>
            <input
              id="routine-search"
              type="search"
              className="input mb-3"
              placeholder="Search yoga, meditation or exercises to add"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="max-h-60 space-y-1 overflow-auto">
                {searchResults.map((r) => (
                  <li key={`${r.kind}-${r.id}`}>
                    <button
                      type="button"
                      onClick={() => {
                        addToDraft({ refId: r.id, refType: r.kind === 'food' || r.kind === 'issue' || r.kind === 'routine' ? 'yoga' : r.kind, name: r.title, minutes: 3 });
                        push(`${r.title} added`, '➕');
                      }}
                      className="focus-ring flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-brand-50 dark:hover:bg-white/5"
                    >
                      <span>{r.title}</span>
                      <span className="text-soft">+ add</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card mb-6 p-5 text-center">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-soft">Total duration</p>
            <p className="mb-4 text-3xl font-extrabold text-brand-600 dark:text-brand-300">{formatMinutes(minutes)}</p>
            <div className="flex gap-2">
              <button type="button" onClick={handleSave} className="btn-primary focus-ring flex-1">Save Routine</button>
              <button type="button" onClick={clearDraft} className="btn-ghost focus-ring">Clear</button>
            </div>
          </div>

          {customRoutines.length > 0 && (
            <div className="card mb-6 p-5">
              <h2 className="mb-3 text-sm font-bold">My saved routines</h2>
              <ul className="space-y-2">
                {customRoutines.map((r) => (
                  <li key={r.id} className="rounded-xl surface-2 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold">{r.name}</span>
                      <span className="text-xs text-soft">{formatMinutes(totalMinutes(r.steps))}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/session/${r.id}`)}
                        className="btn-primary focus-ring flex-1 !py-1.5 text-xs"
                      >
                        ▶ Start
                      </button>
                      <button type="button" onClick={() => deleteRoutine(r.id)} className="btn-ghost focus-ring !py-1.5 text-xs">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card p-5">
            <h2 className="mb-3 text-sm font-bold">Preset routines</h2>
            <ul className="space-y-2">
              {presets.map((r) => (
                <li key={r.id} className="rounded-xl surface-2 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-semibold">{r.name}</span>
                    <span className="text-xs text-soft">{formatMinutes(totalMinutes(r.steps))}</span>
                  </div>
                  <p className="mb-2 text-xs text-soft">{r.description}</p>
                  <button
                    type="button"
                    onClick={() => navigate(`/session/${r.id}`)}
                    className="btn-primary focus-ring w-full !py-1.5 text-xs"
                  >
                    ▶ Start
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
