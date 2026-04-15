import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpFromLine } from 'lucide-react';
import TopUpModal from '@/components/wallet/TopUpModal';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import { Link } from 'react-router-dom';

export default function CompactWalletCard({ wallet }) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-6 h-full flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-3">Wallet Balance</p>
        <p className="text-5xl font-bold tracking-tight text-[#0E0D1E]">
          €{wallet.total_balance.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-[#9490AA] mt-1.5">EURC</p>
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant="outline" className="flex-1 gap-1.5 border-[#E2E0ED] text-[#0E0D1E]" onClick={() => setShowWithdraw(true)}>
          <ArrowUpFromLine className="w-4 h-4" /> Withdraw
        </Button>
        <Button className="flex-1 gap-1.5 bg-[#796EB2] hover:bg-[#6a5fa3] text-white" onClick={() => setShowTopUp(true)}>
          <Plus className="w-4 h-4" /> Top Up
        </Button>
      </div>

      <Link to="/wallet" className="text-xs text-[#796EB2] hover:underline mt-3 text-center block">
        View full wallet →
      </Link>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
      <WithdrawModal open={showWithdraw} onClose={() => setShowWithdraw(false)} />
    </div>
  );
}