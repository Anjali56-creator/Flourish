import type { Mood } from '../types';

export const moods: Mood[] = [
  { id: 'stressed', label: 'Stressed', emoji: '😣', color: '#f87171', recommend: 'A short breathing reset and a slow stretch can take the edge off right now.' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#fb923c', recommend: 'Grounding techniques and slow, extended exhales help settle a racing mind.' },
  { id: 'tired', label: 'Tired', emoji: '🥱', color: '#a78bfa', recommend: 'Gentle recovery poses and rest-focused breathing support real recharge.' },
  { id: 'low-energy', label: 'Low energy', emoji: '🔋', color: '#60a5fa', recommend: 'Light movement and energising breathwork can help without overdoing it.' },
  { id: 'focused', label: 'Focused', emoji: '🎯', color: '#18b083', recommend: "You're dialled in — a focus meditation or quick mobility break keeps it going." },
  { id: 'happy', label: 'Happy', emoji: '😄', color: '#fbbf24', recommend: 'Great energy to build on — try a fuller flow or a strength session.' },
  { id: 'restless', label: 'Restless', emoji: '🌀', color: '#f472b6', recommend: 'Grounding movement and steady breathing can channel that extra energy.' },
  { id: 'sore', label: 'Sore', emoji: '🩹', color: '#fb7185', recommend: 'Gentle mobility and recovery stretches are kinder than pushing through.' },
  { id: 'unmotivated', label: 'Unmotivated', emoji: '😑', color: '#94a3b8', recommend: 'Start tiny — a 5-minute routine is often all it takes to get moving.' },
];

export const moodMap = Object.fromEntries(moods.map((m) => [m.id, m]));
