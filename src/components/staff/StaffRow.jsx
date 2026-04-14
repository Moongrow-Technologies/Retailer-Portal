import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  deactivated: 'bg-slate-50 text-slate-500 border-slate-200',
};

const statusLabels = {
  active: 'Active',
  pending: 'Pending',
  deactivated: 'Deactivated',
};

export default function StaffRow({ staff, rank }) {
  return (
    <Link to={`/staff/${staff.id}`}>
      <div className="px-4 py-3 flex items-center gap-4 bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl hover:bg-[#F0EEF9] transition-colors">
        <div className="w-9 h-9 rounded-xl bg-[#EDE9F8] flex items-center justify-center text-sm font-bold text-[#796EB2] flex-shrink-0">
          {staff.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#0E0D1E] truncate">{staff.name}</p>
          <p className="text-xs text-[#9490AA] mt-0.5">{staff.role} · {staff.store}</p>
        </div>
        <Badge variant="outline" className={cn("text-xs flex-shrink-0", statusColors[staff.status])}>
          {statusLabels[staff.status]}
        </Badge>
        <div className="text-right flex-shrink-0 w-24">
          <p className="text-sm font-semibold text-[#0E0D1E] tabular-nums">€{staff.total_commissions.toFixed(2)}</p>
          <p className="text-xs text-[#9490AA]">{staff.total_units_sold} units</p>
        </div>
        <p className="text-sm text-[#9490AA] flex-shrink-0 w-8 text-right">#{rank}</p>
        {staff.bonus_wins > 0 && (
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 flex-shrink-0">
            <Medal className="w-3 h-3 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">{staff.bonus_wins}</span>
          </div>
        )}
      </div>
    </Link>
  );
}