import React, { useState, useEffect } from 'react';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, ArrowDownFromLine } from 'lucide-react';
import { getWallet, getTransactions, subscribe, getCampaigns, getBonuses } from '@/lib/appStore';

export default function WalletPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [, forceUpdate] = useState(0);

  useEffect(() => subscribe(() => forceUpdate(n => n + 1)), []);

  const wallet = getWallet();
  const zeroBalance = wallet.total_balance === 0;
  const activeCampaigns = getCampaigns().filter(c => c.status === 'active').length;
  const activeBonuses = getBonuses().filter(b => b.status === 'active').length;

  const total = wallet.total_balance || 0;
  const available = wallet.available || 0;
  const runwayDays = 24;
  const runwayColor = runwayDays <= 10 ? '#DC2626' : '#16A34A';

  // Per spec: Campaign Fund total / paid out / remaining
  const campaignFundTotal = wallet.campaign_fund_total || 0;
  const campaignPaidOut = wallet.campaign_paid_out || 0;
  const campaignRemaining = campaignFundTotal - campaignPaidOut;
  const campaignPct = campaignFundTotal > 0 ? Math.round(campaignPaidOut / campaignFundTotal * 100) : 0;

  // Per spec: Bonus Fund total / paid out / remaining
  const bonusFundTotal = wallet.bonus_fund_total || 0;
  const bonusPaidOut = wallet.bonus_paid_out || 0;
  const bonusRemaining = bonusFundTotal - bonusPaidOut;
  const bonusPct = bonusFundTotal > 0 ? Math.round(bonusPaidOut / bonusFundTotal * 100) : 0;

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
          <div className="flex flex-col gap-4 min-w-[220px] border-r border-[#EBEBF0] pr-6 justify-center">
            <div>
              <p className="text-sm text-[#5b616e] mb-1">Total balance</p>
              <p className="text-[#0c0b0c] text-3xl font-medium tracking-tight">
                €{total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            {/* Estimated runway box */}
            <div className="bg-[#F7F7F8] rounded-xl p-4">
              <p className="text-xs text-[#5b616e] mb-1">Estimated runway</p>
              <p className="text-2xl font-bold leading-none mb-1" style={{ color: runwayColor }}>
                {runwayDays} <span className="text-base font-semibold">days left</span>
              </p>
              <p className="text-xs text-[#5b616e]">At current spend rate · ~May 22</p>
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
                  <span className="text-sm font-bold text-[#0c0b0c]">€{campaignFundTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-2 ml-[18px]">{activeCampaigns} active campaign{activeCampaigns !== 1 ? 's' : ''}</p>
                <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-[#534AB7]" style={{ width: `${campaignPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€{campaignPaidOut.toLocaleString('en-US', { minimumFractionDigits: 0 })} paid out</p>
                  <p className="text-xs text-[#5b616e]">€{campaignRemaining.toLocaleString('en-US', { minimumFractionDigits: 0 })} remaining</p>
                </div>
              </div>

              {/* Bonus Fund */}
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F0997B] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0c0b0c]">Bonus Fund</span>
                  </div>
                  <span className="text-sm font-bold text-[#0c0b0c]">€{bonusFundTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-2 ml-[18px]">{activeBonuses} active bonus{activeBonuses !== 1 ? 'es' : ''}</p>
                <div className="w-full h-1.5 bg-[#FDEADE] rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-[#F0997B]" style={{ width: `${bonusPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€{bonusPaidOut.toLocaleString('en-US', { minimumFractionDigits: 0 })} paid out</p>
                  <p className="text-xs text-[#5b616e]">€{bonusRemaining.toLocaleString('en-US', { minimumFractionDigits: 0 })} remaining</p>
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
          <TransactionHistory transactions={getTransactions()} />
        </div>
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>);

}