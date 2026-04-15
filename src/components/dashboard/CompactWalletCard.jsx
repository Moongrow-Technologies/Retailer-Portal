import React, { useState } from 'react';
import { ArrowUpFromLine, Plus } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Link } from 'react-router-dom';

export default function CompactWalletCard({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const total = wallet?.total_balance || 0;
  const campaigns = wallet?.committed_campaigns || 0;
  const bonuses = wallet?.committed_bonuses || 0;
  const available = wallet?.available || 0;

  const campaignPct = total > 0 ? (campaigns / total) * 100 : 0;
  const bonusPct = total > 0 ? (bonuses / total) * 100 : 0;
  const availablePct = total > 0 ? (available / total) * 100 : 0;

  const fmt = (v) => `€${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const rows = [
    { label: 'Campaigns', value: campaigns, pct: campaignPct, color: '#796EB2', dot: '#796EB2', to: '/campaigns' },
    { label: 'Bonuses',   value: bonuses,   pct: bonusPct,    color: '#F59E0B', dot: '#F59E0B', to: '/bonuses' },
    { label: 'Available', value: available, pct: availablePct, color: '#10B981', dot: '#10B981', valueClass: 'text-emerald-500 font-bold' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] flex h-full overflow-hidden">
      {/* Left — balance + actions */}
      <div className="flex flex-col justify-between p-6 w-[200px] flex-shrink-0 border-r border-[#F0EFF8]">
        <div>
          <p className="text-[11px] font-semibold text-[#9490AA] uppercase tracking-widest mb-2">Total Balance</p>
          <p className="text-4xl font-bold tracking-tight text-[#0E0D1E] leading-none">
            {fmt(total)}
          </p>
          <p className="text-xs text-[#9490AA] mt-2">EURC</p>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => setShowWithdraw(true)}
            className="flex items-center justify-center gap-1.5 border border-[#E2E0ED] rounded-lg px-3 py-2 text-sm font-semibold text-[#0E0D1E] hover:bg-[#F5F3FC] transition-colors"
          >
            <ArrowUpFromLine className="w-3.5 h-3.5" /> Withdraw
          </button>
          <button
            onClick={() => setShowTopUp(true)}
            className="flex items-center justify-center gap-1.5 border border-[#E2E0ED] rounded-lg px-3 py-2 text-sm font-semibold text-[#0E0D1E] hover:bg-[#F5F3FC] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Top Up
          </button>
        </div>
      </div>

      {/* Right — breakdown */}
      <div className="flex-1 flex flex-col justify-center gap-4 px-6 py-6">
        {rows.map((row) => {
          const inner = (
            <div key={row.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: row.dot }} />
                  <span className="text-sm font-medium text-[#0E0D1E]">{row.label}</span>
                </div>
                <span className={`text-sm font-semibold ${row.valueClass || 'text-[#0E0D1E]'}`}>
                  {fmt(row.value)}
                </span>
              </div>
              <div className="h-[5px] rounded-full bg-[#F0EFF8] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${row.pct}%`, background: row.color }}
                />
              </div>
            </div>
          );

          return row.to ? (
            <Link to={row.to} key={row.label} className="block hover:opacity-80 transition-opacity">
              {inner}
            </Link>
          ) : (
            <div key={row.label}>{inner}</div>
          );
        })}
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>
  );
}