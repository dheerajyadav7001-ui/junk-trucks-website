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

  const { submitBooking, isSubmitting, isSuccess, bookingReference } = useBooking();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: 'Downtown / Centretown',
    loadEstimate: '1/2 Truck Load',
    notes: '',
  });

  const [localSubmitted, setLocalSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please provide your name, phone number, and street address so we can send an accurate quote.');
      return;
    }

    const res = await submitBooking({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      neighborhood: formData.neighborhood,
      serviceType: config.serviceType,
      loadSize: formData.loadEstimate,
      notes: formData.notes,
    });

    if (res.success) {
      setLocalSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Minimal top bar — logo + phone only, no distracting nav on an ad landing page */}
      <div className="bg-[#012D19] text-white py-2.5 px-4 flex items-center justify-between max-w-7xl mx-auto sm:px-6 lg:px-8">
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
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300"
        >
          <Phone className="w-3.5 h-3.5" />
          {OTTAWA_PHONE}
        </a>
      </div>

      {/* HERO SECTION WITH EMBEDDED FORM ABOVE THE FOLD */}
      <section className="bg-gradient-to-b from-[#012D19] via-[#025337] to-[#012D19] text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Content — headline matches exact search intent */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300">
                <Clock className="w-3.5 h-3.5" />
                {config.badge}
              </div>

              {/* Exact keyword targeted headline */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {config.keyword}
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl">
                {config.subheadline}
              </p>

              <div className="p-4 bg-white/10 border border-white/20 rounded-2xl max-w-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-300 block uppercase font-medium">
                    Prefer to talk it through?
                  </span>
                  <span className="text-xs text-emerald-300">
                    Call for an instant quote
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200 max-w-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Lowest Price Guarantee</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Full Crew:</strong> We do all the lifting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Same-Week Availability</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Fully Insured & WSIB</strong></span>
                </div>
              </div>
            </div>

            {/* Right: prominent form above the fold */}
            <div className="lg:col-span-5">
              <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F2661C] relative">
                {localSubmitted || isSuccess ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Request Received!
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      We'll call you shortly at the number you provided to confirm your quote.
                    </p>
                    <div className="p-3 bg-stone-50 rounded-xl font-mono text-xs font-bold text-[#025337]">
                      Reference: {bookingReference || 'JT-PENDING'}
                    </div>
                    <a
                      href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#025337] text-white font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Now: {OTTAWA_PHONE}
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-stone-900 leading-tight">
                        {config.formHeading}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        No credit card required. Free firm quote.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="First and Last Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="(613) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                          Ottawa Street Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="e.g. 120 Bank St"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                          Area / Suburb *
                        </label>
                        <select
                          name="neighborhood"
                          value={formData.neighborhood}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C] bg-white"
                        >
                          {OTTAWA_AREAS.map((a) => (
                            <option key={a.name} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Estimated Job Size
                      </label>
                      <select
                        name="loadEstimate"
                        value={formData.loadEstimate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C] bg-white"
                      >
                        <option value="Single Item (Lowest Price Guaranteed)">Single Item</option>
                        <option value="1/4 Truck (Lowest Price Guaranteed)">1/4 Truck</option>
                        <option value="1/2 Truck (Lowest Price Guaranteed)">1/2 Truck</option>
                        <option value="3/4 Truck (Lowest Price Guaranteed)">3/4 Truck</option>
                        <option value="Full 16ft Box Truck (Lowest Price Guaranteed)">Full Box Truck</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        Quick Description (Optional)
                      </label>
                      <input
                        type="text"
                        name="notes"
                        placeholder="e.g. old couch, boxes, appliances..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2661C]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#F2661C] text-white font-bold text-sm hover:bg-[#DB540F] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <span>Get My Free Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-stone-500">
                      Real Ottawa crew. No hidden fees. No obligation.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENARIOS — matched to this specific keyword's intent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            {config.scenariosLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            How We Help
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.scenarios.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3 text-lg">
                {s.emoji}
              </div>
              <h3 className="font-bold text-sm text-stone-900 mb-1">
                {s.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOODS SERVED — local SEO coverage beyond just "Ottawa" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#F2661C]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              Serving {config.keyword.replace('Ottawa', '').trim()} Across the Ottawa Area
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {OTTAWA_AREAS.filter((a) => !a.name.includes('Gatineau')).map((a) => (
              <span
                key={a.name}
                className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
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
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={faq.question} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  >
                    <span className="text-sm font-bold text-stone-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
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
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            Lowest Price Guarantee
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">
            No surprise fees. Ever.
          </h3>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
            Junk Trucks gives you a firm quote up front — what we quote is what you pay.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F2661C] hover:bg-[#DB540F] text-white font-bold text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call For Instant Quote: {OTTAWA_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Minimal footer — just enough for trust, no navigation away from the offer */}
      <div className="text-center text-xs text-stone-400 pt-14">
        Junk Trucks · Ottawa, ON · {OTTAWA_PHONE}
      </div>
    </div>
  );
};
