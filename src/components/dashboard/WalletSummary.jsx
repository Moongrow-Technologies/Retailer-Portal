import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WalletBreakdown from '@/components/shared/WalletBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';

export default function WalletSummary({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);

  return (
    <div className="relative">
      <WalletBreakdown wallet={wallet} />
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <Link to="/wallet">
          <Button size="sm" variant="outline" className="text-xs gap-1.5 border-[#E2E0ED] text-[#0E0D1E]">
            <ArrowUpFromLine className="w-3.5 h-3.5" /> Withdraw
          </Button>
        </Link>
        <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => setShowTopUp(true)}>
          <Plus className="w-3.5 h-3.5" /> Top Up
        </Button>
      </div>
      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
    </div>
  );
}