import React, { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LINKS = [
  'How to create a campaign',
  'How to create a bonus',
  'How to top up your wallet',
  'How to invite a staff member',
];

export default function HelpDropdown({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        const helpBtn = document.getElementById('help-button');
        if (helpBtn && helpBtn.contains(e.target)) return;
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#E2E0ED] rounded-2xl shadow-lg z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-[#EBEBF0]">
        <p className="text-sm font-semibold text-[#0E0D1E]">Help & Support</p>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {LINKS.map((link) => (
          <button
            key={link}
            className="flex items-center justify-between px-3 py-2.5 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl hover:bg-[#F0EEF9] transition-colors text-left w-full"
          >
            <span className="text-sm text-[#0E0D1E]">{link}</span>
            <ChevronRight className="w-4 h-4 text-[#796EB2] flex-shrink-0" />
          </button>
        ))}
      </div>

      <div className="border-t border-[#EBEBF0] px-3 py-3">
        <Button className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white text-sm font-semibold">
          Contact Support
        </Button>
      </div>
    </div>
  );
}