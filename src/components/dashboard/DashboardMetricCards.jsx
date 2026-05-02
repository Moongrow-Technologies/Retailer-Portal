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
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${tab === 'campaigns' ? 'border-[#C5C3D0] bg-[#F0EFF5] text-[#0c0b0c]' : 'border-[#E2E0ED] bg-[#FAFAF9] text-[#0c0b0c]'}`}>
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

// This week (Apr 27–May 2): 11 OG sales today + growing all week ≈ ~44 OG (×€2) + ~38 Amnesia (×€2.50) = €88+€95 = €183
// This month (Apr 1–May 2): OG 190×€2 = €380, Amnesia 119×€2.50 = €297.50 → total €677.50
const commissionData = {
  'This week': { value: '€183', trend: '17% vs last period', breakdown: [{ name: 'Amnesia Haze Launch', amount: '€95', pct: 52 }, { name: 'OG Kush Spring Push', amount: '€88', pct: 48 }] },
  'This month': { value: '€678', trend: '13% vs last period', breakdown: [{ name: 'OG Kush Spring Push', amount: '€380', pct: 56 }, { name: 'Amnesia Haze Launch', amount: '€298', pct: 44 }] }
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
// This week (Apr 27 Mon – May 2 Sat): growing strongly, peaking mid-week + Saturday
// Mon 26, Tue 32, Wed 48, Thu 37, Fri 44, Sat 52, Sun partial 38 = total ~277 this week
const unitsWeekData = [
{ day: 'M', units: 26 },
{ day: 'T', units: 32 },
{ day: 'W', units: 48 },
{ day: 'T', units: 37 },
{ day: 'F', units: 44 },
{ day: 'S', units: 52 },
{ day: 'S', units: 38 }];

// April full month (1–30): building from ~14/day to ~22/day, with strong weekends
const unitsMonthData = [
12, 18, 14, 20, 26, 16, 22, 19, 28, 17, 24, 30, 18, 22, 34, 20, 25, 16, 28, 22, 38, 24, 18, 30, 26, 32, 20, 28, 24, 36].
map((units, i) => ({ day: `${i + 1}`, units }));

const unitsSoldData = {
  'This week': { value: '277', trend: '19% vs last period', chart: unitsWeekData, best: { day: 'S', value: 52 }, today: { day: 'S', value: 52 } },
  'This month': { value: '624', trend: '11% vs last period', chart: unitsMonthData, best: { day: '22', value: 38 }, today: { day: '30', value: 36 } }
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
// Week (Apr 27–May 2): 277 units × avg €12.17 ≈ €3,370
// Month (Apr 1–May 2): 624 units × avg €12.10 ≈ €7,550 (includes White Widow + other product mix)
const revenueWeekData = [
{ day: 'M', rev: 312 }, { day: 'T', rev: 388 }, { day: 'W', rev: 582 },
{ day: 'T', rev: 448 }, { day: 'F', rev: 534 }, { day: 'S', rev: 632 }, { day: 'S', rev: 474 }];

const revenueMonthData = [
148, 218, 172, 244, 316, 196, 268, 232, 340, 208, 292, 364, 220, 268, 414, 244, 304, 196, 340, 268, 462, 292, 220, 364, 316, 388, 244, 340, 292, 438].
map((rev, i) => ({ day: `${i + 1}`, rev }));

const revenueData = {
  'This week': { value: '€3,370', trend: '18% vs last period', chart: revenueWeekData },
  'This month': { value: '€7,550', trend: '14% vs last period', chart: revenueMonthData }
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

  // ROI = revenue / commission: week €3,370/€183 = 18.4×, month €7,550/€678 = 11.1×
  const roiData = {
    'This week': {
      roi: '18.4',
      trend: '2.1× vs last period',
      description: 'Every €1 in commission generated',
      revenue: '€18.40 in revenue',
      breakdown: [
      { label: 'Commission paid', value: '€183' },
      { label: 'Revenue generated', value: '€3,370' },
      { label: 'Units sold via campaigns', value: '277' }]

    },
    'This month': {
      roi: '11.1',
      trend: '0.9× vs last period',
      description: 'Every €1 in commission generated',
      revenue: '€11.10 in revenue',
      breakdown: [
      { label: 'Commission paid', value: '€678' },
      { label: 'Revenue generated', value: '€7,550' },
      { label: 'Units sold via campaigns', value: '624' }]

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