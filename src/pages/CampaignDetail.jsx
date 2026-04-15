import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Square, Download, Target, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SuccessToast from '@/components/shared/SuccessToast';
import { CAMPAIGNS, STAFF } from '@/lib/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesLiftData = [
  { week: 'W1 Before', sales: 32 },
  { week: 'W2 Before', sales: 28 },
  { week: 'W1 After', sales: 48 },
  { week: 'W2 After', sales: 61 },
  { week: 'W3 After', sales: 55 },
];

export default function CampaignDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const campaignId = window.location.pathname.split('/').pop();
  const navigate = useNavigate();
  const campaign = CAMPAIGNS.find(c => c.id === campaignId) || CAMPAIGNS[0];
  const [toast, setToast] = useState(null);

  const spendPct = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const unitsPct = campaign.target_units > 0 ? (campaign.units_sold / campaign.target_units) * 100 : 0;

  const staffLeaderboard = STAFF
    .filter(s => s.status === 'active')
    .sort((a, b) => b.total_units_sold - a.total_units_sold)
    .slice(0, 5);

  return (
    <div>
      <button onClick={() => navigate('/campaigns')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-sm text-muted-foreground">{campaign.product_name} · €{campaign.commission_rate.toFixed(2)}/unit · {campaign.stores?.join(', ')}</p>
        </div>
        <div className="flex items-center gap-2">
          {campaign.status !== 'completed' && campaign.status !== 'paused_budget' && campaign.status !== 'scheduled' && (
            <Switch
              checked={campaign.status === 'active'}
              onCheckedChange={() => setToast(campaign.status === 'active' ? "Campaign paused." : "Campaign resumed.")}
              className="data-[state=checked]:bg-primary"
            />
          )}
          {campaign.status !== 'completed' && (
            <Button onClick={() => setToast("Campaign ended.")} variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive"><Square className="w-3.5 h-3.5" /> End</Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="w-3.5 h-3.5" /> Export</Button>
        </div>
      </div>

      {campaign.status === 'paused_budget' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-6">
          <p className="text-sm font-medium text-red-700">Campaign paused — budget exhausted. Top up your wallet to resume.</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Units Sold" value={campaign.units_sold} sublabel={`of ${campaign.target_units} target`} icon={Target} />
        <StatCard label="Commission Spend" value={`€${campaign.spent.toFixed(2)}`} sublabel={`of €${campaign.budget.toFixed(2)} budget`} icon={DollarSign} />
        <StatCard label="ROI" value={campaign.status === 'completed' ? '2.4×' : '—'} sublabel={campaign.status === 'completed' ? 'Revenue multiplier' : 'Available on completion'} icon={TrendingUp} />
        <StatCard label="Active Staff" value={staffLeaderboard.length} icon={Users} />
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Units Progress</span>
            <span className="font-medium">{Math.round(unitsPct)}%</span>
          </div>
          <Progress value={unitsPct} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{campaign.units_sold} / {campaign.target_units} units</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Budget Spend</span>
            <span className="font-medium">{Math.round(spendPct)}%</span>
          </div>
          <Progress value={spendPct} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">€{campaign.spent.toFixed(2)} / €{campaign.budget.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Sales lift chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Sales Lift</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesLiftData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Staff leaderboard */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Staff Leaderboard</h3>
          <div className="space-y-3">
            {staffLeaderboard.map((staff, i) => (
              <div key={staff.id} className="flex items-center gap-3">
                <span className="w-6 text-sm font-bold text-muted-foreground text-right">{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {staff.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">{staff.store}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{staff.total_units_sold} units</p>
                  <p className="text-xs text-muted-foreground">€{staff.total_commissions.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}