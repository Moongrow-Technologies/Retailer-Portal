import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function StaffCard({ staff }) {
  const initials = staff.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 1);

  const avatarColors = {
    active: 'bg-emerald-500',
    pending: 'bg-amber-500',
    deactivated: 'bg-slate-400',
  };

  const statusColors = {
    active: 'bg-emerald-50 text-emerald-700',
    pending: 'bg-amber-50 text-amber-700',
    deactivated: 'bg-slate-50 text-slate-600',
  };

  return (
    <Link to={`/staff/${staff.id}`}>
      <div className="bg-white rounded-2xl border border-[#E2E0ED] p-6 hover:shadow-md transition-shadow h-full">
        {/* Header with avatar and badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn('w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg', avatarColors[staff.status])}>
              {initials}
            </div>
            <div>
              <p className="font-semibold text-[#0E0D1E]">{staff.name}</p>
              <p className="text-xs text-[#9490AA] capitalize">
                {staff.role} · {staff.store}
              </p>
            </div>
          </div>
          <Badge className={cn('text-xs font-semibold capitalize border-0', statusColors[staff.status])}>
            {staff.status === 'pending' ? 'Pending' : staff.status === 'active' ? 'Active' : 'Deactivated'}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-[#9490AA] font-medium mb-1">Commission</p>
            <p className="text-lg font-bold text-emerald-600">€{staff.total_commissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div>
            <p className="text-xs text-[#9490AA] font-medium mb-1">Units sold</p>
            <p className="text-lg font-bold text-[#0E0D1E]">{staff.total_units_sold}</p>
          </div>
        </div>

        {/* Link */}
        {staff.status === 'active' ? (
          <p className="text-sm font-medium text-[#796EB2] hover:text-[#5E54A0] transition-colors">View profile →</p>
        ) : (
          <p className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">Resend invite →</p>
        )}
      </div>
    </Link>
  );
}