import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import CampaignCard from '@/components/campaigns/CampaignCard';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Megaphone } from 'lucide-react';
import { CAMPAIGNS } from '@/lib/sampleData';

export default function Campaigns() {
  const [tab, setTab] = useState('all');
  const campaigns = CAMPAIGNS;

  const filtered = tab === 'all' ? campaigns : campaigns.filter(c => {
    if (tab === 'active') return c.status === 'active';
    if (tab === 'paused') return c.status === 'paused_manual' || c.status === 'paused_budget';
    if (tab === 'completed') return c.status === 'completed';
    return true;
  });

  return (
    <div>
      <PageHeader title="Campaigns" description="Manage commission campaigns for your products">
        <Link to="/campaigns/new">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" /> Create Campaign
          </Button>
        </Link>
      </PageHeader>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All ({campaigns.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({campaigns.filter(c => c.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({campaigns.filter(c => c.status.startsWith('paused')).length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({campaigns.filter(c => c.status === 'completed').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No campaigns yet"
          description="Create your first commission campaign to start incentivizing your staff."
          actionLabel="Create Campaign"
          onAction={() => window.location.href = '/campaigns/new'}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}