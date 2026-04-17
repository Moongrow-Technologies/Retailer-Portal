import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar as RechartsBar } from
'recharts';
import { STAFF, CAMPAIGNS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

// This Month chart: cumulative revenue building up to €6,110 (all campaigns combined)
// This Week chart: ~€1,240 this week (roughly 124 units × avg €10/unit product price)
const revenueOverTime = {
  'This Month': [
  { label: 'Mar 14', value: 980  },
  { label: 'Mar 21', value: 1870 },
  { label: 'Mar 28', value: 2940 },
  { label: 'Apr 4',  value: 3810 },
  { label: 'Apr 7',  value: 4620 },
  { label: 'Apr 11', value: 5380 },
  { label: 'Apr 17', value: 6110 }],

  'This Week': [
  { label: 'Mon', value: 140  },
  { label: 'Tue', value: 310  },
  { label: 'Wed', value: 580  },
  { label: 'Thu', value: 760  },
  { label: 'Fri', value: 930  },
  { label: 'Sat', value: 1080 },
  { label: 'Sun', value: 1240 }]

};

// Revenue = units × product price: OG 156×12.50=1950, Blue 200×11=2200, White 80×10.50=840, Amnesia 70×13=910, Gorilla 15×14=210
const topProducts = [
{ name: 'Blue Dream',   units: 200, revenue: 2200, img: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80' },
{ name: 'OG Kush',      units: 156, revenue: 1950, img: 'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80' },
{ name: 'Amnesia Haze', units: 70,  revenue: 910,  img: 'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80' },
{ name: 'White Widow',  units: 80,  revenue: 840,  img: 'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80' }];


// Weekly totals across all campaigns, should sum close to 521 units for the month
const topSellingDays = [
{ label: 'Wed', day: 'W', units: 84, rank: 1 },
{ label: 'Sat', day: 'S', units: 72, rank: 2 },
{ label: 'Fri', day: 'F', units: 68, rank: 3 },
{ label: 'M', units: 58 },
{ label: 'T', units: 52 },
{ label: 'T', units: 61 },
{ label: 'S', units: 64 }];


const activeStaff = [...STAFF].
filter((s) => s.status === 'active').
sort((a, b) => b.total_commissions - a.total_commissions);

const staffAvatarMap = {
  's1': 'bg-amber-500',
  's2': 'bg-blue-600',
  's3': 'bg-emerald-600',
  's4': 'bg-slate-500',
  's5': 'bg-slate-400'
};

export default function Analytics() {
  const [period, setPeriod] = useState('This Month');
  const [campaign, setCampaign] = useState('all');

  const chartData = revenueOverTime[period];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#0c0b0c] text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-[#5b616e] mt-2">Track the performance of your incentives programme</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 bg-[#F4F3F4] rounded-xl p-1">
            {['This Month', 'This Week'].map((p) =>
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap',
                period === p ?
                'bg-white text-[#12121f] shadow-sm' :
                'text-[#5b616e] hover:text-[#12121f]'
              )}>
                {p}
              </button>
            )}
          </div>
          <Select value={campaign} onValueChange={setCampaign}>
            <SelectTrigger className="w-[180px] border-[#E2E0ED]">
              <SelectValue placeholder="All campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All campaigns</SelectItem>
              {CAMPAIGNS.map((c) =>
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0c0b0c]">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      {/* Hero Card with Stats and Chart */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] mb-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 border-b border-[#EBEBF0]">
          {/* Revenue */}
          <div className="px-6 py-6 border-r border-[#EBEBF0]">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">Revenue</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">€6,110</p>
            <p className="text-xs font-medium mt-1.5" style={{color:'#16A34A'}}>↑ 9% vs last period</p>
          </div>

          {/* Units Sold */}
          <div className="px-6 py-6 border-r border-[#EBEBF0]">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">Units Sold</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">521</p>
            <p className="text-xs font-medium mt-1.5" style={{color:'#16A34A'}}>↑ 7% vs last period</p>
          </div>

          {/* Commission Paid */}
          <div className="px-6 py-6 border-r border-[#EBEBF0]">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">Commission Paid</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">€1,032</p>
            <p className="text-xs font-medium mt-1.5" style={{color:'#16A34A'}}>↑ 11% vs last period</p>
          </div>

          {/* ROI */}
          <div className="px-6 py-6">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">ROI</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">5.9x</p>
            <p className="text-xs text-[#5b616e] font-medium mt-1.5">per €1 commission</p>
          </div>
        </div>

        {/* Chart */}
        <div className="px-6 py-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Revenue over time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#796EB2" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#796EB2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#5b616e" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="value" stroke="#796EB2" strokeWidth={2} fill="url(#colorValue)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Three-column bottom section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Top products</h3>
          <div>
            {topProducts.map((product, idx) =>
            <div key={product.name}>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-10 h-10 rounded-lg border border-[#E2E0ED] overflow-hidden flex-shrink-0">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0c0b0c] text-sm">{product.name}</p>
                    <p className="text-xs text-[#5b616e] mt-0.5">{product.units} units</p>
                  </div>
                  <p className="font-medium text-[#0c0b0c] text-sm">€{product.revenue.toLocaleString()}</p>
                </div>
                {idx !== topProducts.length - 1 && <div className="border-b border-[#EBEBF0]" />}
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Days */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Top selling days</h3>
          <div className="flex gap-3 mb-6">
            {topSellingDays.slice(0, 3).map((day) =>
            <div
              key={day.label}
              className={cn(
                'flex-1 rounded-lg p-3 text-center',
                day.rank === 1 ?
                'bg-[#796EB2] text-white' :
                'bg-[#EDE9F8] text-[#796EB2]'
              )}>
              
                <p className="text-xs font-semibold mb-1">#{day.rank}</p>
                <p className="text-xs font-medium">{day.label}</p>
                <p className={cn(
                'text-lg font-bold mt-1',
                day.rank === 1 ? 'text-white' : 'text-[#796EB2]'
              )}>
                  {day.units}
                </p>
                <p className="text-xs font-medium mt-0.5">units</p>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-1">
            {topSellingDays.slice(3).map((day, idx) => {
              const isTopDay = [0, 5, 2].includes(idx + 3);
              return (
                <div
                  key={idx}
                  className="flex-1 h-12 rounded-md flex items-center justify-center"
                  style={{
                    backgroundColor: isTopDay ?
                    idx + 3 === 5 ? '#EDE9F8' : idx + 3 === 2 ? '#EDE9F8' : '#796EB2' :
                    '#E2E0ED'
                  }}>
                  
                  <span className="text-xs font-semibold text-[#0c0b0c]">{day.label}</span>
                </div>);

            })}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Staff performance</h3>
          <div>
            {activeStaff.map((staff, idx) =>
            <div key={staff.id}>
                <div className="flex items-center gap-3 py-4">
                  <span className="text-xs font-medium text-[#5b616e] w-4">{idx + 1}</span>
                  <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0',
                  staffAvatarMap[staff.id] || 'bg-[#796EB2]'
                )}>
                    {staff.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0c0b0c]">{staff.name}</p>
                  </div>
                  <p className={cn(
                  'text-sm font-semibold',
                  idx === 0 ? 'text-emerald-600' : 'text-[#0c0b0c]'
                )}>
                    €{staff.total_commissions.toFixed(2)}
                  </p>
                </div>
                {idx !== activeStaff.length - 1 && <div className="border-b border-[#EBEBF0]" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}