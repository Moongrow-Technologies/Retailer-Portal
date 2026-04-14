import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Megaphone } from 'lucide-react';
import { PRODUCTS, STORE, WALLET } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const STEPS = ['Select Product', 'Choose Stores', 'Set Commission', 'Budget & Duration', 'Review', 'Success'];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    product: '', stores: [], commission_rate: '', budget: '', start_date: '', end_date: '', name: ''
  });

  const product = PRODUCTS.find(p => p.name === data.product);
  const progress = ((step + 1) / STEPS.length) * 100;

  const canNext = () => {
    if (step === 0) return !!data.product;
    if (step === 1) return data.stores.length > 0;
    if (step === 2) return data.commission_rate && Number(data.commission_rate) > 0;
    if (step === 3) return data.budget && data.start_date && data.end_date && Number(data.budget) > 0;
    return true;
  };

  const toggleStore = (store) => {
    setData(prev => ({
      ...prev,
      stores: prev.stores.includes(store)
        ? prev.stores.filter(s => s !== store)
        : [...prev.stores, store]
    }));
  };

  if (step === 5) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Campaign Launched!</h2>
        <p className="text-muted-foreground mb-6">
          {data.name || `${data.product} Campaign`} is now live. €{Number(data.budget).toFixed(2)} has been committed from your wallet.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/campaigns')}>View Campaigns</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => step === 0 ? navigate('/campaigns') : setStep(step - 1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {step === 0 ? 'Back to Campaigns' : 'Previous Step'}
      </button>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Create Campaign</h1>
          <span className="text-sm text-muted-foreground">Step {step + 1} of {STEPS.length}</span>
        </div>
        <Progress value={progress} className="h-1" />
        <p className="text-sm font-medium text-primary mt-2">{STEPS[step]}</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 min-h-[300px]">
        {step === 0 && (
          <div className="space-y-3">
            <Label>Select a product</Label>
            <div className="grid gap-2">
              {PRODUCTS.map(p => (
                <button
                  key={p.name}
                  onClick={() => setData({ ...data, product: p.name, name: `${p.name} Campaign` })}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all text-left",
                    data.product === p.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  )}
                >
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.sku} · {p.category}</p>
                  </div>
                  <p className="text-sm font-semibold">€{p.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <Label>Choose stores for this campaign</Label>
            <div className="grid gap-2">
              {STORE.locations.map(store => (
                <button
                  key={store}
                  onClick={() => toggleStore(store)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border transition-all text-left",
                    data.stores.includes(store) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  )}
                >
                  <Checkbox checked={data.stores.includes(store)} />
                  <p className="font-medium">{store}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Campaign Name</Label>
              <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Commission Rate (EURC per unit)</Label>
              <Input type="number" step="0.25" placeholder="e.g. 2.00" value={data.commission_rate} onChange={e => setData({ ...data, commission_rate: e.target.value })} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Staff earn this amount for every unit of {data.product} sold.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Total Budget (EURC)</Label>
              <Input type="number" placeholder="e.g. 500" value={data.budget} onChange={e => setData({ ...data, budget: e.target.value })} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">
                Available: €{WALLET.available.toFixed(2)}. This amount will be committed from your wallet.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={data.start_date} onChange={e => setData({ ...data, start_date: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={data.end_date} onChange={e => setData({ ...data, end_date: e.target.value })} className="mt-1.5" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review Campaign</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Product</p>
                <p className="font-medium text-[#0E0D1E]">{data.product}</p>
              </div>
              <div className="p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Commission</p>
                <p className="font-medium text-[#0E0D1E]">€{Number(data.commission_rate).toFixed(2)} / unit</p>
              </div>
              <div className="p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Budget</p>
                <p className="font-medium text-[#0E0D1E]">€{Number(data.budget).toFixed(2)}</p>
              </div>
              <div className="p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Duration</p>
                <p className="font-medium text-[#0E0D1E]">{data.start_date} → {data.end_date}</p>
              </div>
              <div className="col-span-2 p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Stores</p>
                <p className="font-medium text-[#0E0D1E]">{data.stores.join(', ')}</p>
              </div>
            </div>
            <div className="p-4 bg-[#EDE9F8] border border-[#C8C3E0] rounded-xl">
              <p className="text-xs font-semibold text-[#796EB2] uppercase tracking-wide mb-1">Financial Commitment</p>
              <p className="text-2xl font-bold text-[#0E0D1E]">€{Number(data.budget).toFixed(2)}</p>
              <p className="text-xs text-[#796EB2] mt-0.5">will be locked from your wallet upon launch</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setStep(step + 1)}
          disabled={!canNext()}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          {step === 4 ? 'Launch Campaign' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}