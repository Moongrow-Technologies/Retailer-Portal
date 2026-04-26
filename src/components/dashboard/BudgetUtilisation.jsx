import React from 'react';
import { Progress } from '@/components/ui/progress';

export default function BudgetUtilisation({ wallet }) {
  const committed = wallet.committed_campaigns + wallet.committed_bonuses || 0;
  const total = wallet.total_balance || 0;
  const percentage = total > 0 ? Math.round((committed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-4">
      <h3 className="text-sm font-semibold text-[#0c0b0c] mb-3">Budget utilisation</h3>
      
      <p className="text-2xl font-bold text-[#0c0b0c] mb-3">{percentage}%</p>
      
      <div className="mb-4">
        <Progress value={percentage} className="h-2 mb-1.5" />
        <p className="text-xs text-[#5b616e]">€{committed.toLocaleString('nl-NL')} of €{total.toLocaleString('nl-NL')} committed</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F5F3FC] rounded-lg p-3">
          <p className="text-xs text-[#5b616e] font-medium mb-0.5">Spent this month</p>
          <p className="text-lg font-bold text-[#0c0b0c]">€348</p>
        </div>
        <div className="bg-[#F5F3FC] rounded-lg p-3">
          <p className="text-xs text-[#5b616e] font-medium mb-0.5">Last top-up</p>
          <p className="text-lg font-bold text-[#0c0b0c]">Apr 13</p>
          <p className="text-xs text-[#5b616e] mt-0.5">+€1,000</p>
        </div>
      </div>
    </div>
  );
}