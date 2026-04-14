import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessToast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-white border border-emerald-200 shadow-lg rounded-xl px-4 py-3 animate-in slide-in-from-bottom-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      <p className="text-sm font-medium text-[#0E0D1E]">{message}</p>
    </div>
  );
}