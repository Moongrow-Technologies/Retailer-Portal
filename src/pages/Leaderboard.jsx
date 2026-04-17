import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Trophy, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { STAFF, CAMPAIGNS, STORE } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const [metric, setMetric] = useState('commission');
  const [campaign, setCampaign] = useState('all');
  const [store, setStore] = useState('all');
  const [timePeriod, setTimePeriod] = useState('This Month');

  const activeStaff = STAFF.filter((s) => s.status === 'active');
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
      </div>);

  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Leaderboard</h1>
          <p className="text-sm text-[#7A7893] mt-1">Staff rankings across all campaigns.</p>
        </div>
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E]"><Download className="w-4 h-4" /> Export</Button>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3 mb-4">
        <Select value={campaign} onValueChange={setCampaign}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {CAMPAIGNS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={store} onValueChange={setStore}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {STORE.locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metric Toggle */}
      <div className="mb-4">
        <div className="flex items-center gap-2 w-fit">
          {['commission', 'units'].map((m) =>
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
              metric === m ?
              "bg-[#796EB2] text-white shadow-sm" :
              "bg-[#EEEDF5] text-[#4B4867] hover:text-[#796EB2]"
            )}>
            
              {m === 'commission' ? 'By Commission' : 'By Units Sold'}
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[50px_2fr_1.5fr_1.5fr_120px_60px] gap-4 px-8 py-4 border-b border-[#F4F3FA]">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA]">#</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA]">Staff</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA]">Store</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA]">Movement</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA] text-right">Commission</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9490AA]"></span>
        </div>

        {/* Rows */}
        {sorted.map((staff, i) =>
        <div
          key={staff.id}
          className={cn(
            "grid grid-cols-[50px_2fr_1.5fr_1.5fr_120px_60px] gap-4 px-8 py-5 border-b border-[#EBEBF0] last:border-0 hover:bg-[#FAFAF9] transition-colors items-center",
            i === 0 && ""
          )}>
          
            {/* Rank */}
            <div className="flex items-center gap-2">
              <span className="bg-[hsl(var(--muted))] text-[#9490AA] text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">


              
                {i + 1}
              </span>
              {i === 0 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
            </div>

            {/* Staff */}
            <div className="flex items-center gap-3">
              <div className="bg-[#d7d5d5] text-white text-sm font-semibold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">


              
                {staff.name.split(' ').map((n) => n[0]).join('').slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[#0E0D1E] text-sm">{staff.name}</p>
                <p className="text-xs text-[#9490AA]">{staff.store}</p>
              </div>
            </div>

            {/* Store */}
            <span className="text-[#0d0c1d] text-sm">{staff.store}</span>

            {/* Movement */}
            <div>
              <span className="bg-[hsl(var(--popover))] text-[#9490AA] px-2 py-1 text-xs font-semibold rounded-full inline-block">


              
                — No change
              </span>
            </div>

            {/* Commission */}
            <span className={cn(
            "text-right font-semibold text-sm",
            i === 0 ? "text-emerald-600" : "text-[#0E0D1E]"
          )}>
              €{staff.total_commissions.toFixed(2)}
            </span>

            {/* View Link */}
            <Link to={`/staff/${staff.id}`} className="text-sm font-medium text-[#796EB2] hover:underline text-right">
              View →
            </Link>
          </div>
        )}
      </div>
    </div>);

}