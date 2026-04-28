import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 


export const isIframe = window.self !== window.top;

// Format a number as a Euro currency string with comma separators
// e.g. fmtEur(1032) → "€1,032"  |  fmtEur(312.5) → "€312.50"
export function fmtEur(value, { decimals } = {}) {
  const num = Number(value) || 0;
  const hasDecimals = decimals !== undefined ? decimals : (num % 1 !== 0);
  return '€' + num.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  });
}