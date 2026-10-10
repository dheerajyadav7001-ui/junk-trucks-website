import React from 'react';
import { Check, X, Heart, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { DONATION_ACCEPTED, DONATION_NOT_ACCEPTED } from '../../data/junkData';
import { useDocumentHead } from '../../utils/seo';

export const DonatePage: React.FC = () => {
  useDocumentHead(
    'What We Donate | Junk Trucks Ottawa',
    'Before your items go to the landfill, Junk Trucks checks whether they can be donated. See what Ottawa donation partners accept and what we still remove as junk.'
  );
  const { openQuote } = useBooking();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-24">
      <section className="bg-gradient-to-br from-[#173B5F] to-[#0F2742] px-4 py-12 sm:py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#FFB27A] uppercase tracking-[0.18em]">
            <Heart className="w-4 h-4" /> Eco-Friendly Promise
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">What Can Be Donated</h1>
          <p className="text-base sm:text-lg text-slate-200">
            Before your items go to the landfill, we check if they can be donated.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#173B5F]">Accepted for Donation</h2>
            </div>
            <ul className="space-y-2.5">
              {DONATION_ACCEPTED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-[#173B5F] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-400 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-700">Not Accepted for Donation</h2>
            </div>
            <p className="text-xs text-slate-500 italic">Still removed as junk, just not donated.</p>
            <ul className="space-y-2.5">
              {DONATION_NOT_ACCEPTED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <X className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => openQuote()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#FA7415] text-white font-bold hover:bg-[#E0650A] transition-colors"
          >
            Get Your Free Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
