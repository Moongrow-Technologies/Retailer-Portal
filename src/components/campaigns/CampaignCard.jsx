import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import StatusBadge from '@/components/shared/StatusBadge';
import { Switch } from '@/components/ui/switch';
import { MoreVertical } from 'lucide-react';

const PRODUCT_IMAGES = {
  'Blue Dream':    'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
  'OG Kush':       'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80',
  'White Widow':   'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80',
  'Amnesia Haze':  'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80',
  default:         'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function CampaignCard({ campaign, onTogglePause, onDelete }) {
  const navigate = useNavigate();
  const spendPct = campaign.budget > 0 ? campaign.spent / campaign.budget * 100 : 0;
  const isActive = campaign.status === 'active';

  return (
    <div className="bg-white border border-[#EBEBF0] rounded-2xl p-5 hover:border-[#E2E0ED] hover:shadow-sm transition-all cursor-pointer grid grid-cols-[auto_1fr_auto_200px_auto] items-center gap-6" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
      {/* Left: Icon + Name/Description */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="rounded-xl w-12 h-12 flex-shrink-0 overflow-hidden">
          <img src={PRODUCT_IMAGES[campaign.product_name] || PRODUCT_IMAGES.default} alt={campaign.product_name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-[#0c0b0c] whitespace-nowrap overflow-hidden text-ellipsis">{campaign.name}</h3>
          <p className="text-xs text-[#5b616e] mt-0.5">{campaign.product_name} • Last edited 2h ago</p>
        </div>
      </div>

      {/* Rate */}
      <div className="flex-shrink-0 w-24 flex flex-col justify-center h-12">
        <p className="text-[hsl(var(--popover-foreground))] mb-0.5 text-xs font-semibold uppercase tracking-wide">RATE</p>
        <p className="text-[hsl(var(--muted-foreground))] text-sm font-semibold">€{campaign.commission_rate.toFixed(2)}/unit</p>
      </div>

      {/* Spent/Budget + Progress */}
      <div className="flex-shrink-0 w-48 flex flex-col justify-center h-12">
        <p className="text-[hsl(var(--foreground))] mb-0.5 text-xs">Spent: €{campaign.spent.toFixed(2)}</p>
        <div className="flex items-baseline gap-2 mb-0.5">
          <div className="w-32 h-1.5 rounded-full bg-[#E2E0ED] overflow-hidden flex-shrink-0">
            <div className="h-full rounded-full" style={{ width: `${spendPct}%`, background: 'linear-gradient(to right, #4B3F8F, #796EB2, #B8B0D8)' }} />
          </div>
          <span className="text-xs font-semibold text-[#0c0b0c] w-8 text-right flex-shrink-0">{Math.round(spendPct)}%</span>
        </div>
        <p className="text-xs text-[#5b616e]">Budget: €{campaign.budget.toFixed(2)}</p>
      </div>

      {/* Right: Status, Switch, Menu */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto" onClick={(e) => e.stopPropagation()}>
        <StatusBadge status={campaign.status} />
        {campaign.status !== 'completed' && campaign.status !== 'paused_budget' && campaign.status !== 'scheduled' &&
        <Switch
          checked={isActive}
          onCheckedChange={() => onTogglePause?.(campaign)}
          className="data-[state=checked]:bg-primary" />

        }
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 text-[#5b616e] hover:text-[#796EB2] transition-colors">
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
    </div>);

}