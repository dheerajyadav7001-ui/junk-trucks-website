// Build-time route table used by scripts/prerender.mjs. Pure data and string
// building only (no React, no DOM), so it can be bundled and run in Node.
import { SERVICE_PAGES, PRICES_PAGE } from '../data/servicePages';
import { AD_LANDING, AD_LANDING_SLUG } from '../data/adLanding';
import { LANDING_PAGES } from '../data/junkData';
import { LOAD_PRICES, PRICE_NOTE } from '../config/pricing';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../utils/schema';

export interface PrerenderRoute {
  path: string; // no leading slash, e.g. "furniture-removal-ottawa"
  title: string;
  description: string;
  robots?: string;
  jsonLd: object[];
  bodyHtml: string;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const faqHtml = (faqs: { question: string; answer: string }[]) =>
  `<h2>Frequently asked questions</h2>` +
  faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('');

const priceHtml = () =>
  `<h2>Junk removal prices in Ottawa</h2><ul>` +
  LOAD_PRICES.map((p) => `<li>${esc(p.label)}: from $${p.from}</li>`).join('') +
  `</ul><p>${esc(PRICE_NOTE)}</p>`;

export function getRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];

  for (const p of SERVICE_PAGES) {
    const path = `/${p.slug}`;
    routes.push({
      path: p.slug,
      title: p.title,
      description: p.metaDescription,
      jsonLd: [
        serviceSchema(p.name, path, p.metaDescription),
        faqSchema(p.faqs),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: p.name, path },
        ]),
      ],
      bodyHtml:
        `<main><h1>${esc(p.h1)}</h1><p>${esc(p.heroSub)}</p>` +
        p.intro.map((t) => `<p>${esc(t)}</p>`).join('') +
        priceHtml() +
        p.sections
          .map(
            (s) =>
              `<h2>${esc(s.heading)}</h2>` +
              s.body.map((t) => `<p>${esc(t)}</p>`).join('') +
              (s.bullets ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''),
          )
          .join('') +
        `<h2>What we take</h2><ul>${p.take.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` +
        faqHtml(p.faqs) +
        `<p><a href="tel:+13437770398">Call (343) 777-0398</a></p></main>`,
    });
  }

  routes.push({
    path: PRICES_PAGE.slug,
    title: PRICES_PAGE.title,
    description: PRICES_PAGE.metaDescription,
    jsonLd: [
      faqSchema(PRICES_PAGE.faqs),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: PRICES_PAGE.name, path: `/${PRICES_PAGE.slug}` },
      ]),
    ],
    bodyHtml:
      `<main><h1>Junk Removal Prices in Ottawa</h1><p>A single item starts from $85. Bigger jobs are priced by the space they take in the truck.</p>` +
      priceHtml() +
      faqHtml(PRICES_PAGE.faqs) +
      `</main>`,
  });

  routes.push({
    path: AD_LANDING_SLUG,
    title: AD_LANDING.title,
    description: AD_LANDING.metaDescription,
    robots: 'noindex, follow',
    jsonLd: [faqSchema(AD_LANDING.faqs)],
    bodyHtml: `<main><h1>${esc(AD_LANDING.h1)}</h1><p>${esc(AD_LANDING.sub)}</p>${priceHtml()}${faqHtml(AD_LANDING.faqs)}</main>`,
  });

  // Existing keyword pages: give each its own title, description and FAQ in the raw HTML.
  for (const lp of LANDING_PAGES) {
    routes.push({
      path: lp.slug,
      title: lp.title,
      description: lp.metaDescription,
      jsonLd: [faqSchema(lp.faqs)],
      bodyHtml: `<main><h1>${esc(lp.keyword)}</h1><p>${esc(lp.subheadline)}</p>${faqHtml(lp.faqs)}</main>`,
    });
  }

  return routes;
}
