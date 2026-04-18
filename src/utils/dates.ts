import {
  format,
  differenceInCalendarDays,
  addDays,
  isWithinInterval,
} from "date-fns";

/** April 27 2026 = Day 1 */
export const ORIGIN = new Date(2026, 3, 27); // months are 0-indexed

/** Last valid journal date: December 30 2035 */
export const JOURNAL_END = new Date(2035, 11, 30);

/** Day-cycle settings: 100 journal days + 1 reflection day */
export const REFLECTION_CYCLE_DAYS = 101;

/** Total journal days in the configured range (inclusive). */
export const TOTAL_JOURNAL_DAYS =
  differenceInCalendarDays(JOURNAL_END, ORIGIN) + 1;

/**
 * Returns the day number for the given date.
 * April 27 2026 -> Day 1.
 */
export function getDayNumber(date: Date): number {
  return differenceInCalendarDays(date, ORIGIN) + 1;
}

/**
 * Returns the Date corresponding to a day number.
 * Day 1 -> April 27 2026.
 */
export function getDateFromDayNumber(n: number): Date {
  return addDays(ORIGIN, n - 1);
}

/**
 * True if the date falls within the journal window
 * (April 27 2026 - December 30 2035, inclusive).
 */
export function isValidJournalDate(date: Date): boolean {
  return isWithinInterval(date, { start: ORIGIN, end: JOURNAL_END });
}

/**
 * True when the day is a cycle reflection day (every 101st day).
 */
export function isReflectionDay(date: Date): boolean {
  const day = getDayNumber(date);
  return day > 0 && day % REFLECTION_CYCLE_DAYS === 0 && isValidJournalDate(date);
}

/**
 * Formats a date as a day header string.
 * e.g. "Day 47 · April 22, 2026"
 */
export function formatDayHeader(date: Date): string {
  const day = getDayNumber(date);
  const formatted = format(date, "MMMM d, yyyy");
  return `Day ${day} · ${formatted}`;
}

/**
 * Returns today's date as an ISO date string "YYYY-MM-DD".
 */
export function getTodayDateId(): string {
  return dateToId(new Date());
}

/**
 * Converts a Date to a "YYYY-MM-DD" string.
 */
export function dateToId(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
