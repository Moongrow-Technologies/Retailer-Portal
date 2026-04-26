import React, { useState } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { ShoppingCart, Pause, UserPlus, Wallet, Trophy, Megaphone, X, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const TABS = [
  { key: 'All', label: 'All' },
  { key: 'Sales', label: 'Sales' },
  { key: 'Campaigns', label: 'Campaigns' },
  { key: 'Bonuses', label: 'Bonuses' },
  { key: 'Staff', label: 'Staff' },
];

function getDateLabel(dateStr) {
  const d = new Date(dateStr);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return 'Earlier';
}

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [dismissed, setDismissed] = useState(new Set());
  const [read, setRead] = useState(new Set());

  const unreadIds = new Set(ACTIVITIES.slice(0, 2).map((_, i) => i));

  const visible = ACTIVITIES
    .map((a, i) => ({ ...a, _id: i }))
    .filter(a => !dismissed.has(a._id))
    .filter(a => activeTab === 'All' || typeToTab[a.type] === activeTab);

  const hasUnread = visible.some(a => unreadIds.has(a._id) && !read.has(a._id));

  const markAllRead = () => setRead(new Set(visible.map(a => a._id)));

  // Group by date label, preserving order
  const grouped = visible.reduce((acc, n) => {
    const label = getDateLabel(n.created_date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(n);
    return acc;
  }, {});
  const groupOrder = ['Today', 'Yesterday', 'Earlier'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c0b0c]">Notifications</h1>
          <p className="text-sm text-[#5b616e] mt-1">All recent activity and alerts.</p>
        </div>
        {hasUnread && (
          <Button
            onClick={markAllRead}
            variant="outline"
            className="gap-2 text-sm font-semibold border-[#EBEBF0]"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center mb-6 w-fit bg-[#F4F3F4] rounded-2xl p-1 gap-0.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'px-4 py-1.5 rounded-xl text-sm font-semibold transition-all',
              activeTab === t.key
                ? 'bg-white text-[#12121f] shadow-sm'
                : 'text-[#5b616e] hover:text-[#12121f]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-12 text-center">
          <p className="text-[#5b616e] text-sm">No notifications here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groupOrder.map(label => {
            const items = grouped[label];
            if (!items?.length) return null;
            return (
              <div key={label}>
                <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-widest mb-3">{label}</p>
                <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[24px_40px_1fr_140px_32px] px-6 py-3 bg-[#F7F6FB] border-b border-[#EBEBF0] items-center">
                    <span />
                    <span />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Message</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0c0b0c]">Time</span>
                    <span />
                  </div>

                  {items.map((n, idx) => {
                    const Icon = iconMap[n.type] || ShoppingCart;
                    const isUnread = unreadIds.has(n._id) && !read.has(n._id);
                    return (
                      <div key={n._id}>
                        <div
                          className="grid grid-cols-[24px_40px_1fr_140px_32px] px-6 py-4 items-center hover:bg-[#FAFAF9] transition-colors cursor-pointer gap-3"
                          onClick={() => navigate(typeToPath[n.type] || '/')}
                        >
                          {/* Unread dot */}
                          <div className="flex items-center justify-center">
                            {isUnread && <span className="w-2 h-2 rounded-full bg-[#796EB2] block" />}
                          </div>

                          {/* Icon */}
                          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', colorMap[n.type] || 'bg-[#EDE9F8] text-[#796EB2]')}>
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Message */}
                          <p className={cn('text-sm leading-snug', isUnread ? 'font-semibold text-[#0c0b0c]' : 'text-[#0c0b0c]')}>
                            {n.message}
                          </p>

                          {/* Time */}
                          <p className="text-xs text-[#9490AA]">
                            {format(new Date(n.created_date), 'MMM d, h:mm a')}
                          </p>

                          {/* Dismiss */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setDismissed(prev => new Set([...prev, n._id])); }}
                            className="text-[#C4C0D6] hover:text-[#7A7893] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {idx < items.length - 1 && <div className="h-px bg-[#F0EFF5] mx-6" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}