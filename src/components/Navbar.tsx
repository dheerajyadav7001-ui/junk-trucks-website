import React, { useState } from 'react';
import { Truck, Phone, Menu, X, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { useBooking } from '../context/BookingContext';
import { OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK } from '../data/junkData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Logo } from './Logo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  const navLinks: { key: string; id: PageId; label: string; hash: string }[] = [
    { key: 'nav-home', id: 'home', label: 'Home', hash: '#home' },
    { key: 'nav-services', id: 'services', label: 'Services', hash: '#services' },
    { key: 'nav-before-after', id: 'home', label: 'Before & After', hash: '#before-after' },
    { key: 'nav-faq', id: 'home', label: 'FAQ', hash: '#faq' },
    { key: 'nav-donate', id: 'home', label: 'Donate', hash: '#donate' },
  ];

  const SCROLL_ANCHOR_HASHES = ['#before-after', '#faq', '#donate'];

  const handleLinkClick = (id: PageId, hash: string) => {
    window.location.hash = hash;
    if (currentPage !== id) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
    if (SCROLL_ANCHOR_HASHES.includes(hash)) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-stone-200">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('home', '#home')}
          className="flex items-center text-left shrink-0 transition-opacity hover:opacity-95"
          aria-label="Junk Trucks Home"
        >
          <Logo logoSrc="/logo.png" showTagline={true} tagline="Gets The Job Done." />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = SCROLL_ANCHOR_HASHES.includes(link.hash) ? false : currentPage === link.id;
            return (
              <button
                key={link.key}
                onClick={() => handleLinkClick(link.id, link.hash)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[#025337] bg-[#EDF5F1]'
                    : 'text-stone-700 hover:text-[#025337] hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Area: Phone, WhatsApp, and Book Online */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Phone Number directly beside Book Online */}
          <a
            href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 transition-colors"
            title="Call Ottawa Dispatch"
          >
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#025337] shadow-2xs">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[10px] text-stone-500 block font-semibold uppercase">Direct Line</span>
              <span className="font-mono font-bold text-xs text-[#025337]">{OTTAWA_PHONE}</span>
            </div>
          </a>

          {/* WhatsApp Space / Contact Button */}
          <a
            href={OTTAWA_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
            title="Chat with us on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Book Online Button */}
          <button
            id="nav-book-now-btn"
            onClick={() => openBooking()}
            className="px-4 py-2.5 rounded-xl bg-[#F2661C] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#DB540F] transition-all flex items-center gap-1.5"
          >
            <span>Book Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile / Tablet Small Screen Actions */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mini action icons only visible on small mobile (<md) */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={OTTAWA_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#25D366] text-white shadow-2xs"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="p-2 rounded-xl bg-stone-100 text-[#025337] border border-stone-200"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => openBooking()}
              className="px-3 py-2 rounded-xl bg-[#F2661C] text-white text-xs font-bold shadow-xs"
            >
              Book
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2.5 shadow-xl">
          {navLinks.map((link) => {
            const isActive = SCROLL_ANCHOR_HASHES.includes(link.hash) ? false : currentPage === link.id;
            return (
              <button
                key={link.key}
                onClick={() => handleLinkClick(link.id, link.hash)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EDF5F1] text-[#025337] font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Mobile Direct Action Buttons */}
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="w-full py-2.5 rounded-xl bg-[#025337] text-white text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F2661C]" />
              Call Now: {OTTAWA_PHONE}
            </a>

            <a
              href={OTTAWA_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#25D366] text-white text-center text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp ({OTTAWA_PHONE})
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-2.5 rounded-xl bg-[#F2661C] text-white text-center text-sm font-bold shadow-xs flex items-center justify-center gap-2"
            >
              <span>Book Online (Instant Estimate)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
