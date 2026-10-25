import { useEffect } from 'react';

export const HOME_TITLE = 'Junk Trucks | Ottawa Junk Removal, Cleanouts & Hauling from $85';
export const HOME_DESCRIPTION =
  'Local Ottawa junk removal and cleanouts. Furniture, appliances, garage, basement and renovation debris. Upfront price from $85. Call (343) 777-0398.';
const DEFAULT_TITLE = HOME_TITLE;
const DEFAULT_DESCRIPTION = HOME_DESCRIPTION;
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
export interface HeadOptions {
  /** e.g. "noindex, follow" for ad-only pages that should stay out of search. */
  robots?: string;
  /** schema.org JSON-LD objects to add to the page while it is shown. */
  jsonLd?: object[];
}

export function useDocumentHead(title?: string, description?: string, options?: HeadOptions) {
  const jsonLdKey = options?.jsonLd ? JSON.stringify(options.jsonLd) : '';
  const robots = options?.robots || '';
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

    // Page-level robots + structured data. Static copies of these are also
    // written into each page's HTML at build time (scripts/prerender.mjs);
    // these keep client-side navigation in sync.
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robots) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', robots);
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    document.querySelectorAll('script[data-page-jsonld]').forEach((n) => n.remove());
    const added: HTMLScriptElement[] = [];
    if (jsonLdKey) {
      (JSON.parse(jsonLdKey) as object[]).forEach((obj) => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-page-jsonld', '1');
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
        added.push(s);
      });
    }

    return () => {
      added.forEach((n) => n.remove());
      const rm = document.querySelector('meta[name="robots"]');
      if (rm && robots) rm.remove();
      // Reset to the site default on unmount so navigating to a page that
      // (by mistake) doesn't call this hook never inherits a stale one.
      document.title = DEFAULT_TITLE;
      if (descMeta) descMeta.setAttribute('content', DEFAULT_DESCRIPTION);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDescription) ogDescription.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description, robots, jsonLdKey]);
}
