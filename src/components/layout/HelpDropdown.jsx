import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const LINKS = [
  'How to create a campaign',
  'How to create a bonus',
  'How to invite a staff member',
  'How to top up your wallet',
];

export default function HelpDropdown({ onClose }) {
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

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

  const handleContactSupport = () => {
    setShowModal(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please describe your issue before sending.');
      return;
    }
    toast.success('Message sent — we\'ll get back to you shortly.');
    setMessage('');
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <div
        ref={ref}
        className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#E2E0ED] rounded-2xl shadow-lg z-50 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-[#EBEBF0]">
          <p className="text-lg font-bold text-[#0E0D1E]">Help & Support</p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {LINKS.map((link) => (
            <button
              key={link}
              className="flex items-center justify-between px-4 py-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl hover:bg-[#F0EEF9] transition-colors text-left w-full"
            >
              <span className="text-sm font-medium text-[#0E0D1E]">{link}</span>
              <span className="text-[#796EB2] flex-shrink-0">→</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#EBEBF0] px-4 py-4">
          <Button
            onClick={handleContactSupport}
            className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white text-sm font-semibold rounded-full"
          >
            Contact Support
          </Button>
        </div>
      </div>

      {/* Contact Support Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-5 border-b border-[#EBEBF0]">
              <h2 className="text-lg font-bold text-[#0E0D1E]">Contact Support</h2>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Name and Email */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Name</label>
                  <div className="mt-1 px-3 py-2 bg-[#F8F7FC] border border-[#E2E0ED] rounded-lg text-sm text-[#0E0D1E]">
                    {user?.full_name || '—'}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Email</label>
                  <div className="mt-1 px-3 py-2 bg-[#F8F7FC] border border-[#E2E0ED] rounded-lg text-sm text-[#0E0D1E]">
                    {user?.email || '—'}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What do you need help with?"
                  className="mt-1 w-full px-3 py-2 border border-[#E2E0ED] rounded-lg text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#796EB2] focus:border-[#796EB2]"
                  rows={4}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#EBEBF0] flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm font-medium text-[#7A7893] hover:text-[#0E0D1E] transition-colors"
              >
                Cancel
              </button>
              <Button
                onClick={handleSendMessage}
                className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white text-sm font-semibold"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}