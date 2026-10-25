import React, { useState } from 'react';
import { ChevronDown, MapPin, Star, ArrowRight, Check, X } from 'lucide-react';
import { LOAD_PRICES, PRICE_NOTE } from '../../../config/pricing';
import { OTTAWA_AREAS, TESTIMONIALS } from '../../../data/junkData';
import { FaqItem, PageId } from '../../../types';
import { SERVICE_PAGES } from '../../../data/servicePages';

export type NavigateFn = (page: PageId, slug?: string) => void;

/** Real <a href> that does client-side navigation for service pages. */
export const ServiceLink: React.FC<{
  slug: string;
  onNavigate: NavigateFn;
  className?: string;
  children: React.ReactNode;
}> = ({ slug, onNavigate, className, children }) => {
  const isPrices = slug === 'junk-removal-ottawa-prices';
  return (
    <a
      href={`/${slug}`}
      onClick={(e) => {
        e.preventDefault();
        if (isPrices) onNavigate('prices');
        else onNavigate('service', slug);
      }}
      className={className}
    >
      {children}
    </a>
  );
};

export const PriceTable: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <table className="w-full text-left">
      <thead className="bg-slate-50 text-[11px] font-mono uppercase tracking-wide text-slate-500">
        <tr>
          <th className="px-4 py-2.5 font-semibold">Load size</th>
          {!compact && <th className="hidden sm:table-cell px-4 py-2.5 font-semibold">Typical job</th>}
          <th className="px-4 py-2.5 text-right font-semibold">Price</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {LOAD_PRICES.map((p) => (
          <tr key={p.id}>
            <td className="px-4 py-3">
              <div className="text-sm font-bold text-slate-900">{p.label}</div>
              <div className="text-[11px] text-slate-500">{p.cubicYards}</div>
            </td>
            {!compact && <td className="hidden sm:table-cell px-4 py-3 text-sm text-slate-600">{p.example}</td>}
            <td className="px-4 py-3 text-right">
              <span className="text-[11px] text-slate-500 mr-1">from</span>
              <span className="text-lg font-black text-[#173B5F]">${p.from}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="px-4 py-3 text-[11px] text-slate-500 bg-slate-50 border-t border-slate-100">{PRICE_NOTE}</p>
  </div>
);

export const FaqList: React.FC<{ faqs: FaqItem[]; title?: string }> = ({ faqs, title = 'Frequently Asked Questions' }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173B5F] text-center mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.question} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900">{f.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{f.answer}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const ReviewsStrip: React.FC<{ ids: string[] }> = ({ ids }) => {
  const items = ids.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter(Boolean) as typeof TESTIMONIALS;
  if (items.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#173B5F]">5.0 on Google</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <figure key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex mb-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-sm text-slate-700 leading-relaxed">“{t.comment}”</blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-slate-500">
              {t.name} · {t.area} · Google review
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export const AreasServed: React.FC<{ heading?: string }> = ({ heading = 'Areas we serve in Ottawa' }) => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-[#FA7415]" />
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{heading}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {OTTAWA_AREAS.filter((a) => !a.name.includes('Gatineau')).map((a) => (
          <span key={a.name} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            {a.name}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Gatineau and Hull are available on request.</p>
    </div>
  </section>
);

export const TakeList: React.FC<{ take: string[]; dontTake: string[] }> = ({ take, dontTake }) => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-[#173B5F] mb-4">What we take</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {take.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-[#173B5F] mb-4">What we cannot take</h2>
        <ul className="space-y-2.5">
          {dontTake.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
              <X className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const RelatedServices: React.FC<{ slugs: string[]; onNavigate: NavigateFn; hidePrices?: boolean }> = ({ slugs, onNavigate, hidePrices }) => {
  const items = slugs.map((s) => SERVICE_PAGES.find((p) => p.slug === s)).filter(Boolean) as typeof SERVICE_PAGES;
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-bold text-[#173B5F] mb-4">Related services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((p) => (
          <ServiceLink
            key={p.slug}
            slug={p.slug}
            onNavigate={onNavigate}
            className="group flex items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-5 py-4 hover:border-[#173B5F] transition-colors"
          >
            <span>
              <span className="block text-sm font-bold text-slate-900">{p.name} in Ottawa</span>
              <span className="block text-xs text-slate-500">From $85 · Upfront price</span>
            </span>
            <ArrowRight className="w-4 h-4 text-[#FA7415] group-hover:translate-x-0.5 transition-transform" />
          </ServiceLink>
        ))}
        {!hidePrices && (
        <ServiceLink
          slug="junk-removal-ottawa-prices"
          onNavigate={onNavigate}
          className="group flex items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-5 py-4 hover:border-[#173B5F] transition-colors"
        >
          <span>
            <span className="block text-sm font-bold text-slate-900">Junk removal prices</span>
            <span className="block text-xs text-slate-500">All load sizes</span>
          </span>
          <ArrowRight className="w-4 h-4 text-[#FA7415] group-hover:translate-x-0.5 transition-transform" />
        </ServiceLink>
        )}
      </div>
    </section>
  );
};
