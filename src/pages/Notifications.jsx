import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { ACTIVITIES } from '@/lib/sampleData';

function groupByDate(activities) {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  activities.forEach(a => {
    const d = new Date(a.created_date);
    if (isToday(d)) groups.Today.push(a);
    else if (isYesterday(d)) groups.Yesterday.push(a);
    else groups.Earlier.push(a);
  });
  return groups;
}

export default function Notifications() {
  const groups = groupByDate(ACTIVITIES);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">Notifications</h1>
        <p className="text-sm text-[#7A7893] mt-1">All recent activity and alerts.</p>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(groups).map(([label, items]) => {
          if (!items.length) return null;
          return (
            <div key={label}>
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-2">{label}</p>
              <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-4 flex flex-col gap-2">
                {items.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-3 py-2.5 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0E0D1E] leading-snug">{n.message}</p>
                      <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(n.created_date), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}