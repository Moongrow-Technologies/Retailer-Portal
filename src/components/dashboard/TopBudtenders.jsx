import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const rankConfig = [
  { icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { icon: Medal, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' },
  { icon: Award, color: 'text-orange-400', bg: 'bg-orange-50', border: 'border-orange-200' },
];

export default function TopBudtenders({ staff }) {
  return (
    <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6 h-full">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Top Budtenders</h3>
      <div className="space-y-3">
        {staff.map((member, i) => {
          const cfg = rankConfig[i];
          const RankIcon = cfg.icon;
          return (
            <Link key={member.id} to={`/staff/${member.id}`}>
              <div className="flex items-center gap-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl px-4 py-3 hover:bg-[#F0EEF9] transition-colors">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", cfg.bg, `border ${cfg.border}`)}>
                  <RankIcon className={cn("w-4 h-4", cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0E0D1E] truncate">{member.name}</p>
                  <p className="text-xs text-[#9490AA] truncate">{member.store.split('—')[1]?.trim() || member.store}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#0E0D1E]">€{member.total_commissions.toFixed(2)}</p>
                  <p className="text-xs text-[#9490AA]">{member.total_units_sold} units</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}