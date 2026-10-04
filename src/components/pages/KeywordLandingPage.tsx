import React, { useState } from 'react';
import { Phone, Clock, CheckCircle2, ShieldCheck, ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE, OTTAWA_AREAS } from '../../data/junkData';
import { LandingPageConfig } from '../../types';
import { useDocumentHead } from '../../utils/seo';

interface KeywordLandingPageProps {
  config: LandingPageConfig;
}

// Generic template for keyword-matched Google Ads landing pages.
// One ad group -> one exact-match keyword -> one page whose <h1> repeats
// that same keyword, per the single-keyword-ad-group strategy: the search
// term, the ad, and this page should all read as the same thing.
export const KeywordLandingPage: React.FC<KeywordLandingPageProps> = ({ config }) => {
  useDocumentHead(config.title, config.metaDescription);

  const { openBooking } = useBooking();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Minimal top bar — logo + phone only, no distracting nav on an ad landing page */}
      <div className="bg-[#0F2742] text-white py-2.5 px-4 flex items-center justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Junk Trucks"
            className="w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="font-black text-sm tracking-tight">JUNK TRUCKS</span>
        </div>
        <a
          href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-200"
        >
          <Phone className="w-3.5 h-3.5" />
          {OTTAWA_PHONE}
        </a>
      </div>

      {/* HERO SECTION WITH EMBEDDED FORM ABOVE THE FOLD */}
      <section className="bg-gradient-to-b from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Content — headline matches exact search intent */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-300/40 text-xs font-mono font-bold text-sky-200">
                <Clock className="w-3.5 h-3.5" />
                {config.badge}
              </div>

              {/* Exact keyword targeted headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {config.keyword}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                {config.subheadline}
              </p>

              <div className="p-4 bg-white/10 border border-white/20 rounded-2xl max-w-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-300 block uppercase font-medium">
                    Prefer to talk it through?
                  </span>
                  <span className="text-xs text-sky-200">
                    Call for an instant quote
                  </span>
                </div>
                <a
                  href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-mono font-black text-base transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {OTTAWA_PHONE}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200 max-w-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span><strong>Lowest Price Guarantee</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span><strong>Full Crew:</strong> We do all the lifting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span><strong>Same-Week Availability</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span><strong>Fully Insured & WSIB</strong></span>
                </div>
              </div>
            </div>

            {/* Right: prominent form above the fold */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#FA7415] relative">
                <div className="py-6 text-center space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {config.formHeading}
                  </h3>
                  <p className="text-xs text-slate-500 -mt-2">
                    Just your name, phone, email, and postal code — we'll call you back with a firm quote.
                  </p>
                  <button
                    id="landing-open-booking-btn"
                    type="button"
                    onClick={() => openBooking(config.serviceType)}
                    className="w-full py-3.5 rounded-xl bg-[#FA7415] text-white font-bold text-sm hover:bg-[#E0650A] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Get My Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> Or Call Now: {OTTAWA_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENARIOS — matched to this specific keyword's intent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-[#FA7415] uppercase tracking-wider">
            {config.scenariosLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            How We Help
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.scenarios.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#173B5F] flex items-center justify-center font-bold mb-3 text-lg">
                {s.emoji}
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOODS SERVED — local SEO coverage beyond just "Ottawa" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#FA7415]" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Serving {config.keyword.replace('Ottawa', '').trim()} Across the Ottawa Area
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {OTTAWA_AREAS.filter((a) => !a.name.includes('Gatineau')).map((a) => (
              <span
                key={a.name}
                className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
              >
                {a.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — page-specific questions, matched to this exact keyword's intent */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={faq.question} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PRICING GUARANTEE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            Lowest Price Guarantee
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            No surprise fees. Ever.
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Junk Trucks gives you a firm quote up front — what we quote is what you pay.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-bold text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call For Instant Quote: {OTTAWA_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Minimal footer — just enough for trust, no navigation away from the offer */}
      <div className="text-center text-xs text-slate-400 pt-14">
        Junk Trucks · Ottawa, ON · {OTTAWA_PHONE}
      </div>
    </div>
  );
};
