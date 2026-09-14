import { useEffect } from 'react';

const DEFAULT_TITLE = "Junk Trucks — Ottawa's #1 Eco-Friendly Junk Hauling & Property Cleanouts";
const DEFAULT_DESCRIPTION =
  "Ottawa's #1 Eco-Friendly Residential & Commercial Junk Removal Service. Upfront transparent pricing, same-day hauling, and eco-diversion donations.";

/**
 * Updates the document <title> and meta description for the currently
 * rendered page. This is a hash-routed single-page app served from one
 * index.html, so without this every route -- including all 6 keyword
 * landing pages built for Google Ads / SEO -- would share the exact same
 * <title> and meta description. Search engines need each indexable page
 * to look and read as distinct content, so every page component should
 * call this with its own title + description.
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
