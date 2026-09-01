import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

interface ToastItem {
  id: number;
  message: string;
  icon?: string;
}

interface ToastContextShape {
  push: (message: string, icon?: string) => void;
}

const ToastContext = createContext<ToastContextShape | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const push = useCallback((message: string, icon?: string) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, icon }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto card animate-scale-in flex items-center gap-2 rounded-2xl px-4 py-3 shadow-lift"
          >
            {t.icon && <span className="text-lg" aria-hidden>{t.icon}</span>}
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextShape {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
