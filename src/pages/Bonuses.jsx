import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import StatusBadge from '@/components/shared/StatusBadge';
import { cn } from '@/lib/utils';
import { BONUSES } from '@/lib/sampleData';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';

const TYPE_STYLES = {
  ranked: { label: 'Ranked', className: 'bg-[#FAEEDA] text-[#854F0B] border-[#FAC775]' },
  threshold: { label: 'Threshold', className: 'bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]' },
  sprint: { label: 'Sprint', className: 'bg-[#FCEBEB] text-[#791F1F] border-[#F09595]' }
};

const TABS = [
{ key: 'active', label: 'Active' },
{ key: 'scheduled', label: 'Scheduled' },
{ key: 'completed', label: 'Completed' }];


function getTarget(bonus) {
  if (bonus.type === 'sprint') return `First to ${bonus.threshold_target || '?'} units`;
  if (bonus.type === 'threshold') return `Sell ${bonus.threshold_target} units`;
  if (bonus.type === 'ranked') return `Most ${bonus.metric === 'units_sold' ? 'units sold' : 'commission earned'}`;
  return '—';
}

function getPrize(bonus) {
  if (bonus.threshold_prize) return `€${bonus.threshold_prize}`;
  if (bonus.prizes && bonus.prizes.length) return `€${bonus.prizes[0].amount}`;
  if (bonus.prize_pool) return `€${bonus.prize_pool}`;
  return '—';
}

export default function Bonuses() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');
  const [bonuses, setBonuses] = useState(BONUSES);

  const counts = {
    active: bonuses.filter((b) => b.status === 'active').length,
    scheduled: bonuses.filter((b) => b.status === 'scheduled').length,
    completed: bonuses.filter((b) => b.status === 'completed').length
  };

  const filtered = bonuses.filter((b) => tab === 'active' ? (b.status === 'active' || b.status === 'paused_manual') : b.status === tab);

  const handleDelete = (bonus) => {
    setBonuses(bonuses.filter((b) => b.id !== bonus.id));
  };

  const handleTogglePause = (bonus) => {
    const newStatus = bonus.status === 'active' ? 'paused_manual' : 'active';
    setBonuses(bonuses.map((b) => b.id === bonus.id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Bonuses</h1>
          <p className="text-sm text-[#5b616e] mt-1">Run competitions and reward your team.</p>
        </div>
        <Link to="/bonuses/new">
          <Button className="bg-[#27272b] text-white px-4 py-2 text-sm font-semibold rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-[#12121f]/90 gap-2">
            <Plus className="w-4 h-4" /> Create New Bonus
          </Button>
        </Link>
      </div>

      {/* Budget card */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 mb-6">

        {/* Two columns: Prizes paid out | Remaining in fund */}
        <div className="grid grid-cols-2 divide-x divide-[#EBEBF0] mb-4">
          <div className="pr-6">
            <p className="text-xs text-[#5b616e] mb-1">Prizes paid out</p>
            <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: '#27272b' }}>€100</p>
          </div>
          <div className="pl-6 text-right">
            <p className="text-xs text-[#5b616e] mb-1">Remaining in fund</p>
            <p className="text-3xl font-bold tracking-tight mb-1" style={{ color: '#27272b' }}>€125</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden flex mb-2" style={{ background: '#E2E0ED' }}>
          <div className="h-full" style={{ width: '44%', background: '#F0997B' }} />
          <div className="h-full flex-1" style={{ background: '#e2e2e2' }} />
        </div>

        {/* Bar labels */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs flex items-center gap-1.5" style={{ color: '#27272b' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#27272b' }}></span>
            44% paid out of €225 Bonus Fund
          </p>
          <p className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#27272b' }}>
            56% remaining
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e2e2e2' }}></span>
          </p>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center mb-6 w-fit bg-[#F7F7F7] rounded-2xl p-1 gap-0.5">
         {TABS.map((t) =>
         <button
           key={t.key}
           onClick={() => setTab(t.key)}
           className={cn(
             "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all",
             t.key === 'completed' && tab === t.key ?
             "bg-[#F1EFE8] text-[#5F5E5A] shadow-sm" :
             tab === t.key ?
             "bg-white text-[#12121f] shadow-sm" :
             "text-[#5b616e] hover:text-[#12121f]"
           )}>

             {t.label}
           </button>
         )}
       </div>

      {/* Bonus list */}
      {filtered.length === 0 ?
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-12 text-center">
          <p className="text-[#5b616e] text-sm">No {tab} bonuses yet.</p>
          {tab === 'active' &&
        <Link to="/bonuses/new">
              <Button className="mt-4 bg-[#12121f] hover:bg-[#12121f]/90 text-white">Create your first bonus</Button>
            </Link>
        }
        </div> :

      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px_48px] px-6 py-3 bg-[#F7F7F7] border-b border-[#EBEBF0]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Bonus</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Type</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Target</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Prize</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">
            {tab === 'scheduled' ? 'Starts' : 'Ends'}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Status</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.map((bonus, idx) => {
          const typeStyle = TYPE_STYLES[bonus.type] || TYPE_STYLES.ranked;
          const isActive = bonus.status === 'active';
          return (
            <div key={bonus.id}>
              <div
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_120px_48px] px-6 py-4 items-center hover:bg-[#F5F3FC] transition-colors cursor-pointer"
                onClick={() => navigate(`/bonuses/${bonus.id}`)}>

                {/* Bonus name + product */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0c0b0c] truncate">{bonus.name}</p>
                  <p className="text-xs text-[#5b616e] mt-0.5">{bonus.product_name}</p>
                </div>

                {/* Type */}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border w-fit ${typeStyle.className}`}>
                  {typeStyle.label}
                </span>

                {/* Target */}
                <span className="text-sm text-[#0c0b0c]">{getTarget(bonus)}</span>

                {/* Top prize */}
                <span className="text-sm font-semibold text-[#0c0b0c]">{getPrize(bonus)}</span>

                {/* Date */}
                <span className="text-sm text-[#0c0b0c]">
                  {bonus.status === 'scheduled' && bonus.start_date
                    ? <span className="text-amber-600">{format(new Date(bonus.start_date), 'MMM d, yyyy')}</span>
                    : bonus.type === 'sprint' || !bonus.end_date
                    ? <span className="text-[#5b616e] italic">On completion</span>
                    : format(new Date(bonus.end_date), 'MMM d, yyyy')}
                </span>

                {/* Status + toggle */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <StatusBadge status={bonus.status} />
                  {bonus.status !== 'completed' && bonus.status !== 'scheduled' && (
                    <Switch checked={isActive} onCheckedChange={() => handleTogglePause(bonus)} className="data-[state=checked]:bg-[#796EB2]" />
                  )}
                </div>

                {/* Menu */}
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-[#5b616e] hover:text-[#796EB2] hover:bg-[#F7F6FB] rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/bonuses/${bonus.id}/edit`)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(bonus)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {idx < filtered.length - 1 && <div className="h-px bg-[#F0EFF5] mx-6" />}
            </div>
          );
        })}
      </div>
      }
          </div>);

}