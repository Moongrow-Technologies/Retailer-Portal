// Keys that map each notification toggle to activity types
export const NOTIFICATION_TYPE_MAP = {
  newSales: ['sale', 'top_up', 'payout'],
  budgetWarnings: ['campaign_paused'],
  bonusCompletions: ['bonus_completed'],
};

const STORAGE_KEY = 'notificationPrefs';

export function getNotificationPrefs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { newSales: true, budgetWarnings: true, bonusCompletions: false };
}

export function saveNotificationPrefs(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// Returns a set of activity types that are currently enabled
export function getEnabledActivityTypes(prefs) {
  const enabled = new Set();
  Object.entries(NOTIFICATION_TYPE_MAP).forEach(([key, types]) => {
    if (prefs[key]) types.forEach(t => enabled.add(t));
  });
  return enabled;
}