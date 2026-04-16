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
    <div className="bg-white rounded-2xl border border-[#EBEBF0] p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="min-w-0">
          <p className="text-[#796EB2] mb-2 text-sm font-semibold">Wallet Balance</p>
          <p className="text-[#0E0D1E] text-5xl font-bold tracking-tight truncate">
            €{wallet.total_balance.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E] font-semibold text-sm px-5 py-2.5 h-auto rounded-xl" onClick={() => setShowTopUp(true)}>
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E] font-semibold text-sm px-5 py-2.5 h-auto rounded-xl" onClick={() => setShowWithdraw(true)}>
            <ArrowDownFromLine className="w-4 h-4" /> Withdraw
          </Button>
        </div>
      </div>

      <div className="border-t border-[#EBEBF0] mb-5"></div>

      <div className="space-y-5 flex-1">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#796EB2] flex-shrink-0"></div>
              <span className="text-base font-medium text-[#0E0D1E]">Campaigns</span>
            </div>
            <span className="text-base font-bold text-[#0E0D1E]">€{wallet.committed_campaigns.toLocaleString('nl-NL')}</span>
          </div>
          <div className="w-full bg-[#E8E6F0] rounded-full h-2">
            <div className="bg-[#796EB2] h-full rounded-full" style={{ width: '53%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></div>
              <span className="text-base font-medium text-[#0E0D1E]">Bonuses</span>
            </div>
            <span className="text-base font-bold text-[#0E0D1E]">€{wallet.committed_bonuses.toLocaleString('nl-NL')}</span>
          </div>
          <div className="w-full bg-[#E8E6F0] rounded-full h-2">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
              <span className="text-base font-medium text-[#0E0D1E]">Available</span>
            </div>
            <span className="text-base font-bold text-emerald-600">€{wallet.available.toLocaleString('nl-NL')}</span>
          </div>
          <div className="w-full bg-[#E8E6F0] rounded-full h-2">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }}></div>
          </div>
        </div>
      </div>

      <Link to="/wallet" className="text-sm text-[#796EB2] hover:underline mt-6 block font-semibold">
        View full wallet →
      </Link>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}