import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Zap, Target, Crown, Medal, Award, Clock, StopCircle, TrendingUp, MoreVertical } from 'lucide-react';
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
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-[#F8F7FC] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#0E0D1E]">€{bonus.prize_pool}</p>
            <p className="text-xs text-[#9490AA]">Prize Pool</p>
          </div>
          <div className="bg-[#F8F7FC] rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-[#9490AA]" />
              <p className="text-xl font-bold text-[#0E0D1E]">{isActive ? formatTimeLeft(hoursLeft) : 'Ended'}</p>
            </div>
            <p className="text-xs text-[#9490AA]">{isActive ? 'Remaining' : 'Duration finished'}</p>
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
        <div className="col-span-2 bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#796EB2]" />
            <h2 className="font-semibold text-[#0E0D1E]">{isActive ? 'Live Leaderboard' : 'Final Standings'}</h2>
          </div>
          <div className="space-y-2">
            {bonus.leaderboard?.map((entry, i) => {
              const RankIcon = rankIcons[i] || Award;
              const pct = Math.round((entry.score / maxScore) * 100);
              const gap = i > 0 ? bonus.leaderboard[i - 1].score - entry.score : null;
              return (
                <div key={entry.rank} className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
                  i === 0 ? "bg-[#F5F3FC] border border-[#E2E0ED]" : "bg-[#F8F7FC]"
                )}>
                  <div className="w-7 flex-shrink-0 flex items-center justify-center">
                    <RankIcon className={cn("w-4 h-4", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-orange-400" : "text-[#C8C3E0]")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm font-semibold text-[#0E0D1E]">{entry.name}</span>
                        <span className="text-xs text-[#9490AA] ml-1.5">{entry.store}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#0E0D1E]">{entry.score} units</span>
                        {gap !== null && isActive && (
                          <span className="text-xs text-[#9490AA] block">-{gap} behind</span>
                        )}
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#E2E0ED] rounded-full overflow-hidden">
                      <div className="h-full bg-[#796EB2] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  {entry.prize && (
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-bold text-[#796EB2] bg-[#EDE9F8] px-2 py-0.5 rounded-lg">€{entry.prize}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prize Structure */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5">
          <h2 className="font-semibold text-[#0E0D1E] mb-4">Prize Structure</h2>
          <div className="space-y-2">
            {bonus.prizes?.map((prize, i) => {
              const RankIcon = rankIcons[i] || Award;
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-[#F8F7FC] rounded-xl">
                  <div className="flex items-center gap-2">
                    <RankIcon className={cn("w-4 h-4", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : "text-orange-400")} />
                    <span className="text-sm text-[#7A7893]">{prize.label}</span>
                  </div>
                  <span className="text-sm font-bold text-[#0E0D1E]">€{prize.amount}</span>
                </div>
              );
            })}
          </div>

          {!isActive && bonus.winner_name && (
            <div className="mt-4 pt-4 border-t border-[#EBEBF0]">
              <p className="text-xs text-[#9490AA] uppercase tracking-wide font-semibold mb-2">Winner</p>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-[#0E0D1E]">{bonus.winner_name}</span>
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