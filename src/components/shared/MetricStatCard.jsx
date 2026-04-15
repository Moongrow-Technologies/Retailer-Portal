import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const PERIODS = ['This Week', 'This Month'];

export default function MetricStatCard({ label, values, icon: Icon, trend, trendUp, className, to }) {
  const [period, setPeriod] = useState('This Week');
  const [open, setOpen] = useState(false);

  const value = values[period];

  const content = (
    <div>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-[#0E0D1E]">{value}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period dropdown */}
          <div className="relative">
            <button
              onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
              className="flex items-center gap-1 text-xs text-[#796EB2] font-medium bg-[#F0EEF9] hover:bg-[#EDE9F8] rounded-lg px-2 py-1 transition-colors"
            >
              {period} <ChevronDown className="w-3 h-3" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#EBEBF0] rounded-lg shadow-md z-10 min-w-[110px]">
                {PERIODS.map(p => (
                  <button
                    key={p}
                    onClick={(e) => { e.preventDefault(); setPeriod(p); setOpen(false); }}
                    className={cn(
                      "w-full text-left text-xs px-3 py-2 hover:bg-[#F8F7FC] transition-colors first:rounded-t-lg last:rounded-b-lg",
                      p === period ? "text-[#796EB2] font-semibold" : "text-[#0E0D1E]"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#796EB2]" />
            </div>
          )}
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn("text-xs font-medium", trendUp ? "text-emerald-600" : "text-red-500")}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        </div>
      )}
    </div>
  );

  const element = (
    <div className={cn("bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow", className)}>
      {content}
    </div>
  );

  return to ? <Link to={to}>{element}</Link> : element;
}