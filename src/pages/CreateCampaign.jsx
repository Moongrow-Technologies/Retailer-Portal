import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Clock, Loader2 } from 'lucide-react';
import SuccessToast from '@/components/shared/SuccessToast';
import { PRODUCTS, STORE } from '@/lib/sampleData';
import { cn } from '@/lib/utils';
import { addCampaign, getWallet } from '@/lib/appStore';

const STEPS = ['Select Product', 'Choose Stores', 'Set Commission', 'Budget & Duration', 'Review'];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [productError, setProductError] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [data, setData] = useState({
    product: '', stores: [], commission_rate: '', budget: '', start_date: '', end_date: '', name: '', startNow: true
  });

  const product = PRODUCTS.find(p => p.name === data.product);
  const progress = ((step + 1) / STEPS.length) * 100;
  const isScheduled = !data.startNow && data.start_date && new Date(data.start_date) > new Date();

  const canNext = () => {
    if (step === 0) return !!data.product;
    if (step === 1) return data.stores.length > 0;
    if (step === 2) return data.commission_rate && Number(data.commission_rate) > 0;
    if (step === 3) return data.budget && (data.startNow || (data.start_date && data.end_date)) && Number(data.budget) > 0;
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

  if (step === STEPS.length) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{isScheduled ? 'Campaign Scheduled!' : 'Campaign Launched!'}</h2>
        <p className="text-muted-foreground mb-6">
          {isScheduled
            ? `${data.name || `${data.product} Campaign`} is scheduled to go live on ${data.start_date}. €${Number(data.budget).toFixed(2)} will be committed when it starts.`
            : `${data.name || `${data.product} Campaign`} is now live. €${Number(data.budget).toFixed(2)} has been committed from your wallet.`}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/campaigns')}>View Campaigns</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6">
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

      <div className="bg-white rounded-xl border border-border p-6 min-h-[300px]">
        {step === 0 && (
          <div className="space-y-3">
            <Label>Select a product</Label>
            <div className="grid gap-2">
              {PRODUCTS.map(p => (
                <button
                  key={p.name}
                  onClick={() => {
                    setProductError(false);
                    setData({ ...data, product: p.name, name: `${p.name} Campaign` });
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all text-left",
                    data.product === p.name
                      ? "border-[#796EB2] bg-[#F0EEF9]"
                      : productError
                        ? "border-red-300 hover:border-[#796EB2] hover:bg-[#F5F3FC]"
                        : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {data.product === p.name ? (
                      <div className="w-5 h-5 rounded-full bg-[#796EB2] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#D0CDE8] flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.sku} · {p.category}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">€{p.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
            {productError && (
              <p className="text-sm text-red-500 mt-1">Please select a product to continue.</p>
            )}
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
                    data.stores.includes(store) ? "border-[#796EB2] bg-[#F0EEF9]" : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]"
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
                Available: €{getWallet().available.toFixed(2)}. This amount will be committed from your wallet.
              </p>
            </div>
            {/* Start option */}
            <div>
              <Label>Start</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <button
                  onClick={() => setData({ ...data, startNow: true, start_date: '' })}
                  className={cn("p-3 rounded-lg border text-sm font-medium transition-all text-left", data.startNow ? "border-[#796EB2] bg-[#F0EEF9] text-[#534AB7]" : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]")}
                >
                  Start Now
                </button>
                <button
                  onClick={() => setData({ ...data, startNow: false })}
                  className={cn("p-3 rounded-lg border text-sm font-medium transition-all text-left", !data.startNow ? "border-[#796EB2] bg-[#F0EEF9] text-[#534AB7]" : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]")}
                >
                  Schedule for later
                </button>
              </div>
            </div>
            <div className={cn("grid gap-3", data.startNow ? "grid-cols-1" : "grid-cols-2")}>
              {!data.startNow && (
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" value={data.start_date} onChange={e => setData({ ...data, start_date: e.target.value })} className="mt-1.5" />
                </div>
              )}
              <div>
                <Label>End Date</Label>
                <Input type="date" value={data.end_date} onChange={e => setData({ ...data, end_date: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            {isScheduled && (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-700">This campaign will be <span className="font-semibold">scheduled</span> — it goes live automatically on the start date.</p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review Campaign</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Campaign Name</p>
                <p className="font-medium text-[#0E0D1E]">{data.name || `${data.product} Campaign`}</p>
              </div>
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
                <p className="font-medium text-[#0E0D1E]">{data.startNow ? 'Now' : data.start_date} → {data.end_date}</p>
              </div>
              <div className="col-span-2 p-3 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                <p className="text-xs text-[#9490AA]">Stores</p>
                <p className="font-medium text-[#0E0D1E]">{data.stores.join(', ')}</p>
              </div>
            </div>
            {isScheduled && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-700 font-medium">Scheduled to start on <span className="font-bold">{data.start_date}</span></p>
              </div>
            )}
            <div className="p-4 bg-[#EDE9F8] border border-[#C8C3E0] rounded-xl">
              <p className="text-xs font-semibold text-[#796EB2] uppercase tracking-wide mb-1">Financial Commitment</p>
              <p className="text-2xl font-bold text-[#0E0D1E]">€{Number(data.budget).toFixed(2)}</p>
              <p className="text-xs text-[#796EB2] mt-0.5">{isScheduled ? 'will be allocated to your campaign fund when the campaign goes live' : 'will be allocated to your campaign fund upon launch'}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => {
            // Step 0: validate product selection
            if (step === 0 && !data.product) {
              setProductError(true);
              return;
            }
            if (step === 4) {
              setLaunching(true);
              setTimeout(() => {
                addCampaign({
                  id: `c_${Date.now()}`,
                  name: data.name || `${data.product} Campaign`,
                  product_name: data.product,
                  stores: data.stores,
                  commission_rate: Number(data.commission_rate),
                  budget: Number(data.budget),
                  spent: 0,
                  units_sold: 0,
                  target_units: Math.floor(Number(data.budget) / Number(data.commission_rate)),
                  status: isScheduled ? 'scheduled' : 'active',
                  start_date: data.startNow ? new Date().toISOString().split('T')[0] : data.start_date,
                  end_date: data.end_date,
                });
                setLaunching(false);
                setStep(step + 1);
              }, 800);
            } else {
              setStep(step + 1);
            }
          }}
          disabled={launching || (step !== 0 && !canNext())}
          className="bg-primary hover:bg-primary/90 gap-2 min-w-[140px]"
        >
          {launching ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Launching…</>
          ) : (
            <>{step === 4 ? (isScheduled ? 'Schedule Campaign' : 'Launch Campaign') : 'Continue'} <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}