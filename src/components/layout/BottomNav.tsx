import { NavLink } from 'react-router-dom';
import { cx } from '../../lib/utils';

const ITEMS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/explore', label: 'Explore', icon: '🧭' },
  { to: '/routines', label: 'Routines', icon: '📋' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-lg sm:hidden"
      style={{ background: 'color-mix(in srgb, var(--surface) 92%, transparent)', borderColor: 'var(--border)' }}
      aria-label="Primary"
    >
      <ul className="flex items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
        {ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'focus-ring flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-brand-500' : 'text-soft',
                )
              }
            >
              <span className="text-lg leading-none" aria-hidden>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
