import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Target, Medal, TrendingUp, UserX } from 'lucide-react';
import { STAFF, PRODUCTS } from '@/lib/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

export default function StaffDetail() {
  const staffId = window.location.pathname.split('/').pop();
  const navigate = useNavigate();
  const staff = STAFF.find(s => s.id === staffId) || STAFF[0];

  return (
    <div>
      <button onClick={() => navigate('/staff')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Staff
      </button>

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
              <h1 className="text-2xl font-bold">{staff.name}</h1>
              <StatusBadge status={staff.status} />
            </div>
            <p className="text-sm text-muted-foreground">{staff.role} · {staff.store} · {staff.email}</p>
          </div>
        </div>
        {staff.status === 'active' && (
          <Button variant="outline" className="gap-1.5 text-destructive hover:text-destructive">
            <UserX className="w-4 h-4" /> Deactivate
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Commissions" value={`€${staff.total_commissions.toFixed(2)}`} icon={DollarSign} />
        <StatCard label="Units Sold" value={staff.total_units_sold} icon={Target} />
        <StatCard label="Bonus Wins" value={staff.bonus_wins} icon={Medal} />
        <StatCard label="Avg. Monthly" value={`€${(staff.total_commissions / 4).toFixed(2)}`} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Earnings Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={earningsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Commission by Product</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={commissionByProduct} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="product" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip />
              <Bar dataKey="commission" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Commission history */}
      <div className="bg-card rounded-xl border border-border p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Commission History</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">OG Kush Sales</p>
              <p className="text-xs text-muted-foreground">15 units sold</p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">+€120.00</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Blue Dream Sales</p>
              <p className="text-xs text-muted-foreground">12 units sold</p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">+€85.00</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Amnesia Haze Sales</p>
              <p className="text-xs text-muted-foreground">10 units sold</p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">+€72.00</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">White Widow Sales</p>
              <p className="text-xs text-muted-foreground">7 units sold</p>
            </div>
            <p className="text-sm font-semibold text-emerald-600">+€45.00</p>
          </div>
        </div>
      </div>

      {/* Bonus history */}
      <div className="bg-card rounded-xl border border-border p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Bonus History</h3>
        {staff.bonus_wins > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Weekend Sprint — 1st Place</p>
                <p className="text-xs text-muted-foreground">Apr 5–7, 2026</p>
              </div>
              <p className="text-sm font-semibold text-emerald-600">+€100.00</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">March Top Seller — 2nd Place</p>
                <p className="text-xs text-muted-foreground">Mar 1–31, 2026</p>
              </div>
              <p className="text-sm font-semibold text-emerald-600">+€50.00</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">No bonus wins yet.</p>
        )}
      </div>
    </div>
  );
}