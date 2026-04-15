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
        "bg-white rounded-2xl border border-[#EBEBF0] p-6 transition-all hover:shadow-sm",
        !isActive && "opacity-80"
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <p className="text-xs uppercase font-semibold text-[#9490AA] tracking-wide mb-1">{cfg.label}</p>
            <h3 className="font-semibold text-lg text-[#0E0D1E]">{bonus.name}</h3>
            <p className="text-sm text-[#9490AA] mt-2">{bonus.product_name} · {bonus.scope === 'chain' ? 'Chain-wide' : bonus.store}</p>
          </div>
          <Badge variant="outline" className={cn("text-xs font-semibold flex-shrink-0 ml-4", cfg.badgeBg)}>
            {isActive ? 'Active' : 'Completed'}
          </Badge>
        </div>

        {isActive ? (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#0E0D1E]">€{bonus.prize_pool}</p>
                <p className="text-xs text-[#9490AA] mt-1">Prize Pool</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-[#9490AA]" />
                  <p className="text-2xl font-bold text-[#0E0D1E]">{formatTimeLeft(bonus.hours_left)}</p>
                </div>
                <p className="text-xs text-[#9490AA]">Remaining</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-bold text-[#0E0D1E] truncate">{bonus.current_leader}</p>
                </div>
                <p className="text-xs text-[#9490AA]">{bonus.leader_score} units</p>
              </div>
            </div>

            {/* Prize breakdown */}
            <div className="space-y-2">
              {bonus.prizes?.slice(0, 3).map((prize, i) => {
                const RankIcon = rankIcons[i] || Award;
                return (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <RankIcon className={cn("w-4 h-4", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : "text-orange-400")} />
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