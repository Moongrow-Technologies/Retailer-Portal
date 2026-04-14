import React from 'react';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/shared/StatusBadge';
import { Trophy, Timer, Crown, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays, parseISO } from 'date-fns';

const typeIcons = { ranked: Trophy, threshold: Target, sprint: Zap };
const typeLabels = { ranked: 'Ranked', threshold: 'Threshold', sprint: 'Sprint' };
const typeColors = { ranked: 'bg-amber-50 text-amber-700 border-amber-200', threshold: 'bg-blue-50 text-blue-700 border-blue-200', sprint: 'bg-rose-50 text-rose-700 border-rose-200' };

export default function BonusCard({ bonus }) {
  const Icon = typeIcons[bonus.type] || Trophy;
  const daysLeft = bonus.status === 'active' ? Math.max(0, differenceInDays(parseISO(bonus.end_date), new Date())) : 0;

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", typeColors[bonus.type])}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">{bonus.name}</h3>
            <p className="text-xs text-muted-foreground">{bonus.product_name} · {bonus.scope === 'chain' ? 'Chain-wide' : bonus.store}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-xs", typeColors[bonus.type])}>{typeLabels[bonus.type]}</Badge>
          <StatusBadge status={bonus.status} />
        </div>
      </div>

      {bonus.status === 'active' ? (
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <p className="text-lg font-bold">€{bonus.prize_pool}</p>
            <p className="text-xs text-muted-foreground">Prize Pool</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <Timer className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-lg font-bold">{daysLeft}d</p>
            </div>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-sm font-bold truncate">{bonus.current_leader}</p>
            </div>
            <p className="text-xs text-muted-foreground">Leading</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Winner: {bonus.winner_name}</p>
            <p className="text-xs text-emerald-600">{bonus.participants} participants</p>
          </div>
          <p className="text-lg font-bold text-emerald-700">€{bonus.winner_payout}</p>
        </div>
      )}
    </div>
  );
}