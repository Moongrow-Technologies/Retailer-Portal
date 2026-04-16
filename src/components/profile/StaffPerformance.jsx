import React from 'react';
import { STAFF } from '@/lib/sampleData';

const avatarColors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-600', 'bg-[#7A7893]', 'bg-rose-500'];

export default function StaffPerformance() {
  const ranked = [...STAFF]
    .filter(s => s.status === 'active')
    .sort((a, b) => b.total_commissions - a.total_commissions);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] p-6">
      <h3 className="text-lg font-bold text-[#0E0D1E] mb-6">Staff performance</h3>

      <div className="flex flex-col divide-y divide-[#F0EEF5]">
        {ranked.map((staff, i) => {
          const initial = staff.name.charAt(0).toUpperCase();
          const colorClass = avatarColors[i % avatarColors.length];

          return (
            <div key={staff.id} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
              <span className="text-lg font-medium text-[#9490AA] w-6 text-center flex-shrink-0">
                {i + 1}
              </span>
              <div className={`w-11 h-11 rounded-full ${colorClass} flex items-center justify-center text-white text-base font-bold flex-shrink-0`}>
                {initial}
              </div>
              <span className="text-lg font-semibold text-[#0E0D1E] flex-1">
                {staff.name}
              </span>
              <span className={`text-lg font-bold flex-shrink-0 ${i === 0 ? 'text-emerald-600' : 'text-[#0E0D1E]'}`}>
                €{staff.total_commissions.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}