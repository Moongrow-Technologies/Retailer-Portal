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
        <Button variant="outline" className="gap-2">
          <Award className="w-4 h-4" /> Create Bonus
        </Button>
      </Link>
      <Link to="/wallet">
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Top Up Wallet
        </Button>
      </Link>
    </div>
  );
}