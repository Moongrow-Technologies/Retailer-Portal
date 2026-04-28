import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { STAFF, STAFF_AVATARS } from '@/lib/sampleData';
import { ArrowRight, Plus, Trash2, Check, Users, Mail, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StepInviteStaff({ onNext, onSkip, onBack }) {
  // Pre-populate from POS staff sample data (exclude one to simulate "not on list")
  const [staffList, setStaffList] = useState(
    STAFF.map(s => ({ name: s.name, email: s.email, selected: true }))
  );
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [sent, setSent] = useState(false);

  const toggleStaff = (i) => {
    const updated = [...staffList];
    updated[i].selected = !updated[i].selected;
    setStaffList(updated);
  };

  const addManual = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    setStaffList([...staffList, { name: newName.trim(), email: newEmail.trim(), selected: true }]);
    setNewName('');
    setNewEmail('');
  };

  const removeStaff = (i) => setStaffList(staffList.filter((_, idx) => idx !== i));

  const selectedCount = staffList.filter(s => s.selected).length;

  const handleSendInvites = () => {
    setSent(true);
    setTimeout(() => onNext(), 1200);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#0E0D1E]">Invite your staff</h2>
        <p className="text-sm text-[#7A7893] mt-1.5 leading-relaxed">
          Your team below was imported from your POS system. Select who to invite and they'll receive a link to download the Moongrow app.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm overflow-hidden">
        {/* Staff list */}
        <div className="divide-y divide-[#EBEBF0]">
          {staffList.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-5 py-3.5 transition-colors cursor-pointer hover:bg-[#F4F3FA]",
                s.selected ? "bg-white" : "bg-[#FAFAFA]"
              )}
              onClick={() => toggleStaff(i)}
            >
              {/* Checkbox */}
              <div className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                s.selected ? "bg-[#796EB2] border-[#796EB2]" : "border-[#D0CDDC] bg-white"
              )}>
                {s.selected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-[#EDE9F8] flex items-center justify-center shrink-0 overflow-hidden">
                {STAFF_AVATARS[s.name] ? (
                  <img src={STAFF_AVATARS[s.name]} alt={s.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-[#796EB2]">{s.name.charAt(0)}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0E0D1E] truncate">{s.name}</p>
                <p className="text-xs text-[#9490AA] truncate">{s.email}</p>
              </div>

              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeStaff(i); }}
                className="text-black hover:text-red-400 transition-colors p-1 shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add manual */}
        <div className="border-t border-[#EBEBF0] p-4 space-y-2 bg-[#FAFAFA]">
          <p className="text-xs font-semibold text-[#9490AA] uppercase tracking-wide">Add someone not on the list</p>
          <div className="flex gap-2">
            <Input
              placeholder="Full name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="border-[#EBEBF0] text-sm focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2]"
            />
            <Input
              placeholder="Email address"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addManual())}
              className="border-[#EBEBF0] text-sm focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2]"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addManual}
              disabled={!newName.trim() || !newEmail.trim()}
              className="shrink-0 border-[#EBEBF0] hover:bg-white hover:border-[#796EB2]/40"
            >
              <Plus className="w-4 h-4 text-black" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[#9490AA] hover:text-[#796EB2] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={onSkip}
            className="text-sm text-[#9490AA] hover:text-[#796EB2] transition-colors underline"
          >
            Skip for now
          </button>
        </div>
        <Button
          onClick={handleSendInvites}
          disabled={selectedCount === 0 || sent}
          className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2"
        >
          {sent ? (
            <><Check className="w-4 h-4" /> Invites sent!</>
          ) : (
            <><Mail className="w-4 h-4" /> Send {selectedCount} invite{selectedCount !== 1 ? 's' : ''}</>
          )}
        </Button>
      </div>
    </div>
  );
}