import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  paused_manual: 'bg-amber-50 text-amber-700 border-amber-200',
  paused_budget: 'bg-red-50 text-red-700 border-red-200',
  completed: 'bg-slate-50 text-slate-600 border-slate-200',
  pending: 'bg-blue-50 text-blue-700 border-blue-200',
  deactivated: 'bg-slate-50 text-slate-500 border-slate-200',
};

const statusLabels = {
  active: 'Active',
  paused_manual: 'Paused',
  paused_budget: 'Budget Exhausted',
  completed: 'Completed',
  pending: 'Pending',
  deactivated: 'Deactivated',
};

export default function StatusBadge({ status }) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[status] || statusStyles.active)}>
      {statusLabels[status] || status}
    </Badge>
  );
}