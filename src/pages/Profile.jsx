import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';
import { STORE } from '@/lib/sampleData';

export default function Profile() {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">My Profile</h1>
        <p className="text-sm text-[#7A7893] mt-1">Manage your personal details.</p>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#EDE9F8] flex items-center justify-center text-2xl font-bold text-[#796EB2] mb-3">
          {initials}
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-[#796EB2] hover:text-[#6A5FA3] transition-colors">
          <Camera className="w-3.5 h-3.5" />
          Upload Photo
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-5">
        <div className="flex flex-col gap-4">

          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <Label className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Full Name</Label>
            <Input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="mt-1 border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none"
            />
          </div>

          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <Label className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Email Address</Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none"
            />
          </div>

          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <Label className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Role</Label>
            <p className="mt-1 text-sm font-medium text-[#0E0D1E] capitalize">{user?.role || 'Store Manager'}</p>
          </div>

          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <Label className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Location</Label>
            <p className="mt-1 text-sm font-medium text-[#0E0D1E]">{STORE.city}, Netherlands</p>
          </div>

          <Button className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white font-semibold mt-1">
            Save Changes
          </Button>

        </div>
      </div>
    </div>
  );
}