import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { ACTIVITIES } from '@/lib/sampleData';

const RECENT = ACTIVITIES.slice(0, 5);

export default function NotificationDropdown({ onClose, onMarkAllRead, hasUnread }) {
  const ref = useRef(null);

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
         {RECENT.map((n, i) => (
           <div key={i} className={`flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F8F7FC] transition-colors ${i !== RECENT.length - 1 ? 'border-b border-[#EBEBF0]' : ''}`}>
             <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
             <div className="flex-1 min-w-0">
               <p className="text-sm text-[#0E0D1E] leading-snug">{n.message}</p>
               <p className="text-xs text-[#9490AA] mt-0.5">{format(new Date(n.created_date), 'MMM d, h:mm a')}</p>
             </div>
           </div>
         ))}
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