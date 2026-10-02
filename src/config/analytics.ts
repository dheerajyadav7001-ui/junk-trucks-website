// ─────────────────────────────────────────────────────────────────────────
// ANALYTICS CONFIGURATION (funnel / drop-off tracking)
// ─────────────────────────────────────────────────────────────────────────
// This is separate from Google Ads conversion tracking (src/config/googleAds.ts),
// which only tells you a lead happened. This powers GA4 + Microsoft Clarity so
// you can see WHERE visitors drop off before ever submitting the form.
//
// To activate GA4 (free, ~2 min):
//   1. https://analytics.google.com -> Admin -> Create Property -> name it
//      "Junk Trucks" -> add a "Web" data stream with URL https://junktrucks.ca
//   2. Copy the "Measurement ID" (looks like G-XXXXXXXXXX) into
//      GA4_MEASUREMENT_ID below.
//
// To activate Microsoft Clarity (free, ~2 min, gives you actual video replays
// of real visitor sessions + rage-click/dead-click heatmaps):
//   1. https://clarity.microsoft.com -> New project -> name it "Junk Trucks"
//      -> URL https://junktrucks.ca
//   2. Copy the "Project ID" (a short string like "abc123xyz0") into
//      CLARITY_PROJECT_ID below.
//
// Until real IDs are set, both safely no-op — nothing breaks, they just
// won't collect data yet.
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
export const CLARITY_PROJECT_ID = 'XXXXXXXXXX';

export const GA4_CONFIGURED = !GA4_MEASUREMENT_ID.includes('XXXXXXXXXX');
export const CLARITY_CONFIGURED = !CLARITY_PROJECT_ID.includes('XXXXXXXXXX');
