import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const SERVICE_AREA_MARKERS = [
  { name: 'Downtown / Centretown', x: 52, y: 28 },
  { name: 'Westboro / Hintonburg', x: 40, y: 38 },
  { name: 'Kanata / Stittsville', x: 20, y: 54 },
  { name: 'Orléans / Gloucester', x: 78, y: 32 },
  { name: 'Nepean / Barrhaven', x: 36, y: 72 },
  { name: 'South Keys / Riverside', x: 62, y: 60 },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLinkClick = (page: PageId, hash: string) => {
    window.location.hash = hash;
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (anchorId: string) => {
    window.location.hash = `#${anchorId}`;
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#012D19] text-stone-300 pt-12 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/10 items-center">
          {/* Col 1: Prominent Brand & Tagline */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 py-2">
            <Logo
              showTagline={true}
              theme="dark"
              tagline="Gets The Job Done."
              size="xl"
            />

            {/* Donation-forward brand line — reinforces the eco-friendly
                positioning and adds keyword-rich, crawlable copy to the
                footer (present on every page except focused ad landing
                pages), which otherwise had no real text content here. */}
            <div className="max-w-md space-y-2 pt-1">
              <p className="text-white font-black text-lg sm:text-xl leading-snug">
                Your Junk. Someone Else's Need.
              </p>
              <p className="text-stone-300 text-sm leading-relaxed">
                Before anything from your Ottawa garage cleanout, furniture removal, or
                estate cleanout reaches a landfill, we sort it for donation — usable
                furniture, appliances, and household items go to Ottawa families and
                charities who can use them, not the dump.
              </p>
            </div>
          </div>

          {/* Col 2: Expanded Ottawa Service Map with Plotted Markers */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm tracking-wide uppercase font-mono flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F2661C]" />
                Ottawa Service Map
              </h4>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                40 km Coverage
              </span>
            </div>

            <div className="relative w-full h-80 sm:h-96 lg:h-[400px] rounded-2xl overflow-hidden border border-emerald-800/80 shadow-inner bg-[#0f281f]">
              <iframe
                title="Ottawa Junk Removal Service Area Map"
                src="https://maps.google.com/maps?q=Ottawa%2C%20ON&t=&z=10&ie=UTF8&iwloc=&output=embed"
                className={`w-full h-full border-0 transition-opacity duration-700 ease-out ${mapLoaded ? 'opacity-90' : 'opacity-0'}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Visually Plotted Area Markers */}
              <div className="absolute inset-0 pointer-events-none">
                {SERVICE_AREA_MARKERS.map((marker) => (
                  <div
                    key={marker.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group pointer-events-auto"
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  >
                    {/* Soft Glowing Pin Marker */}
                    <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute w-5 h-5 rounded-full bg-[#F2661C]/30 animate-pulse blur-[2px]" />
                      <div className="w-3 h-3 rounded-full bg-[#F2661C] border-2 border-white shadow-md z-10" />
                    </div>

                    {/* Area Name Badge */}
                    <div className="mt-1 px-2 py-0.5 rounded bg-[#012D19]/95 border border-[#2B6651] shadow-md backdrop-blur-xs whitespace-nowrap text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1 z-20 transition-all duration-300 group-hover:bg-[#025337]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2661C]" />
                      <span>{marker.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Legend */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#012D19]/95 backdrop-blur-xs border border-emerald-700/60 text-[10px] sm:text-[11px] text-stone-200 pointer-events-none shadow-md">
                <span className="flex items-center gap-1.5 font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  6 Core Service Hubs Plotted
                </span>
                <span className="text-[#F2661C] font-mono font-bold">Ottawa Metro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} Junk Trucks Ottawa Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button onClick={() => handleLinkClick('services', '#services')} className="hover:text-stone-200 transition-colors">
              Services
            </button>
            <button onClick={() => handleAnchorClick('before-after')} className="hover:text-stone-200 transition-colors">
              Before & After
            </button>
            <button onClick={() => handleAnchorClick('faq')} className="hover:text-stone-200 transition-colors">
              FAQ
            </button>
            <button onClick={() => handleAnchorClick('donate')} className="hover:text-stone-200 transition-colors">
              Donate
            </button>
            <button onClick={() => handleLinkClick('emergency', '#emergency')} className="hover:text-[#F2661C] transition-colors">
              Emergency Hauling
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
