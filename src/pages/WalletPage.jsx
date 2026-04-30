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
        {/* Combined Wallet Card */}
        <div className="rounded-2xl overflow-hidden border border-[#EBEBF0] shadow-[0_1px_4px_0_rgba(0,0,0,0.06)]">
          {/* Purple gradient hero */}
          <div
            className="p-6"
            style={{ background: 'linear-gradient(135deg, #6B63C4 0%, #8E85D4 60%, #A89ED8 100%)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a1 1 0 100-2 1 1 0 000 2z" /></svg>
                  <span className="text-[11px] font-bold tracking-[0.12em] text-white opacity-90 uppercase">Moongrow Wallet</span>
                </div>
                <p className="text-white text-5xl font-bold tracking-tight leading-none mb-2">
                  €{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-white/70 text-sm">Available balance</p>
              </div>
              {/* Divider + Runway */}
              <div className="flex items-stretch gap-0 self-stretch ml-6">
                <div className="w-px bg-white/20 mx-6" />
                <div className="flex flex-col justify-center pr-6">
                  <p className="text-white/70 text-xs mb-1">Estimated runway</p>
                  <p className="text-white text-2xl font-bold leading-none mb-1">
                    {runwayDays} <span className="text-base font-semibold">days left</span>
                  </p>
                  <p className="text-white/60 text-xs">At current spend · ~May 22</p>
                </div>
              </div>
            </div>
          </div>

          {/* Allocated funds — three vertical sections */}
          <div className="bg-white">
            <div className="px-6 py-4 border-b border-[#EBEBF0]">
              <p className="text-sm font-bold text-[#0c0b0c]">Allocated funds</p>
            </div>
            <div className="flex divide-x divide-[#EBEBF0]">
              {/* Campaign Fund */}
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#796eb2] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#0c0b0c]">Campaign Fund</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-3">{activeCampaigns} active campaign{activeCampaigns !== 1 ? 's' : ''}</p>
                <p className="text-2xl font-bold text-[#0c0b0c] mb-3">€{campaignFundTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
                <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-[#796eb2]" style={{ width: `${campaignPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€{campaignPaidOut.toLocaleString('en-US', { minimumFractionDigits: 0 })} paid out</p>
                  <p className="text-xs text-[#5b616e]">€{campaignRemaining.toLocaleString('en-US', { minimumFractionDigits: 0 })} remaining</p>
                </div>
              </div>

              {/* Bonus Fund */}
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F0997B] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#0c0b0c]">Bonus Fund</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-3">{activeBonuses} active bonus{activeBonuses !== 1 ? 'es' : ''}</p>
                <p className="text-2xl font-bold text-[#0c0b0c] mb-3">€{bonusFundTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
                <div className="w-full h-1.5 bg-[#FDEADE] rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-[#F0997B]" style={{ width: `${bonusPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-[#5b616e]">€{bonusPaidOut.toLocaleString('en-US', { minimumFractionDigits: 0 })} paid out</p>
                  <p className="text-xs text-[#5b616e]">€{bonusRemaining.toLocaleString('en-US', { minimumFractionDigits: 0 })} remaining</p>
                </div>
              </div>

              {/* Unbudgeted */}
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D1D0D8] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#5b616e]">Unbudgeted</span>
                </div>
                <p className="text-xs text-[#5b616e] mb-3">Free to budget</p>
                <p className="text-2xl font-bold text-[#0c0b0c]">€{available.toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
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