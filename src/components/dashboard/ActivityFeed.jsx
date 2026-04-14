import React, { useState } from 'react';
import { ShoppingCart, Pause, UserPlus, Wallet, Trophy, Megaphone, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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
  campaign_created: 'bg-[#EDE9F8] text-[#796EB2]',
  staff_joined: 'bg-blue-50 text-blue-600',
  top_up: 'bg-emerald-50 text-emerald-600',
  bonus_completed: 'bg-amber-50 text-amber-600',
  payout: 'bg-[#EDE9F8] text-[#796EB2]',
};

const PREVIEW_COUNT = 5;

export default function ActivityFeed({ activities }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? activities : activities.slice(0, PREVIEW_COUNT);

  return (
    <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Recent Activity</h3>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#F5F3FC] flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-[#C0BADA]" />
          </div>
          <p className="text-sm font-medium text-[#0E0D1E]">No activity yet</p>
          <p className="text-xs text-[#9490AA] mt-1">Your team's sales will appear here in real time.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {visible.map((activity, i) => {
              const Icon = iconMap[activity.type] || ShoppingCart;
              return (
                <div key={i} className="flex items-start gap-3">
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

          {activities.length > PREVIEW_COUNT && (
            <div className="mt-5 pt-4 border-t border-[#EBEBF0]">
              <button
                onClick={() => setShowAll(v => !v)}
                className="text-sm font-medium text-[#796EB2] hover:text-[#5C51A6] transition-colors"
              >
                {showAll ? 'Show less' : `View all ${activities.length} activities`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}