import React, { useState } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { ShoppingCart, Pause, UserPlus, Wallet, Trophy, Megaphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACTIVITIES } from '@/lib/sampleData';
import { useNavigate } from 'react-router-dom';

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

const typeToPath = {
  sale: '/analytics',
  campaign_paused: '/campaigns',
  campaign_resumed: '/campaigns',
  campaign_created: '/campaigns',
  bonus_created: '/bonuses',
  bonus_completed: '/bonuses',
  staff_joined: '/staff',
  top_up: '/wallet',
  payout: '/wallet',
};

const TABS = ['All', 'Sales', 'Campaigns', 'Bonuses', 'Staff'];

function groupByDate(items) {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  items.forEach(a => {
    const d = new Date(a.created_date);
    if (isToday(d)) groups.Today.push(a);
    else if (isYesterday(d)) groups.Yesterday.push(a);
    else groups.Earlier.push(a);
  });
  return groups;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [dismissed, setDismissed] = useState(new Set());
  const [read, setRead] = useState(new Set());

  // Seed first 2 as unread for demo
  const unreadIds = new Set(ACTIVITIES.slice(0, 2).map((_, i) => i));

  const visible = ACTIVITIES
    .map((a, i) => ({ ...a, _id: i }))
    .filter(a => !dismissed.has(a._id))
    .filter(a => activeTab === 'All' || typeToTab[a.type] === activeTab);

  const groups = groupByDate(visible);

  const hasUnread = visible.some(a => unreadIds.has(a._id) && !read.has(a._id));

  const markAllRead = () => {
    setRead(new Set(visible.map(a => a._id)));
  };

  return (
    <div className="max-w-2xl">
      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">Notifications</h1>
        <p className="text-sm text-[#7A7893] mt-1">All recent activity and alerts.</p>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-1.5 flex gap-1 mb-5">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 text-sm font-medium py-1.5 rounded-lg transition-colors',
              activeTab === tab
                ? 'bg-[#EDE9F8] text-[#796EB2]'
                : 'text-[#7A7893] hover:text-[#0E0D1E] hover:bg-[#F8F7FC]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mark all as read */}
      {hasUnread && (
        <div className="flex justify-end mb-3">
          <button
            onClick={markAllRead}
            className="text-xs font-medium text-[#796EB2] hover:underline"
          >
            Mark all as read
          </button>
        </div>
      )}

      {/* Grouped notifications */}
      <div className="flex flex-col gap-6">
        {Object.entries(groups).map(([label, items]) => {
          if (!items.length) return null;
          return (
            <div key={label}>
              <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide mb-2">{label}</p>
              <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-4 flex flex-col gap-2">
                {items.map((n) => {
                  const Icon = iconMap[n.type] || ShoppingCart;
                  const isUnread = unreadIds.has(n._id) && !read.has(n._id);
                  return (
                    <div
                      key={n._id}
                      onClick={() => navigate(typeToPath[n.type] || '/')}
                      className="flex items-start gap-3 px-3 py-2.5 bg-background border border-[#E2E0ED] rounded-xl cursor-pointer hover:bg-[#F5F3FC] transition-colors"
                    >
                      {/* Unread dot */}
                      <div className="flex items-center self-center w-2 flex-shrink-0">
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-[#796EB2] block" />
                        )}
                      </div>

                      {/* Icon */}
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', colorMap[n.type] || 'bg-[#EDE9F8] text-[#796EB2]')}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#0E0D1E] leading-snug">{n.message}</p>
                        <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(n.created_date), 'MMM d, h:mm a')}</p>
                      </div>

                      {/* Dismiss */}
                      <button
                        onClick={() => setDismissed(prev => new Set([...prev, n._id]))}
                        className="text-[#C4C0D6] hover:text-[#7A7893] transition-colors flex-shrink-0 mt-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-8 text-center text-sm text-[#9490AA]">
            No notifications.
          </div>
        )}
      </div>
    </div>
  );
}