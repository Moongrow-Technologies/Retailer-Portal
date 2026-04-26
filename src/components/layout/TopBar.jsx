import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import NotificationDropdown from '@/components/layout/NotificationDropdown';
import HelpDropdown from '@/components/layout/HelpDropdown';
import { ACTIVITIES } from '@/lib/sampleData';

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
  '/notifications': 'Notifications',
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
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [readCount, setReadCount] = useState(0);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const unreadCount = Math.max(0, ACTIVITIES.length - readCount);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  function handleMarkAllRead() {
    setReadCount(ACTIVITIES.length);
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center z-50 border-b border-[#EBEBF0]">
      {/* Logo area — same width as sidebar */}
      <div className="w-[220px] flex-shrink-0 flex items-center px-7 h-full">
        <Link to="/" className="flex flex-col gap-0.5">
          <img
            src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/f5253c7da_MoongrowLogo.png"
            alt="Moongrow"
            className="h-6 w-auto object-contain"
          />
          <div className="text-[10px] text-[#9490AA] uppercase tracking-widest leading-tight">Retailer Portal</div>
        </Link>
      </div>

      {/* Rest of header */}
      <div className="flex-1 flex items-center justify-between pl-6 pr-8 h-full">
      {/* Breadcrumb */}
       <div className="flex items-center gap-1.5 text-sm">
         {section && section !== label ? (
           <>
             <Link 
               to={`/${section.toLowerCase().replace(/\s+/g, '')}`}
               className="text-[#796EB2] font-medium hover:opacity-80 transition-opacity"
             >
               {section}
             </Link>
             <span className="text-[#C0BDCE]">›</span>
             <span className="text-[#7A7893]">{label}</span>
           </>
         ) : (
           <span className="text-[#7A7893] font-medium">{label}</span>
         )}
       </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            id="help-button"
            onClick={() => setShowHelp(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3FC] text-[#7A7893] transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          {showHelp && (
            <HelpDropdown onClose={() => setShowHelp(false)} />
          )}
        </div>
        <div className="relative">
          <button
            id="notification-bell"
            onClick={() => setShowNotifications(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3FC] text-[#7A7893] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#ef3e42] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown
              onClose={() => setShowNotifications(false)}
              onMarkAllRead={handleMarkAllRead}
              hasUnread={unreadCount > 0}
            />
          )}
        </div>
        <div ref={profileRef} className="relative pl-4 border-l border-[#EBEBF0]">
          <button
            onClick={() => setShowProfileMenu(v => !v)}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-[#0E0D1E] leading-tight">{user?.full_name || 'User'}</div>
              <div className="text-xs text-[#9490AA] leading-tight capitalize">{user?.role === 'admin' ? 'Admin' : ''}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#EDE9F8] flex items-center justify-center text-xs font-bold text-[#796EB2]">
              {initials}
            </div>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 top-11 w-44 bg-white border border-[#EBEBF0] rounded-xl shadow-lg py-1 z-50">
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#0E0D1E] hover:bg-[#F8F7FC] transition-colors"
              >
                <User className="w-4 h-4 text-[#796EB2]" />
                Profile
              </Link>
              <button
                onClick={() => base44.auth.logout()}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-[#F8F7FC] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}