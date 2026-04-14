import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import BonusCard from '@/components/bonuses/BonusCard';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Award } from 'lucide-react';
import { BONUSES } from '@/lib/sampleData';

export default function Bonuses() {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? BONUSES : BONUSES.filter(b => b.status === tab);

  return (
    <div>
      <PageHeader title="Bonuses & Achievements" description="Run competitions to boost staff performance">
        <Link to="/bonuses/new">
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" /> Create Bonus
          </Button>
        </Link>
      </PageHeader>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All ({BONUSES.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({BONUSES.filter(b => b.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({BONUSES.filter(b => b.status === 'completed').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={Award} title="No bonuses yet" description="Create a bonus competition to motivate your team." actionLabel="Create Bonus" onAction={() => window.location.href = '/bonuses/new'} />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(bonus => <BonusCard key={bonus.id} bonus={bonus} />)}
        </div>
      )}
    </div>
  );
}