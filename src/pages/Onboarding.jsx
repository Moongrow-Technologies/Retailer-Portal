import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Wallet, Package, DollarSign, Megaphone, Users, Check, Copy, Sparkles, Lock } from 'lucide-react';
import { PRODUCTS } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Welcome', icon: Sparkles },
  { label: 'Fund Wallet', icon: Wallet },
  { label: 'Add Product', icon: Package },
  { label: 'Set Commission', icon: DollarSign },
  { label: 'Launch Campaign', icon: Megaphone },
  { label: 'Invite Staff', icon: Users },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [walletFunded, setWalletFunded] = useState(false);
  const [product, setProduct] = useState('');
  const [commission, setCommission] = useState('');
  const [budget, setBudget] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const canNext = () => {
    if (step === 1) return walletFunded;
    return true;
  };

  const handleNext = () => {
    if (step === STEPS.length - 1) { navigate('/'); return; }
    setStep(step + 1);
  };

  const handleSkip = () => {
    if (step === 1) return;
    setStep(step + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.moongrow.io/join/dgh-abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex flex-col font-outfit">
      {/* Top bar — matches app TopBar style */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#EBEBF0] flex items-center px-8 z-50">
        <img
          src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/f5253c7da_MoongrowLogo.png"
          alt="Moongrow"
          className="h-6 w-auto object-contain"
        />
      </header>

      {/* Step progress bar — sits below top bar */}
      <div className="fixed top-14 left-0 right-0 bg-white border-b border-[#EBEBF0] z-40 px-8 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-1.5 overflow-x-auto">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all",
                i === step
                  ? "bg-[#796EB2] text-white"
                  : i < step
                  ? "bg-[#EDE9F8] text-[#796EB2]"
                  : "text-[#9490AA] bg-transparent"
              )}>
                {i < step ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                <span>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px min-w-[12px]", i < step ? "bg-[#796EB2]/30" : "bg-[#EBEBF0]")} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-12">
        <div className="max-w-md w-full">

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm text-center">
              <img
                src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/5e3bc17f7_Moongrow-04.png"
                alt="Moongrow"
                className="h-16 mx-auto mb-6"
              />
              <h1 className="text-2xl font-bold text-[#0E0D1E] mb-2">Welcome to Moongrow</h1>
              <p className="text-[#7A7893] text-sm mb-7 leading-relaxed">
                Run real-time commission campaigns for your staff. Commissions settle instantly in USDC — your team earns the moment a qualifying sale is made.
              </p>
              <div className="grid grid-cols-3 gap-2.5 mb-7">
                {['Instant USDC payouts', 'Real-time leaderboards', 'Boost sales & retention'].map(item => (
                  <div key={item} className="p-3 bg-[#F8F7FC] border border-[#EBEBF0] rounded-xl">
                    <p className="text-xs font-medium text-[#4A4761]">{item}</p>
                  </div>
                ))}
              </div>
              <Button onClick={handleNext} size="lg" className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 w-full">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 1: Fund Wallet */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-3.5 h-3.5 text-[#796EB2]" />
                <p className="text-xs font-semibold text-[#796EB2]">Required to continue</p>
              </div>
              <h2 className="text-xl font-bold text-[#0E0D1E] mb-1.5">Fund Your Wallet</h2>
              <p className="text-sm text-[#7A7893] mb-6 leading-relaxed">Your wallet powers everything — campaign budgets and bonus prizes. Add USDC to get started.</p>
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#9490AA] uppercase tracking-wide">Choose a provider</p>
                <button
                  onClick={() => setWalletFunded(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-[#EBEBF0] hover:border-[#796EB2]/40 hover:bg-[#F8F7FC] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#7B3FE4] flex items-center justify-center text-white font-bold text-sm shrink-0">M</div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-[#0E0D1E]">MoonPay</p>
                      <p className="text-xs text-[#9490AA]">Buy USDC with card or bank transfer</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C0BDCE] group-hover:text-[#796EB2] transition-colors" />
                </button>
                <button
                  disabled
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-[#EBEBF0] opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0052FF] flex items-center justify-center text-white font-bold text-sm shrink-0">C</div>
                    <div className="text-left">
                      <p className="font-semibold text-sm text-[#0E0D1E]">Coinbase Pay</p>
                      <p className="text-xs text-[#9490AA]">Coming soon</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C0BDCE]" />
                </button>
                {walletFunded && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <p className="text-sm text-emerald-700 font-medium">Wallet funded successfully!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Add Product */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0E0D1E] mb-1.5">Add a Product</h2>
              <p className="text-sm text-[#7A7893] mb-6">Select a product from your POS catalogue or add one manually.</p>
              <div className="space-y-2">
                {PRODUCTS.slice(0, 3).map(p => (
                  <button key={p.name} onClick={() => setProduct(p.name)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      product === p.name
                        ? "border-[#796EB2] bg-[#F8F7FC]"
                        : "border-[#EBEBF0] hover:border-[#796EB2]/40 hover:bg-[#F8F7FC]"
                    )}>
                    <div>
                      <p className="font-semibold text-sm text-[#0E0D1E]">{p.name}</p>
                      <p className="text-xs text-[#9490AA] mt-0.5">{p.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0E0D1E]">€{p.price.toFixed(2)}</p>
                      {product === p.name && <Check className="w-4 h-4 text-[#796EB2]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Set Commission */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0E0D1E] mb-1.5">Set Commission Rate</h2>
              <p className="text-sm text-[#7A7893] mb-6">How much should staff earn per unit sold?</p>
              <div className="space-y-4">
                {product && (
                  <div className="p-3 bg-[#F8F7FC] border border-[#EBEBF0] rounded-xl flex items-center justify-between">
                    <p className="text-xs text-[#9490AA]">Selected product</p>
                    <p className="text-sm font-semibold text-[#0E0D1E]">{product}</p>
                  </div>
                )}
                <div>
                  <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Commission Rate (USDC per unit)</Label>
                  <Input
                    type="number"
                    step="0.25"
                    placeholder="e.g. 2.00"
                    value={commission}
                    onChange={e => setCommission(e.target.value)}
                    className="mt-2 border-[#EBEBF0] focus:border-[#796EB2] focus:ring-[#796EB2]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Launch Campaign */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0E0D1E] mb-1.5">Launch Your First Campaign</h2>
              <p className="text-sm text-[#7A7893] mb-6">Set a budget and go live.</p>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Campaign Budget (USDC)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 500"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="mt-2 border-[#EBEBF0] focus:border-[#796EB2] focus:ring-[#796EB2]/20"
                  />
                </div>
                {product && commission && budget && (
                  <div className="p-4 bg-[#F8F7FC] border border-[#796EB2]/20 rounded-xl space-y-3">
                    <p className="text-xs font-semibold text-[#796EB2] uppercase tracking-wide">Campaign Summary</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-[#9490AA] mb-0.5">Product</p>
                        <p className="text-sm font-semibold text-[#0E0D1E]">{product}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9490AA] mb-0.5">Rate</p>
                        <p className="text-sm font-semibold text-[#0E0D1E]">€{Number(commission).toFixed(2)}/unit</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9490AA] mb-0.5">Budget</p>
                        <p className="text-sm font-semibold text-[#0E0D1E]">€{Number(budget).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Invite Staff */}
          {step === 5 && (
            <div className="bg-white rounded-2xl border border-[#EBEBF0] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#0E0D1E] mb-1.5">Invite Your Team</h2>
              <p className="text-sm text-[#7A7893] mb-6">Send invites via email or share a link. Staff are auto-assigned to your store.</p>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="team@yourstore.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    className="mt-2 border-[#EBEBF0] focus:border-[#796EB2]"
                  />
                  <Button
                    className="mt-2.5 bg-[#796EB2] hover:bg-[#6A5FA3] text-white w-full"
                    disabled={!inviteEmail}
                  >
                    Send Invite
                  </Button>
                </div>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#EBEBF0]" /></div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs text-[#9490AA]">or share link</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input readOnly value="https://app.moongrow.io/join/dgh-abc123" className="text-xs border-[#EBEBF0] text-[#7A7893]" />
                  <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0 border-[#EBEBF0] hover:bg-[#F8F7FC]">
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#796EB2]" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={cn("flex items-center mt-5", step === 0 ? "justify-center" : "justify-between")}>
            {step > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="text-[#7A7893] hover:text-[#0E0D1E] hover:bg-white"
              >
                Back
              </Button>
            )}
            {step > 0 && (
              <div className="flex gap-2">
                {step >= 2 && step < STEPS.length - 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-[#9490AA] hover:text-[#7A7893] hover:bg-white"
                  >
                    Skip for now
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!canNext()}
                  className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2"
                >
                  {step === STEPS.length - 1 ? 'Go to Dashboard' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}