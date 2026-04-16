import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Moon, ArrowRight, Wallet, Package, DollarSign, Megaphone, Users, Check, Copy, Sparkles, Lock } from 'lucide-react';
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

  const progress = ((step + 1) / STEPS.length) * 100;
  const canNext = () => {
    if (step === 1) return walletFunded;
    return true;
  };

  const handleNext = () => {
    if (step === STEPS.length - 1) {
      navigate('/');
      return;
    }
    setStep(step + 1);
  };

  const handleSkip = () => {
    if (step === 1) return; // Cannot skip funding
    setStep(step + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.moongrow.io/join/dgh-abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="px-8 py-4 inline-flex gap-2 mb-0 min-w-full">
          {STEPS.map((s, i) => (
            <div key={i} className={cn(
              "flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap",
              i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )}>
              {i < step ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="px-8 pb-4"><Progress value={progress} className="h-1" /></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-lg w-full">

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/5e3bc17f7_Moongrow-04.png" alt="Moongrow" className="h-20" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Welcome to Moongrow</h1>
              <p className="text-muted-foreground mb-2 max-w-md mx-auto">
                Run real-time commission campaigns for your staff. Commissions settle instantly in EURC — your team earns the moment a qualifying sale is made.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-8 mb-8">
                {['Instant EURC payouts', 'Real-time leaderboards', 'Boost sales & retention'].map(item => (
                  <div key={item} className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <Button onClick={handleNext} size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 1: Fund Wallet */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-primary">Required to continue</p>
              </div>
              <h2 className="text-2xl font-bold mb-2">Fund Your Wallet</h2>
              <p className="text-muted-foreground mb-6">Your wallet powers everything — campaign budgets and bonus prizes. Add EURC to get started.</p>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <Label>Amount (EURC)</Label>
                  <Input type="number" placeholder="Enter amount to fund" className="mt-1.5 text-lg font-semibold" />
                </div>
                <div className="flex gap-2">
                  {[250, 500, 1000, 2500].map(a => (
                    <button key={a} className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-primary/5 hover:border-primary/30 transition-colors">€{a}</button>
                  ))}
                </div>
                <Button onClick={() => setWalletFunded(true)} className="w-full bg-primary hover:bg-primary/90">
                  {walletFunded ? <><Check className="w-4 h-4 mr-2" /> Wallet Funded</> : 'Fund Wallet'}
                </Button>
                {walletFunded && <p className="text-sm text-emerald-600 font-medium text-center">Wallet funded successfully!</p>}
              </div>
            </div>
          )}

          {/* Step 2: Add Product */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Add a Product</h2>
              <p className="text-muted-foreground mb-6">Select a product from your POS catalogue or add one manually.</p>
              <div className="space-y-2">
                {PRODUCTS.slice(0, 3).map(p => (
                  <button key={p.name} onClick={() => setProduct(p.name)}
                    className={cn("w-full flex items-center justify-between p-4 rounded-lg border transition-all text-left",
                      product === p.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/30")}>
                    <div><p className="font-medium">{p.name}</p><p className="text-sm text-muted-foreground">{p.sku}</p></div>
                    <p className="text-sm font-semibold">€{p.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Set Commission */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Set Commission Rate</h2>
              <p className="text-muted-foreground mb-6">How much should staff earn per unit sold?</p>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                {product && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Product</p>
                    <p className="font-medium">{product}</p>
                  </div>
                )}
                <div>
                  <Label>Commission Rate (EURC per unit)</Label>
                  <Input type="number" step="0.25" placeholder="e.g. 2.00" value={commission} onChange={e => setCommission(e.target.value)} className="mt-1.5" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Launch Campaign */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Launch Your First Campaign</h2>
              <p className="text-muted-foreground mb-6">Set a budget and go live.</p>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <Label>Campaign Budget (EURC)</Label>
                  <Input type="number" placeholder="e.g. 500" value={budget} onChange={e => setBudget(e.target.value)} className="mt-1.5" />
                </div>
                {product && commission && budget && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                    <p className="text-sm font-medium">Campaign Summary</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div><p className="text-muted-foreground text-xs">Product</p><p className="font-medium">{product}</p></div>
                      <div><p className="text-muted-foreground text-xs">Rate</p><p className="font-medium">€{Number(commission).toFixed(2)}/unit</p></div>
                      <div><p className="text-muted-foreground text-xs">Budget</p><p className="font-medium">€{Number(budget).toFixed(2)}</p></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Invite Staff */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Invite Your Team</h2>
              <p className="text-muted-foreground mb-6">Send invites via email or share a link. Staff are auto-assigned to your store.</p>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="team@degroenehoek.nl" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="mt-1.5" />
                  <Button className="mt-2 bg-primary hover:bg-primary/90 w-full" disabled={!inviteEmail}>Send Invite</Button>
                </div>
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or share link</span></div>
                </div>
                <div className="flex gap-2">
                  <Input readOnly value="https://app.moongrow.io/join/dgh-abc123" className="text-xs" />
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step > 0 && (
            <div className="flex items-center justify-between mt-6">
              <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
              <div className="flex gap-3">
                {step >= 2 && step < STEPS.length - 1 && (
                  <Button variant="ghost" onClick={handleSkip}>Skip for now</Button>
                )}
                <Button onClick={handleNext} disabled={!canNext()} className="bg-primary hover:bg-primary/90 gap-2">
                  {step === STEPS.length - 1 ? 'Go to Dashboard' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}