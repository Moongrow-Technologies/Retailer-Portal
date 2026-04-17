import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserX } from 'lucide-react';
import { STAFF } from '@/lib/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

const earningsOverTime = [
  { month: 'Jan', earnings: 45 }, { month: 'Feb', earnings: 78 },
  { month: 'Mar', earnings: 112 }, { month: 'Apr', earnings: 107 },
];

const commissionByProduct = [
  { product: 'OG Kush', commission: 120 },
  { product: 'Blue Dream', commission: 85 },
  { product: 'Amnesia Haze', commission: 72 },
  { product: 'White Widow', commission: 45 },
  { product: 'Gorilla Glue', commission: 20 },
];

const commissionHistory = [
  { label: 'OG Kush Sales', sub: '60 units sold', amount: 120.00, date: 'Apr 1–17, 2026', initials: 'OK', color: 'bg-amber-400' },
  { label: 'Amnesia Haze Sales', sub: '36 units sold', amount: 90.00, date: 'Apr 1–17, 2026', initials: 'AH', color: 'bg-emerald-600' },
  { label: 'White Widow Sales', sub: '40 units sold', amount: 100.00, date: 'Apr 5–20, 2026', initials: 'WW', color: 'bg-blue-500' },
  { label: 'Blue Dream Sales', sub: '60 units sold', amount: 36.00, date: 'Feb 1 – Mar 1, 2026', initials: 'BD', color: 'bg-violet-500' },
];

const bonusHistoryByStaff = {
  s1: [
    { label: 'March Top Seller — 1st Place', sub: 'Mar 1–31, 2026', amount: 100.00, initials: '🥇', color: 'bg-amber-400' },
    { label: 'Week 15 Sprint — 2nd Place', sub: 'Apr 5–7, 2026', amount: 50.00, initials: '🥈', color: 'bg-slate-400' },
    { label: 'OG Kush Threshold', sub: 'Mar 15–30, 2026', amount: 50.00, initials: '🎯', color: 'bg-emerald-600' },
  ],
  s2: [
    { label: 'Week 14 Ranked — 1st Place', sub: 'Apr 7–14, 2026', amount: 100.00, initials: '🥇', color: 'bg-amber-400' },
  ],
  s3: [
    { label: 'March Top Seller — 2nd Place', sub: 'Mar 1–31, 2026', amount: 50.00, initials: '🥈', color: 'bg-slate-400' },
    { label: 'Amnesia Haze Sprint — Winner', sub: 'Apr 1–14, 2026', amount: 50.00, initials: '🎯', color: 'bg-emerald-600' },
  ],
};

export default function StaffDetail() {
  const staffId = window.location.pathname.split('/').pop();
  const navigate = useNavigate();
  const staff = STAFF.find(s => s.id === staffId) || STAFF[0];

  useEffect(() => { window.scrollTo(0, 0); }, [staffId]);

  const revenue = (staff.total_units_sold * 12.5).toFixed(2);
  const roi = staff.total_commissions > 0
    ? (parseFloat(revenue) / staff.total_commissions).toFixed(1) + 'x'
    : '—';

  const bonusHistory = bonusHistoryByStaff[staff.id] || [];

  const stats = [
    { label: 'Units Sold', value: staff.total_units_sold, sub: 'all campaigns' },
    { label: 'Revenue Generated', value: `€${revenue}`, sub: 'from commission campaigns' },
    { label: 'Total Commission Earned', value: `€${staff.total_commissions.toFixed(2)}`, sub: 'lifetime earnings' },
    { label: 'Commission ROI', value: roi, sub: 'revenue per €1 commission' },
  ];

  return (
    <div>
      <button onClick={() => navigate('/staff')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Staff
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            {staff.avatar_url ? (
              <img src={staff.avatar_url} alt={staff.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">{staff.name.charAt(0)}</div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#0c0b0c]">{staff.name}</h1>
              <StatusBadge status={staff.status} />
            </div>
            <p className="text-sm text-[#5b616e]">{staff.role} · {staff.store} · {staff.email}</p>
          </div>
        </div>
        {staff.status === 'active' && (
          <Button variant="outline" className="gap-1.5 text-destructive hover:text-destructive">
            <UserX className="w-4 h-4" /> Deactivate
          </Button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5">
            <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-2">{s.label}</p>
            <p className="text-2xl font-bold tracking-tight text-[#0E0D1E] mb-1">{s.value}</p>
            <div className="h-px bg-[#F0EFF5] my-2" />
            <p className="text-xs text-[#9490AA]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5">
          <h3 className="text-sm font-semibold text-[#0E0D1E] mb-4">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={earningsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9490AA" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9490AA" />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#27272b" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-5">
          <h3 className="text-sm font-semibold text-[#0E0D1E] mb-4">Commission by Product</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={commissionByProduct} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9490AA" />
              <YAxis type="category" dataKey="product" tick={{ fontSize: 11 }} stroke="#9490AA" width={80} />
              <Tooltip />
              <Bar dataKey="commission" fill="#27272b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commission History */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 mb-6">
        <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Commission History</h3>
        <div>
          {commissionHistory.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 py-4">
                <span className="text-sm text-[#9490AA] w-4 text-right flex-shrink-0">{i + 1}</span>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold", item.color)}>
                  {item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0E0D1E]">{item.label}</p>
                  <p className="text-xs text-[#9490AA] mt-0.5">{item.sub} · {item.date}</p>
                </div>
                <span className="text-sm font-bold text-emerald-600 flex-shrink-0">
                  +€{item.amount.toFixed(2)}
                </span>
              </div>
              {i < commissionHistory.length - 1 && <div className="h-px bg-[#F0EFF5]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Bonus History */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
        <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Bonus History</h3>
        {bonusHistory.length > 0 ? (
          <div>
            {bonusHistory.map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 py-4">
                  <span className="text-sm text-[#9490AA] w-4 text-right flex-shrink-0">{i + 1}</span>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg")}>
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0E0D1E]">{item.label}</p>
                    <p className="text-xs text-[#9490AA] mt-0.5">{item.sub}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 flex-shrink-0">
                    +€{item.amount.toFixed(2)}
                  </span>
                </div>
                {i < bonusHistory.length - 1 && <div className="h-px bg-[#F0EFF5]" />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#9490AA] py-4 text-center">No bonus wins yet.</p>
        )}
      </div>
    </div>
  );
}