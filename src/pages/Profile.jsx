import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';
import { STORE } from '@/lib/sampleData';

export default function Profile() {
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setAvatarUrl(file_url);
  };

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
    <>
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">My Profile</h1>
        <p className="text-sm text-[#7A7893] mt-1">Manage your personal details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">

        {/* Left card — identity */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-[#EDE9F8] flex items-center justify-center text-3xl font-bold text-[#796EB2] mb-3 overflow-hidden">
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              : initials}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#796EB2] hover:text-[#6A5FA3] transition-colors mb-5"
          >
            <Camera className="w-3.5 h-3.5" />
            Upload Photo
          </button>
          <h2 className="text-lg font-bold text-[#0E0D1E] leading-tight">{fullName || 'User'}</h2>
          <span className="mt-2 inline-block px-3 py-1 bg-[#EDE9F8] text-[#796EB2] text-xs font-semibold rounded-full capitalize">
            {user?.role || 'Admin'}
          </span>
          <p className="mt-2 text-sm text-[#9490AA]">{STORE.city}, Netherlands</p>
        </div>

        {/* Right card — personal details */}
        <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6">
          <h3 className="text-base font-semibold text-[#0E0D1E] mb-4">Personal Details</h3>

          <div className="flex flex-col gap-3">
            <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">Full Name</p>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none"
              />
            </div>

            <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">Email Address</p>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border-0 bg-transparent p-0 h-auto text-sm font-medium text-[#0E0D1E] focus-visible:ring-0 shadow-none"
              />
            </div>
            <button
              onClick={() => { setNewEmail(''); setConfirmEmail(''); setShowEmailModal(true); }}
              className="text-xs font-semibold text-[#796EB2] hover:text-[#6A5FA3] transition-colors text-left -mt-1"
            >
              Change Email →
            </button>

            <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">Role</p>
              <p className="text-sm font-medium text-[#0E0D1E] capitalize">{user?.role || 'Admin'}</p>
            </div>

            <div className="bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl px-4 py-3">
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-1">Location</p>
              <p className="text-sm font-medium text-[#0E0D1E]">{STORE.city}, Netherlands</p>
            </div>

            <Button className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white font-semibold mt-1">
              Save Changes
            </Button>
          </div>
        </div>

      </div>
    </div>

      {/* Change Email Modal */}

      {showEmailModal && (
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
                onClick={() => setShowEmailModal(false)}
                className="text-xs font-semibold text-[#9490AA] hover:text-[#796EB2] transition-colors text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}