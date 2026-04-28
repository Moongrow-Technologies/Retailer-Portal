import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowLeft, Square, Download, Target, TrendingUp, DollarSign, Users, MoreVertical, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import SuccessToast from '@/components/shared/SuccessToast';
import { CAMPAIGNS, STAFF, STAFF_AVATARS } from '@/lib/sampleData';
import SegmentedProgress from '@/components/shared/SegmentedProgress';
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
  const baseCampaign = CAMPAIGNS.find(c => c.id === campaignId) || CAMPAIGNS[0];
  const [status, setStatus] = useState(baseCampaign.status);
  const campaign = { ...baseCampaign, status };
  const [toast, setToast] = useState(null);
  const [showEndModal, setShowEndModal] = useState(false);

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
        <div className="flex items-center gap-3">
          {status !== 'completed' && status !== 'paused_budget' && status !== 'scheduled' && (
            <Switch
              checked={status === 'active'}
              onCheckedChange={() => {
                const next = status === 'active' ? 'paused_manual' : 'active';
                setStatus(next);
                setToast(next === 'active' ? "Campaign resumed." : "Campaign paused.");
              }}
              className="data-[state=checked]:bg-[#796EB2]"
            />
          )}
          {status !== 'completed' && (
            <button
              onClick={() => setShowEndModal(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E0ED] bg-white text-sm font-medium text-[#0E0D1E] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 group-hover:bg-white transition-colors" />
              End campaign
            </button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-[#9490AA] hover:text-[#796EB2] hover:bg-muted rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setToast("Campaign deleted."); navigate('/campaigns'); }} className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {campaign.status === 'paused_budget' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-6">
          <p className="text-sm font-medium text-red-700">Campaign paused — budget exhausted. Top up your wallet to resume.</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#EBEBF0] mb-5">
        <div className="grid grid-cols-3 divide-x divide-[#EBEBF0]">
          {[
            { label: 'Units Sold', value: campaign.units_sold, sub: `of ${campaign.target_units} target` },
            { label: 'Commission Spend', value: `€${campaign.spent.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, sub: `of €${campaign.budget.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} budget` },
            { label: 'ROI', value: campaign.status === 'completed' ? '2.4×' : '—', sub: campaign.status === 'completed' ? 'Revenue multiplier' : 'Available on completion' },
          ].map((s, i) => (
            <div key={i} className="px-6 py-5">
              <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight mb-1">{s.value}</p>
              <p className="text-xs text-[#9490AA]">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Units Progress</span>
            <span className="font-medium">{Math.round(unitsPct)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#D1D5DB' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(unitsPct, 100)}%`, background: '#534AB7' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{campaign.units_sold} / {campaign.target_units} units</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Budget Spend</span>
            <span className="font-medium">{Math.round(spendPct)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#D1D5DB' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(spendPct, 100)}%`, background: '#534AB7' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">€{campaign.spent.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} / €{campaign.budget.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
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
              <Bar dataKey="sales" fill="#5b616e" radius={[4, 4, 0, 0]} />
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
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-primary/10">
                  {STAFF_AVATARS[staff.name]
                    ? <img src={STAFF_AVATARS[staff.name]} alt={staff.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-primary">{staff.name.charAt(0)}</div>
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">{staff.store}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{staff.total_units_sold} units</p>
                  <p className="text-xs text-muted-foreground">€{staff.total_commissions.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />

      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              End campaign?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to end <span className="font-medium text-foreground">{campaign.name}</span>? This action cannot be undone.</p>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setShowEndModal(false)}>Cancel</Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => { setStatus('completed'); setToast("Campaign ended."); setShowEndModal(false); }}
            >
              End campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}