/**
 * Centralized mutable app store — single source of truth for all runtime state.
 * Uses a simple pub/sub pattern so any component can subscribe to changes.
 */
import {
  CAMPAIGNS as INIT_CAMPAIGNS,
  BONUSES as INIT_BONUSES,
  STAFF as INIT_STAFF,
  WALLET as INIT_WALLET,
  TRANSACTIONS as INIT_TRANSACTIONS,
  ACTIVITIES as INIT_ACTIVITIES,
} from '@/lib/sampleData';

// ─── Mutable state ────────────────────────────────────────────────────────────
let state = {
  campaigns: [...INIT_CAMPAIGNS],
  bonuses: [...INIT_BONUSES],
  staff: [...INIT_STAFF],
  wallet: { ...INIT_WALLET },
  transactions: [...INIT_TRANSACTIONS],
  activities: [...INIT_ACTIVITIES],
};

// ─── Pub/sub ──────────────────────────────────────────────────────────────────
const listeners = new Set();
function notify() { listeners.forEach(fn => fn()); }
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// ─── Getters ──────────────────────────────────────────────────────────────────
export const getState = () => state;
export const getCampaigns = () => state.campaigns;
export function getBonuses() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return state.bonuses.map(b => {
    if (b.status === 'active' && b.end_date) {
      const end = new Date(b.end_date);
      end.setHours(0, 0, 0, 0);
      if (end < today) return { ...b, status: 'completed' };
    }
    return b;
  });
}
export const getStaff = () => state.staff;
export const getWallet = () => state.wallet;
export const getTransactions = () => state.transactions;
export const getActivities = () => state.activities;

// ─── Wallet helpers ───────────────────────────────────────────────────────────
function recalcWallet() {
  // campaign_paid_out = sum of all commission transactions related to campaigns
  const commissions = state.transactions
    .filter(t => t.type === 'commission')
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const bonusPayouts = state.transactions
    .filter(t => t.type === 'bonus_payout')
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const topUps = state.transactions
    .filter(t => t.type === 'top_up')
    .reduce((s, t) => s + t.amount, 0);
  const budgetCommits = state.transactions
    .filter(t => t.type === 'budget_commit')
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const budgetReleases = state.transactions
    .filter(t => t.type === 'budget_release')
    .reduce((s, t) => s + t.amount, 0);

  // Campaign fund = total budget committed (all non-completed campaigns)
  const campaignFundTotal = state.campaigns
    .filter(c => c.status !== 'completed' && c.status !== 'paused_budget')
    .reduce((s, c) => s + c.budget, 0)
    + state.campaigns
      .filter(c => c.status === 'completed' || c.status === 'paused_budget')
      .reduce((s, c) => s + c.spent, 0);

  const campaignPaidOut = commissions;
  const bonusFundTotal = state.bonuses.reduce((s, b) => s + (b.prize_pool || 0), 0);
  const totalBalance = topUps - commissions - bonusPayouts;
  const committedCampaigns = state.campaigns
    .filter(c => c.status === 'active' || c.status === 'scheduled' || c.status === 'paused_manual')
    .reduce((s, c) => s + (c.budget - c.spent), 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const committedBonuses = state.bonuses
    .filter(b => (b.status === 'active' || b.status === 'scheduled') && (!b.end_date || new Date(b.end_date) >= today))
    .reduce((s, b) => s + (b.prize_pool || 0), 0);

  // campaign_fund_total = sum of all budgets ever committed (active + paused + completed + their spent)
  const allCampaignBudgets = state.campaigns.reduce((s, c) => s + c.budget, 0);
  const allBonusPools = state.bonuses.reduce((s, b) => s + (b.prize_pool || 0), 0);

  state.wallet = {
    ...state.wallet,
    total_balance: Math.max(0, totalBalance),
    committed_campaigns: Math.max(0, committedCampaigns),
    committed_bonuses: Math.max(0, committedBonuses),
    available: Math.max(0, totalBalance - committedCampaigns - committedBonuses),
    campaign_fund_total: Math.max(allCampaignBudgets, INIT_WALLET.campaign_fund_total),
    campaign_paid_out: campaignPaidOut,
    bonus_fund_total: Math.max(allBonusPools, INIT_WALLET.bonus_fund_total),
    bonus_paid_out: bonusPayouts,
  };
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function topUpWallet(amount) {
  const tx = {
    id: `t_${Date.now()}`,
    type: 'top_up',
    amount: Number(amount),
    description: `Wallet top-up via USDC transfer`,
    created_date: new Date().toISOString(),
  };
  state = { ...state, transactions: [tx, ...state.transactions] };
  state.activities = [{
    type: 'top_up',
    message: `Wallet topped up with $${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0 })} USDC`,
    actor: 'Admin',
    amount: Number(amount),
    created_date: new Date().toISOString(),
  }, ...state.activities];
  recalcWallet();
  notify();
}

export function withdrawWallet(amount) {
  const tx = {
    id: `t_${Date.now()}`,
    type: 'budget_release',
    amount: Number(amount),
    description: `Withdrawal to bank account`,
    created_date: new Date().toISOString(),
  };
  state = { ...state, transactions: [tx, ...state.transactions] };
  state.wallet = {
    ...state.wallet,
    total_balance: Math.max(0, state.wallet.total_balance - Number(amount)),
    available: Math.max(0, state.wallet.available - Number(amount)),
  };
  notify();
}

export function addCampaign(campaign) {
  const newCampaign = {
    ...campaign,
    id: campaign.id || `c_${Date.now()}`,
    spent: 0,
    units_sold: 0,
  };
  const commitTx = {
    id: `t_${Date.now()}`,
    type: 'budget_commit',
    amount: -Number(campaign.budget),
    description: `Budget committed: ${campaign.name}`,
    campaign_name: campaign.name,
    created_date: new Date().toISOString(),
  };
  state = {
    ...state,
    campaigns: [...state.campaigns, newCampaign],
    transactions: [commitTx, ...state.transactions],
    activities: [{
      type: 'campaign_created',
      message: `${campaign.name} campaign created`,
      actor: 'Admin',
      campaign_name: campaign.name,
      created_date: new Date().toISOString(),
    }, ...state.activities],
  };
  recalcWallet();
  notify();
}

export function updateCampaign(id, updates) {
  state = {
    ...state,
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c),
  };
  recalcWallet();
  notify();
}

export function deleteCampaign(id) {
  state = { ...state, campaigns: state.campaigns.filter(c => c.id !== id) };
  recalcWallet();
  notify();
}

export function restartCampaign(id) {
  const c = state.campaigns.find(c => c.id === id);
  if (!c) return;
  state = {
    ...state,
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, status: 'active', spent: 0, units_sold: 0 } : c),
    activities: [{
      type: 'campaign_resumed',
      message: `${c.name} restarted`,
      actor: 'Admin',
      campaign_name: c.name,
      created_date: new Date().toISOString(),
    }, ...state.activities],
  };
  recalcWallet();
  notify();
}

export function toggleCampaignStatus(id) {
  const c = state.campaigns.find(c => c.id === id);
  if (!c) return;
  const newStatus = c.status === 'active' ? 'paused_manual' : 'active';
  state = {
    ...state,
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, status: newStatus } : c),
    activities: [{
      type: newStatus === 'paused_manual' ? 'campaign_paused' : 'campaign_resumed',
      message: `${c.name} ${newStatus === 'paused_manual' ? 'paused' : 'resumed'}`,
      actor: 'Admin',
      campaign_name: c.name,
      created_date: new Date().toISOString(),
    }, ...state.activities],
  };
  recalcWallet();
  notify();
}

export function addBonus(bonus) {
  const newBonus = { ...bonus, id: bonus.id || `b_${Date.now()}` };
  const commitTx = {
    id: `t_${Date.now()}`,
    type: 'budget_commit',
    amount: -(bonus.prize_pool || 0),
    description: `Budget committed: ${bonus.name} bonus`,
    bonus_name: bonus.name,
    created_date: new Date().toISOString(),
  };
  state = {
    ...state,
    bonuses: [...state.bonuses, newBonus],
    transactions: [commitTx, ...state.transactions],
    activities: [{
      type: 'bonus_created',
      message: `${bonus.name} bonus created`,
      actor: 'Admin',
      created_date: new Date().toISOString(),
    }, ...state.activities],
  };
  recalcWallet();
  notify();
}

export function updateBonus(id, updates) {
  state = {
    ...state,
    bonuses: state.bonuses.map(b => b.id === id ? { ...b, ...updates } : b),
  };
  recalcWallet();
  notify();
}

export function deleteBonus(id) {
  state = { ...state, bonuses: state.bonuses.filter(b => b.id !== id) };
  recalcWallet();
  notify();
}

export function toggleBonusStatus(id) {
  const b = state.bonuses.find(b => b.id === id);
  if (!b) return;
  const newStatus = b.status === 'active' ? 'paused_manual' : 'active';
  state = {
    ...state,
    bonuses: state.bonuses.map(b => b.id === id ? { ...b, status: newStatus } : b),
  };
  recalcWallet();
  notify();
}

export function addStaffMember(member) {
  const newMember = {
    ...member,
    id: member.id || `s_${Date.now()}`,
    status: 'pending',
    total_commissions: 0,
    total_units_sold: 0,
    bonus_wins: 0,
  };
  state = {
    ...state,
    staff: [...state.staff, newMember],
    activities: [{
      type: 'staff_joined',
      message: `Invite sent to ${member.email}`,
      actor: 'Admin',
      created_date: new Date().toISOString(),
    }, ...state.activities],
  };
  notify();
}

export function updateStaff(id, updates) {
  state = {
    ...state,
    staff: state.staff.map(s => s.id === id ? { ...s, ...updates } : s),
  };
  notify();
}