import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE } from '../../data/junkData';
import { PRICES_PAGE } from '../../data/servicePages';
import { useDocumentHead } from '../../utils/seo';
import { breadcrumbSchema, faqSchema } from '../../utils/schema';
import { trackEvent } from '../../utils/analytics';
import { FaqList, NavigateFn, PriceTable, RelatedServices, ReviewsStrip } from './shared/blocks';

export const PricesPage: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const path = `/${PRICES_PAGE.slug}`;
  useDocumentHead(PRICES_PAGE.title, PRICES_PAGE.metaDescription, {
    jsonLd: [
      faqSchema(PRICES_PAGE.faqs),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: PRICES_PAGE.name, path },
      ]),
    ],
  });
  const { openQuote } = useBooking();
  const tel = `tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="bg-slate-50 pb-16">
      <section className="bg-gradient-to-br from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#FFB27A]">
            Prices you can see before you book
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">Junk Removal Prices in Ottawa</h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            A single item starts from $85. Bigger jobs are priced by the space they take in the truck. The crew, the loading and the disposal are included.
          </p>
        </div>
      </section>

      <div className="space-y-14 pt-12">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#173B5F] mb-4">Price by load size</h2>
          <PriceTable />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => openQuote('General Junk Removal')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] text-white font-bold text-base transition-colors"
            >
              Get an exact price <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={tel}
              onClick={() => trackEvent('call_click', { location: 'prices_page' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-base hover:bg-white transition-colors"
            >
              <Phone className="w-4 h-4" /> {OTTAWA_PHONE}
            </a>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#173B5F] mb-3">How we work out the price</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              We look at how much space your items will take on the truck. A quarter of a truck holds a few pieces of furniture and some boxes. A full truck holds the contents of a garage, a basement or most of a house. We do not weigh your junk.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#173B5F] mb-3">What can change the price</h2>
            <ul className="space-y-2 text-base text-slate-700 list-disc pl-5">
              <li>The amount of space your items take in the truck</li>
              <li>Very heavy materials such as concrete, dirt or shingles, which may be priced differently</li>
              <li>Jobs that need extra crew time, such as sorting a whole house</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#173B5F] mb-3">How to get an exact price</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Send a photo or describe the job through the quote form, or call us. We confirm the price before we load anything, so there is nothing to decide after the work is done.
            </p>
          </div>
        </section>

        <ReviewsStrip ids={['rev-1', 'rev-6', 'rev-5']} />
        <FaqList faqs={PRICES_PAGE.faqs} title="Pricing questions" />
        <RelatedServices
          slugs={['junk-removal-ottawa', 'furniture-removal-ottawa', 'mattress-removal-ottawa', 'appliance-removal-ottawa']}
          onNavigate={onNavigate}
          hidePrices
        />
      </div>
    </div>
  );
};
