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
    <span className="inline-flex items-center gap-0.5 mt-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
      ↑ {value}
    </span>
  );
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
function ActiveCampaignsCard({ campaigns, bonuses }) {
  const [tab, setTab] = useState('campaigns');
  const active = campaigns.filter((c) => c.status === 'active');
  const activeBonuses = bonuses ? bonuses.filter((b) => b.status === 'active') : [];

  const count = tab === 'campaigns' ? active.length : activeBonuses.length;

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Active now</span>
        <div className="bg-[#ececee] rounded-lg w-8 h-8 flex items-center justify-center">
          <Send className="text-[#a1a1a1] w-3.5 h-3.5" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('campaigns')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${tab === 'campaigns' ? 'border-[#534AB7] bg-[#F5F3FC] text-[#534AB7]' : 'border-[#E2E0ED] bg-[#FAFAF9] text-[#0c0b0c]'}`}>
          <span className="w-2 h-2 rounded-full bg-[#534AB7] flex-shrink-0" />
          {active.length} Campaigns
        </button>
        <button
          onClick={() => setTab('bonuses')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${tab === 'bonuses' ? 'border-[#F0997B] bg-[#FEF5F1] text-[#E07850]' : 'border-[#E2E0ED] bg-[#FAFAF9] text-[#0c0b0c]'}`}>
          <span className="w-2 h-2 rounded-full bg-[#F0997B] flex-shrink-0" />
          {activeBonuses.length} Bonuses
        </button>
      </div>

      <div>
        <p className="text-[#534AB7] text-4xl font-bold leading-none">{count}</p>
        <TrendBadge value="1 new this month" />
      </div>

      {/* Fixed-height content area so the card never grows */}
      <div className="border-t border-[#F4F3FA] pt-3" style={{ minHeight: 140 }}>
        {tab === 'campaigns' ? (
          <div className="space-y-4">
            {active.slice(0, 2).map((c) => {
              const dl = daysLeft(c.end_date);
              const warn = dl !== null && dl <= 5;
              const unitsPct = c.target_units > 0 ? Math.round(c.units_sold / c.target_units * 100) : 0;
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-bold text-[#0c0b0c] truncate max-w-[60%]">{c.name}</span>
                    <span className={`text-[12px] font-semibold ${warn ? 'text-[#F59E0B]' : 'text-[#5b616e]'}`}>
                      {dl !== null ? `${dl} days left` : '—'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-1.5">
                    <div className="rounded-full h-full transition-all" style={{ width: `${unitsPct}%`, background: warn ? '#F59E0B' : '#534AB7' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#5b616e]">{c.units_sold} / {c.target_units} units</span>
                    <span className="text-[11px] text-[#5b616e]">{unitsPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {activeBonuses.slice(0, 2).map((b) => {
              const dl = daysLeft(b.end_date);
              const warn = dl !== null && dl <= 5;
              const prizePct = b.prize_pool > 0 ? Math.min(100, Math.round((b.participants || 0) / 10 * 100)) : 0;
              return (
                <div key={b.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-bold text-[#0c0b0c] truncate max-w-[60%]">{b.name}</span>
                    <span className={`text-[12px] font-semibold ${warn ? 'text-[#F59E0B]' : 'text-[#5b616e]'}`}>
                      {dl !== null ? `${dl} days left` : '—'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#FDEADE] rounded-full overflow-hidden mb-1.5">
                    <div className="rounded-full h-full transition-all" style={{ width: `${prizePct}%`, background: warn ? '#F59E0B' : '#F0997B' }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#5b616e]">{b.participants || 0} participants</span>
                    <span className="text-[11px] text-[#5b616e]">€{b.prize_pool} pool</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CARD 2 — Commission Paid ─────────────────────────────────────────────────
// This week: 14 OG units × €2 + 8 Amnesia × €2.50 = €28 + €20 = €48
// This month: 156 OG × €2 + 70 Amnesia × €2.50 = €312 + €175 = €487 (active campaigns only)
const commissionData = {
  'This week': { value: '€48.00', trend: '11% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€28.00', pct: 58 }, { name: 'Amnesia Haze Launch', amount: '€20.00', pct: 42 }] },
  'This month': { value: '€487.00', trend: '9% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€312.00', pct: 64 }, { name: 'Amnesia Haze Launch', amount: '€175.00', pct: 36 }] }
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
              <div className="rounded-full h-full" style={{ width: `${b.pct}%`, background: '#534AB7' }} />
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ─── CARD 3 — Units Sold ─────────────────────────────────────────────────────
// This week: 18+22+38+26+18+12+22 = 156 across OG + Amnesia active campaigns
// This month total across all active campaigns: 521 units
const unitsWeekData = [
{ day: 'M', units: 16 },
{ day: 'T', units: 22 },
{ day: 'W', units: 34 },
{ day: 'T', units: 24 },
{ day: 'F', units: 18 },
{ day: 'S', units: 10 },
{ day: 'S', units: 20 }];

const unitsMonthData = [
  8,14,18,12,22,28,16,20,24,18,30,22,16,26,34,20,18,24,28,16,22,18,26,20,14,24,18,22,16,20
].map((units, i) => ({ day: `${i + 1}`, units }));

const unitsSoldData = {
  'This week': { value: '144', trend: '8% vs last period', chart: unitsWeekData, best: { day: 'W', value: 34 }, today: { day: 'S', value: 20 } },
  'This month': { value: '521', trend: '7% vs last period', chart: unitsMonthData, best: { day: 'W', value: 34 }, today: { day: '17', value: 20 } }
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
// Week revenue: 144 units × avg €11.25 product price ≈ €1,620
// Month revenue: 521 units × avg €11.73 ≈ €6,110
const revenueWeekData = [
{ day: 'M', rev: 180 }, { day: 'T', rev: 248 }, { day: 'W', rev: 382 },
{ day: 'T', rev: 270 }, { day: 'F', rev: 202 }, { day: 'S', rev: 112 }, { day: 'S', rev: 226 }];

const revenueMonthData = [
  90,158,202,135,248,315,180,225,270,202,338,248,180,292,382,225,202,270,315,180,248,202,292,225,157,270,202,248,180,225
].map((rev, i) => ({ day: `${i + 1}`, rev }));

const revenueData = {
  'This week': { value: '€1,620', trend: '9% vs last period', chart: revenueWeekData },
  'This month': { value: '€6,110', trend: '11% vs last period', chart: revenueMonthData }
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
export default function DashboardMetricCards({ campaigns, bonuses }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ActiveCampaignsCard campaigns={campaigns} bonuses={bonuses} />
      <CommissionCard />
      <UnitsSoldCard />
      <RevenueCard />
    </div>);

}