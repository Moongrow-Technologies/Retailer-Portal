import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ProfileDropdown({ user, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        const avatar = document.getElementById('profile-avatar');
        if (avatar && avatar.contains(e.target)) return;
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E2E0ED] rounded-2xl shadow-lg z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[#EBEBF0]">
        <p className="text-sm font-semibold text-[#0E0D1E] truncate">{user?.full_name || 'User'}</p>
        <p className="text-xs text-[#9490AA] capitalize mt-0.5">{user?.role || 'Store Manager'}</p>
      </div>

      <div className="p-2 flex flex-col gap-1">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#F8F7FC] transition-colors text-sm text-[#0E0D1E]"
        >
          <User className="w-4 h-4 text-[#796EB2]" />
          My Profile
        </Link>
        <button
          onClick={() => { onClose(); base44.auth.logout(); }}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm text-red-400 w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}