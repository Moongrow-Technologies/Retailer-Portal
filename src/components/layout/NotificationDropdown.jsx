import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { ACTIVITIES, CAMPAIGNS, BONUSES, STAFF } from '@/lib/sampleData';
import { dismissNotification } from '@/lib/notificationStore';

const RECENT = ACTIVITIES.slice(0, 5);

export default function NotificationDropdown({ onClose, onMarkAllRead, hasUnread }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(new Set());

  const getNavigationPath = (activity) => {
    if (activity.type === 'sale' && activity.staff_name) {
      const staff = STAFF.find(s => s.name === activity.staff_name);
      return staff ? `/staff/${staff.id}` : null;
    }
    if (activity.campaign_name) {
      const campaign = CAMPAIGNS.find(c => c.name === activity.campaign_name);
      return campaign ? `/campaigns/${campaign.id}` : null;
    }
    if (activity.type && activity.type.includes('bonus') && activity.bonus_name) {
      const bonus = BONUSES.find(b => b.name === activity.bonus_name);
      return bonus ? `/bonuses/${bonus.id}` : null;
    }
    return null;
  };

  const handleNotificationClick = (activity) => {
    const path = getNavigationPath(activity);
    if (path) {
      navigate(path);
      onClose();
    }
  };

  const handleDismiss = (e, index) => {
    e.stopPropagation();
    setDismissed(prev => new Set([...prev, index]));
    dismissNotification(index);
  };

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // Check if click was on the bell button (its parent div handles toggle)
        const bellBtn = document.getElementById('notification-bell');
        if (bellBtn && bellBtn.contains(e.target)) return;
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#EBEBF0] rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[#EBEBF0] flex items-center justify-between">
        <p className="text-sm font-semibold text-[#0E0D1E]">Notifications</p>
        <div className="flex items-center gap-2">
          {hasUnread && (
            <button
              onClick={() => { onMarkAllRead(); }}
              className="text-xs text-[#796EB2] hover:text-[#6A5FA3] font-medium transition-colors"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#5b616e] hover:text-[#0E0D1E] hover:bg-[#F8F7FC] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col">
         {RECENT.map((n, i) => {
           if (dismissed.has(i)) return null;
           const path = getNavigationPath(n);
           const isClickable = !!path;
           return (
             <div
               key={i}
               onClick={() => isClickable && handleNotificationClick(n)}
               className={`flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors group ${i !== RECENT.length - 1 ? 'border-b border-[#EBEBF0]' : ''} ${isClickable ? 'cursor-pointer hover:bg-[#F8F7FC]' : 'hover:bg-[#F8F7FC]'}`}>
               <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 flex-shrink-0" style={{ backgroundColor: '#EF4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }} />
               <div className="flex-1 min-w-0">
                 <p className="text-sm text-[#0E0D1E] leading-snug">{n.message}</p>
                 <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(n.created_date), 'MMM d, h:mm a')}</p>
               </div>
               <button
                 onClick={(e) => handleDismiss(e, i)}
                 className="flex-shrink-0 text-[#9490AA] hover:text-[#0E0D1E] opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <X className="w-4 h-4" />
               </button>
             </div>
           );
         })}
       </div>

      <div className="border-t border-[#EBEBF0] px-4 py-2.5">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs font-semibold text-[#796EB2] hover:text-[#6A5FA3] transition-colors"
        >
          View All Notifications →
        </Link>
      </div>
    </div>
  );
}