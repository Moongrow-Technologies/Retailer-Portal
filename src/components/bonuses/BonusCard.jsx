import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, Clock, Crown, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeConfig = {
  ranked: { icon: Trophy, label: 'Ranked', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' },
  threshold: { icon: Target, label: 'Threshold', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  sprint: { icon: Zap, label: 'Sprint', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

function formatTimeLeft(hours) {
  if (!hours) return '—';
  const d = Math.floor(hours / 24);
  const h = hours % 24;
  return d > 0 ? `${d}d ${h}h` : `${h}h`;
}

const rankIcons = [Crown, Medal, Award];

export default function BonusCard({ bonus }) {
  const cfg = typeConfig[bonus.type] || typeConfig.ranked;
  const Icon = cfg.icon;
  const isActive = bonus.status === 'active';

  return (
    <Link to={`/bonuses/${bonus.id}`} className="block">
      <div className={cn(
        "bg-white rounded-xl border p-5 transition-all hover:shadow-md",
        isActive ? "border-[#EBEBF0] hover:border-[#C8C3E0]" : "border-[#EBEBF0] opacity-80"
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cfg.bg)}>
              <Icon className={cn("w-5 h-5", cfg.text)} />
            </div>
            <div>
              <h3 className="font-semibold text-[#0E0D1E] text-sm">{bonus.name}</h3>
              <p className="text-xs text-[#9490AA] mt-0.5">{bonus.product_name} · {bonus.scope === 'chain' ? 'Chain-wide' : bonus.store}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("text-xs font-semibold", cfg.badgeBg)}>
            {cfg.label}
          </Badge>
        </div>

        {isActive ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-[#F8F7FC] rounded-xl p-3 text-center">
                <p className="text-base font-bold text-[#0E0D1E]">€{bonus.prize_pool}</p>
                <p className="text-[11px] text-[#9490AA]">Prize Pool</p>
              </div>
              <div className="bg-[#F8F7FC] rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-[#9490AA]" />
                  <p className="text-base font-bold text-[#0E0D1E]">{formatTimeLeft(bonus.hours_left)}</p>
                </div>
                <p className="text-[11px] text-[#9490AA]">Remaining</p>
              </div>
              <div className="bg-[#F8F7FC] rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Crown className="w-3 h-3 text-amber-500" />
                  <p className="text-sm font-bold text-[#0E0D1E] truncate">{bonus.current_leader}</p>
                </div>
                <p className="text-[11px] text-[#9490AA]">{bonus.leader_score} units</p>
              </div>
            </div>

            {/* Prize breakdown */}
            <div className="space-y-1.5">
              {bonus.prizes?.slice(0, 3).map((prize, i) => {
                const RankIcon = rankIcons[i] || Award;
                return (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <RankIcon className={cn("w-3.5 h-3.5", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : "text-orange-400")} />
                      <span className="text-[#7A7893]">{prize.label}</span>
                    </div>
                    <span className="font-semibold text-[#0E0D1E]">€{prize.amount}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Completed */
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-[#0E0D1E]">{bonus.winner_name}</p>
                  <p className="text-xs text-[#9490AA]">Winner</p>
                </div>
              </div>
              <p className="text-base font-bold text-emerald-700">€{bonus.winner_payout}</p>
            </div>
            <div className="space-y-1">
              {bonus.leaderboard?.slice(0, 3).map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between text-xs text-[#9490AA]">
                  <span>#{entry.rank} {entry.name}</span>
                  <span>{entry.score} units{entry.prize ? ` · €${entry.prize}` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}