import React from 'react';
import CompactWalletCard from '@/components/dashboard/CompactWalletCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import TopBudtenders from '@/components/dashboard/TopBudtenders';
import NeedsAttention from '@/components/dashboard/NeedsAttention';
import DashboardMetricCards from '@/components/dashboard/DashboardMetricCards';
import { AlertTriangle } from 'lucide-react';
import { WALLET, CAMPAIGNS, BONUSES, STAFF, ACTIVITIES } from '@/lib/sampleData';

export default function Dashboard() {
  const wallet = WALLET;
  const topBudtenders = [...STAFF].filter(s => s.status === 'active').sort((a, b) => b.total_commissions - a.total_commissions).slice(0, 3);
  const needsAttention = [...STAFF].filter(s => s.status === 'active').sort((a, b) => a.total_commissions - b.total_commissions).slice(0, 3);
  const zeroBalance = wallet.total_balance === 0;

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Dashboard</h1>
          <p className="text-sm text-[#7A7893] mt-1">De Groene Hoek — Amsterdam</p>
        </div>
        <QuickActions />
      </div>

      {zeroBalance && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">All campaigns auto-paused</p>
            <p className="text-xs text-red-600">Your wallet balance has hit zero. Top up to resume campaigns.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Wallet + Stats two-column row */}
        <div className="col-span-4">
          <CompactWalletCard wallet={wallet} />
        </div>
        <div className="col-span-8">
          <DashboardMetricCards campaigns={CAMPAIGNS} />
        </div>

        {/* Activity feed + Top Budtenders */}
        <div className="col-span-8 flex">
          <ActivityFeed activities={ACTIVITIES} />
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <TopBudtenders staff={topBudtenders} />
          <NeedsAttention staff={needsAttention} />
        </div>
      </div>
    </div>
  );
}