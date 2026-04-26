import React from 'react';
import { TRANSACTIONS } from '@/lib/sampleData';

export default function WalletRunwayCard({ wallet }) {
  const balance = wallet.total_balance || 0;
  
  // Calculate daily spend from last 30 days of commission transactions
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentTransactions = TRANSACTIONS.filter(t => {
    const txDate = new Date(t.created_date);
    return t.type === 'commission' && txDate >= thirtyDaysAgo;
  });
  
  const totalSpend = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const dailySpendAvg = totalSpend / 30;
  
  // Calculate days remaining
  const daysLeft = dailySpendAvg > 0 ? Math.ceil(balance / dailySpendAvg) : 0;
  
  // Calculate months to empty
  const monthsToEmpty = dailySpendAvg > 0 ? (balance / (dailySpendAvg * 30)).toFixed(1) : 0;
  
  // Calculate estimated empty date
  const emptyDate = new Date();
  emptyDate.setDate(emptyDate.getDate() + daysLeft);
  const emptyDateStr = `~${emptyDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  
  // Progress bar percentage
  const maxDays = 60; // Show progress relative to 60 days as max
  const progressPercent = Math.min((daysLeft / maxDays) * 100, 100);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 flex flex-col">
      {/* Title */}
      <h3 className="text-sm text-[#5b616e] mb-4 font-medium">Wallet runway</h3>
      
      {/* Days left */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#0c0b0c]">{daysLeft}</span>
          <span className="text-sm text-[#5b616e]">days left</span>
        </div>
        <p className="text-xs text-[#9699A8] mt-2">At current spend rate</p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-[#EBEBF0] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#534AB7] h-full rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      
      {/* Date labels */}
      <div className="flex justify-between mb-6">
        <span className="text-xs text-[#5b616e] font-medium">Today</span>
        <span className="text-xs text-[#5b616e] font-medium">{emptyDateStr}</span>
      </div>
      
      {/* Mini stat boxes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F7F7F7] rounded-lg p-3">
          <p className="text-xs text-[#5b616e] font-medium mb-1">Daily spend avg</p>
          <p className="text-lg font-bold text-[#0c0b0c]">€{dailySpendAvg.toFixed(2)}</p>
        </div>
        <div className="bg-[#F7F7F7] rounded-lg p-3">
          <p className="text-xs text-[#5b616e] font-medium mb-1">Months to empty</p>
          <p className="text-lg font-bold text-[#0c0b0c]">{monthsToEmpty} mo</p>
        </div>
      </div>
    </div>
  );
}