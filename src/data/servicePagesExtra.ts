import { FaqItem } from '../types';
import type { ServiceSection } from './servicePages';

// Extra depth for the service pages that were thinner than competing pages.
// Original wording. City of Ottawa facts follow ottawa.ca (3-item curbside limit,
// appliances and e-waste not collected at the curb, refrigerant removal rules).
export interface ServiceExtra {
  sections: ServiceSection[];
  faqs: FaqItem[];
}

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  'junk-removal-ottawa': {
    sections: [
      {
        heading: 'How to get ready for your pickup',
        body: [
          'There is very little to prepare, but a few minutes of planning makes the visit faster and the price more accurate.',
        ],
        bullets: [
          'Walk through the home and decide what stays and what goes, so you can point it out when we arrive.',
          'Take a few photos of the items, or a wide shot of the room, and send them with your request for a quicker price.',
          'Check pockets, drawers and cabinets for papers, keys or valuables before they go in the truck.',
          'Tell us about stairs, narrow hallways, elevators or limited parking when you book, so the crew arrives ready.',
          'You do not need to bag, box or carry anything to the curb. We handle that.',
        ],
      },
      {
        heading: 'Same-day and next-day pickups',
        body: [
          'Many jobs can be done the same day or the next, depending on the schedule and the size of the job. The earlier in the day you get in touch, the better the chance of a same-day slot.',
          'Call or send a quote request with a photo and we will tell you the earliest time we can get to you. Moving out, a closing date, a contractor deadline or a visit from family are the most common reasons people need it fast.',
        ],
      },
      {
        heading: 'What happens to your junk after we load it',
        body: [
          'Usable furniture and household goods are set aside for donation where possible. Metal, cardboard and appliances that can be recycled are sorted out of the load, and what is left goes to a proper disposal site.',
          'You do not have to sort anything yourself. Point at what is going and we take care of where it ends up.',
        ],
      },
      {
        heading: 'What we cannot take, and where it goes instead',
        body: [
          'Hazardous items need special handling and are not part of a regular junk pickup: wet paint, solvents and other chemicals, motor oil, car batteries, propane tanks, asbestos and biohazard medical waste.',
          'The City of Ottawa has a household hazardous waste program, and its Waste Explorer tool on ottawa.ca tells you where each item can go. You can also call 3-1-1.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I get a price from a photo?',
        answer:
          'Yes. Send a few photos with your request and we can usually give you a firm price before we come. The price is always confirmed again on site before anything is loaded.',
      },
      {
        question: 'Do you take items from upstairs, the basement or a condo?',
        answer:
          'Yes. The crew carries items out from any floor. For a condo or apartment, ask your building about booking the elevator or loading area and tell us when you book.',
      },
      {
        question: 'Is the price before or after HST?',
        answer: 'Our listed prices are before HST. We confirm the full price with you before we start.',
      },
      {
        question: 'What items can you not take?',
        answer:
          'We cannot take wet paint and chemicals, motor oil, car batteries, propane tanks, asbestos or biohazard medical waste. The City of Ottawa Waste Explorer on ottawa.ca shows where those items can go.',
      },
    ],
  },

  'garbage-removal-ottawa': {
    sections: [
      {
        heading: "Ottawa's 3-item garbage limit in plain terms",
        body: [
          'Since September 30, 2024, the City of Ottawa collects up to three items of garbage at the curb per collection day for most homes. An item is one bag, one container up to 140 litres, or one bulky item.',
          'A container has to weigh no more than 15 kg. A bulky item such as a chair or small table counts as one item and cannot be put inside a bag. Garbage goes out after 6 pm the night before collection, must be at the curb by 7 am, and the empty containers should come back in by 10 pm.',
        ],
      },
      {
        heading: 'When the curb is not enough',
        body: [
          'Some jobs do not fit in three items: a garage cleanout, a basement full of boxes, the contents of a moving week, or anything the City does not collect at all. That is when it is easier to have the crew come in, load everything in one visit and clear it that day.',
        ],
        bullets: [
          'More than three items on one collection day',
          'Furniture, mattresses and other bulky items you would rather not carry out',
          'Heavy garbage that goes past the 15 kg container limit',
          'A one-time cleanup after a move, a party or a clean-out',
        ],
      },
      {
        heading: 'What the City does not take at the curb',
        body: [
          'Appliances such as fridges and stoves, old TVs and computers (electronic waste), and renovation debris such as drywall, lumber and tile are not collected with regular garbage. We take all of these as part of a normal pickup.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What counts as one item under the 3-item limit?',
        answer:
          'One garbage bag, one container up to 140 litres and 15 kg, or one bulky item such as a chair. Bulky items cannot be bagged.',
      },
      {
        question: 'What time do I have to put garbage out in Ottawa?',
        answer:
          'After 6 pm the night before your collection day and no later than 7 am on the day. Empty containers should be taken in by 10 pm.',
      },
      {
        question: 'Can you take more than three bags at once?',
        answer:
          'Yes. We are not limited to three items. We price by the space your garbage takes in the truck, so a few extra bags or a full cleanout both work.',
      },
    ],
  },

  'furniture-removal-ottawa': {
    sections: [
      {
        heading: 'Prepare for furniture pickup in a few minutes',
        body: ['Furniture removal needs almost no preparation, but a little planning helps the crew move fast.'],
        bullets: [
          'Empty drawers, cabinets and shelves of anything you want to keep.',
          'Measure doorways and stairs if a piece is very large, and tell us about tight corners when you book.',
          'Take a photo of each large piece, or one photo of the room, and send it for a faster price.',
          'Tell us if anything is already in pieces, or if a bed frame or table needs to be taken apart.',
          'Point out the items to the crew when they arrive. We carry everything out.',
        ],
      },
      {
        heading: 'Where Ottawa furniture can be donated',
        body: [
          'If a piece is in good condition, it may have a second life. Charities such as the Habitat for Humanity ReStore and the Salvation Army accept some furniture in good condition, and their rules and drop-off options change, so check with them before you go.',
          'If you would rather not arrange the trip yourself, we set aside usable pieces for donation where possible when we pick up.',
        ],
      },
      {
        heading: 'Moving, downsizing or redecorating',
        body: [
          'Most furniture jobs fall into one of three types: replacing a couch or bed with a new delivery, clearing a home before a move, or downsizing to a smaller place. For a single piece, the minimum starts from the single-item price. For several rooms, a quarter, half or full truck is usually cheaper than pricing each piece.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What furniture do you remove?',
        answer:
          'Couches, sectionals, chairs, beds and frames, mattresses, dressers, wardrobes, desks, tables, bookcases, cabinets and outdoor furniture, in any condition.',
      },
      {
        question: 'Do I need to take furniture apart first?',
        answer:
          'No. If a piece needs to be taken apart to get through a door, the crew handles it. Let us know about very large or built-in pieces when you book.',
      },
      {
        question: 'Can you take broken or damaged furniture?',
        answer: 'Yes. Condition does not matter for removal. Usable pieces are set aside for donation and the rest is disposed of.',
      },
      {
        question: 'Can I send photos to get a price?',
        answer:
          'Yes. A few photos of the pieces are usually enough for a firm price, which we confirm again on site before loading.',
      },
    ],
  },

  'appliance-removal-ottawa': {
    sections: [
      {
        heading: 'Get your appliance ready',
        body: ['A few simple steps before the crew arrives make pickup cleaner and safer.'],
        bullets: [
          'Unplug a fridge or freezer a day ahead if you can, empty it, and let it defrost. A towel on the floor catches the water.',
          'Take out loose shelves, drawers and ice bins, or tape them in place so they do not shift.',
          'For washers, dryers and stoves, disconnect water, gas and power. If you are not sure how to do that safely, tell us and we will advise.',
          'Clear a path to the door and let us know about stairs, tight corners and parking.',
        ],
      },
      {
        heading: 'Fridges, freezers and air conditioners are handled differently',
        body: [
          'The City of Ottawa requires that appliances containing refrigerant, such as fridges, freezers and air conditioners, have the refrigerant removed by a certified technician before they can be recycled. That is one more reason these cannot simply be left at the curb.',
          'When we take an appliance, we take care of the disposal so you do not have to arrange it.',
        ],
      },
      {
        heading: 'Replacing several appliances at once',
        body: [
          'If a kitchen or laundry room upgrade means several old appliances are leaving on the same day, we can take them together in one visit. Several appliances fit in a fraction of a truck, which is usually cheaper than pricing each one on its own.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which appliances do you remove?',
        answer:
          'Fridges, freezers, stoves, ovens, dishwashers, washers, dryers, microwaves, air conditioners, dehumidifiers and water heaters.',
      },
      {
        question: 'Do I need to unplug a fridge before you come?',
        answer:
          'It helps. Unplug it a day ahead if you can, empty it and let it defrost so it does not leak. If you forget, tell the crew and we will deal with it.',
      },
      {
        question: 'Can you remove appliances from a business?',
        answer:
          'Yes. We remove appliances from homes, rental units, offices and small commercial spaces. Tell us the number and type when you book.',
      },
      {
        question: 'Can you take several appliances in one trip?',
        answer: 'Yes. A kitchen or laundry upgrade can be cleared in one visit. We price it by the space the appliances take in the truck.',
      },
    ],
  },
};
