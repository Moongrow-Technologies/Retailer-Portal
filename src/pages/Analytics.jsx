import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/shared/StatCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, DollarSign, ShoppingCart, Percent } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line } from
'recharts';
import { STORE, STAFF, CAMPAIGNS, PRODUCTS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const TIME_PERIODS = ['Today', 'This Week', 'This Month', 'Custom'];

const revenueOverTime = {
  'Today': [{ label: '9am', value: 320 }, { label: '11am', value: 580 }, { label: '1pm', value: 940 }, { label: '3pm', value: 1240 }, { label: '5pm', value: 1520 }, { label: '7pm', value: 1680 }],
  'This Week': [{ label: 'Mon', value: 820 }, { label: 'Tue', value: 1340 }, { label: 'Wed', value: 1900 }, { label: 'Thu', value: 2450 }, { label: 'Fri', value: 3120 }, { label: 'Sat', value: 3800 }, { label: 'Sun', value: 4100 }],
  'This Month': [{ label: 'Mar 14', value: 0 }, { label: 'Mar 21', value: 1200 }, { label: 'Mar 28', value: 2800 }, { label: 'Apr 4', value: 4200 }, { label: 'Apr 7', value: 5500 }, { label: 'Apr 11', value: 6900 }, { label: 'Apr 14', value: 7519 }],
  'Custom': [{ label: 'Week 1', value: 1800 }, { label: 'Week 2', value: 3200 }, { label: 'Week 3', value: 5100 }, { label: 'Week 4', value: 7519 }]
};

const commissionByProduct = [
{ name: 'OG Kush', sku: 'OGK-001', units: 156, revenue: 1950, price: 12.50 },
{ name: 'Blue Dream', sku: 'BLD-002', units: 200, revenue: 2200, price: 11.00 },
{ name: 'Amnesia Haze', sku: 'AMH-003', units: 74, revenue: 962, price: 13.00 },
{ name: 'White Widow', sku: 'WTW-004', units: 114, revenue: 1197, price: 10.50 },
{ name: 'Gorilla Glue', sku: 'GRG-005', units: 15, revenue: 210, price: 14.00 }];


const campaignSpend = CAMPAIGNS.map((c) => ({
  name: c.name.length > 16 ? c.name.slice(0, 14) + '…' : c.name,
  spent: c.spent,
  budget: c.budget
}));

const activeStaff = [...STAFF].
filter((s) => s.status === 'active').
sort((a, b) => b.total_commissions - a.total_commissions);

export default function Analytics() {
  const [period, setPeriod] = useState('This Month');
  const [campaign, setCampaign] = useState('all');

  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const totalUnits = CAMPAIGNS.reduce((s, c) => s + c.units_sold, 0);
  const totalRevenue = totalUnits * 12.0;
  const roi = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(1) : '—';

  const maxCommission = activeStaff[0]?.total_commissions || 1;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Analytics</h1>
          <p className="text-sm text-[#7A7893] mt-1">Track the performance of your incentives programme.</p>
        </div>
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E]">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] px-4 py-3 flex items-center gap-4 mb-6">
        <div className="flex items-center gap-1 bg-[#F4F2FB] rounded-lg p-1">
          {TIME_PERIODS.map((p) =>
          <button
            key={p}
            onClick={() => setPeriod(p)} className="bg-white text-[#0E0D1E] px-4 py-1.5 text-sm font-medium rounded transition-all whitespace-nowrap shadow-sm border border-[#E2E0ED]">






            
              {p}
            </button>
          )}
        </div>
        <Select value={campaign} onValueChange={setCampaign}>
          <SelectTrigger className="w-[220px] border-[#E2E0ED]">
            <SelectValue placeholder="All Campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {CAMPAIGNS.map((c) =>
            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Stat boxes */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Units Sold" value={totalUnits} icon={ShoppingCart} trend="vs last period" trendUp />
        <StatCard label="Total Revenue Generated" value={`€${totalRevenue.toFixed(0)}`} icon={TrendingUp} trend="8% vs last period" trendUp />
        <StatCard label="Total Commission Paid" value={`€${totalSpend.toFixed(2)}`} icon={DollarSign} trend="12% vs last period" trendUp />
        <StatCard label="Overall ROI" value={`${roi}x`} sublabel="revenue per €1 commission" icon={Percent} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueOverTime[period]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `€${v}`} />
              <Tooltip formatter={(v) => [`€${v}`, 'Revenue']} />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Commission Spend by Campaign</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={campaignSpend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `€${v}`} />
              <Tooltip formatter={(v) => [`€${v}`]} />
              <Bar dataKey="budget" name="Budget" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" name="Spent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Top Performing Products</h3>
          <div className="space-y-2">
            {[...commissionByProduct].
            sort((a, b) => b.units - a.units).
            map((product, i) =>
            <div key={product.name} className="flex items-center gap-3 bg-[#F4F2FB] rounded-xl px-4 py-3">
                  <span className="text-sm font-bold text-[#9490AA] w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0E0D1E] truncate">{product.name}</p>
                    <p className="text-xs text-[#9490AA]">{product.units} units sold</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0E0D1E]">€{product.revenue.toLocaleString()}</p>
                </div>
            )}
          </div>
        </div>

        {/* Staff Performance Comparison */}
        <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Staff Performance Comparison</h3>
          <div className="space-y-3">
            {activeStaff.map((s, i) =>
            <Link to={`/staff/${s.id}`} key={s.id} className="block">
                <div className="flex items-center gap-3 group">
                  <span className="text-sm font-bold text-[#9490AA] w-5">{i + 1}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center text-xs font-semibold text-[#796EB2] flex-shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[#0E0D1E] truncate group-hover:text-[#796EB2] transition-colors">{s.name}</p>
                      <p className="text-sm font-semibold text-[#0E0D1E] ml-2 flex-shrink-0">€{s.total_commissions.toFixed(2)}</p>
                    </div>
                    <div className="h-2 bg-[#F4F2FB] rounded-full overflow-hidden">
                      <div
                      className="h-full bg-[#796EB2] rounded-full transition-all"
                      style={{ width: `${s.total_commissions / maxCommission * 100}%` }} />
                    
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>);

}