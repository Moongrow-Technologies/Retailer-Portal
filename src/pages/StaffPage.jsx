import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import StaffRow from '@/components/staff/StaffRow';
import InviteStaffModal from '@/components/staff/InviteStaffModal';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { STAFF } from '@/lib/sampleData';

export default function StaffPage() {
  const [showInvite, setShowInvite] = useState(false);
  const sorted = [...STAFF].sort((a, b) => b.total_commissions - a.total_commissions);

  return (
    <div>
      <PageHeader title="Staff" description="Manage your team members">
        <Button onClick={() => setShowInvite(true)} className="bg-primary hover:bg-primary/90 gap-2">
          <UserPlus className="w-4 h-4" /> Invite Staff
        </Button>
      </PageHeader>

      {sorted.length === 0 ? (
        <EmptyState icon={Users} title="No staff yet" description="Invite your team members to start tracking performance." actionLabel="Invite Staff" onAction={() => setShowInvite(true)} />
      ) : (
        <div className="space-y-2">
          {sorted.map((staff, i) => (
            <StaffRow key={staff.id} staff={staff} rank={i + 1} />
          ))}
        </div>
      )}

      <InviteStaffModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}