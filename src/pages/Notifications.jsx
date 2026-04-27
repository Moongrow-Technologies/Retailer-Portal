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
  const [unreadIds, setUnreadIds] = useState(new Set(ACTIVITIES.slice(0, 2).map((_, i) => i)));

  const visible = ACTIVITIES
    .map((a, i) => ({ ...a, _id: i }))
    .filter(a => !dismissed.has(a._id))
    .filter(a => activeTab === 'All' || typeToTab[a.type] === activeTab);

  const groups = groupByDate(visible);

  const hasUnread = visible.some(a => unreadIds.has(a._id) && !read.has(a._id));

  const markAllRead = () => {
    setUnreadIds(new Set());
  };

  const markOneRead = (id) => {
    setUnreadIds(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[#0c0b0c] text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-[#5b616e] mt-2">All recent activity and alerts</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0.5 bg-[#F4F3F4] rounded-xl p-1 mb-6">
         {TABS.map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               'px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap',
               activeTab === tab
                 ? 'bg-white text-[#12121f] shadow-sm'
                 : 'text-[#5b616e] hover:text-[#12121f]'
             )}
           >
             {tab}
           </button>
         ))}
       </div>

      {/* Mark all as read */}
      {hasUnread && (
        <div className="flex justify-end mb-4">
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-[#796EB2] hover:text-[#6A5FA3] transition-colors"
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
              <p className="text-xs font-semibold text-[#5b616e] uppercase tracking-wide mb-3">{label}</p>
              <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 flex flex-col">
                {items.map((n, idx) => {
                  const Icon = iconMap[n.type] || ShoppingCart;
                  const isUnread = unreadIds.has(n._id);
                  return (
                    <div
                      key={n._id}
                      onClick={() => { markOneRead(n._id); navigate(typeToPath[n.type] || '/'); }}
                      className={`flex items-start gap-3 px-3 py-3 rounded-lg cursor-pointer hover:bg-[#F5F3FC] transition-colors ${idx !== items.length - 1 ? 'border-b border-[#EBEBF0]' : ''}`}
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
          <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-8 text-center text-sm text-[#5b616e]">
            No notifications.
          </div>
        )}
      </div>
    </div>
  );
}