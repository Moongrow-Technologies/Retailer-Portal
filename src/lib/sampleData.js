// Centralized sample data for the Moongrow app

export const STORE = {
  name: 'De Groene Hoek',
  city: 'Amsterdam',
  locations: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost', 'De Groene Hoek — Zuid'],
};

export const PRODUCTS = [
  { id: 'p1', name: 'OG Kush',      sku: 'OGK-001', category: 'Flower', price: 12.50, img: 'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80' },
  { id: 'p2', name: 'Blue Dream',   sku: 'BLD-002', category: 'Flower', price: 11.00, img: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80' },
  { id: 'p3', name: 'Amnesia Haze', sku: 'AMH-003', category: 'Flower', price: 13.00, img: 'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80' },
  { id: 'p4', name: 'White Widow',  sku: 'WTW-004', category: 'Flower', price: 10.50, img: 'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80' },
  { id: 'p5', name: 'Gorilla Glue', sku: 'GRG-005', category: 'Flower', price: 14.00, img: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80' },
];

export const PRODUCT_IMAGES = {
  'OG Kush':      'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80',
  'Blue Dream':   'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
  'Amnesia Haze': 'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80',
  'White Widow':  'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80',
  'Gorilla Glue': 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80',
  default:        'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
};

export const STAFF_AVATARS = {
  'Lisa V.':    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'Ahmed R.':   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'Sarah K.':   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'Tom B.':     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  'Marco D.':   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  'Fatima A.':  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  'Javier L.':  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  'Nina D.':    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
};

export const STAFF = [
  { id: 's1', name: 'Lisa V.',   email: 'lisa@degroenehoek.nl',   role: 'lead',      store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 346.00, total_units_sold: 178, bonus_wins: 3, avatar_url: STAFF_AVATARS['Lisa V.'] },
  { id: 's2', name: 'Ahmed R.',  email: 'ahmed@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 274.00, total_units_sold: 149, bonus_wins: 1, avatar_url: STAFF_AVATARS['Ahmed R.'] },
  { id: 's3', name: 'Sarah K.',  email: 'sarah@degroenehoek.nl',  role: 'lead',      store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 242.00, total_units_sold: 131, bonus_wins: 2, avatar_url: STAFF_AVATARS['Sarah K.'] },
  { id: 's4', name: 'Tom B.',    email: 'tom@degroenehoek.nl',    role: 'budtender', store: 'De Groene Hoek — Zuid',   status: 'active',  total_commissions: 170.00, total_units_sold: 92,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Tom B.'] },
  { id: 's5', name: 'Marco D.',  email: 'marco@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active', total_commissions: 159.00, total_units_sold: 87,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Marco D.'] },
  { id: 's6', name: 'Fatima A.', email: 'fatima@degroenehoek.nl', role: 'budtender', store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 138.00, total_units_sold: 74,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Fatima A.'] },
  { id: 's7', name: 'Javier L.', email: 'javier@degroenehoek.nl', role: 'budtender', store: 'De Groene Hoek — Zuid',   status: 'active',  total_commissions: 112.00, total_units_sold: 61,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Javier L.'] },
  { id: 's8', name: 'Nina D.',   email: 'nina@degroenehoek.nl',   role: 'budtender', store: 'De Groene Hoek — Oost',   status: 'pending', total_commissions: 0,      total_units_sold: 0,   bonus_wins: 0, avatar_url: STAFF_AVATARS['Nina D.'] },
];

// ─── CAMPAIGNS ───────────────────────────────────────────────────────────────
// Budget math (per spec):
//   c1 OG Kush Spring Push:    budget €400,  spent €312 (156 × €2.00),  active   — 3 days left  → end_date Apr 30 2026
//   c2 Amnesia Haze Launch:    budget €500,  spent €175 (70  × €2.50),  active   — 18 days left → end_date May 15 2026
//   c3 Blue Dream Blitz:       budget €300,  spent €300 (200 × €1.50),  completed — target hit
//   c4 White Widow Weekend:    budget €200,  spent €200 (80  × €2.50),  paused_budget (100%) → show as Completed
//   c5 Gorilla Glue Promo:     budget €300,  spent €45  (15  × €3.00),  paused_manual — budget low
//
// Wallet: total €3,200 — committed campaigns (budget of active/paused) = 400+500+300 = €1,200 remaining portion
// Campaign fund committed = remaining budgets of non-completed campaigns = (400-312)+(500-175)+(300-45) = 88+325+255 = €668 remaining
// Paid out across all campaigns = 312+300+175+200+45 = €1,032  → spec says €687 paid out (active only incl. Gorilla) and €1,413 remaining committed
// Per spec: Campaign Fund €2,100 total (€687 paid out, €1,413 remaining)
export const CAMPAIGNS = [
  { id: 'c1', name: 'OG Kush Spring Push',  product_name: 'OG Kush',      stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost'], commission_rate: 2.00, budget: 400, spent: 312.00, units_sold: 156, target_units: 200, status: 'active',       start_date: '2026-03-15', end_date: '2026-04-30', duration_days: 46 },
  { id: 'c2', name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze',  stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost', 'De Groene Hoek — Zuid'], commission_rate: 2.50, budget: 500, spent: 175.00, units_sold: 70, target_units: 200, status: 'active', start_date: '2026-04-01', end_date: '2026-05-15', duration_days: 44 },
  { id: 'c3', name: 'Blue Dream Blitz',     product_name: 'Blue Dream',    stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost'], commission_rate: 1.50, budget: 300, spent: 300.00, units_sold: 200, target_units: 200, status: 'completed',    start_date: '2026-02-01', end_date: '2026-03-01', duration_days: 28 },
  { id: 'c4', name: 'White Widow Weekend',  product_name: 'White Widow',   stores: ['De Groene Hoek — Zuid'],                             commission_rate: 2.50, budget: 200, spent: 200.00, units_sold: 80,  target_units: 80,  status: 'paused_budget', start_date: '2026-04-05', end_date: '2026-04-20', duration_days: 15 },
  { id: 'c5', name: 'Gorilla Glue Promo',   product_name: 'Gorilla Glue',  stores: ['De Groene Hoek — Centrum'],                          commission_rate: 3.00, budget: 300, spent: 45.00,  units_sold: 15,  target_units: 100, status: 'paused_manual', start_date: '2026-04-10', end_date: '2026-05-10', duration_days: 30 },
];

// ─── BONUSES ─────────────────────────────────────────────────────────────────
// Per spec: Bonus Fund €600 total (€250 paid out, €350 remaining)
// Active bonuses committed: Top Seller Week 17 €175 + Amnesia Haze Sprint €50 = €225
// Completed payouts: March Top Seller €100 + Blue Dream Challenge €200 = €300 (but spec says €250 paid) — use spec numbers
export const BONUSES = [
  {
    id: 'b1', name: 'Top Seller Week 17', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'active', start_date: '2026-04-14', end_date: '2026-04-21',
    prize_pool: 175, prizes: [{ position: 1, amount: 100, label: '1st' }, { position: 2, amount: 50, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 7, current_leader: 'Lisa V.', leader_score: 38,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 38, store: 'Centrum', prize: 100 },
      { rank: 2, name: 'Ahmed R.',  score: 31, store: 'Centrum', prize: 50  },
      { rank: 3, name: 'Sarah K.',  score: 24, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',    score: 17, store: 'Zuid',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 15, store: 'Centrum', prize: null },
      { rank: 6, name: 'Fatima A.', score: 11, store: 'Oost',    prize: null },
      { rank: 7, name: 'Javier L.', score: 8,  store: 'Zuid',    prize: null },
    ],
    hours_left: 86,
  },
  {
    id: 'b2', name: 'Amnesia Haze Sprint', type: 'sprint', metric: 'units_sold', product_name: 'Amnesia Haze',
    scope: 'chain', status: 'active', start_date: '2026-04-14', end_date: null,
    threshold_target: 30, prize_pool: 50, prizes: [{ position: 1, amount: 50, label: 'Winner' }],
    participants: 7, current_leader: 'Ahmed R.', leader_score: 24,
    leaderboard: [
      { rank: 1, name: 'Ahmed R.',  score: 24, store: 'Centrum', prize: 50   },
      { rank: 2, name: 'Lisa V.',   score: 18, store: 'Centrum', prize: null },
      { rank: 3, name: 'Sarah K.',  score: 14, store: 'Oost',    prize: null },
      { rank: 4, name: 'Fatima A.', score: 8,  store: 'Oost',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 4,  store: 'Centrum', prize: null },
      { rank: 6, name: 'Tom B.',    score: 2,  store: 'Zuid',    prize: null },
      { rank: 7, name: 'Javier L.', score: 0,  store: 'Zuid',    prize: null },
    ],
    hours_left: 120,
  },
  {
    id: 'b3', name: 'March Top Seller', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'completed', start_date: '2026-03-01', end_date: '2026-03-31',
    prize_pool: 175, prizes: [{ position: 1, amount: 100, label: '1st' }, { position: 2, amount: 50, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 7, winner_name: 'Lisa V.', winner_payout: 100,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 178, store: 'Centrum', prize: 100 },
      { rank: 2, name: 'Ahmed R.',  score: 149, store: 'Centrum', prize: 50  },
      { rank: 3, name: 'Sarah K.',  score: 131, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',    score: 92,  store: 'Zuid',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 87,  store: 'Centrum', prize: null },
      { rank: 6, name: 'Fatima A.', score: 74,  store: 'Oost',    prize: null },
      { rank: 7, name: 'Javier L.', score: 61,  store: 'Zuid',    prize: null },
    ],
  },
  {
    id: 'b4', name: 'Blue Dream Challenge', type: 'threshold', metric: 'units_sold', product_name: 'Blue Dream',
    scope: 'chain', status: 'completed', start_date: '2026-02-01', end_date: '2026-03-01',
    threshold_target: 50, threshold_prize: 50, prize_pool: 200,
    prizes: [{ position: 1, amount: 50, label: 'Per qualifier' }],
    participants: 4, winner_name: '4 staff', winner_payout: 200,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 68, store: 'Centrum', prize: 50 },
      { rank: 2, name: 'Ahmed R.',  score: 57, store: 'Centrum', prize: 50 },
      { rank: 3, name: 'Sarah K.',  score: 52, store: 'Oost',    prize: 50 },
      { rank: 4, name: 'Tom B.',    score: 50, store: 'Zuid',    prize: 50 },
    ],
  },
];

// ─── WALLET ───────────────────────────────────────────────────────────────────
// Per spec: Total €3,200 | Campaign Fund €2,100 (€687 paid out, €1,413 remaining) | Bonus Fund €600 (€250 paid out, €350 remaining) | Unbudgeted €500
// committed_campaigns = remaining campaign budget = €1,413
// committed_bonuses = remaining bonus budget = €350
// available (unbudgeted) = €500
// Note: paid out is tracked via TRANSACTIONS, these are the currently committed/remaining values
export const WALLET = {
  total_balance: 3200.00,
  committed_campaigns: 1413.00,
  committed_bonuses: 350.00,
  available: 500.00,
  // For display: total campaign fund and paid out
  campaign_fund_total: 2100.00,
  campaign_paid_out: 687.00,
  bonus_fund_total: 600.00,
  bonus_paid_out: 250.00,
};

// ─── TRANSACTIONS ─────────────────────────────────────────────────────────────
export const TRANSACTIONS = [
  { id: 't01', type: 'commission',     amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',                  staff_name: 'Lisa V.',   campaign_name: 'OG Kush Spring Push', product_name: 'OG Kush',      created_date: '2026-04-28T11:08:00' },
  { id: 't02', type: 'top_up',         amount: 2000.00, description: 'Wallet top-up via EURC transfer',                                                                                                                   created_date: '2026-04-01T09:00:00' },
  { id: 't03', type: 'bonus_payout',   amount: -100.00, description: 'Bonus payout: March Top Seller — Lisa V. (1st place)', staff_name: 'Lisa V.',   bonus_name: 'March Top Seller',                                     created_date: '2026-04-01T10:00:00' },
  { id: 't04', type: 'budget_commit',  amount: -500.00, description: 'Budget committed: Amnesia Haze Launch',                campaign_name: 'Amnesia Haze Launch',                                                       created_date: '2026-04-01T08:00:00' },
  { id: 't05', type: 'commission',     amount: -2.50,   description: 'Commission: Ahmed R. sold 1× Amnesia Haze',            staff_name: 'Ahmed R.',  campaign_name: 'Amnesia Haze Launch', product_name: 'Amnesia Haze', created_date: '2026-04-28T09:44:00' },
  { id: 't06', type: 'bonus_payout',   amount: -50.00,  description: 'Bonus payout: Blue Dream Challenge — Ahmed R.',        staff_name: 'Ahmed R.',  bonus_name: 'Blue Dream Challenge',                                 created_date: '2026-03-02T10:00:00' },
  { id: 't07', type: 'budget_commit',  amount: -400.00, description: 'Budget committed: OG Kush Spring Push',                campaign_name: 'OG Kush Spring Push',                                                       created_date: '2026-03-15T08:00:00' },
  { id: 't08', type: 'top_up',         amount: 1200.00, description: 'Initial wallet funding via EURC transfer',                                                                                                           created_date: '2026-02-28T09:00:00' },
];

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { type: 'sale',            message: 'Lisa V. sold 1× OG Kush — €2.00 commission',            actor: 'Lisa V.',   amount: 2.00,   campaign_name: 'OG Kush Spring Push',  staff_name: 'Lisa V.',  created_date: '2026-04-28T11:08:00' },
  { type: 'sale',            message: 'Ahmed R. sold 1× Amnesia Haze — €2.50 commission',      actor: 'Ahmed R.',  amount: 2.50,   campaign_name: 'Amnesia Haze Launch',  staff_name: 'Ahmed R.', created_date: '2026-04-28T09:44:00' },
  { type: 'sale',            message: 'Sarah K. sold 1× OG Kush — €2.00 commission',           actor: 'Sarah K.',  amount: 2.00,   campaign_name: 'OG Kush Spring Push',  staff_name: 'Sarah K.', created_date: '2026-04-27T15:21:00' },
  { type: 'sale',            message: 'Marco D. sold 1× Gorilla Glue — €3.00 commission',      actor: 'Marco D.',  amount: 3.00,   campaign_name: 'Gorilla Glue Promo',   staff_name: 'Marco D.', created_date: '2026-04-26T14:05:00' },
  { type: 'campaign_paused', message: 'White Widow Weekend paused — budget exhausted',          actor: 'System',                   campaign_name: 'White Widow Weekend',                          created_date: '2026-04-20T10:00:00' },
  { type: 'sale',            message: 'Tom B. sold 1× OG Kush — €2.00 commission',             actor: 'Tom B.',    amount: 2.00,   campaign_name: 'OG Kush Spring Push',  staff_name: 'Tom B.',   created_date: '2026-04-25T16:40:00' },
  { type: 'campaign_created',message: 'Amnesia Haze Launch campaign created',                   actor: 'Admin',                    campaign_name: 'Amnesia Haze Launch',                          created_date: '2026-04-01T08:00:00' },
  { type: 'top_up',          message: 'Wallet topped up with €2,000 EURC',                      actor: 'Admin',     amount: 2000,                                                                created_date: '2026-04-01T09:00:00' },
  { type: 'bonus_completed', message: 'March Top Seller completed — Lisa V. won €100',          actor: 'Lisa V.',   amount: 100,                                                                 created_date: '2026-04-01T10:00:00' },
  { type: 'bonus_completed', message: 'Blue Dream Challenge completed — 4 staff qualified',     actor: 'System',    amount: 200,                                                                 created_date: '2026-03-02T10:00:00' },
  { type: 'campaign_created',message: 'Gorilla Glue Promo campaign created',                    actor: 'Admin',                    campaign_name: 'Gorilla Glue Promo',                           created_date: '2026-04-10T08:00:00' },
  { type: 'staff_joined',    message: 'Javier L. accepted invite and joined the team',          actor: 'Javier L.',                                                                              created_date: '2026-04-08T15:00:00' },
  { type: 'staff_joined',    message: 'Fatima A. accepted invite and joined the team',          actor: 'Fatima A.',                                                                              created_date: '2026-04-05T11:00:00' },
  { type: 'staff_joined',    message: 'Marco D. accepted invite and joined the team',           actor: 'Marco D.',                                                                               created_date: '2026-04-03T09:30:00' },
];