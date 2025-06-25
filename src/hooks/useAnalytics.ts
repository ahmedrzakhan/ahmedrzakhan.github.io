import { useEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import GoogleAnalytics, { GAEvent, GAPageView, GACustomEvent } from '../analytics/google-analytics';
import CustomTracker from '../analytics/custom-tracker';

interface AnalyticsConfig {
  gaId?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

interface UseAnalyticsReturn {
  trackPageView: (pagePath: string, pageTitle: string) => void;
  trackEvent: (eventName: string, eventData?: any) => void;
  trackPortfolioView: () => void;
  trackProjectClick: (projectName: string) => void;
  trackContactFormSubmission: () => void;
  trackResumeDownload: () => void;
  trackTimeOnPage: () => void;
  isTrackingEnabled: boolean;
}

const useAnalytics = (config: AnalyticsConfig): UseAnalyticsReturn => {
  const gaRef = useRef<GoogleAnalytics | null>(null);
  const customTrackerRef = useRef<CustomTracker | null>(null);
  const isTrackingEnabled = Cookies.get('analytics-consent') === 'true';
  const pageStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (isTrackingEnabled) {
      // Initialize Google Analytics
      if (config.gaId && !gaRef.current) {
        gaRef.current = new GoogleAnalytics(config.gaId);
        gaRef.current.init();
        gaRef.current.updateConsent(true);
      }

      // Initialize Custom Tracker
      if (config.supabaseUrl && config.supabaseKey && !customTrackerRef.current) {
        customTrackerRef.current = new CustomTracker(config.supabaseUrl, config.supabaseKey);
        customTrackerRef.current.enable();
      }
    } else {
      // Disable tracking if consent is not given
      if (gaRef.current) {
        gaRef.current.updateConsent(false);
      }
      if (customTrackerRef.current) {
        customTrackerRef.current.disable();
      }
    }

    // Track initial page view
    if (isTrackingEnabled) {
      const initialPageView = () => {
        const pagePath = window.location.pathname;
        const pageTitle = document.title;
        
        pageStartTimeRef.current = Date.now();

        // Google Analytics
        if (gaRef.current) {
          const pageView: GAPageView = {
            page_title: pageTitle,
            page_location: `${window.location.origin}${pagePath}`,
          };
          gaRef.current.trackPageView(pageView);
        }

        // Custom Tracker
        if (customTrackerRef.current) {
          customTrackerRef.current.trackPageView(pagePath, pageTitle);
        }
      };
      
      initialPageView();
    }

    // Track page unload time
    const handleBeforeUnload = () => {
      if (isTrackingEnabled && customTrackerRef.current) {
        customTrackerRef.current.trackTimeOnPage();
        customTrackerRef.current.endSession();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [isTrackingEnabled, config]);

  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (!isTrackingEnabled) return;

    pageStartTimeRef.current = Date.now();

    // Google Analytics
    if (gaRef.current) {
      const pageView: GAPageView = {
        page_title: pageTitle,
        page_location: `${window.location.origin}${pagePath}`,
      };
      gaRef.current.trackPageView(pageView);
    }

    // Custom Tracker
    if (customTrackerRef.current) {
      customTrackerRef.current.trackPageView(pagePath, pageTitle);
    }
  }, [isTrackingEnabled]);

  const trackEvent = useCallback((eventName: string, eventData: any = {}) => {
    if (!isTrackingEnabled) return;

    // Google Analytics
    if (gaRef.current) {
      const gaEvent: GAEvent = {
        action: eventName,
        category: eventData.category || 'engagement',
        label: eventData.label,
        value: eventData.value,
      };
      gaRef.current.trackEvent(gaEvent);

      // Also track as custom event for more detailed data
      const customEvent: GACustomEvent = {
        event_name: eventName,
        event_parameters: eventData,
      };
      gaRef.current.trackCustomEvent(customEvent);
    }

    // Custom Tracker
    if (customTrackerRef.current) {
      customTrackerRef.current.trackEvent(eventName, eventData);
    }
  }, [isTrackingEnabled]);

  const trackPortfolioView = useCallback(() => {
    trackEvent('portfolio_view', {
      category: 'portfolio',
      label: 'portfolio_section_viewed',
    });
  }, [trackEvent]);

  const trackProjectClick = useCallback((projectName: string) => {
    trackEvent('project_click', {
      category: 'portfolio',
      label: projectName,
      project_name: projectName,
    });
  }, [trackEvent]);

  const trackContactFormSubmission = useCallback(() => {
    trackEvent('contact_form_submit', {
      category: 'engagement',
      label: 'contact_form',
      value: 1,
    });
  }, [trackEvent]);

  const trackResumeDownload = useCallback(() => {
    trackEvent('resume_download', {
      category: 'engagement',
      label: 'resume_pdf',
      value: 1,
    });
  }, [trackEvent]);

  const trackTimeOnPage = useCallback(() => {
    if (!isTrackingEnabled) return;

    const timeSpent = Date.now() - pageStartTimeRef.current;
    
    if (timeSpent > 1000) { // Only track if more than 1 second
      trackEvent('time_on_page', {
        category: 'engagement',
        label: window.location.pathname,
        value: Math.round(timeSpent / 1000), // Convert to seconds
        duration_ms: timeSpent,
        page_path: window.location.pathname,
      });
    }
  }, [isTrackingEnabled, trackEvent]);

  // Auto-track time on page every 30 seconds
  useEffect(() => {
    if (!isTrackingEnabled) return;

    const interval = setInterval(() => {
      trackTimeOnPage();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isTrackingEnabled, trackTimeOnPage]);

  return {
    trackPageView,
    trackEvent,
    trackPortfolioView,
    trackProjectClick,
    trackContactFormSubmission,
    trackResumeDownload,
    trackTimeOnPage,
    isTrackingEnabled,
  };
};

export default useAnalytics;