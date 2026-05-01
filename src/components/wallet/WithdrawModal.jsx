import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronRight, X } from 'lucide-react';

export default function WithdrawModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-[#EBEBF0]" hideClose>
        <div className="bg-white rounded-2xl p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0c0b0c]">Withdraw funds</h2>
            <button onClick={onClose} className="text-[#9490AA] hover:text-[#0c0b0c] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F0EFF5] mb-5" />

          {/* Description */}
          <p className="text-[15px] text-[#5b616e] mb-6 leading-relaxed">
            Convert your USDC to euros and send them to your bank account via MoonPay.
          </p>

          {/* MoonPay Option */}
          <button
            onClick={() => window.open('https://www.moonpay.com', '_blank')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#EBEBF0] bg-[#FAFAF9] hover:bg-[#F5F3FC] hover:border-[#796EB2]/30 transition-all group"
          >
            {/* MoonPay logo */}
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#EBEBF0]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0NsmMSbUlGxz0Q5Nk7JBHZ4w8nN1B9gqwA&s"
                alt="MoonPay"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-bold text-[#0c0b0c]">Powered by MoonPay</p>
              <p className="text-[13px] text-[#5b616e] mt-0.5">Secure fiat off-ramp · ID may be required</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9490AA] group-hover:text-[#796EB2] transition-colors flex-shrink-0" />
          </button>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => window.open('https://www.moonpay.com', '_blank')}
              className="w-full py-3 text-[15px] font-semibold text-[#5b616e] hover:text-[#796EB2] transition-colors"
            >
              Continue to MoonPay →
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-[15px] font-semibold text-[#9490AA] hover:text-[#5b616e] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}