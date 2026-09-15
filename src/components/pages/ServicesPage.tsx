import React, { useState } from 'react';
import { 
  Truck, CheckCircle2, XCircle, ShieldCheck, Leaf, 
  ArrowRight, Phone, Clock, DollarSign, HelpCircle, AlertTriangle 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES_LIST, PRICING_TIERS, OTTAWA_PHONE } from '../../data/junkData';
import { PageId } from '../../types';
import { useDocumentHead } from '../../utils/seo';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useDocumentHead(
    'Junk Removal Services Ottawa | Pricing & Full Service List | Junk Trucks',
    'Full list of Ottawa junk removal services: garage, basement & estate cleanouts, furniture removal, renovation debris hauling. Transparent pricing, lowest price guarantee.'
  );

  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'renovation'>('all');

  const itemsWeTake = [
    'Sofas, Sectionals, Couches & Recliners',
    'Mattresses, Box Springs & Bed Frames',
    'Refrigerators, Freezers & Stoves',
    'Washers, Dryers & Dishwashers',
    'Computers, TVs, Monitors & E-Waste',
    'Drywall, Timber, Ceramic Tile & Flooring',
    'Fallen Tree Branches, Brush & Shrubbery',
    'Old Sheds, Fences & Wooden Decks',
    'Exercise Equipment, Treadmills & Weights',
    'Carpets, Rugs & Underpad',
    'Office Desks, Chairs & Cubicle Panels',
    'Bicycles, BBQs & Patio Furniture',
  ];

  const itemsWeCannotTake = [
    { item: 'Asbestos or Vermiculite', note: 'Requires licensed hazardous abatement contractor' },
    { item: 'Wet Paints, Solvents & Motor Oil', note: 'Drop off at City of Ottawa Trail Rd Hazardous Depot' },
    { item: 'Propane Tanks with Compressed Fuel', note: 'Must be exchanged or purged at licensed propane supplier' },
    { item: 'Biohazardous or Medical Waste', note: 'Requires specialized biomedical disposal services' },
    { item: 'Industrial Chemical Drums', note: 'Subject to Ontario Ministry of Environment regulations' },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="Junk Trucks Emblem"
            className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-[#025337]/20"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
          Complete Ottawa Junk Removal Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mt-2">
          Full-Service Hauling. <br />
          <span className="text-[#025337]">You point, we pack and sweep.</span>
        </h1>
        <p className="text-base text-stone-600 mt-4 leading-relaxed">
          From single items to multi-truck commercial cleanouts, our two-person insured Ottawa crews do all the heavy lifting, loading, sorting, and donation drop-offs.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openBooking()}
            className="px-6 py-3 rounded-xl bg-[#F2661C] text-white font-bold text-sm hover:bg-[#DB540F] transition-all shadow-md flex items-center gap-2"
          >
            Book Any Service Online
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
            className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#025337]" />
            Speak to a Dispatcher: {OTTAWA_PHONE}
          </a>
        </div>
      </section>

      {/* DETAILED SERVICES GRID - PHOTO TILE FORMAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={srv.image || '/truck-hero.jpg'}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-[#012D19]/90 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md">
                    {srv.category === 'residential' ? 'Residential' : srv.category === 'commercial' ? 'Commercial' : 'Renovation'}
                  </div>

                  {srv.popular && (
                    <div className="absolute top-3 right-3 bg-[#F2661C] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs">
                      ★ Ottawa Favorite
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3">
                    <span className="font-mono text-[11px] font-bold text-orange-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      Lowest Price Guaranteed
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#025337] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {srv.itemsIncluded.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => openBooking(srv.title)}
                  className="flex-1 py-2.5 rounded-xl bg-[#025337] hover:bg-[#012D19] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Book Pickup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE TAKE VS WHAT WE CANNOT TAKE */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
              Disposal Guidelines
            </span>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mt-1">
              What We Take & What We Cannot Take
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              We haul practically everything non-hazardous. Here is our official Ottawa sorting guide:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* What We Take (Green) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    Yes, We Gladly Take These:
                  </h3>
                  <span className="text-xs text-stone-500">
                    Loaded, hauled, and sorted for eco-donation
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {itemsWeTake.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50/50 text-xs text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Cannot Take (Red / Advisory) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    Items We Cannot Legally Take:
                  </h3>
                  <span className="text-xs text-stone-500">
                    City of Ottawa hazardous regulations
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {itemsWeCannotTake.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-100 text-xs">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                      <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{item.item}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 pl-5.5">
                      💡 {item.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-stone-50 rounded-xl text-xs text-stone-600">
                Need help disposing of hazardous items? Visit the City of Ottawa’s Household Hazardous Waste (HHW) depot events or call 3-1-1.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECO-DIVERSION EXPLAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#025337] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
              Environmental Stewardship
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Where does your junk really go?
            </h2>
            <p className="text-sm text-stone-200 leading-relaxed">
              Unlike cut-rate operators who dump everything directly into local Ottawa landfills, we take the extra time to sort every truckload.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <span className="font-mono text-3xl font-black text-[#F2661C] block mb-1">
                  1st Stop
                </span>
                <span className="font-bold text-sm block mb-1">Local Ottawa Charities</span>
                <p className="text-xs text-stone-300">
                  Usable furniture, beds, appliances, and clothes delivered to Habitat ReStore and Ottawa shelters.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <span className="font-mono text-3xl font-black text-emerald-400 block mb-1">
                  2nd Stop
                </span>
                <span className="font-bold text-sm block mb-1">Scrap Metal & E-Waste</span>
                <p className="text-xs text-stone-300">
                  Copper, steel, motors, and circuit boards recycled at certified Ontario metal processors.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <span className="font-mono text-3xl font-black text-stone-300 block mb-1">
                  Last Stop
                </span>
                <span className="font-bold text-sm block mb-1">Responsible Transfer</span>
                <p className="text-xs text-stone-300">
                  Only the remaining un-salvageable fraction is transported to licensed commercial transfer stations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
