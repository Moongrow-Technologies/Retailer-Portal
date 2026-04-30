import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function LiveRipple() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .ripple-pulse {
          animation: ripple 1.5s ease-out infinite;
        }
      `}</style>
      <div className="absolute w-full h-full rounded-lg bg-[#ececee] flex items-center justify-center">
        <div className="absolute w-2 h-2 rounded-full bg-[#796eb2]"></div>
        <div className="absolute w-2 h-2 rounded-full bg-[#796eb2] ripple-pulse"></div>
      </div>
    </div>);

}

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
    </span>);

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
function ActiveCampaignsCard({ campaigns, bonuses, cardRef }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('campaigns');
  const active = campaigns.filter((c) => c.status === 'active');
  const activeBonuses = bonuses ? bonuses.filter((b) => b.status === 'active') : [];

  const count = tab === 'campaigns' ? active.length : activeBonuses.length;

  return (
    <div ref={cardRef} className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
         <span className="text-[13px] text-[#5b616e] font-medium">Active now</span>
         <LiveRipple />
       </div>

      

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('campaigns')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${tab === 'campaigns' ? 'border-[#D1D0D8] bg-[#F7F7F7] text-[#5b616e]' : 'border-[#E2E0ED] bg-[#FAFAF9] text-[#0c0b0c]'}`}>
          <span className="w-2 h-2 rounded-full bg-[#796eb2] flex-shrink-0" />
          {active.length} Campaigns
        </button>
        <button
          onClick={() => setTab('bonuses')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${tab === 'bonuses' ? 'border-[#F0997B] bg-[#FEF5F1] text-[#E07850]' : 'border-[#E2E0ED] bg-[#FAFAF9] text-[#0c0b0c]'}`}>
          <span className="w-2 h-2 rounded-full bg-[#F0997B] flex-shrink-0" />
          {activeBonuses.length} Bonuses
        </button>
      </div>

      {/* Fixed-height content area so the card never grows */}
      <div className="border-t border-[#F4F3FA] pt-3" style={{ minHeight: 140 }}>
        {tab === 'campaigns' ?
        <div className="space-y-4">
            {active.slice(0, 2).map((c, index) => {
            const dl = daysLeft(c.end_date);
            const warn = dl !== null && dl <= 5;
            const unitsPct = c.target_units > 0 ? Math.round(c.units_sold / c.target_units * 100) : 0;
            return (
              <React.Fragment key={c.id}>
                {index > 0 && <div className="h-px bg-[#F0EFF5]" />}
                <div onClick={() => navigate(`/campaigns/${c.id}`)} className="cursor-pointer hover:opacity-80 transition-opacity">
                   <div className="flex items-center justify-between mb-1.5">
                     <span className="text-[13px] font-bold text-[#0c0b0c] truncate max-w-[60%]">{c.name}</span>
                     <span className="text-[12px] font-semibold text-[#5b616e]">
                       {dl !== null ? `${dl} days left` : '—'}
                     </span>
                   </div>
                   <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-1.5">
                     <div className="rounded-full h-full transition-all" style={{ width: `${unitsPct}%`, background: '#796eb2' }} />
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-[11px] text-[#5b616e]">{c.units_sold} / {c.target_units} units</span>
                     <span className="text-[11px] text-[#5b616e]">{unitsPct}%</span>
                   </div>
                 </div>
              </React.Fragment>);

          })}
          </div> :

        <div className="space-y-4">
            {activeBonuses.slice(0, 2).map((b, index) => {
            const dl = daysLeft(b.end_date);
            const warn = dl !== null && dl <= 5;
            const prizePct = b.prize_pool > 0 ? Math.min(100, Math.round((b.participants || 0) / 10 * 100)) : 0;
            return (
              <React.Fragment key={b.id}>
                {index > 0 && <div className="h-px bg-[#F0EFF5]" />}
                <div onClick={() => navigate(`/bonuses/${b.id}`)} className="cursor-pointer hover:opacity-80 transition-opacity">
                   <div className="flex items-center justify-between mb-1.5">
                     <span className="text-[13px] font-bold text-[#0c0b0c] truncate max-w-[60%]">{b.name}</span>
                     <span className="text-[12px] font-semibold text-[#5b616e]">
                       {dl !== null ? `${dl} days left` : '—'}
                     </span>
                   </div>
                   <div className="w-full h-1.5 bg-[#FDEADE] rounded-full overflow-hidden mb-1.5">
                     <div className="rounded-full h-full transition-all" style={{ width: `${prizePct}%`, background: '#F0997B' }} />
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-[11px] text-[#5b616e]">{b.participants || 0} participants</span>
                     <span className="text-[11px] text-[#5b616e]">€{b.prize_pool.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} pool</span>
                   </div>
                 </div>
              </React.Fragment>);

          })}
          </div>
        }
      </div>
    </div>);

}

// ─── CARD 2 — Commission Paid ─────────────────────────────────────────────────
// This week: 14 OG units × €2 + 8 Amnesia × €2.50 = €28 + €20 = €48
// This month: 156 OG × €2 + 70 Amnesia × €2.50 = €312 + €175 = €487 (active campaigns only)
// Import CAMPAIGNS for commission card navigation
import { Link } from 'react-router-dom';
import { CAMPAIGNS } from '@/lib/sampleData';

const commissionData = {
  'This week': { value: '€48', trend: '11% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€28', pct: 58 }, { name: 'Amnesia Haze Launch', amount: '€20', pct: 42 }] },
  'This month': { value: '€487', trend: '9% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€312', pct: 64 }, { name: 'Amnesia Haze Launch', amount: '€175', pct: 36 }] }
};

function CommissionCard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('This week');
  const d = commissionData[period];

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Commission paid</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <p className="text-[#0c0b0c] text-4xl font-medium leading-none">{d.value}</p>
        <TrendBadge value={d.trend} />
      </div>

      <div className="border-t border-[#F4F3FA] pt-3 space-y-3">
         {d.breakdown.map((b) => {
          const campaign = CAMPAIGNS.find((c) => c.name === b.name);
          return (
            <div key={b.name} onClick={() => campaign && navigate(`/campaigns/${campaign.id}`)} className={campaign ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}>
               <div className="flex items-center justify-between mb-1.5">
                 <span className="text-[13px] font-semibold text-[#0c0b0c] truncate max-w-[65%]">{b.name}</span>
                 <span className="text-[13px] font-semibold text-[#0c0b0c]">{b.amount}</span>
               </div>
               <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden">
                 <div className="rounded-full h-full" style={{ width: `${b.pct}%`, background: '#796eb2' }} />
               </div>
             </div>);

        })}
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
8, 14, 18, 12, 22, 28, 16, 20, 24, 18, 30, 22, 16, 26, 34, 20, 18, 24, 28, 16, 22, 18, 26, 20, 14, 24, 18, 22, 16, 20].
map((units, i) => ({ day: `${i + 1}`, units }));

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

// Map chart day labels to DayAnalytics route keys
const weekDayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function UnitsSoldCard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('This week');
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const d = unitsSoldData[period];
  const maxVal = Math.max(...d.chart.map((v) => v.units));

  const hoveredEntry = hoveredIdx !== null ? d.chart[hoveredIdx] : null;
  const displayValue = hoveredEntry ? String(hoveredEntry.units) : d.value;

  const handlePeriodChange = (val) => {
    setPeriod(val);
    setHoveredIdx(null);
  };

  const handleBarClick = (data, index) => {
    if (period === 'This week') {
      navigate(`/analytics/${weekDayKeys[index]}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Units sold</span>
        <PeriodPill value={period} onChange={handlePeriodChange} />
      </div>

      <div style={{ minHeight: 44 }} className="mb-4">
        <p className="text-[#0c0b0c] text-3xl font-medium leading-none">
          {displayValue}
          {hoveredEntry && <span className="text-[15px] text-[#5b616e] font-normal ml-2">{hoveredEntry.day}</span>}
        </p>
        {!hoveredEntry && <TrendBadge value={d.trend} />}
        {hoveredEntry && period === 'This week' &&
        <span className="text-[11px] text-[#796EB2]">Click to view day →</span>
        }
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={d.chart}
            barCategoryGap="30%"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={(e) => {
              if (e && e.activeTooltipIndex !== undefined) {
                handleBarClick(e.activePayload?.[0]?.payload, e.activeTooltipIndex);
              }
            }}>
            
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#5b616e' }} />

            <Tooltip content={() => null} cursor={false} />

            <Bar
              dataKey="units"
              style={{ cursor: period === 'This week' ? 'pointer' : 'default' }}
              onMouseEnter={(_, index) => setHoveredIdx(index)}
              shape={(props) => {
                const isHovered = hoveredIdx === props.index;
                const isBest = props.units === maxVal;
                let fill;
                if (isHovered) fill = '#796eb2';else
                if (hoveredIdx !== null) fill = '#E2E0ED';else
                if (isBest) fill = '#5b616e';else
                fill = '#E2E0ED';
                return <CustomBar {...props} fill={fill} />;
              }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-sm bg-[#5b616e] inline-block" />
        <span className="text-[11px] text-[#5b616e]">Best — {d.best.day} ({d.best.value})</span>
      </div>
      <Link to="/analytics" className="text-xs text-[#796EB2] hover:underline block font-semibold mt-8" onClick={() => window.scrollTo(0, 0)}>
        View Analytics →
      </Link>
    </div>);

}

// ─── CARD 4 — Revenue Generated ──────────────────────────────────────────────
// Week revenue: 144 units × avg €11.25 product price ≈ €1,620
// Month revenue: 521 units × avg €11.73 ≈ €6,110
const revenueWeekData = [
{ day: 'M', rev: 180 }, { day: 'T', rev: 248 }, { day: 'W', rev: 382 },
{ day: 'T', rev: 270 }, { day: 'F', rev: 202 }, { day: 'S', rev: 112 }, { day: 'S', rev: 226 }];

const revenueMonthData = [
90, 158, 202, 135, 248, 315, 180, 225, 270, 202, 338, 248, 180, 292, 382, 225, 202, 270, 315, 180, 248, 202, 292, 225, 157, 270, 202, 248, 180, 225].
map((rev, i) => ({ day: `${i + 1}`, rev }));

const revenueData = {
  'This week': { value: '€1,620', trend: '9% vs last period', chart: revenueWeekData },
  'This month': { value: '€6,110', trend: '11% vs last period', chart: revenueMonthData }
};

function RevenueCard({ cardRef }) {
  const [period, setPeriod] = useState('This week');
  const d = revenueData[period];

  return (
    <div ref={cardRef} className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Revenue generated</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <p className="text-[#0c0b0c] text-3xl font-medium leading-none">{d.value}</p>
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
      <Link to="/analytics" className="text-xs text-[#796EB2] hover:underline block font-semibold mt-8" onClick={() => window.scrollTo(0, 0)}>
        View Analytics →
      </Link>
    </div>);

}

// ─── CARD 5 — Commission ROI ────────────────────────────────────────────────
function CommissionROICard() {
  const [period, setPeriod] = useState('This week');

  const roiData = {
    'This week': {
      roi: '6.4',
      trend: '0.4× vs last period',
      description: 'Every €1 in commission generated',
      revenue: '€6.40 in revenue',
      breakdown: [
      { label: 'Commission paid', value: '€48' },
      { label: 'Revenue generated', value: '€1,620' },
      { label: 'Units sold via campaigns', value: '156' }]

    },
    'This month': {
      roi: '12.5',
      trend: '1.2× vs last period',
      description: 'Every €1 in commission generated',
      revenue: '€12.50 in revenue',
      breakdown: [
      { label: 'Commission paid', value: '€487' },
      { label: 'Revenue generated', value: '€6,110' },
      { label: 'Units sold via campaigns', value: '521' }]

    }
  };

  const d = roiData[period];

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5 flex flex-col gap-1.5">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#5b616e] font-medium">Commission ROI</span>
        <PeriodPill value={period} onChange={setPeriod} />
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-[#0c0b0c] text-3xl font-medium leading-none">{d.roi}</p>
          <span className="text-[18px] text-[#5b616e]">×</span>
        </div>
        <TrendBadge value={d.trend} />
      </div>

      <div className="border-t border-[#F4F3FA] pt-3 space-y-2">
        <p className="text-[13px] text-[#5b616e]">{d.description}</p>
        <p className="text-[13px] font-semibold text-[#0c0b0c]">{d.revenue}</p>
        
        <div className="border-t border-[#F4F3FA] mt-3 pt-3 space-y-2.5">
          {d.breakdown.map((item) =>
          <div key={item.label} className="flex items-center justify-between">
              <span className="text-[12px] text-[#5b616e]">{item.label}</span>
              <span className="text-[12px] font-semibold text-[#0c0b0c]">{item.value}</span>
            </div>
          )}
        </div>
      </div>
    </div>);

}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
export default function DashboardMetricCards({ campaigns, bonuses, activeCampaignsCardRef, revenueCardRef }) {
  return (
    <div className="grid grid-cols-2 gap-[18px]" style={{ gridTemplateRows: 'auto auto' }}>
      <ActiveCampaignsCard campaigns={campaigns} bonuses={bonuses} cardRef={activeCampaignsCardRef} />
      <UnitsSoldCard />
      <RevenueCard cardRef={revenueCardRef} />
      <CommissionROICard />
    </div>);

}