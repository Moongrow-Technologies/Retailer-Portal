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
    <div className="border border-[#E8E6F0] rounded-2xl p-5 bg-[#FAFAF9] hover:border-[#DDD9E8] transition-all cursor-pointer" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#0E0D1E]">{campaign.name}</h3>
          <p className="text-sm text-[#9490AA] mt-1">{campaign.product_name} · €{campaign.commission_rate.toFixed(2)}/unit · {campaign.units_sold} units sold</p>
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
    </div>
  );
}