import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowDownFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Link } from 'react-router-dom';

export default function CompactWalletCard({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="min-w-0">
          <p className="text-[#7A7893] mb-2 text-xs font-semibold capitalize tracking-wide">Wallet Balance</p>
          <p className="text-[#0E0D1E] text-4xl font-medium tracking-tight truncate">
            €{wallet.total_balance.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button variant="outline" className="gap-1.5 border-[#E2E0ED] text-[#0E0D1E] text-sm px-4 py-2 h-auto" onClick={() => setShowTopUp(true)}>
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button variant="outline" className="gap-1.5 border-[#E2E0ED] text-[#0E0D1E] text-sm px-4 py-2 h-auto" onClick={() => setShowWithdraw(true)}>
            <ArrowDownFromLine className="w-3.5 h-3.5" /> Withdraw
          </Button>
        </div>
      </div>

      <div className="border-t border-[#E2E0ED] my-4"></div>

      <div className="space-y-3.5 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#796EB2] flex-shrink-0"></div>
            <span className="text-sm text-[#0E0D1E]">Campaigns</span>
          </div>
          <span className="text-sm font-semibold text-[#0E0D1E]">€{wallet.committed_campaigns.toLocaleString('nl-NL')}</span>
        </div>
        <div className="w-full bg-[#E2E0ED] rounded-full h-1.5">
          <div className="h-full rounded-full" style={{ width: '53%', background: 'linear-gradient(to right, #4B3F8F, #796EB2, #B8B0D8)' }}></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></div>
            <span className="text-sm text-[#0E0D1E]">Bonuses</span>
          </div>
          <span className="text-sm font-semibold text-[#0E0D1E]">€{wallet.committed_bonuses.toLocaleString('nl-NL')}</span>
        </div>
        <div className="w-full bg-[#E2E0ED] rounded-full h-1.5">
          <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }}></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
            <span className="text-sm text-[#0E0D1E]">Available</span>
          </div>
          <span className="text-sm font-semibold text-emerald-600">€{wallet.available.toLocaleString('nl-NL')}</span>
        </div>
        <div className="w-full bg-[#E2E0ED] rounded-full h-1.5">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }}></div>
        </div>
      </div>

      <Link to="/wallet" className="text-sm text-[#796EB2] hover:underline mt-6 block font-medium">
        View full wallet →
      </Link>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}