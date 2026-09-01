import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { MoodLog, Routine, RoutineStep, SessionLog, TechniqueType, UserProfile, WeeklyGoal } from '../types';
import { presetRoutines } from '../data/routines';
import { readStorage, writeStorage, todayISO } from './utils';

const KEYS = {
  profile: 'wellness.profile',
  favorites: 'wellness.favorites',
  routines: 'wellness.routines',
  sessions: 'wellness.sessions',
  moods: 'wellness.moodLogs',
  xp: 'wellness.xp',
  streak: 'wellness.streak',
  lastActive: 'wellness.lastActive',
  theme: 'wellness.theme',
  challengesDone: 'wellness.challengesDone',
  draft: 'wellness.draftRoutine',
};

const defaultProfile: UserProfile = {
  name: 'there',
  ageGroup: '18-24',
  experience: 'Beginner',
  onboarded: false,
  weeklyGoals: [],
  equipment: [],
};

interface StoreShape {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  routines: Routine[];
  saveRoutine: (r: Routine) => void;
  deleteRoutine: (id: string) => void;
  sessions: SessionLog[];
  logSession: (s: Omit<SessionLog, 'id' | 'date'>) => void;
  moodLogs: MoodLog[];
  logMood: (moodId: string) => void;
  todayMood: string | null;
  xp: number;
  streak: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  challengesDone: string[];
  completeChallenge: (id: string, xp: number) => void;
  weeklyMinutes: number;
  minutesByType: Record<TechniqueType | 'routine', number>;
  draftSteps: RoutineStep[];
  addToDraft: (step: RoutineStep) => void;
  removeFromDraft: (index: number) => void;
  reorderDraft: (from: number, to: number) => void;
  updateDraftStep: (index: number, minutes: number) => void;
  clearDraft: () => void;
}

const StoreContext = createContext<StoreShape | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(() => readStorage(KEYS.profile, defaultProfile));
  const [favorites, setFavorites] = useState<string[]>(() => readStorage(KEYS.favorites, []));
  const [routines, setRoutines] = useState<Routine[]>(() => readStorage(KEYS.routines, presetRoutines));
  const [sessions, setSessions] = useState<SessionLog[]>(() => readStorage(KEYS.sessions, []));
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => readStorage(KEYS.moods, []));
  const [xp, setXp] = useState<number>(() => readStorage(KEYS.xp, 0));
  const [streak, setStreak] = useState<number>(() => readStorage(KEYS.streak, 0));
  const [lastActive, setLastActive] = useState<string | null>(() => readStorage(KEYS.lastActive, null));
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    readStorage(KEYS.theme, typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );
  const [challengesDone, setChallengesDone] = useState<string[]>(() => readStorage(KEYS.challengesDone, []));
  const [draftSteps, setDraftSteps] = useState<RoutineStep[]>(() => readStorage(KEYS.draft, []));

  useEffect(() => writeStorage(KEYS.profile, profile), [profile]);
  useEffect(() => writeStorage(KEYS.favorites, favorites), [favorites]);
  useEffect(() => writeStorage(KEYS.routines, routines), [routines]);
  useEffect(() => writeStorage(KEYS.sessions, sessions), [sessions]);
  useEffect(() => writeStorage(KEYS.moods, moodLogs), [moodLogs]);
  useEffect(() => writeStorage(KEYS.xp, xp), [xp]);
  useEffect(() => writeStorage(KEYS.streak, streak), [streak]);
  useEffect(() => writeStorage(KEYS.lastActive, lastActive), [lastActive]);
  useEffect(() => writeStorage(KEYS.challengesDone, challengesDone), [challengesDone]);
  useEffect(() => writeStorage(KEYS.draft, draftSteps), [draftSteps]);
  useEffect(() => {
    writeStorage(KEYS.theme, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function bumpStreak() {
    const today = todayISO();
    if (lastActive === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastActive === yesterday.toISOString().slice(0, 10);
    setStreak((s) => (wasYesterday ? s + 1 : 1));
    setLastActive(today);
  }

  function setProfile(p: Partial<UserProfile>) {
    setProfileState((prev) => ({ ...prev, ...p }));
  }

  function toggleFavorite(id: string) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  function saveRoutine(r: Routine) {
    setRoutines((prev) => {
      const exists = prev.some((x) => x.id === r.id);
      return exists ? prev.map((x) => (x.id === r.id ? r : x)) : [...prev, r];
    });
  }

  function deleteRoutine(id: string) {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  }

  function logSession(s: Omit<SessionLog, 'id' | 'date'>) {
    const entry: SessionLog = { ...s, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, date: todayISO() };
    setSessions((prev) => [entry, ...prev].slice(0, 500));
    setXp((x) => x + entry.xp);
    bumpStreak();
  }

  function logMood(moodId: string) {
    const today = todayISO();
    setMoodLogs((prev) => [{ date: today, moodId }, ...prev.filter((m) => m.date !== today)]);
  }

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  function completeChallenge(id: string, xpAmount: number) {
    if (challengesDone.includes(id)) return;
    setChallengesDone((prev) => [...prev, id]);
    setXp((x) => x + xpAmount);
    bumpStreak();
  }

  function addToDraft(step: RoutineStep) {
    setDraftSteps((prev) => [...prev, step]);
  }

  function removeFromDraft(index: number) {
    setDraftSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function reorderDraft(from: number, to: number) {
    setDraftSteps((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function updateDraftStep(index: number, minutes: number) {
    setDraftSteps((prev) => prev.map((s, i) => (i === index ? { ...s, minutes } : s)));
  }

  function clearDraft() {
    setDraftSteps([]);
  }

  const todayMood = moodLogs.find((m) => m.date === todayISO())?.moodId ?? null;

  const weeklyMinutes = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return sessions.filter((s) => s.date >= cutoffStr).reduce((sum, s) => sum + s.minutes, 0);
  }, [sessions]);

  const minutesByType = useMemo(() => {
    const base: Record<TechniqueType | 'routine', number> = { yoga: 0, meditation: 0, breathwork: 0, exercise: 0, routine: 0 };
    for (const s of sessions) base[s.type] = (base[s.type] ?? 0) + s.minutes;
    return base;
  }, [sessions]);

  const value: StoreShape = {
    profile,
    setProfile,
    favorites,
    toggleFavorite,
    isFavorite,
    routines,
    saveRoutine,
    deleteRoutine,
    sessions,
    logSession,
    moodLogs,
    logMood,
    todayMood,
    xp,
    streak,
    theme,
    toggleTheme,
    challengesDone,
    completeChallenge,
    weeklyMinutes,
    minutesByType,
    draftSteps,
    addToDraft,
    removeFromDraft,
    reorderDraft,
    updateDraftStep,
    clearDraft,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreShape {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export type { WeeklyGoal };
