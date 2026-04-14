import type { DayEntry, Habit, ReflectionEntry, StreakFreeze } from "../db";
import { LocalStorageAdapter } from "./local";

export interface StorageAdapter {
  getEntry(dateId: string): Promise<DayEntry | null>;
  saveEntry(entry: DayEntry): Promise<void>;
  getAllEntries(): Promise<DayEntry[]>;
  deleteEntry(dateId: string): Promise<void>;
  getEntriesByTag(tag: string): Promise<DayEntry[]>;
  searchEntries(query: string): Promise<DayEntry[]>;
  getHighlights(): Promise<DayEntry[]>;
  getHabits(): Promise<Habit[]>;
  getAllHabits(): Promise<Habit[]>;
  saveHabit(habit: Habit): Promise<void>;
  deleteHabit(habitId: string): Promise<void>;
  getReflection(promptId: string): Promise<ReflectionEntry | null>;
  getAllReflections(): Promise<ReflectionEntry[]>;
  saveReflection(entry: ReflectionEntry): Promise<void>;
  getStreakFreezes(): Promise<StreakFreeze[]>;
  useStreakFreeze(forDateId: string): Promise<void>;
  getRemainingFreezes(cycleStartDate: string): Promise<number>;
  exportAllData(): Promise<string>;
  importAllData(json: string): Promise<void>;
  clearAllData(): Promise<void>;
}

export const storage: StorageAdapter = new LocalStorageAdapter();
export default storage;
