import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Upload, Zap, Building2, Shield, Lock } from 'lucide-react';
import SuccessToast from '@/components/shared/SuccessToast';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    newSales: true,
    budgetWarnings: true,
    bonusCompletions: false
  });
  const [toast, setToast] = useState(null);
  const showToast = (msg) => setToast(msg);

  const toggle = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0E0D1E]">Settings</h1>
        <p className="text-sm text-[#7A7893] mt-1">Manage your business profile, integrations, and account security preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Business Profile */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-[#0E0D1E]">Business Profile</h2>
              <p className="text-sm text-[#7A7893] mt-0.5">Update your store information and brand identity.</p>
            </div>
            <button onClick={() => showToast("Settings saved.")} className="text-sm text-[#796EB2] font-medium hover:underline">Save Changes</button>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Business Name</Label>
                <Input defaultValue="Barney's Coffeeshop" className="bg-[hsl(var(--background))] mt-2 px-3 py-1 text-base rounded-xl flex w-full border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 h-12 focus-visible:ring-1 focus-visible:ring-[#796EB2]" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-[#7A7893] uppercase tracking-wide">Primary Location</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9490AA]" />
                  <Input defaultValue="Amsterdam — Haarlemmerstraat" className="bg-[hsl(var(--background))] pl-9 px-3 py-1 text-base rounded-xl flex w-full border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 h-12 focus-visible:ring-1 focus-visible:ring-[#796EB2]" />
                </div>
              </div>
              <button className="text-sm text-[#796EB2] font-medium flex items-center gap-1 hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add Location
              </button>
            </div>

            <div className="w-[180px] flex-shrink-0">
              <div className="border border-dashed border-[#C8C3E0] rounded-xl p-5 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-[#EDE9F8] flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-[#796EB2]" />
                </div>
                <p className="text-xs font-semibold text-[#0E0D1E] mb-0.5">Store Logo</p>
                <p className="text-[11px] text-[#9490AA] mb-3">SVG, PNG, or JPG (max. 2MB)</p>
                <button className="text-xs text-[#796EB2] font-medium border border-[#C8C3E0] rounded-lg px-3 py-1.5 hover:bg-[#EDE9F8] transition-colors">
                  Upload Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* POS Integration */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#0E0D1E]">POS Integration</h2>
            <p className="text-sm text-[#7A7893] mt-0.5">Sync your sales data and inventory directly from your POS.</p>
          </div>

          <div className="bg-[#f2f2f7] p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-[#796EB2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#0E0D1E]">Lightspeed POS</span>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold px-2 py-0">CONNECTED</Badge>
                </div>
                <p className="text-xs text-[#9490AA]">Last synced: 4 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm text-[#796EB2] font-medium hover:underline">View Setup Guide</button>
              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                Disconnect
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications + Billing side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] p-6">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-[#0E0D1E]">Notifications</h2>
              <p className="text-sm text-[#7A7893] mt-0.5">Manage how you receive updates.</p>
            </div>
            <div className="space-y-4">
              {[
              { key: 'newSales', label: 'New Sales', desc: 'Daily summary of new store sales.' },
              { key: 'budgetWarnings', label: 'Budget Warnings', desc: 'Alerts when campaign budgets are low.' },
              { key: 'bonusCompletions', label: 'Bonus Completions', desc: 'When staff hit their reward targets.' }].
              map((n) =>
              <div key={n.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0E0D1E]">{n.label}</p>
                    <p className="text-xs text-[#9490AA]">{n.desc}</p>
                  </div>
                  <Switch
                  checked={notifications[n.key]}
                  onCheckedChange={() => toggle(n.key)}
                  className="data-[state=checked]:bg-[#796EB2]" />
                
                </div>
              )}
            </div>
          </div>

          {/* Billing */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] p-6">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-[#0E0D1E]">Billing &amp; Subscription</h2>
              <p className="text-sm text-[#7A7893] mt-0.5">Review and manage your current plan.</p>
            </div>
            <div className="bg-[#F4F3FA] rounded-2xl p-4 mb-4">
              <p className="text-[11px] text-[#796EB2] font-semibold uppercase tracking-wide mb-1">Current Plan</p>
              <p className="text-xl font-bold text-[#0E0D1E]">Growth Plan</p>
              <p className="text-sm text-[#9490AA]">€149/month · billed monthly</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E2E0ED]">
                <p className="text-xs text-[#7A7893]">Renewal Date: <span className="font-semibold text-[#0E0D1E]">May 1, 2026</span></p>
                <button className="text-xs text-[#796EB2] font-medium hover:underline">View Invoice History</button>
              </div>
            </div>
            <Button className="bg-[#796EB2] text-white px-4 py-2 text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow w-full hover:bg-[#6A5FA3] h-12">
              Change Plan
            </Button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#0E0D1E]">Security</h2>
            <p className="text-sm text-[#7A7893] mt-0.5">Control your account access and protection levels.</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#F4F3FA] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#796EB2]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0E0D1E]">Account Authentication</p>
                <p className="text-xs text-[#9490AA]">Update your password or enable 2FA protection.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7A7893] font-medium">2FA Enabled</span>
                <Switch defaultChecked className="data-[state=checked]:bg-[#796EB2]" />
              </div>
              <Button onClick={() => showToast("Password changed successfully.")} variant="outline" size="sm" className="flex items-center gap-1.5 border-[#E2E0ED] text-[#0E0D1E]">
                <Lock className="w-3.5 h-3.5" /> Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#9490AA] py-4">© 2026 Moongrow Technologies. All rights reserved.</p>
      </div>
      <SuccessToast message={toast} onDismiss={() => setToast(null)} />
    </div>);

}