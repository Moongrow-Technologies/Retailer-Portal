import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { differenceInDays, parseISO } from 'date-fns';

// ─── helpers ────────────────────────────────────────────────────────────────

function daysLeft(endDate) {
  if (!endDate) return null;
  const d = differenceInDays(parseISO(endDate), new Date());
  return d >= 0 ? d : 0;
}

function progressPct(spent, budget) {
  if (!budget) return 0;
  return Math.min(100, Math.round(spent / budget * 100));
}

// ─── sub-components ─────────────────────────────────────────────────────────

function PeriodPill({ value, onChange }) {
  const opts = ['This week', 'This month'];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-[#F4F4F4] text-[#6B7280] text-xs font-medium pl-3 pr-5 py-1.5 rounded-full cursor-pointer focus:outline-none">
        
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[10px]">▾</span>
    </div>);

}

function TrendBadge({ value }) {
  return (
    <p className="text-[12px] font-medium text-[#16A34A] mt-0.5">
      ↑ {value}
    </p>);

}

function CampaignBar({ name, pct, urgency }) {
  const barColor = urgency === 'warn' ? '#F59E0B' : '#5B4FCF';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-semibold text-[#0c0b0c]">{name}</span>
        <span className={`text-[12px] font-medium ${urgency === 'warn' ? 'text-[#F59E0B]' : 'text-[#5b616e]'}`}>
          {urgency === 'warn' ? `${pct} days left` : `${pct} days left`}
        </span>
      </div>
      <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, 100 - pct * 2)}%`, background: barColor }} />
        
      </div>
    </div>);

}

// ─── CARD 1 — Active Campaigns ───────────────────────────────────────────────
function ActiveCampaignsCard({ campaigns }) {
  const active = campaigns.filter((c) => c.status === 'active');
  const displayed = active.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Active campaigns</span>
        <div className="bg-[#ececee] rounded-full w-8 h-8 flex items-center justify-center">
          <Send className="text-[#a1a1a1] lucide lucide-send w-3.5 h-3.5" />
        </div>
      </div>

      <div>
        <p className="text-[#0c0b0c] text-4xl font-medium leading-none">{active.length}</p>
        <p className="text-[12px] font-medium text-[#16A34A] mt-0.5">↑ 2 new this month</p>
      </div>

      <div className="border-t border-[#F4F3FA] pt-3 mt-1 space-y-3">
        {displayed.map((c) => {
          const dl = daysLeft(c.end_date);
          const warn = dl !== null && dl <= 5;
          return (
            <div key={c.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-semibold text-[#0c0b0c] truncate max-w-[60%]">{c.name}</span>
                <span className={`text-[12px] font-medium ${warn ? 'text-[#F59E0B]' : 'text-[#5b616e]'}`}>
                  {dl !== null ? `${dl} days left` : '—'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden">
                <div className="bg-[hsl(var(--background))] rounded-full h-full"

                style={{
                  width: `${progressPct(c.spent, c.budget)}%`,
                  background: warn ? '#F59E0B' : 'linear-gradient(to right, #4B3F8F, #796EB2, #B8B0D8)'
                }} />
                
              </div>
            </div>);

        })}
      </div>
    </div>);

}

// ─── CARD 2 — Commission Paid ─────────────────────────────────────────────────
const commissionData = {
  'This week': { value: '€42.50', trend: '12% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€28.00', pct: 66 }, { name: 'Amnesia Haze Launch', amount: '€14.50', pct: 34 }] },
  'This month': { value: '€184.00', trend: '9% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€112.00', pct: 61 }, { name: 'Amnesia Haze Launch', amount: '€72.00', pct: 39 }] }
};

function CommissionCard() {
  const [period, setPeriod] = useState('This week');
  const d = commissionData[period];

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Commission paid</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <p className="text-[#0c0b0c] text-3xl font-medium leading-none">{d.value}</p>
        <TrendBadge value={d.trend} />
      </div>

      <div className="border-t border-[#F4F3FA] pt-3 space-y-3">
        {d.breakdown.map((b) =>
        <div key={b.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-semibold text-[#0c0b0c] truncate max-w-[65%]">{b.name}</span>
              <span className="text-[13px] font-semibold text-[#0c0b0c]">{b.amount}</span>
            </div>
            <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden">
              <div className="rounded-full h-full" style={{ width: `${b.pct}%`, background: 'linear-gradient(to right, #4B3F8F, #796EB2, #B8B0D8)' }} />
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ─── CARD 3 — Units Sold ─────────────────────────────────────────────────────
const unitsWeekData = [
{ day: 'M', units: 14 },
{ day: 'T', units: 18 },
{ day: 'W', units: 38 },
{ day: 'T', units: 16 },
{ day: 'F', units: 12 },
{ day: 'S', units: 8 },
{ day: 'S', units: 28 }];


const unitsMonthData = Array.from({ length: 30 }, (_, i) => ({ day: `${i + 1}`, units: Math.floor(Math.random() * 30) + 8 }));

const unitsSoldData = {
  'This week': { value: '124', trend: '8% vs last period', chart: unitsWeekData, best: { day: 'W', value: 38 }, today: { day: 'S', value: 28 } },
  'This month': { value: '538', trend: '11% vs last period', chart: unitsMonthData, best: { day: 'W', value: 38 }, today: { day: '30', value: 21 } }
};

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;
  const r = 4;
  return (
    <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} />);

};

function UnitsSoldCard() {
  const [period, setPeriod] = useState('This week');
  const d = unitsSoldData[period];
  const maxVal = Math.max(...d.chart.map((v) => v.units));

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Units sold</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <p className="text-[#0c0b0c] text-4xl font-medium leading-none">{d.value}</p>
        <TrendBadge value={d.trend} />
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={d.chart} barCategoryGap="30%" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#5b616e' }} />
            
            <Tooltip
              cursor={false}
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 12 }}
              formatter={(val) => [val, 'Units']} />
            
            <Bar
              dataKey="units"
              shape={(props) => {
                const isBest = props.units === maxVal;
                const fill = isBest ? '#5b616e' : '#E2E0ED';
                return <CustomBar {...props} fill={fill} />;
              }} />
            
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm bg-[#5b616e] inline-block" />
        <span className="text-[11px] text-[#5b616e]">Best — {d.best.day} ({d.best.value})</span>
      </div>
    </div>);

}

// ─── CARD 4 — Revenue Generated ──────────────────────────────────────────────
const revenueWeekData = [
{ day: 'M', rev: 140 }, { day: 'T', rev: 200 }, { day: 'W', rev: 380 },
{ day: 'T', rev: 460 }, { day: 'F', rev: 600 }, { day: 'S', rev: 900 }, { day: 'S', rev: 1240 }];

const revenueMonthData = Array.from({ length: 30 }, (_, i) => ({ day: `${i + 1}`, rev: 200 + i * 170 + Math.random() * 80 }));

const revenueData = {
  'This week': { value: '€1,240', trend: '8% vs last period', chart: revenueWeekData },
  'This month': { value: '€5,380', trend: '14% vs last period', chart: revenueMonthData }
};

function RevenueCard() {
  const [period, setPeriod] = useState('This week');
  const d = revenueData[period];

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Revenue generated</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <p className="text-[#0c0b0c] text-4xl font-medium leading-none">{d.value}</p>
        <TrendBadge value={d.trend} />
      </div>

      <div className="h-28 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={d.chart} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16A34A" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#16A34A" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" hide />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 12 }}
              formatter={(val) => [`€${Math.round(val).toLocaleString()}`, 'Revenue']} />
            
            <Area
              type="monotone"
              dataKey="rev"
              stroke="#16A34A"
              strokeWidth={2}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#16A34A', strokeWidth: 0 }} />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>);

}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
export default function DashboardMetricCards({ campaigns }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ActiveCampaignsCard campaigns={campaigns} />
      <CommissionCard />
      <UnitsSoldCard />
      <RevenueCard />
    </div>);

}