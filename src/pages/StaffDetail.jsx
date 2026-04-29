import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import SuccessToast from '@/components/shared/SuccessToast';
import { ArrowLeft, UserX, AlertTriangle } from 'lucide-react';
import { STAFF, PRODUCTS } from '@/lib/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
  const baseSta = STAFF.find(s => s.id === staffId) || STAFF[0];
  const [status, setStatus] = useState(baseSta.status);
  const staff = { ...baseSta, status };
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [staffId]);

  const revenue = (staff.total_units_sold * 12.5).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const roi = staff.total_commissions > 0
    ? (parseFloat(revenue.replace(/,/g, '')) / staff.total_commissions).toFixed(1) + '×'
    : '—';

  const bonusHistory = bonusHistoryByStaff[staff.id] || [];

  const stats = [
    { label: 'Units Sold', value: staff.total_units_sold, sub: 'all campaigns', trend: '↑ 8%' },
    { label: 'Revenue Generated', value: `€${revenue}`, sub: 'from commission campaigns', trend: '↑ 9%' },
    { label: 'Total Commission Earned', value: `€${staff.total_commissions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, sub: 'lifetime earnings', trend: '↑ 11%' },
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
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E0ED] bg-white text-sm font-medium text-[#0E0D1E] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 group-hover:bg-white transition-colors" />
            Deactivate
          </button>
        )}
      </div>

      {/* Stat Cards — single unified card with column dividers */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] mb-5">
        <div className="grid grid-cols-4" style={{ borderRadius: 'inherit' }}>
          {stats.map((s, i) => (
            <div key={i} className={cn("px-6 py-5", i > 0 && "border-l border-[#EBEBF0]")} style={{ borderLeftWidth: i > 0 ? '0.5px' : undefined }}>
              <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight mb-1">{s.value}</p>
              {s.trend ? (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">{s.trend}</span>
              ) : (
                <p className="text-xs text-[#9490AA]">{s.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-5">
          <h3 className="text-sm font-semibold text-[#0E0D1E] mb-4">Earnings over time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={earningsOverTime}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9490AA' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9490AA' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#16A34A" strokeWidth={2} fill="url(#earningsGrad)" dot={{ r: 3, fill: '#16A34A' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-[#EBEBF0] p-5">
          <h3 className="text-sm font-semibold text-[#0E0D1E] mb-4">Commission by product</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={commissionByProduct} layout="vertical" margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9490AA' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="product" tick={{ fontSize: 11, fill: '#9490AA' }} axisLine={false} tickLine={false} width={85} />
              <Tooltip />
              <Bar
                dataKey="commission"
                fill="#796eb2"
                radius={[0, 4, 4, 0]}
                cursor="pointer"
                onClick={(data) => {
                  const product = PRODUCTS.find(p => p.name === data.product);
                  if (product) navigate(`/products/${product.id}`);
                }}
              />
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

      <SuccessToast message={toast} onDismiss={() => setToast(null)} />

      <Dialog open={showDeactivateModal} onOpenChange={setShowDeactivateModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Deactivate staff member?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to deactivate <span className="font-medium text-foreground">{staff.name}</span>? This action cannot be undone.</p>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setShowDeactivateModal(false)}>Cancel</Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => { setStatus('deactivated'); setToast("Staff member deactivated."); setShowDeactivateModal(false); }}
            >
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}