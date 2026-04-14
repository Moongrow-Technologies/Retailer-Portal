import React from 'react';
import { ShoppingCart, Pause, UserPlus, Wallet, Trophy, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const iconMap = {
  sale: ShoppingCart,
  campaign_paused: Pause,
  campaign_resumed: Megaphone,
  campaign_created: Megaphone,
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
  staff_joined: 'bg-blue-50 text-blue-600',
  top_up: 'bg-emerald-50 text-emerald-600',
  bonus_completed: 'bg-amber-50 text-amber-600',
  payout: 'bg-primary/10 text-primary',
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity, i) => {
          const Icon = iconMap[activity.type] || ShoppingCart;
          return (
            <div key={i} className="flex items-start gap-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-2xl px-4 py-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", colorMap[activity.type] || 'bg-[#EDE9F8] text-[#796EB2]')}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm text-[#0E0D1E] leading-snug">{activity.message}</p>
                <p className="text-xs text-[#9490AA] mt-0.5">
                  {format(new Date(activity.created_date), 'MMM d, h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}