import { useStore } from '../lib/store';
import { useToast } from '../components/ui/Toast';

export default function Settings() {
  const { theme, toggleTheme } = useStore();
  const { push } = useToast();

  function resetData() {
    if (!window.confirm('This clears all your saved progress, favorites and routines on this device. Continue?')) return;
    window.localStorage.clear();
    window.location.reload();
  }

  function exportData() {
    const data: Record<string, unknown> = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith('wellness.')) data[key] = JSON.parse(window.localStorage.getItem(key) ?? 'null');
    }
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2)).then(
      () => push('Data copied to clipboard', '📋'),
      () => push('Could not copy — check browser permissions', '⚠️'),
    );
  }

  return (
    <div className="mx-auto max-w-xl animate-fade-up">
      <h1 className="font-display mb-6 text-3xl font-extrabold">Settings</h1>

      <section className="mb-6 card p-6">
        <h2 className="mb-1 text-sm font-bold">Appearance</h2>
        <p className="mb-4 text-sm text-soft">Switch between light and dark mode. Your choice is remembered on this device.</p>
        <button type="button" onClick={toggleTheme} className="btn-primary focus-ring">
          {theme === 'dark' ? '☀️ Switch to light mode' : '🌙 Switch to dark mode'}
        </button>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-1 text-sm font-bold">Motion</h2>
        <p className="text-sm text-soft">
          Animations automatically simplify if your device's "reduce motion" accessibility setting is turned on.
        </p>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-1 text-sm font-bold">Your data</h2>
        <p className="mb-4 text-sm text-soft">
          Everything — favorites, routines, XP, mood history — is stored only in this browser via local storage. Nothing is sent to a server.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportData} className="btn-ghost focus-ring">Copy my data</button>
          <button type="button" onClick={resetData} className="btn-ghost focus-ring !border-rose-300 !text-rose-500">Reset all data</button>
        </div>
      </section>
    </div>
  );
}
