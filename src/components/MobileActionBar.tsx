import React from 'react';
import { Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { OTTAWA_PHONE } from '../data/junkData';
import { trackEvent } from '../utils/analytics';

// Sticky bottom bar for phones: Call + Book Now.
export const MobileActionBar: React.FC = () => {
  const { openBooking } = useBooking();
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 pt-2.5 flex gap-2.5"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
        onClick={() => trackEvent('call_click', { location: 'mobile_bar' })}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#173B5F] text-white text-base font-bold active:opacity-90"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <button
        onClick={() => openBooking()}
        className="flex-1 py-3.5 rounded-lg bg-[#FA7415] text-white text-base font-bold active:opacity-90"
      >
        Book Now
      </button>
    </div>
  );
};
