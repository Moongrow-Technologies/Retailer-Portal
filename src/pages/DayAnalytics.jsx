import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { STAFF, CAMPAIGNS, STAFF_AVATARS, PRODUCTS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Day performance data — reflects current week (Apr 27–May 2) averages
// Commission = OG units × €2 + Amnesia units × €2.50 (approx split 55%/45%)
const dayData = {
  'mon': { day: 'Monday',    units: 68,  revenue: 828,  commission: 136, topStaff: ['s1', 's3', 's2'] },
  'tue': { day: 'Tuesday',   units: 63,  revenue: 766,  commission: 126, topStaff: ['s2', 's4', 's1'] },
  'wed': { day: 'Wednesday', units: 91,  revenue: 1107, commission: 182, topStaff: ['s1', 's4', 's3'] },
  'thu': { day: 'Thursday',  units: 71,  revenue: 864,  commission: 142, topStaff: ['s3', 's2', 's1'] },
  'fri': { day: 'Friday',    units: 82,  revenue: 998,  commission: 164, topStaff: ['s4', 's1', 's2'] },
  'sat': { day: 'Saturday',  units: 98,  revenue: 1193, commission: 196, topStaff: ['s2', 's3', 's4'] },
  'sun': { day: 'Sunday',    units: 77,  revenue: 937,  commission: 154, topStaff: ['s1', 's2', 's3'] }
};

// Hourly breakdown — realistic peaks at 12pm and late afternoon/evening
const getHourlyData = () => [
  { hour: '9am',  units: 5  },
  { hour: '10am', units: 9  },
  { hour: '11am', units: 11 },
  { hour: '12pm', units: 14 },
  { hour: '1pm',  units: 12 },
  { hour: '2pm',  units: 8  },
  { hour: '3pm',  units: 7  },
  { hour: '4pm',  units: 10 },
  { hour: '5pm',  units: 13 },
  { hour: '6pm',  units: 15 },
  { hour: '7pm',  units: 11 },
  { hour: '8pm',  units: 6  }
];

// Product breakdown per day — OG Kush leading (active campaign), Amnesia strong second
const getProductBreakdown = () => [
  { name: 'OG Kush',      units: 31, value: 31 },
  { name: 'Amnesia Haze', units: 26, value: 26 },
  { name: 'Blue Dream',   units: 18, value: 18 },
  { name: 'Others',       units: 9,  value: 9  }
];

const COLORS = ['#796eb2', '#9b92c8', '#bcb5dd', '#dedaf0'];

export default function DayAnalytics() {
  const navigate = useNavigate();
  const { dayId } = useParams();
  const day = dayData[dayId] || dayData['mon'];

  const topStaffMembers = day.topStaff
    .map(id => STAFF.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const hourlyData = getHourlyData();
  const productBreakdown = getProductBreakdown();

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate('/analytics')}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Analytics
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#0c0b0c] text-2xl font-bold">{day.day}</h1>
          <p className="text-sm text-[#5b616e] mt-2">Daily performance overview</p>
        </div>
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0c0b0c]">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Units Sold', value: day.units, trend: '↑ 5% vs avg' },
          { label: 'Revenue', value: `€${day.revenue}`, trend: '↑ 7% vs avg' },
          { label: 'Commission', value: `€${day.commission}`, trend: '↑ 4% vs avg' },
          { label: 'Transactions', value: Math.round(day.units * 1.2), trend: 'avg 1.2x/unit' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#EBEBF0] p-5">
            <p className="text-[11px] font-semibold text-[#5b616e] uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-[28px] font-bold text-[#0c0b0c] leading-none mb-2">{stat.value}</p>
            <p className="text-[12px] text-emerald-600 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Hourly Sales */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Hourly sales breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hourlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFF5" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#5b616e' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5b616e' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', fontSize: 12 }} />
              <Bar dataKey="units" fill="#796eb2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Breakdown */}
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
          <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Product breakdown</h3>
          <div className="space-y-4">
            {(() => {
              const maxUnits = Math.max(...productBreakdown.map(p => p.units));
              const totalUnits = productBreakdown.reduce((sum, p) => sum + p.units, 0);

              return productBreakdown.map((product, idx) => {
                const percentage = Math.round((product.units / totalUnits) * 100);
                const barWidth = (product.units / maxUnits) * 100;

                return (
                  <Link
                    key={product.name}
                    to={`/products/${encodeURIComponent(product.name)}`}
                    className="block p-2 rounded-lg hover:bg-[#F5F3FC] transition-colors -mx-2"
                  >
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-[#0c0b0c]">
                          {product.name}
                        </span>
                        <span className="text-xs text-[#5b616e]">{product.units} units · {percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F0EFF5] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: COLORS[idx % COLORS.length]
                          }}
                        />
                      </div>
                      {idx !== productBreakdown.length - 1 && (
                        <div className="border-b border-[#EBEBF0] mt-4" />
                      )}
                    </div>
                  </Link>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* Top Staff */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 mt-6">
        <h3 className="text-sm font-semibold text-[#0c0b0c] mb-4">Top performers</h3>
        <div className="grid grid-cols-3 gap-4">
          {topStaffMembers.map((staff, idx) => (
            <div key={staff.id} className="border border-[#EBEBF0] rounded-lg p-4 hover:bg-[#F5F3FC] transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#E2E0ED]">
                  {STAFF_AVATARS[staff.name]
                    ? <img src={STAFF_AVATARS[staff.name]} alt={staff.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#7A7893]">{staff.name[0]}</div>
                  }
                </div>
                <div>
                  <p className="font-semibold text-[#0c0b0c] text-sm">{staff.name}</p>
                  <p className="text-xs text-[#5b616e]">{staff.store}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#5b616e]">Units sold:</span>
                <span className="font-bold text-[#0c0b0c]">{Math.round(day.units / 3)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}