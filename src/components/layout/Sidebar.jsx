import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Wallet, Megaphone, BarChart3, Trophy,
  Gift, Users, Settings, LogOut, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: Gift, label: 'Bonuses', path: '/bonuses', sub: true },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: Users, label: 'Staff', path: '/staff' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white shadow-[2px_0_4px_0_rgba(0,0,0,0.006)] flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-5">
        <Link to="/" className="flex flex-col gap-0.5">
          <img
            src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/f5253c7da_MoongrowLogo.png"
            alt="Moongrow"
            className="h-6 w-auto object-contain"
          />
          <div className="text-[10px] text-[#9490AA] uppercase tracking-widest leading-tight">Retailer Portal</div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "text-[#796EB2]"
                  : "text-[#7A7893] hover:text-[#796EB2]"
              )}
            >
              <item.icon className={cn("w-[20px] h-[20px] flex-shrink-0", active ? "text-[#796EB2]" : "text-[#9490AA]")} />
              <span className={cn("font-semibold", active ? "text-[#796EB2]" : "text-[#4A4761]")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#EBEBF0]">
        <button
          onClick={() => base44.auth.logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#7A7893] hover:bg-[#F5F3FC] hover:text-[#796EB2] transition-all w-full"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}