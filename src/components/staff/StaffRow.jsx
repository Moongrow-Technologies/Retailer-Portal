import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
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

export default function StaffRow({ staff }) {
  return (
    <Link to={`/staff/${staff.id}`}>
      <div className="px-4 py-3 flex items-center gap-4 bg-[#F4F3FA] rounded-2xl hover:bg-[#EDE9F8] transition-colors mb-3">
        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
          {staff.avatar_url ? (
            <img src={staff.avatar_url} alt={staff.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#EDE9F8] flex items-center justify-center text-sm font-bold text-[#796EB2]">{staff.name.charAt(0)}</div>
          )}
        </div>
        <div className="w-40 flex-shrink-0 min-w-0">
          <p className="text-sm font-medium text-[#0E0D1E] truncate">{staff.name}</p>
          <p className="text-xs text-[#9490AA] mt-0.5">{staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-[#9490AA]">{staff.store}</p>
        </div>
        <div className="w-36 flex-shrink-0 flex justify-center">
          <Badge variant="outline" className={cn("text-xs", statusColors[staff.status])}>
            {statusLabels[staff.status]}
          </Badge>
        </div>
        <div className="w-28 text-right flex-shrink-0">
          <p className="text-sm font-semibold text-[#0E0D1E] tabular-nums">€{staff.total_commissions.toFixed(2)}</p>
        </div>
        <div className="w-24 text-right flex-shrink-0">
          <p className="text-sm font-semibold text-[#0E0D1E] tabular-nums">{staff.total_units_sold}</p>
          <p className="text-xs text-[#9490AA]">units</p>
        </div>
      </div>
    </Link>
  );
}