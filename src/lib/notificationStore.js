import { ACTIVITIES } from '@/lib/sampleData';

// Module-level shared state with subscriber pattern
let dismissed = new Set();
let unreadIds = new Set(ACTIVITIES.slice(0, 2).map((_, i) => i));
const listeners = new Set();

function notify() {
  listeners.forEach(fn => fn());
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getDismissed() { return dismissed; }
export function getUnreadIds() { return unreadIds; }

export function dismissNotification(id) {
  dismissed = new Set([...dismissed, id]);
  notify();
}

export function markOneRead(id) {
  unreadIds = new Set([...unreadIds].filter(x => x !== id));
  notify();
}

export function markAllRead() {
  unreadIds = new Set();
  notify();
}

export function getVisibleCount() {
  return ACTIVITIES.filter((_, i) => !dismissed.has(i)).length;
}

export function getUnreadCount() {
  return ACTIVITIES.filter((_, i) => !dismissed.has(i) && unreadIds.has(i)).length;
}