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

  const runwayDays = 24;
  const runwayColor = runwayDays <= 10 ? '#DC2626' : '#16A34A';

  return (
    <div className="bg-white px-6 py-6 rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] flex flex-col h-full">
      {/* Header */}
      <div className="mb-5">
        <p className="text-[#5b616e] mb-4 text-sm">Moongrow Wallet</p>
        <p className="text-[#0c0b0c] mb-3 text-3xl font-medium tracking-tight">
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

      {/* Estimated runway */}
      <div className="bg-[#F7F7F8] rounded-xl p-4">
        <p className="text-xs text-[#5b616e] mb-1">Estimated runway</p>
        <p className="text-2xl font-bold leading-none mb-1" style={{ color: runwayColor }}>
          {runwayDays} <span className="text-base font-semibold">days left</span>
        </p>
        <p className="text-xs text-[#5b616e]">At current spend rate · ~May 22</p>
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