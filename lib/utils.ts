import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const DANCE_GENRES = [
  'Hip Hop',
  'Contemporary',
  'Jazz',
  'Ballet',
  'Latin',
  'Breakdance',
  'House',
  'Krump',
  'Popping',
  'Locking'
];

export const MOODS = [
  'Energetic',
  'Chill',
  'Dramatic',
  'Playful',
  'Romantic',
  'Aggressive',
  'Mysterious',
  'Uplifting'
];

export const DANCE_STYLES = [
  'Freestyle',
  'Choreographed',
  'Battle',
  'Performance',
  'Social',
  'Competition'
];

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced'
];
