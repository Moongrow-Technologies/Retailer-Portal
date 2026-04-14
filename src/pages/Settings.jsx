import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Building2, Link2, Bell, CreditCard, Shield, Check, Upload } from 'lucide-react';
import { STORE } from '@/lib/sampleData';

export default function Settings() {
  const [tab, setTab] = useState('business');

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <div className="flex gap-8">
        <Tabs value={tab} onValueChange={setTab} orientation="vertical" className="w-full flex gap-8">
          <TabsList className="flex flex-col h-auto bg-transparent gap-1 w-[200px] flex-shrink-0">
            {[
              { value: 'business', icon: Building2, label: 'Business Profile' },
              { value: 'pos', icon: Link2, label: 'POS Integration' },
              { value: 'notifications', icon: Bell, label: 'Notifications' },
              { value: 'billing', icon: CreditCard, label: 'Billing' },
              { value: 'security', icon: Shield, label: 'Security' },
            ].map(item => (
              <TabsTrigger key={item.value} value={item.value}
                className="justify-start gap-2 px-3 py-2.5 text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full">
                <item.icon className="w-4 h-4" /> {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1">
            <TabsContent value="business" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-semibold">Business Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Store Name</Label>
                    <Input defaultValue={STORE.name} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input defaultValue={STORE.city} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Locations</Label>
                  <div className="mt-1.5 space-y-2">
                    {STORE.locations.map(l => (
                      <div key={l} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Logo</Label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload your logo</p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="pos" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-semibold">POS Integration</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Lightspeed POS</p>
                      <p className="text-sm text-muted-foreground">Connected · Last sync 2 min ago</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Connected</Badge>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Setup Guide</p>
                  <p className="text-xs text-muted-foreground">Your Lightspeed POS is connected. Sales data syncs in real-time. Commission settlements happen instantly when a qualifying sale is recorded.</p>
                </div>
                <Button variant="outline" className="text-destructive hover:text-destructive">Disconnect POS</Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold">Notification Preferences</h3>
                {[
                  { label: 'New sales', desc: 'Get notified when staff make qualifying sales', default: true },
                  { label: 'Budget warnings', desc: 'Alert when campaign budget is running low', default: true },
                  { label: 'Bonus completions', desc: 'Notify when a bonus competition ends', default: true },
                  { label: 'Staff activity', desc: 'Alert when staff join or leave', default: false },
                  { label: 'Weekly digest', desc: 'Summary of all activity every Monday', default: true },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={n.default} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-semibold">Billing & Subscription</h3>
                <div className="p-5 border rounded-xl bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">Growth Plan</p>
                      <p className="text-sm text-muted-foreground">€149/month · Renews May 14, 2026</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">View Invoices</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recent Invoices</h4>
                  {['Apr 14, 2026', 'Mar 14, 2026', 'Feb 14, 2026'].map(date => (
                    <div key={date} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">{date}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">€149.00</span>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                <h3 className="font-semibold">Security</h3>
                <div>
                  <Label>Change Password</Label>
                  <div className="grid gap-3 mt-1.5">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="mt-3 bg-primary hover:bg-primary/90">Update Password</Button>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}