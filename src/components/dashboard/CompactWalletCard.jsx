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
    <div className="bg-white px-24 py-1 rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] flex flex-col" style={{ alignSelf: 'start' }}>
      {/* Header */}
      <div className="mb-5">
        <p className="text-[#5b616e] mb-1 text-sm">Moongrow Wallet</p>
        <p className="text-[#0c0b0c] mb-3 text-4xl font-medium tracking-tight">
          €{total.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
        {/* Campaigns */}
        <div className="flex items-center justify-between py-3 border-b border-[#EBEBF0]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#534AB7] flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-[#0c0b0c]">Campaign Fund</p>
              <p className="text-xs text-[#5b616e]">{activeCampaigns} active</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{campaigns.toLocaleString('nl-NL')}</span>
        </div>

        {/* Bonuses */}
        <div className="flex items-center justify-between py-3 border-b border-[#EBEBF0]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F0997B] flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-[#0c0b0c]">Bonus Fund</p>
              <p className="text-xs text-[#5b616e]">{activeBonuses} active</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{bonuses.toLocaleString('nl-NL')}</span>
        </div>

        {/* Available */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-semibold text-[#0c0b0c]">Unbudgeted</p>
            <p className="text-xs text-[#5b616e]">free to budget</p>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{available.toLocaleString('nl-NL')}</span>
        </div>
      </div>

      <Link to="/wallet" className="text-sm text-[#796EB2] hover:underline mt-0 block font-semibold">
        View Moongrow Wallet →
      </Link>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}