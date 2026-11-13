import React, { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { BLACK_FRIDAY, SHOW_CANADA_FLAGS, daysLeftText, isBlackFridayTheme } from '../config/offer';
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

const LEAF =
  'M361 232l-13.3 4.4 61.4 54c4.7 13.7-1.6 17.8-5.6 25l66.6-8.4-1.6 67 13.9-.3-3.1-66.6 66.7 8c-4.1-8.7-7.8-13.3-4-27.2l61.3-51-10.7-4c-8.8-6.8 3.8-32.6 5.6-48.9 0 0-35.7 12.3-38 5.8l-9.2-17.5-32.6 35.8c-3.5.9-5-.5-5.9-3.5l15-74.8-23.8 13.4q-3.2 1.3-5.2-2.2l-23-46-23.6 47.8q-2.8 2.5-5 .7L424 130.8l13.7 74.1c-1.1 3-3.7 3.8-6.7 2.2l-31.2-35.3c-4 6.5-6.8 17.1-12.2 19.5s-23.5-4.5-35.6-7c4.2 14.8 17 39.6 9 47.7';

/**
 * Cropped flag filling the empty side gutters on wide screens: the left panel
 * shows the red band and the left of the white square, the right panel the
 * rest, so the two read as one flag split around the page content.
 */
const FlagSide: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const left = side === 'left';
  return (
    <div
      className={`bf-flag bf-flag-${side}`}
      aria-hidden="true"
      style={{ background: left ? 'linear-gradient(to right,#d52b1e 25%,#fff 25%)' : 'linear-gradient(to right,#fff 75%,#d52b1e 75%)' }}
    >
      <svg viewBox={left ? '120 0 480 480' : '360 0 480 480'} preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        <rect x="0" y="0" width="240" height="480" fill="#d52b1e" />
        <rect x="240" y="0" width="480" height="480" fill="#fff" />
        <rect x="720" y="0" width="240" height="480" fill="#d52b1e" />
        <path fill="#d52b1e" d={LEAF} />
      </svg>
    </div>
  );
};

/** Decorative side panels, wide screens only. */
export const BlackFridaySides: React.FC = () => {
  if (SHOW_CANADA_FLAGS) {
    return (
      <>
        <FlagSide side="left" />
        <FlagSide side="right" />
      </>
    );
  }
  return (
    <>
      <div className="bf-side bf-side-left" aria-hidden="true">
        <span>Black Friday · Up to $50 off · Ends Nov 30</span>
      </div>
      <div className="bf-side bf-side-right" aria-hidden="true">
        <span>Black Friday · Up to $50 off · Ends Nov 30</span>
      </div>
    </>
  );
};
