export type PageId = 'home' | 'services' | 'emergency' | 'landing';

export interface TrackingParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  gclid?: string;
}

export interface BookingFormData extends TrackingParams {
  name: string;
  phone: string;
  email: string;
  address: string;
  neighborhood: string;
  postalCode: string;
  serviceType: string;
  loadSize: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  isUrgent?: boolean;
}

export interface PricingTier {
  id: string;
  fraction: string;
  title: string;
  price: string;
  cubicYards: string;
  equivalent: string;
  popular?: boolean;
  features: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  startingPrice: string;
  itemsIncluded: string[];
  popular?: boolean;
  category?: 'residential' | 'commercial' | 'renovation';
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  rating: number;
  date: string;
  service?: string;
  comment: string;
  verified: boolean;
  userType?: string;
  avatarColor?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'estate' | 'renovation';
  location: string;
  description: string;
  timeSpent: string;
  divertedPercent: string;
  beforeImage: string;
  afterImage: string;
  highlights: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DonationPartner {
  name: string;
  city: string;
  role: string;
}

export interface LandingScenario {
  emoji: string;
  title: string;
  desc: string;
}

export interface LandingPageConfig {
  slug: string;
  // Exact ad-group keyword — must match the h1, the ad headline, and the
  // search term someone typed, per the single-keyword-ad-group strategy.
  keyword: string;
  badge: string;
  subheadline: string;
  serviceType: string;
  formHeading: string;
  scenariosLabel: string;
  scenarios: LandingScenario[];
  // SEO: unique <title> and meta description for this page. Required
  // because this is a hash-routed SPA with a single index.html -- without
  // per-page values every landing page would share the same title tag.
  title: string;
  metaDescription: string;
  faqs: FaqItem[];
}
