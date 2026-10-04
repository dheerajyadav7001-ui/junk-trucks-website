import React from 'react';
import { Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK } from '../data/junkData';
import { WhatsAppIcon } from './WhatsAppIcon';

// Sticky bottom bar for phones only: one tap to call, WhatsApp or book.
export const MobileActionBar: React.FC = () => {
  const { openBooking } = useBooking();
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 pt-2.5 grid grid-cols-3 gap-2 text-[13px]"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
        className="flex items-center justify-center gap-1.5 py-3 rounded-lg whitespace-nowrap bg-[#173B5F] text-white font-bold active:opacity-90"
      >
        <Phone className="w-4 h-4" />
        Call
      </a>
      <a
        href={OTTAWA_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-3 rounded-lg whitespace-nowrap bg-[#25D366] text-white font-bold active:opacity-90"
      >
        <WhatsAppIcon className="w-4 h-4" />
        WhatsApp
      </a>
      <button
        onClick={() => openBooking()}
        className="flex items-center justify-center py-3 rounded-lg whitespace-nowrap bg-[#FA7415] text-white font-bold active:opacity-90"
      >
        Book Now
      </button>
    </div>
  );
};
