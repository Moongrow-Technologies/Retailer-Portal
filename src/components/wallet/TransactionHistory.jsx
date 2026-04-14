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
    <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm">
      <div className="px-6 py-4 border-b border-[#EBEBF0]">
        <h3 className="text-base font-semibold text-[#0E0D1E]">Transaction History</h3>
      </div>
      <div className="p-4 space-y-2">
        {transactions.map((tx, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4 bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl hover:bg-[#F0EEF9] transition-colors">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
              tx.amount > 0 ? "bg-emerald-50" : "bg-[#F8F7FC]"
            )}>
              {tx.amount > 0
                ? <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                : <ArrowUpRight className="w-4 h-4 text-slate-500" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0E0D1E] truncate">{tx.description}</p>
              <p className="text-xs text-[#9490AA] mt-0.5">
                {format(new Date(tx.created_date), 'MMM d, yyyy · h:mm a')}
              </p>
            </div>
            <Badge variant="outline" className={cn("text-xs flex-shrink-0", typeColors[tx.type])}>
              {typeLabels[tx.type] || tx.type}
            </Badge>
            <p className={cn("text-sm font-semibold tabular-nums flex-shrink-0 w-24 text-right",
              tx.amount > 0 ? "text-emerald-600" : "text-[#0E0D1E]"
            )}>
              {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}