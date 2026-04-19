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
            <h1 className="text-2xl font-bold text-[#0c0b0c]">Leaderboard</h1>
            <p className="text-sm text-[#5b616e] mt-1">Staff rankings across all campaigns.</p>
          </div>
        </div>
        <EmptyState icon={Trophy} title="No staff yet" description="Invite your team to start tracking performance." actionLabel="Invite Staff" onAction={() => window.location.href = '/staff'} />
      </div>);

  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Leaderboard</h1>
          <p className="text-sm text-[#5b616e] mt-1">Staff rankings across all campaigns.</p>
        </div>
        <Button variant="outline" className="bg-[hsl(var(--background))] text-[#0c0b0c] px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:bg-accent hover:text-accent-foreground h-9 gap-2 border-[#E2E0ED]"><Download className="w-4 h-4" /> Export</Button>
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
        <div className="flex items-center w-fit bg-[#F4F3F4] rounded-2xl p-1 gap-0.5">
          {['commission', 'units'].map((m) =>
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
              metric === m ?
              "bg-white text-[#12121f] shadow-sm" :
              "text-[#5b616e] hover:text-[#12121f]"
            )}>
              {m === 'commission' ? 'By Commission' : 'By Units Sold'}
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-xl border border-[#EBEBF0] overflow-hidden">
        {/* Table Header */}
        <div className="text-[#100e20] px-8 py-3 grid grid-cols-[60px_2fr_1.5fr_1.5fr_140px_70px] border-b border-[#EBEBF0]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA]">#</span>
          <span className="text-[hsl(var(--foreground))] font-semibold uppercase tracking-widest">STAFF</span>
          <span className="text-[hsl(var(--foreground))] font-semibold uppercase tracking-widest">STORE</span>
          <span className="text-[hsl(var(--foreground))] font-semibold uppercase tracking-widest">MOVEMENT</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9490AA] text-right">Commission</span>
          <span />
        </div>

        {/* Rows */}
        {sorted.map((staff, i) =>
        <div key={staff.id}>
            <div className="grid grid-cols-[60px_2fr_1.5fr_1.5fr_140px_70px] px-8 py-6 items-center hover:bg-[#FAFAF9] transition-colors">
              {/* Rank */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#9490AA]">{i + 1}</span>
                {i === 0 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
              </div>

              {/* Staff */}
              <div className="flex items-center gap-3">
                <div className="bg-[#E2E0ED] text-[#7A7893] text-sm font-semibold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  {staff.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#0c0b0c] text-sm">{staff.name}</p>
                  <p className="text-xs text-[#9490AA]">{staff.store}</p>
                </div>
              </div>

              {/* Store */}
              <span className="text-sm text-[#0c0b0c]">{staff.store}</span>

              {/* Movement */}
              <span className="text-sm text-[#9490AA]">— No change</span>

              {/* Commission */}
              <span className={cn("text-right font-bold text-sm", i === 0 ? "text-emerald-600" : "text-[#0c0b0c]")}>
                €{staff.total_commissions.toFixed(2)}
              </span>

              {/* View Link */}
              <Link to={`/staff/${staff.id}`} className="text-sm font-medium text-[#796EB2] hover:underline text-right">
                View →
              </Link>
            </div>
            {i < sorted.length - 1 && <div className="h-px bg-[#F0EFF5] mx-8" />}
          </div>
        )}
      </div>
    </div>);

}