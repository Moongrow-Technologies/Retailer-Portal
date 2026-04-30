import React, { useRef, useState, useEffect } from 'react';
import CompactWalletCard from '@/components/dashboard/CompactWalletCard';
import WalletRunwayCard from '@/components/dashboard/WalletRunwayCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import TopBudtenders from '@/components/dashboard/TopBudtenders';
import NeedsAttention from '@/components/dashboard/NeedsAttention';
import DashboardMetricCards from '@/components/dashboard/DashboardMetricCards';
import { AlertTriangle } from 'lucide-react';
import { getWallet, getCampaigns, getBonuses, getStaff, getActivities, subscribe } from '@/lib/appStore';

export default function Dashboard() {
  const [, forceUpdate] = useState(0);
  useEffect(() => subscribe(() => forceUpdate(n => n + 1)), []);

  const wallet = getWallet();
  const activeStaff = getStaff().filter(s => s.status === 'active');
  const topBudtenders = [...activeStaff].sort((a, b) => b.total_commissions - a.total_commissions).slice(0, 3);
  const needsAttention = [...activeStaff].sort((a, b) => a.total_commissions - b.total_commissions).slice(0, 3);
  const zeroBalance = wallet.total_balance === 0;

  const activeCampaignsCardRef = useRef(null);
  const revenueCardRef = useRef(null);
  const [walletCardHeight, setWalletCardHeight] = useState(null);
  const [runwayCardHeight, setRunwayCardHeight] = useState(null);

  useEffect(() => {
    const observers = [];
    const observe = (ref, setter) => {
      if (!ref.current) return;
      const measure = () => {
        if (ref.current) setter(ref.current.getBoundingClientRect().height);
      };
      const obs = new ResizeObserver(measure);
      obs.observe(ref.current);
      measure();
      observers.push(obs);
    };
    observe(activeCampaignsCardRef, setWalletCardHeight);
    observe(revenueCardRef, setRunwayCardHeight);
    return () => observers.forEach(o => o.disconnect());
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Row 1: Full-width Wallet Card */}
        <CompactWalletCard wallet={wallet} />

        {/* Row 2: Metric Cards + Runway */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '18px',
          alignItems: 'start'
        }}>
          {/* Column 1: Runway */}
          <WalletRunwayCard wallet={wallet} />

          {/* Columns 2-3: Metric Cards */}
          <div style={{ gridColumn: 'span 2' }}>
            <DashboardMetricCards campaigns={getCampaigns()} bonuses={getBonuses()} activeCampaignsCardRef={activeCampaignsCardRef} revenueCardRef={revenueCardRef} />
          </div>
        </div>

        {/* Row 3: Activity Feed + Top Budtenders */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '18px',
          alignItems: 'start'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <ActivityFeed activities={getActivities().slice(0, 8)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <TopBudtenders staff={topBudtenders} />
            <NeedsAttention staff={needsAttention} />
          </div>
        </div>
      </div>
    </div>
  );
}