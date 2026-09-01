export default function About() {
  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      <h1 className="font-display mb-6 text-3xl font-extrabold">About & Safety</h1>

      <section className="mb-6 card p-6">
        <h2 className="mb-2 text-lg font-bold">What Flourish is</h2>
        <p className="text-sm text-soft">
          Flourish is a wellness platform for discovering yoga, meditation, breathwork, mobility, exercise, nutrition and recovery
          content — organized around how you feel, what you need, and how much time you have. It's built for everyday support, not
          clinical treatment.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-sun-400/40 bg-sun-400/10 p-6">
        <h2 className="mb-2 text-lg font-bold">What Flourish is not</h2>
        <p className="mb-3 text-sm text-soft">
          This content is for general wellness and movement education and is not a diagnosis or substitute for professional medical
          advice. Yoga, meditation, exercise and food suggestions on this platform cannot cure, treat, or diagnose any medical
          condition.
        </p>
        <p className="text-sm font-semibold">Please consult a qualified professional, and consider stopping an activity, if you experience:</p>
        <ul className="mt-2 space-y-1 text-sm text-soft">
          <li>⚠️ Severe or worsening pain</li>
          <li>⚠️ A recent injury or surgery</li>
          <li>⚠️ Dizziness or lightheadedness</li>
          <li>⚠️ Chest pain</li>
          <li>⚠️ Difficulty breathing</li>
          <li>⚠️ Any other symptom that concerns you</li>
        </ul>
      </section>

      <section className="mb-6 card p-6">
        <h2 className="mb-2 text-lg font-bold">Your privacy</h2>
        <p className="text-sm text-soft">
          Your mood history, favorites, routines and progress are stored locally in your browser using localStorage. Nothing
          leaves your device unless you choose to export it.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="mb-2 text-lg font-bold">Content approach</h2>
        <p className="text-sm text-soft">
          Every yoga pose, meditation technique, exercise and food entry is a real, widely-taught practice — not generated filler.
          The library is designed to keep growing over time as a structured, reusable dataset.
        </p>
      </section>
    </div>
  );
}
