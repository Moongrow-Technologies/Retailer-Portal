import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Zap, Target, Crown, Medal, Award, Clock, StopCircle, TrendingUp, MoreVertical, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SuccessToast from '@/components/shared/SuccessToast';
import { BONUSES } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const typeConfig = {
  ranked: { icon: Trophy, label: 'Ranked', color: 'text-amber-600', bg: 'bg-amber-50', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
  threshold: { icon: Target, label: 'Threshold', color: 'text-blue-600', bg: 'bg-blue-50', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  sprint: { icon: Zap, label: 'Sprint', color: 'text-rose-600', bg: 'bg-rose-50', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

const rankIcons = [Crown, Medal, Award];

function formatTimeLeft(hours) {
  if (!hours) return '0h';
  const d = Math.floor(hours / 24);
  const h = hours % 24;
  return d > 0 ? `${d}d ${h}h` : `${h}h`;
}

export default function BonusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseBonus = BONUSES.find(b => b.id === id);
  const [bonusStatus, setBonusStatus] = useState(baseBonus?.status || 'active');
  const bonus = baseBonus ? { ...baseBonus, status: bonusStatus } : null;
  const [hoursLeft, setHoursLeft] = useState(baseBonus?.hours_left || 0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!bonus || bonus.status !== 'active') return;
    const timer = setInterval(() => setHoursLeft(h => Math.max(0, h - 1)), 3600000);
    return () => clearInterval(timer);
  }, [bonus]);

  if (!bonus) return (
    <div className="text-center py-20">
      <p className="text-[#9490AA]">Bonus not found.</p>
      <Link to="/bonuses"><Button className="mt-4 bg-[#12121f] hover:bg-[#12121f]/90 text-white">Back to Bonuses</Button></Link>
    </div>
  );

  const cfg = typeConfig[bonus.type] || typeConfig.ranked;
  const Icon = cfg.icon;
  const isActive = bonus.status === 'active';
  const maxScore = bonus.leaderboard?.[0]?.score || 1;

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <button onClick={() => navigate('/bonuses')}
        className="flex items-center gap-1.5 text-sm text-[#7A7893] hover:text-[#796EB2] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Bonuses
      </button>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", cfg.bg)}>
              <Icon className={cn("w-6 h-6", cfg.color)} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0E0D1E]">{bonus.name}</h1>
              <p className="text-sm text-[#9490AA] mt-0.5">{bonus.product_name} · {bonus.scope === 'chain' ? 'Chain-wide' : bonus.store}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs font-semibold", cfg.badgeBg)}>{cfg.label}</Badge>
            <Badge variant="outline" className={isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-600 border-slate-200"}>
              {isActive ? 'Active' : 'Completed'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-[#9490AA] hover:text-[#796EB2] hover:bg-[#F8F7FC] rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/bonuses/${bonus.id}/edit`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setToast("Bonus deleted."); navigate('/bonuses'); }} className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 divide-x divide-[#EBEBF0] border-t border-[#EBEBF0] mt-5">
          <div className="px-6 py-4">
            <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-1">Prize Pool</p>
            <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight">€{bonus.prize_pool}</p>
          </div>
          <div className="px-6 py-4">
            <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-1">{isActive ? 'Time Remaining' : 'Status'}</p>
            <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight">{isActive ? formatTimeLeft(hoursLeft) : 'Ended'}</p>
          </div>
        </div>

        {/* Actions */}
        {bonusStatus !== 'completed' && (
          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#EBEBF0]">
            <Switch
              checked={bonusStatus === 'active'}
              onCheckedChange={() => {
                const next = bonusStatus === 'active' ? 'paused_manual' : 'active';
                setBonusStatus(next);
                setToast(next === 'active' ? "Bonus resumed." : "Bonus paused.");
              }}
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-[#7A7893]">{bonusStatus === 'active' ? 'Active' : 'Paused'}</span>
            <Button onClick={() => { setBonusStatus('completed'); setToast("Bonus ended."); }} variant="outline" size="sm" className="gap-1.5 border-red-200 text-red-500 hover:bg-red-50 ml-2">
              <StopCircle className="w-3.5 h-3.5" /> End Early
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Live Leaderboard */}
        <div className="col-span-2 bg-white rounded-xl border border-[#EBEBF0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBF0]">
            <h2 className="font-semibold text-[#0E0D1E] text-sm">{isActive ? 'Live Leaderboard' : 'Final Standings'}</h2>
          </div>
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_100px_80px] px-6 py-3 border-b border-[#EBEBF0]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA]">#</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA]">Staff</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA] text-right">Score</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA] text-right">Prize</span>
          </div>
          <div>
            {bonus.leaderboard?.map((entry, i) => {
              const pct = Math.round((entry.score / maxScore) * 100);
              const gap = i > 0 ? bonus.leaderboard[i - 1].score - entry.score : null;
              return (
                <div key={entry.rank}>
                  <div className="grid grid-cols-[40px_1fr_100px_80px] px-6 py-5 items-center hover:bg-[#FAFAF9] transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-[#9490AA]">{i + 1}</span>
                      {i === 0 && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0E0D1E]">{entry.name}</p>
                      <p className="text-xs text-[#9490AA]">{entry.store}</p>
                      <div className="h-1 bg-[#F0EFF5] rounded-full overflow-hidden mt-2 max-w-[180px]">
                        <div className="h-full bg-[#796EB2] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#0E0D1E]">{entry.score} units</span>
                      {gap !== null && isActive && <p className="text-xs text-[#9490AA]">-{gap} behind</p>}
                    </div>
                    <div className="text-right">
                      {entry.prize && <span className="text-xs font-bold text-[#796EB2] bg-[#EDE9F8] px-2 py-0.5 rounded-lg">€{entry.prize}</span>}
                    </div>
                  </div>
                  {i < (bonus.leaderboard?.length ?? 0) - 1 && <div className="h-px bg-[#F0EFF5] mx-6" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prize Structure */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EBEBF0]">
            <h2 className="font-semibold text-[#0E0D1E] text-sm">Prize Structure</h2>
          </div>
          <div>
            {bonus.prizes?.map((prize, i) => {
              const RankIcon = rankIcons[i] || Award;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <RankIcon className={cn("w-4 h-4", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : "text-orange-400")} />
                      <span className="text-sm text-[#5b616e]">{prize.label}</span>
                    </div>
                    <span className="text-sm font-bold text-[#0E0D1E]">€{prize.amount}</span>
                  </div>
                  {i < (bonus.prizes?.length ?? 0) - 1 && <div className="h-px bg-[#F0EFF5] mx-5" />}
                </div>
              );
            })}
          </div>

          {!isActive && bonus.winner_name && (
            <div className="mx-5 mb-5 mt-1 pt-4 border-t border-[#EBEBF0]">
              <p className="text-[10px] text-[#9490AA] uppercase tracking-widest font-semibold mb-2">Winner</p>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-[#0E0D1E] text-sm">{bonus.winner_name}</span>
              </div>
              <p className="text-sm text-emerald-600 font-semibold mt-1">€{bonus.winner_payout} paid out</p>
            </div>
          )}
        </div>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}