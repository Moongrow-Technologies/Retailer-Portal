// Centralized sample data for the Moongrow app
// Current date: May 2, 2026

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

// ─── STAFF ────────────────────────────────────────────────────────────────────
// All-time totals reflect full history across all completed + active campaigns
// Lisa: led OG Kush (78 units) + Amnesia (34) + Blue Dream (82) + White Widow (28) + Gorilla (9) = 231 units
//   commissions: 78×2 + 34×2.5 + 82×1.5 + 28×2.5 + 9×3 = 156+85+123+70+27 = 461
// Ahmed: 62+29+71+22+4 = 188 units → 124+72.5+106.5+55+12 = 370
// Sarah: 54+26+62+19+2 = 163 → 108+65+93+47.5+6 = 319.5 → 319
// Tom: 38+18+44+11+0 = 111 → 76+45+66+27.5+0 = 214.5 → 214
// Marco: 34+16+38+0+0 = 88 → 68+40+57+0+0 = 165
// Fatima: 28+14+32+0+0 = 74 → 56+35+48+0+0 = 139
// Javier: 22+11+22+0+0 = 55 → 44+27.5+33+0+0 = 104.5 → 104
// Nina: joined Apr 24, first 8 days active: 6+5+0+0+0 = 11 → 22+12.5 = 34.5 → 34 (provisional)
export const STAFF = [
  { id: 's1', name: 'Lisa V.',   email: 'lisa@degroenehoek.nl',   role: 'lead',      store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 461.00, total_units_sold: 231, bonus_wins: 3, avatar_url: STAFF_AVATARS['Lisa V.'] },
  { id: 's2', name: 'Ahmed R.',  email: 'ahmed@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active',  total_commissions: 370.00, total_units_sold: 188, bonus_wins: 2, avatar_url: STAFF_AVATARS['Ahmed R.'] },
  { id: 's3', name: 'Sarah K.',  email: 'sarah@degroenehoek.nl',  role: 'lead',      store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 319.00, total_units_sold: 163, bonus_wins: 2, avatar_url: STAFF_AVATARS['Sarah K.'] },
  { id: 's4', name: 'Tom B.',    email: 'tom@degroenehoek.nl',    role: 'budtender', store: 'De Groene Hoek — Zuid',   status: 'active',  total_commissions: 214.00, total_units_sold: 111, bonus_wins: 1, avatar_url: STAFF_AVATARS['Tom B.'] },
  { id: 's5', name: 'Marco D.',  email: 'marco@degroenehoek.nl',  role: 'budtender', store: 'De Groene Hoek — Centrum', status: 'active', total_commissions: 165.00, total_units_sold: 88,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Marco D.'] },
  { id: 's6', name: 'Fatima A.', email: 'fatima@degroenehoek.nl', role: 'budtender', store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 139.00, total_units_sold: 74,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Fatima A.'] },
  { id: 's7', name: 'Javier L.', email: 'javier@degroenehoek.nl', role: 'budtender', store: 'De Groene Hoek — Zuid',   status: 'active',  total_commissions: 104.00, total_units_sold: 55,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Javier L.'] },
  { id: 's8', name: 'Nina D.',   email: 'nina@degroenehoek.nl',   role: 'budtender', store: 'De Groene Hoek — Oost',   status: 'active',  total_commissions: 34.00,  total_units_sold: 18,  bonus_wins: 0, avatar_url: STAFF_AVATARS['Nina D.'] },
];

// ─── CAMPAIGNS ────────────────────────────────────────────────────────────────
// c1 OG Kush Spring Push:    budget €500, spent €380 (190×€2.00), 10 days left → May 12
// c2 Amnesia Haze Launch:    budget €600, spent €297 (118×€2.50), 13 days left → May 15
// c3 Blue Dream Blitz:       budget €350, spent €300 (200×€1.50), completed Mar 1
// c4 White Widow Weekend:    budget €250, spent €250 (100×€2.50),  completed Apr 20
// c5 Gorilla Glue Promo:     budget €300, spent €45  (15×€3.00),  paused_manual Apr 18
//
// Active campaign remaining: (500-380)+(600-297) = 120+303 = €423
// Paused remaining: (300-45) = €255
// Committed campaigns = 423+255 = €678
// Total paid out: 380+297+300+250+45 = €1,272 (commissions)
// Active bonuses prize pools: 225+75 = €300 committed bonuses
// Top-ups: 5000+1500 = €6,500
// Total balance = 6500 - 1272 - 550 (bonus payouts) = €4,678
// Available = 4678 - 678 - 300 = €3,700
export const CAMPAIGNS = [
  { id: 'c1', name: 'OG Kush Spring Push',  product_name: 'OG Kush',      stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost'], commission_rate: 2.00, budget: 500, spent: 380.00, units_sold: 190, target_units: 250, status: 'active',       start_date: '2026-03-15', end_date: '2026-05-12', duration_days: 58 },
  { id: 'c2', name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze',  stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost', 'De Groene Hoek — Zuid'], commission_rate: 2.50, budget: 600, spent: 297.50, units_sold: 119, target_units: 240, status: 'active', start_date: '2026-04-01', end_date: '2026-05-15', duration_days: 44 },
  { id: 'c3', name: 'Blue Dream Blitz',     product_name: 'Blue Dream',    stores: ['De Groene Hoek — Centrum', 'De Groene Hoek — Oost'], commission_rate: 1.50, budget: 350, spent: 300.00, units_sold: 200, target_units: 200, status: 'completed',    start_date: '2026-02-01', end_date: '2026-03-01', duration_days: 28 },
  { id: 'c4', name: 'White Widow Weekend',  product_name: 'White Widow',   stores: ['De Groene Hoek — Zuid'],                             commission_rate: 2.50, budget: 250, spent: 250.00, units_sold: 100, target_units: 100, status: 'completed',    start_date: '2026-04-05', end_date: '2026-04-20', duration_days: 15 },
  { id: 'c5', name: 'Gorilla Glue Promo',   product_name: 'Gorilla Glue',  stores: ['De Groene Hoek — Centrum'],                          commission_rate: 3.00, budget: 300, spent: 45.00,  units_sold: 15,  target_units: 100, status: 'paused_manual', start_date: '2026-04-10', end_date: '2026-05-20', duration_days: 40 },
];

// ─── BONUSES ─────────────────────────────────────────────────────────────────
// Active bonuses: b1 Top Seller Week 18 (€225 pool) + b2 Amnesia Sprint (€75 pool) = €300 committed
// Completed: b3 March Top Seller (€175, paid €175), b4 April Week 15 Ranked (€150, paid €150), b5 Blue Dream Challenge (€200, paid €200)
// Total bonus payouts = 175 + 150 + 200 = €525 ... let's keep it cleaner:
// b3 paid €175, b4 paid €150, total bonus paid = €325 (winners from b3: Lisa €100+Ahmed €50+Sarah €25; b4: Lisa €80+Ahmed €40+Sarah €30)
export const BONUSES = [
  {
    id: 'b1', name: 'Top Seller Week 18', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'active', start_date: '2026-04-27', end_date: '2026-05-04',
    prize_pool: 225, prizes: [{ position: 1, amount: 125, label: '1st' }, { position: 2, amount: 65, label: '2nd' }, { position: 3, amount: 35, label: '3rd' }],
    participants: 8, current_leader: 'Lisa V.', leader_score: 42,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 42, store: 'Centrum', prize: 125 },
      { rank: 2, name: 'Ahmed R.',  score: 36, store: 'Centrum', prize: 65  },
      { rank: 3, name: 'Sarah K.',  score: 29, store: 'Oost',    prize: 35  },
      { rank: 4, name: 'Tom B.',    score: 22, store: 'Zuid',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 17, store: 'Centrum', prize: null },
      { rank: 6, name: 'Fatima A.', score: 14, store: 'Oost',    prize: null },
      { rank: 7, name: 'Javier L.', score: 10, store: 'Zuid',    prize: null },
      { rank: 8, name: 'Nina D.',   score: 8,  store: 'Oost',    prize: null },
    ],
    hours_left: 44,
  },
  {
    id: 'b2', name: 'Amnesia Haze Sprint', type: 'sprint', metric: 'units_sold', product_name: 'Amnesia Haze',
    scope: 'chain', status: 'active', start_date: '2026-04-21', end_date: null,
    threshold_target: 40, threshold_prize: 75, prize_pool: 75,
    prizes: [{ position: 1, amount: 75, label: 'Winner' }],
    participants: 8, current_leader: 'Ahmed R.', leader_score: 29,
    leaderboard: [
      { rank: 1, name: 'Ahmed R.',  score: 29, store: 'Centrum', prize: 75   },
      { rank: 2, name: 'Lisa V.',   score: 24, store: 'Centrum', prize: null },
      { rank: 3, name: 'Sarah K.',  score: 18, store: 'Oost',    prize: null },
      { rank: 4, name: 'Fatima A.', score: 11, store: 'Oost',    prize: null },
      { rank: 5, name: 'Nina D.',   score: 7,  store: 'Oost',    prize: null },
      { rank: 6, name: 'Marco D.',  score: 5,  store: 'Centrum', prize: null },
      { rank: 7, name: 'Tom B.',    score: 3,  store: 'Zuid',    prize: null },
      { rank: 8, name: 'Javier L.', score: 2,  store: 'Zuid',    prize: null },
    ],
    hours_left: 0,
  },
  {
    id: 'b3', name: 'Top Seller Week 17', type: 'ranked', metric: 'units_sold', product_name: 'All Products',
    scope: 'chain', status: 'completed', start_date: '2026-04-21', end_date: '2026-04-28',
    prize_pool: 175, prizes: [{ position: 1, amount: 100, label: '1st' }, { position: 2, amount: 50, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 7, winner_name: 'Lisa V.', winner_payout: 100,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 48, store: 'Centrum', prize: 100 },
      { rank: 2, name: 'Ahmed R.',  score: 39, store: 'Centrum', prize: 50  },
      { rank: 3, name: 'Sarah K.',  score: 31, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',    score: 23, store: 'Zuid',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 19, store: 'Centrum', prize: null },
      { rank: 6, name: 'Fatima A.', score: 15, store: 'Oost',    prize: null },
      { rank: 7, name: 'Javier L.', score: 11, store: 'Zuid',    prize: null },
    ],
  },
  {
    id: 'b4', name: 'March Top Seller', type: 'ranked', metric: 'commission_earned', product_name: 'All Products',
    scope: 'chain', status: 'completed', start_date: '2026-03-01', end_date: '2026-03-31',
    prize_pool: 150, prizes: [{ position: 1, amount: 80, label: '1st' }, { position: 2, amount: 45, label: '2nd' }, { position: 3, amount: 25, label: '3rd' }],
    participants: 7, winner_name: 'Lisa V.', winner_payout: 80,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 186, store: 'Centrum', prize: 80  },
      { rank: 2, name: 'Ahmed R.',  score: 152, store: 'Centrum', prize: 45  },
      { rank: 3, name: 'Sarah K.',  score: 128, store: 'Oost',    prize: 25  },
      { rank: 4, name: 'Tom B.',    score: 91,  store: 'Zuid',    prize: null },
      { rank: 5, name: 'Marco D.',  score: 78,  store: 'Centrum', prize: null },
      { rank: 6, name: 'Fatima A.', score: 63,  store: 'Oost',    prize: null },
      { rank: 7, name: 'Javier L.', score: 44,  store: 'Zuid',    prize: null },
    ],
  },
  {
    id: 'b5', name: 'Blue Dream Challenge', type: 'threshold', metric: 'units_sold', product_name: 'Blue Dream',
    scope: 'chain', status: 'completed', start_date: '2026-02-01', end_date: '2026-03-01',
    threshold_target: 50, threshold_prize: 50, prize_pool: 200,
    prizes: [{ position: 1, amount: 50, label: 'Per qualifier' }],
    participants: 4, winner_name: '4 staff', winner_payout: 200,
    leaderboard: [
      { rank: 1, name: 'Lisa V.',   score: 82, store: 'Centrum', prize: 50 },
      { rank: 2, name: 'Ahmed R.',  score: 71, store: 'Centrum', prize: 50 },
      { rank: 3, name: 'Sarah K.',  score: 62, store: 'Oost',    prize: 50 },
      { rank: 4, name: 'Tom B.',    score: 51, store: 'Zuid',    prize: 50 },
    ],
  },
];

// ─── WALLET ────────────────────────────────────────────────────────────────────
// Top-ups: Apr 1 €2000 + Mar 1 initial €3500 = €5500 total in
// Commission paid out: 380 + 297.50 + 300 + 250 + 45 = €1,272.50
// Bonus paid out: 175(b3) + 150(b4) + 200(b5) = €525
// Total balance = 5500 - 1272.50 - 525 = €3,702.50 → rounded to €3,702
// Active committed campaigns: (500-380) + (600-297.50) = 120 + 302.50 = €422.50
// Paused committed: (300-45) = €255
// Total committed_campaigns = 677.50 → €678
// Active committed bonuses: b1(225) + b2(75) = €300
// Available = 3702 - 678 - 300 = €2,724
export const WALLET = {
  total_balance: 3702.00,
  committed_campaigns: 678.00,
  committed_bonuses: 300.00,
  available: 2724.00,
  campaign_fund_total: 2000.00,
  campaign_paid_out: 1272.50,
  bonus_fund_total: 925.00,
  bonus_paid_out: 525.00,
};

// ─── TRANSACTIONS ─────────────────────────────────────────────────────────────
// Recent sales woven throughout the last 7 days — most recent ~25 min ago (today May 2, 16:08)
export const TRANSACTIONS = [
  // Today May 2
  { id: 't_r01', type: 'commission',    amount: -2.50,   description: 'Commission: Ahmed R. sold 1× Amnesia Haze',           staff_name: 'Ahmed R.',  campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T16:08:00' },
  { id: 't_r02', type: 'commission',    amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',                  staff_name: 'Lisa V.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-02T15:51:00' },
  { id: 't_r03', type: 'commission',    amount: -2.50,   description: 'Commission: Nina D. sold 1× Amnesia Haze',             staff_name: 'Nina D.',   campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T15:34:00' },
  { id: 't_r04', type: 'commission',    amount: -2.00,   description: 'Commission: Sarah K. sold 1× OG Kush',                 staff_name: 'Sarah K.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-02T14:47:00' },
  { id: 't_r05', type: 'commission',    amount: -2.50,   description: 'Commission: Lisa V. sold 1× Amnesia Haze',             staff_name: 'Lisa V.',   campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T14:22:00' },
  { id: 't_r06', type: 'commission',    amount: -2.00,   description: 'Commission: Ahmed R. sold 1× OG Kush',                 staff_name: 'Ahmed R.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-02T13:55:00' },
  { id: 't_r07', type: 'commission',    amount: -2.50,   description: 'Commission: Tom B. sold 1× Amnesia Haze',              staff_name: 'Tom B.',    campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T13:11:00' },
  { id: 't_r08', type: 'commission',    amount: -2.00,   description: 'Commission: Marco D. sold 1× OG Kush',                 staff_name: 'Marco D.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-02T12:38:00' },
  { id: 't_r09', type: 'commission',    amount: -2.50,   description: 'Commission: Fatima A. sold 1× Amnesia Haze',           staff_name: 'Fatima A.', campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T11:44:00' },
  { id: 't_r10', type: 'commission',    amount: -2.00,   description: 'Commission: Javier L. sold 1× OG Kush',                staff_name: 'Javier L.', campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-02T10:58:00' },
  { id: 't_r11', type: 'commission',    amount: -2.50,   description: 'Commission: Lisa V. sold 1× Amnesia Haze',             staff_name: 'Lisa V.',   campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-02T09:30:00' },

  // May 1
  { id: 't_r12', type: 'commission',    amount: -2.00,   description: 'Commission: Ahmed R. sold 1× OG Kush',                 staff_name: 'Ahmed R.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-01T18:42:00' },
  { id: 't_r13', type: 'commission',    amount: -2.50,   description: 'Commission: Sarah K. sold 1× Amnesia Haze',            staff_name: 'Sarah K.',  campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-01T17:15:00' },
  { id: 't_r14', type: 'commission',    amount: -2.00,   description: 'Commission: Nina D. sold 1× OG Kush',                  staff_name: 'Nina D.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-01T16:28:00' },
  { id: 't_r15', type: 'commission',    amount: -2.50,   description: 'Commission: Tom B. sold 1× Amnesia Haze',              staff_name: 'Tom B.',    campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-01T15:50:00' },
  { id: 't_r16', type: 'commission',    amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',                  staff_name: 'Lisa V.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-01T14:11:00' },
  { id: 't_r17', type: 'commission',    amount: -2.50,   description: 'Commission: Marco D. sold 1× Amnesia Haze',            staff_name: 'Marco D.',  campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-05-01T13:05:00' },
  { id: 't_r18', type: 'commission',    amount: -2.00,   description: 'Commission: Fatima A. sold 1× OG Kush',                staff_name: 'Fatima A.', campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-05-01T12:03:00' },

  // Apr 30
  { id: 't_r19', type: 'commission',    amount: -2.50,   description: 'Commission: Ahmed R. sold 1× Amnesia Haze',           staff_name: 'Ahmed R.',  campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-30T19:15:00' },
  { id: 't_r20', type: 'commission',    amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',                  staff_name: 'Lisa V.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-30T18:30:00' },
  { id: 't_r21', type: 'commission',    amount: -2.00,   description: 'Commission: Sarah K. sold 1× OG Kush',                 staff_name: 'Sarah K.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-30T17:48:00' },
  { id: 't_r22', type: 'commission',    amount: -2.50,   description: 'Commission: Javier L. sold 1× Amnesia Haze',           staff_name: 'Javier L.', campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-30T16:22:00' },
  { id: 't_r23', type: 'commission',    amount: -2.00,   description: 'Commission: Nina D. sold 1× OG Kush',                  staff_name: 'Nina D.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-30T15:07:00' },
  { id: 't_r24', type: 'commission',    amount: -2.50,   description: 'Commission: Tom B. sold 1× Amnesia Haze',              staff_name: 'Tom B.',    campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-30T14:19:00' },

  // Apr 29
  { id: 't_r25', type: 'commission',    amount: -2.00,   description: 'Commission: Lisa V. sold 1× OG Kush',                  staff_name: 'Lisa V.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-29T20:05:00' },
  { id: 't_r26', type: 'commission',    amount: -2.50,   description: 'Commission: Ahmed R. sold 1× Amnesia Haze',           staff_name: 'Ahmed R.',  campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-29T19:11:00' },
  { id: 't_r27', type: 'commission',    amount: -2.00,   description: 'Commission: Marco D. sold 1× OG Kush',                 staff_name: 'Marco D.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-29T17:38:00' },
  { id: 't_r28', type: 'commission',    amount: -2.50,   description: 'Commission: Fatima A. sold 1× Amnesia Haze',           staff_name: 'Fatima A.', campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-29T16:14:00' },
  { id: 't_r29', type: 'commission',    amount: -2.00,   description: 'Commission: Sarah K. sold 1× OG Kush',                 staff_name: 'Sarah K.',  campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-29T15:02:00' },
  { id: 't_r30', type: 'commission',    amount: -2.50,   description: 'Commission: Javier L. sold 1× Amnesia Haze',           staff_name: 'Javier L.', campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-29T13:45:00' },

  // Apr 28 (bonus payouts from Week 17)
  { id: 't_r31', type: 'bonus_payout',  amount: -100.00, description: 'Bonus payout: Top Seller Week 17 — Lisa V. (1st)',   staff_name: 'Lisa V.',   bonus_name: 'Top Seller Week 17',                                     created_date: '2026-04-28T10:00:00' },
  { id: 't_r32', type: 'bonus_payout',  amount: -50.00,  description: 'Bonus payout: Top Seller Week 17 — Ahmed R. (2nd)',  staff_name: 'Ahmed R.',  bonus_name: 'Top Seller Week 17',                                     created_date: '2026-04-28T10:00:00' },
  { id: 't_r33', type: 'bonus_payout',  amount: -25.00,  description: 'Bonus payout: Top Seller Week 17 — Sarah K. (3rd)', staff_name: 'Sarah K.',  bonus_name: 'Top Seller Week 17',                                     created_date: '2026-04-28T10:00:00' },
  { id: 't_r34', type: 'commission',    amount: -2.00,   description: 'Commission: Tom B. sold 1× OG Kush',                  staff_name: 'Tom B.',    campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-28T18:55:00' },
  { id: 't_r35', type: 'commission',    amount: -2.50,   description: 'Commission: Nina D. sold 1× Amnesia Haze',            staff_name: 'Nina D.',   campaign_name: 'Amnesia Haze Launch',  product_name: 'Amnesia Haze', created_date: '2026-04-28T17:20:00' },

  // Apr 24 — Nina joins + early sales
  { id: 't_r36', type: 'commission',    amount: -2.00,   description: 'Commission: Nina D. sold 1× OG Kush (first sale)',   staff_name: 'Nina D.',   campaign_name: 'OG Kush Spring Push',  product_name: 'OG Kush',      created_date: '2026-04-24T15:45:00' },

  // Apr 21 — White Widow completed
  { id: 't_r37', type: 'budget_release',amount: 0.00,    description: 'Budget fully spent: White Widow Weekend',             campaign_name: 'White Widow Weekend',                                                           created_date: '2026-04-20T23:59:00' },

  // Apr 18 — Gorilla Glue paused
  { id: 't_r38', type: 'budget_commit', amount: -300.00, description: 'Budget committed: Gorilla Glue Promo',                 campaign_name: 'Gorilla Glue Promo',                                                            created_date: '2026-04-10T08:00:00' },

  // Apr 1 top-up + Amnesia budget commit
  { id: 't02',   type: 'top_up',        amount: 2000.00, description: 'Wallet top-up via USDC transfer',                                                                                                                        created_date: '2026-04-01T09:00:00' },
  { id: 't04',   type: 'budget_commit', amount: -600.00, description: 'Budget committed: Amnesia Haze Launch',                campaign_name: 'Amnesia Haze Launch',                                                           created_date: '2026-04-01T08:00:00' },

  // Mar bonuses + Blue Dream budget
  { id: 't_b3a', type: 'bonus_payout',  amount: -80.00,  description: 'Bonus payout: March Top Seller — Lisa V. (1st)',     staff_name: 'Lisa V.',   bonus_name: 'March Top Seller',                                         created_date: '2026-04-01T10:00:00' },
  { id: 't_b3b', type: 'bonus_payout',  amount: -45.00,  description: 'Bonus payout: March Top Seller — Ahmed R. (2nd)',   staff_name: 'Ahmed R.',  bonus_name: 'March Top Seller',                                         created_date: '2026-04-01T10:00:00' },
  { id: 't_b3c', type: 'bonus_payout',  amount: -25.00,  description: 'Bonus payout: March Top Seller — Sarah K. (3rd)',   staff_name: 'Sarah K.',  bonus_name: 'March Top Seller',                                         created_date: '2026-04-01T10:00:00' },
  { id: 't07',   type: 'budget_commit', amount: -500.00, description: 'Budget committed: OG Kush Spring Push',               campaign_name: 'OG Kush Spring Push',                                                           created_date: '2026-03-15T08:00:00' },

  // Feb Blue Dream challenge payouts + initial top-up
  { id: 't_b5a', type: 'bonus_payout',  amount: -50.00,  description: 'Bonus payout: Blue Dream Challenge — Lisa V.',       staff_name: 'Lisa V.',   bonus_name: 'Blue Dream Challenge',                                     created_date: '2026-03-02T10:00:00' },
  { id: 't_b5b', type: 'bonus_payout',  amount: -50.00,  description: 'Bonus payout: Blue Dream Challenge — Ahmed R.',      staff_name: 'Ahmed R.',  bonus_name: 'Blue Dream Challenge',                                     created_date: '2026-03-02T10:00:00' },
  { id: 't_b5c', type: 'bonus_payout',  amount: -50.00,  description: 'Bonus payout: Blue Dream Challenge — Sarah K.',      staff_name: 'Sarah K.',  bonus_name: 'Blue Dream Challenge',                                     created_date: '2026-03-02T10:00:00' },
  { id: 't_b5d', type: 'bonus_payout',  amount: -50.00,  description: 'Bonus payout: Blue Dream Challenge — Tom B.',        staff_name: 'Tom B.',    bonus_name: 'Blue Dream Challenge',                                     created_date: '2026-03-02T10:00:00' },
  { id: 't08',   type: 'top_up',        amount: 3500.00, description: 'Initial wallet funding via USDC transfer',                                                                                                              created_date: '2026-02-28T09:00:00' },
];

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { type: 'sale',            message: 'Ahmed R. sold 1× Amnesia Haze — €2.50 commission',    actor: 'Ahmed R.',  amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Ahmed R.',  created_date: '2026-05-02T16:08:00' },
  { type: 'sale',            message: 'Lisa V. sold 1× OG Kush — €2.00 commission',           actor: 'Lisa V.',   amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Lisa V.',   created_date: '2026-05-02T15:51:00' },
  { type: 'sale',            message: 'Nina D. sold 1× Amnesia Haze — €2.50 commission',      actor: 'Nina D.',   amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Nina D.',   created_date: '2026-05-02T15:34:00' },
  { type: 'sale',            message: 'Sarah K. sold 1× OG Kush — €2.00 commission',          actor: 'Sarah K.',  amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Sarah K.',  created_date: '2026-05-02T14:47:00' },
  { type: 'sale',            message: 'Lisa V. sold 1× Amnesia Haze — €2.50 commission',      actor: 'Lisa V.',   amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Lisa V.',   created_date: '2026-05-02T14:22:00' },
  { type: 'sale',            message: 'Ahmed R. sold 1× OG Kush — €2.00 commission',          actor: 'Ahmed R.',  amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Ahmed R.',  created_date: '2026-05-02T13:55:00' },
  { type: 'sale',            message: 'Tom B. sold 1× Amnesia Haze — €2.50 commission',       actor: 'Tom B.',    amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Tom B.',    created_date: '2026-05-02T13:11:00' },
  { type: 'sale',            message: 'Marco D. sold 1× OG Kush — €2.00 commission',          actor: 'Marco D.',  amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Marco D.',  created_date: '2026-05-02T12:38:00' },
  { type: 'sale',            message: 'Fatima A. sold 1× Amnesia Haze — €2.50 commission',    actor: 'Fatima A.', amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Fatima A.', created_date: '2026-05-02T11:44:00' },
  { type: 'sale',            message: 'Javier L. sold 1× OG Kush — €2.00 commission',         actor: 'Javier L.', amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Javier L.', created_date: '2026-05-02T10:58:00' },
  { type: 'sale',            message: 'Ahmed R. sold 1× OG Kush — €2.00 commission',          actor: 'Ahmed R.',  amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Ahmed R.',  created_date: '2026-05-01T18:42:00' },
  { type: 'sale',            message: 'Sarah K. sold 1× Amnesia Haze — €2.50 commission',     actor: 'Sarah K.',  amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Sarah K.',  created_date: '2026-05-01T17:15:00' },
  { type: 'sale',            message: 'Tom B. sold 1× Amnesia Haze — €2.50 commission',       actor: 'Tom B.',    amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Tom B.',    created_date: '2026-05-01T15:50:00' },
  { type: 'bonus_completed', message: 'Top Seller Week 17 completed — Lisa V. won €100',       actor: 'Lisa V.',   amount: 100,                                                                  created_date: '2026-04-28T10:00:00' },
  { type: 'sale',            message: 'Lisa V. sold 1× OG Kush — €2.00 commission',           actor: 'Lisa V.',   amount: 2.00, campaign_name: 'OG Kush Spring Push',  staff_name: 'Lisa V.',   created_date: '2026-04-30T18:30:00' },
  { type: 'sale',            message: 'Ahmed R. sold 1× Amnesia Haze — €2.50 commission',     actor: 'Ahmed R.',  amount: 2.50, campaign_name: 'Amnesia Haze Launch',  staff_name: 'Ahmed R.',  created_date: '2026-04-30T19:15:00' },
  { type: 'staff_joined',    message: 'Nina D. accepted invite and joined the team',           actor: 'Nina D.',                                                                                created_date: '2026-04-24T14:00:00' },
  { type: 'bonus_created',   message: 'Top Seller Week 18 bonus created — €225 pool',         actor: 'Admin',                                                                                  created_date: '2026-04-27T09:00:00' },
  { type: 'campaign_paused', message: 'Gorilla Glue Promo paused — resuming after restock',    actor: 'Admin',    campaign_name: 'Gorilla Glue Promo',                                          created_date: '2026-04-18T11:00:00' },
  { type: 'campaign_created',message: 'Amnesia Haze Launch campaign created',                  actor: 'Admin',    campaign_name: 'Amnesia Haze Launch',                                         created_date: '2026-04-01T08:00:00' },
  { type: 'top_up',          message: 'Wallet topped up with $2,000 USDC',                     actor: 'Admin',    amount: 2000,                                                                 created_date: '2026-04-01T09:00:00' },
  { type: 'bonus_completed', message: 'March Top Seller completed — Lisa V. won €80',          actor: 'Lisa V.',  amount: 80,                                                                   created_date: '2026-04-01T10:00:00' },
  { type: 'bonus_completed', message: 'Blue Dream Challenge completed — 4 staff qualified',    actor: 'System',   amount: 200,                                                                  created_date: '2026-03-02T10:00:00' },
  { type: 'campaign_created',message: 'Gorilla Glue Promo campaign created',                   actor: 'Admin',    campaign_name: 'Gorilla Glue Promo',                                          created_date: '2026-04-10T08:00:00' },
  { type: 'staff_joined',    message: 'Javier L. accepted invite and joined the team',         actor: 'Javier L.',                                                                              created_date: '2026-04-08T15:00:00' },
  { type: 'staff_joined',    message: 'Fatima A. accepted invite and joined the team',         actor: 'Fatima A.',                                                                              created_date: '2026-04-05T11:00:00' },
  { type: 'staff_joined',    message: 'Marco D. accepted invite and joined the team',          actor: 'Marco D.',                                                                               created_date: '2026-04-03T09:30:00' },
];