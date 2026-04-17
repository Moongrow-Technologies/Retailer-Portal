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
          {/* Top row: balance */}
          <div className="mb-6">
            <p className="text-sm text-[#5b616e] mb-1">Wallet balance</p>
            <p className="text-[#0c0b0c] text-5xl font-bold tracking-tight">
              €{total.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Bottom row: three columns */}
          <div className="grid grid-cols-3 divide-x divide-[#EBEBF0] border-t border-[#EBEBF0] pt-6">
            {/* Campaign budgets */}
            <div className="pr-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#796EB2] flex-shrink-0" />
                <p className="text-sm text-[#5b616e]">Campaign budgets</p>
              </div>
              <p className="text-[#0c0b0c] text-2xl font-bold mb-1">€{campaigns.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</p>
              <p className="text-xs text-[#5b616e]">2 active campaigns</p>
            </div>

            {/* Bonus budgets */}
            <div className="px-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
                <p className="text-sm text-[#5b616e]">Bonus budgets</p>
              </div>
              <p className="text-[#0c0b0c] text-2xl font-bold mb-1">€{bonuses.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</p>
              <p className="text-xs text-[#5b616e]">2 active bonuses</p>
            </div>

            {/* Unbudgeted */}
            <div className="pl-6">
              <p className="text-sm text-[#5b616e] mb-2">Unbudgeted</p>
              <p className="text-[#0c0b0c] text-2xl font-bold mb-1">€{available.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</p>
              <p className="text-xs text-[#5b616e]">free to budget</p>
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