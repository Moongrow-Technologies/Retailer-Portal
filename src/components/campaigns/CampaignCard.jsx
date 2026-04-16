import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="bg-white border border-[#EBEBF0] rounded-2xl p-6 hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase font-semibold text-[#9490AA] tracking-wide mb-1">{campaign.product_name}</p>
          <h3 className="font-semibold text-lg text-[#0E0D1E]">{campaign.name}</h3>
          <p className="text-sm text-[#9490AA] mt-2">€{campaign.commission_rate.toFixed(2)}/unit · {campaign.units_sold} units sold</p>
        </div>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
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
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-[#9490AA]">€{campaign.spent.toFixed(2)} / €{campaign.budget.toFixed(2)} budget</span>
        <span className="font-semibold text-[#0E0D1E]">{Math.round(spendPct)}%</span>
      </div>
      <Progress value={spendPct} className={cn("h-1.5", spendPct >= 100 ? "[&>div]:bg-red-500" : "")} />
    </div>
  );
}