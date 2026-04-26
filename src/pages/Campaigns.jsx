import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import StatusBadge from '@/components/shared/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CAMPAIGNS, PRODUCT_IMAGES, PRODUCTS } from '@/lib/sampleData';
import SegmentedProgress from '@/components/shared/SegmentedProgress';
import { cn } from '@/lib/utils';

const TABS = [
{ key: 'all', label: 'All' },
{ key: 'active', label: 'Active' },
{ key: 'scheduled', label: 'Scheduled' },
{ key: 'paused', label: 'Paused' },
{ key: 'completed', label: 'Completed' }];


export default function Campaigns() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);

  const filtered = tab === 'all' ? campaigns : campaigns.filter((c) => {
    if (tab === 'active') return c.status === 'active';
    if (tab === 'paused') return c.status === 'paused_manual' || c.status === 'paused_budget';
    if (tab === 'scheduled') return c.status === 'scheduled';
    if (tab === 'completed') return c.status === 'completed';
    return true;
  });

  const count = (key) => {
    if (key === 'all') return campaigns.length;
    if (key === 'paused') return campaigns.filter((c) => c.status.startsWith('paused')).length;
    if (key === 'scheduled') return campaigns.filter((c) => c.status === 'scheduled').length;
    return campaigns.filter((c) => c.status === key).length;
  };

  const handleTogglePause = (campaign) => {
    const newStatus = campaign.status === 'active' ? 'paused_manual' : 'active';
    setCampaigns(campaigns.map((c) => c.id === campaign.id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (campaign) => {
    setCampaigns(campaigns.filter((c) => c.id !== campaign.id));
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Campaigns</h1>
          <p className="text-sm text-[#5b616e] mt-1">Manage commission campaigns for your products.</p>
        </div>
        <Link to="/campaigns/new">
          <Button className="bg-[#27272b] text-white px-4 py-2 text-sm font-semibold rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-[#12121f]/90 gap-2">
            <Plus className="w-4 h-4" /> Create Campaign
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 mb-6">


        {/* Two columns: Committed | Remaining */}
        <div className="grid grid-cols-2 divide-x divide-[#EBEBF0] mb-4">
          <div className="pr-6">
            <p className="text-xs text-[#5b616e] mb-1">Committed</p>
            <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: '#27272b' }}>€1,400</p>
          </div>
          <div className="pl-6 text-right">
            <p className="text-xs text-[#5b616e] mb-1">Remaining</p>
            <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: '#27272b' }}>€375</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden flex mb-2" style={{ background: '#D1D5DB' }}>
          <div className="h-full rounded-full" style={{ width: '79%', background: '#2977d6' }} />
        </div>

        {/* Bar labels */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs flex items-center gap-1.5" style={{ color: '#27272b' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#27272b' }}></span>
            79% committed
          </p>
          <p className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#27272b' }}>
            21% remaining
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e2e2e2' }}></span>
          </p>
        </div>


      </div>

      <div className="flex items-center mb-6 w-fit bg-[#F7F7F7] rounded-2xl p-1 gap-0.5">
        {TABS.map((t) =>
        <button key={t.key} onClick={() => setTab(t.key)}
        className={cn("px-4 py-1.5 rounded-xl text-sm font-semibold transition-all",
        tab === t.key ?
        "bg-white text-[#12121f] shadow-sm" :
        "text-[#5b616e] hover:text-[#12121f]"
        )}>
            {t.label}
          </button>
        )}
      </div>

      <div>
        {filtered.length === 0 ?
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-12 text-center">
            <p className="text-[#9490AA] text-sm">No {tab} campaigns yet.</p>
          </div> :

        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px_48px] px-6 py-3 bg-[#F7F7F7] border-b border-[#EBEBF0]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Campaign</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Product</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Rate</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Budget</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Spent</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Status</span>
            <span />
          </div>

          {/* Rows */}
          {filtered.map((campaign, idx) => {
            const spendPct = campaign.budget > 0 ? campaign.spent / campaign.budget * 100 : 0;
            const isActive = campaign.status === 'active';
            return (
              <div key={campaign.id}>
                <div
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px_48px] px-6 py-4 items-center hover:bg-[#F5F3FC] transition-colors cursor-pointer"
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}>

                  {/* Campaign name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={PRODUCT_IMAGES[campaign.product_name] || PRODUCT_IMAGES.default} alt={campaign.product_name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-semibold text-[#0c0b0c] truncate">{campaign.name}</p>
                  </div>

                  {/* Product */}
                  <Link
                    to={`/products/${encodeURIComponent(campaign.product_name)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-[#5b616e] hover:text-[#534AB7] hover:underline transition-colors"
                  >
                    {campaign.product_name}
                  </Link>

                  {/* Rate */}
                  <span className="text-sm font-medium text-[#0c0b0c]">€{campaign.commission_rate.toFixed(2)}/unit</span>

                  {/* Budget + bar */}
                  <div>
                    <p className="text-sm text-[#0c0b0c] mb-1">€{campaign.budget.toFixed(2)}</p>
                    <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: '#D1D5DB' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(spendPct, 100)}%`, background: '#2977d6' }} />
                    </div>
                  </div>

                  {/* Spent */}
                  <span className="text-sm text-[#0c0b0c]">€{campaign.spent.toFixed(2)}</span>

                  {/* Status + toggle */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <StatusBadge status={campaign.status} />
                    {campaign.status !== 'completed' && campaign.status !== 'paused_budget' && campaign.status !== 'scheduled' && (
                      <Switch checked={isActive} onCheckedChange={() => handleTogglePause(campaign)} className="data-[state=checked]:bg-[#2977d6]" />
                    )}
                  </div>

                  {/* Menu */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-[#5b616e] hover:text-[#796EB2] hover:bg-[#F7F6FB] rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(campaign)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {idx < filtered.length - 1 && <div className="h-px bg-[#F0EFF5] mx-6" />}
              </div>
            );
          })}
        </div>
        }
      </div>
    </div>);

}