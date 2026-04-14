import React, { useState } from 'react';
import StaffRow from '@/components/staff/StaffRow';
import InviteStaffModal from '@/components/staff/InviteStaffModal';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { STAFF } from '@/lib/sampleData';

export default function StaffPage() {
  const [showInvite, setShowInvite] = useState(false);
  const sorted = [...STAFF].sort((a, b) => b.total_commissions - a.total_commissions);

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Staff</h1>
          <p className="text-sm text-[#7A7893] mt-1">Manage your team members and track their performance.</p>
        </div>
        <Button onClick={() => setShowInvite(true)} className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 font-semibold">
          <UserPlus className="w-4 h-4" /> Invite Staff
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm">
        <div className="px-6 py-4 border-b border-[#EBEBF0]">
          <h3 className="text-base font-semibold text-[#0E0D1E]">Team Members</h3>
        </div>
        <div className="p-4 space-y-3">
          {sorted.map((staff, i) => (
            <StaffRow key={staff.id} staff={staff} rank={i + 1} />
          ))}
        </div>
      </div>

      <InviteStaffModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}