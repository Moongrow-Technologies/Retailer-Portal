import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

export default function EditBonusModal({ bonus, open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    prize_pool: bonus?.prize_pool || 0,
    end_date: bonus?.end_date || '',
    threshold_target: bonus?.threshold_target || 0,
  });

  const handleSave = () => {
    onSave?.(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0E0D1E] font-bold">Edit Bonus</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-[#7A7893] text-sm font-medium">Prize Amount (€)</Label>
            <Input
              type="number"
              value={formData.prize_pool}
              onChange={(e) => setFormData({ ...formData, prize_pool: parseFloat(e.target.value) })}
              className="mt-1.5 border-[#E2E0ED]"
            />
          </div>
          <div>
            <Label className="text-[#7A7893] text-sm font-medium">End Date</Label>
            <Input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="mt-1.5 border-[#E2E0ED]"
            />
          </div>
          <div>
            <Label className="text-[#7A7893] text-sm font-medium">Target</Label>
            <Input
              type="number"
              value={formData.threshold_target}
              onChange={(e) => setFormData({ ...formData, threshold_target: parseFloat(e.target.value) })}
              className="mt-1.5 border-[#E2E0ED]"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-[#E2E0ED]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#796EB2] hover:bg-[#6A5FA3] text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}