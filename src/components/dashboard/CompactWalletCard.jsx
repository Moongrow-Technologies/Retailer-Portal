import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowDownFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Link } from 'react-router-dom';
import { subscribe } from '@/lib/appStore';

export default function CompactWalletCard({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [, forceUpdate] = useState(0);
  useEffect(() => subscribe(() => forceUpdate(n => n + 1)), []);

  const total = wallet.total_balance || 0;
  const campaigns = wallet.committed_campaigns || 0;
  const bonuses = wallet.committed_bonuses || 0;
  const available = wallet.available || 0;

  const activeCampaigns = 3;
  const activeBonuses = 2;

  const runwayDays = 24;
  const runwayColor = runwayDays <= 10 ? '#DC2626' : '#16A34A';

  return (
    <div
      className="px-6 py-6 rounded-2xl flex flex-col h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #6B63C4 0%, #8E85D4 60%, #A89ED8 100%)' }}
    >
      {/* decorative circle */}
      <div className="absolute right-[-40px] bottom-[-40px] w-[180px] h-[180px] rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.4)' }} />
      {/* Header + Runway side by side */}
      <div className="flex items-start justify-between gap-4 relative z-10 flex-1">
        {/* Left: balance + actions */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a1 1 0 100-2 1 1 0 000 2z" /></svg>
            <p className="text-[11px] font-bold tracking-[0.12em] text-white opacity-90 uppercase">Moongrow Wallet</p>
          </div>
          <p className="text-white mb-1 text-3xl font-bold tracking-tight">
            €{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-white/70 text-sm mb-3">Available balance</p>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1 border-white/30 text-white bg-white/15 hover:bg-white/25 text-xs px-3 py-1.5 h-auto font-medium" onClick={() => setShowTopUp(true)}>
              <Plus className="w-3 h-3" /> Top Up
            </Button>
            <Button variant="outline" className="gap-1 border-white/30 text-white bg-white/15 hover:bg-white/25 text-xs px-3 py-1.5 h-auto font-medium" onClick={() => setShowWithdraw(true)}>
              <ArrowDownFromLine className="w-3 h-3" /> Withdraw
            </Button>
          </div>
          <div className="mt-auto pt-4">
            <Link to="/wallet" className="text-xs text-white/80 hover:text-white block font-semibold" onClick={() => window.scrollTo(0, 0)}>
              View Moongrow Wallet →
            </Link>
          </div>
        </div>

        {/* Right: Estimated runway */}
        <div className="bg-white/15 rounded-xl p-4 flex-shrink-0 text-right">
          <p className="text-xs text-white/70 mb-1">Estimated runway</p>
          <p className="text-2xl font-bold leading-none mb-1 text-white">
            {runwayDays} <span className="text-base font-semibold">days</span>
          </p>
          <p className="text-xs text-white/60">~May 22</p>
        </div>
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}