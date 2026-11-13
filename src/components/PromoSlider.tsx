import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BLACK_FRIDAY, WINTER_OFFER, Offer, daysLeftText, isOfferActive } from '../config/offer';
import { OTTAWA_PHONE, OTTAWA_PHONE_RAW } from '../data/junkData';
import { setClickedPromo } from '../utils/promo';
import { trackEvent } from '../utils/analytics';

interface Slide {
  id: string;
  promo: string; // '' = no promo
  terms: string;
  render: (go: () => void) => React.ReactNode;
}

const CTA_ORANGE =
  'bg-[#FA7415] hover:bg-[#E0650A] text-white font-extrabold shadow-[0_10px_28px_rgba(250,116,21,0.45)] transition-colors';

const TIERS = [
  { off: '$20 OFF', when: 'Jobs $150+' },
  { off: '$35 OFF', when: 'Jobs $250+' },
  { off: '$50 OFF', when: 'Jobs $400+' },
];

// Same truck photo as the Black Friday banner, faded into the text slides.
// Desktop: sits on the right, behind the text. Phone: sits below the text.
const TruckDesktop: React.FC = () => (
  <img
    src="/promo/black-friday-truck.webp"
    alt=""
    aria-hidden="true"
    width={960}
    height={441}
    loading="lazy"
    className="hidden sm:block pointer-events-none absolute right-0 bottom-0 w-[58%] h-auto [-webkit-mask-image:linear-gradient(to_right,transparent,black_40%)] [mask-image:linear-gradient(to_right,transparent,black_40%)]"
  />
);
const TruckMobile: React.FC = () => (
  <img
    src="/promo/black-friday-truck.webp"
    alt=""
    aria-hidden="true"
    width={960}
    height={441}
    loading="lazy"
    className="sm:hidden mt-auto block w-full h-auto pointer-events-none [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_30%)] [mask-image:linear-gradient(to_bottom,transparent,black_30%)]"
  />
);

function blackFridaySlide(offer: Offer): Slide {
  return {
    id: offer.id,
    promo: offer.id,
    terms: offer.terms,
    render: (go) => (
      <>
        {/* Desktop / tablet: the designed banner, fully clickable */}
        <button
          type="button"
          onClick={go}
          aria-label="Black Friday cleanout savings. $20 off jobs of $150 or more, $35 off $250 or more, $50 off $400 or more, plus one small item free. Get your Black Friday quote."
          className="hidden sm:block relative w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#FA7415]"
        >
          <img
            src="/promo/black-friday-desktop.webp"
            alt=""
            width={1600}
            height={818}
            loading="lazy"
            className="block w-full h-auto"
          />
        </button>

        {/* Phone: live text (readable at any width) over the same truck photo */}
        <div className="sm:hidden h-full flex flex-col bg-[#0A0A0C] text-white">
          <div className="px-5 pt-5 pb-4 space-y-3 flex-1">
            <span className="inline-block -skew-x-6 bg-[#FA7415] px-3 py-1 text-[12px] font-extrabold uppercase tracking-wide">
              Black Friday event
            </span>
            <p className="text-[2rem] font-black italic leading-[1.02] tracking-tight">
              Big Cleanout <span className="text-[#FA7415]">Savings!</span>
            </p>
            <p className="text-[15px] text-slate-300">Make room. We'll haul it away.</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {TIERS.map((t) => (
                <div key={t.off} className="rounded-lg border border-[#FA7415]/60 bg-white/5 px-1 py-2">
                  <p className="text-[17px] font-extrabold text-[#FA7415] leading-tight">{t.off}</p>
                  <p className="text-[12px] text-slate-200">{t.when}</p>
                </div>
              ))}
            </div>
            <p className="rounded-lg bg-amber-400 text-black text-[14px] font-bold px-3 py-2 text-center">
              + One small item FREE with every qualifying booking
            </p>
            <button type="button" onClick={go} className={`w-full rounded-xl py-3.5 text-[17px] ${CTA_ORANGE}`}>
              Get Your Black Friday Quote →
            </button>
            <p className="text-center text-[13px] font-semibold text-amber-300">
              {daysLeftText(offer)} · {offer.endsLabel}
            </p>
          </div>
          <img
            src="/promo/black-friday-truck.webp"
            alt=""
            width={960}
            height={441}
            loading="lazy"
            className="block w-full h-auto"
          />
        </div>
      </>
    ),
  };
}

function holidaySlide(offer: Offer): Slide {
  return {
    id: offer.id,
    promo: offer.id,
    terms: offer.terms,
    render: (go) => (
      <div className="relative h-full min-h-[560px] sm:min-h-0 sm:aspect-[1754/897] overflow-hidden bg-[linear-gradient(135deg,#0F2742_0%,#173B5F_62%,#1F5282_100%)] text-white flex flex-col sm:flex-row sm:items-center">
        <TruckDesktop />
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#FA7415]/25 blur-3xl" />
        <div className="relative px-6 sm:px-14 py-8 space-y-3 sm:space-y-4 max-w-xl">
          <span className="inline-block -skew-x-6 bg-[#FA7415] px-3 py-1 text-[12px] sm:text-sm font-extrabold uppercase tracking-wide">
            ❄ Holiday clear-out
          </span>
          <p className="text-[2.1rem] sm:text-5xl lg:text-6xl font-black leading-[1.03] tracking-tight">
            <span className="text-[#FA7415]">20% off</span> your whole booking
          </p>
          <p className="text-[15px] sm:text-lg text-slate-200">
            Clear the clutter before the holidays. Our Ottawa crew does all the lifting.
          </p>
          <button type="button" onClick={go} className={`w-full sm:w-auto rounded-xl px-8 py-3.5 text-[17px] ${CTA_ORANGE}`}>
            Get Your Free Quote →
          </button>
          <p className="text-[13px] font-semibold text-amber-300">
            {daysLeftText(offer)} · {offer.endsLabel}
          </p>
        </div>
        <TruckMobile />
      </div>
    ),
  };
}

function evergreenSlide(): Slide {
  return {
    id: 'evergreen',
    promo: '',
    terms: 'The price is confirmed with you before we start any work.',
    render: (go) => (
      <div className="relative h-full min-h-[560px] sm:min-h-0 sm:aspect-[1754/897] overflow-hidden bg-[linear-gradient(135deg,#0A0A0C_0%,#1b1209_55%,#3a1d07_100%)] text-white flex flex-col sm:flex-row sm:items-center">
        <TruckDesktop />
        <div className="pointer-events-none absolute -left-20 -bottom-24 h-80 w-80 rounded-full bg-[#FA7415]/25 blur-3xl" />
        <div className="relative px-6 sm:px-14 py-8 space-y-3 sm:space-y-4 max-w-2xl">
          <p className="text-[2.1rem] sm:text-5xl lg:text-6xl font-black leading-[1.03] tracking-tight">
            Large item removal <span className="text-[#FA7415]">from $85</span>
          </p>
          <p className="text-[15px] sm:text-lg text-slate-200">
            Small items? We'll take them <span className="font-semibold text-white">free with your booking.</span>{' '}
            Ottawa's local crew, upfront price, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button type="button" onClick={go} className={`rounded-xl px-8 py-3.5 text-[17px] ${CTA_ORANGE}`}>
              Get Your Free Quote →
            </button>
            <a
              href={OTTAWA_PHONE_RAW}
              onClick={() => trackEvent('call_click', { location: 'promo_slider' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-[17px] font-bold hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" /> {OTTAWA_PHONE}
            </a>
          </div>
        </div>
        <TruckMobile />
      </div>
    ),
  };
}

export const PromoSlider: React.FC = () => {
  const { openQuote } = useBooking();

  const slides = useMemo<Slide[]>(() => {
    const list: Slide[] = [];
    if (isOfferActive(BLACK_FRIDAY)) list.push(blackFridaySlide(BLACK_FRIDAY));
    if (isOfferActive(WINTER_OFFER)) list.push(holidaySlide(WINTER_OFFER));
    list.push(evergreenSlide());
    return list;
  }, []);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    try {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch {
      /* ignore */
    }
  }, []);

  // Auto-advance. Depending on `index` restarts the timer after a manual change.
  useEffect(() => {
    if (count < 2 || paused || reduced) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(t);
  }, [count, paused, reduced, index]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  const handleCta = (s: Slide) => {
    setClickedPromo(s.promo);
    trackEvent('promo_click', { promo: s.id, location: 'slider' });
    openQuote();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Current offers"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-[#0F2742] shadow-[0_12px_40px_rgba(15,39,66,0.28)]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          setPaused(false);
          if (start == null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="flex items-stretch transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="w-full shrink-0 grow-0 basis-full"
            >
              {s.render(() => handleCta(s))}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous offer"
              onClick={() => go(-1)}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              aria-label="Next offer"
              onClick={() => go(1)}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center rounded-full bg-black/45 px-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show offer ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="p-2"
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all ${
                      i === index ? 'w-6 bg-[#FA7415]' : 'w-2.5 bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <p className="mt-2 px-1 text-center text-[11px] sm:text-xs leading-snug text-slate-500">{slides[index].terms}</p>
    </section>
  );
};
