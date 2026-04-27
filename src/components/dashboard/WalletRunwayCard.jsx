import React from 'react';

export default function WalletRunwayCard() {
  // Campaign data
  const campaignBudget = 1400;
  const campaignPaidOut = 487;
  const campaignRemaining = campaignBudget - campaignPaidOut;
  const campaignPercent = Math.round((campaignPaidOut / campaignBudget) * 100);
  const activeCampaigns = 3;
  
  // Bonus data
  const bonusBudget = 225;
  const bonusPaidOut = 100;
  const bonusRemaining = bonusBudget - bonusPaidOut;
  const bonusPercent = Math.round((bonusPaidOut / bonusBudget) * 100);
  const activeBonuses = 2;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col overflow-hidden h-full">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Allocated funds</h3>
      {/* Campaign Section */}
      <div className="mb-4">
        {/* Header: Title + Budget */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#534AB7] flex-shrink-0"></div>
            <h3 className="text-sm font-bold text-[#0c0b0c]">Campaign</h3>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{campaignBudget}</span>
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
          <span className="text-xs font-bold text-[#534AB7]">€{campaignPaidOut} paid out</span>
          <span className="text-xs font-bold text-[#0c0b0c]">€{campaignRemaining} left</span>
        </div>
      </div>

      <div className="border-t border-[#EBEBF0]"></div>

      {/* Bonus Section */}
      <div className="mt-4">
        {/* Header: Title + Budget */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F0997B] flex-shrink-0"></div>
            <h3 className="text-sm font-bold text-[#0c0b0c]">Bonus</h3>
          </div>
          <span className="text-sm font-bold text-[#0c0b0c]">€{bonusBudget}</span>
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
          <span className="text-xs font-bold text-[#F0997B]">€{bonusPaidOut} paid out</span>
          <span className="text-xs font-bold text-[#0c0b0c]">€{bonusRemaining} left</span>
        </div>
      </div>
    </div>
  );
}