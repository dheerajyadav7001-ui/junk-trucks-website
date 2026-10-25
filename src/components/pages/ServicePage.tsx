import React from 'react';
import { Phone, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE } from '../../data/junkData';
import { ServicePageConfig } from '../../data/servicePages';
import { useDocumentHead } from '../../utils/seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../../utils/schema';
import { trackEvent } from '../../utils/analytics';
import { CityPickupChecker } from '../CityPickupChecker';
import {
  AreasServed, FaqList, NavigateFn, PriceTable, RelatedServices, ReviewsStrip, ServiceLink, TakeList,
} from './shared/blocks';

interface Props {
  config: ServicePageConfig;
  onNavigate: NavigateFn;
}

export const ServicePage: React.FC<Props> = ({ config, onNavigate }) => {
  const path = `/${config.slug}`;
  useDocumentHead(config.title, config.metaDescription, {
    jsonLd: [
      serviceSchema(config.name, path, config.metaDescription),
      faqSchema(config.faqs),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: config.name, path },
      ]),
    ],
  });

  const { openQuote } = useBooking();
  const tel = `tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="bg-slate-50 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white">
        <div className="absolute inset-0 opacity-20">
          <img src={config.image} alt="" className="w-full h-full object-cover" aria-hidden loading="eager" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-300 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-1.5">/</span>
            <a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white">Services</a>
            <span className="mx-1.5">/</span>
            <span className="text-white">{config.name}</span>
          </nav>
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#FFB27A]">
              {config.badge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">{config.h1}</h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">{config.heroSub}</p>
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold">5.0 on Google</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => openQuote(config.serviceType)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-bold text-base shadow-lg transition-colors"
              >
                Get Your Free Quote <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={tel}
                onClick={() => trackEvent('call_click', { location: `service_hero_${config.slug}` })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base transition-colors"
              >
                <Phone className="w-4 h-4" /> {OTTAWA_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-14 pt-12">
        {/* INTRO + PRICE */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {config.intro.map((p) => (
                <p key={p} className="text-base text-slate-700 leading-relaxed">{p}</p>
              ))}
              <ul className="space-y-2 pt-2">
                {['Upfront price, confirmed before we load', 'The crew carries everything, you lift nothing', 'Usable items set aside for donation'].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#173B5F] mb-3">Junk removal prices in Ottawa</h2>
              <PriceTable compact />
              <ServiceLink slug="junk-removal-ottawa-prices" onNavigate={onNavigate} className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-[#173B5F] hover:text-[#FA7415]">
                See the full price guide <ArrowRight className="w-3.5 h-3.5" />
              </ServiceLink>
            </div>
          </div>
        </section>

        {/* CITY CHECKER (garbage page only) */}
        {config.showChecker && <CityPickupChecker />}

        {/* UNIQUE CONTENT SECTIONS */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {config.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#173B5F] mb-3">{s.heading}</h2>
              <div className="space-y-3">
                {s.body.map((p) => (
                  <p key={p} className="text-base text-slate-700 leading-relaxed">{p}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#173B5F] mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <TakeList take={config.take} dontTake={config.dontTake} />

        {/* HOW IT WORKS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173B5F] text-center mb-6">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['1', 'Tell us what you have', 'Send a quote request with a photo, or call. We give you a price.'],
              ['2', 'Pick a time', 'We book the earliest slot that suits you and call before we arrive.'],
              ['3', 'We load and haul', 'You point, we carry. We sweep up and take it away.'],
            ].map(([n, h, d]) => (
              <li key={n} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="w-8 h-8 rounded-full bg-[#173B5F] text-white font-black text-sm flex items-center justify-center mb-3">{n}</div>
                <h3 className="font-bold text-slate-900 mb-1">{h}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <ReviewsStrip ids={config.reviewIds} />
        <AreasServed />
        <FaqList faqs={config.faqs} />
        <RelatedServices slugs={config.related} onNavigate={onNavigate} />

        {/* CTA BAND */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#173B5F] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black">Ready for a price?</h2>
            <p className="text-slate-200 text-sm max-w-md mx-auto">Tell us what you have. We confirm the price before we load anything.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              <button
                type="button"
                onClick={() => openQuote(config.serviceType)}
                className="px-7 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] font-bold text-base transition-colors"
              >
                Get Your Free Quote
              </button>
              <a
                href={tel}
                onClick={() => trackEvent('call_click', { location: `service_cta_${config.slug}` })}
                className="px-7 py-3.5 rounded-xl border border-white/40 hover:bg-white/10 font-bold text-base transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> {OTTAWA_PHONE}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
