import React, { useState } from 'react';
import WalletBreakdown from '@/components/shared/WalletBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';

export default function WalletSummary({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="relative">
      <WalletBreakdown wallet={wallet} />
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <Button size="sm" variant="outline" className="text-xs gap-1.5 border-[#E2E0ED] text-[#0E0D1E]" onClick={() => setShowWithdraw(true)}>
          <ArrowUpFromLine className="w-3.5 h-3.5" /> Withdraw
        </Button>
        <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => setShowTopUp(true)}>
          <Plus className="w-3.5 h-3.5" /> Top Up
        </Button>
      </div>
      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>
  );
}