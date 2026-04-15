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
  { key: 'completed', label: 'Completed' },
];

export default function Campaigns() {
  const [tab, setTab] = useState('all');
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);

  const filtered = tab === 'all' ? campaigns : campaigns.filter(c => {
    if (tab === 'active') return c.status === 'active';
    if (tab === 'paused') return c.status === 'paused_manual' || c.status === 'paused_budget';
    if (tab === 'scheduled') return c.status === 'scheduled';
    if (tab === 'completed') return c.status === 'completed';
    return true;
  });

  const count = (key) => {
    if (key === 'all') return campaigns.length;
    if (key === 'paused') return campaigns.filter(c => c.status.startsWith('paused')).length;
    if (key === 'scheduled') return campaigns.filter(c => c.status === 'scheduled').length;
    return campaigns.filter(c => c.status === key).length;
  };

  const handleTogglePause = (campaign) => {
    const newStatus = campaign.status === 'active' ? 'paused_manual' : 'active';
    setCampaigns(campaigns.map(c => c.id === campaign.id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (campaign) => {
    setCampaigns(campaigns.filter(c => c.id !== campaign.id));
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

      <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full bg-[#F0EEF9] border border-[#E2E0ED] text-sm text-[#7A7893]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#796EB2] flex-shrink-0" />
        <span>€1,308 committed to campaigns</span>
        <span className="text-[#C8C5D8]">·</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
        <span>€692 available</span>
      </div>

      <div className="flex items-center gap-1 mb-6 bg-[#EDE9F8] rounded-full p-1 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all",
              tab === t.key ? "bg-white text-[#0E0D1E] shadow-sm border border-[#E2E0ED]" : "text-[#7A7893] hover:text-[#0E0D1E]"
            )}>
            {t.label}
            <span className={cn("ml-1.5 text-xs px-1.5 py-0.5 rounded-full", tab === t.key ? "bg-[#EDE9F8] text-[#796EB2]" : "bg-[#EBEBF0] text-[#9490AA]")}>
              {count(t.key)}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#9490AA] text-sm">No {tab} campaigns yet.</p>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-3">
            {filtered.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} onTogglePause={handleTogglePause} onDelete={handleDelete} />)}
          </div>
        )}
      </div>
    </div>
  );
}