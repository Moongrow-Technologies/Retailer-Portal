import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/shared/StatusBadge';
import { Switch } from '@/components/ui/switch';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function CampaignCard({ campaign, onTogglePause, onDelete }) {
  const navigate = useNavigate();
  const spendPct = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const isActive = campaign.status === 'active';

  return (
    <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl p-4 hover:bg-[#F0EEF9] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/campaigns/${campaign.id}`} className="block flex-1">
          <h3 className="font-semibold text-[#0E0D1E]">{campaign.name}</h3>
          <p className="text-sm text-[#9490AA] mt-0.5">{campaign.product_name} · €{campaign.commission_rate.toFixed(2)}/unit</p>
        </Link>
        <div className="flex items-center gap-3 ml-3">
          <StatusBadge status={campaign.status} />
          {campaign.status !== 'completed' && campaign.status !== 'paused_budget' && campaign.status !== 'scheduled' && (
            <Switch
              checked={isActive}
              onCheckedChange={() => onTogglePause?.(campaign)}
              className="data-[state=checked]:bg-primary"
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-[#9490AA] hover:text-[#796EB2] hover:bg-white rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(campaign)} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
  );
}