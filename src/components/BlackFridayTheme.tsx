import React, { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { BLACK_FRIDAY, daysLeftText, isBlackFridayTheme } from '../config/offer';
import { setClickedPromo } from '../utils/promo';
import { trackEvent } from '../utils/analytics';

/** Keeps <html class="bf"> in step with the offer dates (the inline script in index.html does the first paint). */
export function useBlackFridayTheme(): boolean {
  const on = isBlackFridayTheme();
  useEffect(() => {
    document.documentElement.classList.toggle('bf', on);
  }, [on]);
  return on;
}

/** Slim banner above the header. Click opens the quote form. */
export const BlackFridayBar: React.FC = () => {
  const { openQuote } = useBooking();
  return (
    <button
      type="button"
      onClick={() => {
        setClickedPromo(BLACK_FRIDAY.id);
        trackEvent('promo_click', { promo: BLACK_FRIDAY.id, location: 'top_bar' });
        openQuote();
      }}
      className="block w-full bg-[linear-gradient(90deg,#FA7415,#FF9A3D,#FA7415)] px-3 py-2 text-center text-[12.5px] sm:text-sm font-extrabold uppercase tracking-wide text-black"
    >
      <span aria-hidden="true">🔥 </span>
      Black Friday · Up to $50 off · One small item free
      <span className="hidden sm:inline"> · {daysLeftText(BLACK_FRIDAY)}</span>
      <span className="ml-2 underline underline-offset-2">Get quote →</span>
    </button>
  );
};

/** Decorative side strips, wide screens only. */
export const BlackFridaySides: React.FC = () => (
  <>
    <div className="bf-side bf-side-left" aria-hidden="true">
      <span>Black Friday · Up to $50 off · Ends Nov 30</span>
    </div>
    <div className="bf-side bf-side-right" aria-hidden="true">
      <span>Black Friday · Up to $50 off · Ends Nov 30</span>
    </div>
  </>
);
