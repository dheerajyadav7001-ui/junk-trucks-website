import { FaqItem } from '../types';
import { PRICE_FROM } from '../config/pricing';

const ORIGIN = 'https://junktrucks.ca';
const PHONE = '+13437770398';

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.path}`,
    })),
  };
}

export function serviceSchema(name: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: `${ORIGIN}${path}`,
    areaServed: { '@type': 'City', name: 'Ottawa' },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Junk Trucks',
      url: ORIGIN,
      telephone: PHONE,
      image: `${ORIGIN}/logo.png`,
      address: { '@type': 'PostalAddress', addressLocality: 'Ottawa', addressRegion: 'ON', addressCountry: 'CA' },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CAD', minPrice: PRICE_FROM },
    },
  };
}
