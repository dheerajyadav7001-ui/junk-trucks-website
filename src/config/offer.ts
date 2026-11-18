// Seasonal offer shown on the home page hero. It switches itself off after
// the end time, so an expired offer is never advertised.
// To run a new offer, change the text and the end date, then redeploy.
export const WINTER_OFFER = {
  headline: 'Holiday clear-out: 20% off your whole booking',
  cta: 'Claim it now',
  endsAt: '2026-12-20T23:59:59-05:00',
  endsLabel: 'Ends Dec 20, 2026',
  shortEnd: 'Ends Dec 20',
};

export function isWinterOfferActive(now: number = Date.now()): boolean {
  return now < new Date(WINTER_OFFER.endsAt).getTime();
}

// Black Friday tile: shows only from startsAt until endsAt (Eastern time), then the
// Holiday tile above takes over by itself. Change the text/dates here to adjust it.
export const BLACK_FRIDAY = {
  icon: '🔥',
  headline: 'Black Friday: up to $50 off your cleanout',
  mobileText: 'Black Friday: up to $50 off · Ends Nov 30',
  cta: 'Claim it now',
  startsAt: '2026-11-13T00:00:00-05:00',
  endsAt: '2026-11-30T23:59:59-05:00',
  endsLabel: 'Ends Nov 30, 2026',
};

export interface HeroOffer {
  icon: string;
  headline: string;
  mobileText: string;
  cta: string;
  endsLabel: string;
}

/** The one small tile to show on the home page right now (or null). */
export function getHeroOffer(now: number = Date.now()): HeroOffer | null {
  if (now >= new Date(BLACK_FRIDAY.startsAt).getTime() && now < new Date(BLACK_FRIDAY.endsAt).getTime()) {
    return BLACK_FRIDAY;
  }
  if (isWinterOfferActive(now)) {
    return {
      icon: '❄',
      headline: WINTER_OFFER.headline,
      mobileText: '20% off your whole booking · ' + WINTER_OFFER.shortEnd,
      cta: WINTER_OFFER.cta,
      endsLabel: WINTER_OFFER.endsLabel,
    };
  }
  return null;
}
