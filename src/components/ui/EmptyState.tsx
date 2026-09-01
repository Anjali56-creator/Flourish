interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = '🌿', title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed py-16 text-center" style={{ borderColor: 'var(--border)' }}>
      <span className="text-4xl" aria-hidden>{icon}</span>
      <p className="text-base font-semibold">{title}</p>
      {subtitle && <p className="max-w-xs text-sm text-soft">{subtitle}</p>}
      {action}
    </div>
  );
}
