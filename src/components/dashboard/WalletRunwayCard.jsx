import React from 'react';

export default function WalletRunwayCard({ campaigns, bonuses }) {
  // Campaign Fund data
  const campaignPaidOut = 487;
  const campaignBudget = 1400;
  const campaignRemaining = campaignBudget - campaignPaidOut;
  const campaignPercent = Math.round((campaignPaidOut / campaignBudget) * 100);
  
  // Bonus Fund data
  const bonusPaidOut = 100;
  const bonusBudget = 225;
  const bonusRemaining = bonusBudget - bonusPaidOut;
  const bonusPercent = Math.round((bonusPaidOut / bonusBudget) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 flex flex-col h-full overflow-hidden">
      {/* Campaign Fund Section */}
      <div className="mb-6">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#534AB7] flex-shrink-0"></div>
          <h3 className="text-base font-bold text-[#0c0b0c]">Campaign Fund</h3>
        </div>
        
        {/* Paid out and Remaining */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-[#5b616e] mb-1">Paid out</p>
            <p className="text-3xl font-bold text-[#534AB7]">€{campaignPaidOut}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#5b616e] mb-1">Remaining</p>
            <p className="text-3xl font-bold text-[#0c0b0c]">€{campaignRemaining}</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full bg-[#EBEBF0] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#534AB7] h-full rounded-full transition-all"
              style={{ width: `${campaignPercent}%` }}
            ></div>
          </div>
        </div>
        
        {/* Percentage and total */}
        <div className="flex justify-between">
          <span className="text-xs text-[#5b616e]">{campaignPercent}%</span>
          <span className="text-xs text-[#5b616e]">of €{campaignBudget}</span>
        </div>
      </div>

      <div className="border-t border-[#EBEBF0]"></div>

      {/* Bonus Fund Section */}
      <div className="mt-6">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#F0997B] flex-shrink-0"></div>
          <h3 className="text-base font-bold text-[#0c0b0c]">Bonus Fund</h3>
        </div>
        
        {/* Paid out and Remaining */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-[#5b616e] mb-1">Paid out</p>
            <p className="text-3xl font-bold text-[#F0997B]">€{bonusPaidOut}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#5b616e] mb-1">Remaining</p>
            <p className="text-3xl font-bold text-[#0c0b0c]">€{bonusRemaining}</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full bg-[#EBEBF0] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#F0997B] h-full rounded-full transition-all"
              style={{ width: `${bonusPercent}%` }}
            ></div>
          </div>
        </div>
        
        {/* Percentage and total */}
        <div className="flex justify-between">
          <span className="text-xs text-[#5b616e]">{bonusPercent}%</span>
          <span className="text-xs text-[#5b616e]">of €{bonusBudget}</span>
        </div>
      </div>
    </div>
  );
}