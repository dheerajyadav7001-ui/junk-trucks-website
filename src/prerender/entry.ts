// Build-time route table used by scripts/prerender.mjs. Pure data and string
// building only (no React, no DOM), so it can be bundled and run in Node.
import { SERVICE_PAGES, PRICES_PAGE } from '../data/servicePages';
import { AD_LANDING, AD_LANDING_SLUG } from '../data/adLanding';
import { LANDING_PAGES, OTTAWA_AREAS, TESTIMONIALS, FAQS } from '../data/junkData';
import { LOAD_PRICES, PRICE_NOTE } from '../config/pricing';
import { breadcrumbSchema, faqSchema, serviceSchema, blogPostSchema } from '../utils/schema';
import { BLOG_POSTS } from '../data/blogPosts';
import { parseInline, stripInline } from '../utils/richText';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '../data/blogMeta';

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

// Paragraph text with [label](/path) markup turned into real <a> tags.
const inlineHtml = (t: string) =>
  parseInline(t)
    .map((p) => (typeof p === 'string' ? esc(p) : `<a href="${esc(p.href)}">${esc(p.text)}</a>`))
    .join('');

const faqHtml = (faqs: { question: string; answer: string }[]) =>
  `<h2>Frequently asked questions</h2>` +
  faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(stripInline(f.answer))}</p>`).join('');

const priceHtml = () =>
  `<h2>Junk removal prices in Ottawa</h2><ul>` +
  LOAD_PRICES.map((p) => `<li>${esc(p.label)}: from $${p.from}</li>`).join('') +
  `</ul><p>${esc(PRICE_NOTE)}</p>`;


// ---- Internal links in the raw HTML (menu, related pages, areas, reviews, footer) ----
// The React app builds the same navigation in the browser; having it in the static
// HTML as well means Google can follow the links between pages without running scripts.
const SERVICE_LINKS = SERVICE_PAGES.map((sp) => ({ href: `/${sp.slug}`, text: `${sp.name} in Ottawa` }));
const EXTRA_LINKS = LANDING_PAGES.map((lp) => ({ href: `/${lp.slug}`, text: lp.keyword }));
const linkList = (items: { href: string; text: string }[]) =>
  `<ul>${items.map((l) => `<li><a href="${l.href}">${esc(l.text)}</a></li>`).join('')}</ul>`;

const topNavHtml = () =>
  `<nav aria-label="Main"><a href="/">Junk Trucks</a> · <a href="/services">Services</a> · ` +
  `<a href="/junk-removal-ottawa-prices">Prices</a> · <a href="/blog">Blog</a> · ` +
  `<a href="/emergency-junk-removal">Emergency junk removal</a> · <a href="/donate">Donations</a> · ` +
  `<a href="tel:+13437770398">(343) 777-0398</a></nav>`;

const footerHtml = (currentPath: string) => {
  const skip = (l: { href: string }) => l.href !== `/${currentPath}`;
  return (
    `<footer><h2>Junk removal services in Ottawa</h2>` +
    linkList([...SERVICE_LINKS, ...EXTRA_LINKS].filter(skip)) +
    `<h2>More from Junk Trucks</h2>` +
    linkList(
      [
        { href: '/junk-removal-ottawa-prices', text: 'Junk removal prices in Ottawa' },
        { href: '/blog', text: 'Ottawa junk removal guides' },
        { href: '/emergency-junk-removal', text: 'Emergency junk removal' },
        { href: '/donate', text: 'Donation partners' },
        { href: '/services', text: 'All services' },
        { href: '/', text: 'Junk Trucks home' },
      ].filter(skip),
    ) +
    `<p>Serving ${OTTAWA_AREAS.map((a) => esc(a.name.replace(/ \(On-Request\)/, ''))).join(', ')}.</p></footer>`
  );
};

const relatedServicesHtml = (slugs: string[]) => {
  const items = slugs
    .map((sl) => SERVICE_PAGES.find((sp) => sp.slug === sl))
    .filter(Boolean)
    .map((sp) => ({ href: `/${sp!.slug}`, text: `${sp!.name} in Ottawa` }));
  return items.length ? `<h2>Related services</h2>${linkList(items)}` : '';
};

const areasHtml = () =>
  `<h2>Areas we serve in Ottawa</h2><ul>${OTTAWA_AREAS.map((a) => `<li>${esc(a.name)}</li>`).join('')}</ul>`;

const reviewsHtml = (ids: string[]) => {
  const items = ids.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter(Boolean) as typeof TESTIMONIALS;
  return items.length
    ? `<h2>What Ottawa customers say</h2>` +
        items.map((t) => `<blockquote><p>${esc(t.comment)}</p><p>${esc(t.name)}, Google review</p></blockquote>`).join('')
    : '';
};

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
        reviewsHtml(p.reviewIds) +
        relatedServicesHtml(p.related) +
        areasHtml() +
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

  // Blog index + posts: full article text in the raw HTML.
  routes.push({
    path: 'blog',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
    bodyHtml:
      `<main><h1>Ottawa Junk Removal Guides</h1>` +
      BLOG_POSTS.map(
        (p) => `<article><h2><a href="/blog/${p.slug}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p></article>`,
      ).join('') +
      `<p><a href="/">Junk Trucks home</a> · <a href="tel:+13437770398">Call (343) 777-0398</a></p></main>`,
  });

  for (const p of BLOG_POSTS) {
    const path = `/blog/${p.slug}`;
    routes.push({
      path: `blog/${p.slug}`,
      title: p.title,
      description: p.description,
      jsonLd: [
        blogPostSchema(p),
        faqSchema(p.faqs),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: p.title, path },
        ]),
      ],
      bodyHtml:
        `<main><article><h1>${esc(p.h1)}</h1>` +
        p.intro.map((t) => `<p>${inlineHtml(t)}</p>`).join('') +
        p.sections
          .map(
            (s) =>
              `<h2>${esc(s.heading)}</h2>` +
              s.body.map((t) => `<p>${inlineHtml(t)}</p>`).join('') +
              (s.bullets ? `<ul>${s.bullets.map((b) => `<li>${inlineHtml(b)}</li>`).join('')}</ul>` : '') +
              (s.showPrices ? priceHtml() : ''),
          )
          .join('') +
        (p.sourceNote ? `<p>${esc(p.sourceNote)}</p>` : '') +
        faqHtml(p.faqs) +
        `<p>${p.relatedServices.map((sl) => `<a href="/${sl}">${esc(sl.replace(/-ottawa$/, '').replace(/-/g, ' '))}</a>`).join(' · ')}</p>` +
        `<p><a href="/blog">All guides</a> · <a href="tel:+13437770398">Call (343) 777-0398</a></p></article></main>`,
    });
  }

  // Add the site menu and a footer with links to every service page to each indexable page.
  return routes.map((r) =>
    r.path === AD_LANDING_SLUG
      ? r
      : { ...r, bodyHtml: topNavHtml() + r.bodyHtml + footerHtml(r.path) },
  );
}

// Homepage raw HTML: the page itself is built in the browser, so put the main
// text (intro, services, prices, reviews, areas, FAQ) and the links in the HTML too.
export const getHomeLinksHtml = () =>
  topNavHtml() +
  `<main><h1>Junk Removal in Ottawa</h1>` +
  `<p>Junk Trucks is a local Ottawa junk removal crew. Tell us what has to go, get an upfront price, and we do the lifting, loading and hauling. Single items start from $85.</p>` +
  `<h2>Junk removal services in Ottawa</h2>` +
  linkList(SERVICE_LINKS) +
  priceHtml() +
  reviewsHtml(['rev-5', 'rev-7', 'rev-8', 'rev-9', 'rev-10', 'rev-6']) +
  areasHtml() +
  faqHtml(FAQS) +
  `<p><a href="tel:+13437770398">Call (343) 777-0398</a></p></main>` +
  footerHtml('');
