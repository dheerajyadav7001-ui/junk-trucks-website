import { GA4_MEASUREMENT_ID, GA4_CONFIGURED, CLARITY_PROJECT_ID, CLARITY_CONFIGURED } from '../config/analytics';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity?: { (...args: unknown[]): void; q?: unknown[] };
  }
}

let ga4Loaded = false;
let clarityLoaded = false;

/**
 * Loads GA4 (if configured) and Microsoft Clarity (if configured), site-wide.
 * Safe to call multiple times. Reuses the same window.gtag the Google Ads
 * tag (src/utils/googleAdsTag.ts) already sets up, so GA4 and Google Ads
 * share one dataLayer/gtag — no conflict, no duplicate script if both IDs
 * happen to load on the same page.
 */
export function loadAnalytics(): void {
  if (typeof window === 'undefined') return;

  if (GA4_CONFIGURED && !ga4Loaded) {
    ga4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    // Must push the `arguments` object (not an array) or gtag.js ignores it.
    window.gtag = window.gtag || function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }

  if (CLARITY_CONFIGURED && !clarityLoaded) {
    clarityLoaded = true;

    // Standard Microsoft Clarity loader: sets up window.clarity as a queue
    // function, then injects the real tracking script.
    window.clarity = window.clarity || function (...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };

    const clarityScript = document.createElement('script');
    clarityScript.async = true;
    clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(clarityScript);
  }
}

/**
 * Fires a funnel/diagnostic event — call this at each step of the booking
 * flow so you can see exactly where real visitors drop off (GA4 "Explore"
 * reports) and watch matching session recordings (Clarity). No-ops until
 * GA4/Clarity are configured in src/config/analytics.ts.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  if (GA4_CONFIGURED && window.gtag) {
    window.gtag('event', name, params);
  }
  if (CLARITY_CONFIGURED && window.clarity) {
    window.clarity('event', name);
  }
}
