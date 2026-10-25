// ─────────────────────────────────────────────────────────────────────────
// PUBLISHED "FROM" PRICES — the single place to edit prices.
// Every price on the site (service pages, prices page, ad landing page,
// page schema) reads from this file. Change a number here and rebuild.
//
// These are SUGGESTED starting prices set against Ottawa competitor
// published prices (Oct 2026). Confirm they cover your own costs before
// running ads. All prices are "from" prices, before HST.
// ─────────────────────────────────────────────────────────────────────────

export interface LoadPrice {
  id: string;
  label: string;
  from: number;
  example: string;
  cubicYards: string;
}

export const PRICE_FROM = 85;

export const LOAD_PRICES: LoadPrice[] = [
  { id: 'single', label: 'Single item', from: 85, cubicYards: '1 – 2 cu. yd', example: 'One couch, one mattress, or one fridge' },
  { id: 'quarter', label: '1/4 truck', from: 199, cubicYards: 'about 4 cu. yd', example: 'A few furniture pieces plus boxes' },
  { id: 'half', label: '1/2 truck', from: 349, cubicYards: 'about 8 cu. yd', example: 'A small garage or a bedroom or two' },
  { id: 'three-quarter', label: '3/4 truck', from: 499, cubicYards: 'about 12 cu. yd', example: 'A basement or a larger reno cleanup' },
  { id: 'full', label: 'Full truck', from: 649, cubicYards: '16 – 18 cu. yd', example: 'A whole-home or estate cleanout' },
];

export const PRICE_NOTE = 'Prices are "from" prices before HST. Labour, loading and disposal are included. We confirm your exact price before we start loading.';
