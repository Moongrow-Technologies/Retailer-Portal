import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wallet } from 'lucide-react';
import { topUpWallet } from '@/lib/appStore';

export default function TopUpModal({ open, onClose }) {
  const [amount, setAmount] = useState('');
  const presets = [100, 250, 500, 1000];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" /> Top Up Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label className="text-sm font-medium">Amount (EURC)</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1.5 text-lg font-semibold"
            />
          </div>
          <div className="flex gap-2">
            {presets.map(p => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-primary/5 hover:border-primary/30 transition-colors"
              >
                €{p}
              </button>
            ))}
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              EURC will be transferred to your Moongrow wallet. Funds are available instantly for campaign budgets and bonus prizes.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-primary hover:bg-primary/90" disabled={!amount || Number(amount) <= 0}
            onClick={() => { topUpWallet(Number(amount)); setAmount(''); onClose(); }}>
            Top Up €{amount || '0'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}