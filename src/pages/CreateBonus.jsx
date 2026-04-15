import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check, Trophy, Target, Zap, Plus, Trash2, Crown, Medal, Award, Clock } from 'lucide-react';
import SuccessToast from '@/components/shared/SuccessToast';
import { PRODUCTS, STORE, WALLET } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

const STEPS = ['Bonus Type', 'Ranking Metric', 'Scope & Duration', 'Prize Structure', 'Review & Confirm'];

const typeConfig = [
  { value: 'ranked', icon: Trophy, label: 'Ranked', tagline: 'Top N performers win prizes', desc: 'Best for competitive teams.', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { value: 'threshold', icon: Target, label: 'Threshold', tagline: 'Everyone who hits a target earns a reward', desc: 'Best for team motivation.', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { value: 'sprint', icon: Zap, label: 'Sprint', tagline: 'First to hit target or most sales before deadline', desc: 'Best for urgency.', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
];

export default function CreateBonus() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [data, setData] = useState({
    name: '', type: '', metric: 'units_sold', product: '',
    scope: 'chain', stores: [], duration: 'custom',
    customStart: '', customEnd: '',
    prizes: [{ position: 1, amount: '' }, { position: 2, amount: '' }, { position: 3, amount: '' }],
    tiebreaker: 'split',
    threshold_target: '', threshold_prize: '',
    sprint_prize: '',
  });

  const isScheduled = (() => {
    if (!data.customStart) return false;
    return new Date(data.customStart) > new Date();
  })();

  const totalPrize = (() => {
    if (data.type === 'threshold') return Number(data.threshold_prize) || 0;
    if (data.type === 'sprint') return Number(data.sprint_prize) || 0;
    return data.prizes.reduce((s, p) => s + (Number(p.amount) || 0), 0);
  })();

  const remaining = WALLET.available - totalPrize;

  if (done) {
    return (
      <div className="max-w-lg mx-auto text-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-[#EDE9F8] flex items-center justify-center mx-auto mb-5">
          <Check className="w-8 h-8 text-[#796EB2]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0E0D1E] mb-2">{isScheduled ? 'Bonus Scheduled!' : 'Bonus Launched!'}</h2>
        <p className="text-[#7A7893] mb-6">
          {isScheduled
            ? `${data.name} is scheduled to go live on ${data.customStart}. €${totalPrize.toFixed(2)} will be committed when it starts.`
            : `${data.name} is now live. €${totalPrize.toFixed(2)} has been committed from your wallet.`}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/bonuses')} className="border-[#E2E0ED]">View Bonuses</Button>
          <Button className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white" onClick={() => navigate('/')}>Dashboard</Button>
        </div>
      </div>
    );
  }

  const canContinue = () => {
    if (step === 0) return !!data.type;
    if (step === 1) return !!data.name && !!data.metric;
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <button onClick={() => step === 0 ? navigate('/bonuses') : setStep(step - 1)}
        className="flex items-center gap-1.5 text-sm text-[#7A7893] hover:text-[#796EB2] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {step === 0 ? 'Back to Bonuses' : 'Previous Step'}
      </button>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-[#0E0D1E]">Create Bonus Competition</h1>
          <span className="text-sm text-[#9490AA]">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-all", i <= step ? "bg-[#796EB2]" : "bg-[#E2E0ED]")} />
          ))}
        </div>
        <p className="text-sm font-semibold text-[#796EB2] mt-2">{STEPS[step]}</p>
      </div>

      <div className="bg-white rounded-xl border border-[#EBEBF0] shadow-sm p-6 min-h-[320px]">

        {/* Step 1 — Bonus Type */}
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-[#7A7893] mb-4">Choose the competition format for your team.</p>
            {typeConfig.map(t => (
              <button key={t.value} onClick={() => setData({ ...data, type: t.value, name: `${t.label} Challenge` })}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                  data.type === t.value ? "border-[#796EB2] bg-[#F5F3FC]" : "border-[#EBEBF0] hover:border-[#C8C3E0] bg-white"
                )}>
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0", t.bg)}>
                  <t.icon className={cn("w-5 h-5", t.color)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-[#0E0D1E]">{t.label}</p>
                    {data.type === t.value && <Check className="w-4 h-4 text-[#796EB2]" />}
                  </div>
                  <p className="text-sm text-[#4A4761]">{t.tagline}</p>
                  <p className="text-xs text-[#9490AA] mt-0.5">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Ranking Metric */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Competition Name</Label>
              <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="mt-1.5 bg-[#F8F7FC] border-[#E2E0ED]" placeholder="e.g. Top Seller Week 17" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-3 block">Ranking Metric</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'commission_earned', label: 'EURC Commission Earned', sub: 'Ranked by total EURC earned' },
                  { value: 'units_sold', label: 'Units Sold', sub: 'Ranked by units sold' },
                ].map(m => (
                  <button key={m.value} onClick={() => setData({ ...data, metric: m.value })}
                    className={cn("p-4 rounded-xl border-2 text-left transition-all",
                      data.metric === m.value ? "border-[#796EB2] bg-[#F5F3FC]" : "border-[#EBEBF0] hover:border-[#C8C3E0]"
                    )}>
                    <p className="font-semibold text-sm text-[#0E0D1E]">{m.label}</p>
                    <p className="text-xs text-[#9490AA] mt-0.5">{m.sub}</p>
                    {data.metric === m.value && <Check className="w-3.5 h-3.5 text-[#796EB2] mt-1.5" />}
                  </button>
                ))}
              </div>
            </div>
            {data.metric === 'units_sold' && (
              <div>
                <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Product (optional)</Label>
                <Select value={data.product} onValueChange={v => setData({ ...data, product: v })}>
                  <SelectTrigger className="mt-1.5 bg-[#F8F7FC] border-[#E2E0ED]"><SelectValue placeholder="All Products" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    {PRODUCTS.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Scope & Duration */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-3 block">Which stores are included?</Label>
              <div className="space-y-2">
                {[{ value: 'chain', label: 'Chain-wide', sub: 'All stores compete together' }, ...STORE.locations.map(l => ({ value: l, label: l, sub: 'Single store' }))].map(opt => (
                  <button key={opt.value} onClick={() => setData({ ...data, scope: opt.value })}
                    className={cn("w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-all",
                      data.scope === opt.value ? "border-[#796EB2] bg-[#F5F3FC]" : "border-[#EBEBF0] hover:border-[#C8C3E0]"
                    )}>
                    <div>
                      <p className="text-sm font-medium text-[#0E0D1E]">{opt.label}</p>
                      <p className="text-xs text-[#9490AA]">{opt.sub}</p>
                    </div>
                    {data.scope === opt.value && <Check className="w-4 h-4 text-[#796EB2]" />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-3 block">Duration</Label>
              {data.type === 'sprint' || data.type === 'threshold' ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-[#7A7893]">Start Date</Label>
                    <Input type="date" value={data.customStart} onChange={e => setData({ ...data, customStart: e.target.value })} className="mt-1 bg-[#F8F7FC] border-[#E2E0ED]" />
                  </div>
                  <div className="p-4 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl">
                    <p className="text-sm font-medium text-[#0E0D1E]">Ends on completion</p>
                    <p className="text-xs text-[#9490AA] mt-1">{data.type === 'sprint' ? 'Sprint' : 'Threshold'} bonuses end when the target is reached</p>
                  </div>
                  {isScheduled && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <p className="text-sm text-amber-700">This bonus will be <span className="font-semibold">scheduled</span> — it goes live automatically on the start date.</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-[#7A7893]">Start Date</Label>
                      <Input type="date" value={data.customStart} onChange={e => setData({ ...data, customStart: e.target.value })} className="mt-1 bg-[#F8F7FC] border-[#E2E0ED]" />
                    </div>
                    <div>
                      <Label className="text-xs text-[#7A7893]">End Date</Label>
                      <Input type="date" value={data.customEnd} onChange={e => setData({ ...data, customEnd: e.target.value })} className="mt-1 bg-[#F8F7FC] border-[#E2E0ED]" />
                    </div>
                  </div>
                  {isScheduled && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl mt-1">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <p className="text-sm text-amber-700">This bonus will be <span className="font-semibold">scheduled</span> — it goes live automatically on the start date.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 4 — Prize Structure */}
        {step === 3 && (
          <div className="space-y-5">
            {data.type === 'threshold' && (
              <>
                <div>
                  <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Target ({data.metric === 'units_sold' ? 'units' : 'EURC'})</Label>
                  <Input type="number" value={data.threshold_target} onChange={e => setData({ ...data, threshold_target: e.target.value })} className="mt-1.5 bg-[#F8F7FC] border-[#E2E0ED]" placeholder="e.g. 50" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Prize per winner (EURC)</Label>
                  <Input type="number" value={data.threshold_prize} onChange={e => setData({ ...data, threshold_prize: e.target.value })} className="mt-1.5 bg-[#F8F7FC] border-[#E2E0ED]" placeholder="e.g. 25" />
                </div>
              </>
            )}
            {data.type === 'sprint' && (
              <div>
                <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Prize for winner (EURC)</Label>
                <Input type="number" value={data.sprint_prize} onChange={e => setData({ ...data, sprint_prize: e.target.value })} className="mt-1.5 bg-[#F8F7FC] border-[#E2E0ED]" placeholder="e.g. 50" />
              </div>
            )}
            {data.type === 'ranked' && (
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide block">Prize per Position</Label>
                {data.prizes.map((prize, i) => {
                  const RankIcon = [Crown, Medal, Award][i] || Award;
                  const ordinals = ['1st Place', '2nd Place', '3rd Place', '4th Place', '5th Place'];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 w-24">
                        <RankIcon className={cn("w-4 h-4", i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : "text-orange-400")} />
                        <span className="text-sm text-[#7A7893]">{ordinals[i]}</span>
                      </div>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#9490AA]">€</span>
                        <Input type="number" placeholder="Amount" value={prize.amount}
                          onChange={e => {
                            const updated = [...data.prizes];
                            updated[i] = { ...updated[i], amount: e.target.value };
                            setData({ ...data, prizes: updated });
                          }}
                          className="pl-7 bg-[#F8F7FC] border-[#E2E0ED]"
                        />
                      </div>
                      {i >= 3 && (
                        <button onClick={() => setData({ ...data, prizes: data.prizes.filter((_, idx) => idx !== i) })}
                          className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
                {data.prizes.length < 5 && (
                  <button onClick={() => setData({ ...data, prizes: [...data.prizes, { position: data.prizes.length + 1, amount: '' }] })}
                    className="flex items-center gap-1.5 text-sm text-[#796EB2] hover:underline font-medium">
                    <Plus className="w-4 h-4" /> Add Position
                  </button>
                )}
                <div>
                  <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide mb-2 block">Tie-breaker</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ value: 'split', label: 'Split equally' }, { value: 'all_win', label: 'All tied players win' }].map(tb => (
                      <button key={tb.value} onClick={() => setData({ ...data, tiebreaker: tb.value })}
                        className={cn("py-2 px-3 rounded-xl border-2 text-sm transition-all",
                          data.tiebreaker === tb.value ? "border-[#796EB2] bg-[#F5F3FC] text-[#796EB2] font-semibold" : "border-[#EBEBF0] text-[#7A7893]"
                        )}>
                        {tb.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Live budget box */}
            <div className="mt-2 p-4 bg-[#F8F7FC] border border-[#E2E0ED] rounded-xl space-y-2">
              <p className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Budget Commitment</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7A7893]">Total commitment</span>
                <span className="font-bold text-[#0E0D1E]">€{totalPrize.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7A7893]">Available balance</span>
                <span className="font-semibold text-[#0E0D1E]">€{WALLET.available.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#E2E0ED] pt-2 flex items-center justify-between text-sm">
                <span className="text-[#7A7893]">Remaining after bonus</span>
                <span className={cn("font-bold", remaining < 0 ? "text-red-500" : "text-emerald-600")}>€{remaining.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Review & Confirm */}
        {step === 4 && (
          <div className="space-y-5">
            <p className="text-sm text-[#7A7893]">Review your bonus configuration before launch.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Name', value: data.name },
                { label: 'Type', value: data.type.charAt(0).toUpperCase() + data.type.slice(1) },
                { label: 'Metric', value: data.metric === 'units_sold' ? 'Units Sold' : 'Commission Earned' },
                { label: 'Product', value: data.product || 'All Products' },
                { label: 'Scope', value: data.scope === 'chain' ? 'Chain-wide' : data.scope },
                { label: 'Duration', value: data.type === 'sprint' || data.type === 'threshold' ? 'Ends on completion' : (data.customStart && data.customEnd) ? `${data.customStart} → ${data.customEnd}` : data.customStart || data.customEnd || '—' },
              ].map(row => (
                <div key={row.label} className="bg-[#F8F7FC] rounded-xl p-3 border border-[#E2E0ED] rounded-xl">
                  <p className="text-[11px] text-[#9490AA] uppercase tracking-wide">{row.label}</p>
                  <p className="font-semibold text-sm text-[#0E0D1E] mt-0.5">{row.value || '—'}</p>
                </div>
              ))}
            </div>
            {isScheduled && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-700 font-medium">Scheduled to start on <span className="font-bold">{data.customStart}</span></p>
              </div>
            )}
            <div className="p-4 bg-[#EDE9F8] border border-[#C8C3E0] rounded-xl">
              <p className="text-xs font-semibold text-[#796EB2] uppercase tracking-wide mb-1">Financial Commitment</p>
              <p className="text-2xl font-bold text-[#0E0D1E]">€{totalPrize.toFixed(2)}</p>
              <p className="text-xs text-[#796EB2] mt-0.5">{isScheduled ? 'will be locked from your wallet when the bonus starts' : 'will be locked from your wallet upon launch'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => { if (step === 4) { setDone(true); setToast("Bonus launched successfully."); } else setStep(step + 1); }}
          disabled={!canContinue()}
          className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 font-semibold px-6"
        >
          {step === 4 ? (isScheduled ? 'Schedule Bonus' : 'Launch Bonus') : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}