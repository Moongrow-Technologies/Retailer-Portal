import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChangeEmailModal({ onClose }) {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-base font-bold text-[#0E0D1E] mb-4">Change Email Address</h3>
        <div className="flex flex-col gap-3">
          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">New Email Address</p>
            <Input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="you@example.com"
              className="border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none placeholder:text-[#C4C1D8]"
            />
          </div>
          <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">Confirm New Email Address</p>
            <Input
              type="email"
              value={confirmEmail}
              onChange={e => setConfirmEmail(e.target.value)}
              placeholder="you@example.com"
              className="border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none placeholder:text-[#C4C1D8]"
            />
          </div>
          <Button className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white font-semibold mt-1">
            Update Email
          </Button>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#9490AA] hover:text-[#796EB2] transition-colors text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}