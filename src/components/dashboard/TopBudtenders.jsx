import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const avatarColors = ['bg-amber-400', 'bg-blue-500', 'bg-emerald-600'];

export default function TopBudtenders({ staff }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-2">Top Performers</h3>
      <div>
        {staff.map((member, i) => (
          <Link key={member.id} to={`/staff/${member.id}`}>
            <div>
              <div className="flex items-center gap-4 py-4">
                <span className="text-sm text-[#9490AA] w-4 text-right flex-shrink-0">{i + 1}</span>
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={cn("w-full h-full flex items-center justify-center text-white text-sm font-bold", avatarColors[i % avatarColors.length])}>
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0E0D1E] truncate">{member.name}</p>
                  <p className="text-xs text-[#9490AA] truncate">{member.store.split('—')[1]?.trim() || member.store}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={cn("text-sm font-bold", i === 0 ? "text-emerald-600" : "text-[#0E0D1E]")}>€{member.total_commissions.toFixed(2)}</p>
                  <p className="text-xs text-[#9490AA]">{member.total_units_sold} units</p>
                </div>
              </div>
              {i < staff.length - 1 && <div className="h-px bg-[#F0EFF5]" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}