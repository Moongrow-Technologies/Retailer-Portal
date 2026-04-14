import React from 'react';
import WalletSummary from '@/components/dashboard/WalletSummary';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import CommissionSparkCard from '@/components/dashboard/CommissionSparkCard';
import { Megaphone, Gift, ShoppingBag, Star, AlertTriangle } from 'lucide-react';
import { WALLET, CAMPAIGNS, BONUSES, STAFF, ACTIVITIES } from '@/lib/sampleData';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const wallet = WALLET;
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === 'active');
  const activeBonuses = BONUSES.filter(b => b.status === 'active');
  const topStaff = [...STAFF].sort((a, b) => b.total_commissions - a.total_commissions)[0];
  const zeroBalance = wallet.total_balance === 0;

  // Sales by incentivised staff — sum commissions of staff on active campaigns
  const incentivisedStaff = STAFF.filter(s => s.status === 'active');
  const salesThisMonth = incentivisedStaff.reduce((sum, s) => sum + s.total_commissions * 8, 0);
  const salesLastMonth = salesThisMonth * 0.82;
  const salesChange = salesLastMonth > 0 ? (((salesThisMonth - salesLastMonth) / salesLastMonth) * 100).toFixed(0) : null;

  const statCardClass = "bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5 transition-all hover:shadow-md hover:border-[#C8C3E8] cursor-default";

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
        {/* Wallet summary - compact */}
        <div className="col-span-12">
          <WalletSummary wallet={wallet} compact />
        </div>

        {/* Active Campaigns */}
        <div className="col-span-3">
          <Link to="/campaigns">
            <div className={statCardClass}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Active Campaigns</p>
                  <p className="text-2xl font-bold text-[#0E0D1E] mt-1">{activeCampaigns.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-[#796EB2]" />
                </div>
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-3">↑ 2 new this month</p>
            </div>
          </Link>
        </div>

        {/* Active Bonuses */}
        <div className="col-span-3">
          <Link to="/bonuses">
            <div className={statCardClass}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Active Bonuses</p>
                  <p className="text-2xl font-bold text-[#0E0D1E] mt-1">{activeBonuses.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#796EB2]" />
                </div>
              </div>
              <p className="text-xs text-red-500 font-medium mt-3">↓ 1 ending soon</p>
            </div>
          </Link>
        </div>

        {/* Commission Spend This Month — sparkline card */}
        <div className="col-span-3">
          <CommissionSparkCard />
        </div>

        {/* Sales by Incentivised Staff */}
        <div className="col-span-3">
          <div className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Incentivised Sales</p>
                <p className="text-2xl font-bold text-[#0E0D1E] mt-1">€{salesThisMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                <p className="text-xs text-[#9490AA] mt-0.5">Staff on active campaigns</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#796EB2]" />
              </div>
            </div>
            {salesChange && (
              <p className="text-xs text-emerald-600 font-medium mt-3">↑ {salesChange}% vs last month</p>
            )}
          </div>
        </div>

        {/* Top Performer */}
        <div className="col-span-3">
          <Link to="/leaderboard">
            <div className={statCardClass}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Top Performer</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center text-xs font-bold text-[#796EB2]">
                      {topStaff?.name?.charAt(0) || '?'}
                    </div>
                    <p className="text-xl font-bold text-[#0E0D1E]">{topStaff?.name || '—'}</p>
                  </div>
                  <p className="text-xs text-[#9490AA] mt-1">€{topStaff?.total_commissions?.toFixed(2)} earned</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#796EB2]" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Activity feed */}
        <div className="col-span-12">
          <ActivityFeed activities={ACTIVITIES} />
        </div>
      </div>
    </div>
  );
}