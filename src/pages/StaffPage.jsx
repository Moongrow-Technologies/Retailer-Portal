import React, { useState, useEffect } from 'react';
import InviteStaffModal from '@/components/staff/InviteStaffModal';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getStaff, addStaffMember, subscribe } from '@/lib/appStore';
import { Send } from 'lucide-react';

export default function StaffPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [, forceUpdate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => subscribe(() => forceUpdate(n => n + 1)), []);

  const staff = getStaff();

  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === 'active').length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#0c0b0c] text-2xl font-bold">Staff</h1>
          <p className="text-sm text-[#5b616e] mt-2">{totalStaff} members · {activeStaff} active</p>
        </div>
        <Button
          onClick={() => setShowInvite(true)}
          variant="outline" className="bg-[#27272b] text-[#ffffff] px-6 py-2 text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:bg-accent hover:text-accent-foreground h-9 border-[#E2E0ED]">
          <Send className="w-4 h-4" />
          Invite staff
        </Button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
        {/* Column Header */}
        <div className="grid grid-cols-[1fr_120px_80px] px-6 py-3 bg-[#F7F7F7] border-b border-[#EBEBF0]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Staff Member</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c] text-center">Status</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c] text-right">Action</span>
        </div>
        {staff.map((member, idx) =>
        <div
          key={member.id}
          onClick={() => member.status === 'active' && navigate(`/staff/${member.id}`)}
          className={cn(
            "grid grid-cols-[1fr_120px_80px] items-center px-6 py-4 transition-colors",
            member.status === 'active' ? "cursor-pointer hover:bg-[#F5F3FC]" : "hover:bg-[#F5F3FC]",
            member.status === 'pending' && "opacity-75",
            idx !== staff.length - 1 && "border-b border-[#EBEBF0]"
          )}>
          
            {/* Avatar + Name + Store */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[hsl(var(--border))]">
                {member.avatar_url
                  ? <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-white text-base font-semibold">{member.name.charAt(0)}</div>
                }
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#0c0b0c]">{member.name}</p>
                <p className="text-sm text-[#5b616e]">{member.store}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex justify-center">
              {member.status === 'active'
                ? <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">Active</span>
                : <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EDE9F8] text-[#796EB2]">Pending</span>
              }
            </div>

            {/* Action */}
            <div className="flex justify-end">
              {member.status === 'active'
                ? <Link to={`/staff/${member.id}`} className="text-sm font-medium text-[#796EB2] hover:underline">View →</Link>
                : <button onClick={(e) => { e.stopPropagation(); setShowInvite(true); }} className="text-sm font-medium text-[#796EB2] hover:underline">Resend →</button>
              }
            </div>
          </div>
        )}
      </div>

      <InviteStaffModal open={showInvite} onClose={() => setShowInvite(false)} onInvite={(member) => addStaffMember(member)} />
    </div>);

}