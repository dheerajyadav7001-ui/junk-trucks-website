import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Truck, Calendar, Clock, MapPin, CheckCircle2, 
  AlertCircle, Phone, ShieldCheck, Sparkles, ArrowRight,
  Package, Trash2, Home, Hammer, TreePine, Building2
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { PRICING_TIERS, SERVICES_LIST, OTTAWA_AREAS, OTTAWA_PHONE, OTTAWA_WHATSAPP_LINK } from '../data/junkData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const BookingModal: React.FC = () => {
  const { 
    isOpen, 
    closeBooking, 
    selectedService, 
    setSelectedService, 
    selectedLoadSize, 
    setSelectedLoadSize,
    submitBooking, 
    isSubmitting, 
    isSuccess, 
    errorMessage, 
    bookingReference,
    resetBookingState 
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    neighborhood: 'Kanata / Stittsville',
    postalCode: '',
    preferredDate: '',
    preferredTimeSlot: 'Morning (8:00 AM - 12:00 PM)',
    notes: '',
    isUrgent: false,
  });

  // Set default tomorrow date on mount
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, preferredDate: dateStr }));
  }, []);

  // Reset steps when modal opens
  useEffect(() => {
    if (isOpen && !isSuccess) {
      setStep(1);
    }
  }, [isOpen, isSuccess]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getEstimatedPrice = () => {
    const tier = PRICING_TIERS.find((t) => t.title.toLowerCase().includes(selectedLoadSize.toLowerCase()) || t.fraction.toLowerCase().includes(selectedLoadSize.toLowerCase()));
    return tier ? tier.price : 'Lowest Price Guaranteed';
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.address || !formData.neighborhood) {
        alert('Please enter your Ottawa address and select your neighborhood.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number so our team can confirm dispatch.');
      return;
    }

    await submitBooking({
      ...formData,
      serviceType: selectedService,
      loadSize: selectedLoadSize,
    });
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => {
      resetBookingState();
      setStep(1);
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
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
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
                <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                  Book Ottawa Junk Removal
                  <span className="text-xs bg-[#2A634E] text-white px-2 py-0.5 rounded-full font-mono font-normal">
                    Upfront Guarantee
                  </span>
                </h3>
                <p className="text-xs text-stone-200 mt-0.5">
                  Eco-friendly hauling • Free on-site estimate • No dump fees
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
                Booking Request Received!
              </h4>

              <p className="text-stone-600 max-w-md mx-auto mb-6 text-sm">
                Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our Ottawa dispatch team has received your details and is reviewing truck availability.
              </p>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left mb-6 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">Reference Code</span>
                  <span className="font-mono font-bold text-sm text-[#025337] bg-stone-100 px-2.5 py-0.5 rounded">
                    {bookingReference || 'JT-CONFIRMED'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Service:</span>
                  <span className="font-medium text-stone-800">{selectedService}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Estimated Volume:</span>
                  <span className="font-medium text-stone-800">{selectedLoadSize}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Area:</span>
                  <span className="font-medium text-stone-800">{formData.neighborhood}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Requested Window:</span>
                  <span className="font-medium text-stone-800">{formData.preferredDate} ({formData.preferredTimeSlot.split(' ')[0]})</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 max-w-md mx-auto text-left flex items-start gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>What happens next:</strong> Our dispatch officer will call you at <strong>{formData.phone}</strong> within 15–30 minutes to confirm your exact arrival window and provide guaranteed on-site pricing.
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
            <div className="p-6">
              {/* Stepper indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    step >= 1 ? 'bg-[#025337] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    1
                  </div>
                  <span className={`text-xs font-semibold ${step >= 1 ? 'text-[#025337]' : 'text-stone-400'}`}>
                    Items & Volume
                  </span>
                </div>

                <div className="w-8 h-0.5 bg-stone-200" />

                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    step >= 2 ? 'bg-[#025337] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-semibold ${step >= 2 ? 'text-[#025337]' : 'text-stone-400'}`}>
                    Location & Time
                  </span>
                </div>

                <div className="w-8 h-0.5 bg-stone-200" />

                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    step >= 3 ? 'bg-[#025337] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    3
                  </div>
                  <span className={`text-xs font-semibold ${step >= 3 ? 'text-[#025337]' : 'text-stone-400'}`}>
                    Confirm
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: SERVICE & LOAD SIZE */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider mb-2">
                      What type of junk are you clearing?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES_LIST.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedService(srv.title)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            selectedService === srv.title
                              ? 'border-[#025337] bg-[#EDF5F1] ring-2 ring-[#025337]/20'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <span className="font-semibold text-xs text-stone-900 leading-tight">
                            {srv.title.split(' & ')[0]}
                          </span>
                          <span className="text-[10px] text-stone-500 mt-1">
                            {srv.startingPrice}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase text-stone-700 tracking-wider">
                        Estimate Your Truckload Volume
                      </label>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                        {getEstimatedPrice()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PRICING_TIERS.map((tier) => (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedLoadSize(tier.fraction)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all relative ${
                            selectedLoadSize === tier.fraction
                              ? 'border-[#F2661C] bg-[#FFF1E9] ring-2 ring-[#F2661C]/20'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-sm text-stone-900 block">
                                {tier.title}
                              </span>
                              <span className="text-xs text-stone-500 block mt-0.5">
                                {tier.cubicYards}
                              </span>
                            </div>
                            <span className="font-semibold text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                              {tier.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-1.5 leading-snug">
                            {tier.equivalent}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#025337] shrink-0" />
                      Unsure about size? We confirm final volume on-site with zero obligation.
                    </span>
                    <a
                      href={OTTAWA_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold shrink-0"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Text photos on WhatsApp →</span>
                    </a>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      id="modal-step1-next-btn"
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-[#025337] text-white text-sm font-semibold hover:bg-[#012D19] transition-colors flex items-center gap-2 shadow-sm"
                    >
                      Continue to Schedule <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOCATION & TIME */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="e.g. 245 Richmond Rd"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Ottawa Area / Neighborhood *
                      </label>
                      <select
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337] bg-white"
                      >
                        {OTTAWA_AREAS.map((area) => (
                          <option key={area.name} value={area.name}>
                            {area.name} ({area.postal.split(',')[0]}...)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="e.g. K1Z 6X3"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Preferred Pickup Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      2-Hour Arrival Window
                    </label>
                    <select
                      name="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337] bg-white"
                    >
                      <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="Early Afternoon (12:00 PM - 3:00 PM)">Early Afternoon (12:00 PM – 3:00 PM)</option>
                      <option value="Late Afternoon (3:00 PM - 6:00 PM)">Late Afternoon (3:00 PM – 6:00 PM)</option>
                      <option value="Evening / After Hours (6:00 PM - 8:00 PM)">Evening (6:00 PM – 8:00 PM)</option>
                      <option value="ASAP Emergency Same-Day (Next 2 Hours)">🚨 ASAP Emergency Same-Day (Next 2 Hours)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isUrgent-modal"
                      name="isUrgent"
                      checked={formData.isUrgent}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#F2661C] rounded border-stone-300 focus:ring-[#F2661C]"
                    />
                    <label htmlFor="isUrgent-modal" className="text-xs text-orange-950 font-medium cursor-pointer">
                      <strong>Need Same-Day Emergency Removal?</strong> Check this box and our priority dispatch truck will be alerted immediately.
                    </label>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      Back
                    </button>
                    <button
                      id="modal-step2-next-btn"
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-[#025337] text-white text-sm font-semibold hover:bg-[#012D19] transition-colors flex items-center gap-2 shadow-sm"
                    >
                      Contact Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CONTACT & CONFIRM */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
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
                          className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address (For Confirmation & Donation Receipt)
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="youremail@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Items description or special instructions (Optional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="e.g. 1 heavy sleeper sofa in basement, 4 bags of yard waste, stairs, driveway access..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025337]"
                      />
                    </div>

                    {/* Booking Summary Box */}
                    <div className="bg-[#EDF5F1] border border-[#2B6651]/20 rounded-xl p-3.5 text-xs text-stone-800 space-y-1">
                      <div className="flex justify-between font-semibold text-[#025337]">
                        <span>{selectedService} ({selectedLoadSize})</span>
                        <span className="font-mono text-sm">{getEstimatedPrice()}</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        📍 {formData.address || 'Ottawa'}, {formData.neighborhood} • 📅 {formData.preferredDate} ({formData.preferredTimeSlot.split(' ')[0]})
                      </p>
                      <p className="text-[10px] text-stone-500 pt-1 border-t border-stone-200/60">
                        Zero obligation quote: If you are not completely satisfied with the on-site estimate, our crew packs up and leaves at no charge.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900"
                      >
                        Back
                      </button>

                      <button
                        id="submit-booking-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-xl bg-[#F2661C] text-white font-bold text-sm hover:bg-[#DB540F] transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Dispatching Request...
                          </>
                        ) : (
                          <>
                            Confirm & Reserve Truck
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
