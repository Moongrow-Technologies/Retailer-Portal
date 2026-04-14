import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

const sparkData = [
  { day: 'Mon', spend: 18 },
  { day: 'Tue', spend: 32 },
  { day: 'Wed', spend: 27 },
  { day: 'Thu', spend: 45 },
  { day: 'Fri', spend: 38 },
  { day: 'Sat', spend: 52 },
  { day: 'Sun', spend: 41 },
];

const commissionThisMonth = 312.50;

export default function CommissionSparkCard() {
  return (
    <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5 transition-all hover:shadow-md hover:border-[#C8C3E8] cursor-default">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Commission Spend</p>
          <p className="text-2xl font-bold text-[#0E0D1E] mt-1">€{commissionThisMonth.toFixed(2)}</p>
          <p className="text-xs text-[#9490AA] mt-0.5">This month</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-[#796EB2]" />
        </div>
      </div>
      <div className="mt-3 h-14">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sparkData} barSize={8}>
            <Bar dataKey="spend" fill="#796EB2" radius={[2, 2, 0, 0]} opacity={0.8} />
            <Tooltip
              contentStyle={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, border: '1px solid #EBEBF0' }}
              formatter={(v) => [`€${v}`, 'Spend']}
              labelFormatter={(l) => l}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-emerald-600 font-medium mt-1">↑ 18% vs last month</p>
    </div>
  );
}