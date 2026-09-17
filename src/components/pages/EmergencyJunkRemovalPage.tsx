import React from 'react';
import {
  Flame, Phone, Clock, ShieldCheck, CheckCircle2,
  AlertTriangle, Truck, ArrowRight, Star, Leaf, MapPin
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE } from '../../data/junkData';
import { useDocumentHead } from '../../utils/seo';

export const EmergencyJunkRemovalPage: React.FC = () => {
  useDocumentHead(
    'Emergency Junk Removal Ottawa | Same-Day & Urgent Hauling | Junk Trucks',
    'Need junk gone today? Same-day emergency junk removal across Ottawa. Fast dispatch, upfront pricing, no hidden fees. Call now for urgent pickup.'
  );

  const { openBooking } = useBooking();

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* EMERGENCY URGENT BANNER */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 animate-pulse text-amber-300" />
        <span>OTTAWA PRIORITY RESPONSE: TRUCKS ACTIVE & AVAILABLE FOR SAME-DAY DISPATCH</span>
      </div>

      {/* HERO SECTION WITH EMBEDDED FORM ABOVE THE FOLD */}
      <section className="bg-gradient-to-b from-[#012D19] via-[#025337] to-[#012D19] text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content - Headline matches exact search intent */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Junk Trucks Logo"
                  className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-emerald-400/40 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-xs font-mono font-bold text-red-300">
                  <Clock className="w-3.5 h-3.5" />
                  2-Hour Emergency Response • Ottawa & Valley
                </div>
              </div>

              {/* Exact keyword targeted headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Emergency Junk Removal Ottawa
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl">
                Need junk hauled away <strong className="text-white underline decoration-[#F2661C] decoration-2">TODAY</strong>? Facing a landlord inspection, moving deadline, or basement flood? Our heavy-duty trucks dispatch immediately across all Ottawa neighborhoods.
              </p>

              {/* Immediate Call Button */}
              <div className="p-4 bg-white/10 border border-white/20 rounded-2xl max-w-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-300 block uppercase font-medium">
                    Need instant phone dispatch?
                  </span>
                  <span className="text-xs text-emerald-300">
                    Dispatcher on duty right now
                  </span>
                </div>
                <a
                  href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F2661C] hover:bg-[#DB540F] text-white font-mono font-black text-base transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {OTTAWA_PHONE}
                </a>
              </div>

              {/* Emergency Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200 max-w-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Zero Price Gouging:</strong> Standard rates apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Full Two-Man Crew:</strong> We load everything</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Same-Day Trail Rd Haul:</strong> Completely cleared</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>100% Insured & WSIB:</strong> Zero property risk</span>
                </div>
              </div>
            </div>

            {/* Right: PROMINENT FORM ABOVE THE FOLD */}
            <div className="lg:col-span-5">
              <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F2661C] relative">
                <div className="absolute -top-3.5 left-6 bg-[#F2661C] text-white text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Priority Dispatch Form
                </div>

                <div className="py-6 text-center space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 leading-tight">
                    Request Urgent Same-Day Truck
                  </h3>
                  <p className="text-xs text-stone-500 -mt-2">
                    No credit card required. Free on-site firm quote. Just your name, phone, email, and postal code — we call you back in minutes.
                  </p>
                  <button
                    id="emergency-open-booking-btn"
                    type="button"
                    onClick={() => openBooking('🚨 Emergency Junk Removal Ottawa (Priority Dispatch)')}
                    className="w-full py-3.5 rounded-xl bg-[#F2661C] text-white font-bold text-sm hover:bg-[#DB540F] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4" />
                    Dispatch My Emergency Crew Now
                  </button>
                  <p className="text-[10px] text-center text-stone-500">
                    ⚡ Direct radio dispatch to active Ottawa trucks. Zero cancellation fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON EMERGENCY SCENARIOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            When To Call Emergency Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Common Same-Day Scenarios We Solve
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold mb-3">
              🏠
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1">
              Real Estate Closing Deadlines
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Buyers or lawyers inspecting the property today? We clear remaining furniture and debris immediately to keep your closing on track.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
              💧
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1">
              Basement Flood & Water Damage
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sump pump failure or sewer backup? We haul wet carpets, soaked drywall, boxes, and damaged furniture before toxic mold sets in.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              📦
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1">
              Tenant Eviction & Abandoned Goods
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Landlords needing rapid unit turnover. We bag, haul, and sweep the apartment clean so you can paint and re-rent without downtime.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              🚛
            </div>
            <h3 className="font-bold text-sm text-stone-900 mb-1">
              Furniture Delivery Conflict
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your brand-new sofa is on the delivery truck right now and your old sectional is blocking the living room? We clear it in 60 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* EMERGENCY PRICING GUARANTEE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            No Emergency Surcharges
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            We don’t exploit emergencies.
          </h3>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Other companies double their rates for same-day dispatches. Junk Trucks provides our Lowest Price Guarantee regardless of urgency with zero surprise fees.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F2661C] hover:bg-[#DB540F] text-white font-bold text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call For Instant Dispatch: {OTTAWA_PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
