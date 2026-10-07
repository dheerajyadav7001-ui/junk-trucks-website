import { GOOGLE_ADS_CONVERSION_ID, GOOGLE_ADS_CONVERSION_LABELS, GOOGLE_ADS_TAG_CONFIGURED } from '../config/googleAds';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let tagLoaded = false;

/**
 * Injects the Google Ads gtag.js base tag site-wide.
 * This single tag powers BOTH conversion tracking and the remarketing
 * audience (visitors to this site) — no separate remarketing snippet needed.
 * Safe to call multiple times; only loads once. No-ops until real IDs are set.
 */
export function loadGoogleAdsTag(): void {
  if (typeof window === 'undefined' || tagLoaded) return;
  if (!GOOGLE_ADS_TAG_CONFIGURED) {
    // Placeholder IDs still in place — skip loading so we don't fire
    // requests at a fake conversion ID. Swap in real IDs in
    // src/config/googleAds.ts and this activates automatically.
    return;
  }

  tagLoaded = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js only understands the special `arguments` object, NOT a normal
  // array — pushing an array (e.g. via rest params) makes every call silently
  // ignored, so no hits or conversions are ever sent.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_CONVERSION_ID);
}

/**
 * Fires a Google Ads conversion event — call this the moment a lead
 * successfully submits the booking form (any page/form that uses
 * BookingContext.submitBooking already calls this automatically).
 */
export function fireBookingConversion(bookingReference: string, gclid?: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GOOGLE_ADS_TAG_CONFIGURED) return;

  GOOGLE_ADS_CONVERSION_LABELS.forEach((label) => {
    window.gtag!('event', 'conversion', {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${label}`,
      transaction_id: bookingReference,
      ...(gclid ? { gclid } : {}),
    });
  });
}
