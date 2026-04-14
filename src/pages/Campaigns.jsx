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
  { key: 'paused', label: 'Paused' },
  { key: 'completed', label: 'Completed' },
];

export default function Campaigns() {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => {
    if (tab === 'active') return c.status === 'active';
    if (tab === 'paused') return c.status === 'paused_manual' || c.status === 'paused_budget';
    if (tab === 'completed') return c.status === 'completed';
    return true;
  });

  const count = (key) => {
    if (key === 'all') return CAMPAIGNS.length;
    if (key === 'paused') return CAMPAIGNS.filter(c => c.status.startsWith('paused')).length;
    return CAMPAIGNS.filter(c => c.status === key).length;
  };

  return (
    <div className="max-w-4xl">
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

      <div className="flex items-center gap-1 mb-6 bg-[#F8F7FC] rounded-xl p-1 w-fit border border-[#EBEBF0]">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
              tab === t.key ? "bg-white text-[#796EB2] shadow-sm border border-[#E2E0ED]" : "text-[#7A7893] hover:text-[#796EB2]"
            )}>
            {t.label}
            <span className={cn("ml-1.5 text-xs px-1.5 py-0.5 rounded-full", tab === t.key ? "bg-[#EDE9F8] text-[#796EB2]" : "bg-[#EBEBF0] text-[#9490AA]")}>
              {count(t.key)}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-12 text-center">
          <p className="text-[#9490AA] text-sm">No {tab} campaigns yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} />)}
        </div>
      )}
    </div>
  );
}