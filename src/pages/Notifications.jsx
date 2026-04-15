import React, { useState } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { ShoppingCart, Pause, UserPlus, Wallet, Trophy, Megaphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACTIVITIES } from '@/lib/sampleData';

const iconMap = {
  sale: ShoppingCart,
  campaign_paused: Pause,
  campaign_resumed: Megaphone,
  campaign_created: Megaphone,
  bonus_created: Trophy,
  staff_joined: UserPlus,
  top_up: Wallet,
  bonus_completed: Trophy,
  payout: Wallet,
};

const colorMap = {
  sale: 'bg-emerald-50 text-emerald-600',
  campaign_paused: 'bg-amber-50 text-amber-600',
  campaign_resumed: 'bg-blue-50 text-blue-600',
  campaign_created: 'bg-primary/10 text-primary',
  bonus_created: 'bg-amber-50 text-amber-600',
  staff_joined: 'bg-blue-50 text-blue-600',
  top_up: 'bg-emerald-50 text-emerald-600',
  bonus_completed: 'bg-amber-50 text-amber-600',
  payout: 'bg-primary/10 text-primary',
};

const typeToTab = {
  sale: 'Sales',
  campaign_paused: 'Campaigns',
  campaign_resumed: 'Campaigns',
  campaign_created: 'Campaigns',
  bonus_created: 'Bonuses',
  bonus_completed: 'Bonuses',
  staff_joined: 'Staff',
  top_up: 'Sales',
  payout: 'Sales',
};

const TABS = ['All', 'Sales', 'Campaigns', 'Bonuses', 'Staff'];

function groupByDate(activities) {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  activities.forEach(a => {
    const d = new Date(a.created_date);
    if (isToday(d)) groups.Today.push(a);
    else if (isYesterday(d)) groups.Yesterday.push(a);
    else groups.Earlier.push(a);
  });
  return groups;
}

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All');
  const [dismissed, setDismissed] = useState(new Set());
  const [read, setRead] = useState(new Set());

  // ~half unread for demo
  const unreadIds = new Set(ACTIVITIES.slice(0, Math.ceil(ACTIVITIES.length / 2)).map((_, i) => i));

  const visible = ACTIVITIES
    .map((a, i) => ({ ...a, _idx: i }))
    .filter(a => !dismissed.has(a._idx))
    .filter(a => activeTab === 'All' || typeToTab[a.type] === activeTab);

  const markAllRead = () => {
    const newRead = new Set(read);
    visible.forEach(a => newRead.add(a._idx));
    setRead(newRead);
  };

  const dismiss = (idx) => setDismissed(prev => new Set([...prev, idx]));

  const isUnread = (idx) => unreadIds.has(idx) && !read.has(idx);

  const groups = groupByDate(visible);

  return (
    <div className="max-w-2xl">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">Notifications</h1>
        <p className="text-sm text-[#7A7893] mt-1">All recent activity and alerts.</p>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-1.5 flex gap-1 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
              activeTab === tab
                ? "bg-[#EDE9F8] text-[#5B4FCF]"
                : "text-[#7A7893] hover:text-[#0E0D1E]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mark all as read */}
      <div className="flex justify-end mb-3">
        <button onClick={markAllRead} className="text-xs font-medium text-[#796EB2] hover:text-[#5B4FCF] transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Notification groups */}
      <div className="flex flex-col gap-6">
        {Object.entries(groups).map(([label, items]) => {
          if (!items.length) return null;
          return (
            <div key={label}>
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-2">{label}</p>
              <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-4 flex flex-col gap-2">
                {items.map((n) => {
                  const Icon = iconMap[n.type] || ShoppingCart;
                  const unread = isUnread(n._idx);
                  return (
                    <div key={n._idx} className="flex items-start gap-3 px-3 py-2.5 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                      {/* Unread dot */}
                      <div className="flex-shrink-0 w-2 flex items-center justify-center pt-2">
                        {unread && <div className="w-2 h-2 rounded-full bg-[#796EB2]" />}
                      </div>

                      {/* Icon */}
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", colorMap[n.type] || 'bg-[#EDE9F8] text-[#796EB2]')}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm leading-snug", unread ? "text-[#0E0D1E] font-medium" : "text-[#3D3B52]")}>{n.message}</p>
                        <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(n.created_date), 'MMM d, h:mm a')}</p>
                      </div>

                      {/* Dismiss */}
                      <button
                        onClick={() => dismiss(n._idx)}
                        className="flex-shrink-0 p-1 rounded-md text-[#9490AA] hover:text-[#0E0D1E] hover:bg-[#EBEBF0] transition-colors mt-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-10 text-center">
            <p className="text-sm text-[#9490AA]">No notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}