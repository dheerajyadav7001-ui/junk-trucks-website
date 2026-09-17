import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import emailjs from '@emailjs/browser';
import { BookingFormData, TrackingParams } from '../types';
import { getTrackingParams, initTrackingParams } from '../utils/tracking';
import { fireBookingConversion } from '../utils/googleAdsTag';

interface BookingContextType {
  isOpen: boolean;
  openBooking: (preselectedService?: string, preselectedLoadSize?: string) => void;
  closeBooking: () => void;
  selectedService: string;
  selectedLoadSize: string;
  setSelectedService: (service: string) => void;
  setSelectedLoadSize: (load: string) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  bookingReference: string | null;
  submitBooking: (data: Partial<BookingFormData>) => Promise<{ success: boolean; error?: string }>;
  resetBookingState: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// EmailJS Configuration
// Note: If you have active EmailJS keys, update them here. 
// The app safely catches and logs any EmailJS errors so Formspree submission completes reliably.
const EMAILJS_PUBLIC_KEY = 'XANQLM8aHvPqxLQCM';
const EMAILJS_SERVICE_ID = 'service_ls32woy';
const EMAILJS_TEMPLATE_CUSTOMER = 'template_0b18jpk';
const EMAILJS_TEMPLATE_OWNER = 'template_vlh1xs7';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgojyezp';

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('General Junk Removal');
  const [selectedLoadSize, setSelectedLoadSize] = useState<string>('1/2 Truck Load');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  // Initialize tracking on provider mount
  useEffect(() => {
    initTrackingParams();
  }, []);

  const openBooking = (preselectedService?: string, preselectedLoadSize?: string) => {
    if (preselectedService) setSelectedService(preselectedService);
    if (preselectedLoadSize) setSelectedLoadSize(preselectedLoadSize);
    setIsSuccess(false);
    setErrorMessage(null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const resetBookingState = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setBookingReference(null);
  };

  const submitBooking = async (formData: Partial<BookingFormData>): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Generate readable booking reference code
    const randomRef = 'JT-' + Math.floor(100000 + Math.random() * 900000);
    const tracking: TrackingParams = getTrackingParams();

    const fullPayload: BookingFormData = {
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      neighborhood: formData.neighborhood || 'Ottawa (General)',
      postalCode: formData.postalCode || '',
      serviceType: formData.serviceType || selectedService,
      loadSize: formData.loadSize || selectedLoadSize,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      preferredTimeSlot: formData.preferredTimeSlot || 'Morning (8am - 12pm)',
      notes: formData.notes || '',
      isUrgent: formData.isUrgent || false,
      utm_source: tracking.utm_source || 'direct',
      utm_medium: tracking.utm_medium || '',
      utm_campaign: tracking.utm_campaign || '',
      utm_term: tracking.utm_term || '',
      gclid: tracking.gclid || '',
    };

    try {
      // 1. Submit to Formspree endpoint
      const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...fullPayload,
          bookingReference: randomRef,
          submissionTimestamp: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
        }),
      });

      if (!formspreeResponse.ok) {
        const errData = await formspreeResponse.json().catch(() => null);
        console.warn('Formspree returned status:', formspreeResponse.status, errData);
      }

      // 2. Trigger EmailJS notifications (Customer confirmation & Owner dispatch notification)
      try {
        // Send Customer confirmation
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_CUSTOMER,
          {
            to_name: fullPayload.name,
            to_email: fullPayload.email,
            booking_ref: randomRef,
            service_type: fullPayload.serviceType,
          },
          EMAILJS_PUBLIC_KEY
        );

        // Send Owner notification
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_OWNER,
          {
            customer_name: fullPayload.name,
            customer_phone: fullPayload.phone,
            customer_email: fullPayload.email,
            postal_code: fullPayload.postalCode,
            booking_ref: randomRef,
            service_type: fullPayload.serviceType,
            notes: fullPayload.notes,
            utm_source: fullPayload.utm_source,
            utm_campaign: fullPayload.utm_campaign,
            gclid: fullPayload.gclid,
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        // We log EmailJS error without failing the user experience
        console.warn('EmailJS email dispatch notice:', emailError);
      }

      setBookingReference(randomRef);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Report the lead to Google Ads as a conversion (fires the same tag
      // that also builds the remarketing audience). No-ops until real
      // conversion IDs are configured in src/config/googleAds.ts.
      fireBookingConversion(randomRef, fullPayload.gclid);

      return { success: true };
    } catch (err: unknown) {
      console.error('Booking submission error:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while processing your booking. Please call us directly at (343) 777-0398 for immediate dispatch.';
      setErrorMessage(msg);
      setIsSubmitting(false);
      return { success: false, error: msg };
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
        selectedService,
        selectedLoadSize,
        setSelectedService,
        setSelectedLoadSize,
        isSubmitting,
        isSuccess,
        errorMessage,
        bookingReference,
        submitBooking,
        resetBookingState,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
