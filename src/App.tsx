import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { BookingProvider } from './context/BookingContext';
import { BookingModal } from './components/BookingModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SnowOverlay } from './components/SnowOverlay';
import { loadGoogleAdsTag } from './utils/googleAdsTag';

// Individual Pages
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { EmergencyJunkRemovalPage } from './components/pages/EmergencyJunkRemovalPage';
import { KeywordLandingPage } from './components/pages/KeywordLandingPage';
import { LANDING_PAGES } from './data/junkData';

// Helper to determine active page strictly from URL hash
export function getPageFromHash(): PageId {
  if (typeof window === 'undefined') return 'home';

  const rawHash = window.location.hash.toLowerCase().replace('#', '');
  const cleanHash = rawHash.split('?')[0];

  if (cleanHash.startsWith('lp/')) {
    return 'landing';
  }

  switch (cleanHash) {
    case 'services':
      return 'services';
    case 'emergency':
    case 'emergency-junk-removal':
      return 'emergency';
    case 'home':
    default:
      return 'home';
  }
}

// Extracts the landing-page slug from a #lp/<slug> hash, if present
export function getLandingSlugFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const rawHash = window.location.hash.toLowerCase().replace('#', '');
  const cleanHash = rawHash.split('?')[0];
  if (cleanHash.startsWith('lp/')) {
    return cleanHash.slice(3);
  }
  return null;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [landingSlug, setLandingSlug] = useState<string | null>(getLandingSlugFromHash);

  // Load the Google Ads tag once, site-wide (powers both conversion tracking
  // and the remarketing audience). No-ops until real IDs are set.
  useEffect(() => {
    loadGoogleAdsTag();
  }, []);

  // Sync state with browser hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      setLandingSlug(getLandingSlugFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    window.location.hash = `#${page}`;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'emergency':
        return <EmergencyJunkRemovalPage />;
      case 'landing': {
        const config = LANDING_PAGES.find((lp) => lp.slug === landingSlug);
        if (!config) return <HomePage onNavigate={handleNavigate} />;
        return <KeywordLandingPage config={config} />;
      }
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-stone-900 selection:bg-[#F2661C] selection:text-white">
        {/* Navigation Bar with Hash-based Routing (hidden on focused ad landing pages) */}
        {currentPage !== 'landing' && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

        {/* Dynamic Multi-Page Router View */}
        <main className="flex-1">
          {renderActivePage()}
        </main>

        {/* Global Shared Booking Modal */}
        <BookingModal />

        {/* Global Floating WhatsApp Contact Quick Action */}
        <FloatingWhatsApp />

        {/* Winter campaign snow effect, shown site-wide */}
        <SnowOverlay />

        {/* Global Footer (hidden on focused ad landing pages) */}
        {currentPage !== 'landing' && <Footer onNavigate={handleNavigate} />}
      </div>
    </BookingProvider>
  );
}
