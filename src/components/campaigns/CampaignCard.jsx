import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/shared/StatusBadge';
import { Switch } from '@/components/ui/switch';
import { MoreVertical, Sparkles } from 'lucide-react';
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
    <div className="bg-white border border-[#EBEBF0] rounded-2xl p-5 hover:shadow-sm transition-all cursor-pointer flex items-center gap-8 justify-between" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
      {/* Left: Icon + Name/Description */}
      <div className="flex items-center gap-4 flex-shrink-0 min-w-0 w-48">
        <div className="w-12 h-12 rounded-xl bg-[#F4F3FA] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-[#796EB2]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-[#0E0D1E]">{campaign.name}</h3>
          <p className="text-xs text-[#9490AA] mt-0.5">{campaign.product_name} • Last edited 2h ago</p>
        </div>
      </div>

      {/* Rate */}
      <div className="flex-shrink-0 w-24 flex flex-col justify-center h-12">
        <p className="text-xs uppercase font-semibold text-[#9490AA] tracking-wide mb-0.5">Rate</p>
        <p className="text-sm font-semibold text-[#0E0D1E]">€{campaign.commission_rate.toFixed(2)}/unit</p>
      </div>

      {/* Spent/Budget + Progress */}
      <div className="flex-shrink-0 w-40 flex flex-col justify-center h-12">
        <p className="text-xs text-[#9490AA] mb-0.5">Spent: €{campaign.spent.toFixed(2)}</p>
        <div className="flex items-center gap-2 mb-0.5">
          <Progress value={spendPct} className="flex-1 h-1.5" />
          <span className="text-xs font-semibold text-[#0E0D1E] w-8 text-right">{Math.round(spendPct)}%</span>
        </div>
        <p className="text-xs text-[#9490AA]">Budget: €{campaign.budget.toFixed(2)}</p>
      </div>

      {/* Right: Status, Switch, Menu */}
      <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
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
            <button className="p-2 text-[#9490AA] hover:text-[#796EB2] transition-colors">
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
  );
}