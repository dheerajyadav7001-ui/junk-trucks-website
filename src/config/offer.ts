// Seasonal offer shown on the home page hero. It switches itself off after
// the end time, so an expired offer is never advertised.
// To run a new offer, change the text and the end date, then redeploy.
export const WINTER_OFFER = {
  headline: 'Winter offer: 20% off your whole booking',
  cta: 'Claim it now',
  endsAt: '2026-11-04T23:59:59-05:00',
  endsLabel: 'Ends Nov 4, 2026',
  shortEnd: 'Ends Nov 4',
};

export function isWinterOfferActive(now: number = Date.now()): boolean {
  return now < new Date(WINTER_OFFER.endsAt).getTime();
}
