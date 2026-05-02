import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar as RechartsBar } from
'recharts';
import { STAFF, CAMPAIGNS, STAFF_AVATARS, PRODUCTS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

// This Month chart: cumulative revenue building up through May 2
// Week (Apr 27 – May 2): daily revenue across 2 active campaigns
const revenueOverTime = {
  'This Month': [
  { label: 'Apr 1',  value: 1240  },
  { label: 'Apr 7',  value: 2680  },
  { label: 'Apr 14', value: 4510  },
  { label: 'Apr 21', value: 6380  },
  { label: 'Apr 25', value: 7820  },
  { label: 'Apr 28', value: 9140  },
  { label: 'May 2',  value: 10650 }],

  'This Week': [
  { label: 'Mon', value: 960  },
  { label: 'Tue', value: 2030 },
  { label: 'Wed', value: 3440 },
  { label: 'Thu', value: 4700 },
  { label: 'Fri', value: 5860 },
  { label: 'Sat', value: 7110 },
  { label: 'Sun', value: 8290 }]

};

// Revenue = all-time units × product price: OG 190×12.50=2375, Blue 200×11=2200, Amnesia 119×13=1547, White 100×10.50=1050, Gorilla 15×14=210
const topProducts = [
{ name: 'OG Kush',      units: 190, revenue: 2375, img: 'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80' },
{ name: 'Blue Dream',   units: 200, revenue: 2200, img: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80' },
{ name: 'Amnesia Haze', units: 119, revenue: 1547, img: 'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80' },
{ name: 'White Widow',  units: 100, revenue: 1050, img: 'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80' }];


// Weekly averages by day — Wed and Sat are consistently strongest
const topSellingDays = [
{ label: 'Sat', day: 'S', units: 98, rank: 1 },
{ label: 'Wed', day: 'W', units: 91, rank: 2 },
{ label: 'Fri', day: 'F', units: 82, rank: 3 },
{ label: 'M', units: 68 },
{ label: 'T', units: 63 },
{ label: 'T', units: 71 },
{ label: 'S', units: 77 }];


const activeStaff = [...STAFF].
filter((s) => s.status === 'active').
sort((a, b) => b.total_commissions - a.total_commissions);

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
            <p className="text-[26px] font-medium text-[#0c0b0c]">€10,650</p>
            <span className="inline-flex items-center mt-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">↑ 14% vs last period</span>
          </div>

          {/* Units Sold */}
          <div className="px-6 py-6 border-r border-[#EBEBF0]">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">Units Sold</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">624</p>
            <span className="inline-flex items-center mt-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">↑ 11% vs last period</span>
          </div>

          {/* Commission Paid */}
          <div className="px-6 py-6 border-r border-[#EBEBF0]">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">Commission Paid</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">€1,273</p>
            <span className="inline-flex items-center mt-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">↑ 13% vs last period</span>
          </div>

          {/* ROI */}
          <div className="px-6 py-6">
            <p className="text-xs uppercase font-semibold text-[#5b616e] tracking-wide mb-2">ROI</p>
            <p className="text-[26px] font-medium text-[#0c0b0c]">8.4×</p>
            <span className="inline-flex items-center mt-1.5 bg-[#F4F3FA] text-[#5b616e] text-[11px] font-semibold px-2 py-0.5 rounded-full">per €1 commission</span>
          </div>
        </div>

        {/* Chart */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-3 mb-4">
            <h3 className="text-sm font-semibold text-[#0c0b0c]">Revenue over time</h3>
            <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit">↑ 14% vs last period</span>
          </div>
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
                <Link to={`/products/${encodeURIComponent(product.name)}`} className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-[#F5F3FC] transition-colors">
                  <div className="w-10 h-10 rounded-lg border border-[#E2E0ED] overflow-hidden flex-shrink-0">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0c0b0c] text-sm">{product.name}</p>
                    <p className="text-xs text-[#5b616e] mt-0.5">{product.units} units</p>
                  </div>
                  <p className="font-medium text-[#0c0b0c] text-sm">€{product.revenue.toLocaleString()}</p>
                </Link>
                {idx !== topProducts.length - 1 && <div className="border-b border-[#EBEBF0]" />}
              </div>
            )}
          </div>
        </div>

        {/* Top Selling Days */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Top selling days</h3>
          <div className="space-y-3">
            {(() => {
              const weekData = [
                { id: 'mon', abbr: 'Mon', units: 68 },
                { id: 'tue', abbr: 'Tue', units: 63 },
                { id: 'wed', abbr: 'Wed', units: 91 },
                { id: 'thu', abbr: 'Thu', units: 71 },
                { id: 'fri', abbr: 'Fri', units: 82 },
                { id: 'sat', abbr: 'Sat', units: 98 },
                { id: 'sun', abbr: 'Sun', units: 77 }
              ];

              const sorted = [...weekData].sort((a, b) => b.units - a.units);
              const maxUnits = Math.max(...sorted.map(d => d.units));

              return sorted.map((day, index) => {
                const barWidth = (day.units / maxUnits) * 100;

                return (
                  <Link
                    key={day.id}
                    to={`/analytics/${day.id}`}
                    className="rounded-lg p-3 flex items-center gap-4 transition-colors hover:bg-[#F5F3FC] cursor-pointer bg-white border border-[#EBEBF0]"
                  >
                    <span className="text-sm font-semibold w-12 text-[#0c0b0c]">
                      {day.abbr}
                    </span>
                    <div className="flex-1 h-1.5 bg-[#D1D5DB] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: `${barWidth}%`, backgroundColor: '#796eb2' }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right text-[#0c0b0c]">
                      {day.units}
                    </span>
                  </Link>
                );
              });
            })()}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Staff performance</h3>
          <div>
            {activeStaff.map((staff, idx) =>
            <div key={staff.id}>
                <Link to={`/staff/${staff.id}`} className="flex items-center gap-3 py-4 px-2 rounded-lg hover:bg-[#F5F3FC] transition-colors">
                  <span className="text-xs font-medium text-[#5b616e] w-4">{idx + 1}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#E2E0ED]">
                    {STAFF_AVATARS[staff.name]
                      ? <img src={STAFF_AVATARS[staff.name]} alt={staff.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-[#7A7893]">{staff.name[0]}</div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0c0b0c]">{staff.name}</p>
                  </div>
                  <p className={cn(
                  'text-sm font-semibold',
                  idx === 0 ? 'text-emerald-600' : 'text-[#0c0b0c]'
                  )}>
                    €{staff.total_commissions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </Link>
                {idx !== activeStaff.length - 1 && <div className="border-b border-[#EBEBF0]" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}