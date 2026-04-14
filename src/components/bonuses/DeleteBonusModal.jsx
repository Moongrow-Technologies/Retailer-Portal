import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DeleteBonusModal({ bonus, open, onOpenChange, onConfirm, isActive }) {
  const handleDelete = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0E0D1E] font-bold">Delete Bonus</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-[#7A7893] text-sm">
            {isActive
              ? 'This bonus is currently active. Deleting it will cancel the competition for all staff. Are you sure?'
              : 'Are you sure you want to delete this bonus? This cannot be undone.'}
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-[#E2E0ED] text-[#7A7893]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-white"
            >
              Delete Bonus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}