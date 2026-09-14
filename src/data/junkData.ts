import { PricingTier, ServiceDetail, Testimonial, GalleryProject, FaqItem, DonationPartner, LandingPageConfig } from '../types';

export const OTTAWA_PHONE = '(343) 777-0398';
export const OTTAWA_PHONE_RAW = 'tel:+13437770398';
export const OTTAWA_EMAIL = 'info@junktrucks.ca';
export const OTTAWA_WHATSAPP = '13437770398';
export const OTTAWA_WHATSAPP_LINK = 'https://wa.me/13437770398?text=Hello%20Junk%20Trucks%20Ottawa%2C%20I%20would%20like%20to%20get%20a%20junk%20removal%20quote.';
export const OTTAWA_WHATSAPP_DISPLAY = '+1 (343) 777-0398';

export const OTTAWA_AREAS = [
  { name: 'Downtown / Centretown', postal: 'K1P, K1R, K2P' },
  { name: 'Kanata / Stittsville', postal: 'K2K, K2L, K2M, K2S' },
  { name: 'Nepean / Barrhaven', postal: 'K2E, K2G, K2H, K2J' },
  { name: 'Orléans / Gloucester', postal: 'K1C, K1E, K1W, K1J' },
  { name: 'Westboro / Hintonburg', postal: 'K1Y, K1Z, K2A' },
  { name: 'South Keys / Riverside', postal: 'K1V, K1T, K4M' },
  { name: 'Manotick / Greely', postal: 'K4M, K4P' },
  { name: 'Gatineau / Hull (On-Request)', postal: 'J8X, J8Y' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single-item',
    fraction: 'Single Item',
    title: 'Single Item / Minimum',
    price: 'Lowest Price Guaranteed',
    cubicYards: '1 – 2 cu. yd',
    equivalent: '1 couch, 1 mattress, or 1 refrigerator',
    features: [
      'Single large furniture or appliance',
      'All heavy lifting & loading included',
      'Eco-donation & scrap recycling',
      'Zero stairs or labor surcharges',
    ],
  },
  {
    id: 'quarter-truck',
    fraction: '1/4 Truck',
    title: '1/4 Box Truckload',
    price: 'Lowest Price Guaranteed',
    cubicYards: '4 cubic yards',
    equivalent: 'Equivalent to 1 full standard pickup truck bed',
    features: [
      'Small garage or shed cleanup',
      'Couple of big furniture pieces + boxes',
      'Includes 1 hour on-site labor',
      'Sweep-up service afterwards',
    ],
  },
  {
    id: 'half-truck',
    fraction: '1/2 Truck',
    title: '1/2 Box Truckload',
    price: 'Lowest Price Guaranteed',
    cubicYards: '8 cubic yards',
    equivalent: 'Equivalent to 2 full standard pickup beds',
    popular: true,
    features: [
      'Our most popular Ottawa residential package',
      'Partial basement or attic cleanout',
      'Multiple rooms or renovation debris',
      'Full sorting for local Ottawa charities',
    ],
  },
  {
    id: 'three-quarter-truck',
    fraction: '3/4 Truck',
    title: '3/4 Box Truckload',
    price: 'Lowest Price Guaranteed',
    cubicYards: '12 cubic yards',
    equivalent: 'Equivalent to 3 pickup truck beds',
    features: [
      'Major home decluttering or downsizing',
      'Large carpet tear-outs + lumber',
      'Multi-room estate sorting',
      'Up to 2 hours of crew loading',
    ],
  },
  {
    id: 'full-truck',
    fraction: 'Full Truck',
    title: 'Full 16ft Box Truckload',
    price: 'Lowest Price Guaranteed',
    cubicYards: '16 – 18 cubic yards',
    equivalent: 'Equivalent to 4–5 full pickup truck beds',
    features: [
      'Complete estate or whole-home clearout',
      'Commercial office or retail renovation',
      'Heavy-duty 16ft custom high-sided truck',
      'Complete broom-clean finish included',
    ],
  },
];

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'furniture-removal',
    title: 'Furniture Removal & Donation',
    shortDesc: 'Couches, mattresses, tables, and recliners hauled away and donated to Ottawa charities.',
    fullDesc: 'We do all the heavy lifting from anywhere in your home — upstairs, downstairs, or basement. Reusable furniture in good condition is delivered directly to Ottawa charity partners like the Habitat ReStore and local shelters.',
    iconName: 'Armchair',
    startingPrice: 'Lowest Price Guaranteed',
    popular: true,
    category: 'residential',
    image: '/furniture-pickup.jpg',
    itemsIncluded: ['Sectional Sofas & Couches', 'Mattresses & Box Springs', 'Dining Sets & Desks', 'Dressers & Wardrobes', 'Wall Units & Bookcases'],
  },
  {
    id: 'appliance-recycling',
    title: 'Appliance Removal & Recycling',
    shortDesc: 'Refrigerators, freezers, washers, dryers, and stoves safely removed and eco-recycled.',
    fullDesc: 'Appliances contain valuable recyclable metals as well as hazardous refrigerants (Freon). We safely extract fluids and guarantee 100% of scrap steel, copper, and aluminum are recycled at certified Ottawa metal facilities.',
    iconName: 'Refrigerator',
    startingPrice: 'Lowest Price Guaranteed',
    category: 'residential',
    image: '/appliance-removal.jpg',
    itemsIncluded: ['Refrigerators & Freezers', 'Washing Machines & Dryers', 'Stoves & Ranges', 'Dishwashers & Microwaves', 'Air Conditioners & Heaters'],
  },
  {
    id: 'estate-cleanouts',
    title: 'Estate & Property Cleanouts',
    shortDesc: 'Patient, thorough cleanouts for garages, basements, and whole estates across Ottawa.',
    fullDesc: 'Clearing out a loved one’s home or preparing a home for sale can be overwhelming. We work closely with families and estate attorneys to identify sentimental keepsakes, donate usable household goods, and responsibly clear the rest.',
    iconName: 'Home',
    startingPrice: 'Lowest Price Guaranteed',
    popular: true,
    category: 'residential',
    image: '/garage-cleanout.jpg',
    itemsIncluded: ['Whole-Home Clearouts', 'Attic, Basement & Shed Clearing', 'Donation Drop-Off Receipts', 'Broom-Clean Real Estate Handover', 'Document Shredding Referrals'],
  },
  {
    id: 'renovation-debris',
    title: 'Renovation Debris Removal',
    shortDesc: 'Drywall, lumber, tile, fixtures, and flooring hauled away cleanly without driveway bins.',
    fullDesc: 'Avoid renting an eyesore bin that damages your driveway. Our mobile crew pulls up, loads all construction waste directly into our truck, sweeps up dust and nails, and hauls it away immediately.',
    iconName: 'Hammer',
    startingPrice: 'Lowest Price Guaranteed',
    category: 'renovation',
    image: '/reno-debris.jpg',
    itemsIncluded: ['Drywall & Plaster', 'Lumber & Framing Timber', 'Ceramic Tiles & Flooring', 'Cabinetry & Countertops', 'Doors, Windows & Trim'],
  },
  {
    id: 'yard-waste',
    title: 'Yard Waste & Storm Debris',
    shortDesc: 'Fallen tree branches, brush piles, hedge clippings, and dismantled fences cleared fast.',
    fullDesc: 'Ottawa storms and seasonal yard work generate massive piles that city compost bins won’t take. We chip, haul, and take organic material to Ottawa composting and mulching facilities.',
    iconName: 'TreePine',
    startingPrice: 'Lowest Price Guaranteed',
    category: 'renovation',
    image: '/yard-reno.jpg',
    itemsIncluded: ['Fallen Branches & Tree Trimmings', 'Dismantled Wooden Decks & Fences', 'Old Play Structures & Sheds', 'Bags of Leaves & Garden Overgrowth', 'Old Patio Furniture & Grills'],
  },
  {
    id: 'commercial-junk',
    title: 'Commercial & Office Cleanouts',
    shortDesc: 'Office furniture, cubicle partitions, e-waste, shelving, and retail junk with after-hours dispatch.',
    fullDesc: 'Flexible after-hours and weekend scheduling so your business operations never face disruptions. We provide commercial WSIB certificates, certificates of insurance, and official tax donation receipts.',
    iconName: 'Building2',
    startingPrice: 'Lowest Price Guaranteed',
    category: 'commercial',
    image: '/cover-truck.jpg',
    itemsIncluded: ['Office Desks & Ergonomic Chairs', 'Cubicle Partitions & Dividers', 'Computers, Monitors & E-Waste', 'Retail Racks & Display Units', 'Warehouse Pallets & Packaging'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Andrew Prince',
    area: 'Ottawa',
    rating: 5,
    date: 'a month ago',
    userType: '1 review',
    comment: 'Very helpful and organized. They were quick to reply and provide an estimate. Arrived on time and were very helpful in taking my items. Great price and communication, I will definitely use them again in the future should I need to. Thank you!',
    verified: true,
    avatarColor: '#3B82F6',
  },
  {
    id: 'rev-2',
    name: 'Tamas Koko',
    area: 'Ottawa',
    rating: 5,
    date: '3 weeks ago',
    userType: '1 review · New',
    comment: 'I only had a few things but he came by and picked up all the garbage i had',
    verified: true,
    avatarColor: '#7C3AED',
  },
  {
    id: 'rev-3',
    name: 'Rayene Mrad',
    area: 'Ottawa',
    rating: 5,
    date: 'a month ago',
    userType: '4 reviews · 2 photos',
    comment: 'Great service, very helpful and on time .',
    verified: true,
    avatarColor: '#0D9488',
  },
  {
    id: 'rev-4',
    name: 'As Malick DIALLO',
    area: 'Ottawa',
    rating: 5,
    date: 'a month ago',
    userType: '1 review · 1 photo',
    comment: 'Very diligent. Helpful. Organized and rigourous. Professional services with efficiency and seriousness. Thank you guys',
    verified: true,
    avatarColor: '#1E3A8A',
  },
  {
    id: 'rev-5',
    name: 'maxwell delali',
    area: 'Ottawa',
    rating: 5,
    date: 'a month ago',
    userType: 'Local Guide · 3 reviews',
    comment: 'Fast, professional 5-star furniture removal and junk cleanout service.',
    verified: true,
    avatarColor: '#EA580C',
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'gp-1',
    title: 'Centretown Basement Overhaul',
    category: 'residential',
    location: 'Glebe / Centretown',
    description: '30 years of accumulated storage, old freezers, and obsolete electronics cleared for a finished basement renovation.',
    timeSpent: '2.5 hours',
    divertedPercent: '82% Donated & Recycled',
    beforeImage: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    highlights: ['Two 16ft box truck loads', 'Old freezer recycled per ODP regulations', 'Swept and vacuumed ready for framing'],
  },
  {
    id: 'gp-2',
    title: 'Kanata 2-Car Garage Transformation',
    category: 'residential',
    location: 'Kanata North',
    description: 'Homeowner couldn’t park either vehicle inside. Sorted salvageable tools, donated sports equipment, hauled old building scraps.',
    timeSpent: '1.5 hours',
    divertedPercent: '75% Diverted',
    beforeImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cars fit again that same evening', 'Donated 12 bags of hockey/sports gear', 'Scrap metal recycled in Nepean'],
  },
  {
    id: 'gp-3',
    title: 'Downtown Tech Office Decommissioning',
    category: 'commercial',
    location: 'Slater St., Downtown Ottawa',
    description: 'Full floor clearance of 40 cubicles, Herman Miller chairs, server racks, and packaging materials after lease end.',
    timeSpent: '5 hours',
    divertedPercent: '91% Diverted',
    beforeImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Complied with strict commercial freight elevator booking', 'E-waste certified recycling certificates provided', 'Chairs donated to non-profit organizations'],
  },
  {
    id: 'gp-4',
    title: 'Nepean Yard & Storm Damage Clearout',
    category: 'renovation',
    location: 'Arlington Woods, Nepean',
    description: 'Collapsed cedar fencing, rotten patio decking, and storm branch piles cleared prior to new landscaping.',
    timeSpent: '2 hours',
    divertedPercent: '88% Chipped & Composted',
    beforeImage: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1558904541-efa8c4a52441?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chipped directly into organic mulch', 'Zero dump fees passed onto customer', 'Magnetic nail sweep around children’s play area'],
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How does your junk removal pricing work?',
    answer: "Our pricing is based on the volume of space your items take up in our truck \u2014 no hidden dump fees, no weight surcharges. We give you an upfront price before we start, and we guarantee it's the lowest you'll find in Ottawa."
  },
  {
    question: 'What size trucks do you use?',
    answer: 'We operate heavy-duty trucks built specifically for bulk residential and commercial hauling, so we can handle anything from a single item to a full house cleanout in one trip.'
  },
  {
    question: 'Do I need to move heavy items outside or to the curb?',
    answer: "No \u2014 you don't have to lift a finger. Our crew comes directly inside your home, basement, attic, garage, backyard, or upstairs rooms to carry and load everything safely. Just point to what you want gone."
  },
  {
    question: 'What items can you take?',
    answer: 'We take almost everything: old furniture, mattresses, appliances (refrigerators, washers, stoves), electronics, computers, construction and drywall debris, renovation scrap, yard waste, exercise equipment, hot tubs, carpeting, and general household clutter.'
  },
  {
    question: 'What items CANNOT be removed?',
    answer: "For environmental and safety regulations, we cannot haul hazardous chemical materials, wet paint cans, motor oil, car batteries, biohazard medical waste, asbestos, propane tanks, or pressurized explosives. If you're unsure about a specific item, give us a quick call."
  },
  {
    question: 'What happens to my junk? Do you recycle and donate?',
    answer: "We're committed to eco-friendly disposal \u2014 over 80% of items we collect are diverted away from Ottawa landfills. We partner with local charities including Habitat for Humanity ReStore, The Salvation Army, and St. Vincent de Paul to give salvageable items a second home."
  },
  {
    question: 'Do you offer same-day or next-day junk removal in Ottawa?',
    answer: 'Yes \u2014 we run active daily routes across Ottawa, Kanata, Nepean, Orl\u00e9ans, Westboro, Barrhaven, and surrounding areas. Book online or call us at (343) 777-0398 for same-day availability.'
  }
];

export const DONATION_PARTNERS: DonationPartner[] = [
  { name: 'Habitat for Humanity ReStore', city: 'Ottawa', role: 'Furniture & Building Materials' },
  { name: 'The Salvation Army Thrift', city: 'Ottawa / Gatineau', role: 'Clothing & Household Items' },
  { name: 'St. Vincent de Paul', city: 'Ottawa', role: 'Community Family Support' },
];

export const DONATION_ACCEPTED = [
  'Gently used furniture (sofas, tables, dressers, bed frames)',
  'Working appliances',
  'Clothing and linens in good condition',
  'Books, dishes and kitchenware',
  'Working electronics',
  "Children's toys and gear in good condition",
  'Building materials and fixtures in usable condition',
];

export const DONATION_NOT_ACCEPTED = [
  'Broken or heavily damaged furniture',
  'Stained mattresses',
  'Non-working appliances',
  'Items with mold or pest damage',
];

// ─────────────────────────────────────────────────────────────────────────
// KEYWORD-MATCHED LANDING PAGES (for Google Ads single-keyword ad groups)
// ─────────────────────────────────────────────────────────────────────────
// Each entry powers one dedicated page at #lp/<slug>. Point one ad group's
// final URL at one slug so the search term, the ad headline, and this
// page's <h1> all match exactly — that match is what drives quality score
// and conversion rate up. Ask to add more any time you have a new keyword.
export const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'garage-cleanout-ottawa',
    title: 'Garage Cleanout Ottawa | Lowest Price Guarantee | Junk Trucks',
    metaDescription: 'Same-week garage cleanouts in Ottawa. We haul out tools, boxes, tires, and years of clutter. Free firm quote, lowest price guarantee, no hidden fees.',
    faqs: [
      { question: 'How much does a garage cleanout cost in Ottawa?', answer: "We give a firm, upfront quote before any work starts — no hourly guessing. Pricing depends on how much needs to go, and we guarantee the lowest price for the job. Call or fill out the form for a free quote in minutes." },
      { question: 'Do you clean out garages the same week?', answer: 'Yes — most Ottawa garage cleanouts can be scheduled within the same week you call, sometimes sooner.' },
      { question: "What items can't you take from a garage?", answer: "We handle almost everything — tools, tires, paint cans, shelving, boxes. A few hazardous materials may need special handling; ask us when you book and we'll advise." },
    ],
    keyword: 'Garage Cleanout Ottawa',
    badge: 'Same-Week Garage Clear-Outs',
    subheadline: 'Reclaim your garage this week. We haul out old tools, boxes, tires, paint cans, and years of accumulated clutter — you never lift a thing.',
    serviceType: 'Garage Cleanout Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Garage Cleanout Quote',
    scenariosLabel: 'Why Ottawa Homeowners Call Us',
    scenarios: [
      { emoji: '🚗', title: 'Parking Your Car Again', desc: 'Garage packed floor to ceiling? We clear it out so it can actually hold a car again.' },
      { emoji: '🏡', title: 'Getting Ready to Sell', desc: 'Realtors want garages staged and empty. We clear it fast ahead of showings.' },
      { emoji: '🧰', title: 'Years of Accumulated Junk', desc: 'Old paint cans, broken tools, dead appliances — we sort, haul, and dispose of it all responsibly.' },
      { emoji: '📦', title: 'Downsizing or Moving', desc: 'Clearing out before a move? We can usually be there within days, not weeks.' },
    ],
  },
  {
    slug: 'basement-cleanout-ottawa',
    title: 'Basement Cleanout Ottawa | Junk & Flood Debris Removal | Junk Trucks',
    metaDescription: 'Fast basement cleanouts in Ottawa — flood damage, old furniture, storage overflow. Free quote, lowest price guarantee, same-week service.',
    faqs: [
      { question: 'Can you remove a flooded or water-damaged basement\'s contents?', answer: 'Yes — wet carpet, soaked boxes, and water-damaged furniture are some of the most common basement cleanouts we handle in Ottawa.' },
      { question: 'How fast can you get to a flooded basement?', answer: 'We prioritize flood and water-damage calls and can often be on-site within a day or two.' },
      { question: 'Do you charge extra for heavy or awkward basement items?', answer: 'No — our quote is firm upfront regardless of stairs or heavy furniture. What we quote is what you pay.' },
    ],
    keyword: 'Basement Cleanout Ottawa',
    badge: 'Basement & Flood Cleanout Specialists',
    subheadline: 'Old furniture, waterlogged boxes, or just years of storage — our crew clears your basement quickly and hauls everything away.',
    serviceType: 'Basement Cleanout Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Basement Cleanout Quote',
    scenariosLabel: 'Common Basement Situations We Solve',
    scenarios: [
      { emoji: '💧', title: 'Flood or Water Damage', desc: 'Sump pump failure or sewer backup? We remove wet carpet, soaked boxes, and damaged furniture fast.' },
      { emoji: '📦', title: 'Storage Overflow', desc: 'Basement become the dumping ground? We clear it out completely, room by room.' },
      { emoji: '🛋️', title: 'Old Furniture Removal', desc: 'Heavy couches, dressers, and mattresses — we carry it all out, no stairs too tricky.' },
      { emoji: '🏚️', title: 'Renovation Prep', desc: 'Clearing a basement before a reno or finishing project? We empty it in one visit.' },
    ],
  },
  {
    slug: 'furniture-removal-ottawa',
    title: 'Furniture Removal Ottawa | Same-Day Pickup | Junk Trucks',
    metaDescription: 'Same-day furniture removal in Ottawa — couches, mattresses, dressers, single items or full households. Free quote, no hidden fees.',
    faqs: [
      { question: 'Do you take a single piece of furniture, or does it need to be a full load?', answer: "Either — we'll come for a single couch or mattress with no minimum load required." },
      { question: 'Can you remove furniture the same day I call?', answer: 'In most cases, yes — same-day furniture removal is available across Ottawa depending on scheduling.' },
      { question: 'Do you donate usable furniture instead of dumping it?', answer: 'Wherever possible, yes — usable furniture is set aside for donation rather than landfill.' },
    ],
    keyword: 'Furniture Removal Ottawa',
    badge: 'Same-Day Furniture Removal',
    subheadline: 'Couches, mattresses, dressers, tables — we haul away single items or entire households of old furniture, same day.',
    serviceType: 'Furniture Removal Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Furniture Removal Quote',
    scenariosLabel: 'When Ottawa Residents Call Us',
    scenarios: [
      { emoji: '🛋️', title: 'New Furniture Arriving', desc: 'Old couch blocking the delivery? We clear it before your new set shows up.' },
      { emoji: '🛏️', title: 'Old Mattress Removal', desc: 'We haul away mattresses and box springs of any size, no judgment on condition.' },
      { emoji: '🏢', title: 'Office Furniture Cleanout', desc: 'Desks, chairs, filing cabinets — full office cleanouts for Ottawa businesses.' },
      { emoji: '🚪', title: 'Single Item Pickup', desc: 'Just one piece to get rid of? We\'ll come for a single item, no minimum load required.' },
    ],
  },
  {
    slug: 'renovation-debris-removal-ottawa',
    title: 'Renovation Debris Removal Ottawa | Construction Waste Hauling | Junk Trucks',
    metaDescription: 'Contractor-grade debris removal in Ottawa — drywall, flooring, cabinets, construction waste. Recurring job-site pickups available for contractors.',
    faqs: [
      { question: 'Do you offer recurring pickups for a multi-week renovation?', answer: 'Yes — we work with Ottawa contractors and homeowners on scheduled recurring debris pickups for the length of a project.' },
      { question: 'What construction debris can you remove?', answer: 'Drywall, old cabinets, flooring, tile, and general demo debris — we clear job sites so your crew can keep working.' },
      { question: 'Do you work directly with contractors and property managers?', answer: 'Yes, we set up contractor accounts for ongoing job-site cleanouts across Ottawa.' },
    ],
    keyword: 'Renovation Debris Removal Ottawa',
    badge: 'Contractor-Grade Debris Hauling',
    subheadline: 'Drywall, flooring, cabinets, and construction waste — we clear your job site fast so your crew can keep working.',
    serviceType: 'Renovation Debris Removal Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Debris Removal Quote',
    scenariosLabel: 'Built for Contractors & Homeowners',
    scenarios: [
      { emoji: '🔨', title: 'Mid-Renovation Debris', desc: 'Drywall, old cabinets, flooring — we clear it between phases so your site stays safe and workable.' },
      { emoji: '🧱', title: 'Demo Cleanup', desc: 'Just tore out a kitchen or bathroom? We haul away all the debris in one trip.' },
      { emoji: '📅', title: 'Recurring Job-Site Pickups', desc: 'Working a multi-week reno? We can schedule regular pickups for the duration.' },
      { emoji: '🏗️', title: 'Contractor Accounts', desc: 'We work directly with Ottawa contractors and property managers on ongoing projects.' },
    ],
  },
  {
    slug: 'estate-cleanout-ottawa',
    title: 'Estate Cleanout Ottawa | Property Clean Out Services | Junk Trucks',
    metaDescription: 'Compassionate estate and full-home property clean outs in Ottawa. Fast turnaround for closings, donation sorting included. Free, no-obligation quote.',
    faqs: [
      { question: 'How quickly can you clear a full home for an estate sale or closing?', answer: 'We can usually clear a full property within days when working against a real estate closing deadline.' },
      { question: 'Do you handle donation sorting during an estate cleanout?', answer: 'Yes — usable furniture and household goods are set aside for donation wherever possible.' },
      { question: 'Is estate cleanout the same as a property clean out?', answer: "Yes — we use the terms interchangeably for a full-property clearance, whether it's for an estate, a sale, or a landlord turnover." },
    ],
    keyword: 'Estate Cleanout Ottawa',
    badge: 'Compassionate Estate & Full-Home Cleanouts',
    subheadline: 'Clearing a loved one\'s home is hard enough. We handle the entire cleanout respectfully and efficiently, start to finish.',
    serviceType: 'Estate Cleanout Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Estate Cleanout Quote',
    scenariosLabel: 'How We Help Ottawa Families',
    scenarios: [
      { emoji: '🏠', title: 'Full-Home Cleanouts', desc: 'From furniture to decades of belongings, we clear the entire property so it\'s ready to sell or hand back.' },
      { emoji: '❤️', title: 'Sensitive, Respectful Service', desc: 'We understand the emotional weight of estate cleanouts and work with care and patience.' },
      { emoji: '♻️', title: 'Donation Sorting', desc: 'Usable furniture and household goods are set aside for donation wherever possible.' },
      { emoji: '⏱️', title: 'Fast Turnaround for Closings', desc: 'Working against a real estate deadline? We can usually clear a full home within days.' },
    ],
  },
  {
    slug: 'eviction-cleanout-ottawa',
    title: 'Eviction Cleanout Ottawa | Landlord Turnover Service | Junk Trucks',
    metaDescription: 'Rapid eviction and tenant turnover cleanouts for Ottawa landlords and property managers. Full unit sweep, fast scheduling, rent-ready fast.',
    faqs: [
      { question: 'How fast can you clear an apartment after an eviction or tenant move-out?', answer: 'We prioritize landlord and property manager jobs for fast turnaround — often within a day or two of your call.' },
      { question: 'Do you do a full unit sweep, or just remove furniture?', answer: "Full unit sweep — we clear all abandoned belongings and sweep the unit so it's ready for painters." },
      { question: 'Do you work with property management companies on recurring turnovers?', answer: 'Yes — we set up ongoing accounts for landlords and property managers across Ottawa.' },
    ],
    keyword: 'Eviction Cleanout Ottawa',
    badge: 'Rapid Landlord Turnover Cleanouts',
    subheadline: 'Abandoned belongings after a tenant leaves? We clear the unit completely so you can repaint and re-rent without delay.',
    serviceType: 'Eviction Cleanout Ottawa (Ad Landing Page)',
    formHeading: 'Get Your Eviction Cleanout Quote',
    scenariosLabel: 'Built for Ottawa Landlords & Property Managers',
    scenarios: [
      { emoji: '🔑', title: 'Tenant Turnover', desc: 'Abandoned furniture and belongings left behind — we clear it fast so the unit is rent-ready.' },
      { emoji: '📋', title: 'Property Manager Accounts', desc: 'We work with landlords and property managers across Ottawa on recurring turnover jobs.' },
      { emoji: '🧹', title: 'Full Unit Sweep', desc: 'We don\'t just remove furniture — we sweep the unit clean, ready for painters.' },
      { emoji: '⚡', title: 'Fast Turnaround', desc: 'Every day a unit sits empty costs you money. We prioritize landlord jobs for quick scheduling.' },
    ],
  },
];
