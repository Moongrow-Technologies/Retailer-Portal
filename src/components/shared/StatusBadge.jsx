import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles = {
  active: 'bg-[#EAF3DE] text-[#3B6D11] border-[#EAF3DE]',
  paused_manual: 'bg-[#F1EFE8] text-[#5F5E5A] border-[#F1EFE8]',
  paused_budget: 'bg-[#0c0b0c] text-white border-[#0c0b0c]',
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