import { FaqItem } from '../types';

export interface BlogSection {
  heading: string;
  /** Paragraphs. Inline links use [text](/path) and are made real <a> tags. */
  body: string[];
  bullets?: string[];
  /** Show the live price table (from src/config/pricing.ts) after this section. */
  showPrices?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string; // <title> tag
  h1: string;
  description: string; // meta description
  category: string;
  /** ISO dates (YYYY-MM-DD). */
  published: string;
  updated: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  excerpt: string;
  intro: string[];
  sections: BlogSection[];
  faqs: FaqItem[];
  /** Slugs from SERVICE_PAGES to link at the bottom. */
  relatedServices: string[];
  /** Slugs of other blog posts. */
  relatedPosts: string[];
  /** Optional "check the source" note shown under the article. */
  sourceNote?: string;
}
