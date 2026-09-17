import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, CheckCircle2, AlertCircle, Phone, ShieldCheck, ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK } from '../data/junkData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const BookingModal: React.FC = () => {
  const {
    isOpen,
    closeBooking,
    selectedService,
    selectedLoadSize,
    submitBooking,
    isSubmitting,
    isSuccess,
    errorMessage,
    bookingReference,
    resetBookingState,
  } = useBooking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postalCode: '',
  });

  // Reset the form each time the modal is (re)opened
  useEffect(() => {
    if (isOpen && !isSuccess) {
      setFormData({ name: '', phone: '', email: '', postalCode: '' });
    }
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.postalCode) {
      alert('Please fill in your name, phone number, email, and postal code so our dispatch team can call you back.');
      return;
    }

    await submitBooking({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      postalCode: formData.postalCode,
      serviceType: selectedService,
      loadSize: selectedLoadSize,
      notes: 'Quick quote request — full details (address, items, timing) to be confirmed by phone.',
    });
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => {
      resetBookingState();
    }, 300);
  };

  return (
    <AnimatePresence>
      <div
        id="booking-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-stone-900/75 backdrop-blur-xs"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          id="booking-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="bg-[#025337] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Junk Trucks Logo"
                className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-emerald-400/30 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  Get Your Quote
                </h3>
                <p className="text-xs text-stone-200 mt-0.5">
                  We'll call you back in 15–30 minutes
                </p>
              </div>
            </div>

            <button
              id="close-booking-modal-btn"
              onClick={handleClose}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success View */}
          {isSuccess ? (
            <div className="p-8 text-center" id="booking-success-view">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-bold text-stone-900 mb-2">
                Request Received!
              </h4>

              <p className="text-stone-600 max-w-md mx-auto mb-6 text-sm">
                Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our Ottawa dispatch team has your details and will call you shortly.
              </p>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left mb-6 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">Reference Code</span>
                  <span className="font-mono font-bold text-sm text-[#025337] bg-stone-100 px-2.5 py-0.5 rounded">
                    {bookingReference || 'JT-CONFIRMED'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Phone:</span>
                  <span className="font-medium text-stone-800">{formData.phone}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Postal Code:</span>
                  <span className="font-medium text-stone-800">{formData.postalCode}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 max-w-md mx-auto text-left flex items-start gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>What happens next:</strong> Our dispatch officer will call you at <strong>{formData.phone}</strong> within 15–30 minutes to confirm the job details and give you guaranteed on-site pricing.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-center">
                <a
                  href={`tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#025337] text-white text-xs font-semibold hover:bg-[#012D19] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call: {OTTAWA_PHONE}
                </a>
                <a
                  href={OTTAWA_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  WhatsApp Us
                </a>
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(613) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="e.g. K1Z 6X3"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-[#025337] shrink-0" />
                No obligation. We'll call to confirm items, timing, and give you guaranteed on-site pricing.
              </div>

              <button
                id="submit-booking-form-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3.5 rounded-xl bg-[#F2661C] text-white font-bold text-sm hover:bg-[#DB540F] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    Request My Quote
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
