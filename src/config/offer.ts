// Seasonal offers. Each one switches itself on at startsAt and off after
// endsAt, so an expired offer is never advertised. To run a new offer, add an
// entry here (text + dates), list it in OFFERS in order of priority, redeploy.
export interface Offer {
  id: 'black_friday' | 'holiday';
  icon: string;
  headline: string;      // desktop hero tile
  mobileText: string;    // mobile hero tile (kept short)
  cta: string;
  startsAt: string;
  endsAt: string;
  endsLabel: string;
  shortEnd: string;
  terms: string;         // small print shown under the home-page slider
}

export const BLACK_FRIDAY: Offer = {
  id: 'black_friday',
  icon: '🔥',
  headline: 'Black Friday: up to $50 off your cleanout',
  mobileText: 'Black Friday: up to $50 off · Ends Nov 30',
  cta: 'Claim it now',
  startsAt: '2026-11-13T00:00:00-05:00',
  endsAt: '2026-11-30T23:59:59-05:00',
  endsLabel: 'Ends Nov 30, 2026',
  shortEnd: 'Ends Nov 30',
  terms:
    'Black Friday offer: $20 off jobs of $150+, $35 off $250+, $50 off $400+ (before tax). One small item free with a qualifying booking. Book by Nov 30, 2026. Cannot be combined with other offers.',
};

export const WINTER_OFFER: Offer = {
  id: 'holiday',
  icon: '❄',
  headline: 'Holiday clear-out: 20% off your whole booking',
  mobileText: '20% off your whole booking · Ends Dec 20',
  cta: 'Claim it now',
  startsAt: '2026-12-01T00:00:00-05:00',
  endsAt: '2026-12-20T23:59:59-05:00',
  endsLabel: 'Ends Dec 20, 2026',
  shortEnd: 'Ends Dec 20',
  terms: 'Holiday clear-out offer: 20% off the total booking price. Ends Dec 20, 2026. Cannot be combined with other offers.',
};

// Priority order: the first offer that is currently running is the one shown.
export const OFFERS: Offer[] = [BLACK_FRIDAY, WINTER_OFFER];

export function isOfferActive(offer: Offer, now: number = Date.now()): boolean {
  return now >= new Date(offer.startsAt).getTime() && now < new Date(offer.endsAt).getTime();
}

export function getActiveOffer(now: number = Date.now()): Offer | null {
  return OFFERS.find((o) => isOfferActive(o, now)) ?? null;
}

/** Whole days left, counting today (1 = last day). */
export function daysLeft(offer: Offer, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((new Date(offer.endsAt).getTime() - now) / 86400000));
}

export function daysLeftText(offer: Offer, now: number = Date.now()): string {
  const n = daysLeft(offer, now);
  if (n <= 1) return 'Ends tonight';
  return `${n} days left`;
}

// Kept for older imports.
export function isWinterOfferActive(now: number = Date.now()): boolean {
  return isOfferActive(WINTER_OFFER, now);
}

/**
 * Black Friday theme (dark + orange). Runs only while BLACK_FRIDAY is active,
 * then the site returns to its normal look by itself. The same dates are
 * repeated in index.html (tiny inline script) so the page never flashes light.
 */
export function isBlackFridayTheme(now: number = Date.now()): boolean {
  return isOfferActive(BLACK_FRIDAY, now);
}

/**
 * Canada flag artwork on the page sides. LEFT OFF on purpose: the national
 * flag is protected under the Trademarks Act and commercial use needs written
 * approval from Canadian Heritage (uds-uos@pch.gc.ca). Turn on only after that.
 */
export const SHOW_CANADA_FLAGS = false;
