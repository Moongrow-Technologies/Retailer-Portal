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
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-6 h-full">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Top Performers</h3>
      <div className="space-y-3">
        {staff.map((member, i) => {
          const cfg = rankConfig[i];
          const RankIcon = cfg.icon;
          return (
            <Link key={member.id} to={`/staff/${member.id}`}>
              <div className="flex items-center gap-3 bg-[#F4F3FA] rounded-2xl px-4 py-3 hover:bg-[#EDE9F8] transition-colors mb-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white", cfg.bg)}>
                    <RankIcon className={cn("w-2.5 h-2.5", cfg.color)} />
                  </div>
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