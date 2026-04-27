import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowDownFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Link } from 'react-router-dom';

export default function CompactWalletCard({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const total = wallet.total_balance || 0;
  const campaigns = wallet.committed_campaigns || 0;
  const bonuses = wallet.committed_bonuses || 0;
  const available = wallet.available || 0;

  const activeCampaigns = 3;
  const activeBonuses = 2;

  return (
    <div className="bg-white px-6 py-6 rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <p className="text-[#5b616e] mb-4 text-sm">Moongrow Wallet</p>
        <p className="text-[#0c0b0c] mb-3 text-4xl font-medium tracking-tight">
          €{total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1 border-[#E2E0ED] text-[#0c0b0c] text-xs px-3 py-1.5 h-auto font-medium" onClick={() => setShowTopUp(true)}>
            <Plus className="w-3 h-3" /> Top Up
          </Button>
          <Button variant="outline" className="gap-1 border-[#E2E0ED] text-[#0c0b0c] text-xs px-3 py-1.5 h-auto font-medium" onClick={() => setShowWithdraw(true)}>
            <ArrowDownFromLine className="w-3 h-3" /> Withdraw
          </Button>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-0">
        {/* Available */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-semibold text-[#0c0b0c]">Unbudgeted</p>
            <p className="text-xs text-[#5b616e]">free to budget</p>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{available.toLocaleString('en-US')}</span>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Link to="/wallet" className="text-xs text-[#796EB2] hover:underline block font-semibold" onClick={() => window.scrollTo(0, 0)}>
          View Moongrow Wallet →
        </Link>
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}