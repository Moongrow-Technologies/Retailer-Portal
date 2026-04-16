import React, { useState } from 'react';
import { format, subDays, startOfMonth, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

const typeLabels = {
  commission: 'Commission',
  bonus_payout: 'Bonus Payout',
  top_up: 'Top Up',
  budget_commit: 'Budget Commit',
  budget_release: 'Budget Release',
};

const typeColors = {
  commission: 'bg-emerald-50 text-emerald-700',
  bonus_payout: 'bg-amber-50 text-amber-700',
  top_up: 'bg-blue-50 text-blue-700',
  budget_commit: 'bg-slate-100 text-slate-600',
  budget_release: 'bg-blue-50 text-blue-600',
};

function parseDescription(description) {
  // Try to parse "Commission: Lisa V. sold 1× OG Kush" → { actor, product, qty }
  const commMatch = description.match(/Commission:\s+(.+?)\s+sold\s+(\d+)[×x]\s+(.+)/);
  if (commMatch) {
    return { actor: commMatch[1], qty: commMatch[2], product: commMatch[3] };
  }
  return null;
}

export default function TransactionHistory({ transactions }) {
  const [period, setPeriod] = useState('all');

  const filterTransactions = () => {
    const now = new Date();
    return transactions.filter(tx => {
      const txDate = new Date(tx.created_date);
      if (period === 'week') return isAfter(txDate, subDays(now, 7));
      if (period === 'month') return isAfter(txDate, startOfMonth(now));
      return true;
    });
  };

  const filtered = filterTransactions();

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)]">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-[#EBEBF0]">
        <h3 className="text-base font-semibold text-[#0E0D1E]">Transaction history</h3>
        <div className="flex items-center gap-1 border border-[#E2E0ED] rounded-full p-1">
          {[
            { value: 'week', label: 'This week' },
            { value: 'month', label: 'This month' },
            { value: 'all', label: 'All time' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                period === opt.value
                  ? 'bg-[#0E0D1E] text-white'
                  : 'text-[#4B4867] hover:text-[#0E0D1E]'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div className="px-6 py-3 grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#EBEBF0]">
        <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wider">Transaction</p>
        <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wider text-right w-32">Type</p>
        <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wider text-right w-24">Amount</p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#EBEBF0]">
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-[#9490AA] text-sm">No transactions in this period</div>
        ) : (
          filtered.map((tx, i) => {
            const parsed = tx.type === 'commission' ? parseDescription(tx.description) : null;
            const isPositive = tx.amount > 0;

            let title = tx.description;
            if (parsed) {
              title = `${parsed.actor} sold ${parsed.qty}× ${parsed.product}`;
            }

            return (
              <div
                key={i}
                className="px-6 py-4 grid grid-cols-[1fr_auto_auto] gap-4 items-center hover:bg-[#FAFAFA] transition-colors"
              >
                {/* Left: icon + text */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                    tx.type === 'commission' ? "bg-emerald-50" : "bg-[#F4F3FA]"
                  )}>
                    <TrendingUp className={cn(
                      "w-4 h-4",
                      tx.type === 'commission' ? "text-emerald-600" : "text-[#796EB2]"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0E0D1E] truncate">{title}</p>
                    <p className="text-xs text-[#9490AA] mt-0.5">
                      {format(new Date(tx.created_date), 'MMM d, yyyy · h:mm a')}
                    </p>
                  </div>
                </div>

                {/* Type badge */}
                <div className="w-32 flex justify-end">
                  <span className={cn(
                    "text-xs font-semibold px-3 py-1 rounded-full",
                    typeColors[tx.type] || 'bg-slate-50 text-slate-600'
                  )}>
                    {typeLabels[tx.type] || tx.type}
                  </span>
                </div>

                {/* Amount */}
                <p className={cn(
                  "text-sm font-semibold tabular-nums text-right w-24",
                  isPositive ? "text-emerald-600" : "text-[#0E0D1E]"
                )}>
                  {isPositive ? '+' : '-'}€{Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}