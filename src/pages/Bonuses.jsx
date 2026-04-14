import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BONUSES } from '@/lib/sampleData';
import { format } from 'date-fns';

const TYPE_STYLES = {
  sprint:    { label: 'Sprint',    className: 'bg-blue-50 text-blue-600 border-blue-200' },
  threshold: { label: 'Threshold', className: 'bg-amber-50 text-amber-600 border-amber-200' },
  ranked:    { label: 'Ranked',    className: 'bg-purple-50 text-purple-600 border-purple-200' },
};

const TABS = [
  { key: 'active',    label: 'Active' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'completed', label: 'Completed' },
];

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
  const [tab, setTab] = useState('active');

  const counts = {
    active:    BONUSES.filter(b => b.status === 'active').length,
    scheduled: 0,
    completed: BONUSES.filter(b => b.status === 'completed').length,
  };

  const filtered = tab === 'scheduled' ? [] : BONUSES.filter(b => b.status === tab);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Bonuses</h1>
          <p className="text-sm text-[#7A7893] mt-1">Run competitions and reward your team.</p>
        </div>
        <Link to="/bonuses/new">
          <Button className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Create New Bonus
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-[#F8F7FC] rounded-xl p-1 w-fit border border-[#EBEBF0]">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-white text-[#796EB2] shadow-sm border border-[#E2E0ED]'
                : 'text-[#7A7893] hover:text-[#796EB2]'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#EDE9F8] text-[#796EB2]' : 'bg-[#EBEBF0] text-[#9490AA]'}`}>
              {counts[t.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Bonus list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-12 text-center">
          <p className="text-[#9490AA] text-sm">No {tab} bonuses yet.</p>
          {tab === 'active' && (
            <Link to="/bonuses/new">
              <Button className="mt-4 bg-[#796EB2] hover:bg-[#6A5FA3] text-white">Create your first bonus</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(bonus => {
            const typeStyle = TYPE_STYLES[bonus.type] || TYPE_STYLES.ranked;
            return (
              <Link key={bonus.id} to={`/bonuses/${bonus.id}`}>
                <div className="px-4 py-3 flex items-center gap-4 bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl hover:bg-[#F0EEF9] transition-colors">
                  {/* Type badge */}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex-shrink-0 ${typeStyle.className}`}>
                    {typeStyle.label}
                  </span>

                  {/* Name + product */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0E0D1E] truncate">{bonus.name}</p>
                    <p className="text-xs text-[#9490AA] mt-0.5">{bonus.product_name}</p>
                  </div>

                  {/* Target */}
                  <div className="w-32 flex-shrink-0">
                    <p className="text-xs text-[#9490AA]">Target</p>
                    <p className="text-sm font-medium text-[#0E0D1E]">{getTarget(bonus)}</p>
                  </div>

                  {/* Prize */}
                  <div className="w-24 flex-shrink-0">
                    <p className="text-xs text-[#9490AA]">Prize</p>
                    <p className="text-sm font-semibold text-[#0E0D1E]">{getPrize(bonus)}</p>
                  </div>

                  {/* End date */}
                  <div className="w-28 flex-shrink-0 text-right">
                    {bonus.type === 'sprint' ? (
                      <>
                        <p className="text-xs text-[#9490AA]">Ends</p>
                        <p className="text-sm font-medium text-[#9490AA] italic">On completion</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-[#9490AA]">Ends</p>
                        <p className="text-sm font-medium text-[#0E0D1E]">{format(new Date(bonus.end_date), 'MMM d, yyyy')}</p>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}