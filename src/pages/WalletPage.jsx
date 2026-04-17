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
            onClick={() => setShowTopUp(true)}
            variant="outline" className="bg-[#27272b] text-[#fafafa] px-4 py-2 text-sm font-semibold rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-9 gap-2 border-[#E2E0ED] hover:bg-[#F4F3FA]">
            
            <Plus className="w-4 h-4" /> Top Up
          </Button>
          <Button
            onClick={() => setShowWithdraw(true)}
            variant="outline"
            className="gap-2 font-semibold border-[#E2E0ED] text-[#12121f] bg-white hover:bg-[#F4F3FA]">
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
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_1px_4px_0_rgba(0,0,0,0.06)] p-6 flex items-center gap-8">
          {/* Left: balance */}
          <div className="pr-8 border-r border-[#EBEBF0] flex-shrink-0">
            <p className="text-sm text-[#5b616e] mb-1">Wallet balance</p>
            <p className="text-[#0c0b0c] text-4xl font-bold tracking-tight">
              €{total.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Right: breakdown rows */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Campaign budgets */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#796EB2] flex-shrink-0" />
              <span className="text-sm font-medium text-[#0c0b0c] w-36">Campaign budgets</span>
              <span className="text-xs text-[#5b616e] bg-[#F4F3F4] rounded-full px-2 py-0.5">2 active</span>
              <div className="flex-1 h-0.5 rounded-full bg-[#796EB2] mx-2" />
              <span className="text-sm font-bold text-[#0c0b0c] ml-auto">€{campaigns.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</span>
            </div>

            {/* Bonus budgets */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="text-sm font-medium text-[#0c0b0c] w-36">Bonus budgets</span>
              <span className="text-xs text-[#5b616e] bg-[#F4F3F4] rounded-full px-2 py-0.5">2 active</span>
              <div className="flex-1 h-0.5 rounded-full bg-amber-400 mx-2" style={{ maxWidth: '60px' }} />
              <span className="text-sm font-bold text-[#0c0b0c] ml-auto">€{bonuses.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</span>
            </div>

            {/* Unbudgeted */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#BEBEBE] flex-shrink-0" />
              <span className="text-sm font-medium text-[#0c0b0c] w-36">Unbudgeted</span>
              <span className="text-xs text-[#5b616e] bg-[#F4F3F4] rounded-full px-2 py-0.5">free to budget</span>
              <div className="flex-1 h-0.5 rounded-full bg-[#BEBEBE] mx-2" style={{ maxWidth: '40px' }} />
              <span className="text-sm font-bold text-[#0c0b0c] ml-auto">€{available.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}</span>
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