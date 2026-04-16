import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Award, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActions() {
  return (
    <div className="flex items-center gap-3">
      <Link to="/campaigns/new">
        <Button className="bg-[#2f2f46] text-primary-foreground px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-primary/90 gap-2">
          <Megaphone className="w-4 h-4" /> Create Campaign
        </Button>
      </Link>
      <Link to="/bonuses/new">
        <Button variant="outline" className="gap-2 border-[#E2E0ED] text-[#0E0D1E] hover:bg-[#F5F4FA]">
          <Award className="w-4 h-4" /> Create Bonus
        </Button>
      </Link>
    </div>);

}