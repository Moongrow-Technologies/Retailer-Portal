import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const typeLabels = {
  commission: 'Commission',
  bonus_payout: 'Bonus Payout',
  top_up: 'Top Up',
  budget_commit: 'Budget Commit',
  budget_release: 'Budget Release',
};

const typeColors = {
  commission: 'bg-primary/10 text-primary border-primary/20',
  bonus_payout: 'bg-amber-50 text-amber-700 border-amber-200',
  top_up: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  budget_commit: 'bg-slate-50 text-slate-600 border-slate-200',
  budget_release: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function TransactionHistory({ transactions }) {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold">Transaction History</h3>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((tx, i) => (
          <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition-colors">
            <div className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
              tx.amount > 0 ? "bg-emerald-50" : "bg-slate-50"
            )}>
              {tx.amount > 0
                ? <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                : <ArrowUpRight className="w-4 h-4 text-slate-500" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {format(new Date(tx.created_date), 'MMM d, yyyy · h:mm a')}
              </p>
            </div>
            <Badge variant="outline" className={cn("text-xs flex-shrink-0", typeColors[tx.type])}>
              {typeLabels[tx.type] || tx.type}
            </Badge>
            <p className={cn("text-sm font-semibold tabular-nums flex-shrink-0 w-24 text-right",
              tx.amount > 0 ? "text-emerald-600" : "text-foreground"
            )}>
              {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}