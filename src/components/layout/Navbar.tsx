import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { cx } from '../../lib/utils';
import { SearchBar } from '../SearchBar';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/explore', label: 'Explore' },
  { to: '/issues', label: 'Issues & Goals' },
  { to: '/yoga', label: 'Yoga' },
  { to: '/meditation', label: 'Meditation' },
  { to: '/exercises', label: 'Exercise' },
  { to: '/food', label: 'Food' },
  { to: '/body-map', label: 'Body Map' },
  { to: '/routines', label: 'Routines' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/progress', label: 'Progress' },
];

export function Navbar() {
  const { theme, toggleTheme, streak } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-lg"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 focus-ring rounded-xl shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-grape-500 text-lg" aria-hidden>
            🌿
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">Flourish</span>
        </NavLink>

        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cx(
                  'focus-ring whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300' : 'text-soft hover:text-current',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBar />
        </div>

        <button
          type="button"
          className="btn-ghost focus-ring !px-3 !py-2 md:hidden"
          onClick={() => setSearchOpen((s) => !s)}
          aria-label="Toggle search"
        >
          🔍
        </button>

        <div className="chip hidden sm:inline-flex" aria-label={`${streak} day streak`}>
          🔥 {streak}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="btn-ghost focus-ring !px-3 !py-2"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button
          type="button"
          className="btn-ghost focus-ring !px-3 !py-2 lg:hidden"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {searchOpen && (
        <div className="border-t px-4 py-3 md:hidden" style={{ borderColor: 'var(--border)' }}>
          <SearchBar autoFocus onNavigate={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <nav className="border-t px-4 py-3 lg:hidden" style={{ borderColor: 'var(--border)' }} aria-label="Primary">
          <div className="flex flex-wrap gap-2">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => cx('chip', isActive && 'chip-active')}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
