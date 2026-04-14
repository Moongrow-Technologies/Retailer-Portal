import React, { useState } from 'react';
import StatCard from '@/components/shared/StatCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, DollarSign, Target, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { STORE, STAFF, CAMPAIGNS, PRODUCTS } from '@/lib/sampleData';

const salesByProduct = [
  { name: 'OG Kush', units: 156, revenue: 1950 },
  { name: 'Blue Dream', units: 200, revenue: 2200 },
  { name: 'Amnesia Haze', units: 74, revenue: 962 },
  { name: 'White Widow', units: 114, revenue: 1197 },
  { name: 'Gorilla Glue', units: 15, revenue: 210 },
];

const timeOfDay = [
  { time: '9am', sales: 12 }, { time: '10am', sales: 18 }, { time: '11am', sales: 24 },
  { time: '12pm', sales: 31 }, { time: '1pm', sales: 28 }, { time: '2pm', sales: 35 },
  { time: '3pm', sales: 42 }, { time: '4pm', sales: 38 }, { time: '5pm', sales: 29 },
  { time: '6pm', sales: 21 }, { time: '7pm', sales: 15 },
];

const spendOverTime = [
  { date: 'Mar 14', spend: 0 }, { date: 'Mar 21', spend: 85 }, { date: 'Mar 28', spend: 210 },
  { date: 'Apr 4', spend: 520 }, { date: 'Apr 7', spend: 680 }, { date: 'Apr 11', spend: 890 },
  { date: 'Apr 14', spend: 1042 },
];

const campaignROI = CAMPAIGNS.map(c => ({
  name: c.name.replace(/Campaign|Push|Blitz|Launch|Weekend|Promo/g, '').trim(),
  spent: c.spent,
  budget: c.budget,
  roi: c.status === 'completed' ? 2.4 : c.spent > 0 ? (c.units_sold * 12) / c.spent : 0,
}));

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [store, setStore] = useState('all');

  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const totalUnits = CAMPAIGNS.reduce((s, c) => s + c.units_sold, 0);
  const estRevenue = totalUnits * 12.0;
  const roi = totalSpend > 0 ? (estRevenue / totalSpend).toFixed(1) : '—';

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Analytics</h1>
          <p className="text-sm text-[#7A7893] mt-1">Performance insights across all campaigns.</p>
        </div>
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E]"><Download className="w-4 h-4" /> Export All</Button>
      </div>

      {/* Persistent filters */}
      <div className="flex gap-3 mb-6">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
        <Select value={store} onValueChange={setStore}>
          <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {STORE.locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Commission Spend" value={`€${totalSpend.toFixed(2)}`} icon={DollarSign} trend="18% increase" trendUp />
        <StatCard label="Est. Revenue Uplift" value={`€${estRevenue.toFixed(0)}`} icon={TrendingUp} trend="From campaign products" trendUp />
        <StatCard label="ROI Multiplier" value={`${roi}×`} icon={Target} />
        <StatCard label="Total Units Sold" value={totalUnits} icon={Clock} trend="559 units" trendUp />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesByProduct}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="units" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Best Performing Time of Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={timeOfDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="sales" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Staff performance */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Top Earners by Commission</h3>
          <div className="space-y-3">
            {[...STAFF].filter(s => s.status === 'active').sort((a, b) => b.total_commissions - a.total_commissions).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-5 text-sm font-bold text-[#9490AA]">{i + 1}</span>
                <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center text-xs font-semibold text-[#796EB2]">{s.name[0]}</div>
                <p className="flex-1 text-sm font-medium text-[#0E0D1E]">{s.name}</p>
                <p className="text-sm font-semibold text-[#0E0D1E]">€{s.total_commissions.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Top Earners by Units</h3>
          <div className="space-y-3">
            {[...STAFF].filter(s => s.status === 'active').sort((a, b) => b.total_units_sold - a.total_units_sold).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-5 text-sm font-bold text-[#9490AA]">{i + 1}</span>
                <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center text-xs font-semibold text-[#796EB2]">{s.name[0]}</div>
                <p className="flex-1 text-sm font-medium text-[#0E0D1E]">{s.name}</p>
                <p className="text-sm font-semibold text-[#0E0D1E]">{s.total_units_sold} units</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wallet spend over time */}
      <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5 mb-6">
        <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Wallet Spend Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={spendOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Line type="monotone" dataKey="spend" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign ROI */}
      <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] shadow-sm p-5">
        <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Campaign Spend vs Budget</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={campaignROI}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="budget" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}