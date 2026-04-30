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
    <div className="rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden flex flex-col h-full">
      {/* Top — gradient hero */}
      <div className="px-6 py-6 flex items-start justify-between" style={{ background: 'linear-gradient(135deg, #6B63C4 0%, #8E85D4 60%, #A89ED8 100%)' }}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a1 1 0 100-2 1 1 0 000 2z" /></svg>
            <span className="text-[11px] font-bold tracking-[0.12em] text-white opacity-90 uppercase">Moongrow Wallet</span>
          </div>
          <p className="text-white text-4xl font-bold tracking-tight leading-none mb-1">
            €{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-white/70 text-sm mb-4">Available balance</p>
          <div className="flex gap-2">
            <button onClick={() => setShowTopUp(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors border border-white/30">
              <Plus className="w-3 h-3" /> Top Up
            </button>
            <button onClick={() => setShowWithdraw(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors border border-white/30">
              <ArrowDownFromLine className="w-3 h-3" /> Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Bottom — white */}
      <div className="bg-white px-6 py-4 flex flex-col flex-1">
        <div className="mb-4">
          <p className="text-xs text-[#5b616e] mb-1">Estimated runway</p>
          <p className="text-lg font-bold leading-none text-[#5b616e]">
            {runwayDays} <span className="text-sm font-semibold">days left</span>
          </p>
          <p className="text-xs text-[#5b616e]">At current spend · ~May 22</p>
        </div>
        <Link to="/wallet" className="text-xs text-[#796EB2] hover:underline font-semibold mt-auto" onClick={() => window.scrollTo(0, 0)}>
          View Wallet →
        </Link>
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}