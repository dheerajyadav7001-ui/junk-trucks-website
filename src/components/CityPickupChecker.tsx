import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sofa, BedDouble, Refrigerator, WashingMachine, Tv, Hammer, CircleDot, PaintBucket, Warehouse,
  CheckCircle2, XCircle, AlertTriangle, ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { trackEvent } from '../utils/analytics';

type Tone = 'amber' | 'red' | 'green';

interface Answer { tone: Tone; pill: string; text: string }
interface Item {
  id: string;
  label: string;
  icon: React.ElementType;
  city: Answer;
  us: Answer;
}

const ITEMS: Item[] = [
  { id: 'couch', label: 'Couch / Chair', icon: Sofa,
    city: { tone: 'amber', pill: 'Yes, uses 1 of your 3 items', text: 'Set it out loose at the curb with no bags attached.' },
    us: { tone: 'green', pill: "We'll take it", text: "We carry it out from any room, so nothing counts against your 3." } },
  { id: 'mattress', label: 'Mattress', icon: BedDouble,
    city: { tone: 'amber', pill: 'Yes, uses 1 of your 3 items', text: 'Mattresses and box springs each count as one item.' },
    us: { tone: 'green', pill: "We'll take it", text: 'We haul it straight from the bedroom, box spring included.' } },
  { id: 'fridge', label: 'Fridge / Freezer', icon: Refrigerator,
    city: { tone: 'red', pill: 'No, not collected at the curb', text: 'The City does not pick up appliances of any kind.' },
    us: { tone: 'green', pill: "We'll take it", text: 'We remove and recycle it, so you never have to arrange a drop-off.' } },
  { id: 'appliance', label: 'Stove / Washer', icon: WashingMachine,
    city: { tone: 'red', pill: 'No, not collected at the curb', text: 'The City does not pick up appliances of any kind.' },
    us: { tone: 'green', pill: "We'll take it", text: 'We haul it out and recycle the metal.' } },
  { id: 'tv', label: 'Old TV / Computer', icon: Tv,
    city: { tone: 'red', pill: "No, it's e-waste", text: "Electronics can't go in the garbage." },
    us: { tone: 'green', pill: "We'll take it", text: 'We take old TVs, monitors and computers along with the rest of your load.' } },
  { id: 'reno', label: 'Drywall / Wood', icon: Hammer,
    city: { tone: 'red', pill: 'No, not collected at the curb', text: 'Renovation debris needs a drop-off site or a private bin.' },
    us: { tone: 'green', pill: "We'll take it", text: 'We load it ourselves and haul it away. You skip the dump run.' } },
  { id: 'tires', label: 'Tires', icon: CircleDot,
    city: { tone: 'red', pill: 'No, not regular garbage', text: "Tires aren't part of curbside garbage collection." },
    us: { tone: 'green', pill: "We'll take it", text: 'Old tires go on the truck with everything else.' } },
  { id: 'paint', label: 'Paint / Chemicals', icon: PaintBucket,
    city: { tone: 'red', pill: 'No, hazardous waste', text: 'Wet paint, chemicals and batteries need a special City drop-off.' },
    us: { tone: 'red', pill: "We can't take it", text: "For safety rules we can't haul wet paint, chemicals, motor oil, propane tanks or car batteries." } },
  { id: 'garage', label: 'A Full Garage', icon: Warehouse,
    city: { tone: 'amber', pill: 'Only 3 items every 2 weeks', text: 'A garage, basement or estate is far past the curbside limit.' },
    us: { tone: 'green', pill: "We'll take it all", text: 'One visit, one call. We sort, load and clear the whole space.' } },
];

const PILL: Record<Tone, string> = {
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-rose-100 text-rose-700',
  green: 'bg-emerald-100 text-emerald-700',
};
const PILL_ICON: Record<Tone, React.ElementType> = { amber: AlertTriangle, red: XCircle, green: CheckCircle2 };

const Row: React.FC<{ who: string; answer: Answer; strong?: boolean }> = ({ who, answer, strong }) => {
  const Icon = PILL_ICON[answer.tone];
  return (
    <div className={`px-4 sm:px-5 py-4 ${strong ? 'bg-slate-50/70' : ''}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{who}</p>
      <span className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${PILL[answer.tone]}`}>
        <Icon className="w-4 h-4" />
        {answer.pill}
      </span>
      <p className="mt-2 text-sm sm:text-[15px] text-slate-700 leading-relaxed">{answer.text}</p>
    </div>
  );
};

export const CityPickupChecker: React.FC = () => {
  const { openQuote } = useBooking();
  const [selectedId, setSelectedId] = useState('fridge');
  const item = ITEMS.find((i) => i.id === selectedId)!;
  const canTake = item.us.tone === 'green';

  const choose = (id: string) => {
    setSelectedId(id);
    trackEvent('city_checker_select', { item: id });
  };

  return (
    <section id="city-pickup" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="overflow-hidden rounded-[28px] bg-white border border-slate-200/80 shadow-[0_18px_50px_-24px_rgba(23,59,95,0.45)]">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#173B5F] to-[#0F2742] px-5 sm:px-8 pt-7 pb-8 text-center overflow-hidden">
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#FA7415]/20 blur-3xl" aria-hidden />
          <div className="relative">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB27A]">Ottawa curbside rules</span>
            <h2 className="mt-2 text-[1.7rem] sm:text-4xl font-extrabold text-white tracking-tight">Will the City pick it up?</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-md mx-auto">
              The City collects just <span className="font-bold text-white">3 garbage items</span> every two weeks. Tap what you have and see.
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-7 pt-5 pb-6">
          {/* Item picker */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {ITEMS.map((it) => {
              const Icon = it.icon;
              const active = it.id === selectedId;
              return (
                <button
                  key={it.id}
                  onClick={() => choose(it.id)}
                  aria-pressed={active}
                  className={`group flex flex-col items-center gap-2 rounded-2xl border px-1.5 py-3 sm:py-4 text-center transition-all ${
                    active
                      ? 'border-[#FA7415] bg-[#FFF6EE] shadow-[0_6px_18px_-10px_rgba(250,116,21,0.7)]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:-translate-y-0.5'
                  }`}
                >
                  <span className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-colors ${
                    active ? 'bg-[#FA7415] text-white' : 'bg-slate-100 text-[#173B5F] group-hover:bg-slate-200'
                  }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <span className={`text-[11px] sm:text-sm font-bold leading-tight ${active ? 'text-[#173B5F]' : 'text-slate-700'}`}>
                    {it.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Verdict */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-5 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            aria-live="polite"
          >
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 bg-[#173B5F]">
              <item.icon className="w-5 h-5 text-[#FFB27A] shrink-0" />
              <p className="font-extrabold text-white">{item.label}</p>
            </div>
            <div className="divide-y divide-slate-100">
              <Row who="City of Ottawa curbside" answer={item.city} />
              <Row who="Junk Trucks" answer={item.us} strong />
            </div>
            {canTake && (
              <div className="px-4 sm:px-5 pb-5 pt-1 bg-slate-50/70">
                <button
                  onClick={() => { trackEvent('city_checker_quote', { item: item.id }); openQuote(); }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FA7415] text-white font-bold text-base hover:bg-[#E0650A] transition-colors shadow-[0_8px_20px_-10px_rgba(250,116,21,0.9)]"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          <p className="mt-4 text-center text-xs text-slate-500 leading-relaxed">
            Based on the City of Ottawa's published curbside rules. Rules can change, so check{' '}
            <a href="https://ottawa.ca/en/garbage-and-recycling" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#173B5F]">ottawa.ca</a>{' '}
            for the latest.
          </p>
        </div>
      </div>
    </section>
  );
};
