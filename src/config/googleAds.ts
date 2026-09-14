// ─────────────────────────────────────────────────────────────────────────
// GOOGLE ADS CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────
// Fill these in once your Google Ads account + conversion action exist:
//   1. Google Ads > Goals > Conversions > + New conversion action
//      (or Tools & Settings > Conversions)
//   2. Copy the "Conversion ID" (looks like AW-123456789) below.
//   3. Copy that same action's "Conversion label" (a short string like
//      "AbC-D_efGhIjKlmNoP") below.
// Until you do, the tag safely no-ops — nothing breaks, it just won't
// report data to Google yet.
export const GOOGLE_ADS_CONVERSION_ID = 'AW-18374467102';
export const GOOGLE_ADS_CONVERSION_LABEL = 'PQFbCOqx5uocEJ680L1E';

export const GOOGLE_ADS_TAG_CONFIGURED =
  !GOOGLE_ADS_CONVERSION_ID.includes('XXXXXXXXX') &&
  !GOOGLE_ADS_CONVERSION_LABEL.includes('XXXXXXXXXXXXXXXXXXXX');
