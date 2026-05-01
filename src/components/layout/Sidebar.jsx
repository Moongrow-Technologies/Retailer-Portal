import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Megaphone, BarChart3, Trophy,
  Gift, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';

function WalletNavIcon({ active }) {
  const color = active ? '#796EB2' : '#9490AA';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="15" rx="3" fill={color} opacity="0.2"/>
      <rect x="2" y="5" width="20" height="15" rx="3" stroke={color} strokeWidth="1.8"/>
      <rect x="14" y="11" width="6" height="4" rx="1.5" fill={color}/>
      <line x1="2" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

const navItems = [
{ icon: LayoutDashboard, label: 'Dashboard', path: '/' },
{ icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
{ icon: Gift, label: 'Bonuses', path: '/bonuses', sub: true },
{ icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
{ icon: BarChart3, label: 'Analytics', path: '/analytics' },
{ icon: null, label: 'Wallet', path: '/wallet' },
{ icon: Users, label: 'Staff', path: '/staff' },
{ icon: Settings, label: 'Settings', path: '/settings' }];


export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-56px)] w-[200px] bg-white border-r border-[#EBEBF0] flex flex-col z-40">
      {/* Navigation */}
      <nav className="flex-1 pb-4 px-5 space-y-1 overflow-y-auto" style={{paddingTop: '27px'}}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active ?
                "text-[#796EB2]" :
                "text-[#7A7893] hover:text-[#796EB2] hover:bg-[#f7f7fb]"
              )}>
              
              {item.icon
                ? <item.icon className={cn("w-[20px] h-[20px] flex-shrink-0", active ? "text-[#796EB2]" : "text-[#9490AA]")} />
                : <WalletNavIcon active={active} />
              }
              <span className={cn("font-medium", active ? "text-[#796EB2]" : "text-[#4A4761]")}>{item.label}</span>
            </Link>);

        })}
      </nav>

      {/* Footer */}
      <div className="px-8 pb-3 pt-1">
        <div className="text-[10px] text-[#9490AA] uppercase tracking-widest leading-tight">Retailer Portal</div>
      </div>
      <div className="px-5 py-3 border-t border-[#EBEBF0]">
        <button
          onClick={() => base44.auth.logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#7A7893] hover:bg-[#F5F3FC] hover:text-[#796EB2] transition-all w-full">
          
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>);

}