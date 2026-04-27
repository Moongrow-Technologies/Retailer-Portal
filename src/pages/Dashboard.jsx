import React, { useRef, useState, useEffect } from 'react';
import CompactWalletCard from '@/components/dashboard/CompactWalletCard';
import WalletRunwayCard from '@/components/dashboard/WalletRunwayCard';
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

  const activeCampaignsCardRef = useRef(null);
  const [walletCardHeight, setWalletCardHeight] = useState(null);

  useEffect(() => {
    if (!activeCampaignsCardRef.current) return;
    const measure = () => {
      if (activeCampaignsCardRef.current) {
        setWalletCardHeight(activeCampaignsCardRef.current.getBoundingClientRect().height);
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(activeCampaignsCardRef.current);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Dashboard</h1>
          <p className="text-sm text-[#5b616e] mt-1">De Groene Hoek — Amsterdam</p>
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Row 1, Column 1: Wallet cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={walletCardHeight ? { height: walletCardHeight, display: 'flex', flexDirection: 'column' } : { display: 'flex', flexDirection: 'column' }}>
            <CompactWalletCard wallet={wallet} />
          </div>
          <WalletRunwayCard wallet={wallet} />
        </div>

        {/* Row 1, Columns 2-3: Metric Cards */}
        <div style={{ gridColumn: 'span 2' }}>
          <DashboardMetricCards campaigns={CAMPAIGNS} bonuses={BONUSES} activeCampaignsCardRef={activeCampaignsCardRef} />
        </div>

        {/* Row 2, Columns 1-2: Activity Feed */}
        <div style={{ gridColumn: 'span 2' }}>
          <ActivityFeed activities={ACTIVITIES} />
        </div>

        {/* Row 2, Column 3: Top Budtenders + Needs Attention */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TopBudtenders staff={topBudtenders} />
          <NeedsAttention staff={needsAttention} />
        </div>
      </div>
    </div>
  );
}