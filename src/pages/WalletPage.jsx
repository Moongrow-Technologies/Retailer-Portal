import React, { useState } from 'react';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, ArrowDownFromLine } from 'lucide-react';
import { WALLET, TRANSACTIONS } from '@/lib/sampleData';

export default function WalletPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const wallet = WALLET;
  const zeroBalance = wallet.total_balance === 0;

  const total = wallet.total_balance || 0;
  const campaigns = wallet.committed_campaigns || 0;
  const bonuses = wallet.committed_bonuses || 0;
  const available = wallet.available || 0;
  const runwayDays = 24;
  const runwayColor = runwayDays <= 10 ? '#DC2626' : '#16A34A';

  const campaignsPct = total > 0 ? Math.round(campaigns / total * 100) : 0;
  const bonusesPct = total > 0 ? Math.round(bonuses / total * 100) : 0;
  const availablePct = total > 0 ? Math.round(available / total * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Moongrow Wallet</h1>
          <p className="text-sm text-[#5b616e] mt-1">Manage your EURC funds and transaction history.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowTopUp(true)} className="gap-2 font-semibold bg-[#27272b] text-white hover:bg-[#3a3a3f]">
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button onClick={() => setShowWithdraw(true)} variant="outline" className="gap-2 font-semibold border-[#E2E0ED] text-[#0c0b0c] hover:bg-[#F4F3FA]">
            <ArrowDownFromLine className="w-4 h-4" /> Withdraw
          </Button>
        </div>
      </div>

      {zeroBalance &&
      <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">All campaigns auto-paused</p>
            <p className="text-xs text-red-600">Your wallet balance is zero. Top up now to resume all system-paused campaigns.</p>
          </div>
        </div>
      }

      <div className="space-y-4">
        {/* Wallet Card */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_1px_4px_0_rgba(0,0,0,0.06)] p-6 flex gap-6">
          {/* Left: balance + runway */}
          <div className="flex flex-col gap-4 min-w-[220px] border-r border-[#EBEBF0] pr-6">
            <div>
              <p className="text-sm text-[#5b616e] mb-1">Total balance</p>
              <p className="text-[#0c0b0c] text-5xl font-bold tracking-tight">
                €{total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            {/* Estimated runway box */}
            <div className="bg-[#F7F7F8] rounded-xl p-4">
              <p className="text-xs text-[#5b616e] mb-1">Estimated runway</p>
              <p className="text-2xl font-bold leading-none mb-1" style={{ color: runwayColor }}>
                {runwayDays} <span className="text-base font-semibold">days left</span>
              </p>
              <p className="text-xs text-[#5b616e]">At current spend rate · ~May 20</p>
            </div>
          </div>

          {/* Right: allocated funds */}
          <div className="flex-1">
            <p className="text-sm font-bold text-[#0c0b0c] mb-4">Allocated funds</p>
            <div className="space-y-4">
              {/* Campaign Fund */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#534AB7] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0c0b0c]">Campaign Fund</span>
                  </div>
                  <span className="text-sm font-bold text-[#0c0b0c]">€{campaigns.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-2 ml-[18px]">3 active campaigns</p>
                <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-[#534AB7]" style={{ width: `${campaignsPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€487 paid out</p>
                  <p className="text-xs text-[#5b616e]">€913 remaining</p>
                </div>
              </div>

              {/* Bonus Fund */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F0997B] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0c0b0c]">Bonus Fund</span>
                  </div>
                  <span className="text-sm font-bold text-[#0c0b0c]">€{bonuses.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-2 ml-[18px]">2 active bonuses</p>
                <div className="w-full h-1.5 bg-[#FDEADE] rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-[#F0997B]" style={{ width: `${bonusesPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€100 paid out</p>
                  <p className="text-xs text-[#5b616e]">€125 remaining</p>
                </div>
              </div>

              {/* Unbudgeted */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D1D0D8] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#5b616e]">Unbudgeted</span>
                  </div>
                  <span className="text-sm font-bold text-[#0c0b0c]">€{available.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#5b616e] ml-[18px]">free to budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div id="tx-history">
          <TransactionHistory transactions={TRANSACTIONS} />
        </div>
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}