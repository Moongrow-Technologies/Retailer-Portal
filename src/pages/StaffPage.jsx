import React, { useState } from 'react';
import InviteStaffModal from '@/components/staff/InviteStaffModal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { STAFF } from '@/lib/sampleData';

export default function StaffPage() {
  const [showInvite, setShowInvite] = useState(false);

  const totalStaff = STAFF.length;
  const activeStaff = STAFF.filter((s) => s.status === 'active').length;

  // Avatar color mapping
  const avatarColorMap = {
    's1': 'bg-amber-500',
    's2': 'bg-blue-600',
    's3': 'bg-emerald-600',
    's4': 'bg-slate-500',
    's5': 'bg-slate-400'
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#0E0D1E] text-2xl font-bold">Staff</h1>
          <p className="text-sm text-[#7A7893] mt-2">{totalStaff} members · {activeStaff} active</p>
        </div>
        <Button
          onClick={() => setShowInvite(true)}
          variant="outline"
          className="font-semibold border-[#E2E0ED] text-[#0E0D1E] rounded-lg px-6">
          
          Invite staff
        </Button>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
        {STAFF.map((staff, idx) =>
        <div
          key={staff.id}
          className={cn(
            "flex items-center justify-between px-6 py-5",
            staff.status === 'pending' && "opacity-75",
            idx !== STAFF.length - 1 && "border-b border-[#EBEBF0]"
          )}>
          
            {/* Avatar + Name + Role */}
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-[hsl(var(--muted-foreground))] text-white text-lg font-semibold rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">


              
                {staff.name.split(' ').map((n) => n[0]).join('').slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#0E0D1E]">{staff.name}</p>
                <p className="text-sm text-[#9490AA] capitalize">
                  {staff.role} · {staff.store}
                </p>
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {staff.status === 'active' ?
            <>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    Active
                  </span>
                  <Link to={`/staff/${staff.id}`} className="text-sm font-medium text-[#796EB2] hover:underline">
                    View →
                  </Link>
                </> :

            <>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                    Pending
                  </span>
                  <button className="text-sm font-medium text-amber-500 hover:underline">
                    Resend →
                  </button>
                </>
            }
            </div>
          </div>
        )}
      </div>

      <InviteStaffModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>);

}