import { useEffect } from 'react';

const DEFAULT_TITLE = "Junk Trucks — Ottawa's #1 Eco-Friendly Junk Hauling & Property Cleanouts";
const DEFAULT_DESCRIPTION =
  "Ottawa's #1 Eco-Friendly Residential & Commercial Junk Removal Service. Upfront transparent pricing, same-day hauling, and eco-diversion donations.";
const SITE_ORIGIN = 'https://junktrucks.ca';

/**
 * Updates the document <title>, meta description, and canonical link for
 * the currently rendered page. This is a single-index.html SPA served for
 * every real path (/, /services, /furniture-removal-ottawa, ...), so
 * without this every route -- including all 6 keyword landing pages built
 * for Google Ads / SEO -- would share the exact same <title> and meta
 * description. Search engines need each indexable page to look and read as
 * distinct content, so every page component should call this with its own
 * title + description.
 */
export function useDocumentHead(title?: string, description?: string) {
  useEffect(() => {
    const finalTitle = title || DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;

    document.title = finalTitle;

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', finalDescription);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', finalDescription);

    // Canonical link: tells Google the one real URL for this page's
    // content, matching whatever real path the router just navigated to.
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const canonicalHref = `${SITE_ORIGIN}${window.location.pathname === '/' ? '' : window.location.pathname}`;
    canonical.setAttribute('href', canonicalHref || SITE_ORIGIN);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalHref || SITE_ORIGIN);
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.setAttribute('content', canonicalHref || SITE_ORIGIN);
      document.head.appendChild(newOgUrl);
    }

    return () => {
      // Reset to the site default on unmount so navigating to a page that
      // (by mistake) doesn't call this hook never inherits a stale one.
      document.title = DEFAULT_TITLE;
      if (descMeta) descMeta.setAttribute('content', DEFAULT_DESCRIPTION);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDescription) ogDescription.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
