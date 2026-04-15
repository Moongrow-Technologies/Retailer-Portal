import React from 'react';
import { Link } from 'react-router-dom';

export default function NeedsAttention({ staff }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Needs Attention</h3>
      <div className="space-y-3">
        {staff.map((member) => (
          <Link key={member.id} to={`/staff/${member.id}`}>
            <div className="flex items-center gap-3 bg-[#F4F3FA] rounded-2xl px-4 py-3 hover:bg-[#EDE9F8] transition-colors mb-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                {member.avatar_url ? (
                  <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#EDE9F8] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#796EB2]">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0E0D1E] truncate">{member.name}</p>
                <p className="text-xs text-[#9490AA] truncate">{member.store.split('—')[1]?.trim() || member.store}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#0E0D1E]">€{member.total_commissions.toFixed(2)}</p>
                <p className="text-xs text-[#9490AA]">{member.total_units_sold} units</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}