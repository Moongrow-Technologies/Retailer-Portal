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

// Centralised product image lookup
export const PRODUCT_IMAGES = {
  'OG Kush':      'https://images.unsplash.com/photo-1611842436244-04dce8f32a13?w=200&q=80',
  'Blue Dream':   'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
  'Amnesia Haze': 'https://images.unsplash.com/photo-1598511726551-56291c3339c0?w=200&q=80',
  'White Widow':  'https://images.unsplash.com/photo-1616270099083-d7a83a6b68af?w=200&q=80',
  'Gorilla Glue': 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80',
  default:        'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=200&q=80',
};

// Centralised staff avatar lookup by name
export const STAFF_AVATARS = {
  'Lisa V.':  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'Ahmed R.': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'Sarah K.': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'Tom B.':   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  'Nina D.':  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
};

// Staff
// total_commissions per person derived from campaign shares
// Lisa:  OG Kush 78×€2 + Amnesia 36×€2.50 + White Widow 40×€2.50 = €156+€90+€100 = €346
// Ahmed: OG Kush 78×€2 + Amnesia 34×€2.50 = €156+€85 = €241 + Blue Dream 130×€1.50 = €195 → Ahmed: €241 (active campaigns only; Blue Dream completed, assigned to Tom)
// Let's keep it simple — commissions are lifetime totals including completed campaigns
export const STAFF = [
  { id: 's1', name: 'Lisa V.',  email: 'lisa@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 346.00, total_units_sold: 178, bonus_wins: 3, avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { id: 's2', name: 'Ahmed R.', email: 'ahmed@degroenehoek.nl', role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 274.50, total_units_sold: 149, bonus_wins: 1, avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { id: 's3', name: 'Sarah K.', email: 'sarah@degroenehoek.nl', role: 'lead',      store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 241.75, total_units_sold: 131, bonus_wins: 2, avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { id: 's4', name: 'Tom B.',   email: 'tom@degroenehoek.nl',   role: 'budtender', store: 'De Groene Hoek — Zuid',   status: 'active',  total_commissions: 170.25, total_units_sold: 92,  bonus_wins: 0, avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { id: 's5', name: 'Nina D.',  email: 'nina@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Oost',   status: 'pending', total_commissions: 0,      total_units_sold: 0,   bonus_wins: 0, avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
];

// Campaigns
// Budget math:
//   c1 OG Kush Spring Push:   budget €400,  spent €312 (156 units × €2.00),  active
//   c2 Blue Dream Blitz:       budget €300,  spent €300 (200 units × €1.50),  completed (100%)
//   c3 Amnesia Haze Launch:    budget €500,  spent €175 (70  units × €2.50),  active
//   c4 White Widow Weekend:    budget €200,  spent €200 (80  units × €2.50),  paused_budget (100%)
//   c5 Gorilla Glue Promo:     budget €300,  spent €45  (15  units × €3.00),  paused_manual
// Non-completed budgets committed = 400+500+200+300 = €1,400
export const CAMPAIGNS = [
  { id: 'c1', name: 'OG Kush Spring Push',   product_name: 'OG Kush',      stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost'], commission_rate: 2.00, budget: 400, spent: 312, units_sold: 156, target_units: 200, status: 'active',       start_date: '2026-03-15', end_date: '2026-04-30', duration_days: 46, last_edited: '2026-04-16T10:14:00' },
  { id: 'c2', name: 'Blue Dream Blitz',       product_name: 'Blue Dream',   stores: ['De Groene Hoek — Centrum'],                          commission_rate: 1.50, budget: 300, spent: 300, units_sold: 200, target_units: 200, status: 'completed',    start_date: '2026-02-01', end_date: '2026-03-01', duration_days: 28, last_edited: '2026-03-01T23:59:00' },
  { id: 'c3', name: 'Amnesia Haze Launch',    product_name: 'Amnesia Haze', stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost', 'De Groene Hoek — Zuid'], commission_rate: 2.50, budget: 500, spent: 175, units_sold: 70, target_units: 200, status: 'active', start_date: '2026-04-01', end_date: '2026-05-15', duration_days: 44, last_edited: '2026-04-15T16:02:00' },
  { id: 'c4', name: 'White Widow Weekend',    product_name: 'White Widow',  stores: ['De Groene Hoek — Zuid'],                             commission_rate: 2.50, budget: 200, spent: 200, units_sold: 80,  target_units: 80,  status: 'paused_budget', start_date: '2026-04-05', end_date: '2026-04-20', duration_days: 15, last_edited: '2026-04-14T10:00:00' },
  { id: 'c5', name: 'Gorilla Glue Promo',     product_name: 'Gorilla Glue', stores: ['De Groene Hoek — Centrum'],                          commission_rate: 3.00, budget: 300, spent: 45,  units_sold: 15,  target_units: 100, status: 'paused_manual', start_date: '2026-04-10', end_date: '2026-05-10', duration_days: 30, last_edited: '2026-04-11T09:30:00' },
];

// Bonuses
// Committed bonuses: b1 €175 + b2 €50 = €225
export const BONUSES = [
  {
    id: 'b1', name: 'Top Seller Week 17', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'active', start_date: '2026-04-14', end_date: '2026-04-21',
    prize_pool: 175, prizes: [{ position: 1, amount: 100, label: '1st' }, { position: 2, amount: 50, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 4, current_leader: 'Lisa V.', leader_score: 38,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',  score: 38, store: 'Centrum', prize: 100 },
      { rank: 2, name: 'Ahmed R.', score: 31, store: 'Centrum', prize: 50  },
      { rank: 3, name: 'Sarah K.', score: 24, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',   score: 17, store: 'Zuid',    prize: null },
    ],
    hours_left: 86,
  },
  {
    id: 'b2', name: 'Amnesia Haze Sprint', type: 'sprint', metric: 'units_sold', product_name: 'Amnesia Haze',
    scope: 'chain', status: 'active', start_date: '2026-04-14', end_date: null,
    threshold_target: 30, prize_pool: 50, prizes: [{ position: 1, amount: 50, label: 'Winner' }],
    participants: 3, current_leader: 'Ahmed R.', leader_score: 24,
    leaderboard: [
      { rank: 1, name: 'Ahmed R.', score: 24, store: 'Centrum', prize: 50   },
      { rank: 2, name: 'Lisa V.',  score: 18, store: 'Centrum', prize: null },
      { rank: 3, name: 'Sarah K.', score: 14, store: 'Oost',    prize: null },
    ],
    hours_left: 120,
  },
  {
    id: 'b4', name: 'May Kickoff Sprint', type: 'sprint', metric: 'units_sold', product_name: 'Gorilla Glue',
    scope: 'chain', status: 'scheduled', start_date: '2026-04-25', end_date: null,
    threshold_target: 20, prize_pool: 50, prizes: [{ position: 1, amount: 50, label: 'Winner' }],
    participants: 0, current_leader: null,
    leaderboard: [],
  },
  {
    id: 'b3', name: 'March Top Seller', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'completed', start_date: '2026-03-01', end_date: '2026-03-31',
    prize_pool: 175, prizes: [{ position: 1, amount: 100, label: '1st' }, { position: 2, amount: 50, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 4, winner_name: 'Lisa V.', winner_payout: 100,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',  score: 178, store: 'Centrum', prize: 100 },
      { rank: 2, name: 'Ahmed R.', score: 149, store: 'Centrum', prize: 50  },
      { rank: 3, name: 'Sarah K.', score: 131, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',   score: 92,  store: 'Zuid',    prize: null },
    ],
  },
  {
    id: 'b5', name: 'Blue Dream Blitz', type: 'threshold', metric: 'units_sold', product_name: 'Blue Dream',
    scope: 'chain', status: 'paused_manual', start_date: '2026-04-10', end_date: '2026-04-30',
    threshold_target: 50, threshold_prize: 75, prize_pool: 75, prizes: [{ position: 1, amount: 75, label: 'Threshold' }],
    participants: 2, current_leader: 'Tom B.', leader_score: 12,
    leaderboard: [
      { rank: 1, name: 'Tom B.',   score: 12, store: 'Zuid',    prize: null },
      { rank: 2, name: 'Nina D.',  score: 0,  store: 'Oost',    prize: null },
    ],
  },
  ];

// Wallet
// total = €2,000
// committed campaigns = 400+500+200+300 = €1,400
// committed bonuses   = 175+50         = €225
// available           = 2000-1400-225  = €375
export const WALLET = {
  total_balance: 2000.00,
  committed_campaigns: 1400.00,
  committed_bonuses: 225.00,
  available: 375.00,
};

export const TRANSACTIONS = [
  { id: 't1', type: 'commission',    amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',           staff_name: 'Lisa V.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-17T11:08:00' },
  { id: 't2', type: 'commission',    amount: -2.50,   description: 'Commission: Ahmed R. sold 1× Amnesia Haze',     staff_name: 'Ahmed R.', campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-17T09:44:00' },
  { id: 't3', type: 'commission',    amount: -2.00,   description: 'Commission: Sarah K. sold 1× OG Kush',          staff_name: 'Sarah K.', campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-16T15:21:00' },
  { id: 't4', type: 'top_up',        amount: 1000.00, description: 'Wallet top-up via EURC transfer',                                                                                                               created_date: '2026-04-13T09:00:00' },
  { id: 't5', type: 'bonus_payout',  amount: -100.00, description: 'Bonus payout: March Top Seller — Lisa V. (1st place)', staff_name: 'Lisa V.', bonus_name: 'March Top Seller',                                created_date: '2026-04-01T09:00:00' },
  { id: 't6', type: 'commission',    amount: -1.50,   description: 'Commission: Tom B. sold 1× Blue Dream',          staff_name: 'Tom B.',   campaign_name: 'Blue Dream Blitz',     product_name: 'Blue Dream',   created_date: '2026-03-28T14:55:00' },
  { id: 't7', type: 'budget_commit', amount: -500.00, description: 'Budget committed: Amnesia Haze Launch',                                       campaign_name: 'Amnesia Haze Launch',                             created_date: '2026-04-01T08:00:00' },
  { id: 't8', type: 'top_up',        amount: 1000.00, description: 'Initial wallet funding via EURC transfer',                                                                                                       created_date: '2026-03-14T09:00:00' },
];

export const ACTIVITIES = [
  { type: 'sale',             message: 'Lisa V. sold 1× OG Kush — €2.00 commission',              actor: 'Lisa V.',  amount: 2.00,   campaign_name: 'OG Kush Spring Push', created_date: '2026-04-17T11:08:00' },
  { type: 'sale',             message: 'Ahmed R. sold 1× Amnesia Haze — €2.50 commission',        actor: 'Ahmed R.', amount: 2.50,   campaign_name: 'Amnesia Haze Launch', created_date: '2026-04-17T09:44:00' },
  { type: 'campaign_paused',  message: 'White Widow Weekend paused — budget exhausted',            actor: 'System',                  campaign_name: 'White Widow Weekend', created_date: '2026-04-14T10:00:00' },
  { type: 'sale',             message: 'Sarah K. sold 1× OG Kush — €2.00 commission',             actor: 'Sarah K.', amount: 2.00,   campaign_name: 'OG Kush Spring Push', created_date: '2026-04-16T15:21:00' },
  { type: 'staff_joined',     message: 'Nina D. accepted invite and joined the team',              actor: 'Nina D.',                                                       created_date: '2026-04-13T15:00:00' },
  { type: 'top_up',           message: 'Wallet topped up with €1,000 EURC',                                          amount: 1000,                                         created_date: '2026-04-13T09:00:00' },
  { type: 'bonus_completed',  message: 'March Top Seller completed — Lisa V. won €100',           actor: 'Lisa V.',  amount: 100,                                          created_date: '2026-04-01T09:00:00' },
];