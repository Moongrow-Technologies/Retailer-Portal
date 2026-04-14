import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Mail, Link2, Copy, Check } from 'lucide-react';

export default function InviteStaffModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const inviteLink = 'https://app.moongrow.io/join/dgh-centrum-abc123';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Staff</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="email" className="mt-2">
          <TabsList className="bg-muted w-full">
            <TabsTrigger value="email" className="flex-1 gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</TabsTrigger>
            <TabsTrigger value="link" className="flex-1 gap-1.5"><Link2 className="w-3.5 h-3.5" /> Shareable Link</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="mt-4 space-y-3">
            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="team@degroenehoek.nl" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <p className="text-xs text-muted-foreground">The staff member will receive an invite to join your team. Their store will be auto-assigned.</p>
            <Button className="w-full bg-primary hover:bg-primary/90" disabled={!email}>Send Invite</Button>
          </TabsContent>
          <TabsContent value="link" className="mt-4 space-y-3">
            <div>
              <Label>Invite Link</Label>
              <div className="flex gap-2 mt-1.5">
                <Input readOnly value={inviteLink} className="text-xs" />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Share this link with your team. The link carries the store ID — staff never choose their store manually.</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}