import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Wallet, Megaphone, BarChart3, Trophy,
  Award, Users, Settings, LogOut, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
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
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white border-r border-[#EBEBF0] flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-[#EBEBF0]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#796EB2] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-[15px] text-[#0E0D1E] tracking-tight leading-none">moongrow</div>
            <div className="text-[10px] text-[#9490AA] uppercase tracking-widest leading-tight">Retailer Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#EDE9F8] text-[#796EB2]"
                  : "text-[#4A4761] hover:bg-[#F5F3FC] hover:text-[#796EB2]"
              )}
            >
              <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", active ? "text-[#796EB2]" : "text-[#7A7893]")} />
              <span>{item.label}</span>
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