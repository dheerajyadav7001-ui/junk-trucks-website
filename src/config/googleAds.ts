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
// Google's UI font draws capital "I" and lowercase "l" identically, so the
// 17th-from-start character is ambiguous. We send to both spellings; Google
// ignores the one that does not exist. Replace with the single exact label
// copied from the monospace Event snippet once confirmed.
export const GOOGLE_ADS_CONVERSION_LABELS = ['PQFbCOqx5uocEJ680LlE', 'PQFbCOqx5uocEJ680LIE'];
export const GOOGLE_ADS_CONVERSION_LABEL = GOOGLE_ADS_CONVERSION_LABELS[0];

export const GOOGLE_ADS_TAG_CONFIGURED =
  !GOOGLE_ADS_CONVERSION_ID.includes('XXXXXXXXX') &&
  !GOOGLE_ADS_CONVERSION_LABEL.includes('XXXXXXXXXXXXXXXXXXXX');
