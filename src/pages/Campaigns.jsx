import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CampaignCard from '@/components/campaigns/CampaignCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CAMPAIGNS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const TABS = [
{ key: 'all', label: 'All' },
{ key: 'active', label: 'Active' },
{ key: 'scheduled', label: 'Scheduled' },
{ key: 'paused', label: 'Paused' },
{ key: 'completed', label: 'Completed' }];


export default function Campaigns() {
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
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Campaigns</h1>
          <p className="text-sm text-[#7A7893] mt-1">Manage commission campaigns for your products.</p>
        </div>
        <Link to="/campaigns/new">
          <Button className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Create Campaign
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-[#7A7893] mb-2">Committed to campaigns</p>
            <p className="text-[#0E0D1E] mb-4 text-4xl font-semibold">€1,308</p>
            <div className="w-full bg-[#E2E0ED] rounded-full h-2 mb-2">
              <div className="h-full rounded-full" style={{ width: '65%', background: 'linear-gradient(to right, #4B3F8F, #796EB2, #B8B0D8)' }}></div>
            </div>
            <p className="text-sm text-[#796EB2] font-medium">65% of total budget used</p>
          </div>
          <div className="text-right pl-6">
            <p className="text-xs text-[#7A7893] mb-1 inline-block px-3 py-1.5 bg-[#F4F3FA] rounded-lg">Available</p>
            <p className="text-emerald-500 text-3xl font-semibold">€692</p>
            <p className="text-sm text-emerald-600 font-medium mt-1">• 35% left</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 w-fit">
        {TABS.map((t) =>
        <button key={t.key} onClick={() => setTab(t.key)}
        className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all",
        tab === t.key
          ? "bg-[#12121f] text-white border-[#12121f]"
          : "bg-white text-[#0E0D1E] border-[#E2E0ED] hover:border-[#796EB2] hover:text-[#796EB2]"
        )}>
            {t.label}
            <span className={cn("ml-1 text-xs", tab === t.key ? "text-white/60" : "text-[#9490AA]")}>
              {count(t.key)}
            </span>
          </button>
        )}
      </div>

      <div>
        {filtered.length === 0 ?
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-12 text-center">
            <p className="text-[#9490AA] text-sm">No {tab} campaigns yet.</p>
          </div> :

        <div className="flex flex-col gap-3">
            {filtered.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} onTogglePause={handleTogglePause} onDelete={handleDelete} />)}
          </div>
        }
      </div>
    </div>);

}