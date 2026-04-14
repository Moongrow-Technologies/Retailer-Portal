import React from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/shared/StatusBadge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function CampaignCard({ campaign, onTogglePause }) {
  const spendPct = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const isActive = campaign.status === 'active';
  const isPaused = campaign.status === 'paused_manual' || campaign.status === 'paused_budget';

  return (
    <Link to={`/campaigns/${campaign.id}`} className="block">
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5 hover:shadow-md hover:border-[#C8C3E0] transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[#0E0D1E]">{campaign.name}</h3>
            <p className="text-sm text-[#9490AA] mt-0.5">{campaign.product_name} · €{campaign.commission_rate.toFixed(2)}/unit</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={campaign.status} />
            {campaign.status !== 'completed' && campaign.status !== 'paused_budget' && (
              <Switch
                checked={isActive}
                onCheckedChange={(e) => {
                  e.preventDefault();
                  onTogglePause?.(campaign);
                }}
                onClick={(e) => e.preventDefault()}
                className="data-[state=checked]:bg-primary"
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#9490AA]">€{campaign.spent.toFixed(2)} / €{campaign.budget.toFixed(2)} budget</span>
            <span className="font-semibold text-[#0E0D1E]">{Math.round(spendPct)}%</span>
          </div>
          <Progress value={spendPct} className="h-1.5" />
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-[#9490AA]">
          <span>{campaign.units_sold} units sold</span>
          <span>·</span>
          <span>{campaign.stores?.length || 1} store{(campaign.stores?.length || 1) > 1 ? 's' : ''}</span>
          <span>·</span>
          <span>{campaign.duration_days}d duration</span>
        </div>
      </div>
    </Link>
  );
}