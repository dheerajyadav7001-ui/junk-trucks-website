import React, { useState, useEffect, useRef } from 'react';
import { 
  Truck, CheckCircle2, Phone, Star, 
  Armchair, Refrigerator, Home, Hammer, TreePine, Building2,
  Flame, Clock, Sparkles, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { 
  SERVICES_LIST, TESTIMONIALS, 
  OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK,
  FAQS
} from '../../data/junkData';
import { PageId } from '../../types';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { useDocumentHead, HOME_TITLE, HOME_DESCRIPTION } from '../../utils/seo';
import { WorkGallery } from '../WorkGallery';
import { CityPickupChecker } from '../CityPickupChecker';
import { SnowEffect } from '../SnowEffect';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useDocumentHead(
    HOME_TITLE,
    HOME_DESCRIPTION
  );

  const { openBooking, openQuote } = useBooking();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollReviews = (dir: number) => {
    const el = reviewsRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Handle hash scrolling for #before-after, #faq
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '');
    if (['before-after', 'faq'].includes(targetId)) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, []);

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-[#173B5F]" />;
      case 'Refrigerator':
        return <Refrigerator className="w-6 h-6 text-[#173B5F]" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#173B5F]" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-[#173B5F]" />;
      case 'TreePine':
        return <TreePine className="w-6 h-6 text-[#173B5F]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#173B5F]" />;
      default:
        return <Truck className="w-6 h-6 text-[#173B5F]" />;
    }
  };

  return (
    <div className="space-y-7 sm:space-y-16 pb-10 sm:pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0F2742]">
        {/* Background photo — bright, with a navy fade where the copy sits */}
        <img
          src="/hero-suburbia.jpg"
          alt="Junk Trucks pickup and loaded trailer on an Ottawa street in autumn"
          className="absolute bottom-0 inset-x-0 w-full h-auto sm:h-full sm:object-cover sm:object-[68%_75%] sm:inset-0 lg:object-[75%_70%]"
          width={1672}
          height={941}
          fetchPriority="high"
        />
        <div className="absolute inset-0 sm:hidden bg-[linear-gradient(to_bottom,#0F2742_0%,#0F2742_60%,rgba(15,39,66,0)_78%)]" />
        <div className="absolute inset-0 hidden sm:block lg:hidden bg-gradient-to-b from-[#0F2742]/95 via-[#0F2742]/70 to-[#0F2742]/0" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#0F2742]/95 via-[#0F2742]/65 to-transparent" />
        <SnowEffect />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-[15.5rem] sm:pt-14 sm:pb-24 lg:py-20">
          <div className="max-w-xl space-y-5 sm:space-y-6 text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-[2.15rem] sm:text-6xl font-extrabold tracking-tight text-white leading-[1.02] [text-shadow:0_3px_16px_rgba(0,0,0,0.55)]">
              Junk Removal in <span className="text-[#FA7415]">Ottawa</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed text-balance [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              Ottawa's local crew. Small items? We'll take them <span className="text-white font-semibold">free with your booking.</span>
            </p>

            {/* Price highlight */}
            <div className="inline-block rounded-2xl bg-white/12 border border-white/30 backdrop-blur-md px-5 py-3 sm:px-6 sm:py-4 text-center lg:text-left shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <p className="flex items-baseline justify-center lg:justify-start gap-2.5 text-white">
                <span className="text-lg sm:text-2xl font-semibold">Individual large item at</span>
                <span className="text-5xl sm:text-6xl font-extrabold text-[#FA7415] leading-none [text-shadow:0_0_24px_rgba(250,116,21,0.55)]">$85</span>
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button
                id="hero-free-quote-btn"
                onClick={() => openQuote()}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#FA7415] text-white font-extrabold text-lg shadow-[0_10px_28px_rgba(250,116,21,0.5)] hover:bg-[#E0650A] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Get Your Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WILL THE CITY PICK IT UP? (interactive checker) */}
      <CityPickupChecker />

      {/* ORIGINAL GOOGLE REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aggregate rating stat */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8 space-y-3">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.48a5.55 5.55 0 0 1-2.4 3.64v2.99h3.89c2.28-2.1 3.55-5.2 3.55-8.82z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.89-2.99c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.1-6.71-4.93H1.28v3.09A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.29 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.28a12 12 0 0 0 0 10.82z"/>
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.59l4.01 3.09C6.23 6.85 8.88 4.75 12 4.75z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 leading-none">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Google Reviews from Ottawa customers</p>
            </div>
          </div>
        </div>

        {/* Google-style review cards — swipe / scroll sideways */}
        <div className="relative">
        <button onClick={() => scrollReviews(-1)} aria-label="Previous reviews" className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow text-[#173B5F] items-center justify-center hover:bg-slate-50"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => scrollReviews(1)} aria-label="Next reviews" className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow text-[#173B5F] items-center justify-center hover:bg-slate-50"><ChevronRight className="w-5 h-5" /></button>
        <div ref={reviewsRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="snap-start shrink-0 w-[85%] sm:w-[46%] lg:w-[32%] bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col gap-3"
            >
              {/* Header — avatar, name, reviewer badge, Google mark */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: testimonial.avatarColor || '#173B5F' }}
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-[10.5px] text-slate-500 font-medium truncate">
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
                <span className="text-slate-400 text-[11px]">{testimonial.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-5">
                {testimonial.comment}
              </p>

              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] text-[#173B5F] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#173B5F]" />
                Verified Google Review
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* WHAT WE PICK UP — square photo tiles, 3 across and 3 across; whole tile is tappable */}
      <section id="services" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173B5F] tracking-tight text-center mb-5 sm:mb-7">
          What We Pick Up
        </h2>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-5">
          {SERVICES_LIST.slice(0, 5).map((service) => (
            <button
              key={service.id}
              onClick={() => openBooking(service.title)}
              aria-label={`Book ${service.title}`}
              className="group flex flex-col overflow-hidden rounded-lg sm:rounded-xl bg-white border border-slate-200 text-center shadow-2xs hover:shadow-md hover:border-slate-300 active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA7415]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image || '/truck-hero.jpg'}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex items-center justify-center px-1.5 py-2.5 sm:px-3 sm:py-4 min-h-[3.25rem] sm:min-h-[4.5rem]">
                <h3 className="text-[#173B5F] font-bold text-[11px] sm:text-base leading-tight">
                  {service.title}
                </h3>
              </div>
            </button>
          ))}

          {/* Anything else — same card shape, navy picture area */}
          <button
            onClick={() => openBooking('Other / Custom Request')}
            className="group flex flex-col overflow-hidden rounded-lg sm:rounded-xl bg-white border border-slate-200 text-center shadow-2xs hover:shadow-md hover:border-slate-300 active:scale-[0.98] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA7415]"
          >
            <div className="aspect-[4/3] w-full bg-[#173B5F] flex items-center justify-center">
              <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-[#FA7415]" />
            </div>
            <div className="flex-1 flex items-center justify-center px-1.5 py-2.5 sm:px-3 sm:py-4 min-h-[3.25rem] sm:min-h-[4.5rem]">
              <h3 className="text-[#173B5F] font-bold text-[11px] sm:text-base leading-tight">Something else?</h3>
            </div>
          </button>
        </div>
      </section>

      {/* OUR WORK SLIDESHOW (replaces Before & After) */}
      <section id="before-after" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <WorkGallery />
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173B5F] tracking-tight">
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
                  isOpen ? 'border-sky-200 bg-sky-50/40' : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#173B5F]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#173B5F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
