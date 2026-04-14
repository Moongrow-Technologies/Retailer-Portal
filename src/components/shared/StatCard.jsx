import React from 'react';
import { cn } from '@/lib/utils';

export default function StatCard({ label, value, sublabel, icon: Icon, trend, trendUp, className }) {
  return (
    <div className={cn("bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-[#0E0D1E]">{value}</p>
          {sublabel && <p className="text-xs text-[#9490AA]">{sublabel}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#796EB2]" />
          </div>
        )}
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
}