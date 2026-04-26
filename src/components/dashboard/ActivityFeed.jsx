import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { STAFF, CAMPAIGNS, BONUSES } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const staffByName = Object.fromEntries(STAFF.map(s => [s.name, s]));
const campaignByName = Object.fromEntries(CAMPAIGNS.map(c => [c.name, c]));
const bonusByName = Object.fromEntries(BONUSES.map(b => [b.name, b]));

function getActivityLink(activity) {
  if (activity.type === 'sale' || activity.type === 'campaign_paused' || activity.type === 'campaign_created' || activity.type === 'campaign_resumed') {
    const campaign = activity.campaign_name && campaignByName[activity.campaign_name];
    if (campaign) return `/campaigns/${campaign.id}`;
  }
  if (activity.type === 'bonus_completed' || activity.type === 'bonus_created') {
    const bonus = activity.campaign_name && bonusByName[activity.campaign_name];
    if (bonus) return `/bonuses/${bonus.id}`;
  }
  if (activity.type === 'staff_joined') {
    const staff = activity.actor && staffByName[activity.actor];
    if (staff) return `/staff/${staff.id}`;
  }
  if (activity.type === 'top_up') return '/wallet';
  return null;
}

const avatarColors = [
  'bg-amber-400',
  'bg-blue-500',
  'bg-emerald-600',
  'bg-slate-500',
  'bg-rose-500',
  'bg-violet-500',
];

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-[0_2px_8px_0_rgba(0,0,0,0.012)] p-6 h-full w-full">
      <h3 className="text-base font-semibold text-[#0E0D1E] mb-5">Recent Activity</h3>
      <div>
        {activities.map((activity, i) => {
          const staffMember = activity.actor && staffByName[activity.actor];
          const initials = activity.actor
            ? activity.actor.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
            : '?';
          const colorClass = avatarColors[i % avatarColors.length];

          const link = getActivityLink(activity);
          const rowContent = (
            <div className="flex items-center gap-4 py-4 px-2 rounded-lg hover:bg-[#F5F3FC] transition-colors">
              <span className="text-sm text-[#9490AA] w-4 text-right flex-shrink-0">{i + 1}</span>
              {staffMember?.avatar_url ? (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={staffMember.avatar_url} alt={staffMember.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold", colorClass)}>
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0E0D1E]">{activity.message}</p>
                <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(activity.created_date), 'MMM d, h:mm a')}</p>
              </div>
              {activity.amount != null && (
                <span className={cn("text-sm font-bold flex-shrink-0", i === 0 ? "text-emerald-600" : "text-[#0E0D1E]")}>
                  €{activity.amount.toFixed(2)}
                </span>
              )}
            </div>
          );

          return (
            <div key={i}>
              {link ? <Link to={link} className="block cursor-pointer">{rowContent}</Link> : rowContent}
                {i < activities.length - 1 && <div className="h-px bg-[#F0EFF5]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}