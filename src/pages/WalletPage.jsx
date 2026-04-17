import React, { useState } from 'react';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Button } from '@/components/ui/button';
import { ArrowDownFromLine, Plus, AlertTriangle } from 'lucide-react';
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
  const campaignsPct = total > 0 ? Math.round(campaigns / total * 100) : 0;
  const bonusesPct = total > 0 ? Math.round(bonuses / total * 100) : 0;
  const availablePct = total > 0 ? Math.round(available / total * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Wallet</h1>
          <p className="text-sm text-[#5b616e] mt-1">Manage your EURC funds and transaction history.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowWithdraw(true)}
            variant="outline"
            className="gap-2 font-semibold border-[#E2E0ED] text-[#0c0b0c] bg-white hover:bg-[#F4F3FA]">
            
            <ArrowDownFromLine className="w-4 h-4" /> Withdraw
          </Button>
          <Button
            onClick={() => setShowTopUp(true)}
            variant="outline"
            className="gap-2 font-semibold border-[#E2E0ED] text-[#0c0b0c] bg-white hover:bg-[#F4F3FA]">
            
            <Plus className="w-4 h-4" /> Top Up
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
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_1px_4px_0_rgba(0,0,0,0.06)] p-6">
          <div className="flex items-stretch gap-6">
            {/* Left: Total Balance */}
            <div className="flex flex-col justify-between min-w-[180px]">
              <div>
                <p className="text-xs font-semibold text-[#5b616e] uppercase tracking-widest mb-2">Total Balance</p>
                <p className="text-[#0c0b0c] text-4xl font-medium tracking-tight">
                  €{total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  {/* Decimal */}
                  <span className="text-2xl">,{String(total.toFixed(2).split('.')[1])}</span>
                </p>
                <p className="text-xs text-[#5b616e] mt-1">EURC</p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('tx-history');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-medium text-[#796EB2] hover:text-[#5E54A0] transition-colors text-left mt-4">
                
                View transactions →
              </button>
            </div>

            {/* Divider */}
            <div className="w-px bg-[#F0EFF8] self-stretch" />

            {/* Right: Breakdown cards + bar */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-3 gap-3">
                {/* Campaigns */}
                 <div className="bg-white border border-[#EBEBF0] rounded-xl px-4 py-3">
                   <div className="flex items-center gap-1.5 mb-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#796EB2]" />
                     <p className="text-sm font-medium text-[#0c0b0c]">Campaigns</p>
                   </div>
                   <p className="text-[#0c0b0c] text-2xl font-semibold">
                     €{campaigns.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                   </p>
                   <p className="text-xs text-[#5b616e] mt-1">{campaignsPct}% of balance</p>
                 </div>

                 {/* Bonuses */}
                 <div className="bg-white border border-[#EBEBF0] rounded-xl px-4 py-3">
                   <div className="flex items-center gap-1.5 mb-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                     <p className="text-sm font-medium text-[#0c0b0c]">Bonuses</p>
                   </div>
                   <p className="text-[#0c0b0c] text-2xl font-semibold">
                     €{bonuses.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                   </p>
                   <p className="text-xs text-[#5b616e] mt-1">{bonusesPct}% of balance</p>
                 </div>

                 {/* Available */}
                 <div className="bg-white border border-[#EBEBF0] rounded-xl px-4 py-3">
                   <div className="flex items-center gap-1.5 mb-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                     <p className="text-sm font-medium text-[#0c0b0c]">Available</p>
                   </div>
                   <p className="text-emerald-700 text-2xl font-semibold">
                     €{available.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                   </p>
                   <p className="text-xs text-[#5b616e] mt-1">{availablePct}% of balance</p>
                 </div>
              </div>

              {/* Balance bar */}
              <div className="h-2.5 rounded-full bg-[#E2E0ED] overflow-hidden flex">
                {total > 0 &&
                <>
                    <div className="h-full bg-[#796EB2]" style={{ width: `${campaignsPct}%` }} />
                    <div className="h-full bg-amber-500" style={{ width: `${bonusesPct}%` }} />
                    <div className="h-full bg-emerald-500" style={{ width: `${availablePct}%` }} />
                  </>
                }
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