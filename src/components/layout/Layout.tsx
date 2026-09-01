import { Link, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';

export function Layout() {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pb-12">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-28 pt-4 text-center text-xs text-soft sm:px-6 sm:pb-10">
        <p className="mx-auto max-w-2xl">
          For general wellness and movement education only — not a diagnosis or substitute for professional medical advice.{' '}
          <Link to="/about" className="focus-ring font-semibold underline">Read our safety notes</Link>.
        </p>
      </footer>
      <BottomNav />
    </div>
  );
}
