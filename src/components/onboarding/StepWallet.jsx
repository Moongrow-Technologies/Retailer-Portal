import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Clock, ArrowLeft, Banknote } from 'lucide-react';
import WalletIcon from '@/components/shared/WalletIcon';
import { useNavigate } from 'react-router-dom';
import TopUpModal from '@/components/wallet/TopUpModal';

export default function StepWallet({ onSkip, onBack }) {
  const navigate = useNavigate();
  const [showTopUp, setShowTopUp] = useState(false);

  const handleTopUp = () => {
    setShowTopUp(true);
  };

  const handleDone = () => {
    onSkip();
  };

  return (
    <><div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#0E0D1E]">Meet your wallet</h2>
        <p className="text-sm text-[#7A7893] mt-1.5 leading-relaxed">
          A Moongrow Wallet has been automatically created for your account.
        </p>
      </div>

      {/* Wallet card */}
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #6B63C4 0%, #8E85D4 60%, #A89ED8 100%)' }}>
        <div className="flex items-center gap-2 mb-4">
          <WalletIcon size={16} color="white" />
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">Moongrow Wallet</span>
        </div>
        <p className="text-4xl font-bold tracking-tight">€0.00</p>
        <p className="text-sm text-white/40 mt-1">Available balance</p>
      </div>

      {/* Your funds, always ready */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-5 hover:border-[#796EB2]/20 transition-colors">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
            <Banknote className="w-3.5 h-3.5 text-[#796EB2]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0E0D1E] mb-0.5">Your funds, always ready</h3>
            <p className="text-xs text-[#9490AA] leading-relaxed">
              Add money to your wallet and it's automatically used to pay your staff the moment they make a qualifying sale. No delays, no manual transfers.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3.5">
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-5 hover:border-[#796EB2]/20 transition-colors">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-[#796EB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Top up via MoonPay</p>
              <p className="text-xs text-[#9490AA] mt-0.5 leading-relaxed">
                Add funds from your bank account or card. Your money converts to USDC and lands in your wallet in minutes.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-5 hover:border-[#796EB2]/20 transition-colors">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#796EB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Instant staff payouts</p>
              <p className="text-xs text-[#9490AA] mt-0.5 leading-relaxed">
                The moment a staff member makes a qualifying sale, their commission hits their Moongrow app wallet automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[#9490AA] hover:text-[#796EB2] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={handleDone}
            className="text-sm text-[#9490AA] hover:text-[#796EB2] transition-colors underline"
          >
            Skip, go to dashboard
          </button>
        </div>
        <Button
          onClick={handleTopUp}
          className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2"
        >
          Top up now <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>

    <TopUpModal open={showTopUp} onClose={() => setShowTopUp(false)} />
    </>
  );
}