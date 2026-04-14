import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Award, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActions() {
  return (
    <div className="flex items-center gap-3">
      <Link to="/campaigns/new">
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Megaphone className="w-4 h-4" /> Create Campaign
        </Button>
      </Link>
      <Link to="/bonuses/new">
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E] hover:bg-[#F5F4FA]">
          <Award className="w-4 h-4" /> Create Bonus
        </Button>
      </Link>
    </div>
  );
}