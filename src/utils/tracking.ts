import { TrackingParams } from '../types';

const STORAGE_KEY = 'junk_trucks_marketing_tracking';

/**
 * Extracts UTM and Google Click ID (gclid) parameters from the URL
 * and persists them across the session so user navigation doesn't drop attribution.
 */
export function initTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};

  const currentParams: TrackingParams = {};
  
  // 1. Check window.location.search (?utm_source=...)
  const searchParams = new URLSearchParams(window.location.search);
  
  // 2. Also check hash query string (#emergency?utm_source=...) if present
  let hashSearch = '';
  if (window.location.hash && window.location.hash.includes('?')) {
    hashSearch = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
  }
  const hashParams = new URLSearchParams(hashSearch);

  const keys: (keyof TrackingParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'gclid',
  ];

  keys.forEach((key) => {
    const val = searchParams.get(key) || hashParams.get(key);
    if (val) {
      currentParams[key] = val;
    }
  });

  // Check existing saved tracking params in sessionStorage
  try {
    const savedRaw = sessionStorage.getItem(STORAGE_KEY);
    const saved: TrackingParams = savedRaw ? JSON.parse(savedRaw) : {};

    // Merge: fresh URL parameters take precedence over previously saved
    const merged: TrackingParams = {
      ...saved,
      ...currentParams,
    };

    if (Object.keys(merged).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }

    return merged;
  } catch (e) {
    console.warn('Could not access sessionStorage for marketing tracking', e);
    return currentParams;
  }
}

export function getTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // ignore
  }
  return initTrackingParams();
}
