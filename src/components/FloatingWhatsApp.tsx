import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { OTTAWA_WHATSAPP_LINK, OTTAWA_PHONE } from '../data/junkData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
        Chat with Ottawa Dispatch
      </div>

      <a
        href={OTTAWA_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        aria-label="Chat with Junk Trucks Ottawa on WhatsApp"
      >
        {/* Icon-only on mobile — the full text pill was wide enough to
            overlap page buttons/forms near the bottom-right corner on
            small screens. Full label returns from sm and up where
            there's more room. */}
        <WhatsAppIcon className="w-6 h-6 shrink-0" />
        <span className="hidden sm:inline text-xs font-bold font-sans tracking-wide">
          WhatsApp Us
        </span>
        <span className="hidden sm:inline w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
      </a>
    </aside>
  );
};
