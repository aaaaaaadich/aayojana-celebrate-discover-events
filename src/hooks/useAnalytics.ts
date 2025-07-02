
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Google Analytics configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        user_id: user?.id,
        ...parameters,
      });
    }
  };

  const trackOrganizerLogin = () => {
    trackEvent('organizer_login', {
      event_category: 'authentication',
      event_label: 'organizer',
    });
  };

  const trackEventCreation = (eventData: any) => {
    trackEvent('event_created', {
      event_category: 'event_management',
      event_label: 'create_event',
      event_title: eventData.title,
      event_category: eventData.category,
      event_price: eventData.price,
      custom_user_id: user?.id,
    });
  };

  const trackEventDraft = (eventData: any) => {
    trackEvent('event_draft_saved', {
      event_category: 'event_management',
      event_label: 'save_draft',
      event_title: eventData.title,
      custom_user_id: user?.id,
    });
  };

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', {
      page_title: pageName,
      user_type: 'organizer',
      custom_user_id: user?.id,
    });
  };

  return {
    trackEvent,
    trackOrganizerLogin,
    trackEventCreation,
    trackEventDraft,
    trackPageView,
  };
};
