import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, CheckCircle2, AlertCircle, Phone, ShieldCheck, ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK, SERVICES_LIST } from '../data/junkData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const BookingModal: React.FC = () => {
  const {
    isOpen,
    mode,
    closeBooking,
    selectedService,
    setSelectedService,
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
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset the form each time the modal is (re)opened
  useEffect(() => {
    if (isOpen && !isSuccess) {
      setFormData({ name: '', phone: '', email: '', postalCode: '' });
      setValidationError(null);
    }
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setValidationError('Please add your name and phone number so we can call you back.');
      return;
    }

    await submitBooking({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      postalCode: formData.postalCode,
      serviceType: selectedService,
      loadSize: selectedLoadSize,
      notes: mode === 'quote'
        ? 'FREE QUOTE request — full details (address, items, timing) to be confirmed by phone.'
        : 'BOOKING request — full details (address, items, timing) to be confirmed by phone.',
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/75 backdrop-blur-xs"
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
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="bg-[#173B5F] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Junk Trucks Logo"
                className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-sky-300/30 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  {mode === 'quote' ? 'Get Your Free Quote' : 'Book Your Pickup'}
                </h3>
                <p className="text-xs text-slate-200 mt-0.5">
                  We'll call you back in 15–30 minutes
                </p>
              </div>
            </div>

            <button
              id="close-booking-modal-btn"
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Success View */}
          {isSuccess ? (
            <div className="p-8 text-center" id="booking-success-view">
              <div className="w-16 h-16 bg-sky-100 text-[#173B5F] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                Request Received!
              </h4>

              <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our Ottawa dispatch team has your details and will call you shortly.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left mb-6 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Reference Code</span>
                  <span className="font-mono font-bold text-sm text-[#173B5F] bg-slate-100 px-2.5 py-0.5 rounded">
                    {bookingReference || 'JT-CONFIRMED'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Phone:</span>
                  <span className="font-medium text-slate-800">{formData.phone}</span>
                </div>
                {formData.postalCode && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Postal Code:</span>
                    <span className="font-medium text-slate-800">{formData.postalCode}</span>
                  </div>
                )}
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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173B5F] text-white text-xs font-semibold hover:bg-[#0F2742] transition-colors"
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
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {(validationError || errorMessage) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{validationError || errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Type of Junk *
                </label>
                <select
                  name="serviceType"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#173B5F] bg-white"
                >
                  <option value="General Junk Removal">General Junk Removal</option>
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                  {selectedService !== 'General Junk Removal' && !SERVICES_LIST.some((srv) => srv.title === selectedService) && (
                    <option value={selectedService}>{selectedService}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#173B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(613) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#173B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#173B5F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal Code <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="e.g. K1Z 6X3"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#173B5F]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#173B5F] shrink-0" />
                No obligation. We'll call to confirm items, timing, and give you guaranteed on-site pricing.
              </div>

              <button
                id="submit-booking-form-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3.5 rounded-xl bg-[#FA7415] text-white font-bold text-sm hover:bg-[#E0650A] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    {mode === 'quote' ? 'Get My Free Quote' : 'Book My Pickup'}
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
