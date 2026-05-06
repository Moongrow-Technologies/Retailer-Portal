import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SuccessToast from '@/components/shared/SuccessToast';
import { PRODUCTS, STORE } from '@/lib/sampleData';
import { cn } from '@/lib/utils';
import { getWallet, getCampaigns } from '@/lib/appStore';

export default function EditCampaign() {
  const navigate = useNavigate();
  const { id } = useParams();
  const campaign = getCampaigns().find(c => c.id === id);

  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    product: campaign?.product_name || '',
    stores: campaign?.stores || [],
    commission_rate: campaign?.commission_rate?.toString() || '',
    budget: campaign?.budget?.toString() || '',
    start_date: campaign?.start_date || '',
    end_date: campaign?.end_date || '',
    name: campaign?.name || '',
  });

  const toggleStore = (store) => {
    setData(prev => ({
      ...prev,
      stores: prev.stores.includes(store)
        ? prev.stores.filter(s => s !== store)
        : [...prev.stores, store]
    }));
  };

  const canSave = () =>
    data.product &&
    data.stores.length > 0 &&
    data.name &&
    data.commission_rate && Number(data.commission_rate) > 0 &&
    data.budget && Number(data.budget) > 0;

  const handleSave = () => {
    if (!canSave() || saving) return;
    setSaving(true);
    // Simulate async save
    setTimeout(() => {
      setToast('Campaign updated successfully.');
      setSaving(false);
      setTimeout(() => navigate('/campaigns'), 1500);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/campaigns')}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Campaigns
      </button>

      <div className="mb-6">
        <h1 className="text-xl font-bold">Edit Campaign</h1>
        <p className="text-sm text-muted-foreground mt-1">Update campaign details below.</p>
      </div>

      <div className="space-y-6">
        {/* Campaign Name */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#0E0D1E]">Campaign Details</h2>
          <div>
            <Label>Campaign Name</Label>
            <Input
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              className="mt-1.5"
              placeholder="e.g. OG Kush Campaign"
            />
          </div>
          <div>
            <Label>Commission Rate (EURC per unit)</Label>
            <Input
              type="number"
              step="0.25"
              placeholder="e.g. 2.00"
              value={data.commission_rate}
              onChange={e => setData({ ...data, commission_rate: e.target.value })}
              className="mt-1.5"
            />
            {data.product && (
              <p className="text-xs text-muted-foreground mt-1">Staff earn this amount for every unit of {data.product} sold.</p>
            )}
          </div>
        </div>

        {/* Product */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-semibold text-[#0E0D1E]">Product</h2>
          <div className="grid gap-2">
            {PRODUCTS.map(p => (
              <button
                key={p.name}
                onClick={() => setData({ ...data, product: p.name })}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all text-left",
                  data.product === p.name
                    ? "border-[#796EB2] bg-[#F0EEF9]"
                    : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]"
                )}
              >
                <div className="flex items-center gap-3">
                  {data.product === p.name && (
                    <div className="w-5 h-5 rounded-full bg-[#796EB2] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {data.product !== p.name && (
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
        </div>

        {/* Stores */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-semibold text-[#0E0D1E]">Stores</h2>
          <div className="grid gap-2">
            {STORE.locations.map(store => (
              <button
                key={store}
                onClick={() => toggleStore(store)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border transition-all text-left",
                  data.stores.includes(store)
                    ? "border-[#796EB2] bg-[#F0EEF9]"
                    : "border-border hover:border-[#796EB2] hover:bg-[#F5F3FC]"
                )}
              >
                <Checkbox checked={data.stores.includes(store)} />
                <p className="font-medium">{store}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Budget & Dates */}
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#0E0D1E]">Budget & Duration</h2>
          <div>
            <Label>Total Budget (EURC)</Label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={data.budget}
              onChange={e => setData({ ...data, budget: e.target.value })}
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Available: €{getWallet().available.toFixed(2)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={data.start_date}
                onChange={e => setData({ ...data, start_date: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={data.end_date}
                onChange={e => setData({ ...data, end_date: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <Button variant="outline" onClick={() => navigate('/campaigns')}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!canSave() || saving}
          className="bg-primary hover:bg-primary/90 gap-2 min-w-[130px]"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>

      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}