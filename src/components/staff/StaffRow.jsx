import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/shared/StatusBadge';
import { Medal } from 'lucide-react';

export default function StaffRow({ staff, rank }) {
  return (
    <Link to={`/staff/${staff.id}`}>
      <div className="flex items-center gap-3 px-4 py-3 bg-[#F8F7FC] rounded-xl border border-[#E2E0ED] hover:bg-[#F0EEF9] hover:border-[#C8C3E0] transition-all">
        <div className="w-9 h-9 rounded-xl bg-[#EDE9F8] flex items-center justify-center text-sm font-bold text-[#796EB2] flex-shrink-0">
          {staff.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#0E0D1E]">{staff.name}</p>
          <p className="text-sm text-[#9490AA]">{staff.role} · {staff.store}</p>
        </div>
        <StatusBadge status={staff.status} />
        <div className="text-right w-28">
          <p className="text-sm font-semibold text-[#0E0D1E]">€{staff.total_commissions.toFixed(2)}</p>
          <p className="text-xs text-[#9490AA]">{staff.total_units_sold} units</p>
        </div>
        <div className="text-right w-16">
          <p className="text-sm font-medium text-[#9490AA]">#{rank}</p>
        </div>
        {staff.bonus_wins > 0 && (
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <Medal className="w-3 h-3 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">{staff.bonus_wins}</span>
          </div>
        )}
      </div>
    </Link>
  );
}