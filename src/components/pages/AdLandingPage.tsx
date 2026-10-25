import React from 'react';
import { Phone, ArrowRight, Star, CheckCircle2, Camera } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE } from '../../data/junkData';
import { AD_LANDING } from '../../data/adLanding';
import { useDocumentHead } from '../../utils/seo';
import { faqSchema } from '../../utils/schema';
import { trackEvent } from '../../utils/analytics';
import { AreasServed, FaqList, PriceTable, ReviewsStrip, TakeList } from './shared/blocks';

// Paid-search landing page: no site menu, one job (get a price or call),
// shown only to people who click an ad. Marked noindex so it never
// competes with the organic service pages.
export const AdLandingPage: React.FC = () => {
  useDocumentHead(AD_LANDING.title, AD_LANDING.metaDescription, {
    robots: 'noindex, follow',
    jsonLd: [faqSchema(AD_LANDING.faqs)],
  });
  const { openQuote } = useBooking();
  const tel = `tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`;
  const callClick = (where: string) => trackEvent('call_click', { location: `adlp_${where}` });

  return (
    <div className="bg-slate-50 pb-28 md:pb-16">
      {/* Header: logo + phone only, no menu */}
      <header className="bg-[#0F2742] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Junk Trucks" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-black text-sm tracking-tight">JUNK TRUCKS</span>
            <span className="hidden sm:inline text-xs text-slate-300">· Ottawa</span>
          </div>
          <a
            href={tel}
            onClick={() => callClick('header')}
            className="flex items-center gap-1.5 text-sm font-mono font-bold text-sky-200"
          >
            <Phone className="w-4 h-4" />
            {OTTAWA_PHONE}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-sm text-slate-200">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="font-semibold">5.0 on Google</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">{AD_LANDING.h1}</h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mx-auto">{AD_LANDING.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <button
              type="button"
              onClick={() => { trackEvent('adlp_quote_click', { location: 'hero' }); openQuote('General Junk Removal'); }}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-bold text-lg shadow-lg transition-colors"
            >
              Get My Price <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={tel}
              onClick={() => callClick('hero')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg transition-colors"
            >
              <Phone className="w-5 h-5" /> Call {OTTAWA_PHONE}
            </a>
          </div>
          <p className="text-xs text-slate-300 inline-flex items-center gap-1.5 justify-center">
            <Camera className="w-3.5 h-3.5" /> Add a photo and we can price it faster. No payment to get a price.
          </p>
        </div>
      </section>

      <div className="space-y-12 pt-10">
        {/* Price */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[#173B5F] text-center mb-4">What it costs</h2>
          <PriceTable compact />
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => { trackEvent('adlp_quote_click', { location: 'price' }); openQuote('General Junk Removal'); }}
              className="px-6 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-bold text-base transition-colors"
            >
              Get My Exact Price
            </button>
          </div>
        </section>

        {/* Why */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {AD_LANDING.points.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <TakeList take={AD_LANDING.take} dontTake={AD_LANDING.dontTake} />
        <ReviewsStrip ids={['rev-1', 'rev-6', 'rev-5']} />

        {/* Steps */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[#173B5F] text-center mb-6">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AD_LANDING.steps.map((s, i) => (
              <li key={s.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="w-8 h-8 rounded-full bg-[#173B5F] text-white font-black text-sm flex items-center justify-center mb-3">{i + 1}</div>
                <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <AreasServed />
        <FaqList faqs={AD_LANDING.faqs} />

        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#173B5F] text-white rounded-3xl p-8 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black">Get your price today</h2>
            <p className="text-sm text-slate-200">Junk removal in Ottawa from $85.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => { trackEvent('adlp_quote_click', { location: 'footer' }); openQuote('General Junk Removal'); }}
                className="px-7 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] font-bold text-base"
              >
                Get My Price
              </button>
              <a
                href={tel}
                onClick={() => callClick('footer')}
                className="px-7 py-3.5 rounded-xl border border-white/40 hover:bg-white/10 font-bold text-base inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> {OTTAWA_PHONE}
              </a>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">Junk Trucks · Ottawa, ON · {OTTAWA_PHONE}</p>
      </div>

      {/* Sticky mobile bar */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-3 pt-2.5 flex gap-2.5"
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
      >
        <a
          href={tel}
          onClick={() => callClick('mobile_bar')}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#173B5F] text-white text-base font-bold"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button
          type="button"
          onClick={() => { trackEvent('adlp_quote_click', { location: 'mobile_bar' }); openQuote('General Junk Removal'); }}
          className="flex-1 py-3.5 rounded-lg bg-[#FA7415] text-white text-base font-bold"
        >
          Get My Price
        </button>
      </div>
    </div>
  );
};
