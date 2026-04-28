import React from 'react';
import { Link } from 'react-router-dom';
import { fmtEur } from '@/lib/utils';
import { WALLET, CAMPAIGNS, BONUSES } from '@/lib/sampleData';

export default function WalletRunwayCard() {
  // Campaign data — derived from WALLET spec values
  const campaignBudget = WALLET.campaign_fund_total;
  const campaignPaidOut = WALLET.campaign_paid_out;
  const campaignRemaining = campaignBudget - campaignPaidOut;
  const campaignPercent = Math.round((campaignPaidOut / campaignBudget) * 100);
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === 'active').length;
  
  // Bonus data — derived from WALLET spec values
  const bonusBudget = WALLET.bonus_fund_total;
  const bonusPaidOut = WALLET.bonus_paid_out;
  const bonusRemaining = bonusBudget - bonusPaidOut;
  const bonusPercent = Math.round((bonusPaidOut / bonusBudget) * 100);
  const activeBonuses = BONUSES.filter(b => b.status === 'active').length;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col overflow-hidden h-full">
      <p className="text-[13px] text-[#5b616e] font-medium mb-4">Allocated funds</p>
      {/* Campaign Section */}
      <Link to="/campaigns" className="mb-4 block group">
        {/* Header: Title + Budget */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#534AB7] flex-shrink-0"></div>
            <h3 className="text-sm font-bold text-[#0c0b0c] group-hover:text-[#534AB7] transition-colors">Campaigns</h3>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">{fmtEur(campaignBudget)}</span>
        </div>
        
        {/* Active count */}
        <p className="text-xs text-[#5b616e] mb-2">{activeCampaigns} active campaigns</p>
        
        {/* Progress bar */}
        <div className="w-full bg-[#EBEBF0] rounded-full h-1.5 overflow-hidden mb-2">
          <div
            className="bg-[#534AB7] h-full rounded-full transition-all"
            style={{ width: `${campaignPercent}%` }}
          ></div>
        </div>
        
        {/* Paid out and Remaining */}
        <div className="flex justify-between">
          <span className="text-xs font-bold text-[#534AB7]">{fmtEur(campaignPaidOut)} paid out</span>
          <span className="text-xs font-bold text-[#0c0b0c]">{fmtEur(campaignRemaining)} left</span>
        </div>
      </Link>

      <div className="border-t border-[#EBEBF0]"></div>

      {/* Bonus Section */}
      <Link to="/bonuses" className="mt-4 block group">
        {/* Header: Title + Budget */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F0997B] flex-shrink-0"></div>
            <h3 className="text-sm font-bold text-[#0c0b0c] group-hover:text-[#F0997B] transition-colors">Bonuses</h3>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">{fmtEur(bonusBudget)}</span>
        </div>
        
        {/* Active count */}
        <p className="text-xs text-[#5b616e] mb-2">{activeBonuses} active bonuses</p>
        
        {/* Progress bar */}
        <div className="w-full bg-[#EBEBF0] rounded-full h-1.5 overflow-hidden mb-2">
          <div
            className="bg-[#F0997B] h-full rounded-full transition-all"
            style={{ width: `${bonusPercent}%` }}
          ></div>
        </div>
        
        {/* Paid out and Remaining */}
        <div className="flex justify-between">
          <span className="text-xs font-bold text-[#F0997B]">{fmtEur(bonusPaidOut)} paid out</span>
          <span className="text-xs font-bold text-[#0c0b0c]">{fmtEur(bonusRemaining)} left</span>
        </div>
      </Link>
    </div>
  );
}