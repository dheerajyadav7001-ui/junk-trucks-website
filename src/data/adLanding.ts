import { FaqItem } from '../types';

// Content for the paid-search landing page at /lp/junk-removal-ottawa.
// Prices on that page come from src/config/pricing.ts.
export const AD_LANDING_SLUG = 'lp/junk-removal-ottawa';

export const AD_LANDING = {
  title: 'Junk Removal Ottawa from $85 | Get Your Price | Junk Trucks',
  metaDescription: 'Junk removal in Ottawa from $85. Get your price in minutes, or call (343) 777-0398.',
  h1: 'Junk Removal in Ottawa from $85',
  sub: 'Upfront price, local crew, and we do all the lifting. Tell us what you have and get a firm price before we load anything.',
  points: [
    { title: 'You see the price first', body: 'Single items start from $85. We confirm your exact price before we load anything.' },
    { title: 'You do not lift a thing', body: 'The crew comes inside, carries everything out and sweeps up.' },
    { title: 'Local Ottawa crew', body: 'Real Ottawa reviews, a local phone number, and usable items set aside for donation.' },
  ],
  take: [
    'Couches, chairs and sectionals',
    'Mattresses and box springs',
    'Fridges, stoves, washers and dryers',
    'Tables, dressers and desks',
    'Old TVs and electronics',
    'Garage and basement clutter',
    'Drywall, wood and flooring',
    'Yard waste and brush',
  ],
  dontTake: ['Wet paint and chemicals', 'Motor oil and car batteries', 'Propane tanks', 'Asbestos', 'Biohazard medical waste'],
  steps: [
    { title: 'Tell us what you have', body: 'Send a quote request with a photo, or call. You get a price.' },
    { title: 'Pick a time', body: 'We book the earliest slot that suits you and call before we arrive.' },
    { title: 'We load and haul', body: 'You point, we carry. We sweep up and take it away.' },
  ],
  faqs: [
    { question: 'How much does junk removal cost in Ottawa?', answer: 'A single item starts from $85, a quarter truck from $199, a half truck from $349, a three-quarter truck from $499 and a full truck from $649, before HST. We confirm your price before we load.' },
    { question: 'What is included in the price?', answer: 'The crew, the loading and the disposal. There is no separate dump fee.' },
    { question: 'How soon can you come?', answer: 'It depends on the schedule that day. Call (343) 777-0398 or send a quote request and we will tell you the earliest time.' },
    { question: 'Do I need to be home?', answer: 'Someone needs to be there to show us what is going and approve the price, unless you have arranged access with us.' },
    { question: 'Do I have to move things outside?', answer: 'No. The crew comes inside and carries everything out from any room or floor.' },
    { question: 'What do you not take?', answer: 'Wet paint and chemicals, motor oil, car batteries, propane tanks, asbestos and biohazard medical waste.' },
  ] as FaqItem[],
};
