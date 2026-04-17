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

  const campaignPct = total > 0 ? (campaigns / total) * 100 : 0;
  const bonusPct = total > 0 ? (bonuses / total) * 100 : 0;
  const availablePct = total > 0 ? (available / total) * 100 : 0;

  const activeCampaigns = 2;
  const activeBonuses = 2;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div className="min-w-0">
          <p className="text-[#7A7893] mb-1 text-sm">Wallet balance</p>
          <p className="text-[#0E0D1E] text-4xl font-bold tracking-tight">
            €{total.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button variant="outline" className="gap-1.5 border-[#E2E0ED] text-[#0E0D1E] text-sm px-4 py-2 h-auto font-medium" onClick={() => setShowTopUp(true)}>
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button variant="outline" className="gap-1.5 border-[#E2E0ED] text-[#0E0D1E] text-sm px-4 py-2 h-auto font-medium" onClick={() => setShowWithdraw(true)}>
            <ArrowDownFromLine className="w-3.5 h-3.5" /> Withdraw
          </Button>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex mb-5">
        <div style={{ width: `${campaignPct}%`, background: 'linear-gradient(to right, #4B3F8F, #796EB2)' }} className="h-full" />
        <div style={{ width: `${bonusPct}%`, background: 'linear-gradient(to right, #f59e0b, #fbbf24)' }} className="h-full" />
        <div style={{ width: `${availablePct}%`, background: 'linear-gradient(to right, #10b981, #34d399)' }} className="h-full" />
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-0 flex-1">
        {/* Campaigns */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#796EB2] flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Campaigns</p>
              <p className="text-xs text-[#9490AA]">{activeCampaigns} active</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#0E0D1E]">€{campaigns.toLocaleString('nl-NL')}</span>
        </div>

        {/* Bonuses */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Bonuses</p>
              <p className="text-xs text-[#9490AA]">{activeBonuses} active</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#0E0D1E]">€{bonuses.toLocaleString('nl-NL')}</span>
        </div>

        <div className="border-t border-[#EBEBF0]" />

        {/* Available */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Available</p>
              <p className="text-xs text-[#9490AA]">free to allocate</p>
            </div>
          </div>
          <span className="text-sm font-bold" style={{color:'#16A34A'}}>€{available.toLocaleString('nl-NL')}</span>
        </div>
      </div>

      <Link to="/wallet" className="text-sm text-[#796EB2] hover:underline mt-0 block font-semibold">
        View full wallet →
      </Link>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>
  );
}