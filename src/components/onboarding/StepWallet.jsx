import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowRight, Zap, Shield, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StepWallet({ onSkip, onBack }) {
  const navigate = useNavigate();

  const handleTopUp = () => {
    // Open MoonPay flow — for now navigate to wallet page where MoonPay modal lives
    navigate('/wallet');
  };

  const handleDone = () => {
    onSkip();
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#0E0D1E]">Meet your wallet</h2>
        <p className="text-sm text-[#7A7893] mt-1.5 leading-relaxed">
          A Moongrow Wallet has been automatically created for your account.
        </p>
      </div>

      {/* Wallet card */}
      <div className="bg-[#0E0D1E] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#796EB2]/20" />
        <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full bg-[#796EB2]/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-[#796EB2]" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">Moongrow Wallet</span>
          </div>
          <p className="text-4xl font-bold tracking-tight">€0.00</p>
          <p className="text-sm text-white/40 mt-1">Available balance</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-5 space-y-4 hover:border-[#796EB2]/20 transition-colors">
        <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">How it works</p>
        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-[#796EB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Budget is reserved automatically</p>
              <p className="text-xs text-[#9490AA] mt-0.5 leading-relaxed">
                When you create a campaign with a budget, that amount is locked in your wallet so commissions can always be paid.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-[#796EB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Commissions pay out instantly</p>
              <p className="text-xs text-[#9490AA] mt-0.5 leading-relaxed">
                The moment a staff member makes a qualifying sale, their commission is sent to their Moongrow app wallet in USDC — no delays.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#EDE9F8] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#796EB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0E0D1E]">Top up anytime</p>
              <p className="text-xs text-[#9490AA] mt-0.5 leading-relaxed">
                Add funds from your bank account via MoonPay — fiat converts to USDC and lands in your wallet in minutes.
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
  );
}