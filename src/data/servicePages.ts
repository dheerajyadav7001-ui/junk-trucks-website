import { FaqItem } from '../types';

// ─────────────────────────────────────────────────────────────────────────
// WAVE 1 SERVICE PAGES (organic SEO pages — full site navigation)
// One page per search. Each page gets its own title, description, schema
// and unique body text. Prices come from src/config/pricing.ts.
// Do NOT add near-duplicate "synonym" pages (trash removal, rubbish removal,
// junk pick up): they are the same search as /junk-removal-ottawa and are
// covered by that page.
// ─────────────────────────────────────────────────────────────────────────

export interface ServiceSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface ServicePageConfig {
  slug: string;
  /** Short name used in links and breadcrumbs, e.g. "Furniture Removal". */
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  badge: string;
  heroSub: string;
  /** Preselected in the booking form. */
  serviceType: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: ServiceSection[];
  take: string[];
  dontTake: string[];
  faqs: FaqItem[];
  related: string[];
  /** Show the "Will the City pick it up?" checker on this page. */
  showChecker?: boolean;
  /** Ids from TESTIMONIALS to show on this page. */
  reviewIds: string[];
}

export const SERVICE_PAGES: ServicePageConfig[] = [
  {
    slug: 'junk-removal-ottawa',
    name: 'Junk Removal',
    h1: 'Junk Removal in Ottawa',
    title: 'Junk Removal Ottawa from $85 | Junk Trucks',
    metaDescription:
      'Junk removal in Ottawa from $85. Upfront price, local crew that does the lifting. Get a free quote or call (343) 777-0398.',
    badge: 'From $85 · Upfront price',
    heroSub:
      'Point at what has to go. Our Ottawa crew loads it, sweeps up and hauls it away, and you know the price before we start.',
    serviceType: 'General Junk Removal',
    image: '/truck-hero.jpg',
    imageAlt: 'Junk Trucks truck loading household junk in Ottawa',
    intro: [
      'Junk Trucks is a local Ottawa junk removal service. Whether you need one old couch gone or a whole garage cleared, the steps are the same: tell us what you have, get a firm price, and we do the lifting.',
      'People search for this under many names, including junk pick up, trash removal, rubbish removal and haul away. It is the same job here, and one price covers the labour, the loading and the disposal.',
    ],
    sections: [
      {
        heading: 'How we price a junk removal job',
        body: [
          'We price by the space your items take up in the truck, not by weight. A single item starts from $85, a quarter of a truck from $199, and a full truck from $649. Send a photo or describe the job, and we confirm the price before anything is loaded.',
          'The price includes the crew, the loading and the disposal. See the full table on the prices page.',
        ],
      },
      {
        heading: 'Jobs we do most often in Ottawa',
        body: ['Most calls fall into a handful of jobs. Each has its own page with details and examples.'],
        bullets: [
          'Single items such as a couch, mattress or fridge',
          'Garage and basement cleanouts',
          'Estate and downsizing cleanouts',
          'Renovation debris such as drywall, flooring and cabinets',
          'Yard waste, fences, sheds and hot tubs',
        ],
      },
      {
        heading: 'You do not have to move anything',
        body: [
          'The crew comes inside to get the items, from the basement, an upstairs bedroom or the back of the garage. You point, we carry. Nothing needs to be set out at the curb.',
        ],
      },
    ],
    take: [
      'Couches, chairs and sectionals',
      'Mattresses and box springs',
      'Fridges, freezers, stoves, washers and dryers',
      'Tables, dressers, desks and bookcases',
      'Old TVs, computers and electronics',
      'Drywall, lumber, flooring and tile',
      'Branches, brush and yard waste',
      'Exercise equipment, hot tubs and sheds',
    ],
    dontTake: [
      'Wet paint and chemicals',
      'Motor oil and car batteries',
      'Propane tanks',
      'Asbestos',
      'Biohazard medical waste',
    ],
    faqs: [
      {
        question: 'How much does junk removal cost in Ottawa?',
        answer:
          'A single item starts from $85, a quarter truck from $199, a half truck from $349, a three-quarter truck from $499 and a full truck from $649, before HST. We confirm your price before we start loading.',
      },
      {
        question: 'Do you charge by weight?',
        answer:
          'No. We price by the space your items take up in the truck. Very heavy materials such as concrete, dirt or shingles may be priced differently, so tell us if your job includes them.',
      },
      {
        question: 'How soon can you come?',
        answer:
          'It depends on the schedule that day. Call (343) 777-0398 or send a quote request and we will tell you the earliest time we can get to you.',
      },
      {
        question: 'Do I need to be home?',
        answer:
          'Someone needs to be there to show us what is going and to approve the price, unless you have arranged access with us in advance.',
      },
      {
        question: 'What do you do with the junk?',
        answer:
          'Usable furniture and household goods are set aside for donation where possible. The rest is sorted for recycling or disposal.',
      },
      {
        question: 'Which parts of Ottawa do you serve?',
        answer:
          'We serve Ottawa including Downtown, Kanata, Stittsville, Nepean, Barrhaven, Orléans, Gloucester, Westboro, Hintonburg, South Keys and Manotick. Gatineau is available on request.',
      },
    ],
    related: ['furniture-removal-ottawa', 'mattress-removal-ottawa', 'appliance-removal-ottawa', 'garbage-removal-ottawa'],
    reviewIds: ['rev-1', 'rev-6', 'rev-3'],
  },
  {
    slug: 'garbage-removal-ottawa',
    name: 'Garbage Removal',
    h1: 'Garbage Removal in Ottawa',
    title: 'Garbage Removal Ottawa from $85 | Junk Trucks',
    metaDescription:
      'Will the City of Ottawa take it? Check your item, then book garbage removal from $85 for anything the curb will not take. Call (343) 777-0398.',
    badge: 'Check the City first · Then call us',
    heroSub:
      'For regular bagged garbage, the City collection is the cheapest option. For everything the curb will not take, we haul it away from $85.',
    serviceType: 'General Junk Removal',
    image: '/truck-hero.jpg',
    imageAlt: 'Junk Trucks crew hauling bulky garbage in Ottawa',
    showChecker: true,
    intro: [
      'Most Ottawa homes get curbside garbage collection from the City. For regular household garbage that is the simplest option, and we will not pretend otherwise.',
      'This page is for what the curb does not handle: bulky items past the limit, appliances, electronics, renovation debris and whole-room cleanouts. Try the checker below to see where your item goes.',
    ],
    sections: [
      {
        heading: 'When to use City pickup, and when to call us',
        body: [
          'Use the City for regular bagged garbage and for a few bulky items inside its limits. Book us when you have more than the limit allows, items the City does not collect, or items that are hard to get to the curb.',
        ],
        bullets: [
          'More bulky items than the City limit allows',
          'Appliances such as fridges, stoves, washers and dryers',
          'Old TVs, monitors and computers',
          'Renovation debris such as drywall, wood and tile',
          'A full garage, basement or storage unit',
          'Anything upstairs, in the basement or too heavy to carry out',
        ],
      },
      {
        heading: 'What it costs',
        body: [
          'Garbage removal with Junk Trucks starts from $85 for a single item. A few bags or small items can go on the truck with a booking. The prices page shows the price for larger loads.',
        ],
      },
      {
        heading: 'Check the City rules for your address',
        body: [
          'City rules and collection days change, so confirm the current details for your address on the City of Ottawa garbage and recycling page before you set anything out.',
        ],
      },
    ],
    take: [
      'Bulky household garbage',
      'Furniture and mattresses beyond the City limit',
      'Appliances and electronics',
      'Renovation and construction debris',
      'Yard waste and brush',
      'Garage, basement and storage clear-outs',
    ],
    dontTake: [
      'Wet paint and chemicals',
      'Motor oil and car batteries',
      'Propane tanks',
      'Asbestos',
      'Biohazard medical waste',
    ],
    faqs: [
      {
        question: 'Does the City of Ottawa pick up my old couch or mattress?',
        answer:
          'The City collects a limited number of bulky items at the curb on regular collection days. Use the checker on this page to see how your item counts, and confirm current rules on ottawa.ca.',
      },
      {
        question: 'Will the City take appliances or old TVs?',
        answer:
          'Appliances and electronics are generally not part of regular curbside collection. Check ottawa.ca for current rules. We take both away for you.',
      },
      {
        question: 'How much does garbage removal cost?',
        answer:
          'From $85 for a single item, with larger loads priced by the space they take in the truck. See the prices page for a quarter, half, three-quarter and full truck.',
      },
      {
        question: 'Do you take regular weekly garbage bags?',
        answer:
          'Regular weekly garbage is best left to the City collection. If you have a few bags with other items, they can go on the truck with your booking.',
      },
      {
        question: 'Can you take garbage from inside the house?',
        answer:
          'Yes. The crew comes in and carries everything out, so you do not have to move anything to the curb.',
      },
    ],
    related: ['junk-removal-ottawa', 'appliance-removal-ottawa', 'furniture-removal-ottawa', 'mattress-removal-ottawa'],
    reviewIds: ['rev-2', 'rev-1', 'rev-3'],
  },
  {
    slug: 'furniture-removal-ottawa',
    name: 'Furniture Removal',
    h1: 'Furniture Removal in Ottawa',
    title: 'Furniture Removal Ottawa from $85 | Junk Trucks',
    metaDescription:
      'Furniture removal in Ottawa from $85. Couches, sectionals, dressers, tables and desks hauled from any room. Usable pieces set aside for donation.',
    badge: 'One piece or a full house · From $85',
    heroSub:
      'Old couch, worn-out dresser or a whole house of furniture. We carry it out, you do not lift a thing, and usable pieces are set aside for donation.',
    serviceType: 'Furniture Removal & Donation',
    image: '/furniture-removal.jpg',
    imageAlt: 'Old furniture being removed from an Ottawa home',
    intro: [
      'Furniture is the most common thing our customers want gone: a couch that no longer fits, a dresser from a move, a dining set after downsizing. We take a single piece or a full house, with no minimum load.',
      'A single item starts from $85. A few pieces together are priced by the space they take in the truck, and we confirm the price before we load.',
    ],
    sections: [
      {
        heading: 'Furniture we remove',
        body: ['We take furniture of any size, from any floor.'],
        bullets: [
          'Sofas, sectionals, loveseats and recliners',
          'Dining tables, chairs and china cabinets',
          'Dressers, wardrobes and nightstands',
          'Desks, filing cabinets and bookcases',
          'Bed frames, headboards and futons',
          'Office furniture for small businesses',
        ],
      },
      {
        heading: 'Donation comes first',
        body: [
          'Furniture in good condition does not need to go to a landfill. Where a piece is usable, we set it aside for donation to local charities. Broken, heavily damaged or stained pieces cannot be donated and go for recycling or disposal.',
          'See what charities accept on the donate page.',
        ],
      },
      {
        heading: 'Common furniture jobs',
        body: [
          'New furniture arriving and the old set still in the way. A basement full of pieces from a move. A condo where the sofa will not fit in the elevator. In each case we measure up, carry it out carefully and protect floors and walls on the way.',
        ],
      },
    ],
    take: [
      'Sofas, couches and sectionals',
      'Mattresses and box springs',
      'Dining sets, desks and bookcases',
      'Dressers, wardrobes and cabinets',
      'Office chairs, desks and filing cabinets',
      'Patio furniture and grills',
    ],
    dontTake: ['Wet paint and chemicals', 'Propane tanks', 'Asbestos', 'Biohazard medical waste'],
    faqs: [
      {
        question: 'Do you take a single piece of furniture?',
        answer: 'Yes. There is no minimum load. A single item such as a couch starts from $85.',
      },
      {
        question: 'Can you take furniture from upstairs or the basement?',
        answer:
          'Yes. The crew carries furniture from any floor, so you do not need to bring anything to the door or the curb.',
      },
      {
        question: 'Do you donate usable furniture?',
        answer:
          'Where a piece is in good condition, we set it aside for donation to local charities instead of sending it to a landfill.',
      },
      {
        question: 'How much does furniture removal cost in Ottawa?',
        answer:
          'From $85 for one item, from $199 for a quarter truck and from $349 for a half truck, before HST. We confirm your price before loading.',
      },
      {
        question: 'Will the City pick up my old furniture?',
        answer:
          'The City collects a limited number of bulky items at the curb. If you have more, or you cannot get items outside, we can take it. Try the checker on the garbage removal page.',
      },
    ],
    related: ['mattress-removal-ottawa', 'junk-removal-ottawa', 'garbage-removal-ottawa', 'appliance-removal-ottawa'],
    reviewIds: ['rev-5', 'rev-1', 'rev-6'],
  },
  {
    slug: 'mattress-removal-ottawa',
    name: 'Mattress Removal',
    h1: 'Mattress Removal in Ottawa',
    title: 'Mattress Removal Ottawa from $85 | Junk Trucks',
    metaDescription:
      'Mattress and box spring removal in Ottawa from $85. We carry it out from the bedroom, no need to wrap or drag it to the curb.',
    badge: 'Mattress & box spring pickup · From $85',
    heroSub:
      'We take the mattress, the box spring and the frame straight from the bedroom, so you do not have to wrestle them down the stairs.',
    serviceType: 'Furniture Removal & Donation',
    image: '/furniture-removal.jpg',
    imageAlt: 'Old mattress being carried out of an Ottawa home',
    intro: [
      'A mattress is awkward to carry and expensive to leave sitting in a hallway. We come to the room, carry it out and take it away, along with the box spring and bed frame if you want them gone too.',
      'A single item such as a mattress starts from $85. If you are also clearing a bed frame or other furniture, we price the whole load together and confirm the price before we start.',
    ],
    sections: [
      {
        heading: 'What we take',
        body: ['Any size, in any condition.'],
        bullets: [
          'Mattresses, from twin to king',
          'Box springs and foundations',
          'Bed frames and headboards',
          'Mattress toppers and pillow tops',
          'Futons and sofa beds',
        ],
      },
      {
        heading: 'Mattresses and the City curbside limit',
        body: [
          'The City counts a mattress and a box spring as one bulky item each toward its curbside limit. If you are over the limit or cannot carry them out, a pickup from us is the simpler option. Always confirm current rules on ottawa.ca.',
        ],
      },
      {
        heading: 'Can a mattress be donated?',
        body: [
          'Charities generally cannot accept stained or damaged mattresses. If yours is clean and in good condition, tell us when you book and we will see whether it can be set aside. Otherwise it is removed for disposal.',
          'If there is a bed bug or mold problem, mention it when you book so the crew can plan how to handle it.',
        ],
      },
    ],
    take: [
      'Mattresses of any size',
      'Box springs and foundations',
      'Bed frames and headboards',
      'Mattress toppers',
      'Sofa beds and futons',
    ],
    dontTake: ['Wet paint and chemicals', 'Propane tanks', 'Asbestos', 'Biohazard medical waste'],
    faqs: [
      {
        question: 'How much does mattress removal cost in Ottawa?',
        answer:
          'A single item such as a mattress starts from $85. A mattress with a box spring and frame is priced by the space it takes in the truck. We confirm the price before loading.',
      },
      {
        question: 'Do I need to wrap the mattress or take it outside?',
        answer: 'No. We carry it out from the room, so nothing needs to be wrapped or dragged to the curb.',
      },
      {
        question: 'Do you take the box spring and bed frame too?',
        answer: 'Yes. Tell us what is going when you book and we price it together.',
      },
      {
        question: 'Can my old mattress be donated?',
        answer:
          'Only if it is clean and in good condition. Charities generally cannot take stained or damaged mattresses.',
      },
      {
        question: 'Will the City take my old mattress?',
        answer:
          'The City collects a limited number of bulky items at the curb, and a mattress counts as one. Use the checker on the garbage removal page and confirm current rules on ottawa.ca.',
      },
    ],
    related: ['furniture-removal-ottawa', 'junk-removal-ottawa', 'garbage-removal-ottawa', 'appliance-removal-ottawa'],
    reviewIds: ['rev-3', 'rev-4', 'rev-1'],
  },
  {
    slug: 'appliance-removal-ottawa',
    name: 'Appliance Removal',
    h1: 'Appliance Removal in Ottawa',
    title: 'Appliance Removal Ottawa from $85 | Junk Trucks',
    metaDescription:
      'Fridge, stove, washer and dryer removal in Ottawa from $85. We carry appliances out and recycle them, so you skip the drop-off.',
    badge: 'Fridges, stoves, washers · From $85',
    heroSub:
      'Old fridge, washer or stove? We carry it out and send it for recycling. Just have the water and gas lines shut off before we arrive.',
    serviceType: 'Appliance Removal & Recycling',
    image: '/appliance-recycling.jpg',
    imageAlt: 'Old appliances being removed from an Ottawa home',
    intro: [
      'Appliances are heavy, awkward and not collected with regular garbage. We carry them out, load them and take them for recycling, so you do not have to rent a truck or find a drop-off site.',
      'A single appliance starts from $85. If you are replacing a whole kitchen or laundry room, several appliances are priced together by the space they take in the truck.',
    ],
    sections: [
      {
        heading: 'Appliances we remove',
        body: ['Large and small, working or not.'],
        bullets: [
          'Refrigerators and freezers',
          'Stoves, ranges and ovens',
          'Washers and dryers',
          'Dishwashers and microwaves',
          'Air conditioners and dehumidifiers',
          'Water heaters and small appliances',
        ],
      },
      {
        heading: 'Before we arrive',
        body: [
          'Please have the appliance unplugged and, for washers, dishwashers and gas stoves, the water or gas lines shut off. Empty fridges and freezers so nothing spills on the way out. Leave a clear path to the door if you can, and we handle the rest.',
        ],
      },
      {
        heading: 'Why not just put it out for the City?',
        body: [
          'Appliances are generally not part of regular curbside garbage collection, so leaving one at the curb can mean it sits there or leads to a notice. Confirm current City rules on ottawa.ca. We take them away from inside your home and send them for recycling where possible.',
        ],
      },
    ],
    take: [
      'Refrigerators and freezers',
      'Stoves, ranges and ovens',
      'Washers and dryers',
      'Dishwashers and microwaves',
      'Air conditioners',
      'Water heaters',
    ],
    dontTake: ['Propane tanks', 'Wet paint and chemicals', 'Motor oil and car batteries', 'Asbestos'],
    faqs: [
      {
        question: 'How much does appliance removal cost in Ottawa?',
        answer:
          'A single appliance starts from $85. Several appliances are priced together by the space they take in the truck. We confirm the price before loading.',
      },
      {
        question: 'Do you disconnect the appliance?',
        answer:
          'Please unplug it and shut off water or gas lines before we arrive. The crew then moves the appliance out.',
      },
      {
        question: 'Do you take appliances that do not work?',
        answer: 'Yes. Working or not, we take them away and send them for recycling where possible.',
      },
      {
        question: 'Can you remove a fridge from the basement or an upstairs unit?',
        answer: 'Yes. The crew carries appliances from any floor, so nothing needs to be brought outside first.',
      },
      {
        question: 'Will the City pick up an old fridge?',
        answer:
          'Appliances are generally not part of regular curbside collection. Try the checker on the garbage removal page and confirm current rules on ottawa.ca.',
      },
    ],
    related: ['junk-removal-ottawa', 'furniture-removal-ottawa', 'garbage-removal-ottawa', 'mattress-removal-ottawa'],
    reviewIds: ['rev-5', 'rev-1', 'rev-4'],
  },
];

export const PRICES_PAGE = {
  slug: 'junk-removal-ottawa-prices',
  name: 'Junk Removal Prices',
  title: 'Junk Removal Prices Ottawa: From $85 | Junk Trucks',
  metaDescription:
    'See junk removal prices in Ottawa: single item from $85, quarter truck from $199, half from $349, full truck from $649. Labour and disposal included.',
  faqs: [
    {
      question: 'How much does junk removal cost in Ottawa?',
      answer:
        'A single item starts from $85, a quarter truck from $199, a half truck from $349, a three-quarter truck from $499 and a full truck from $649, before HST.',
    },
    {
      question: 'What is included in the price?',
      answer: 'The crew, the loading and the disposal. You do not pay a separate dump fee.',
    },
    {
      question: 'Is there a minimum charge?',
      answer: 'The minimum is the single-item price, from $85.',
    },
    {
      question: 'Do you charge by weight?',
      answer:
        'No. We price by the space your items take up in the truck. Very heavy materials such as concrete, dirt or shingles may be priced differently, so tell us when you book.',
    },
    {
      question: 'Do you charge extra for stairs?',
      answer: 'No. We quote the job as you describe it and confirm the price before we load.',
    },
    {
      question: 'How do I get an exact price?',
      answer:
        'Send a photo or describe the job through the quote form, or call (343) 777-0398. We confirm the price before any work starts.',
    },
  ] as FaqItem[],
};

export function getServicePage(slug: string): ServicePageConfig | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}
