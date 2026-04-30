import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';

const DashboardIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="2" y="2" width="8" height="8" rx="1.5"/><rect x="14" y="2" width="8" height="8" rx="1.5"/><rect x="2" y="14" width="8" height="8" rx="1.5"/><rect x="14" y="14" width="8" height="8" rx="1.5"/></svg>;
const CampaignsIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3 12c0-3.315 2.239-6.13 5.295-6.938.07-.89.789-1.592 1.68-1.592.892 0 1.611.702 1.681 1.592C13.761 5.87 16 8.685 16 12v3h2V9c0-4.418-3.582-8-8-8S2 4.582 2 9v10h2v-7z"/><circle cx="16" cy="15" r="1.5"/><rect x="18" y="14" width="1" height="3"/><rect x="20" y="13" width="1" height="4"/></svg>;
const BonusesIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L15.09 8.26H22L17.55 12.74L19.64 19L12 14.52L4.36 19L6.45 12.74L2 8.26H8.91L12 2Z"/></svg>;
const LeaderboardIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L14.39 9.26H22L16.12 13.88L18.51 21.1L12 16.49L5.49 21.1L7.88 13.88L2 9.26H9.61L12 2Z"/><rect x="3" y="17" width="2" height="5"/><rect x="8" y="14" width="2" height="8"/><rect x="13" y="18" width="2" height="4"/></svg>;
const AnalyticsIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="3" y="18" width="2" height="4" rx="1"/><rect x="8" y="12" width="2" height="10" rx="1"/><rect x="13" y="6" width="2" height="16" rx="1"/><rect x="18" y="2" width="2" height="20" rx="1"/></svg>;
const WalletIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z"/><path d="M18 2C18 2 16 4 14 4H4C2.89543 4 2 4.89543 2 6H20C20 4.89543 19.1046 4 18 4V2Z" opacity="0.7"/></svg>;
const StaffIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M8 11C5.791 11 4 12.791 4 15V20H12V15C12 12.791 10.209 11 8 11Z"/><path d="M16 11C13.791 11 12 12.791 12 15V20H20V15C20 12.791 18.209 11 16 11Z"/></svg>;
const SettingsIcon = (props) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 8.5C10.0670833 8.5 8.5 10.0670833 8.5 12C8.5 13.9329167 10.0670833 15.5 12 15.5C13.9329167 15.5 15.5 13.9329167 15.5 12C15.5 10.0670833 13.9329167 8.5 12 8.5Z"/><path d="M12 2C11.7239 2 11.5 2.22386 11.5 2.5V4.34C10.4327 4.65322 9.45323 5.19027 8.625 5.89063L7.20313 4.46875C7.00556 4.27118 6.69444 4.27118 6.49688 4.46875L4.46875 6.49688C4.27118 6.69444 4.27118 7.00556 4.46875 7.20313L5.89063 8.625C5.19027 9.45323 4.65322 10.4327 4.34 11.5H2.5C2.22386 11.5 2 11.7239 2 12C2 12.2761 2.22386 12.5 2.5 12.5H4.34C4.65322 13.5673 5.19027 14.5468 5.89063 15.375L4.46875 16.7969C4.27118 16.9944 4.27118 17.3056 4.46875 17.5031L6.49688 19.5313C6.69444 19.7288 7.00556 19.7288 7.20313 19.5313L8.625 18.1094C9.45323 18.8097 10.4327 19.3468 11.5 19.66V21.5C11.5 21.7761 11.7239 22 12 22C12.2761 22 12.5 21.7761 12.5 21.5V19.66C13.5673 19.3468 14.5468 18.8097 15.375 18.1094L16.7969 19.5313C16.9944 19.7288 17.3056 19.7288 17.5031 19.5313L19.5313 17.5031C19.7288 17.3056 19.7288 16.9944 19.5313 16.7969L18.1094 15.375C18.8097 14.5468 19.3468 13.5673 19.66 12.5H21.5C21.7761 12.5 22 12.2761 22 12C22 11.7239 21.7761 11.5 21.5 11.5H19.66C19.3468 10.4327 18.8097 9.45323 18.1094 8.625L19.5313 7.20313C19.7288 7.00556 19.7288 6.69444 19.5313 6.49688L17.5031 4.46875C17.3056 4.27118 16.9944 4.27118 16.7969 4.46875L15.375 5.89063C14.5468 5.19027 13.5673 4.65322 12.5 4.34V2.5C12.5 2.22386 12.2761 2 12 2Z"/></svg>;

const navItems = [
{ icon: DashboardIcon, label: 'Dashboard', path: '/' },
{ icon: CampaignsIcon, label: 'Campaigns', path: '/campaigns' },
{ icon: BonusesIcon, label: 'Bonuses', path: '/bonuses', sub: true },
{ icon: LeaderboardIcon, label: 'Leaderboard', path: '/leaderboard' },
{ icon: AnalyticsIcon, label: 'Analytics', path: '/analytics' },
{ icon: WalletIcon, label: 'Wallet', path: '/wallet' },
{ icon: StaffIcon, label: 'Staff', path: '/staff' },
{ icon: SettingsIcon, label: 'Settings', path: '/settings' }];


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
              
              <item.icon className={cn("w-[20px] h-[20px] flex-shrink-0", active ? "text-[#796EB2]" : "text-[#9490AA]")} />
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