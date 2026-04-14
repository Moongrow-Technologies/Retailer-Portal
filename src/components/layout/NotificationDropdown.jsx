import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ACTIVITIES } from '@/lib/sampleData';

const RECENT = ACTIVITIES.slice(0, 5);

export default function NotificationDropdown({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#E2E0ED] rounded-2xl shadow-lg z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[#EBEBF0]">
        <p className="text-sm font-semibold text-[#0E0D1E]">Notifications</p>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {RECENT.map((n, i) => (
          <div key={i} className="flex items-start gap-3 px-3 py-2.5 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
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