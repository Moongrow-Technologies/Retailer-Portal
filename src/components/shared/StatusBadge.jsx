import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  paused_manual: 'bg-[#EDE9F8] text-[#796EB2] border-[#D4CDF0]',
  paused_budget: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  scheduled: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-[#0c0b0c] text-white border-[#0c0b0c]',
  pending: 'bg-blue-50 text-blue-700 border-blue-200',
  deactivated: 'bg-slate-50 text-slate-500 border-slate-200',
};

const statusLabels = {
  active: 'Active',
  paused_manual: 'Paused',
  paused_budget: 'Completed',
  scheduled: 'Scheduled',
  completed: 'Completed',
  pending: 'Pending',
  deactivated: 'Deactivated',
};

export default function StatusBadge({ status }) {
  return (
    <Badge className={cn("text-xs font-medium border-0 pointer-events-none select-none", statusStyles[status] || statusStyles.active)}>
      {statusLabels[status] || status}
    </Badge>
  );
}