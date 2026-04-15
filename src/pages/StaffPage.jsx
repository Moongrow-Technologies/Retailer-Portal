import React, { useState } from 'react';
import StaffCard from '@/components/staff/StaffCard';
import InviteStaffModal from '@/components/staff/InviteStaffModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STAFF } from '@/lib/sampleData';

export default function StaffPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  // Get unique locations and roles
  const locations = ['all', ...new Set(STAFF.map(s => s.store))];
  const roles = ['all', ...new Set(STAFF.map(s => s.role))];

  // Filter staff
  const filtered = STAFF.filter(staff => {
    const locMatch = filterLocation === 'all' || staff.store === filterLocation;
    const roleMatch = filterRole === 'all' || staff.role === filterRole;
    return locMatch && roleMatch;
  });

  const sorted = [...filtered].sort((a, b) => b.total_commissions - a.total_commissions);

  // Calculate stats
  const totalStaff = STAFF.length;
  const activeStaff = STAFF.filter(s => s.status === 'active').length;
  const pendingStaff = STAFF.filter(s => s.status === 'pending').length;
  const totalCommissionThisMonth = STAFF.reduce((sum, s) => sum + s.total_commissions, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Staff</h1>
          <p className="text-sm text-[#7A7893] mt-1">Manage your team members and track their performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-40 border-[#E2E0ED] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.slice(1).map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-40 border-[#E2E0ED] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {roles.slice(1).map(role => (
                <SelectItem key={role} value={role} className="capitalize">{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowInvite(true)}
            className="gap-2 font-semibold bg-[#534AB7] hover:bg-[#4A3FA3] text-white rounded-xl"
          >
            <Plus className="w-4 h-4" /> Invite staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E2E0ED] px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-lg font-bold text-[#0E0D1E]">{totalStaff}</span>
          <span className="text-xs text-[#9490AA] font-medium">Total staff</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E0ED] px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-lg font-bold text-emerald-600">{activeStaff}</span>
          <span className="text-xs text-[#9490AA] font-medium">Active</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E0ED] px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-lg font-bold text-amber-500">{pendingStaff}</span>
          <span className="text-xs text-[#9490AA] font-medium">Pending invite</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E0ED] px-4 py-2.5 flex items-center gap-2.5">
          <span className="text-lg font-bold text-[#0E0D1E]">€{totalCommissionThisMonth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="text-xs text-[#9490AA] font-medium">Total commission this month</span>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-3 gap-4">
        {sorted.map(staff => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
        {sorted.length === 0 && (
          <div className="col-span-3 bg-white rounded-2xl border-2 border-dashed border-[#E2E0ED] p-12 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-[#796EB2] mb-1">Invite a team member</p>
              <p className="text-sm text-[#9490AA]">Add staff to start tracking their performance</p>
            </div>
          </div>
        )}
        {sorted.length > 0 && sorted.length % 3 !== 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#E2E0ED] p-12 flex flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#796EB2] mb-1">Invite a team member</p>
                <p className="text-xs text-[#9490AA]">Add staff to start tracking their performance</p>
              </div>
              <Button
                onClick={() => setShowInvite(true)}
                className="gap-2 font-semibold bg-[#534AB7] hover:bg-[#4A3FA3] text-white rounded-xl"
              >
                <Plus className="w-4 h-4" /> Invite staff
              </Button>
            </div>
          </div>
        )}
      </div>

      <InviteStaffModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}