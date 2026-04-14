import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function WalletBreakdown({ wallet, compact = false }) {
  const total = wallet?.total_balance || 0;
  const campaigns = wallet?.committed_campaigns || 0;
  const bonuses = wallet?.committed_bonuses || 0;
  const available = wallet?.available || 0;
  const lowBalance = available < (campaigns + bonuses) * 0.2 && total > 0;

  return (
    <div className={cn("bg-white rounded-xl border border-[#EBEBF0] shadow-sm", compact ? "p-4" : "p-6")}>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Total Balance</p>
          <p className={cn("font-bold tracking-tight text-[#0E0D1E]", compact ? "text-2xl" : "text-4xl")}>
            €{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-[#9490AA] mt-0.5">EURC</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
           <Link to="/campaigns" className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl px-4 py-3 space-y-1 hover:bg-[#F0EEF9] transition-colors cursor-pointer">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-[#796EB2]" />
               <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Campaigns</p>
             </div>
             <p className="text-sm font-semibold text-[#0E0D1E]">€{campaigns.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
           </Link>
           <Link to="/bonuses" className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl px-4 py-3 space-y-1 hover:bg-[#F0EEF9] transition-colors cursor-pointer">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-amber-500" />
               <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Bonuses</p>
             </div>
             <p className="text-sm font-semibold text-[#0E0D1E]">€{bonuses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
           </Link>
           <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl px-4 py-3 space-y-1">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Available</p>
             </div>
             <p className={cn("text-sm font-semibold", lowBalance ? "text-red-500" : "text-[#0E0D1E]")}>
               €{available.toLocaleString('en-US', { minimumFractionDigits: 2 })}
             </p>
           </div>
         </div>

        {/* Balance bar */}
        <div className="h-2 rounded-full bg-[#F0EFF8] overflow-hidden flex">
          {total > 0 && (
            <>
              <div className="h-full bg-primary rounded-l-full" style={{ width: `${(campaigns / total) * 100}%` }} />
              <div className="h-full bg-amber-500" style={{ width: `${(bonuses / total) * 100}%` }} />
              <div className="h-full bg-emerald-500 rounded-r-full" style={{ width: `${(available / total) * 100}%` }} />
            </>
          )}
        </div>

        {lowBalance && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <p className="text-xs font-medium text-amber-700">
              ⚠ Low balance — available funds below 20% of committed spend
            </p>
          </div>
        )}
      </div>
    </div>
  );
}