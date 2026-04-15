import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Trophy, Medal } from 'lucide-react';
import { STAFF, CAMPAIGNS, STORE } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const [metric, setMetric] = useState('commission');
  const [campaign, setCampaign] = useState('all');
  const [store, setStore] = useState('all');
  const [timePeriod, setTimePeriod] = useState('month');

  const activeStaff = STAFF.filter(s => s.status === 'active');
  const sorted = [...activeStaff].sort((a, b) => {
    if (metric === 'commission') return b.total_commissions - a.total_commissions;
    return b.total_units_sold - a.total_units_sold;
  });

  const rankIcons = ['🥇', '🥈', '🥉'];

  if (activeStaff.length === 0) {
    return (
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0E0D1E]">Leaderboard</h1>
            <p className="text-sm text-[#7A7893] mt-1">Staff rankings across all campaigns.</p>
          </div>
        </div>
        <EmptyState icon={Trophy} title="No staff yet" description="Invite your team to start tracking performance." actionLabel="Invite Staff" onAction={() => window.location.href = '/staff'} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Leaderboard</h1>
          <p className="text-sm text-[#7A7893] mt-1">Staff rankings across all campaigns.</p>
        </div>
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E]"><Download className="w-4 h-4" /> Export</Button>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-1 bg-[#EEEDF5] rounded-full p-1.5 flex-shrink-0">
          {['commission', 'units'].map(m => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                metric === m
                  ? "bg-white text-[#796EB2] shadow-sm"
                  : "text-[#0E0D1E] hover:text-[#796EB2]"
              )}
            >
              {m === 'commission' ? 'By Commission (€)' : 'By Units Sold'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-[#EEEDF5] rounded-full p-1.5 flex-shrink-0">
          {['Today', 'This Week', 'This Month'].map((period, idx) => {
            const periodKey = ['today', 'week', 'month'][idx];
            return (
              <button
                key={periodKey}
                onClick={() => setTimePeriod(periodKey)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                  timePeriod === periodKey
                    ? "bg-white text-[#796EB2] shadow-sm"
                    : "text-[#0E0D1E] hover:text-[#796EB2]"
                )}
              >
                {period}
              </button>
            );
          })}
        </div>

        <Select value={campaign} onValueChange={setCampaign}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {CAMPAIGNS.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={store} onValueChange={setStore}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {STORE.locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] p-4">
         <div className="space-y-3">
           {sorted.map((staff, i) => (
             <Link to={`/staff/${staff.id}`} key={staff.id}>
               <div className={cn(
                 "flex items-center gap-4 p-4 rounded-2xl transition-all hover:shadow-sm bg-[#F4F3FA] mb-3"
               )}>
                 <div className="w-10 text-center">
                   {i < 3 ? (
                     <span className="text-xl">{rankIcons[i]}</span>
                   ) : (
                     <span className="text-lg font-bold text-[#9490AA]">{i + 1}</span>
                   )}
                 </div>
                 <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                   {staff.avatar_url ? (
                     <img src={staff.avatar_url} alt={staff.name} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-[#EDE9F8] flex items-center justify-center text-sm font-semibold text-[#796EB2]">{staff.name.charAt(0)}</div>
                   )}
                 </div>
                 <div className="flex-1">
                   <p className="font-semibold text-[#0E0D1E]">{staff.name}</p>
                   <p className="text-sm text-[#9490AA]">{staff.role.charAt(0).toUpperCase() + staff.role.slice(1)} · {staff.store}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-lg font-bold text-[#0E0D1E]">
                     {metric === 'commission' ? `€${staff.total_commissions.toFixed(2)}` : `${staff.total_units_sold} units`}
                   </p>
                   <p className="text-xs text-[#9490AA]">
                     {metric === 'commission' ? `${staff.total_units_sold} units` : `€${staff.total_commissions.toFixed(2)} earned`}
                   </p>
                 </div>
               </div>
             </Link>
           ))}
         </div>
       </div>
    </div>
  );
}