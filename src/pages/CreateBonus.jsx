import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Trophy, Target, Zap } from 'lucide-react';
import { PRODUCTS, STORE, WALLET } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const STEPS = ['Choose Type', 'Set Metric', 'Scope & Duration', 'Prize Structure', 'Review'];

export default function CreateBonus() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    name: '', type: '', metric: 'units_sold', product: 'All Products',
    scope: 'chain', store: '', duration: '', prizes: [{ position: 1, amount: '' }],
    threshold_target: '', threshold_prize: '',
  });

  const progress = ((step + 1) / STEPS.length) * 100;
  const totalPrize = data.type === 'threshold'
    ? Number(data.threshold_prize) || 0
    : data.prizes.reduce((s, p) => s + (Number(p.amount) || 0), 0);

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Bonus Created!</h2>
        <p className="text-muted-foreground mb-6">{data.name} is now live. €{totalPrize.toFixed(2)} has been committed from your wallet.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/bonuses')}>View Bonuses</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/')}>Dashboard</Button>
        </div>
      </div>
    );
  }

  const types = [
    { value: 'ranked', label: 'Ranked', desc: 'Top N winners get prizes', icon: Trophy },
    { value: 'threshold', label: 'Threshold', desc: 'Everyone who hits target wins', icon: Target },
    { value: 'sprint', label: 'Sprint', desc: 'First to hit target or most before deadline', icon: Zap },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => step === 0 ? navigate('/bonuses') : setStep(step - 1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {step === 0 ? 'Back to Bonuses' : 'Previous Step'}
      </button>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Create Bonus Competition</h1>
          <span className="text-sm text-muted-foreground">Step {step + 1} of {STEPS.length}</span>
        </div>
        <Progress value={progress} className="h-1" />
        <p className="text-sm font-medium text-primary mt-2">{STEPS[step]}</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 min-h-[300px]">
        {step === 0 && (
          <div className="space-y-3">
            <Label>Bonus Type</Label>
            <div className="grid gap-2">
              {types.map(t => (
                <button key={t.value} onClick={() => setData({ ...data, type: t.value, name: `${t.label} Challenge` })}
                  className={cn("flex items-center gap-4 p-4 rounded-lg border transition-all text-left",
                    data.type === t.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30")}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <t.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{t.label}</p>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Competition Name</Label>
              <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label>Ranking Metric</Label>
              <RadioGroup value={data.metric} onValueChange={v => setData({ ...data, metric: v })} className="mt-2 space-y-2">
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem value="commission_earned" id="m1" />
                  <Label htmlFor="m1">EURC Commission Earned</Label>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem value="units_sold" id="m2" />
                  <Label htmlFor="m2">Units Sold</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Product Scope</Label>
              <Select value={data.product} onValueChange={v => setData({ ...data, product: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Products">All Products</SelectItem>
                  {PRODUCTS.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Scope</Label>
              <RadioGroup value={data.scope} onValueChange={v => setData({ ...data, scope: v })} className="mt-2 space-y-2">
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem value="chain" id="s1" />
                  <Label htmlFor="s1">Chain-wide (all stores)</Label>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <RadioGroupItem value="store" id="s2" />
                  <Label htmlFor="s2">Single store</Label>
                </div>
              </RadioGroup>
            </div>
            {data.scope === 'store' && (
              <div>
                <Label>Select Store</Label>
                <Select value={data.store} onValueChange={v => setData({ ...data, store: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose store" /></SelectTrigger>
                  <SelectContent>
                    {STORE.locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Duration (days)</Label>
              <Input type="number" placeholder="e.g. 14" value={data.duration} onChange={e => setData({ ...data, duration: e.target.value })} className="mt-1.5" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {data.type === 'threshold' ? (
              <>
                <div>
                  <Label>Target ({data.metric === 'units_sold' ? 'units' : 'EURC'})</Label>
                  <Input type="number" value={data.threshold_target} onChange={e => setData({ ...data, threshold_target: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Prize per winner (EURC)</Label>
                  <Input type="number" value={data.threshold_prize} onChange={e => setData({ ...data, threshold_prize: e.target.value })} className="mt-1.5" />
                </div>
              </>
            ) : (
              <>
                <Label>Prize per Position</Label>
                {data.prizes.map((prize, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <span className="text-sm font-medium w-16">{i === 0 ? '1st' : i === 1 ? '2nd' : `${i + 1}th`}</span>
                    <Input type="number" placeholder="Prize amount" value={prize.amount}
                      onChange={e => {
                        const updated = [...data.prizes];
                        updated[i] = { ...updated[i], amount: e.target.value };
                        setData({ ...data, prizes: updated });
                      }} />
                  </div>
                ))}
                {data.type === 'ranked' && data.prizes.length < 5 && (
                  <Button variant="outline" size="sm" onClick={() => setData({ ...data, prizes: [...data.prizes, { position: data.prizes.length + 1, amount: '' }] })}>
                    + Add Position
                  </Button>
                )}
              </>
            )}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mt-4">
              <p className="text-sm font-medium">Total commitment: €{totalPrize.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Available: €{WALLET.available.toFixed(2)}</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review Bonus</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{data.name}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Type</p><p className="font-medium capitalize">{data.type}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Metric</p><p className="font-medium">{data.metric === 'units_sold' ? 'Units Sold' : 'Commission Earned'}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Scope</p><p className="font-medium">{data.scope === 'chain' ? 'Chain-wide' : data.store}</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium">{data.duration} days</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Prize Pool</p><p className="font-medium">€{totalPrize.toFixed(2)}</p></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={() => step === 4 ? setDone(true) : setStep(step + 1)}
          disabled={step === 0 && !data.type}
          className="bg-primary hover:bg-primary/90 gap-2">
          {step === 4 ? 'Launch Bonus' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}