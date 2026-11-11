import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines tailwind classes with conflict resolution
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with comma separators
 */
export function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}
