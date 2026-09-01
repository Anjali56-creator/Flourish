import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../../lib/utils';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cx('chip focus-ring min-h-[38px] !px-3.5', active && 'chip-active', className)}
      aria-pressed={active}
      {...rest}
    >
      {children}
    </button>
  );
}
