import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Zap, Target, Crown, Medal, Award, Clock, StopCircle, TrendingUp, MoreVertical, Star, AlertTriangle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import SuccessToast from '@/components/shared/SuccessToast';
import { BONUSES, STAFF_AVATARS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const typeConfig = {
  ranked: { icon: Trophy, label: 'Ranked', color: 'text-[#854F0B]', bg: 'bg-[#FAEEDA]', badgeBg: 'bg-[#FAEEDA] text-[#854F0B] border-[#FAC775]' },
  threshold: { icon: Target, label: 'Threshold', color: 'text-[#185FA5]', bg: 'bg-[#E6F1FB]', badgeBg: 'bg-[#E6F1FB] text-[#185FA5] border-[#85B7EB]' },
  sprint: { icon: Zap, label: 'Sprint', color: 'text-[#791F1F]', bg: 'bg-[#FCEBEB]', badgeBg: 'bg-[#FCEBEB] text-[#791F1F] border-[#F09595]' },
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
  const [showEndModal, setShowEndModal] = useState(false);

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
    <div>
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
            <Badge variant="outline" className={isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : bonusStatus === 'completed' ? "bg-[#F1EFE8] text-[#5F5E5A] border-[#E8E6DC]" : "bg-[#EDE9F8] text-[#796EB2] border-[#D4CDF0]"}>
              {isActive ? 'Active' : bonusStatus === 'completed' ? 'Completed' : 'Paused'}
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
            <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight">€{bonus.prize_pool.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          </div>
          <div className="px-6 py-4">
            <p className="text-[10px] font-semibold text-[#7A7893] uppercase tracking-widest mb-1">{isActive ? 'Time Remaining' : 'Status'}</p>
            <p className="text-[22px] font-bold tracking-tight text-[#0E0D1E] leading-tight">{isActive ? formatTimeLeft(hoursLeft) : bonusStatus === 'completed' ? 'Ended' : 'Paused'}</p>
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
              className="data-[state=checked]:bg-[#796EB2]"
            />
            <span className="text-sm text-[#7A7893]">{bonusStatus === 'active' ? 'Active' : 'Paused'}</span>
            <button
              onClick={() => setShowEndModal(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E2E0ED] bg-white text-sm font-medium text-[#0E0D1E] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all ml-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 group-hover:bg-white transition-colors" />
              End bonus
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Live Leaderboard */}
        <div className="col-span-2 bg-white rounded-xl border border-[#EBEBF0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EBEBF0]">
            <h2 className="font-semibold text-[#0E0D1E] text-sm">{isActive ? 'Live Leaderboard' : 'Final Standings'}</h2>
          </div>

          <div>
            {bonus.leaderboard?.map((entry, i) => {
              const pct = Math.round((entry.score / maxScore) * 100);
              const gap = i > 0 ? bonus.leaderboard[i - 1].score - entry.score : null;
              return (
                <div key={entry.rank}>
                  <div className="px-6 py-4 hover:bg-[#FAFAF9] transition-colors">
                    {/* Name + avatar row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#9490AA] w-5 text-center">{i + 1}</span>
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#E2E0ED]">
                          {STAFF_AVATARS[entry.name]
                            ? <img src={STAFF_AVATARS[entry.name]} alt={entry.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-[#7A7893]">{entry.name.charAt(0)}</div>
                          }
                        </div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-[#0E0D1E]">{entry.name}</p>
                          {i === 0 && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <span className="text-sm font-bold text-[#0E0D1E]">{entry.score} units</span>
                        {entry.prize && <span className="text-xs font-bold text-[#796EB2] bg-[#EDE9F8] px-2 py-0.5 rounded-lg">€{Number(entry.prize).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>}
                      </div>
                    </div>
                    {/* Full-width progress bar */}
                    <div className="h-2 bg-[#F0EFF5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#796EB2] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-[#9490AA] mt-1">{pct}% of target{gap !== null && isActive ? ` · ${gap} behind` : ''}</p>
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
                    <span className="text-sm font-bold text-[#0E0D1E]">€{Number(prize.amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
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
              <p className="text-sm text-emerald-600 font-semibold mt-1">€{bonus.winner_payout.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} paid out</p>
            </div>
          )}
        </div>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />

      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              End bonus?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to end <span className="font-medium text-foreground">{bonus.name}</span>? This action cannot be undone.</p>
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setShowEndModal(false)}>Cancel</Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => { setBonusStatus('completed'); setToast("Bonus ended."); setShowEndModal(false); }}
            >
              End bonus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}