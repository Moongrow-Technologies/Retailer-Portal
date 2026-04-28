import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const STEPS = [
  { label: 'Store details' },
  { label: 'Invite staff' },
  { label: 'Your wallet' },
];

export default function OnboardingShell({ step, children }) {
  return (
    <div className="min-h-screen bg-[#F0F0F5] flex flex-col font-outfit">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#EBEBF0] flex items-center px-6 z-50">
        <img
          src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/f5253c7da_MoongrowLogo.png"
          alt="Moongrow"
          className="h-6 w-auto object-contain"
        />
        <span className="ml-3 text-xs font-medium text-[#9490AA] border-l border-[#EBEBF0] pl-3">Setup wizard</span>
      </header>

      {/* Progress strip */}
      <div className="fixed top-14 left-0 right-0 bg-white border-b border-[#EBEBF0] z-40 px-6 py-3.5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                  i < step ? "bg-[#796EB2] text-white" :
                  i === step ? "bg-[#796EB2] text-white ring-4 ring-[#796EB2]/20" :
                  "bg-[#EBEBF0] text-[#9490AA]"
                )}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={cn(
                  "text-sm font-medium hidden sm:block",
                  i === step ? "text-[#0E0D1E]" : i < step ? "text-[#796EB2]" : "text-[#9490AA]"
                )}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-3", i < step ? "bg-[#796EB2]/40" : "bg-[#EBEBF0]")} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 flex items-start justify-center px-4 pt-36 pb-12">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}