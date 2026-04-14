import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BonusCard from '@/components/bonuses/BonusCard';
import { Plus, Wallet, Lock } from 'lucide-react';
import { BONUSES, WALLET } from '@/lib/sampleData';

const TABS = [
  { key: 'active', label: 'Active' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'completed', label: 'Completed' },
];

export default function Bonuses() {
  const [tab, setTab] = useState('active');

  const filtered = tab === 'scheduled'
    ? []
    : BONUSES.filter(b => b.status === tab);

  const activeBonuses = BONUSES.filter(b => b.status === 'active');
  const committedBonuses = activeBonuses.reduce((s, b) => s + b.prize_pool, 0);

  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0E0D1E]">Bonuses</h1>
          <p className="text-sm text-[#7A7893] mt-1">Run competitions and reward your top performers.</p>
        </div>
        <Link to="/bonuses/new">
          <Button className="bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Create New Bonus
          </Button>
        </Link>
      </div>

      {/* Wallet summary bar */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9F8] flex items-center justify-center">
            <Wallet className="w-5 h-5 text-[#796EB2]" />
          </div>
          <div>
            <p className="text-xs text-[#9490AA]">Available Balance</p>
            <p className="text-lg font-bold text-[#0E0D1E]">€{WALLET.available.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-[#9490AA]">Committed to Active Bonuses</p>
            <p className="text-lg font-bold text-[#0E0D1E]">€{committedBonuses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-[#F8F7FC] rounded-xl p-1 w-fit border border-[#EBEBF0]">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-white text-[#796EB2] shadow-sm border border-[#E2E0ED]'
                : 'text-[#7A7893] hover:text-[#796EB2]'
            }`}
          >
            {t.label}
            {t.key !== 'scheduled' && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#EDE9F8] text-[#796EB2]' : 'bg-[#EBEBF0] text-[#9490AA]'}`}>
                {BONUSES.filter(b => b.status === t.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBEBF0] p-12 text-center">
          <p className="text-[#9490AA] text-sm">No {tab} bonuses yet.</p>
          {tab === 'active' && (
            <Link to="/bonuses/new">
              <Button className="mt-4 bg-[#796EB2] hover:bg-[#6A5FA3] text-white">Create your first bonus</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-[#F8F7FC] rounded-xl border border-[#EBEBF0] p-4 grid grid-cols-2 gap-4">
          {filtered.map(bonus => <BonusCard key={bonus.id} bonus={bonus} />)}
        </div>
      )}
    </div>
  );
}