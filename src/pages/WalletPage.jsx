import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import WalletBreakdown from '@/components/shared/WalletBreakdown';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import TopUpModal from '@/components/wallet/TopUpModal';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';
import { WALLET, TRANSACTIONS } from '@/lib/sampleData';

export default function WalletPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const wallet = WALLET;
  const zeroBalance = wallet.total_balance === 0;

  return (
    <div>
      <PageHeader title="Wallet" description="Manage your EURC funds">
        <Button onClick={() => setShowTopUp(true)} className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" /> Top Up
        </Button>
      </PageHeader>

      {zeroBalance && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">All campaigns auto-paused</p>
            <p className="text-xs text-red-600">Your wallet balance is zero. Top up now to resume all system-paused campaigns.</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <WalletBreakdown wallet={wallet} />
        <TransactionHistory transactions={TRANSACTIONS} />
      </div>

      <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
    </div>
  );
}