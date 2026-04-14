import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, HelpCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import NotificationDropdown from './NotificationDropdown';
import HelpDropdown from './HelpDropdown';
import ProfileDropdown from './ProfileDropdown';

const routeLabels = {
  '/': 'Dashboard',
  '/wallet': 'Wallet',
  '/campaigns': 'Campaigns',
  '/campaigns/new': 'New Campaign',
  '/analytics': 'Analytics',
  '/leaderboard': 'Leaderboard',
  '/bonuses': 'Bonuses',
  '/bonuses/new': 'New Bonus',
  '/staff': 'Staff',
  '/settings': 'Settings',
};

function getPageLabel(pathname) {
  if (routeLabels[pathname]) return routeLabels[pathname];
  if (pathname.startsWith('/campaigns/')) return 'Campaign Detail';
  if (pathname.startsWith('/staff/')) return 'Staff Detail';
  return '';
}

function getSection(pathname) {
  if (pathname === '/') return null;
  const top = '/' + pathname.split('/')[1];
  return routeLabels[top] || null;
}

export default function TopBar() {
  const location = useLocation();
  const section = getSection(location.pathname);
  const label = getPageLabel(location.pathname);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="fixed top-0 left-[220px] right-0 h-14 bg-white border-b border-[#EBEBF0] flex items-center justify-between px-8 z-40">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        {section && section !== label ? (
          <>
            <span className="text-[#796EB2] font-medium">{section}</span>
            <span className="text-[#C0BDCE]">›</span>
            <span className="text-[#7A7893]">{label}</span>
          </>
        ) : (
          <span className="text-[#7A7893] font-medium">{label}</span>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            id="help-button"
            onClick={() => setShowHelp(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3FC] text-[#7A7893] transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          {showHelp && <HelpDropdown onClose={() => setShowHelp(false)} />}
        </div>
        <div className="relative">
          <button
            id="notification-bell"
            onClick={() => setShowNotifications(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3FC] text-[#7A7893] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#796EB2] rounded-full"></span>
          </button>
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>
        <div className="relative flex items-center gap-2.5 pl-2 border-l border-[#EBEBF0]">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-[#0E0D1E] leading-tight">{user?.full_name || 'User'}</div>
            <div className="text-xs text-[#9490AA] leading-tight capitalize">{user?.role || 'Store Manager'}</div>
          </div>
          <button
            id="profile-avatar"
            onClick={() => setShowProfile(v => !v)}
            className="w-8 h-8 rounded-full bg-[#EDE9F8] flex items-center justify-center text-xs font-bold text-[#796EB2] hover:ring-2 hover:ring-[#796EB2]/30 transition-all"
          >
            {initials}
          </button>
          {showProfile && <ProfileDropdown user={user} onClose={() => setShowProfile(false)} />}
        </div>
      </div>
    </header>
  );
}