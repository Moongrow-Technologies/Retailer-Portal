import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { STORE } from '@/lib/sampleData';
import { ArrowRight, Plus, Trash2, Store, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StepStoreDetails({ onNext }) {
  const [businessName, setBusinessName] = useState(STORE.name);
  const [locations, setLocations] = useState([...STORE.locations]);
  const [newLocation, setNewLocation] = useState('');

  const updateLocation = (i, val) => {
    const updated = [...locations];
    updated[i] = val;
    setLocations(updated);
  };

  const removeLocation = (i) => setLocations(locations.filter((_, idx) => idx !== i));

  const addLocation = () => {
    if (!newLocation.trim()) return;
    setLocations([...locations, newLocation.trim()]);
    setNewLocation('');
  };

  const handleNext = () => {
    onNext({ businessName, locations });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#0E0D1E]">Welcome to Moongrow</h1>
        <p className="text-sm text-[#7A7893] mt-1.5 leading-relaxed">
          We pulled your store details from your POS system. Check everything looks right — you can edit anything here.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-6 space-y-5 hover:border-[#796EB2]/30 transition-colors">
        {/* Business name */}
        <div>
          <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" /> Business name
          </Label>
          <Input
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="mt-2 border-[#EBEBF0] focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2] hover:border-[#796EB2]/40 transition-colors"
          />
        </div>

        {/* Locations */}
        <div>
          <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5" /> Store locations
          </Label>
          <div className="space-y-2">
            {locations.map((loc, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={loc}
                  onChange={e => updateLocation(i, e.target.value)}
                  className="border-[#EBEBF0] focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2] hover:border-[#796EB2]/40 transition-colors"
                />
                {locations.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLocation(i)}
                    className="shrink-0 text-[#C0BDCE] hover:text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add location */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add another location…"
              value={newLocation}
              onChange={e => setNewLocation(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLocation())}
              className="border-[#EBEBF0] border-dashed focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2] hover:border-[#796EB2]/40 transition-colors"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={addLocation}
              disabled={!newLocation.trim()}
              className="shrink-0 border-[#EBEBF0] hover:bg-[#F8F7FC] hover:border-[#796EB2]/40"
            >
              <Plus className="w-4 h-4 text-[#796EB2]" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!businessName.trim() || locations.length === 0}
          className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2"
        >
          Confirm & continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}