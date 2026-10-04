import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { LANDING_PAGES } from '../data/junkData';

interface FooterProps {
  onNavigate: (page: PageId, slug?: string) => void;
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

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (anchorId: string) => {
    onNavigate('home');
    window.location.hash = `#${anchorId}`;
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLandingClick = (slug: string) => {
    onNavigate('landing', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F2742] text-slate-300 pt-12 pb-8 border-t border-slate-950">
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
              <p className="text-slate-300 text-sm leading-relaxed">
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
                <MapPin className="w-4 h-4 text-[#FA7415]" />
                Ottawa Service Map
              </h4>
              <span className="text-[11px] font-mono text-sky-200 bg-slate-950/80 px-2.5 py-0.5 rounded border border-[#173B5F]">
                40 km Coverage
              </span>
            </div>

            <div className="relative w-full h-80 sm:h-96 lg:h-[400px] rounded-2xl overflow-hidden border border-[#173B5F]/80 shadow-inner bg-[#0C1F36]">
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
                      <span className="absolute w-5 h-5 rounded-full bg-[#FA7415]/30 animate-pulse blur-[2px]" />
                      <div className="w-3 h-3 rounded-full bg-[#FA7415] border-2 border-white shadow-md z-10" />
                    </div>

                    {/* Area Name Badge */}
                    <div className="mt-1 px-2 py-0.5 rounded bg-[#0F2742]/95 border border-[#2A5580] shadow-md backdrop-blur-xs whitespace-nowrap text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1 z-20 transition-all duration-300 group-hover:bg-[#173B5F]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FA7415]" />
                      <span>{marker.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Legend */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#0F2742]/95 backdrop-blur-xs border border-[#173B5F]/60 text-[10px] sm:text-[11px] text-slate-200 pointer-events-none shadow-md">
                <span className="flex items-center gap-1.5 font-mono text-sky-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
                  6 Core Service Hubs Plotted
                </span>
                <span className="text-[#FA7415] font-mono font-bold">Ottawa Metro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Service Pages — real, crawlable links so Google can
            discover each dedicated cleanout page by following a link, not
            only via the sitemap. */}
        <div className="py-8 border-b border-white/10">
          <h4 className="font-bold text-white text-xs tracking-wide uppercase font-mono mb-3">
            Popular Ottawa Cleanout Services
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LANDING_PAGES.map((lp) => (
              <a
                key={lp.slug}
                href={`/${lp.slug}`}
                onClick={(e) => { e.preventDefault(); handleLandingClick(lp.slug); }}
                className="text-slate-300 hover:text-[#FA7415] transition-colors"
              >
                {lp.keyword}
              </a>
            ))}
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Junk Trucks Ottawa. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href="/services" onClick={(e) => { e.preventDefault(); handleLinkClick('services'); }} className="hover:text-slate-200 transition-colors">
              Services
            </a>
            <button onClick={() => handleAnchorClick('before-after')} className="hover:text-slate-200 transition-colors">
              Our Work
            </button>
            <button onClick={() => handleAnchorClick('faq')} className="hover:text-slate-200 transition-colors">
              FAQ
            </button>
            <button onClick={() => handleAnchorClick('donate')} className="hover:text-slate-200 transition-colors">
              Donate
            </button>
            <a href="/emergency-junk-removal" onClick={(e) => { e.preventDefault(); handleLinkClick('emergency'); }} className="hover:text-[#FA7415] transition-colors">
              Emergency Hauling
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
