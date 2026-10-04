import React from 'react';
import { useBooking } from '../context/BookingContext';

// Sticky bottom bar for phones: a single Book Now button.
export const MobileActionBar: React.FC = () => {
  const { openBooking } = useBooking();
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 pt-2.5"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={() => openBooking()}
        className="w-full py-3.5 rounded-lg bg-[#FA7415] text-white text-base font-bold active:opacity-90"
      >
        Book Now
      </button>
    </div>
  );
};
