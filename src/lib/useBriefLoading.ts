import { useEffect, useState } from 'react';

/**
 * Data in this app is synchronous, but a short, honest loading beat lets the
 * skeleton UI render so pages don't "pop" and feel jarring — especially on
 * slower devices where the technique grids take a frame or two to lay out.
 */
export function useBriefLoading(ms = 220): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(t);
  }, [ms]);
  return loading;
}
