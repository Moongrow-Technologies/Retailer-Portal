import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/shared/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PRODUCTS, CAMPAIGNS, STAFF, STAFF_AVATARS, PRODUCT_IMAGES } from '@/lib/sampleData';
import { differenceInDays, parseISO, format } from 'date-fns';

function daysLeft(endDate) {
  if (!endDate) return null;
  const d = differenceInDays(parseISO(endDate), new Date());
  return d >= 0 ? d : 0;
}

// Fake weekly sales data per product
const WEEKLY_DATA = {
  'OG Kush':      [22, 18, 28, 24, 32, 20, 18, 26],
  'Blue Dream':   [30, 28, 22, 26, 18, 24, 20, 16],
  'Amnesia Haze': [8,  12, 10, 14, 18, 12, 8,  10],
  'White Widow':  [14, 18, 20, 16, 12, 10, 14, 8],
  'Gorilla Glue': [4,  6,  8,  4,  6,  8,  4,  6],
};

// Fake staff-per-product data
const STAFF_PRODUCT_DATA = {
  'OG Kush':      [{ id: 's1', units: 78, commission: 156.00 }, { id: 's3', units: 52, commission: 104.00 }, { id: 's2', units: 26, commission: 52.00 }],
  'Blue Dream':   [{ id: 's4', units: 130, commission: 195.00 }, { id: 's2', units: 70, commission: 105.00 }],
  'Amnesia Haze': [{ id: 's2', units: 36, commission: 90.00 }, { id: 's1', units: 34, commission: 85.00 }],
  'White Widow':  [{ id: 's1', units: 40, commission: 100.00 }, { id: 's4', units: 40, commission: 100.00 }],
  'Gorilla Glue': [{ id: 's3', units: 15, commission: 45.00 }],
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const productId = window.location.pathname.split('/').pop();

  // Support lookup by id or by name (URL-encoded)
  const product =
    PRODUCTS.find((p) => p.id === productId) ||
    PRODUCTS.find((p) => encodeURIComponent(p.name) === productId) ||
    PRODUCTS[0];

  const activeCampaigns = CAMPAIGNS.filter(
    (c) => c.product_name === product.name && c.status === 'active'
  );
  const pastCampaigns = CAMPAIGNS.filter(
    (c) => c.product_name === product.name && c.status !== 'active' && c.status !== 'scheduled'
  );
  const allCampaigns = CAMPAIGNS.filter((c) => c.product_name === product.name);

  // Aggregate stats
  const totalUnits = allCampaigns.reduce((s, c) => s + c.units_sold, 0);
  const totalRevenue = totalUnits * product.price;
  const totalCommission = allCampaigns.reduce((s, c) => s + c.spent, 0);

  // Weekly chart data
  const weeklyRaw = WEEKLY_DATA[product.name] || [0, 0, 0, 0, 0, 0, 0, 0];
  const chartData = weeklyRaw.map((units, i) => ({ week: `W${i + 1}`, units }));

  // Staff leaderboard for this product
  const staffRows = (STAFF_PRODUCT_DATA[product.name] || [])
    .map((row) => ({ ...STAFF.find((s) => s.id === row.id), ...row }))
    .filter(Boolean)
    .sort((a, b) => b.units - a.units);

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#E2E0ED] flex-shrink-0">
          <img
            src={PRODUCT_IMAGES[product.name] || PRODUCT_IMAGES.default}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">{product.name}</h1>
          <p className="text-sm text-[#5b616e] mt-1">{product.category} · SKU: {product.sku} · €{product.price.toFixed(2)}/unit</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] mb-6">
        <div className="grid grid-cols-3 divide-x divide-[#EBEBF0]">
          {[
            { label: 'Total Units Sold', value: totalUnits, sub: 'across all campaigns' },
            { label: 'Revenue Generated', value: `€${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sub: `at €${product.price.toFixed(2)}/unit` },
            { label: 'Commission Paid', value: `€${totalCommission.toFixed(2)}`, sub: 'to staff' },
          ].map((s, i) => (
            <div key={i} className="px-6 py-5">
              <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight mb-1">{s.value}</p>
              <p className="text-xs text-[#9490AA]">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales chart */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] p-5 mb-6">
        <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Units Sold — Last 8 Weeks</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#5b616e' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#5b616e' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 12 }}
              formatter={(val) => [val, 'Units']}
            />
            <Bar dataKey="units" fill="#534AB7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Active Campaigns */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#0c0b0c]">Active Campaigns</h3>
            <Link to="/campaigns/new">
              <Button size="sm" variant="outline" className="gap-1.5 border-[#E2E0ED] text-xs h-7">
                <Plus className="w-3 h-3" /> Create
              </Button>
            </Link>
          </div>

          {activeCampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Package className="w-8 h-8 text-[#9490AA] mb-2" />
              <p className="text-sm text-[#9490AA] mb-3">No active campaigns for this product</p>
              <Link to="/campaigns/new">
                <Button size="sm" className="bg-[#27272b] text-white text-xs gap-1.5">
                  <Plus className="w-3 h-3" /> Create Campaign
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCampaigns.map((c) => {
                const dl = daysLeft(c.end_date);
                const warn = dl !== null && dl <= 5;
                const unitsPct = c.target_units > 0 ? Math.round(c.units_sold / c.target_units * 100) : 0;
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <Link to={`/campaigns/${c.id}`} className="text-[13px] font-semibold text-[#0c0b0c] hover:text-[#534AB7] transition-colors">{c.name}</Link>
                      <span className={`text-[12px] font-semibold ${warn ? 'text-[#F59E0B]' : 'text-[#5b616e]'}`}>
                        {dl !== null ? `${dl} days left` : '—'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EDEAF8] rounded-full overflow-hidden mb-1.5">
                      <div className="rounded-full h-full" style={{ width: `${unitsPct}%`, background: '#534AB7' }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#5b616e]">{c.units_sold} / {c.target_units} units · €{c.commission_rate.toFixed(2)}/unit</span>
                      <span className="text-[11px] text-[#5b616e]">{unitsPct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Staff Leaderboard */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-5">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Staff Leaderboard</h3>
          {staffRows.length === 0 ? (
            <p className="text-sm text-[#9490AA] py-8 text-center">No staff data for this product yet.</p>
          ) : (
            <div className="space-y-3">
              {staffRows.map((staff, i) => (
                <div key={staff.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#F5F3FC] transition-colors">
                  <span className="w-5 text-sm font-bold text-[#9490AA] text-center flex-shrink-0">{i + 1}</span>
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#E2E0ED]">
                    {STAFF_AVATARS[staff.name]
                      ? <img src={STAFF_AVATARS[staff.name]} alt={staff.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#7A7893]">{staff.name?.charAt(0)}</div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0c0b0c]">{staff.name}</p>
                    <p className="text-xs text-[#9490AA]">{staff.store}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0c0b0c]">{staff.units} units</p>
                    <p className="text-xs text-[#9490AA]">€{staff.commission.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Campaign History */}
      {pastCampaigns.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBF0]">
            <h3 className="text-sm font-semibold text-[#0c0b0c]">Campaign History</h3>
          </div>
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_100px] px-6 py-3 bg-[#F7F6FB] border-b border-[#EBEBF0]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Campaign</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Date Range</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Units Sold</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Budget Spent</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Outcome</span>
          </div>
          {pastCampaigns.map((c, idx) => (
            <div key={c.id}>
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_100px] px-6 py-4 items-center hover:bg-[#F5F3FC] transition-colors">
                <Link to={`/campaigns/${c.id}`} className="text-sm font-semibold text-[#0c0b0c] hover:text-[#534AB7] transition-colors">{c.name}</Link>
                <span className="text-sm text-[#5b616e]">
                  {c.start_date ? format(parseISO(c.start_date), 'MMM d') : '—'} – {c.end_date ? format(parseISO(c.end_date), 'MMM d, yyyy') : '—'}
                </span>
                <span className="text-sm text-[#0c0b0c]">{c.units_sold}</span>
                <span className="text-sm text-[#0c0b0c]">€{c.spent.toFixed(2)}</span>
                <StatusBadge status={c.status} />
              </div>
              {idx < pastCampaigns.length - 1 && <div className="h-px bg-[#F0EFF5] mx-6" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}