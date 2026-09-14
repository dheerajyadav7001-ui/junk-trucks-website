import React, { useState, useEffect } from 'react';
import { 
  Truck, CheckCircle2, ArrowRight, Phone, Star, 
  Armchair, Refrigerator, Home, Hammer, TreePine, Building2,
  Flame, Clock, Sparkles, ChevronDown, Check, X, Snowflake
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { 
  SERVICES_LIST, TESTIMONIALS, 
  OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK,
  FAQS, DONATION_ACCEPTED, DONATION_NOT_ACCEPTED
} from '../../data/junkData';
import { PageId } from '../../types';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { useDocumentHead } from '../../utils/seo';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useDocumentHead(
    "Junk Trucks — Ottawa's #1 Eco-Friendly Junk Hauling & Property Cleanouts",
    "Ottawa's #1 eco-friendly junk removal service. Garage, basement, estate & renovation cleanouts, furniture removal. Same-day hauling, lowest price guarantee."
  );

  const { openBooking } = useBooking();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [customRequest, setCustomRequest] = useState('');

  // Rotating hero photo slider for seasonal campaigns
  const HERO_SLIDES = [
    '/truck-hero.jpg',
    '/winter-campaign.jpg',
  ];
  const [heroSlide, setHeroSlide] = useState(0);
  const isCampaignSlide = HERO_SLIDES[heroSlide] === '/winter-campaign.jpg';
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle hash scrolling for #before-after, #faq, #donate
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '');
    if (['before-after', 'faq', 'donate'].includes(targetId)) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, []);

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-[#025337]" />;
      case 'Refrigerator':
        return <Refrigerator className="w-6 h-6 text-[#025337]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#025337]" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-[#025337]" />;
      case 'TreePine':
        return <TreePine className="w-6 h-6 text-[#025337]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#025337]" />;
      default:
        return <Truck className="w-6 h-6 text-[#025337]" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#012D19] text-white pt-14 pb-16 sm:pt-20 sm:pb-24">
        {/* Background photo slider — cross-fades between real job photos */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Junk Trucks team on site in Ottawa"
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                src === '/winter-campaign.jpg'
                  ? 'object-contain sm:object-cover object-top bg-[#012D19]'
                  : 'object-cover object-center'
              } ${
                i === heroSlide ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-700 ${isCampaignSlide ? 'from-[#012D19]/15 via-[#012D19]/10 to-[#012D19]/55' : 'from-[#012D19]/85 via-[#012D19]/78 to-[#025337]/90'}`} />
        </div>

        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F2661C]/20 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Slide position dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              onClick={() => setHeroSlide(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === heroSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {!isCampaignSlide && (
            <>
              {/* Winter campaign banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs text-xs sm:text-sm font-bold text-white">
                <Snowflake className="w-4 h-4 text-sky-200" />
                <span>Winter Garage Clear-Out — book before the snow piles up</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
                Don't hesitate to ask for anything extra — <br className="hidden sm:inline" />
                <span className="text-[#F2661C]">your satisfaction is our top priority.</span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-200 max-w-2xl mx-auto font-medium leading-relaxed">
                Junk Trucks — Gets The Job Done.
              </p>
            </>
          )}
          {isCampaignSlide && <div className="pt-40 sm:pt-56 lg:pt-64" />}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              id="hero-book-now-btn"
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F2661C] text-white font-bold text-sm sm:text-base hover:bg-[#DB540F] transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              <span>Book Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-colors border border-white/20 flex items-center justify-center gap-2.5 backdrop-blur-xs"
            >
              <Phone className="w-4 h-4 text-[#F2661C]" />
              <span>Call: {OTTAWA_PHONE}</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-200">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lowest Price Guaranteed</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-day Ottawa dispatch</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WSIB & Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP & SUB-NAV QUICK JUMPS */}
      <div className="bg-stone-50 border-y border-stone-200/80 py-3.5 -mt-16 sm:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-stone-700">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-stone-900">5.0 / 5 Stars</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600 font-medium">7 Google Reviews · Fully Insured &amp; WSIB</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-stone-600">
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#025337] transition-colors flex items-center gap-1"
            >
              <span>Services</span>
              <ArrowRight className="w-3 h-3 text-[#F2661C]" />
            </button>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <button
              onClick={() => {
                const el = document.getElementById('before-after');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#025337] transition-colors flex items-center gap-1"
            >
              <span>Before & After</span>
              <ArrowRight className="w-3 h-3 text-[#F2661C]" />
            </button>
          </div>
        </div>
      </div>

      {/* SERVICES TILE FORMAT WITH GOOD PICTURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            Ottawa Full-Service Removal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            What We Pick Up
          </h2>
          <p className="text-sm text-stone-600">
            We do all the heavy lifting, loading, and clean-up. No items left behind.
          </p>
        </div>

        {/* Compact service cards — icon, title, one-line price/CTA */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {SERVICES_LIST.slice(0, 5).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex flex-col"
            >
              {/* Photo Thumbnail — short banner, clean, no overlaid text */}
              <div className="relative aspect-21/9 overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={service.image || '/cover-truck.jpg'}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="p-2.5 sm:p-3 flex flex-col flex-1 gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md bg-[#025337]/10 flex items-center justify-center shrink-0 [&>svg]:w-3.5 [&>svg]:h-3.5">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 leading-snug group-hover:text-[#025337] transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                </div>

                <button
                  onClick={() => openBooking(service.title)}
                  className="w-full px-2 py-1.5 rounded-lg bg-[#025337] hover:bg-[#012D19] text-white text-[10px] sm:text-[11px] font-bold transition-all shadow-xs flex items-center justify-center gap-1 mt-1"
                >
                  <span>Book Pickup</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* "Other" tile — lets the customer describe a need that doesn't fit a category */}
          <div className="bg-[#025337]/5 border-2 border-dashed border-[#025337]/25 rounded-xl overflow-hidden flex flex-col">
            <div className="p-2.5 sm:p-3 flex flex-col flex-1 gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-[#025337]/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#025337]" />
                </div>
                <h3 className="font-bold text-[11px] sm:text-xs text-stone-900 leading-snug">
                  Something Else?
                </h3>
              </div>

              <input
                type="text"
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                placeholder="e.g. old hot tub, piano..."
                className="w-full text-[11px] sm:text-xs px-2 py-1.5 rounded-lg border border-stone-300 focus:border-[#025337] focus:ring-1 focus:ring-[#025337] outline-none bg-white placeholder:text-stone-400"
              />

              <button
                onClick={() => openBooking(customRequest.trim() ? `Other: ${customRequest.trim()}` : 'Other / Custom Request')}
                className="w-full px-2 py-1.5 rounded-lg bg-[#025337] hover:bg-[#012D19] text-white text-[10px] sm:text-[11px] font-bold transition-all shadow-xs flex items-center justify-center gap-1 mt-1"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER PHOTO TILES */}
      <section id="before-after" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Before & After
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Real Ottawa properties cleared, swept, and reclaimed by our local crew.
          </p>
        </div>

        {/* Clean Photo Grid — pictures only, no captions or buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xs">
            <img
              src="/before-after-1.jpg"
              alt="Garage cleanout, before and after"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-2xs">
            <img
              src="/before-after-2.jpg"
              alt="Basement cleanout, before and after"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>


      {/* ORIGINAL GOOGLE REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aggregate rating stat */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Trusted by Ottawa Homeowners
          </h2>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.48a5.55 5.55 0 0 1-2.4 3.64v2.99h3.89c2.28-2.1 3.55-5.2 3.55-8.82z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.89-2.99c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.1-6.71-4.93H1.28v3.09A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.29 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82z"/>
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.59l4.01 3.09C6.23 6.85 8.88 4.75 12 4.75z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-stone-900 leading-none">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">Google Reviews from Ottawa customers</p>
            </div>
          </div>
        </div>

        {/* Google-style review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col gap-3"
            >
              {/* Header — avatar, name, reviewer badge, Google mark */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: testimonial.avatarColor || '#025337' }}
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-stone-900 truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-[10.5px] text-stone-500 font-medium truncate">
                      {testimonial.userType || 'Verified Customer'}
                    </p>
                  </div>
                </div>
                <svg className="w-4.5 h-4.5 shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.48a5.55 5.55 0 0 1-2.4 3.64v2.99h3.89c2.28-2.1 3.55-5.2 3.55-8.82z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.89-2.99c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.1-6.71-4.93H1.28v3.09A12 12 0 0 0 12 24z"/>
                  <path fill="#FBBC05" d="M5.29 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82z"/>
                  <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.59l4.01 3.09C6.23 6.85 8.88 4.75 12 4.75z"/>
                </svg>
              </div>

              {/* Stars & Relative Date */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-stone-400 text-[11px]">{testimonial.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-4">
                {testimonial.comment}
              </p>

              <div className="mt-auto pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Google Review
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={item.question}
                className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-emerald-300 bg-emerald-50/40' : 'border-stone-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#025337]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-emerald-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1">
                    <p className="text-stone-600 leading-relaxed text-sm sm:text-base">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold text-[#F2661C] uppercase tracking-wider">
            Eco-Friendly Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            What Can Be Donated
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Before your items go to the landfill, we check if they can be donated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#025337]">Accepted for Donation</h3>
            </div>
            <ul className="space-y-2.5">
              {DONATION_ACCEPTED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-400 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-700">Not Accepted for Donation</h3>
            </div>
            <p className="text-xs text-stone-500 italic">Still removed as junk — just not donated.</p>
            <ul className="space-y-2.5">
              {DONATION_NOT_ACCEPTED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <X className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
};
