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

// Real, crawlable path for each static page (everything except the
// per-keyword landing pages, which live directly at /<slug>).
const SERVICES_PATH = '/services';
const EMERGENCY_PATH = '/emergency-junk-removal';

// Old hash routes this site used to run on, mapped to their new real path.
// Kept so any bookmark, saved Google Ads Final URL, or old sitelink still
// lands on the right page instead of breaking.
const LEGACY_HASH_TO_PATH: Record<string, string> = {
  home: '/',
  services: SERVICES_PATH,
  emergency: EMERGENCY_PATH,
  'emergency-junk-removal': EMERGENCY_PATH,
};

export function getSlugFromPath(pathname: string): string | null {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean) return null;
  return clean;
}

// Helper to determine active page strictly from the real URL path.
export function getPageFromPath(pathname: string): PageId {
  const slug = getSlugFromPath(pathname);
  if (!slug) return 'home';
  if (slug === 'services') return 'services';
  if (slug === 'emergency-junk-removal') return 'emergency';
  if (LANDING_PAGES.some((lp) => lp.slug === slug)) return 'landing';
  return 'home';
}

// Extracts the landing-page slug from the path, if the path matches one of
// the configured keyword landing pages.
export function getLandingSlugFromPath(pathname: string): string | null {
  const slug = getSlugFromPath(pathname);
  if (!slug) return null;
  return LANDING_PAGES.some((lp) => lp.slug === slug) ? slug : null;
}

// One-time migration: if the page loaded on an old #hash route (a saved
// bookmark, an existing Google Ads Final URL, an old sitelink), rewrite the
// address bar to the equivalent real path so the URL itself becomes
// crawlable and shareable going forward, without breaking whoever followed
// the old link.
function migrateLegacyHash(): void {
  if (typeof window === 'undefined') return;
  const rawHash = window.location.hash.toLowerCase().replace('#', '');
  if (!rawHash) return;
  const cleanHash = rawHash.split('?')[0];

  // Old per-keyword landing pages were at #lp/<slug>
  if (cleanHash.startsWith('lp/')) {
    const slug = cleanHash.slice(3);
    if (LANDING_PAGES.some((lp) => lp.slug === slug)) {
      window.history.replaceState(null, '', `/${slug}${window.location.search}`);
    }
    return;
  }

  // Same-page scroll anchors (#before-after, #faq, #donate) stay as-is —
  // they're not separate pages, just a scroll target on the homepage.
  if (['before-after', 'faq', 'donate'].includes(cleanHash)) return;

  const mapped = LEGACY_HASH_TO_PATH[cleanHash];
  if (mapped) {
    window.history.replaceState(null, '', `${mapped}${window.location.search}`);
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [landingSlug, setLandingSlug] = useState<string | null>(null);

  // Load the Google Ads tag once, site-wide (powers both conversion tracking
  // and the remarketing audience). No-ops until real IDs are set.
  useEffect(() => {
    loadGoogleAdsTag();
  }, []);

  // On first load: migrate any legacy #hash URL to its real path, then read
  // the (possibly just-rewritten) real path to decide what to render.
  useEffect(() => {
    migrateLegacyHash();
    setCurrentPage(getPageFromPath(window.location.pathname));
    setLandingSlug(getLandingSlugFromPath(window.location.pathname));
  }, []);

  // Sync state with real browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      setLandingSlug(getLandingSlugFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central navigation: pushes a real, crawlable URL (e.g. /services,
  // /furniture-removal-ottawa) instead of a #hash fragment.
  const handleNavigate = (page: PageId, slug?: string) => {
    const path =
      page === 'services'
        ? SERVICES_PATH
        : page === 'emergency'
        ? EMERGENCY_PATH
        : page === 'landing' && slug
        ? `/${slug}`
        : '/';

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentPage(page);
    setLandingSlug(page === 'landing' ? slug ?? null : null);
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
        {/* Navigation Bar with real-path Routing (hidden on focused ad landing pages) */}
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
